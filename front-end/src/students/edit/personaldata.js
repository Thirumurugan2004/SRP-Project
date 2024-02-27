import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import Navbarfun from '../../usercomponents/Navbarfun';

function EditStudentPersonal() {
    const [studentData, setStudentData] = useState({
        RollNumber: '',
        DateOfBirth: '',
        Address: '',
        Phone: ''
    });
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate(); // useNavigate hook for navigation
    axios.defaults.withCredentials = true; 
    useEffect(() => {
        const fetchStudentDetails = async () => {
            try {
                const response = await axios.get('http://localhost:5000/session');
                const username = response.data.username;
                const studentResponse = await axios.get(`http://localhost:5000/studentDetails/${username}`);
                setStudentData(studentResponse.data);
            } catch (error) {
                console.error('Error fetching student details:', error);
            }
        };

        fetchStudentDetails();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setStudentData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`http://localhost:5000/updateStudentDetails/${studentData.RollNumber}`, studentData);
            console.log('Student data updated successfully:', response.data);
            setSuccessMessage('Student data updated successfully');
            setTimeout(() => {
                setSuccessMessage('');
                navigate('/student/view/personaldata', { replace: true }); // Redirect to ViewPersonalData page
            }, 2000); // Redirect after 2 seconds
        } catch (error) {
            console.error('Error updating student data:', error);
        }
    };

    return (
        <>
            <Navbarfun />
            <div>
                <h1>Edit Student Personal Data</h1>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Date of Birth:</label>
                        <input type="date" name="DateOfBirth" value={studentData.DateOfBirth} onChange={handleChange} />
                    </div>
                    <div>
                        <label>Address:</label>
                        <input type="text" name="Address" value={studentData.Address} onChange={handleChange} />
                    </div>
                    <div>
                        <label>Phone:</label>
                        <input type="text" name="Phone" value={studentData.Phone} onChange={handleChange} />
                    </div>
                    <button type="submit">Submit</button>
                </form>
                {successMessage && <div className="success-message">{successMessage}</div>}
            </div>
        </>
    );
}

export default EditStudentPersonal;
