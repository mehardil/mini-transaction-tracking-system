
import React from "react";

function TransactionTable({ transactions }) {
  const getRowClass = (tx) => {
    if (!tx.risk_flag) return "normal-row";
    if (tx.rule_triggered === "HIGH_RISK") return "high-risk-row";
    if (tx.rule_triggered === "SUSPICIOUS") return "suspicious-row";
    return "";
  };
  

  return (
    <div className="card">
      <h3>Transactions Table</h3>
      <table className="transaction-table">
        <thead>
          <tr>
            <th>Transaction ID</th>
            <th>User</th>
            <th>Amount</th>
            <th>Risk</th>
            <th>Rule</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((tx) => (
            <tr key={tx.transaction_id} className={getRowClass(tx)}>
              <td>{tx.transaction_id}</td>
              <td>{tx.user_id}</td>
              <td>{tx.amount}</td>
              <td>{tx.risk_flag ? "YES" : "NO"}</td>
              <td>{tx.rule_triggered || "NORMAL"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TransactionTable;





