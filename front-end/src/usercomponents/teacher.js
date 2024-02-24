import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import Axios library

function Teacher() {
    const [username, setUsername] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/session', {
                    withCredentials: true // Ensure cookies are sent with the request
                });
                const data = response.data;
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
            <h1>Teacher</h1>
            <p>Welcome, {username}</p>
        </>
    );
}

export default Teacher;
