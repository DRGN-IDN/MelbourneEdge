//CHANGELOG:
//
// Bevan Fairleigh 23/1/2021 20:00 || Created.  Modified from client log in

import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "../../MEdge.css";
import { Container } from "react-bootstrap";

import Jumbotron from "../../components/Jumbotron";
import NavigationBar from "../../components/NavigationBar";
import Footer from "../../components/Footer";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { adminLogin } from "../../actions/adminActions";

class AdminLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Username: "",
      Password: "",
      formErrors: {},
    };
  }

  // If Client is already authenticated, then we can load straight to dashboard
  componentDidMount() {
    console.log("is authenticated", this.props.auth);
    if (this.props.auth.isAdminAuthenticated) {
      this.props.history.push("/admin/dashboard");
    }
  }

  // If Client receives props, check to see if it's now authenticated and load dashboard
  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAdminAuthenticated) {
      this.props.history.push("/admin/dashboard");
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
    const { Username, Password } = this.state;
    let formErrors = {};
    let formvalid = false;
    //Email validation
    if (!Username) {
      formvalid = false;
    }
    //Password Confirmation Validation
    if (!Password) {
      formvalid = false;
      formErrors["UsernameErr"] = "Username required";
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
      Username: this.state.Username,
      Password: this.state.Password,
    };
    // if the validation handler returns false (no errors)
    if (this.handleSignFormValidation() === false) {
      //Run the action in authAction to login using the credentials
      this.props.adminLogin(credentials);
    }
  };

  render() {
    const { UsernameErr, PasswordErr } = this.state.formErrors;
    return (
      <React.Fragment>
        <NavigationBar />
        <Jumbotron />
        <Form onSubmit={this.handleSubmit}>
          <h1 className="htitle">Admin access only</h1>
          <Container>
            <Form.Group>
              <Form.Label>Admin username</Form.Label>
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
AdminLogin.propTypes = {
  // Login: function to login a user (in authActions)
  adminLogin: PropTypes.func.isRequired,
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
export default connect(mapStateToProps, { adminLogin })(AdminLogin);
