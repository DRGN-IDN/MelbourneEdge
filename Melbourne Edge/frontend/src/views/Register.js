import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "../MEdge.css";
import { Container, Col } from "react-bootstrap";

import Jumbotron from "../components/Jumbotron";
import NavigationBar from "../components/NavigationBar";
import Footer from "../components/Footer";

import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerClient } from "../actions/authActions";

//CHANGELOG:
// LUKE SCIBERRAS 213085878 27/12/2020 9:30PM - 28/12/2020 1:10AM  || extracting data from form and converting to JSON object using axios.
// LUKE SCIBERRAS 213085878 28/12/2020 9:30AM - 12.30PM || assigning values to checkboxes and finessing axios to perform better extraction.
// LUKE SCIBERRAS 213085878 28/12/2020 2:00PM - 5:00PM || continuing troubleshooting axios GET and POST requests.
// LUKE SCIBERRAS 213085878 29/12/2020 5:00PM - 8:00PM || attempting alternate user validation method to Kem's (unsuccessful).
// LUKE SCIBERRAS 213085878 30/12/2020 10:30AM - 2:0PM || troubleshooting form submission to server (POST) and removing formError attribute of state object upon submission.
// LUKE SCIBERRAS 213085878 30/12/2020 2:00PM -2:30PM || commenting code for better future understanding.
// ACHMAD MUSTAFA KEMAL 219374683 25/12/2020 5:30PM - 8:30PM || creating a registration form (skeleton) and install dependencies (react-bootstrap and styled component)
// ACHMAD MUSTAFA KEMAL 219374683 25/12/2020 8:30PM - 11:30PM || continuing work on registration form (styling and put basic validation)
// ACHMAD MUSTAFA KEMAL 219374683 28/12/2020 8:30PM - 11:30PM || continuing work on user validation for register form
// ACHMAD MUSTAFA KEMAL 219374683 29/12/2020 7:30PM - 10:30PM || Combining Luke Code (JSON file) and user validation in registration form (On progress)
// ACHMAD MUSTAFA KEMAL 219374683 31/12/2020 5:30PM - 7:30PM || add son and daugther option on emergency relationship and fix it up user validation (still on progress) on date of birth, expiry date, and add confirmation password
// BEVAN FAIRLEIGH 219296864 1/1/2020 8:50PM || added changes to API POST (need to wait for database and sandbox merge to test)
// Bevan Fairleigh 219296864 16/01/2020 9:10 PM || Made changes to the axios call (moved to authActions.js) to enable authentication
// ACHMAD MUSTAFA KEMAL 219374683 17/01/2021 11:50PM || Fixed bug on registration form (Password Confirmation and Current Mental Health Plan)
// Bevan Fairleigh 219296864 23/01/2020 9:10 PM || Minor edits to fix check box, fix validation
// Bevan Fairleigh 219296864 24/01/2020 9:10 PM || Changed logic of checkbox to fix bug mostly related to profile.js and Currentmentalhealthplan
// LUKE SCIBERRAS 213085878 29/01/2020 9:55 PM || REMOVED REDUNDANT COMMENTS AND UNUSED VARIABLES.

class Register extends Component {
  //state variable for form interactions as object
  constructor(props) {
    super(props);
    this.state = {
      NameFirst: "",
      NameLast: "",
      DOB: "",
      Email: "",
      Password: "",
      PasswordConf: "",
      GenderIdentity: "",
      PhoneHome: "",
      PhoneMobile: "",
      HomeAddress: "",
      MedicareNumber: "",
      MedicareIRN: "",
      MedicareExpiry: "",
      ContactMethod: "",
      GPName: "",
      GPAddress: "",
      CurrentMentalHealthTreatmentPlan: "No",
      CurrentMentalHealthTreatmentPlanStart: "",
      Indigenous: "",
      Religious: "",
      ReligiousBelief: "",
      Ethnicity: "",
      Languages: "",
      EmergencyContactFirstName: "",
      EmergencyContactLastName: "",
      EmergencyContactPhone: "",
      EmergencyContactRelationship: "",
      Consent: "",

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
      NameFirst,
      NameLast,
      DOB,
      Email,
      Password,
      PasswordConf,
      GenderIdentity,
      PhoneHome,
      PhoneMobile,
      HomeAddress,
      MedicareNumber,
      MedicareIRN,
      MedicareExpiry,
      ContactMethod,
      CurrentMentalHealthTreatmentPlan,
      CurrentMentalHealthTreatmentPlanStart,
      Indigenous,
      Religious,
      Ethnicity,
      EmergencyContactFirstName,
      EmergencyContactLastName,
      EmergencyContactPhone,
      EmergencyContactRelationship,
      Consent,
    } = this.state;
    let formErrors = {};
    let formvalid = true;

    //Validation of required fields - Achmad Mustafa Kemal 29/12/2020
    //First name validation
    if (!NameFirst) {
      formvalid = false;
      formErrors["NameFirstErr"] = "First name is required.";
    }

    //Last name validation
    if (!NameLast) {
      formvalid = false;
      formErrors["NameLastErr"] = "Last name is required.";
    }

    //Email validation
    if (!Email) {
      formvalid = false;
      formErrors["emailErr"] = "Email required.";
    } else if (!/\S+@\S+\.\S+/.test(Email)) {
      formvalid = false;
      formErrors["emailErr"] = "Invalid email ";
    }

    //Password validation
    if (!Password) {
      formvalid = false;
      formErrors["PasswordErr"] = "Password required";
    } else if (Password.length <= 8) {
      formvalid = false;
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

    //DOB
    if (!DOB) {
      formvalid = false;
      formErrors["DOBErr"] = "Date of birth is required";
    } else if (
      !/^(0[1-9]|1[0-9]|2[0-9]|3[0-1])\/(0[1-9]|1[0-2])\/([0-9]{4})$/.test(DOB)
    ) {
      formvalid = false;
      formErrors["DOBErr"] = "Invalid date of birth";
    }

    //Gender
    if (!GenderIdentity) {
      formvalid = false;
      formErrors["GenderIdentityErr"] = "Gender is required";
    }

    //PhoneHome
    if (!PhoneHome) {
      formvalid = false;
      formErrors["PhoneHomeErr"] = "Home phone number is required";
    } else if (PhoneHome.length < 8) {
      formErrors["PhoneHomeErr"] =
        "Home phone numbers should not be less than 8 digits long";
    }

    //PhoneMobile
    if (!PhoneMobile) {
      formvalid = false;
      formErrors["PhoneMobileErr"] = "Mobile phone number is required";
    } else if (PhoneMobile.length > 10) {
      formErrors["PhoneMobileErr"] =
        "Mobile phone numbers should not be greater than 10 digits";
    }
    //Address
    if (!HomeAddress) {
      formvalid = false;
      formErrors["HomeAddressErr"] = "Home address is required";
    }

    //Medicare Number
    if (!MedicareNumber) {
      formvalid = false;
      formErrors["MedicareNumberErr"] = "Medicare number is required";
    }

    //Medicare IRN
    if (!MedicareIRN) {
      formvalid = false;
      formErrors["MedicareIRNErr"] = "Medicare IRN is required";
    }

    //Medicare Expiry date
    if (!MedicareExpiry) {
      formvalid = false;
      formErrors["MedicareExpiryErr"] = "Medicare Expiry is required";
    } else if (!/^(0[1-9]|1[0-2])\/([0-9]{4})$/.test(MedicareExpiry)) {
      formvalid = false;
      formErrors["MedicareExpiryErr"] = "Invalid medicare expired";
    }

    //Contact Method
    if (!ContactMethod) {
      formvalid = false;
      formErrors["ContactMethodErr"] = "Contact method is required";
    }

    if (CurrentMentalHealthTreatmentPlan) {
      if (
        !/^(0[1-9]|1[0-9]|2[0-9]|3[0-1])\/(0[1-9]|1[0-2])\/([0-9]{4})$/.test(
          CurrentMentalHealthTreatmentPlanStart
        )
      ) {
        formvalid = false;
        formErrors["CurrentMentalHealthTreatmentPlanStartErr"] =
          "Invalid current mental health treatment start";
      }
    }

    //Indigenous
    if (!Indigenous) {
      formvalid = false;
      formErrors["IndigenousErr"] = "Please select one of the options ";
    }

    //Religious
    if (!Religious) {
      formvalid = false;
      formErrors["ReligiousErr"] = "Please select one of the options ";
    }

    //Ethnicity
    if (!Ethnicity) {
      formvalid = false;
      formErrors["EthnicityErr"] = "Ethnicity required";
    }

    //Emergency Contact First Name
    if (!EmergencyContactFirstName) {
      formvalid = false;
      formErrors["EmergencyContactFirstNameErr"] =
        "Your emergency contact's first name is required ";
    }

    //Emergency Contact Last Name
    if (!EmergencyContactLastName) {
      formvalid = false;
      formErrors["EmergencyContactLastNameErr"] =
        "Your emergency contact's Last name required ";
    }

    //Emergency Contact Phone
    if (!EmergencyContactPhone) {
      formvalid = false;
      formErrors["EmergencyContactPhoneErr"] =
        "Your emergency contact's phone number required ";
    }

    //Emergency Contact Relationship
    if (!EmergencyContactRelationship) {
      formvalid = false;
      formErrors["EmergencyContactRelationshipErr"] =
        "Your relationship to the nominated emergency contact is required ";
    }

    //Consent
    if (!Consent) {
      formvalid = true;
      formErrors["ConsentErr"] =
        "Please tick this checkbox if you consent to the terms and conditions";
    }

    //initialise formErrors as part of the formErrors attribute of state object
    this.setState({ formErrors: formErrors });
    console.log(this.state);
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
      this.props.registerClient(this.state, this.props.history);
    }
  };

  render() {
    const {
      NameFirstErr,
      NameLastErr,
      emailErr,
      PasswordErr,
      PasswordConfErr,
      DOBErr,
      GenderIdentityErr,
      PhoneHomeErr,
      PhoneMobileErr,
      HomeAddressErr,
      MedicareNumberErr,
      MedicareIRNErr,
      MedicareExpiryErr,
      ContactMethodErr,
      GPNameErr,
      GPAddressErr,
      CurrentMentalHealthTreatmentPlanStartErr,
      IndigenousErr,
      ReligiousErr,
      ReligiousBeliefErr,
      EthnicityErr,
      LanguagesErr,
      EmergencyContactFirstNameErr,
      EmergencyContactLastNameErr,
      EmergencyContactPhoneErr,
      EmergencyContactRelationshipErr,
      ConsentErr,
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
                <b>Personal details</b>
              </h5>
              <br />

              {/* First name input */}
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

              {/* Email input */}
              <Form.Row>
                <Form.Group as={Col}>
                  <Form.Label>Email</Form.Label>
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

                {/* Date of Birth input */}
                <Form.Group as={Col}>
                  <Form.Label>Date of Birth (dd/mm/yyyy)</Form.Label>
                  <Form.Control
                    className={`${DOBErr && "inputError"}`}
                    type="text"
                    placeholder="Enter your date of birth (DD/MM/YYYY)"
                    id="DOB"
                    name="DOB"
                    value={this.state.DOB}
                    onChange={this.changeHandler}
                  />
                  {DOBErr && <p className="error">{DOBErr}</p>}
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

              <br />
              {/* Gender checkboxes */}
              <Form.Group>
                <Form.Label>Gender</Form.Label>
                <Col sm={12}>
                  <Form.Check
                    inline
                    type="radio"
                    label="Female"
                    name="GenderIdentity"
                    value={"Female"}
                    onChange={this.changeHandler}
                  />
                  <Form.Check
                    inline
                    type="radio"
                    label="Male"
                    name="GenderIdentity"
                    value={"Male"}
                    onChange={this.changeHandler}
                  />
                  <Form.Check
                    inline
                    type="radio"
                    label="Non-Binary"
                    name="GenderIdentity"
                    value={"Non-Binary"}
                    onChange={this.changeHandler}
                  />
                  <Form.Check
                    inline
                    type="radio"
                    label="Prefer not to say"
                    name="GenderIdentity"
                    value={"Prefer not to say"}
                    onChange={this.changeHandler}
                  />
                </Col>
                {GenderIdentityErr && (
                  <p className="error">{GenderIdentityErr}</p>
                )}
              </Form.Group>

              {/* Home phone number input*/}
              <Form.Group>
                <Form.Label>Home phone number</Form.Label>
                <Form.Control
                  className={`${PhoneHomeErr && "inputError"}`}
                  type="number"
                  placeholder="Enter your home phone number"
                  id="PhoneHome"
                  name="PhoneHome"
                  value={this.state.PhoneHome}
                  onChange={this.changeHandler}
                />
                {PhoneHomeErr && <p className="error">{PhoneHomeErr}</p>}
              </Form.Group>

              {/* Mobile number input */}
              <Form.Group>
                <Form.Label>Mobile number</Form.Label>
                <Form.Control
                  className={`${PhoneMobileErr && "inputError"}`}
                  type="number"
                  placeholder="Enter your mobile number"
                  id="PhoneMobile"
                  maxLength="10"
                  name="PhoneMobile"
                  value={this.state.PhoneMobile}
                  onChange={this.changeHandler}
                />
                {PhoneMobileErr && <p className="error">{PhoneMobileErr}</p>}
              </Form.Group>

              {/* Home address input */}
              <Form.Group>
                <Form.Label>Address</Form.Label>
                <Form.Control
                  className={`${HomeAddressErr && "inputError"}`}
                  type="text"
                  placeholder="Please enter your home address"
                  id="HomeAddress"
                  name="HomeAddress"
                  value={this.state.HomeAddress}
                  onChange={this.changeHandler}
                />
                {HomeAddressErr && <p className="error">{HomeAddressErr}</p>}
              </Form.Group>

              {/* Contact method radio button */}
              <Form.Group>
                <Form.Label>Preferred mode of contact</Form.Label>
                <Col sm={12}>
                  <Form.Check
                    inline
                    type="radio"
                    label="Telephone"
                    name="ContactMethod"
                    value="Telephone"
                    onChange={this.changeHandler}
                  />
                  <Form.Check
                    inline
                    type="radio"
                    label="Email"
                    name="ContactMethod"
                    value="Email"
                    onChange={this.changeHandler}
                  />
                  <Form.Check
                    inline
                    type="radio"
                    label="Text"
                    name="ContactMethod"
                    value="Text"
                    onChange={this.changeHandler}
                  />
                </Col>
                {ContactMethodErr && (
                  <p className="error">{ContactMethodErr}</p>
                )}
              </Form.Group>
              <br />

              {/* MEDICARE FIELDS */}
              {/* Medicare number input*/}
              <h5 className="htitle2">
                <b>Medicare number details</b>
              </h5>
              <br />
              <Form.Row>
                <Form.Group as={Col}>
                  <Form.Label>Medicare number </Form.Label>
                  <Form.Control
                    className={`${MedicareNumberErr && "inputError"}`}
                    type="text"
                    placeholder="Enter Medicare Number"
                    maxLength="10"
                    id="MedicareNumber"
                    name="MedicareNumber"
                    value={this.state.MedicareNumber}
                    onChange={this.changeHandler}
                  />
                  {MedicareNumberErr && (
                    <p className="error">{MedicareNumberErr}</p>
                  )}
                </Form.Group>

                {/* Medicare individual reference number (IRN) */}
                <Form.Group as={Col}>
                  <Form.Label>Medicare IRN</Form.Label>
                  <Form.Control
                    className={`${MedicareIRNErr && "inputError"}`}
                    type="text"
                    placeholder="Enter your Medicare IRN"
                    maxLength="2"
                    id="MedicareIRN"
                    name="MedicareIRN"
                    value={this.state.MedicareIRN}
                    onChange={this.changeHandler}
                  />
                  {MedicareIRNErr && <p className="error">{MedicareIRNErr}</p>}
                </Form.Group>

                {/* Medicare expiry date (changed from "date" to "text" as date requires DD/MM/YYYY; Medicare only provides MM/YYYY) */}
                <Form.Group as={Col}>
                  <Form.Label>Medicare expiry date</Form.Label>
                  <Form.Control
                    className={`${MedicareExpiryErr && "inputError"}`}
                    type="text"
                    placeholder="Enter valid expiry date (MM/YYYY)"
                    id="MedicareExpiry"
                    name="MedicareExpiry"
                    value={this.state.MedicareExpiry}
                    onChange={this.changeHandler}
                  />
                  {MedicareExpiryErr && (
                    <p className="error">{MedicareExpiryErr}</p>
                  )}
                </Form.Group>
              </Form.Row>

              {/* GP DETAILS */}
              <h5 className="htitle2">
                <b>GP details</b>
              </h5>
              <br />

              {/* GP name */}
              <Form.Group>
                <Form.Label>Referring GP name (if known)</Form.Label>
                <Form.Control
                  className={`${GPNameErr && "inputError"}`}
                  type="text"
                  placeholder="Enter GP Name"
                  id="GPName"
                  name="GPName"
                  value={this.state.GPName}
                  onChange={this.changeHandler}
                />
                {GPNameErr && <p className="error">{GPNameErr}</p>}
              </Form.Group>

              {/* GP addresss */}
              <Form.Group>
                <Form.Label>GP pratical address</Form.Label>
                <Form.Control
                  className={`${GPAddressErr && "inputError"}`}
                  type="text"
                  placeholder="Enter your GP's address"
                  id="GPAddress"
                  name="GPAddress"
                  value={this.state.GPAddress}
                  onChange={this.changeHandler}
                />
                {GPAddressErr && <p className="error">{GPAddressErr}</p>}
              </Form.Group>

              {/* MHTP checkboxes */}
              <Form.Group>
                <Form.Label>Current Mental Health Treatment Plan </Form.Label>
                &nbsp; &nbsp;
                <Form.Label>Current Mental Health Treatment Plan </Form.Label>
                &nbsp; &nbsp;
                <Form.Check
                  inline
                  type="radio"
                  label="Yes"
                  name="CurrentMentalHealthTreatmentPlan"
                  value="Yes"
                  checked={
                    this.state.CurrentMentalHealthTreatmentPlan === "Yes"
                  }
                  onChange={this.changeHandler}
                />
                <Form.Check
                  inline
                  type="radio"
                  label="No"
                  name="CurrentMentalHealthTreatmentPlan"
                  value="No"
                  checked={this.state.CurrentMentalHealthTreatmentPlan === "No"}
                  onChange={this.changeHandler}
                />
                <Form.Label>
                  Start date - current Mental Health Treatment Plan
                </Form.Label>
                <Form.Control
                  className={`${
                    CurrentMentalHealthTreatmentPlanStartErr && "inputError"
                  }`}
                  type="text"
                  placeholder="Enter your start date (DD/MM/YYYY)"
                  name="CurrentMentalHealthTreatmentPlanStart"
                  disabled={
                    !(this.state.CurrentMentalHealthTreatmentPlan === "Yes")
                  }
                  value={this.state.CurrentMentalHealthTreatmentPlanStart}
                  onChange={this.changeHandler}
                />
                {CurrentMentalHealthTreatmentPlanStartErr && (
                  <p className="error">
                    {CurrentMentalHealthTreatmentPlanStartErr}
                  </p>
                )}
              </Form.Group>
              <br />

              {/* Cultural and Religious Identity */}
              <h5 className="htitle2">
                <b>Cultural and religious identity</b>
              </h5>
              <br />

              {/* Indigenous/TSI checkboxes */}
              <Form.Group>
                <Form.Label>
                  {" "}
                  Do you identify as Aboriginal or Torres Strait Islander
                </Form.Label>
                <Col sm={12}>
                  <Form.Check
                    inline
                    type="radio"
                    label="Yes"
                    name="Indigenous"
                    value="Yes"
                    onChange={this.changeHandler}
                  />
                  <Form.Check
                    inline
                    type="radio"
                    label="No"
                    name="Indigenous"
                    value="No"
                    onChange={this.changeHandler}
                  />
                  <Form.Check
                    inline
                    type="radio"
                    label="Prefer not to say"
                    name="Indigenous"
                    value="Prefer not to say"
                    onChange={this.changeHandler}
                  />
                </Col>
                {IndigenousErr && <p className="error">{IndigenousErr}</p>}
              </Form.Group>
              <br />

              {/* Religion/Spirituality checkboxes */}
              <Form.Group>
                <Form.Label>
                  Do you identify with any religion or spiritual beliefs
                </Form.Label>
                <Col sm={12}>
                  <Form.Check
                    inline
                    type="radio"
                    label="Yes"
                    name="Religious"
                    value="Yes"
                    onChange={this.changeHandler}
                  />
                  <Form.Check
                    inline
                    type="radio"
                    label="No"
                    name="Religious"
                    value="No"
                    onChange={this.changeHandler}
                  />
                  <Form.Check
                    inline
                    type="radio"
                    label="Prefer not to say"
                    name="Religious"
                    value="Prefer not to say"
                    onChange={this.changeHandler}
                  />
                </Col>
                {ReligiousErr && <p className="error">{ReligiousErr}</p>}
              </Form.Group>
              <br />

              {/* Religious belief input -- IF USER CLICKS YES TO ABOVE, THEN THIS SHOULD APPEAR AND BE MANDATORY */}
              <Form.Group>
                <Form.Label>
                  If yes - please feel free to share your religious or spiritual
                  beliefs.
                </Form.Label>
                <Form.Control
                  className={`${ReligiousBeliefErr && "inputError"}`}
                  type="text"
                  placeholder="Enter belief"
                  id="ReligiousBelief"
                  name="ReligiousBelief"
                  value={this.state.ReligiousBelief}
                  onChange={this.changeHandler}
                />
                {ReligiousBeliefErr && (
                  <p className="error">{ReligiousBeliefErr}</p>
                )}
              </Form.Group>

              {/* Ethnicity input -- NOT SURE IF THIS SHOULD BE REQUIRED */}
              <Form.Group>
                <Form.Label>What ethnicity do you most identify as?</Form.Label>
                <Form.Control
                  className={`${EthnicityErr && "inputError"}`}
                  type="text"
                  placeholder="Enter Here"
                  id="Ethnicity"
                  name="Ethnicity"
                  value={this.state.Ethnicity}
                  onChange={this.changeHandler}
                />
                {EthnicityErr && <p className="error">{EthnicityErr}</p>}
              </Form.Group>

              {/* Languages -- NOT REQUIRED */}
              <Form.Group>
                <Form.Label>
                  What language, if any other than English do you speak?
                </Form.Label>
                <Form.Control
                  className={`${LanguagesErr && "inputError"}`}
                  type="text"
                  placeholder="Enter Here"
                  id="Languages"
                  name="Languages"
                  value={this.state.Languages}
                  onChange={this.changeHandler}
                />
                {LanguagesErr && <p className="error">{LanguagesErr}</p>}
              </Form.Group>
              <br />

              {/* Emergency Contact / Next of Kin (Must Be over 18)*/}
              <h5 className="htitle2">
                <b>Emergency contact / next of kin (must be over 18)</b>
              </h5>
              <br />

              {/* Emergency contact first name input */}
              <Form.Group>
                <Form.Label>First name</Form.Label>
                <Form.Control
                  className={`${EmergencyContactFirstNameErr && "inputError"}`}
                  type="text"
                  placeholder="Enter first name"
                  id="EmergencyContactFirstName"
                  name="EmergencyContactFirstName"
                  value={this.state.EmergencyContactFirstName}
                  onChange={this.changeHandler}
                />
                {EmergencyContactFirstNameErr && (
                  <p className="error">{EmergencyContactFirstNameErr}</p>
                )}
              </Form.Group>

              {/* Emergency contact last name */}
              <Form.Group>
                <Form.Label>Last name</Form.Label>
                <Form.Control
                  className={`${EmergencyContactLastNameErr && "inputError"}`}
                  type="text"
                  placeholder="Enter last name"
                  id="EmergencyContactLastName"
                  name="EmergencyContactLastName"
                  value={this.state.EmergencyContactLastName}
                  onChange={this.changeHandler}
                />
                {EmergencyContactLastNameErr && (
                  <p className="error">{EmergencyContactLastNameErr}</p>
                )}
              </Form.Group>

              {/* Emergency contact phone number*/}
              <Form.Group>
                <Form.Label>Contact number</Form.Label>
                <Form.Control
                  className={`${EmergencyContactPhoneErr && "inputError"}`}
                  type="number"
                  placeholder="Enter your contact Number"
                  id="EmergencyContactPhone"
                  name="EmergencyContactPhone"
                  value={this.state.EmergencyContactPhone}
                  onChange={this.changeHandler}
                />
                {EmergencyContactPhoneErr && (
                  <p className="error">{EmergencyContactPhoneErr}</p>
                )}
              </Form.Group>

              {/* Emergency contact relationship */}
              <Form.Group>
                <Form.Label>Relationship to You</Form.Label>
                <Col sm={12}>
                  <Form.Check
                    inline
                    type="radio"
                    label="Mother"
                    name="EmergencyContactRelationship"
                    value="Mother"
                    onChange={this.changeHandler}
                  />
                  <Form.Check
                    inline
                    type="radio"
                    label="Father"
                    name="EmergencyContactRelationship"
                    value="Father"
                    onChange={this.changeHandler}
                  />
                  <Form.Check
                    inline
                    type="radio"
                    label="Brother"
                    name="EmergencyContactRelationship"
                    value="Brother"
                    onChange={this.changeHandler}
                  />
                  <Form.Check
                    inline
                    type="radio"
                    label="Sister"
                    name="EmergencyContactRelationship"
                    value="Sister"
                    onChange={this.changeHandler}
                  />
                  <Form.Check
                    inline
                    type="radio"
                    label="Partner"
                    name="EmergencyContactRelationship"
                    value="Partner"
                    onChange={this.changeHandler}
                  />
                  <Form.Check
                    inline
                    type="radio"
                    label="Wife"
                    name="EmergencyContactRelationship"
                    value="Wife"
                    onChange={this.changeHandler}
                  />
                  <Form.Check
                    inline
                    type="radio"
                    label="Husband"
                    name="EmergencyContactRelationship"
                    value="Husband"
                    onChange={this.changeHandler}
                  />
                  <Form.Check
                    inline
                    type="radio"
                    label="Son"
                    name="EmergencyContactRelationship"
                    value="Son"
                    onChange={this.changeHandler}
                  />
                  <Form.Check
                    inline
                    type="radio"
                    label="Daughter"
                    name="EmergencyContactRelationship"
                    value="Daughter"
                    onChange={this.changeHandler}
                  />
                </Col>
                <br />
                <Col sm={12}>
                  <Form.Check
                    inline
                    type="radio"
                    label="Cousin"
                    name="EmergencyContactRelationship"
                    value="Cousin"
                    onChange={this.changeHandler}
                  />
                  <Form.Check
                    inline
                    type="radio"
                    label="Aunt"
                    name="EmergencyContactRelationship"
                    value="Cousin"
                    onChange={this.changeHandler}
                  />
                  <Form.Check
                    inline
                    type="radio"
                    label="Uncle"
                    name="EmergencyContactRelationship"
                    value="Uncle"
                    onChange={this.changeHandler}
                  />
                  <Form.Check
                    inline
                    type="radio"
                    label="Carer"
                    name="EmergencyContactRelationship"
                    value="Aunt"
                    onChange={this.changeHandler}
                  />
                  <Form.Check
                    inline
                    type="radio"
                    label="Guardian"
                    name="EmergencyContactRelationship"
                    value="Uncle"
                    onChange={this.changeHandler}
                  />
                  <Form.Check
                    inline
                    type="radio"
                    label="Power of Attorney"
                    name="EmergencyContactRelationship"
                    value="Carer"
                    onChange={this.changeHandler}
                  />
                </Col>
                {EmergencyContactRelationshipErr && (
                  <p className="error">{EmergencyContactRelationshipErr}</p>
                )}
              </Form.Group>
              <br />

              {/* Consent */}
              <h5 className="htitle2">
                <b>Consent</b>
              </h5>
              <br />
              <h6>I have read the following policies:</h6>
              <ol>
                <li>
                  <a href={"https://melbourne-edge.com.au/terms-of-use/"}>
                    Term of Use{" "}
                  </a>
                </li>
                <li>
                  <a href={"https://melbourne-edge.com.au/fees-cancellations/"}>
                    Fees & Cancellation Policy
                  </a>
                </li>
                <li>
                  <a href={"https://melbourne-edge.com.au/privacy-policy/"}>
                    Privacy Policy{" "}
                  </a>
                </li>
              </ol>

              {/* Consent checkboxes */}
              <Form.Label>
                I have read the above policies and agree freely to participate
                in sessions
              </Form.Label>
              <Form.Group>
                <Form.Check
                  className={`${ConsentErr && "inputError"}`}
                  name="Consent"
                  type="checkbox"
                  label="Yes"
                  value="Yes"
                  id="Consent"
                  onChange={this.changeHandler}
                />
                {ConsentErr && <p className="error">{ConsentErr}</p>}
              </Form.Group>
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

Register.propTypes = {
  registerClient: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, { registerClient })(
  withRouter(Register)
);
