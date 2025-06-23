const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();


const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors({
  origin: 'http://192.168.29.241:3000',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/menu', require('./routes/menuRoutes'));

// Connect to DB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to DB'))
  .catch(err => console.error(err));

// Start Server
app.listen(PORT,'0.0.0.0', () => console.log(`Server running on port ${PORT}`));