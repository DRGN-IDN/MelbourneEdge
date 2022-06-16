import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "../../MEdge.css";
import { Container, Col} from "react-bootstrap";

import Jumbotron from "../../components/Jumbotron";
import NavigationBar from "../../components/NavigationBar";
import Footer from "../../components/Footer";

import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createMhp } from "../../actions/adminActions";

// frontend/src/views/admin/adminCreateMhp.js
// CHANGELOG:
// Bevan Fairleigh 29/01/2021 Created this page/code.
// LUKE SCIBERRAS 29/01/2021 10:00PM || REMOVED UNUSED IMPORTS TO REMOVE COMPILING ERRORS.

class CreateMhp extends Component {
  //state variable for form interactions as object
  constructor(props) {
    super(props);
    this.state = {
      Username: "",
      Password: "",
      Practice: "",
      PracticeAddress: "",
      EmailPractice: "",
      EmailDirect: "",
      PhonePractice: "",
      PhoneDirect: "",
      NameFirst: "",
      NameLast: "",
      Prefix: "",
      formErrors: {},
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors,
      });
    }
  }

  //duplicate objects for validation
  handleRegFormValidation() {
    const {
      Username,
      Password,
      PasswordConf,
      Practice,
      PracticeAddress,
      EmailPractice,
      EmailDirect,
      PhonePractice,
      PhoneDirect,
      NameFirst,
      NameLast,
    } = this.state;
    let formErrors = {};
    let formvalid = true;

    //Validation of required fields - Achmad Mustafa Kemal 29/12/2020
    //First name validation
    if (!Username) {
      formvalid = false;
      formErrors["UsernameErr"] = "Username is required.";
    }

    //Password validation
    if (!Password) {
      formvalid = false;
      formErrors["PasswordErr"] = "Password required";
    } else if (Password.length <= 8) {
      formErrors["PasswordErr"] =
        "The recommended password length is at least 8 characters, please include a capital letter and special character also";
    }

    //Password Confirmation Validation
    if (!PasswordConf) {
      formvalid = false;
      formErrors["PasswordConfErr"] = "Password confirmation required";
    } else if (PasswordConf !== Password) {
      formvalid = false;
      formErrors["PasswordConfErr"] = "Password confirmation don't match";
    }

    if (!Practice) {
      formvalid = false;
      formErrors["PracticeErr"] = "Pratice is required.";
    }

    if (!PracticeAddress) {
      formvalid = false;
      formErrors["PracticeAddressErr"] = "Pratice Address is required.";
    }

    //Email validation
    if (!EmailPractice) {
      formvalid = false;
      formErrors["EmailPracticeErr"] = "Email required.";
    } else if (!/\S+@\S+\.\S+/.test(EmailPractice)) {
      formvalid = false;
      formErrors["EmailPracticeErr"] = "Invalid email ";
    }

    //Email direct optional
    if (!/\S+@\S+\.\S+/.test(EmailDirect)) {
      formvalid = false;
      formErrors["EmailDirectErr"] = "Invalid email ";
    }

    //Practice phone number
    if (!PhonePractice) {
      formvalid = false;
      formErrors["PhonePracticeErr"] = "Practice Phone number is required";
    } else if (PhonePractice.length < 8) {
      formErrors["PhonePracticeErr"] =
        "Phone numbers should not be less than 8 digits long";
    }

    //Phone direct (optional)
    if (PhoneDirect.length < 8) {
      formErrors["PhoneDirectErr"] =
        "Phone numbers should not be less than 8 digits long";
    }

    if (!NameFirst) {
      formvalid = false;
      formErrors["NameFirstErr"] = "First name is required.";
    }

    if (!NameLast) {
      formvalid = false;
      formErrors["NameLastErr"] = "Last name is required.";
    }

    //initialise formErrors as part of the formErrors attribute of state object
    this.setState({ formErrors: formErrors });
    return formvalid;
  }

  //on change, assigned event (user input) to the target attribute's name
  changeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  //on submit event triggers axios to submit form data as a JSON string
  submitHandler = (e) => {
    e.preventDefault();

    //delete formErrors attribute from object so they are not passed to the server
    delete this.state.formErrors;
    //delete this.state.disabled;

    //if handleRegFormValidation method's boolean is false, then submit form to server with axios
    if (this.handleRegFormValidation() === true) {
      // call our registerClient function from authActions.js
      this.props.createMhp(this.state, this.props.history);
    }
  };

  render() {
    const {
      UsernameErr,
      PasswordErr,
      PasswordConfErr,
      PracticeErr,
      PracticeAddressErr,
      EmailPracticeErr,
      EmailDirectErr,
      PhonePracticeErr,
      PhoneDirectErr,
      NameFirstErr,
      NameLastErr,
      PrefixErr,
    } = this.state.formErrors;

    //Registration form begins:
    return (
      <React.Fragment>
        <NavigationBar />
        <Jumbotron />
        <Container>
          <Form onSubmit={this.submitHandler}>
            <h1 className="htitle">Register</h1>
            <br />
            <div className="form-container">
              {/*Personal Details */}
              <h5 className="htitle2">
                <b>Create Mental Health Practitioner</b>
              </h5>
              <br />

              <Form.Row>
                <Form.Group as={Col}>
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    className={`${UsernameErr && "inputError"}`}
                    type="text"
                    placeholder="Username"
                    id="Username"
                    name="Username"
                    value={this.state.Username}
                    onChange={this.changeHandler}
                  />
                  {UsernameErr && <p className="error">{UsernameErr}</p>}
                </Form.Group>
              </Form.Row>
              <Form.Row>
                {/* First name input */}
                {/* Email input */}

                <Form.Group as={Col}>
                  <Form.Label>Practice Name</Form.Label>
                  <Form.Control
                    className={`${PracticeErr && "inputError"}`}
                    type="text"
                    placeholder="Practice Name"
                    id="Practice"
                    name="Practice"
                    value={this.state.Practice}
                    onChange={this.changeHandler}
                  />
                  {PracticeErr && <p className="error">{PracticeErr}</p>}
                </Form.Group>
              </Form.Row>
              <Form.Row>
                <Form.Group as={Col}>
                  <Form.Label>Practice Address</Form.Label>
                  <Form.Control
                    className={`${PracticeAddressErr && "inputError"}`}
                    type="text"
                    placeholder="Practice Address"
                    id="PracticeAddress"
                    name="PracticeAddress"
                    value={this.state.PracticeAddress}
                    onChange={this.changeHandler}
                  />
                  {PracticeAddressErr && (
                    <p className="error">{PracticeAddressErr}</p>
                  )}
                </Form.Group>
              </Form.Row>
              <Form.Row>
                <Form.Group as={Col}>
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    className={`${EmailPracticeErr && "inputError"}`}
                    type="email"
                    placeholder="Enter your email"
                    id="EmailPractice"
                    name="EmailPractice"
                    value={this.state.EmailPractice}
                    onChange={this.changeHandler}
                  />
                  {EmailPracticeErr && (
                    <p className="error">{EmailPracticeErr}</p>
                  )}
                </Form.Group>
              </Form.Row>
              <Form.Row>
                <Form.Group as={Col}>
                  <Form.Label>Email (direct)</Form.Label>
                  <Form.Control
                    className={`${EmailDirectErr && "inputError"}`}
                    type="email"
                    placeholder="Enter direct email"
                    id="EmailDirect"
                    name="EmailDirect"
                    value={this.state.EmailDirect}
                    onChange={this.changeHandler}
                  />
                  {EmailDirectErr && <p className="error">{EmailDirectErr}</p>}
                </Form.Group>
              </Form.Row>
              <Form.Row>
                <Form.Group>
                  <Form.Label>Practice Phone</Form.Label>
                  <Form.Control
                    className={`${PhonePracticeErr && "inputError"}`}
                    type="number"
                    placeholder="Enter Pratice Phone number"
                    id="PhonePractice"
                    name="PhonePractice"
                    value={this.state.PhonePractice}
                    onChange={this.changeHandler}
                  />
                  {PhonePracticeErr && (
                    <p className="error">{PhonePracticeErr}</p>
                  )}
                </Form.Group>
              </Form.Row>
              <Form.Row>
                <Form.Group>
                  <Form.Label>Direct Phone</Form.Label>
                  <Form.Control
                    className={`${PhoneDirectErr && "inputError"}`}
                    type="number"
                    placeholder="Enter Direct Phone number"
                    id="PhoneDirect"
                    name="PhoneDirect"
                    value={this.state.PhoneDirect}
                    onChange={this.changeHandler}
                  />
                  {PhoneDirectErr && <p className="error">{PhoneDirectErr}</p>}
                </Form.Group>
              </Form.Row>
              <Form.Row>
                <Form.Group as={Col}>
                  <Form.Label>First name</Form.Label>
                  <Form.Control
                    className={`${NameFirstErr && "inputError"}`}
                    type="text"
                    placeholder="Enter first name"
                    id="NameFirst"
                    name="NameFirst"
                    value={this.state.NameFirst}
                    onChange={this.changeHandler}
                  />
                  {NameFirstErr && <p className="error">{NameFirstErr}</p>}
                </Form.Group>
              </Form.Row>
              <Form.Row>
                {/* Lastname input */}
                <Form.Group as={Col}>
                  <Form.Label>Last name</Form.Label>
                  <Form.Control
                    className={`${NameLastErr && "inputError"}`}
                    type="text"
                    placeholder="Enter last name"
                    id="NameLast"
                    name="NameLast"
                    value={this.state.NameLast}
                    onChange={this.changeHandler}
                  />
                  {NameLastErr && <p className="error">{NameLastErr}</p>}
                </Form.Group>
              </Form.Row>

              <Form.Row>
                {/* Lastname input */}
                <Form.Group as={Col}>
                  <Form.Label>Prefix</Form.Label>
                  <Form.Control
                    className={`${PrefixErr && "inputError"}`}
                    type="text"
                    placeholder="Name prefix"
                    id="Prefix"
                    name="Prefix"
                    value={this.state.Prefix}
                    onChange={this.changeHandler}
                  />
                  {PrefixErr && <p className="error">{PrefixErr}</p>}
                </Form.Group>
              </Form.Row>

              <Form.Row>
                {/*Password input*/}
                <Form.Group as={Col}>
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    className={`${PasswordErr && "inputError"}`}
                    type="password"
                    placeholder="Please enter a password"
                    id="Password"
                    name="Password"
                    value={this.state.Password}
                    onChange={this.changeHandler}
                  />
                  {PasswordErr && <p className="error">{PasswordErr}</p>}
                </Form.Group>
              </Form.Row>
              <Form.Row>
                {/*Password Confirmation input*/}
                <Form.Group as={Col}>
                  <Form.Label>Password Confirmation</Form.Label>
                  <Form.Control
                    className={`${PasswordConfErr && "inputError"}`}
                    type="password"
                    placeholder="Please enter password confirmation"
                    id="PasswordConf"
                    name="PasswordConf"
                    value={this.state.PasswordConf}
                    onChange={this.changeHandler}
                  />
                  {PasswordConfErr && (
                    <p className="error">{PasswordConfErr}</p>
                  )}
                </Form.Group>
              </Form.Row>

              <Button
                type="submit"
                className="btn3"
                name="Consent"
                value="Yes"
                onChange={this.changeHandler}
              >
                Submit
              </Button>
            </div>
          </Form>
        </Container>
        <Footer />
      </React.Fragment>
    );
  }
}

CreateMhp.propTypes = {
  createMhp: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, { createMhp })(withRouter(CreateMhp));
