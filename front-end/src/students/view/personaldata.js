import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbarfun from '../../usercomponents/Navbarfun';

function ViewStudentPersonal() {
    const [studentDetails, setStudentDetails] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:5000/session')
            .then(response => {
                const username = response.data.username;
                axios.get(`http://localhost:5000/studentDetails/${username}`)
                    .then(response => {
                        const formattedStudentDetails = {
                            ...response.data,
                            DateOfBirth: formatDate(response.data.DateOfBirth)
                        };
                        setStudentDetails(formattedStudentDetails);
                    })
                    .catch(error => {
                        console.error('Error fetching student details:', error);
                    });
            })
            .catch(error => {
                console.error('Error fetching username:', error);
            });
    }, []);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <>
            <Navbarfun />
            <div>
                <h2>Student Personal Details</h2>
                {studentDetails && (
                    <div>
                        <p><strong>Roll Number:</strong> {studentDetails.RollNumber}</p>
                        <p><strong>Date of Birth:</strong> {studentDetails.DateOfBirth}</p>
                        <p><strong>Address:</strong> {studentDetails.Address}</p>
                        <p><strong>Phone:</strong> {studentDetails.Phone}</p>
                    </div>
                )}
            </div>
        </>
    );
}

export default ViewStudentPersonal;
