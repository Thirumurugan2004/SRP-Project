--personal and primary  data
CREATE TABLE StudentDetails (
    RollNumber INT PRIMARY KEY,
    DateOfBirth DATE,
    Address VARCHAR(255),
    Phone VARCHAR(20),
    Sex ENUM('Male','Female'),
    Blood_Group varchar(10),
    FatherName varchar(50,
    Mothername varchar(50),
    Fatheroccupation varchar(50),
    Motheroccupation varchar(50)
);

CREATE TABLE users (
    id INT(11) PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('student', 'teacher', 'hod') NOT NULL
);

CREATE TABLE Teachers (
    TeacherID VARCHAR(50) PRIMARY KEY,
    FirstName VARCHAR(50),
    LastName VARCHAR(50),
    Email VARCHAR(100),
    Designation ENUM('professor','assisstant-professor','associate-professor','teaching-fellow','HOD')
);

CREATE TABLE Students (
    RollNumber INT PRIMARY KEY,
    FirstName VARCHAR(50),
    LastName VARCHAR(50),
    Email VARCHAR(100),
    FacultyAdvisorID VARCHAR(50),
    FOREIGN KEY (FacultyAdvisorID) REFERENCES Teachers(TeacherID)
);
--personal and primary data ends

---created above    

--Other details table

CREATE TABLE Internship (
    roll_number INT PRIMARY KEY,
    FOREIGN KEY (roll_number) REFERENCES Students(roll_number),
    employer_details VARCHAR(255),
    on_off_campus ENUM('On Campus', 'Off Campus'),
    ctc DECIMAL(10, 2),
    InternshipDuration VARCHAR(50),
    InternshipStartDate DATE,
    InternshipEndDate DATE,
    product_service_based ENUM('Product Based', 'Service Based')
);

CREATE TABLE Scholarship (
    roll_number INT PRIMARY KEY,
    FOREIGN KEY (roll_number) REFERENCES Students(roll_number),
    name VARCHAR(255),
    amount DECIMAL(10, 2)
);

CREATE TABLE Project (
    roll_number INT PRIMARY KEY,
    FOREIGN KEY (roll_number) REFERENCES Students(roll_number),
    title VARCHAR(255),
    guide VARCHAR(255)
);

CREATE TABLE Sports (
    roll_number INT PRIMARY KEY,
    FOREIGN KEY (roll_number) REFERENCES Students(roll_number),
    event_name VARCHAR(255),
    award VARCHAR(255)
);


CREATE TABLE Exams_Attended (
    roll_number INT PRIMARY KEY,
    FOREIGN KEY (roll_number) REFERENCES Students(roll_number),
    GATE_score DECIMAL(10, 2),
    GRE_score DECIMAL(10, 2),
    TOEFL_score DECIMAL(10, 2),
    IELTS_score DECIMAL(10, 2),
    UPSC_score DECIMAL(10, 2),
    NET_score DECIMAL(10, 2)
);

CREATE TABLE Paper_Published (
    roll_number INT PRIMARY KEY,
    FOREIGN KEY (roll_number) REFERENCES Students(roll_number),
    title VARCHAR(255),
    journal VARCHAR(255),
    date_year DATE,
    DOI_link VARCHAR(255)
);

CREATE TABLE Events (
    roll_number INT PRIMARY KEY,
    FOREIGN KEY (roll_number) REFERENCES Students(roll_number),
    event_name VARCHAR(255),
    institution VARCHAR(255),
    role ENUM('Participate', 'Conduct/Manage'),
    awards VARCHAR(255)
);
---other details end

---academic data

CREATE TABLE Subjects (
    SubjectID VARCHAR(50) PRIMARY KEY,
    SubjectName VARCHAR(50),
    Type ENUM('core', 'elective', 'optional') NOT NULL,
    Semester INT,
);
CREATE TABLE TeacherSubjects (
    TeacherID INT,
    SubjectID INT,
    PRIMARY KEY (TeacherID, SubjectID),
    FOREIGN KEY (TeacherID) REFERENCES Teachers(TeacherID),
    FOREIGN KEY (SubjectID) REFERENCES Subjects(SubjectID)
);

CREATE TABLE Marks (
    RollNumber INT,
    SubjectID INT,
    Semester INT,
    MarksObtained INT,
    PRIMARY KEY (RollNumber, SubjectID, Semester),
    FOREIGN KEY (RollNumber) REFERENCES Students(RollNumber),
    FOREIGN KEY (SubjectID) REFERENCES Subjects(SubjectID)
);

CREATE TABLE student_academic_details (
    RollNumber INT PRIMARY KEY,
    CurrentSemester INT,
    TenthMarks INT,
    HigherSecondaryMarks INT,
    FOREIGN KEY (RollNumber) REFERENCES Students(RollNumber)
);
--academic data ends
