Mini Transaction Risk Monitoring System

Overview:
This project is a small fraud detection system that identifies fraud transaction on specific rules. 

It highlights these transactions and displays their counts on a dashboard

Main Features:

  • Upload transaction form
  
  • List all transactions, highlighting High Risk and Suspicious transactions 
  
  • Dashboard analytics showing total transactions and red-flagged counts

Backend:

3.1. Transaction Form (post api)

  • Submit transaction details via a form. 
  • Post transaction using the POST/transactions API.

3.2.Validation Checks

  • Ensure all fields are filled; if not its give. 
  
  • Verify the data types for each field.
  
  • Validate that the transaction amount is greater than 0 before processing. 
  
  • If the amount is 0 or negative, return an error like (invalid transaction amount. Amount must be greater than 0)
  
  • Validate that both user_id,transaction_id and device_id have a minimum length of 1 character • If either field is empty, return an error

3.3. Duplicate Transaction Check 

  • If the transaction is valid, check whether the transaction ID already exists in the system.
  
  • If a duplicate transaction is found, return: "Transaction ID already exists."

3.4. Fraud Rule Evaluation: 

If the transaction is not a duplicate, evaluate it based on the following 

rules: Rule 1: High Risk • If the transaction amount is greater than 2000, mark it as High Risk. 

Rule 2: Suspicious Activity • If a user performs more than three transactions, mark the transaction as Suspicious.


Frontend:


4.1 Upload Transactions Form

Make user input that has the following columns • transaction_id • user_id • amount • timestamp • device_id

4.2 Transactions Table

4.2.1 List all transactions • columns: Transaction ID, User, Amount, Risk, Rule

4.2.2 Highlight flagged ones 

  • high-risk-row -> background-color: #ffcccc; • suspicious-row -> background-color: #fff3cd; • normal-row -> background-color: #eafaf1;

4.3. Dashboard Section

Dashboard that provides clear visibility:
  
   • total transactions count
  
   • total flagged transaction count
  
   • high-risk transaction count
  
   • suspicious transaction count
  
To handle 1 million transactions per day:

The following optimizations will be implemented:

6.1 Batch Inserts with Kafka 
  
  • Process transactions in batches instead of single inserts.
  
  • Reduces database load and improves write performance
  
 6.2. Redis Caching 

  • Use Redis for Frequently accessed data 

6.3. Database Optimization 

Now, since transaction volume is manageable, all transactions are stored in one main table. 

Apply the following structure

6.3.1. Create transaction_flag Table
  
   • Create a transaction_flag table with transaction_id as a foreign key to maintain data integrity.
  
   • It keeps the main transaction_tracking table lighter, improving performance and scalability
  
6.3.2. Create Stats_counter table

  • Create a stats_counter table to store pre-calculated counters, avoiding heavy COUNT() and SUM() queries on large datasets. 

  • When a rule is triggered, increment the counter immediately, eliminating the need for expensive aggregation queries later

6.3.1. Create transaction_flag Table Create a transaction_flag table with transaction_id as a foreign key to maintain data integrity

6.4. Asynchrouous Function Use async functions to handle multiple operations concurrently for better 

performance Apply async to:
  
  • Database operations as a result non-blocking queries 
  
  • API handling handle multiple requests simultaneously
  
  • Rule processing running transaction process in parallel
  


 Project Setup Instructions
Step 1: Clone the Repository

            git clone https://github.com/mehardil/mini-transaction-tracking-system.git

Step 2: Move to Project Directory

            cd mini-transaction-tracking-system/

Backend Setup

Step 3: Move to Backend Directory

                cd backend/

Step 4: Install Python Dependencies

               pip install -r requirements.txt

Step 6: Create Database

Option 1:Using Command Line

1)               CREATE DATABASE transaction_tracking;

2)               mysql -u username -p transaction_tracking <  transaction_tracking.sql

Option 2: Using a SQL Editor
   

 • Open your preferred SQL editor
    

•  Open the file transaction_tracking.sql.
    
• Run the SQL queries inside the file to create all tables and initial data.


Step 8: Start Backend Server

    •                   uvicorn main:app –reload

Make sure you are inside the backend folder before running this command.

The server will start at: http://localhost:8000 by default.



frontend Setup

Step 9: Move to Frontend Directory

             cd transaction-tracking-frontend/

Step 10: Install Node.js Dependencies

using this command install node dependencies

            • npm install

Step 11: Start Frontend

using this command start react frontend

    • npm start
    • http://localhost:3000/  (open this url)
















1-cd frontend 2-npm install 3-npm start
