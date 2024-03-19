const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const mysql = require('mysql');
const cors = require("cors");
const cookieParser = require("cookie-parser");
const multer=require('multer');
const path=require('path');
const app = express();
const fs = require('fs');
const port = 5000;
const store=new session.MemoryStore();
app.use(cookieParser());
app.use(express.static('prof-image'));

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
  methods:["POST","GET","PUT","DELETE"],
  credentials: true 
}));


app.use(session({
  secret: 'temp',
  resave: true, 
  saveUninitialized: true,
  store
}));

const storage=multer.diskStorage(
  {
    destination: (req, file, cb) => {
      const directory ='prof-image/'+ path.dirname(file.originalname);
      cb(null, directory);
    },
    filename: (req, file, cb) => {
      cb(null, file.fieldname+"_"+Date.now()+path.extname(file.originalname));
    }
  }
)
const upload=multer({
  storage:storage
})


app.post('/upload/:RollNumber',upload.single('image'),(req,res)=>{
  const {RollNumber}=req.params;
  const image=req.file.filename;
  const sql1="update studentdetails set StudentImage=? where RollNumber=?";
  db.query(sql1,[image,RollNumber],(err,result)=>{
    if(err) return res.json({message:"Error"});
    return res.json({status:"Success"});
  })
})


app.get('/getImage/:RollNumber', (req, res) => {
  const { RollNumber } = req.params;

  const sql1 = "SELECT StudentImage FROM studentdetails WHERE RollNumber=?";
  db.query(sql1, [RollNumber], (err, result) => {
    if (err) return res.json({ message: "Error" });

    if (result.length === 0 || !result[0].StudentImage) {
      return res.json({ message: "Image not found" });
    }

    const imageName = result[0].StudentImage;

    const imagePath = path.join(__dirname, 'prof-image', imageName);

    if (!fs.existsSync(imagePath)) {
      return res.json({ message: "Image not found" });
    }
    fs.readFile(imagePath, (err, data) => {
      if (err) {
        console.error('Error reading image file:', err);
        return res.json({ message: "Error reading image file" });
      }
      res.writeHead(200, { 'Content-Type': 'image/*' });
      res.end(data);
    });
  });
});

app.post('/login', (req, res) => {
  const { username, password,role } = req.body;
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

app.get('/InternshipDetails/:username', (req, res) => {
  const { username } = req.params;
  const sql = 'SELECT * FROM Internship WHERE roll_number = ?';
  db.query(sql, [username], (err, result) => {
      if (err) {
          throw err;
      }
      res.json(result); 
  });
});

app.get('/ScholarshipDetails/:username', (req, res) => {
  const { username } = req.params;
  const sql = 'SELECT * FROM Scholarship WHERE roll_number = ?';
  db.query(sql, [username], (err, result) => {
      if (err) {
          throw err;
      }
      res.json(result); 
  });
});

app.get('/ProjectDetails/:username', (req, res) => {
  const { username } = req.params;
  const sql = 'SELECT * FROM Project WHERE roll_number = ?';
  db.query(sql, [username], (err, result) => {
      if (err) {
          throw err;
      }
      res.json(result); 
  });
});


app.get('/SportsDetails/:username', (req, res) => {
  const { username } = req.params;
  const sql = 'SELECT * FROM Sports WHERE roll_number = ?';
  db.query(sql, [username], (err, result) => {
      if (err) {
          throw err;
      }
      res.json(result); 
  });
});

app.get('/ExamsDetails/:username', (req, res) => {
  const { username } = req.params;
  const sql = 'SELECT * FROM exams_attended WHERE roll_number = ?';
  db.query(sql, [username], (err, result) => {
      if (err) {
          throw err;
      }
      res.json(result); 
  });
});

app.get('/PaperDetails/:username', (req, res) => {
  const { username } = req.params;
  const sql = 'SELECT * FROM paper_published WHERE roll_number = ?';
  db.query(sql, [username], (err, result) => {
      if (err) {
          throw err;
      }
     
      res.json(result); 
  });
});

app.get('/EventDetails/:username', (req, res) => {
  const { username } = req.params;
  const sql = 'SELECT * FROM events WHERE roll_number = ?';
  db.query(sql, [username], (err, result) => {
      if (err) {
          throw err;
      }
      res.json(result); 
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

app.delete('/deleteScholarship/:id', (req, res) => {
  const id = req.params.id;
  const sql = 'DELETE FROM Scholarship WHERE id =?';
  db.query(sql, [id], (err, result) => {
      if (err) {
          throw err;
      }
      res.send('Scholarship deleted successfully');
  });
})

app.delete('/deleteInternship/:id', (req, res) => {
  const id = req.params.id;
  const sql = 'DELETE FROM Internship WHERE id =?';
  db.query(sql, [id], (err, result) => {
      if (err) {
          throw err;
      }
      res.send('Internship deleted successfully');
  });
})

app.delete('/deleteProject/:id', (req, res) => {
  const id = req.params.id;
  const sql = 'DELETE FROM Project WHERE id =?';
  db.query(sql, [id], (err, result) => {
      if (err) {
          throw err;
      }
      res.send('Project deleted successfully');
  });
})

app.delete('/deleteSports/:id', (req, res) => {
  const id = req.params.id;
  const sql = 'DELETE FROM Sports WHERE id =?';
  db.query(sql, [id], (err, result) => {
      if (err) {
          throw err;
      }
      res.send('Sports deleted successfully');
  });
})

app.delete('/deletePapers/:id', (req, res) => {
  const id = req.params.id;
  const sql = 'DELETE FROM paper_published WHERE id =?';
  db.query(sql, [id], (err, result) => {
      if (err) {
          throw err;
      }
      res.send('Papers deleted successfully');
  });
})

app.delete('/deleteEvents/:id', (req, res) => {
  const id = req.params.id;
  const sql = 'DELETE FROM Events WHERE id =?';
  db.query(sql, [id], (err, result) => {
      if (err) {
          throw err;
      }
      res.send('Events deleted successfully');
  });
})


app.post('/addScholarship/:roll_number', (req, res) => {
  const {roll_number}=req.params;
  const scholarshipData = req.body;
  // Insert scholarship data into MySQL table
  const sql = 'INSERT INTO Scholarship (roll_number,ScholarshipProvider, amount) VALUES (?,?, ?)';
  db.query(sql, [roll_number,scholarshipData.ScholarshipProvider, scholarshipData.amount], (err, result) => {
      if (err) {
          console.error('Error adding scholarship data:', err);
          res.status(500).json({ error: 'Failed to add scholarship data to database' });
      } else {
          console.log('Scholarship data added successfully');
          res.status(200).json({ message: 'Scholarship data added successfully' });
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