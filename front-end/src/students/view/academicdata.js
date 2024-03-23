import React, { useState, useEffect,useRef } from 'react';
import axios from 'axios';
import Navbarfun from '../../usercomponents/Navbarfun';

function ViewStudentAcademic(){
    const userRef = useRef(null);
    const  [basicacademic,setbasicacademic]=useState(null);
    useEffect(() => {
        axios.get('http://localhost:5000/session')
        .then(response => {
            userRef.current = response.data.username;
            axios.get(`http://localhost:5000/basicacademic/${userRef.current}`)
        .then(response => {
            if (response.data) {
                console.log(response.data);
                setbasicacademic(response.data);
            } else {
               alert('no academic found');
            }
        })
        .catch(error => {
            console.log(error);
        })
        })
        .catch(error => {
            console.log(error);
        })
        
    },[])
    return(
        <>
        <Navbarfun/>
        <h1>ViewStudentAcademic</h1>
        {basicacademic &&<div>
            <p>{basicacademic.CurrentSemester}</p>
            <p>{basicacademic.TenthMarks}</p>
            <p>{basicacademic.HigherSecondaryMarks}</p>
            </div>}
        </>
    )
}
export default ViewStudentAcademic;