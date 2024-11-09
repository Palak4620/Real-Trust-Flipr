const express = require('express');
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const cors = require('cors');
require('dotenv').config();

const app = express();
const path = require('path');

// Connect to MongoDB
connectDB();

// CORS configuration
app.use(cors({
  origin: ["http://real-trust-flipr.vercel.app"],
  methods: ["POST", "GET"],
  credentials: true  
}));

app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/projects', require('./routes/projectRoutes'));
app.use('/api/clients', require('./routes/clientRoutes'));
app.use('/api/contact', require('./routes/contactRoutes'));
app.use('/api/subscriptions', require('./routes/subscriptionRoutes'));

// Server setup
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
