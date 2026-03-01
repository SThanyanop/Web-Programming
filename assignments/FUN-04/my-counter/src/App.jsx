import React, { useState } from 'react';
import './App.css';

function App() {
  const [manCount, setManCount] = useState(0);
  const [womanCount, setWomanCount] = useState(0);
  const [logs, setLogs] = useState([]);

  // Saves current counts and adds a timestamp
  const handleSave = () => {
    const time = new Date().toLocaleTimeString();
    const entry = `Saved: Man [${manCount}] Woman [${womanCount}] at ${time}`;
    setLogs([entry, ...logs]); // Adds new log to the top of the array
  };

  // Clears all counts and history
  const handleReset = () => {
    setManCount(0);
    setWomanCount(0);
    setLogs([]);
  };

  return (
    <div className="app-container">
      {/* Home Button - Top Right */}
      <nav className="top-nav">
        <a  className="home-btn" onClick={() => window.location.href='http://127.0.0.1:5500/index.html'}>Home</a>
      </nav>

      <div className="content-wrapper">
        <h1 className="main-title">Population Counter</h1>

        <div className="counter-grid">
          {/* Man Counter Section */}
          <div className="counter-card">
            <h2>Man</h2>
            <div className="display-screen">{manCount}</div>
            <div className="button-group">
              <button className="ctrl-btn up" onClick={() => setManCount(manCount + 1)}>+1</button>
              <button className="ctrl-btn down" onClick={() => setManCount(manCount - 1)}>-1</button>
            </div>
          </div>

          {/* Woman Counter Section */}
          <div className="counter-card">
            <h2>Woman</h2>
            <div className="display-screen">{womanCount}</div>
            <div className="button-group">
              <button className="ctrl-btn up" onClick={() => setWomanCount(womanCount + 1)}>+1</button>
              <button className="ctrl-btn down" onClick={() => setWomanCount(womanCount - 1)}>-1</button>
            </div>
          </div>
        </div>

        {/* Global Controls */}
        <div className="global-actions">
          <button className="action-btn save" onClick={handleSave}>SAVE LOG</button>
          <button className="action-btn reset" onClick={handleReset}>RESET ALL</button>
        </div>

        {/* Saved Log Display */}
        <div className="log-container">
          <h3>Activity Log</h3>
          <div className="log-display">
            {logs.length === 0 ? <p className="empty-msg">No entries saved yet.</p> : 
              logs.map((log, index) => <p key={index} className="log-item">{log}</p>)
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;