import React, { useState, useEffect,useRef } from 'react';
import axios from 'axios';
import Navbarfun from '../../usercomponents/Navbarfun';
import styles from '../../CSS/view_academicdata.css'
function ViewStudentAcademic(){
    const userRef = useRef(null);
    const cursemRef= useRef(null);
    const  [basicacademic,setbasicacademic]=useState(null);
    const [marks, setMarks] = useState(null);
    const  [sem,setsem]=useState(null);
    const [gpa,setgpa]=useState(null);
    const handleInputChange = (event) => {
        setsem(event.target.value);
       
    };
    useEffect(() => {
        axios.get('http://localhost:5000/session')
        .then(response => {
            userRef.current = response.data.username;

        axios.get(`http://localhost:5000/basicacademic/${userRef.current}`)
        .then(response => {
            if (response.data) {
                setbasicacademic(response.data);
                cursemRef.current = response.data.CurrentSemester;
            } else {
               alert('no academic found');
            }
        })
        .catch(error => {
            console.log(error);
        })
        axios.get(`http://localhost:5000/getsemestermarks/${userRef.current}/${sem}`)
        .then(response => {
            if(response.data){
                setMarks(response.data);
            }
            else{
                alert('no marks found');
            }
        })
        .catch(err => {
            console.log(err);
        })
       axios.get(`http://localhost:5000/getsemestergpa/${userRef.current}/${sem}`)
       .then(response => {
        console.log('sem gpa',response.data);
        setgpa(response.data);
       })
        })
        .catch(error => {
            console.log(error);
        })
        
    },[sem])

    return(
        <>
        <Navbarfun/>
        <h1>ViewStudentAcademic</h1>
        {basicacademic &&<div className='basic-detail'>
            <p>Current Semester : {basicacademic.CurrentSemester}</p>
            <p>Tenth Marks : {basicacademic.TenthMarks}</p>
            <p>Higher Secondary Marks : {basicacademic.HigherSecondaryMarks}</p>
            </div>}
            <div>
            <label htmlFor="semSelect">Select Semester:</label>
            <select
                id="semSelect"
                value={sem || ''}
                onChange={handleInputChange}
            >
                <option value="">Select Semester</option>
                {[...Array(8).keys()].map((num) => (
                    <option key={num + 1} value={num + 1}>{num + 1}</option>
                ))}
            </select>
            <p>Semester: {sem}</p>
        </div>
        {marks &&  <div>
      <h2>Marks Table</h2>
      <table className='marks-table'>
        <thead>
          <tr>
            <th>Subject ID</th>
            <th>Marks Obtained</th>
            <th>Grade</th>
          </tr>
        </thead>
        <tbody>
          {marks.map((mark, index) => (
            <tr key={index}>
              <td>{mark.SubjectID}</td>
              <td>{mark.MarksObtained}</td>
              <td>{mark.Grade}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {gpa && <p className='gpa-show'>Semester GPA:{gpa.gpa}</p>}
    </div>}
        </>
    )
}
export default ViewStudentAcademic;