import React from "react"
import { Container, Row, Col } from "react-bootstrap"

const BookNow = () => {
  return (
    <Container className="bookNow d-flex vh-100 w-100 mt-4 justify-content-center align-items-center">
      <Row>
        <Col className="text-center">
          <h1 className="display-2">Schedule Your Session</h1>
          <p className="fs-4">Reduce Pain. Prevent Injuries. Recover Faster.</p>
          {/* <img
            className="why-choose-graston-pic"
            src="../fitBody.webp"
            alt="A woman working out"
          ></img> */}
        </Col>
      </Row>
    </Container>
  )
}

export default BookNow
