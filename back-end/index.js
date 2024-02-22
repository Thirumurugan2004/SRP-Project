const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const mysql = require('mysql');
const cors = require('cors');
const app = express();
const port = 5000;

// Create a MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'ist_dept'
});

// Connect to MySQL
db.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL database');
});

// Body parser middleware
app.use(bodyParser.json());
app.use(cors({
  origin: 'http://localhost:3000', // Update with your frontend origin
  credentials: true // Allow credentials (cookies) to be sent
}));

// Session middleware
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true
}));

// Route for user authentication and session creation
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const role = req.body.role.toLowerCase();

  const sql = `SELECT * FROM users WHERE username = ? AND password = ? AND role = ?`;

  db.query(sql, [username, password, role], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Internal Server Error');
    }

    if (result.length > 0) {
      req.session.username = username;
      console.log('Session created');
      res.send('Success');
    } else {
      res.status(401).send('Wrong credentials');
    }
  });
});

// Route for retrieving session information
app.get('/session', (req, res) => {
  const username = req.session.username || 'no username'; 
  res.json({ username });
});

// Logout route to destroy session
app.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Internal Server Error');
    }
    console.log('Session destroyed');
    res.redirect('/');
  });
});

// Middleware to handle session and CORS for the '/' route
app.use('/', (req, res, next) => {
  if (req.session.username) {
    req.session.destroy((err) => {
      if (err) {
        console.error(err);
        return res.status(500).send('Internal Server Error');
      }
      console.log('Session destroyed');
      next();
    });
  } else {
    console.log('Session not found');
    next();
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
