Mini Transaction Risk Monitoring System

overview
This project is small fraud detection system that identifies fraud transaction on specific rules.
its highlights these transactions and displays their counts on a dashboard 

Main Features 
1-Upload transaction form




2-List all transaction,highlighting High Risk and Suspicious transactions
3-Dashboard analytics showing total transactions and red-flagged counts




workflow 

(a) for post transaction:

1-fill transaction form which has the following input ("transaction_id", "user_id", "amount", "timestamp", "device_id")
2-When clicking on the submit button, it's called post/transactions api
3- when api called, first check the input field value that the amount is greater than 0, and the user_id and transaction_id is at least the length of 1 character
4- If all is valid, then check transaction_id duplicate; if it's a duplicate, return "transactions id already exists."
5- If no transaction ID duplicate exists, check both rule amount > 2000 and the user has more than 3 transactions
If rule 1: occurs, we mark a 'high risk' transaction
If rule 2: occurs, we mark it a 'suspicious' transaction
If no rule occurs, we mark it as empty, which means normal transactions
6- After verifying all things, we insert this into the database table ->(transaction_tracking)

(b) for get dashboard

1-I created a table structure with the following columns: (Transaction ID,User,Amount,Risk,Rule)
2-I called the Get/transactions api using fetch() method in the frontend
3-Api return response in json format 
3-I displayed all transactions (Normal, Suspicious, High Risk) in an HTML table
4-I applied different colour based:


(c) for get dashboard

1 create a Dashboard that contains cards
*  total transactions,Total Flagged,High Risk,Suspicious
2-called the Get/dashboard api using fetch() method in the frontend
3-Use a single SQL query to retrieve all dashboard counts:
* count(*) as total_transactions -->  Get the total number of transactions
* sum(risk_flag=1) --> Get the count of flagged transactions.
* sum(rule_triggered='HIGH_RISK') --> Get the count of all high-risk transactions.
* sum(rule_triggered='SUSPICIOUS') --> Get the count of all suspicious transactions.
    


To handle 1 million transactions per day

The following optimizations are implemented:

    1. Batch Inserts with Kafka
    • Process transactions in batches instead of single inserts.
    • Reduces database load and improves write performance
       
    2. Redis Caching
    • Use Redis for Frequently accessed data
       
    3. Database Optimization
       
    A. Now, since transaction volume is manageable, all transactions are stored in one main table
           Apply the following structure:
       1 Create transaction_flag Table
    • Create a transaction_flag table with transaction_id as a foreign key to maintain data integrity.
    • It keeps the main transaction_tracking table lighter, improving performance and scalability
           2 Create Stats_counter table
    • Create a stats_counter table to store pre-calculated counters, avoiding heavy COUNT() and SUM() queries on large datasets.
    • When a rule is triggered, increment the counter immediately, eliminating the need for expensive aggregation queries later
      

    4. Asynchrouous Function
        Use async functions to handle multiple operations concurrently for better performance 
       Apply async to:  
    •  Database operations  as a result non-blocking queries
    •  API handling handle multiple requests simultaneously
    •   Rule processing  running transaction process in parallel 

  










instruction to stepup project

(a)-Clone the Repository
git clone <repo-url>

(b)-Backend Setup
1-
1-
1-cd backend
1-pip install -r requirements.txt
2- create .env with mysql credentials
MYSQL_HOST=localhost
MYSQL_USER=root
MYSQL_PASSWORD=Me$$1234
MYSQL_DB=transaction_tracking


for backend
1- install python
2- cd backend
3- pip install -r requirements.txt
4- create database (transaction_tracking)
5- import files.sql
6- uvicorn main:app --reload

for frontend

1-cd frontend
2-npm install
3-npm start





















