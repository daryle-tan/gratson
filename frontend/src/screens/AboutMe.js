import React from "react"
import { Container, Row, Col } from "react-bootstrap"

const AboutMe = () => {
  return (
    <Container className="aboutMe d-flex w-100 mt-4 justify-content-center align-items-center">
      <Row>
        <Col className="text-center">
          <h1 className="display-2 mb-4">Meet Your Graston Practitioner</h1>

          <img
            src="../headshot.webp"
            alt="Shirley's Headshot"
            className="headshot-image"
          ></img>
          <p className="fs-4 text-start">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Feugiat
            vivamus at augue eget. Augue mauris augue neque gravida in. Blandit
            cursus risus at ultrices. Facilisis volutpat est velit egestas dui
            id ornare. Adipiscing at in tellus integer feugiat scelerisque
            varius morbi. Cras pulvinar mattis nunc sed blandit libero volutpat.
            Adipiscing elit ut aliquam purus sit amet.
          </p>
          <div className="d-flex flex-column justify-content-evenly mt-4">
            <p className="d-flex fs-4 text-start mb-5 justify-content-center">
              Contact Info <br />
              Shirley Chui <br />
              555-555-5555 <br />
              test@gmail.com
              <br />
            </p>
          </div>
        </Col>
      </Row>
    </Container>
  )
}

export default AboutMe
