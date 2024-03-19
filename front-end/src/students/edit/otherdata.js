import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Navbarfun from '../../usercomponents/Navbarfun';

function EditStudentOther(){
    const userRef = useRef(null);
useEffect(() => {
    axios.get('http://localhost:5000/session')
        .then(response => {
            userRef.current = response.data.username; 
            console.log('from other data edit', userRef.current);
        })
        .catch(error => {
            console.error('Error fetching session:', error);
        });
}, []);
    return(
        <>
        <Navbarfun/>
        <h1>EditStudentOther</h1>
        </>
    )
}
export default EditStudentOther;