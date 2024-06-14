import React from "react"
import { Container, Nav, Navbar, Button } from "react-bootstrap"
import { FaUser } from "react-icons/fa"

const Header = () => {
  return (
    <header>
      <Navbar bg="black" variant="dark" expand="md" collapseOnSelect>
        <Container fluid className="d-flex justify-content-start">
          <Navbar.Toggle
            aria-controls="basic-navbar-nav"
            className="me-2 custom-toggler"
          />
          <Navbar.Brand href="/">Graston</Navbar.Brand>
          <Button
            variant="outline-success"
            href="/bookNow"
            className="ms-auto book-button"
          >
            BOOK NOW
          </Button>
          <Navbar.Collapse
            id="basic-navbar-nav"
            className="justify-content-end"
          >
            <Nav className="ms-auto">
              <Nav.Link
                href="/whatIsGratson"
                className="text-white custom-nav-link"
              >
                WHAT IS GRATSON
              </Nav.Link>
              <Nav.Link
                href="/whatWeOffer"
                className="text-white custom-nav-link"
              >
                WHAT WE OFFER
              </Nav.Link>
              <Nav.Link href="/location" className="text-white custom-nav-link">
                LOCATION
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header
