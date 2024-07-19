const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config({ path: './.env' });

const app = express();
const PORT = process.env.PORT || 5000;

require('./db/dbconn');

app.use(cors());
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
