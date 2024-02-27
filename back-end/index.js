const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const mysql = require('mysql');
const cors = require("cors");
const cookieParser = require("cookie-parser");
const app = express();
const port = 5000;
const store=new session.MemoryStore();
app.use(cookieParser());
// MySQL database configuration
const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'ist_dept' // Update with your database name
};

// Create a MySQL connection
const db = mysql.createConnection({
  host: dbConfig.host,
  user: dbConfig.user,
  password: dbConfig.password,
  database: dbConfig.database
});

// Connect to MySQL
db.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL database');
});

// Session store configuration


// Body parser middleware
app.use(bodyParser.json());
app.use(cors({
  origin: 'http://localhost:3000', 
  methods:["POST","GET","PUT"],// Update with your frontend origin
  credentials: true // Allow credentials (cookies) to be sent
}));

// Session middleware
app.use(session({
  secret: 'temp',
  resave: true, 
  saveUninitialized: true,
  store
}));

// Route for user authentication and session creation
app.post('/login', (req, res) => {
  const { username, password,role } = req.body;
console.log('login request');
console.log(username);
console.log(password);
console.log(role);
  const sql = `SELECT * FROM users WHERE username = ? AND password = ? AND role = ?`;

  db.query(sql, [username, password, role], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Internal Server Error');
    }

    if (result.length > 0) {
      // Set session data upon successful login
      req.session.username = username;
      req.session.isAuthenticated = true;
      req.session.save();
      console.log(store);
      // Insert or update session information in the sessions table
      res.send('Success');
    } else {
      res.status(401).send('Wrong credentials');
    }
  });
});
app.get('/delete-session', (req, res) => {
  // Clear the session data
  req.session.destroy((err) => {
      if (err) {
          console.error('Error destroying session:', err);
          res.status(500).send('Error destroying session');
      } else {
          // Redirect or send a response indicating successful deletion
          res.send('Session deleted successfully');
      }
  });
});
// Route for retrieving session information
app.get('/session', (req, res) => {
  const username = req.session.username;
  const isAuthenticated = req.session.isAuthenticated ||false;
    console.log('Retrieved Username:', username);
    res.json({ username });
  
});
app.get('/studentDetails/:username', (req, res) => {
  const { username } = req.params;
  const sql = 'SELECT * FROM StudentDetails WHERE RollNumber = ?';
  db.query(sql, [username], (err, result) => {
      if (err) {
          throw err;
      }
      res.json(result[0]); // Assuming you expect only one row of data
  });
});
app.put('/updateStudentDetails/:username', (req, res) => {
  const { username } = req.params;
  const updatedData = req.body;
  const sql = 'UPDATE StudentDetails SET DateOfBirth = ?, Address = ?, Phone = ? WHERE RollNumber = ?';
  db.query(sql, [updatedData.DateOfBirth, updatedData.Address, updatedData.Phone, username], (err, result) => {
      if (err) {
          throw err;
      }
      res.send('Student details updated successfully');
  });
});
// Logout route to destroy session
app.get('/logout', (req, res) => {
  const username = req.session.username;
    req.session.destroy((err) => {
      if (err) {
        console.error(err);
        return res.status(500).send('Internal Server Error');
      }
      console.log('Session destroyed');
      res.send('success');
    });

});

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});