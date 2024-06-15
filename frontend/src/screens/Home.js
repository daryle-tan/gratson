import React from "react"
import { Image, Container, Row, Col } from "react-bootstrap"

const Home = () => {
  return (
    <Container fluid className="image-container">
      <Row>
        <Col>
          <img
            src="../home.webp"
            alt="Physical therapy work on a client"
            className="full-width-image"
          ></img>
        </Col>
      </Row>
    </Container>
  )
}

export default Home
