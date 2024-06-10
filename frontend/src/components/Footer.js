import React from "react"
import { Container, Row, Col } from "react-bootstrap"

const Footer = () => {
  const currentYear = new Date().getFullYear()
  return (
    <footer className="bg-dark text-white">
      <Container>
        <Row>
          <Col className="text-center py-3">
            <p>Gratson&copy;. All Rights Reserved {currentYear}.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  )
}

export default Footer
