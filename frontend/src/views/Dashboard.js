import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "../MEdge.css";
import { Container, Col, Row } from "react-bootstrap";

import Carousel from "react-bootstrap/Carousel";
import NavigationBarDash from "../components/NavigationBarDash";
import Jumbotron from "../components/Jumbotron";
import Footer from "../components/Footer";

//CHANGELOG:
// PHUONG DANG 220436263 27/12/2020 || creating dashboard page/landing page
// SHYAM KODALI 218722964 07/01/2021|| Styling for dashboard

class Dashboard extends Component {
  render() {
    return (
      <React.Fragment>
        <NavigationBarDash />
        <Jumbotron />
        <Container fluid>
          <h1 className="htitle">Dashboard</h1>
          <br />
          <div className="form-container">
            <Row>
              <Col sm="4">
                <Card className="text-center">
                  <Card.Header>Card Header title Goes Here</Card.Header>
                  <Card.Body>
                    <Card.Title>GP appointment</Card.Title>
                    <Card.Text>Description here</Card.Text>
                    <Button variant="primary">Click Here</Button>
                  </Card.Body>
                  <Card.Footer className="text-muted">
                    Card footer title Goes Here
                  </Card.Footer>
                </Card>
              </Col>
              <Col sm="4">
                <Card className="text-center">
                  <Card.Header>Card Header title Goes Here</Card.Header>
                  <Card.Body>
                    <Card.Title> Mental health appointment</Card.Title>
                    <Card.Text>Description here</Card.Text>
                    <Button variant="primary">Click Here</Button>
                  </Card.Body>
                  <Card.Footer className="text-muted">
                    Card footer title Goes Here
                  </Card.Footer>
                </Card>
              </Col>
              <Col sm="4">
                <Card className="text-center">
                  <Card.Header>Card Header title Goes Here</Card.Header>
                  <Card.Body>
                    <Card.Title>Profile customization</Card.Title>
                    <Card.Text>Description here</Card.Text>
                    <Button variant="primary">Click Here</Button>
                  </Card.Body>
                  <Card.Footer className="text-muted">
                    Card footer title Goes Here
                  </Card.Footer>
                </Card>
              </Col>
            </Row>
            <br />
            <br />
            <h1 className="htitle">Meet the team</h1>
            <Row>
              <Col sm="4"></Col>
              <Col sm="4">
                <Carousel>
                  <Carousel.Item interval={1000}>
                    <img
                      className="d-block w-100"
                      src="/images/Sarah.jpg"
                      alt="Sarah Elliot"
                    />
                    <Carousel.Caption>
                      <h3>Sarah Elliot </h3>
                      <p>
                        Mental Health Social Worker Clinical Family Therapist
                        Clinical Supervisor
                      </p>
                      <Button variant="primary">Contact</Button>
                    </Carousel.Caption>
                  </Carousel.Item>
                  <Carousel.Item interval={1000}>
                    <img
                      className="d-block w-100"
                      src="/images/Valerie.jpg"
                      alt="Valerie Judge"
                    />
                    <Carousel.Caption>
                      <h3>Valerie Judge</h3>
                      <p>
                        Mental Health Clinician (SW) Coach & Mentor Clinical
                        Supervisor
                      </p>
                      <Button variant="primary">Contact</Button>
                    </Carousel.Caption>
                  </Carousel.Item>
                  <Carousel.Item interval={1000}>
                    <img
                      className="d-block w-100"
                      src="/images/Cameron.jpg"
                      alt="Cameron Hoo"
                    />
                    <Carousel.Caption>
                      <h3>Cameron Hoo</h3>
                      <p>
                        Clinical Psychologist (MAPS) Endorsed Supervisor
                        Clinical Supervisor
                      </p>
                      <Button variant="primary">Contact</Button>
                    </Carousel.Caption>
                  </Carousel.Item>
                  <Carousel.Item interval={1000}>
                    <img
                      className="d-block w-100"
                      src="/images/Rebekah.jpg"
                      alt="Rebekah Evans"
                    />
                    <Carousel.Caption>
                      <h3>Rebekah Evans</h3>
                      <p>Mental Health Social Worker</p>
                      <Button variant="primary">Contact</Button>
                    </Carousel.Caption>
                  </Carousel.Item>
                  <Carousel.Item interval={1000}>
                    <img
                      className="d-block w-100"
                      src="/images/Elissa.jpg"
                      alt="Elissa Lobanov"
                    />
                    <Carousel.Caption>
                      <h3>Elissa Lobanov</h3>
                      <p>Psychologist</p>
                      <Button variant="primary">Contact</Button>
                    </Carousel.Caption>
                  </Carousel.Item>
                  <Carousel.Item interval={1000}>
                    <img
                      className="d-block w-100"
                      src="/images/Chrissy.jpg"
                      alt="Christine Halden"
                    />
                    <Carousel.Caption>
                      <h3>Christine Halden</h3>
                      <p>Psychologist</p>
                      <Button variant="primary">Contact</Button>
                    </Carousel.Caption>
                  </Carousel.Item>
                </Carousel>
              </Col>
              <Col sm="4"></Col>
            </Row>
          </div>
        </Container>
        <Footer />
      </React.Fragment>
    );
  }
}

export default Dashboard;
