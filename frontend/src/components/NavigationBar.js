import React, { useState } from "react";
import Modal from "react-modal";
//import { ModalDialog, Nav, Navbar } from "react-bootstrap";
import { Nav, Navbar } from "react-bootstrap";
import { Container, Col, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import "../MEdge.css";
import styled from "styled-components";

//CHANGELOG:
// ACHMAD MUSTAFA KEMAL 219374683 25/12/2020 8:30 - 11:30PM || creating a navbar for a register form with using react-bootstrap and style component dependency
// LUKE SCIBERRAS 213085878 02/01/2020 12:00PM - 3:00PM || create consent form modal to trigger from user clicking on the registration link
// LUKE SCIBERRAS 213085878 02/01/2020 4:00PM - 6:00PM || continued work on modal styling
// ACHMAD MUSTAFA KEMAL 219374683 04/01/2020 4:00PM - 6:00PM  ||  additional styling for modal
// LUKE SCIBERRAS 213085878 29/01/2021 9:50PM || removing compiling errors related to eslint for modal anchor. 

const Styles = styled.div`
  a,
  .navbar-brand,
  .navbar-nav .nav-link {
    color: Black;
    &:hover {
      color: #f9dc0a;
    }
  }
  .pill-nav a {
    display: inline-block;
    text-align: center;
    padding: 14px;
    text-decoration: none;
    border-radius: 15px;
  }

  .pill-nav a:hover {
    background-color: #334491;
    color: black;
  }

  .pill-nav a.active {
    background-color: #69a8da;
    color: white;
  }
`;

Modal.setAppElement("#root");

function NavigationBar() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  return (
    <Styles>
      <Container fluid>
        <Navbar expand="lg">
          <Navbar.Brand href="/">
            <img
              src="/images/MEC_logo_master_flat.png"
              width="160"
              height="150"
              alt="Melbourne Edge Logo"
              className="img-fluid"
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto pill-nav">
              <Modal
                isOpen={modalIsOpen}
                shouldCloseOnOverlayClick={false}
                onRequestClose={() => setModalIsOpen(false)}
              >
                <br />
                <h1 className="htitle"> Your privacy is important to us </h1>
                <br />
                <br />
                <Row>
                  {/* This is blank column */}
                  <Col md={1}></Col>
                  <Col md={2}>
                    <img
                      className="img-responsive"
                      src="/images/MEC_butterfly_flat.png"
                      alt="Melbourne Edge Logo alt"
                    />
                  </Col>
                  {/* This is blank column */}
                  <Col md={1}></Col>
                  <Col md={7}>
                    <div className="modalText">
                      <h5>
                        Your information and its privacy are important to us as
                        without your information we cannot make the best
                        decisions for the management of your healthcare.
                      </h5>
                      <p>
                        Edge-perience will only ever collect, use, or disclose
                        your personal information in a manner that abides by the
                        <a
                          href={
                            "https://www.legislation.gov.au/Details/C2014C00076"
                          }
                          name="1988-Privacy-Act"
                          rel="noopener noreferrer"
                          target="_blank"
                        >
                          {" "}
                          Privacy Act 1988{" "}
                        </a>{" "}
                        and advise outlined by the
                        <a
                          href={
                            "https://www.oaic.gov.au/privacy/australian-privacy-principles-guidelines"
                          }
                          name="OAIC"
                          rel="noopener noreferrer"
                          target="_blank"
                        >
                          {" "}
                          Office of the Australian Information Commissioner.
                        </a>
                      </p>
                      <p>
                        Your information will only ever be shared between your
                        GP and nominated healthcare providers involved in the
                        management of your care, unless your GP or healthcare
                        providers deem disclosure as necessary for your own
                        safety.
                      </p>
                      <p>
                        By continuing with this registration, you hereby consent
                        to the collection of your personal information and
                        understand that you must be truthful in the information
                        that you give us.
                      </p>
                      <p>
                        Furthermore, by continuing you understand that you
                        should regularly update your GP when your information
                        changes, and that you should attend the general practice
                        for a review four weeks after beginning your healthcare
                        plan. You are free to request what information is held
                        by Edge-perience at any time, and likewise can retract
                        your consent at any given time by contacting us.
                      </p>
                      <p>
                        Please review the following for{" "}
                        <a
                          href={"https://melbourne-edge.com.au/privacy-policy"}
                          name="MEC-Privacy"
                          rel="noopener noreferrer"
                          target="_blank"
                        >
                          {" "}
                          Melbourne Edge Consultants' full privacy statement
                        </a>
                      </p>
                      <p>
                        If you understand and agree to our collection of
                        information policy, please continue. If you are unsure
                        or require more information, please contact us at:
                        <br />
                        <br />
                        <ul>
                          📧 :{" "}
                          <a href="mailto: hello@melbourne-edge.com.au">
                            hello@melbourne-edge.com.au
                          </a>
                          &nbsp; | 📞 :{" "}
                          <a href="tel:+614 781 29135">0478129135</a> (8:00AM -
                          9:00PM)
                        </ul>
                      </p>
                    </div>
                  </Col>
                </Row>
                <br />
                <br />
                <Row>
                  {/* This is blank column */}
                  <Col md={1}></Col>
                  <br />
                  <br />
                  {/* This is blank column */}
                  <Col md={4}></Col>
                  <Col md={6}>
                    <Button
                      type="Reset"
                      className="btn5"
                      onClick={() => setModalIsOpen(false)}
                    >
                      {/* eslint-disable-next-line */}
                      <a href={"/"}></a>Cancel
                    </Button>
                    <Button type="Submit" className="btn5">
                      <a href={"/register"}>Submit</a>
                    </Button>
                  </Col>
                </Row>
                <br />
                <br />
              </Modal>

              {/* NAVIGATION LINKS */}
              <Nav.Item>
                <Nav.Link href="/Homepage">Home</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link onClick={() => setModalIsOpen(true)}>
                  Register
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link href="/signin">Sign In</Nav.Link>
              </Nav.Item>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </Container>
    </Styles>
  );
}
export default NavigationBar;
