import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from './logincomponents/loginform';
import Success from './logincomponents/Success';
import Student from './usercomponents/student';
import Teacher from './usercomponents/teacher';
import Hod from './usercomponents/hod';
import ViewStudentPersonal from './students/view/personaldata';
import ViewStudentAcademic from './students/view/academicdata';
import ViewStudentOther from './students/view/otherdata';
import EditStudentPersonal from './students/edit/personaldata';
import Changepassword from './logincomponents/Changepassword';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/success" element={<Success />} />
        <Route path="/student" element={<Student />} />
        <Route path="/teacher" element={<Teacher />} />
        <Route path="/hod" element={<Hod />} />
        <Route path="/student/view/personaldata" element={<ViewStudentPersonal />} />
        <Route path="/student/view/academicdata" element={<ViewStudentAcademic />} />
        <Route path="/student/view/otherdata" element={<ViewStudentOther />} />
        <Route path="/student/edit/personaldata" element={<EditStudentPersonal />} />
        <Route path="/changepassword" element={<Changepassword/>}/>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
