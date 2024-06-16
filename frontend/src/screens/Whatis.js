import React from "react"
import { Container, Row, Col } from "react-bootstrap"

const Whatis = () => {
  return (
    <Container className="whatIsContainer d-flex vh-100 w-100 mt-4 justify-content-center align-items-center">
      <Row>
        <Col className="text-center custom-bg m-3 p-3 rounded">
          <h1 className="display-2">Why Choose Graston?</h1>
          <h2 className="fs-4 mb-4">
            Reduce Pain. Prevent Injuries. Recover Faster.
          </h2>
          <p className="fs-4 text-start">
            Graston Technique is a form of manual therapy known as soft. Lorem
            ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
            tempor incididunt ut labore et dolore magna aliqua. Feugiat vivamus
            at augue eget. Augue mauris augue neque gravida in. Blandit cursus
            risus at ultrices. Facilisis volutpat est velit egestas dui id
            ornare. Adipiscing at in tellus integer feugiat scelerisque varius
            morbi. Cras pulvinar mattis nunc sed blandit libero volutpat.
            Adipiscing elit ut aliquam purus sit amet.
          </p>
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

export default Whatis
