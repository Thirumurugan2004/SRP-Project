-- Table to store information about students
CREATE TABLE Students (
    RollNumber INT PRIMARY KEY,
    FirstName VARCHAR(50),
    LastName VARCHAR(50),
    Email VARCHAR(100),
    FacultyAdvisorID INT,
    -- Add other student details as needed
    FOREIGN KEY (FacultyAdvisorID) REFERENCES Teachers(TeacherID)
);

-- Table to store information about subjects
CREATE TABLE Subjects (
    SubjectID VARCHAR(50) PRIMARY KEY,
    SubjectName VARCHAR(50),
    Semester INT,
    -- Add other subject details as needed
);

-- Table to store information about teachers
CREATE TABLE Teachers (
    TeacherID INT PRIMARY KEY,
    FirstName VARCHAR(50),
    LastName VARCHAR(50),
    Email VARCHAR(100),
    -- Add other teacher details as needed
);

-- Table to associate teachers with subjects
CREATE TABLE TeacherSubjects (
    TeacherID INT,
    SubjectID INT,
    PRIMARY KEY (TeacherID, SubjectID),
    FOREIGN KEY (TeacherID) REFERENCES Teachers(TeacherID),
    FOREIGN KEY (SubjectID) REFERENCES Subjects(SubjectID)
);

-- Table to store marks for each student in each subject
CREATE TABLE Marks (
    RollNumber INT,
    SubjectID INT,
    Semester INT,
    MarksObtained INT,
    PRIMARY KEY (RollNumber, SubjectID, Semester),
    FOREIGN KEY (RollNumber) REFERENCES Students(RollNumber),
    FOREIGN KEY (SubjectID) REFERENCES Subjects(SubjectID)
);
-- Table to store personal details of students
CREATE TABLE StudentDetails (
    RollNumber INT PRIMARY KEY,
    DateOfBirth DATE,
    Address VARCHAR(255),
    Phone VARCHAR(20)
);

-- Table to store achievements of students
CREATE TABLE StudentAchievements (
    AchievementID INT PRIMARY KEY,
    RollNumber INT,
    AchievementDescription VARCHAR(255),
    AchievementDate DATE,
    FOREIGN KEY (RollNumber) REFERENCES Students(RollNumber)
);

-- Table to store awards received by students
CREATE TABLE StudentAwards (
    AwardID INT PRIMARY KEY,
    RollNumber INT,
    AwardDescription VARCHAR(255),
    AwardDate DATE,
    FOREIGN KEY (RollNumber) REFERENCES Students(RollNumber)
);

-- Table to store internship details of students
CREATE TABLE StudentInternships (
    InternshipID INT PRIMARY KEY,
    RollNumber INT,
    CompanyName VARCHAR(100),
    InternshipDuration VARCHAR(50),
    InternshipStartDate DATE,
    InternshipEndDate DATE,
    FOREIGN KEY (RollNumber) REFERENCES Students(RollNumber)
);

CREATE TABLE student_academic_details (
    RollNumber INT PRIMARY KEY,
    CurrentSemester INT,
    PreviousSemester INT,
    -- Add other academic details as needed
    FOREIGN KEY (RollNumber) REFERENCES Students(RollNumber)
);

CREATE TABLE users (
    id INT(11) PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('student', 'teacher', 'hod') NOT NULL
);

CREATE TABLE SemesterSubjects (
    SubjectID VARCHAR(50) PRIMARY KEY,
    SubjectName VARCHAR(50),
    Type ENUM('core', 'elective', 'optional') NOT NULL,
    Semester INT,
    -- Add other subject details as needed
);