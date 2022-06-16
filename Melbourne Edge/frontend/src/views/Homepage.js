import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import "../MEdge.css";
import Jumbotron from "react-bootstrap/Jumbotron";
import { Container, Col, Row, Card, Badge } from "react-bootstrap";
import JumbotronNav from "../components/Jumbotron";
import NavigationBar from "../components/NavigationBar";
import Footer from "../components/Footer";

//CHANGELOG:
// Yang Xu 217613282 06/01/2021 12:00 - 21:00PM || creating homepage

class homepage extends Component {
  render() {
    return (
      <React.Fragment>
        <NavigationBar />
        <JumbotronNav />
        <Container fluid>
          <Jumbotron className="Jumbotron-homepage">
            <h1>Have your mental health assistance Now!</h1>
            <p>register now to book on-demand GP consultations</p>
            <p>
              <Button type="Submit" className="btn-homepage" href="/register">
                Register Now!
              </Button>
            </p>
          </Jumbotron>
        </Container>
        <Container>
          <div className="form-container">
            <div className="text-homepage">
              <h1>
                {" "}
                <b>Our Story</b>
              </h1>
              <p>
                ‘Edge-perience’ aims to streamline the process for mental health
                assistance in Australia, offering a centralised application that
                can book on-demand GP consultations for medical assessments,
                generate mental health care plans, and book mental health
                appointments online.
              </p>
            </div>
            <br />
            <br />
            <div className="text-homepage">
              <h1>
                <b> Our Value to You </b>{" "}
              </h1>
            </div>
            <br />
            <Row>
              <Col sm="5">
                <Badge variant="success">√</Badge>
                {"Appointment within 24-hours of referral"} <br></br>
                <Badge variant="success">√</Badge>
                {"Evidence-based tools to track progressl"} <br></br>
                <Badge variant="success">√</Badge>
                {"No change of clinician during support"} <br></br>
                <Badge variant="success">√</Badge>
                {"No transition due to change in risk"} <br></br>
                <Badge variant="success">√</Badge>
                {"No transition due to age"} <br></br>
                <Badge variant="success">√</Badge>
                {"No referral boundaries"} <br></br>
                <Badge variant="success">√</Badge>
                {"No referral threshold"} <br></br>
              </Col>
              <Col sm="2"></Col>
              <Col sm="2"></Col>
              <Col sm="2">
                <img
                  src="/images/MEC_logo_master_flat.png"
                  alt="Melbourne Edge Logo"
                  className="img-responsive"
                />
              </Col>
            </Row>
          </div>
        </Container>
        <Container>
          <div className="form-container">
            <h1>
              <b>Our Values</b>
            </h1>
            <p>
              We practice from a client centred approach and underpinning all
              our values is a culture of safety, honesty and transparency.
            </p>
            <Row>
              <Col sm="3">
                <Card>
                  <Card.Img variant="top" src="/images/value1.jpg" />
                  <Card.Body>
                    <Card.Title>Endurance</Card.Title>
                    <Card.Text>
                      Take on challenges. Learn quickly. Ultimately, never give
                      up.
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col sm="3">
                <Card>
                  <Card.Img variant="top" src="/images/value2.jpg" />
                  <Card.Body>
                    <Card.Title>Diversity</Card.Title>
                    <Card.Text>
                      Respect for everyone. Diversity of people. Diversity of
                      thought.
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col sm="3">
                <Card>
                  <Card.Img variant="top" src="/images/value3.jpg" />
                  <Card.Body>
                    <Card.Title>Grounded</Card.Title>
                    <Card.Text>
                      Set strong foundations. Connect with values. Learn and
                      grow.
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col sm="3">
                <Card>
                  <Card.Img variant="top" src="/images/value4.jpg" />
                  <Card.Body>
                    <Card.Title>Empowerment</Card.Title>
                    <Card.Text>
                      Provide options and choice. Help to develop and take
                      control. Enable people to be their best.
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </div>
        </Container>
        <Container>
          <div className="form-container">
            <h1>
              <b>Contact Us</b>
            </h1>
            <Row>
              <Col sm="5">
                <p>Contact us and we'll get back to you.</p>
                <p>
                  📧 :{" "}
                  <a href="mailto: hello@melbourne-edge.com.au">
                    hello@melbourne-edge.com.au
                  </a>{" "}
                </p>
                <p>
                  {" "}
                  📞 : <a href="tel:+614 781 29135">0478129135</a> (8:00AM -
                  9:00PM)
                </p>
              </Col>
              <Col sm="2"></Col>
              <Col sm="2"></Col>
              <Col sm="2">
                <img
                  src="/images/MEC_butterfly_flat.png"
                  alt="Melbourne Edge Logo"
                  className="img-responsive-homepage"
                />
              </Col>
            </Row>
          </div>
        </Container>
        <Footer />
      </React.Fragment>
    );
  }
}

export default homepage;
