import React, { useEffect, useState } from "react";


const API_URL = "http://127.0.0.1:8000";

function TransactionForm({ updatedata }) {
  const[message,setmessage] = useState("")  
  const [form, setForm] = useState({
    transaction_id: "",
    user_id: "",
    amount: "",
    timestamp: "",
    device_id: "",
  });
   const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(`${API_URL}/transactions`, {
      method: "POST",
      headers: {"Content-Type": "application/json",},
      body: JSON.stringify({...form,amount: Number(form.amount),}),
      });
    const data = await res.json();  
    if (res.ok){
      setForm({
      transaction_id: "",
      user_id: "",
      amount: "",
      timestamp: "",
      device_id: "",
    });
    setmessage(`Success: ${data.message}`);
    updatedata()
    }
    else{
      setmessage(`Error: ${data.detail}`); 
    }};

    useEffect(()=>{
      if(!message) return
      const timer = setTimeout(() => {
          setmessage("")
        },2000);
      return()=>clearTimeout(timer)
    },[message])

  return (
    <div className="card">
      <h3>Add Transaction</h3>
      <form className="form" onSubmit={handleSubmit}>
        <input
          name="transaction_id"
          placeholder="Transaction ID"
          value={form.transaction_id}
          onChange={handleChange}
          required
        />
        <input
          name="user_id"
          placeholder="User ID"
          value={form.user_id}
          onChange={handleChange}
          required
        />
        <input
          name="amount"
          type="number"
          placeholder="Amount"
          value={form.amount}
          onChange={handleChange}
          required
        />
        <input
          name="timestamp"
          type="datetime-local"
          value={form.timestamp}
          onChange={handleChange}
          required
        />
        <input
          name="device_id"
          placeholder="Device ID"
          value={form.device_id}
          onChange={handleChange}
          required
        />
        <button type="submit">Submit</button>
      </form>
      {message && (
        <div className="status">
            {message}
        </div>
        )}
    </div>
  );
}

export default TransactionForm;