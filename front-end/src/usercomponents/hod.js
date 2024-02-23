import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import Axios library

function Hod() {
    const [username, setUsername] = useState('');

    useEffect(() => {
        // Fetch username from session using Axios
        axios.get('http://localhost:5000/session', { withCredentials: true }) // Ensure cookies are sent with the request
            .then(response => {
                const data = response.data;
                console.log(data);
                if (data.username) {
                    setUsername(data.username);
                    console.log('username set');
                } else {
                    setUsername('No username found');
                }
            })
            .catch(error => {
                console.log('Error:', error);
                setUsername('Error fetching username');
            });
    }, []);

    return (
        <>
            <h1>HOD</h1>
            <p>Welcome, {username}</p>
        </>
    );
}

export default Hod;
