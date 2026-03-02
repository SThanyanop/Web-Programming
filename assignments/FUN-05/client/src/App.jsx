import React, { useState, useEffect } from 'react';
import './App.css';

// 1. Declare API_URL at the top
const API_URL = "http://localhost:5000/api/logs";

function App() {
  const [manCount, setManCount] = useState(0);
  const [womanCount, setWomanCount] = useState(0);
  const [logs, setLogs] = useState([]);

  // 2. YOUR EXACT FUNCTION (Defined before useEffect)
  const fetchLogs = async () => {
    try {
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error("Server not responding");
      const data = await res.json();
      setLogs(data); // Safe: only updates state after fetch completes
    } catch (err) {
      console.error("Failed to fetch logs:", err);
    }
  }

  // 3. Trigger fetch on mount
  useEffect(() => {
    fetchLogs();
  }, []);

  const handleSave = async () => {
    await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ manCount, womanCount })
    });
    fetchLogs(); 
  };

  const handleReset = async () => {
    await fetch(API_URL, { method: 'DELETE' });
    setManCount(0);
    setWomanCount(0);
    setLogs([]);
  };

  return (
    <div className="app-container">
      <nav className="top-nav">
        <a className="home-btn" onClick={() => window.location.href='http://127.0.0.1:5500/index.html'}>
          Home
        </a>
      </nav>

      <div className="content-wrapper">
        <h1 className="main-title">Population Counter</h1>

        <div className="counter-grid">
          <div className="counter-card">
            <h2 className="card-label">Man</h2>
            <div className="display-screen">{manCount}</div>
            <div className="button-group">
              <button className="ctrl-btn up" onClick={() => setManCount(manCount + 1)}>+1</button>
              <button className="ctrl-btn down" onClick={() => setManCount(manCount - 1)}>-1</button>
            </div>
          </div>

          <div className="counter-card">
            <h2 className="card-label">Woman</h2>
            <div className="display-screen">{womanCount}</div>
            <div className="button-group">
              <button className="ctrl-btn up" onClick={() => setWomanCount(womanCount + 1)}>+1</button>
              <button className="ctrl-btn down" onClick={() => setWomanCount(womanCount - 1)}>-1</button>
            </div>
          </div>
        </div>

        <div className="global-actions">
          <button className="action-btn save" onClick={handleSave}>SAVE LOG</button>
          <button className="action-btn reset" onClick={handleReset}>RESET</button>
        </div>

        <div className="log-container">
          <h3 className="log-title">Database Records</h3>
          <div className="log-display">
            {logs.map((log) => (
              <p key={log._id} className="log-item">
                {new Date(log.timestamp).toLocaleTimeString()}: M[{log.manCount}] W[{log.womanCount}]
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;