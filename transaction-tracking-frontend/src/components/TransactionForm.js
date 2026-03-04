import React, { useEffect, useState } from "react";

const API_URL = "http://127.0.0.1:8000";

function TransactionForm({ updatedata }) {
  const [message, setMessage] = useState("");  
  const [form, setForm] = useState({
    transaction_id: "",
    user_id: "",
    amount: "",
    timestamp: "",
    device_id: "",
  });
  const [file, setFile] = useState(null);

 
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(`${API_URL}/transactions`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, amount: Number(form.amount) }),
    });
    const data = await res.json();
    if (res.ok) {
      setForm({ transaction_id: "",
        user_id: "",
        amount: "",
        timestamp: "",
        device_id: "" });
      setMessage(`Success: ${data.message}`);
      updatedata();
    } else {
      setMessage(`Error: ${data.detail}`);
    }
  };

 
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };
  
  const handleFileUpload = async (e) => {
    e.preventDefault();
    if (!file) {
      setMessage("Please select a CSV file");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    
    const res = await fetch(`${API_URL}/transactions/upload`, {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    if (res.ok) {
      setMessage(`Upload Success: Inserted ${data.inserted}, Duplicates Skipped ${data.duplicates_skipped}`);
      setFile(null);
      updatedata();
    } else {
      setMessage(`Error: ${data.detail}`);
    }
  };

 
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => setMessage(""), 3000);
    return () => clearTimeout(timer);
  }, [message]);

  return (
    <div className="card">
      <h3>Add Transaction</h3>

     
      <form className="form" onSubmit={handleSubmit}>
        <input 
        name="transaction_id" 
        placeholder="Transaction ID" 
        value={form.transaction_id} 
        onChange={handleChange}
        required />
        <input 
        name="user_id"
         placeholder="User ID"
         value={form.user_id}
         onChange={handleChange} 
         required />
        <input 
        name="amount" 
        type="number" 
        placeholder="Amount" 
        value={form.amount} 
        onChange={handleChange}
        required />
        <input 
        name="timestamp"
        type="datetime-local"
        value={form.timestamp} 
        onChange={handleChange}
        required />
        <input
        name="device_id"
        placeholder="Device ID"
        value={form.device_id}
        onChange={handleChange} 
        required />
        <button type="submit">Submit</button>
      </form>
      <hr />
      <h3>Upload Transactions CSV</h3>
      <form className="form" onSubmit={handleFileUpload}>
        <input type="file" accept=".csv" onChange={handleFileChange} />
        <button type="submit">Upload File</button>
      </form>
      {message && <div className="status">{message}</div>}
    </div>
  );
}

export default TransactionForm;