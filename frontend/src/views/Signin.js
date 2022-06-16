//CHANGELOG:
// ACHMAD MUSTAFA KEMAL 219374683 25/12/2020 5:30PM - 8:30PM || creating a sign in form (skeleton) and install dependencies (react-bootstrap and styled component)
// LUKE SCIBERRAS 213085878 4/01/2021 9:30PM - 28/12/2020 1:10AM  || extracting data from form and converting to JSON object using axios.
// GERALDINE JENNIFER DESSA 07/01/2021 10:30 - 10:40AM || Add hyperlink for forgot password form
// Yang Xu 217613282 08/01/2021 16:00 || Added Validation for sign in form
// Bevan Fairleigh 16/1/2021 20:00 || Modified to let authActions handle axios calls for authentication

import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "../MEdge.css";
import { Container } from "react-bootstrap";

import Jumbotron from "../components/Jumbotron";
import NavigationBar from "../components/NavigationBar";
import Footer from "../components/Footer";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { login } from "../actions/authActions";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Email: "",
      Password: "",
      formErrors: {},
    };
  }

  // If Client is already authenticated, then we can load straight to dashboard
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  // If Client receives props, check to see if it's now authenticated and load dashboard
  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
    // otherwise, if it's error, display those errors
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors,
      });
    }
    //else, do nothing with the new props
  }

  handleSignFormValidation() {
    const { Email, Password } = this.state;
    let formErrors = {};
    let formvalid = false;
    //Email validation
    if (!Email) {
      formvalid = false;
      formErrors["EmailErr"] = "Email required.";
    } else if (!/\S+@\S+\.\S+/.test(Email)) {
      formvalid = false;
      formErrors["EmailErr"] = "Invalid email ";
    }
    //Password Confirmation Validation
    if (!Password) {
      formvalid = false;
      formErrors["PasswordErr"] = "Password required";
    }

    this.setState({ formErrors: formErrors });
    console.log(this.state);
    return formvalid;
  }

  changeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  // Handlesubmit is the event called when submit button is pressed
  handleSubmit = (e) => {
    e.preventDefault();

    delete this.state.formErrors;

    //Save our credentials as they have been entered
    const credentials = {
      Email: this.state.Email,
      Password: this.state.Password,
    };
    // if the validation handler returns false (no errors)
    if (this.handleSignFormValidation() === false) {
      //Run the action in authAction to login using the credentials
      this.props.login(credentials);
    }
  };

  render() {
    const { EmailErr, PasswordErr } = this.state.formErrors;
    return (
      <React.Fragment>
        <NavigationBar />
        <Jumbotron />
        <Form onSubmit={this.handleSubmit}>
          <h1 className="htitle">Log into Edge-perience</h1>
          <Container>
            <Form.Group>
              <Form.Label>Email address</Form.Label>
              <Form.Control
                className={`${EmailErr && "inputError"}`}
                type="email"
                placeholder="Enter your email"
                id="Email"
                name="Email"
                value={this.state.Email}
                onChange={this.changeHandler}
              />
              {EmailErr && <p className="error">{EmailErr}</p>}
            </Form.Group>
            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control
                className={`${PasswordErr && "inputError"}`}
                type="password"
                id="Password"
                name="Password"
                placeholder="Enter email"
                value={this.state.Password}
                onChange={this.changeHandler}
              />
              {PasswordErr && <p className="error">{PasswordErr}</p>}
            </Form.Group>
            <Button
              type="submit"
              className="btn3"
              onChange={this.changeHandler}
            >
              Submit
            </Button>
            &nbsp;
            <a href="/ForgotPassword">Forgot password?</a>
          </Container>
        </Form>
        <Footer />
      </React.Fragment>
    );
  }
}

// Prop types of Login
Login.propTypes = {
  // Login: function to login a user (in authActions)
  login: PropTypes.func.isRequired,
  // Auth: set to true when user is logged in
  auth: PropTypes.object.isRequired,
  // Errors: object container for errors that may occur
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

//Export our login function and properties
export default connect(mapStateToProps, { login })(Login);
