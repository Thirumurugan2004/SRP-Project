import React, { useState, useEffect } from 'react';

function Student() {
    const [username, setUsername] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:5000/session', {
                    method: 'GET',
                    credentials: 'include' // Ensure cookies are sent with the request
                });
                const data = await response.json();
                console.log(data);
                if (data.username) {
                    setUsername(data.username);
                    console.log('username set');
                } else {
                    setUsername('No username found');
                }
            } catch (error) {
                console.log('Error:', error);
                setUsername('Error fetching username');
            }
        };

        fetchData();
    }, []);

    return (
        <>
            <h1>Student</h1>
            <p>Welcome, {username}</p>
        </>
    );
}

export default Student;
