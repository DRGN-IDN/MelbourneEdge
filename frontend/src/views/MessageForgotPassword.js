import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import "../MEdge.css";
import { Container } from "react-bootstrap";
import JumbotronNav from "../components/Jumbotron";
import NavigationBar from "../components/NavigationBar";
import Footer from "../components/Footer";

//CHANGELOG:
// ACHMAD MUSTAFA KEMAL 219374683 22/01/2021 12:50PM || Adding Message Forgot password notification page
// LUKE SCIBERRAS 213085878 29/01/2021 9:55PM || REMOVED UNUSED IMPORTS.

class MessageForgotPassword extends Component {
  render() {
    return (
      <React.Fragment>
        <NavigationBar />
        <JumbotronNav />
        <Container fluid>
          <div className="form-container">
            <h5 className="htitle2">
              <b>Thank you for sending the request</b>
            </h5>
            <p>You will receive an email about reset password</p>
            <Button type="Submit" className="btn3">
              <a href={"/signin"}>Submit</a>
            </Button>
          </div>
        </Container>
        <Footer />
      </React.Fragment>
    );
  }
}

export default MessageForgotPassword;
