const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const app = express();
require('dotenv').config();

// const corsOptions = {
//   origin: [
//                              // Deployed frontend
//     'http://localhost:3000' // Local frontend
//   ],
//   methods: ['GET', 'POST', 'DELETE'], // Allowed methods
//   credentials: true // Allow credentials like cookies
// };

// app.use(cors(corsOptions));
app.use(cors({
  origin:[
    'http://localhost:3000',
    'https://mynotes-app-frontend.vercel.app/signin'

  ] ,  // Frontend origin
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