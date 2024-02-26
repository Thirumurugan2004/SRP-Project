// Buttons.js

import React, { useState } from 'react';
import './Navbar.css';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';



function Navbarfun() {
    const [clicked, setClicked] = useState(false);
    const  handleLogout=async()=>{
      try {
        const response = await axios.get('http://localhost:5000/logout', {
            withCredentials: true // Ensure cookies are sent with the request
        });
        window.location.href='/';
    }
    catch(err){
      console.log(err);
    }
  }
    const handleClick = () => {
        console.log('clicked before toggle:', clicked);
        setClicked((prevClicked) => {
          console.log('prevClicked:', prevClicked);
          const newClicked = !prevClicked;
          console.log('newClicked:', newClicked);
          return newClicked;
        });
        console.log('clicked after toggle:', clicked);
      };
  return (
    <div >
      <form>
        <Navbar collapseOnSelect expand="lg" variant="dark">
          <Container>
            <Navbar.Brand className="brand-container" href="#">
              <span className="brand-text">Academic Analyzer</span>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" onClick={handleClick}>
              <FontAwesomeIcon icon={clicked ? faTimes : faBars} style={{ color: '#ffffff' }} />
            </Navbar.Toggle>
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto">
                <NavDropdown title="View" id="collasible-nav-dropdown">
                  <NavDropdown.Item >Personal Data</NavDropdown.Item>
                  <NavDropdown.Item >Academic Data</NavDropdown.Item>
                  <NavDropdown.Item >Other Data</NavDropdown.Item>
                </NavDropdown>
                <NavDropdown title="Edit" id="collasible-nav-dropdown">
                  <NavDropdown.Item >Personal Data</NavDropdown.Item>
                  <NavDropdown.Item >Academic Data</NavDropdown.Item>
                  <NavDropdown.Item >Other Data</NavDropdown.Item>
                </NavDropdown>
                
                <Nav.Link >Analytics</Nav.Link>
                <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>

      </form>
    </div>
  );
}

export default Navbarfun;