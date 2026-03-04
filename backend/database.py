"""in this script we write function related to database"""
import os
import logging
from fastapi import HTTPException
from dotenv import load_dotenv
import mysql.connector

load_dotenv()
def mysql_connection():
    """connect to mysql database"""
    try:
        host = os.getenv('MYSQL_HOST')
        user = os.getenv('MYSQL_USER')
        password = os.getenv('MYSQL_PASSWORD')
        database = os.getenv('MYSQL_DB')
        connection  = mysql.connector.connect(
            host=host,
            user=user,
            database=database,
            password=password
        )
        if connection.is_connected():
            return connection
    except Exception as e:
        raise HTTPException(status_code=500,detail=f"Error : {str(e)}")
    
mysql_connection()