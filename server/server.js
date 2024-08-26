const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const app = express();
require('dotenv').config();

app.use(cors({
  origin:[
    'http://localhost:3000',
    'https://mynotes-app-frontend.vercel.app'

  ] ,
  methods: ['GET', 'POST', 'DELETE', 'OPTIONS'],  // Frontend origin
  credentials: true, // Allow credentials (cookies, etc.)
}));
const PORT = process.env.PORT || 5000;

require('./db/dbconn');

app.use(express.json());
app.use(cookieParser());

// Routes
const authRoutes = require('./router/auth');
const noteRoutes = require('./router/notesRoute');

app.use(authRoutes);  // Remove the prefix
app.use(noteRoutes);  // Remove the prefix

app.listen(PORT, () => {
  console.log(`Server has started at port ${PORT}`);
});