import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "../MEdge.css";
import { Container } from "react-bootstrap";
import axios from "axios";
import Jumbotron from "../components/Jumbotron";
import NavigationBar from "../components/NavigationBar";
import Footer from "../components/Footer";

//CHANGELOG:
// GERALDINE JENNIFER DESSA 92568765 07/01/2021 10:32 - 11:32 || forgot password form creation
// SHYAM KODALI 218722964 07/01/2021 11:00PM - 11:20PM || Styling
// ACHMAD MUSTAFA KEMAL 219374683 19/01/2021 11:50PM || Adding email validation on forgot password
// ACHMAD MUSTAFA KEMAL 219374683 19/01/2021 11:50PM || Adding Axios for extracting data from form and converting to JSON object
// MARK STURTZ 218306846 29/01/2021 3:35pm || added the axios post request functionality to connect to endpoint
// MARK STURTZ 218306846 30/01/2021 12:31pm || adding console logs to troubleshooting

class ForgotPassword extends Component {
  //state variable for form interactions as object
  constructor(props) {
    super(props);
    this.state = {
      Email: "",
      formErrors: {},
    };
  }

  // Validation for forgot password - Achmad Mustafa Kemal 19/01/2021
  handleForgotPassFormValidation() {
    const { Email } = this.state;
    let formErrors = {};
    let formvalid = false;

    //Email Validation
    if (!Email) {
      formvalid = false;
      formErrors["emailErr"] = "Email required.";
    } else if (!/\S+@\S+\.\S+/.test(Email)) {
      formvalid = false;
      formErrors["emailErr"] = "Invalid email ";
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

    if (this.handleForgotPassFormValidation() === false) {
      // This line is subject to change based on back end API structure - Achmad Mustafa Kemal 19/01/2021
      // Added the api structure for posting forgotpassword - Mark Sturtz 29/01/2021
      const body = {
        Email: this.state.Email,
      }

    console.log(body);

    axios({
        url: "/api/ForgotPassword",
        data: body,
        method: "post",
      })
    }
  };

  render() {
    const { emailErr } = this.state.formErrors;

    return (
      <React.Fragment>
        <NavigationBar />
        <Jumbotron />
        <Form onSubmit={this.handleSubmit}>
          <h1 className="htitle">Forgot Password</h1>
          <Container>
            <Form.Group>
              <Form.Label>Email address</Form.Label>
              <Form.Control
                className={`${emailErr && "inputError"}`}
                type="email"
                placeholder="Enter your email"
                id="Email"
                name="Email"
                value={this.state.Email}
                onChange={this.changeHandler}
              />
              {emailErr && <p className="error">{emailErr}</p>}
            </Form.Group>
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

export default ForgotPassword;
