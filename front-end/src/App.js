import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './logincomponents/loginform';
import Success from './logincomponents/Success';
import Student from './usercomponents/student';
import Teacher from './usercomponents/teacher';
import Hod from './usercomponents/hod';

function App() {
  return (
    <BrowserRouter>
  <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/success" element={<Success/>} />
        <Route path="/student" element={<Student/>} />
        <Route path="/teacher" element={<Teacher/>} />
        <Route path="/hod" element={<Hod/>} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;