import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './logincomponents/loginform';
import Success from './logincomponents/Success';


function App() {
  return (
    <BrowserRouter>
  <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/success" element={<Success/>} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;
