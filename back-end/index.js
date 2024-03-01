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


const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'ist_dept'
};


const db = mysql.createConnection({
  host: dbConfig.host,
  user: dbConfig.user,
  password: dbConfig.password,
  database: dbConfig.database
});


db.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL database');
});

app.use(bodyParser.json());
app.use(cors({
  origin: 'http://localhost:3000', 
  methods:["POST","GET","PUT"],
  credentials: true 
}));


app.use(session({
  secret: 'temp',
  resave: true, 
  saveUninitialized: true,
  store
}));


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
      req.session.username = username;
      req.session.isAuthenticated = true;
      req.session.save();
      console.log(store);
      res.send('Success');
    } else {
      res.status(401).send('Wrong credentials');
    }
  });
});


app.get('/delete-session', (req, res) => {
  req.session.destroy((err) => {
      if (err) {
          console.error('Error destroying session:', err);
          res.status(500).send('Error destroying session');
      } else {
          res.send('Session deleted successfully');
      }
  });
});


app.get('/session', (req, res) => {
  const username = req.session.username;
  const isAuthenticated = req.session.isAuthenticated ||false;
    console.log('Retrieved Username:', username);
    res.json({ username });
  
});


app.get('/studentDetails/:username', (req, res) => {
  const { username } = req.params;
  console.log('studentDetails:', username);
  const sql = 'SELECT * FROM StudentDetails WHERE RollNumber = ?';
  db.query(sql, [username], (err, result) => {
      if (err) {
          throw err;
      }
      res.json(result[0]); 
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


app.post('/addStudentDetails/:rollNumber', (req, res) => {
  const {rollNumber} = req.params;
  console.log("addsd",rollNumber);
  const newStudentData = req.body;
  const checkExistingQuery = 'SELECT * FROM StudentDetails WHERE RollNumber = ?';
  db.query(checkExistingQuery, [rollNumber], (checkError, checkResult) => {
      if (checkError) {
          throw checkError;
      }
      if (checkResult.length === 0) {
          const insertQuery = 'INSERT INTO StudentDetails (RollNumber, DateOfBirth, Address, Phone, Sex, Blood_Group, FatherName, Mothername, Fatheroccupation, Motheroccupation) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
          const insertValues = [
              rollNumber,
              newStudentData.DateOfBirth,
              newStudentData.Address,
              newStudentData.Phone,
              newStudentData.Sex,
              newStudentData.Blood_Group,
              newStudentData.FatherName,
              newStudentData.Mothername,
              newStudentData.Fatheroccupation,
              newStudentData.Motheroccupation
          ];

          db.query(insertQuery, insertValues, (insertError, insertResult) => {
              if (insertError) {
                  throw insertError;
              }
              res.send('Student details added successfully');
          });
      } else {
          res.status(400).send('Student with this RollNumber already exists');
      }
  });
});


app.post('/changePassword/:username', (req, res) => {
  const username = req.params.username;
  const { oldPassword, newPassword } = req.body.loginDetails;
  const selectQuery = 'SELECT password FROM users WHERE username = ?';
  db.query(selectQuery, [username], (error, results) => {
    if (error) {
      console.error('Error retrieving password from database:', error);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }

    if (results.length === 0) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    const storedPassword = results[0].password;
    if (storedPassword === oldPassword) {
      const updateQuery = 'UPDATE users SET password = ? WHERE username = ?';

      db.query(updateQuery, [newPassword, username], (updateError, updateResults) => {
        if (updateError) {
          console.error('Error updating password:', updateError);
          res.status(500).json({ error: 'Internal server error' });
          return;
        }
        console.log('Password updated successfully');
        res.json({ message: 'Password updated successfully' });
      });
    } else {
      console.log('Wrong old password');
      res.status(400).json({ error: 'Wrong old password' });
    }
  });
});


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


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});