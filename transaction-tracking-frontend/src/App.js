import React, { useEffect, useState } from 'react';
import Dashboard from './components/Dashboard';
import TransactionTable from './components/TransactionTable';
import TransactionForm from './components/TransactionForm';
import './App.css';

export const api_url = "http://127.0.0.1:8000";

function App() {
  const [dashboard, setDashboard] = useState({});
  const [transaction, setTransaction] = useState([]);

  const fetchdashboard = async () => {
    const res = await fetch(`${api_url}/dashboard`);
    const data = await res.json();
    setDashboard(data);
  };

  const fetchtransaction = async () => {
    const res = await fetch(`${api_url}/transactions`);
    const data = await res.json();
    setTransaction(data);
  };

  useEffect(() => {
    fetchdashboard();
    fetchtransaction();
  }, []);

  const updatedata = ()=>{
    fetchdashboard();
    fetchtransaction();
  }

  return (
    <div className="container">
      <h1 className="title">Fraud Transaction Monitoring</h1>
      <TransactionForm updatedata={updatedata}/>
      <Dashboard dashboard={dashboard} />
      <TransactionTable transactions={transaction} />
    </div>
  );
}

export default App;


