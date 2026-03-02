const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// 1. Connect to MongoDB (Make sure MongoDB Compass is running!)
// server/server.js
mongoose.connect('mongodb://127.0.0.1:27017/populationDB')
  .then(() => console.log("🚀 Success: Connected to MongoDB"))
  .catch((err) => {
    console.error("❌ Critical Error: Could not connect to MongoDB!");
    console.error(err.message);
  });

// 2. Create the "Blueprint" for your data
const LogSchema = new mongoose.Schema({
  manCount: Number,
  womanCount: Number,
  timestamp: { type: Date, default: Date.now }
});
const Log = mongoose.model('Log', LogSchema);

// 3. The API Routes
app.get('/api/logs', async (req, res) => {
  const allLogs = await Log.find().sort({ timestamp: -1 });
  res.json(allLogs);
});

app.post('/api/logs', async (req, res) => {
  const newLog = new Log(req.body);
  await newLog.save();
  res.json(newLog);
});

app.delete('/api/logs', async (req, res) => {
  await Log.deleteMany({});
  res.json({ status: "Empty" });
});

app.listen(5000, () => console.log("Server listening on Port 5000"));