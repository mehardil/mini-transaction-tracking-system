"""in this script we will handle all logic related fraud transaction"""

import schemas 
def apply_fraud_rules(cursor, tx: schemas.TransactionCreate):
    """
    Apply fraud rules to the transaction.
    Rule1: amount > 20,000 -> HIGH_RISK
    Rule2: more than 3 transactions by same user -> SUSPICIOUS
    """
    if tx.amount > 20000:
        return True, "HIGH_RISK"
    
    cursor.execute("SELECT COUNT(*) FROM transaction_tracking WHERE user_id=%s", (tx.user_id,))
    count = cursor.fetchone()[0]
    if count >= 3:
        return True, "SUSPICIOUS"

    return False, None