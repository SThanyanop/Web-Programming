import React, { useState } from 'react';
import './App.css';

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

  const handleSave = () => {
    const time  = new Date().toLocaleTimeString();
    const total = manCount + womanCount;
    const entry = {
      time,
      man:   manCount,
      woman: womanCount,
      total,
    };
    setLogs([entry, ...logs]);
  };

  const handleReset = () => {
    setManCount(0);
    setWomanCount(0);
    setLogs([]);
  };

  const total = manCount + womanCount;

  return (
    <div className="app-wrap">

      {/* Back button */}
      <nav className="top-nav" role="navigation">
        <a className="back-btn" href="http://127.0.0.1:5500/index.html">
          Back to Spellbook
        </a>
      </nav>

      <div className="content">

        {/* Header */}
        <header className="page-head">
          <p className="page-label">my react project</p>
          <h1 className="page-title">Population Counter</h1>
          <p className="page-sub">
            <em>I learned how to use React hooks for this one — useState is pretty cool!</em>
          </p>
          <div className="head-rule" aria-hidden="true">
            <span className="rule-line" />
            <span className="rule-gem">✦</span>
            <span className="rule-line" />
          </div>
        </header>

        {/* Total display */}
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
            Save to log
          </button>
          <button className="action-btn reset-btn" onClick={handleReset}>
            Reset all
          </button>
        </div>

        {/* Activity log */}
        <section className="log-section" aria-label="Activity log">
          <h2 className="log-title">
            <span className="log-gem" aria-hidden="true">✦</span>
            Activity Log
          </h2>
          <div className="log-body">
            {logs.length === 0
              ? <p className="log-empty"><em>Nothing saved yet. Try pressing "Save to log"!</em></p>
              : logs.map((entry, i) => (
                  <div className="log-row" key={i}>
                    <span className="log-time">{entry.time}</span>
                    <span className="log-detail">
                      Man <strong>{entry.man}</strong> · Woman <strong>{entry.woman}</strong> · Total <strong>{entry.total}</strong>
                    </span>
                  </div>
                ))
            }
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