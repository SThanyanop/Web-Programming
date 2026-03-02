const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Enable CORS for your Vite frontend on port 5176
app.use(cors({
  origin: 'http://localhost:5176'
}));

app.use(express.json());

// Connect to local MongoDB using explicit IP to avoid timeout
mongoose.connect('mongodb://127.0.0.1:27017/population_db')
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.error("❌ MongoDB Connection Error:", err));

// Define the Data Schema
const LogSchema = new mongoose.Schema({
  manCount: { type: Number, required: true },
  womanCount: { type: Number, required: true },
  timestamp: { type: Date, default: Date.now }
});

const Log = mongoose.model('Log', LogSchema);

/* --- API ROUTES --- */

// GET: Fetch all logs from the database
app.get('/api/logs', async (req, res) => {
  try {
    const logs = await Log.find().sort({ timestamp: -1 });
    res.json(logs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST: Save a new log entry
app.post('/api/logs', async (req, res) => {
  try {
    const newLog = new Log(req.body);
    const savedLog = await newLog.save();
    res.status(201).json(savedLog);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE: Clear all logs (Reset)
app.delete('/api/logs', async (req, res) => {
  try {
    await Log.deleteMany({});
    res.json({ message: "Database Reset Successful" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));