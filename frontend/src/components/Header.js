import React from "react"
import { Container, Nav, Navbar, Button } from "react-bootstrap"
import { FaUser } from "react-icons/fa"

const Header = () => {
  return (
    <header>
      <Navbar
        bg="black"
        variant="dark"
        expand="md"
        className="navbar"
        collapseOnSelect
      >
        <Container fluid className="d-flex justify-content-start custom-header">
          <Navbar.Toggle
            aria-controls="basic-navbar-nav"
            className="me-2 custom-toggler"
          />
          <Navbar.Brand href="/">Graston</Navbar.Brand>

          <Navbar.Collapse
            id="basic-navbar-nav"
            className="justify-content-end"
          >
            <Nav className="ms-auto">
              <Nav.Link href="#whatIs" className="text-white custom-nav-link">
                WHAT IS GRATSON
              </Nav.Link>
              <Nav.Link href="#aboutMe" className="text-white custom-nav-link">
                ABOUT ME
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
        <div>
          <Button
            variant="outline-success"
            href="#bookNow"
            className="ms-auto book-button me-4"
          >
            BOOK NOW
          </Button>
        </div>
      </Navbar>
    </header>
  )
}

export default Header
