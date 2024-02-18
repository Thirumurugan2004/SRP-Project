const express = require('express');
const bodyParser = require('body-parser');
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
app.use(cors());
// Route for user authentication
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const role = req.body.role.toLowerCase(); // Ensure role is lowercase
  
  const sql = `SELECT * FROM users WHERE username = ? AND password = ? AND role = ?`;

  db.query(sql, [username, password, role], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Internal Server Error');
    }

    if (result.length > 0) {
      res.send('Success');
    } else {
      res.status(401).send('Wrong credentials');
    }
  });
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
