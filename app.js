const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

// Load environment variables
require('dotenv').config();

// Route files
const authRoutes = require('./routes/authRoutes');
const chatRoutes = require('./routes/chatRoutes'); // Make sure this line exists
const moodRoutes = require('./routes/moodRoutes');

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Mount routers
app.use('/api/auth', authRoutes);
app.use('/api/chat', chatRoutes); // And this line
app.use('/api/moods', moodRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});