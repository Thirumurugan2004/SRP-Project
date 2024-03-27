import React, { useState } from 'react';
import axios from 'axios';
import Navbarfun from '../../usercomponents/Navbarfun';
function Staffviewpersonal() {
    const [rollNumber, setRollNumber] = useState('');
    const [studentDetails, setStudentDetails] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');

    const handleInputChange = (event) => {
        setRollNumber(event.target.value);
    };

    const fetchStudentDetails = () => {
        axios.get(`http://localhost:5000/studentDetails/${rollNumber}`)
            .then(response => {
                if (response.data) {
                    const formattedStudentDetails = {
                        ...response.data,
                        DateOfBirth: formatDate(response.data.DateOfBirth)
                    };
                    setStudentDetails(formattedStudentDetails);
                    setErrorMessage('');
                } else {
                    setStudentDetails(null);
                    setErrorMessage('No student details available');
                }
            })
            .catch(error => {
                console.error('Error fetching student details:', error);
            });
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <div>
            <Navbarfun />
            
            <h2>Teacher View Student Personal Details</h2>
            <input
                type="number"
                placeholder="Enter Roll Number"
                value={rollNumber}
                onChange={handleInputChange}
            />
            <button onClick={fetchStudentDetails}>Search</button>
            {errorMessage && <p>{errorMessage}</p>}
            {studentDetails && (
                <div>
                    <p><strong>Roll Number:</strong> {studentDetails.RollNumber}</p>
                    <p><strong>Date of Birth:</strong> {studentDetails.DateOfBirth}</p>
                    <p><strong>Address:</strong> {studentDetails.Address}</p>
                    <p><strong>Phone:</strong> {studentDetails.Phone}</p>
                    <p><strong>Sex:</strong> {studentDetails.Sex}</p>
                    <p><strong>Blood Group:</strong> {studentDetails.Blood_Group}</p>
                    <p><strong>Father's Name:</strong> {studentDetails.FatherName}</p>
                    <p><strong>Mother's Name:</strong> {studentDetails.Mothername}</p>
                    <p><strong>Father's Occupation:</strong> {studentDetails.Fatheroccupation}</p>
                    <p><strong>Mother's Occupation:</strong> {studentDetails.Motheroccupation}</p>
                </div>
            )}
        </div>
    );
}

export default Staffviewpersonal;
