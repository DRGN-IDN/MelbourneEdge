import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "../../MEdge.css";
import { Container, Col, Row } from "react-bootstrap";

import NavigationBarDash from "../../components/NavigationBarDash";
import Jumbotron from "../../components/Jumbotron";
import Footer from "../../components/Footer";

//CHANGELOG:
// Bevan Fairleigh : 23/01/2021 Created: copied from original Dashboard.  Only a place holder for now

class adminDash extends Component {
  render() {
    return (
      <React.Fragment>
        <NavigationBarDash />
        <Jumbotron />
        <Container fluid>
          <h1 className="htitle">Edge Admin</h1>
          <br />
          <div className="form-container">
            <Row>
              <Col sm="4">
                <Card className="text-center">
                  <Card.Header>GP administration</Card.Header>
                  <Card.Body>
                    <Button variant="primary" className="btn3">
                    <a href={"/admin/createGp"}>Add GP</a>
                    </Button>
                    <Card.Title> </Card.Title>
                    <Button variant="primary" className="btn3">
                      <a href={"/admin/gps"}>View GP List</a>
                    </Button>
                  </Card.Body>
                  <Card.Footer className="text-muted">
                    GP administration
                  </Card.Footer>
                </Card>
              </Col>
              <Col sm="4">
                <Card className="text-center">
                  <Card.Header>MHP administration</Card.Header>
                  <Card.Body>
                    <Button variant="primary" className="btn3">
                      <a href={"/admin/createMhp"}>Add MHP</a>
                    </Button>
                    <Card.Title> </Card.Title>
                    <Button variant="primary" className="btn3">
                      <a href={"/admin/mhps"}>View MHP List</a>
                    </Button>
                  </Card.Body>
                  <Card.Footer className="text-muted">
                    MHP administration
                  </Card.Footer>
                </Card>
              </Col>
              <Col sm="4">
                <Card className="text-center">
                  <Card.Header>Client administration</Card.Header>
                  <Card.Body>
                    <Card.Title></Card.Title>

                    <Button variant="primary" className="btn3">
                      <a href={"/admin/clients"}>View Client List</a>
                    </Button>
                  </Card.Body>
                  <Card.Footer className="text-muted">
                    Client administration
                  </Card.Footer>
                </Card>
              </Col>
            </Row>
            <br />
            <br />

            <Row>
              <Col sm="4"></Col>
              <Col sm="4"></Col>
              <Col sm="4"></Col>
            </Row>
          </div>
        </Container>
        <Footer />
      </React.Fragment>
    );
  }
}

export default adminDash;
