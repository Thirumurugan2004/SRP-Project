import React, { useState } from 'react';
import { Container, Card, Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'; // Import Axios

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student');

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Send username, password, and role to backend for authentication using Axios
    try {
      const response = await axios.get('http://localhost:5000/login', {
        params: { username, password, role }
      });

      if (response.status === 200) {
        if (role === 'student') {
          window.location.href = `/student`; // Redirect to student page
        } else if (role === 'teacher') {
          window.location.href = `/teacher`; // Redirect to teacher page
        } else if (role === 'hod') {
          window.location.href = `/hod`; // Redirect to HOD page
        }
      } else {
        alert('wrong username or password')
        window.location.href = '/'; // Redirect to login page if authentication is not successful
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Card className="p-4 border" style={{ minWidth: '300px', maxWidth: '400px' }}>
        <Card.Title className="text-center mb-4">Login</Card.Title>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Username:</Form.Label>
            <Form.Control
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Password:</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Role:</Form.Label>
            <Form.Select
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="student">Student</option>
              <option value="teacher">Teacher</option>
              <option value="hod">HOD</option>
            </Form.Select>
          </Form.Group>
          <div className="text-center">
            <Button type="submit" variant="primary">Login</Button>
          </div>
        </Form>
      </Card>
    </Container>
  );
};

export default Login;