const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const app = express();
require('dotenv').config();

// CORS configuration
app.use(cors({
  origin: [
    'http://localhost:3000', // Local development
    'https://mynotes-app-frontend.vercel.app' // Deployed frontend
  ],
  methods: ['GET', 'POST', 'DELETE', 'OPTIONS', 'PUT', 'PATCH'], // Add any other methods you use
  credentials: true // Allow cookies and credentials
}));

app.use(express.json());
app.use(cookieParser());

// Database connection
require('./db/dbconn');

// Routes
const authRoutes = require('./router/auth');
const noteRoutes = require('./router/notesRoute');

// Use routes
app.use(authRoutes);
app.use(noteRoutes);
app.get('/favicon.ico', (req, res) => res.status(204));  // No Content


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server has started at port ${PORT}`);
});
