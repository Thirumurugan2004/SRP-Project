import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbarfun from './Navbarfun';
function Student() {
    const [username, setUsername] = useState('');
    axios.defaults.withCredentials = true; 
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/session', {
                    withCredentials: true 
                });
                const data = response.data;
                console.log(data);
                if (data.username) {
                    setUsername(data.username);
                    console.log('username set');
                } else {
                   
                    alert('No username found');
                    window.location.href='/';
                }
            } catch (error) {
                console.log('Error:', error);
                alert('Error fetching username');
                window.location.href='/';
            }
        };

        fetchData();
    }, []);

    return (
        <>
       <Navbarfun/>
            <h1>Student</h1>
            <p>Welcome, {username}</p>

        </>
    );
}

export default Student;
