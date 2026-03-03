import React from "react";

function Dashboard({ dashboard }) {
  return (
    <div className="dashboard-grid">
      <div className="card stat">
        <h4>Total Transactions</h4>
        <p>{dashboard.total_transactions || 0}</p>
      </div>

      <div className="card stat flagged">
        <h4>Total Flagged</h4>
        <p>{dashboard.flagged_transactions || 0}</p>
      </div>

      <div className="card stat">
        <h4>High Risk</h4>
        <p>{dashboard.high_risk || 0}</p>
      </div>

      <div className="card stat">
        <h4>Suspicious</h4>
        <p>{dashboard.suspicious || 0}</p>
      </div>
    </div>
  );
}

export default Dashboard;