// client/src/App.jsx
import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [manCount, setManCount] = useState(0);
  const [womanCount, setWomanCount] = useState(0);
  const [logs, setLogs] = useState([]);

  // FETCH: Get data from MongoDB when the app opens
  useEffect(() => {
    fetch('http://localhost:5000/api/logs')
      .then(res => res.json())
      .then(data => setLogs(data));
  }, []);

  // SAVE: Send counts to the Backend
  const handleSave = async () => {
    const response = await fetch('http://localhost:5000/api/logs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ manCount, womanCount })
    });
    const newEntry = await response.json();
    setLogs([newEntry, ...logs]); // Update UI with the new database entry
  };

  // RESET: Tell Backend to clear the collection
  const handleReset = async () => {
    await fetch('http://localhost:5000/api/logs', { method: 'DELETE' });
    setManCount(0);
    setWomanCount(0);
    setLogs([]);
  };

  return (
    <div className="app-container">
       <nav className="top-nav">
        <button className="home-btn" onClick={() => window.location.reload()}>Refresh</button>
      </nav>

      <div className="content-wrapper">
        <h1 className="main-title">Population Counter</h1>
        <div className="counter-grid">
          <div className="counter-card">
            <h2 className="card-label">Man</h2>
            <div className="display-screen">{manCount}</div>
            <div className="button-group">
              <button className="ctrl-btn up" onClick={() => setManCount(manCount + 1)}>+</button>
              <button className="ctrl-btn down" onClick={() => setManCount(manCount - 1)}>-</button>
            </div>
          </div>
          <div className="counter-card">
            <h2 className="card-label">Woman</h2>
            <div className="display-screen">{womanCount}</div>
            <div className="button-group">
              <button className="ctrl-btn up" onClick={() => setWomanCount(womanCount + 1)}>+</button>
              <button className="ctrl-btn down" onClick={() => setWomanCount(womanCount - 1)}>-</button>
            </div>
          </div>
        </div>

        <div className="global-actions">
          <button className="action-btn save" onClick={handleSave}>SAVE TO MONGODB</button>
          <button className="action-btn reset" onClick={handleReset}>DELETE ALL</button>
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