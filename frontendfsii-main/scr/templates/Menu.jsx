import { Nav, Navbar, NavDropdown, Container } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import React from "react";


export default function Menu(props) {
  return (
    <Navbar collapseOnSelect expand="lg" bg='dark' variant='dark' >
      <Container>
      <LinkContainer to="/" ><Navbar.Brand >HOME</Navbar.Brand></LinkContainer>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
              <NavDropdown title="Menu" id="collapsible-nav-dropdown">
              <LinkContainer to="/cadastroCandidatos"><NavDropdown.Item >Candidatos</NavDropdown.Item></LinkContainer>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
      
    </Navbar>
  );
}

