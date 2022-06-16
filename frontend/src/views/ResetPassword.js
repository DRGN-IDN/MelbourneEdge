import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "../MEdge.css";
import { Container } from "react-bootstrap";
import axios from "axios";
import Jumbotron from "../components/Jumbotron";
import NavigationBar from "../components/NavigationBar";
import Footer from "../components/Footer";
import { Col } from "react-bootstrap";

//CHANGELOG:
// ACHMAD MUSTAFA KEMAL 219374683 22/01/2021 11:30AM || Adding email validation on forgot password
// ACHMAD MUSTAFA KEMAL 219374683 22/01/2021 11:30PM || Adding Axios for extracting data from form and converting to JSON object
// MARK STURTZ 218306846 29/01/2021 3:35pm || added the axios post request functionality to connect to endpoint
// MARK STURTZ 218306846 29/01/2021 11:50pm || troubleshooting resetpassword class.
// MARK STURTZ 218306846 30/01/2021 12:31am || adding console.logs for troubleshooting, also changing patch request to post request
// MARK STURTZ 218306846 30/01/2021 1:56am || removing uneeded variables to the body of the axios post. added Newpassword to axios body
// MARK STURTZ 218306846 30/01/2021 1:56am || form validation correction

class ResetPassword extends Component {
  //state variable for form interactions as object
  constructor(props) {
    super(props);
    this.state = {
      Email: "",
      Password: "",
      PasswordConf: "",
      id: this.props.match.params.id,
      formErrors: {},
    };
  }

  // Validation for reset password - Achmad Mustafa Kemal 22/01/2021
  handleResetPassFormValidation() {
    const { NewPassword, NewPasswordConf } = this.state;
    let formErrors = {};
    let formvalid = true;

    //Password validation
    if (!NewPassword) {
      formvalid = false;
      formErrors["NewPasswordErr"] = "New password required";
    } else if (NewPassword.length <= 8) {
      formvalid = false;
      formErrors["NewPasswordErr"] =
        "The recommended new password length is at least 8 characters, please include a capital letter and special character also";
    }

    //Password Confirmation Validation
    if (!NewPasswordConf) {
      formvalid = false;
      formErrors["NewPasswordConfErr"] = "New password confirmation required";
    } else if (NewPasswordConf !== NewPassword) {
      formvalid = false;
      formErrors["NewPasswordConfErr"] =
        "New password confirmation don't match";
    }

    //initialise formErrors as part of the formErrors attribute of state object
    this.setState({ formErrors: formErrors });
    console.log(this.state);
    return formvalid;
  }

  //on change, adding changeHandler for assigned event (user input) to the target attribute's name - Achmad Mustafa Kemal 19/01/2021
  changeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  handleSubmit = (e) => {
    e.preventDefault();

    //delete formErrors attribute from object so they are not passed to the server
    delete this.state.formErrors;

    if (this.handleResetPassFormValidation() === true) {
      // This line is subject to change based on back end API structure - Achmad Mustafa Kemal 22/01/2021
      // This line is subject to change based on back end API structure - Achmad Mustafa Kemal 22/01/2021
      const body = {
        Password: this.state.NewPassword,
        id: this.state.id,
      };

      axios({
        url: "/api/resetpassword",
        data: body,
        method: "post",
      }).then(() => {
        this.props.history.push("/signin");
      });
    }
  };

  render() {
    const { NewPasswordErr, NewPasswordConfErr } = this.state.formErrors;

    return (
      <React.Fragment>
        <NavigationBar />
        <Jumbotron />
        <Form onSubmit={this.handleSubmit}>
          <h1 className="htitle">Reset Password</h1>
          <br />
          <Container>
            <Form.Row>
              {/*Password input*/}
              <Form.Group as={Col}>
                <Form.Label>New Password</Form.Label>
                <Form.Control
                  className={`${NewPasswordErr && "inputError"}`}
                  type="password"
                  placeholder="Please enter a new password"
                  id="NewPassword"
                  name="NewPassword"
                  value={this.state.NewPassword}
                  onChange={this.changeHandler}
                />
                {NewPasswordErr && <p className="error">{NewPasswordErr}</p>}
              </Form.Group>

              {/*Password Confirmation input*/}
              <Form.Group as={Col}>
                <Form.Label>New Password Confirmation</Form.Label>
                <Form.Control
                  className={`${NewPasswordConfErr && "inputError"}`}
                  type="password"
                  placeholder="Please enter new password confirmation"
                  id="NewPasswordConf"
                  name="NewPasswordConf"
                  value={this.state.NewPasswordConf}
                  onChange={this.changeHandler}
                />
                {NewPasswordConfErr && (
                  <p className="error">{NewPasswordConfErr}</p>
                )}
              </Form.Group>
            </Form.Row>
            <Button type="submit" className="btn3">
              Submit
            </Button>
          </Container>
        </Form>
        <Footer />
      </React.Fragment>
    );
  }
}

export default ResetPassword;
