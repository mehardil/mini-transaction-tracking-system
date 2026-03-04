"""
This module defines all REST API endpoints for the application.
Each endpoint manages request validation, database interaction,
and structured JSON responses
"""
import csv
import io
import schemas 
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from database import mysql_connection
from fraud_rule import apply_fraud_rules
from fastapi import UploadFile, File
from schemas import TransactionCreate 

app = FastAPI(title="Transaction Risk Monitoring System")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],)


@app.post("/transactions")
def create_transaction(tx: schemas.TransactionCreate):
    """
    create new transaction record
    1-check duplicate transactions
    2-Applies fraud rules
    3-Save transaction to database
    """
    conn =None
    cursor=None
    try:
        conn = mysql_connection()
        cursor = conn.cursor()
        cursor.execute("SELECT COUNT(*) FROM transaction_tracking WHERE transaction_id=%s", (tx.transaction_id,))
        if cursor.fetchone()[0] > 0:
            raise HTTPException(status_code=400,detail="Transaction ID is already exist")
        risk_flag, rule_triggered = apply_fraud_rules(cursor, tx)
        cursor.execute("""
            INSERT INTO transaction_tracking (transaction_id, user_id, amount,transaction_time, device_info, risk_flag, rule_triggered)
            VALUES (%s,%s,%s,%s,%s,%s,%s)
        """, (tx.transaction_id, tx.user_id, tx.amount, tx.timestamp, tx.device_id, risk_flag, rule_triggered))
        conn.commit()
        return {
            "status":"success",
            "message":"new transaction is successfully added"
        }
    except HTTPException:
        raise
    except Exception as e:
        print(f"{str(e)}")
        raise HTTPException(status_code=500,detail="Internal Server Error")
    finally:
        if cursor:
            cursor.close()
        if conn:
            conn.close()
        
        

@app.get("/transactions")
async def get_transactions():
    """
    Retrieve all transactions from the database
    """
    conn = None
    cursor =None
    try:
        conn = mysql_connection()
        cursor = conn.cursor(dictionary=True)
        sql = """
        select transaction_id, user_id, amount, transaction_time AS timestamp,
        device_info AS device_id,risk_flag,rule_triggered
        from transaction_tracking"""
        cursor.execute(sql)
        transactions = cursor.fetchall()
        return transactions
    except Exception as e:
        raise HTTPException(status_code=500,detail=f"Error get transaction api:{str(e)}")
    finally:
        if cursor:
            cursor.close()
        if conn:
            conn.close()



@app.get("/dashboard")
def get_dashboard():
    """
    Retrieve count of total transactions,risk_flag,HIGH_RISK and  SUSPICIOUS
    """
    conn =None
    cursor=None
    try:
        conn = mysql_connection()
        cursor = conn.cursor(dictionary=True)
        sql ="""
        select count(*) as total_transactions,sum(risk_flag=1) as flagged_transactions,
        sum(rule_triggered='HIGH_RISK') as high_risk,
        sum(rule_triggered='SUSPICIOUS') as suspicious from transaction_tracking
        """ 
        cursor.execute(sql)
        dashboard_count = cursor.fetchone()
        return dashboard_count
    except Exception as e:
        raise HTTPException(status_code=500,detail=f"Error dashboard api:{str(e)}")
    finally:
        if cursor:
            cursor.close()
        if conn:
            conn.close()



@app.post("/transactions/upload")
def upload_transactions(file: UploadFile = File(...)):
    """
    Upload CSV file for bulk transaction insert
    1- Read CSV
    2- Check duplicate
    3- Apply fraud rules
    4- Insert into database
    """
    conn = None
    cursor = None
    try:
        conn = mysql_connection()
        cursor = conn.cursor()
        contents = file.file.read().decode("utf-8")
        csv_reader = csv.DictReader(io.StringIO(contents))
        inserted = 0
        duplicates = 0
        for row in csv_reader:
            try:
                tx_obj = TransactionCreate(
                    transaction_id=row["transaction_id"],
                    user_id=row["user_id"],
                    amount=float(row["amount"]),
                    timestamp=row["timestamp"],
                    device_id=row["device_id"]
                )
            except Exception as e:
                print(f"Skipping invalid row: {row}, error: {e}")
                continue

            cursor.execute(
                "SELECT COUNT(*) FROM transaction_tracking WHERE transaction_id=%s",
                (tx_obj.transaction_id,))
            if cursor.fetchone()[0] > 0:
                duplicates += 1
                continue
            risk_flag, rule_triggered = apply_fraud_rules(cursor,tx_obj)
            cursor.execute("""
                INSERT INTO transaction_tracking
                (transaction_id, user_id, amount, transaction_time, device_info, risk_flag, rule_triggered)
                VALUES (%s,%s,%s,%s,%s,%s,%s)
            """, (tx_obj.transaction_id,tx_obj.user_id,tx_obj.amount,tx_obj.timestamp,tx_obj.device_id,risk_flag,rule_triggered))
            inserted += 1
        conn.commit()
        return {
            "status": "success",
            "inserted": inserted,
            "duplicates_skipped": duplicates}
    except Exception as e:
        print(str(e))
        raise HTTPException(status_code=500, detail="Internal Server Error")
    finally:
        if cursor:
            cursor.close()
        if conn:
            conn.close()



