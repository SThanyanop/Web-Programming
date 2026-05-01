import React, { useState, useEffect } from 'react';
import './App.css';

// My first time connecting to a real database!
const API_URL = "http://localhost:5000/api/logs";

function CounterCard({ label, count, onAdd, onSubtract }) {
  return (
    <div className="counter-card">
      <h2 className="card-label">{label}</h2>
      <div className={
        'display-screen ' +
        (count > 0 ? 'positive' : count < 0 ? 'negative' : '')
      }>
        {count}
      </div>
      <div className="btn-row">
        <button className="ctrl-btn add" onClick={onAdd} aria-label={'Add one to ' + label}>
          <span className="btn-icon">+</span>
          <span className="btn-text">Add</span>
        </button>
        <button className="ctrl-btn sub" onClick={onSubtract} aria-label={'Subtract one from ' + label}>
          <span className="btn-icon">−</span>
          <span className="btn-text">Subtract</span>
        </button>
      </div>
    </div>
  );
}

function App() {
  const [manCount,   setManCount]   = useState(0);
  const [womanCount, setWomanCount] = useState(0);
  const [logs,       setLogs]       = useState([]);
  const [loading,    setLoading]    = useState(true);
  const [status,     setStatus]     = useState('');

  // Fetch all logs from MongoDB on load
  const fetchLogs = async () => {
    try {
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error('Server not responding');
      const data = await res.json();
      setLogs(data);
    } catch (err) {
      console.error('Failed to fetch logs:', err);
      setStatus('Could not reach the server. Is it running?');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  const handleSave = async () => {
    setStatus('Saving...');
    try {
      await fetch(API_URL, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ manCount, womanCount }),
      });
      setStatus('Saved to database!');
      fetchLogs();
    } catch {
      setStatus('Save failed — is the server running?');
    }
  };

  const handleReset = async () => {
    setStatus('Clearing...');
    try {
      await fetch(API_URL, { method: 'DELETE' });
      setManCount(0);
      setWomanCount(0);
      setLogs([]);
      setStatus('All cleared.');
    } catch {
      setStatus('Reset failed — is the server running?');
    }
  };

  const total = manCount + womanCount;

  return (
    <div className="app-wrap">

      <nav className="top-nav" role="navigation">
        <a className="back-btn" href="http://127.0.0.1:5500/index.html">
          Back to Spellbook
        </a>
      </nav>

      <div className="content">

        {/* Header */}
        <header className="page-head">
          <p className="page-label">my react + mongodb project</p>
          <h1 className="page-title">Population Counter</h1>
          <p className="page-sub">
            <em>This one saves to a real database! I learned Express and MongoDB for this — it took a while but I got it working.</em>
          </p>
          <div className="head-rule" aria-hidden="true">
            <span className="rule-line" />
            <span className="rule-gem">✦</span>
            <span className="rule-line" />
          </div>
        </header>

        {/* Total */}
        <div className="total-wrap">
          <p className="total-label">total count</p>
          <div className={
            'total-num ' +
            (total > 0 ? 'positive' : total < 0 ? 'negative' : '')
          }>
            {total}
          </div>
        </div>

        {/* Counter cards */}
        <div className="counter-grid">
          <CounterCard
            label="Man"
            count={manCount}
            onAdd={()      => setManCount(manCount + 1)}
            onSubtract={() => setManCount(manCount - 1)}
          />
          <CounterCard
            label="Woman"
            count={womanCount}
            onAdd={()      => setWomanCount(womanCount + 1)}
            onSubtract={() => setWomanCount(womanCount - 1)}
          />
        </div>

        {/* Actions */}
        <div className="actions">
          <button className="action-btn save-btn" onClick={handleSave}>
            Save to database
          </button>
          <button className="action-btn reset-btn" onClick={handleReset}>
            Reset all
          </button>
        </div>

        {/* Status message */}
        {status && (
          <p className="status-msg">{status}</p>
        )}

        {/* Database log */}
        <section className="log-section" aria-label="Database records">
          <h2 className="log-title">
            <span className="log-gem" aria-hidden="true">✦</span>
            Database Records
            <span className="log-badge">MongoDB</span>
          </h2>

          <div className="log-body">
            {loading ? (
              <p className="log-empty"><em>Connecting to database...</em></p>
            ) : logs.length === 0 ? (
              <p className="log-empty"><em>No records yet. Save something to see it here!</em></p>
            ) : (
              logs.map((log) => (
                <div className="log-row" key={log._id}>
                  <span className="log-time">
                    {new Date(log.timestamp).toLocaleTimeString()}
                  </span>
                  <span className="log-detail">
                    Man <strong>{log.manCount}</strong> · Woman <strong>{log.womanCount}</strong> · Total <strong>{log.manCount + log.womanCount}</strong>
                  </span>
                  <span className="log-id" title={log._id}>
                    id: {log._id.slice(-6)}
                  </span>
                </div>
              ))
            )}
          </div>
        </section>

        <footer className="page-footer">
          <p className="footer-quote"><em>"Even if I forget, the spells I've mastered will stay with me."</em></p>
          <p className="footer-credit">Thanyanop · FRA502 Web Programming · FIBO KMUTT</p>
        </footer>

      </div>
    </div>
  );
}

export default App;