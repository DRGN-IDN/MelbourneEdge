import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "../MEdge.css";
import { Container, Col } from "react-bootstrap";

import Jumbotron from "../components/Jumbotron";
import NavigationBarDash from "../components/NavigationBarDash";
import Footer from "../components/Footer";

import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { updateClient } from "../actions/authActions";
import axios from "axios";

// frontend/src/views/Register.js
//CHANGELOG:
// BEVAN FAIRLEIGH 219296864 21/1/2020 8:50PM || made API call to get current authenticated user from the database, load into the form
// BEVAN FAIRLEIGH 219296864 22/1/2020 8:50PM || updated API to load data in the individual fields
// Phuong Dang 24/1/21 1:46PM || Updated the codes to follow the updateClient API
// Bevan Fairleigh 219296864 25/01/2020 8:00 || more bug fixes related to the checkbox.  Changed to radio buttons to give predictive behaviour

class Profile extends Component {
  //state variable for form interactions as object
  constructor(props) {
    super(props);
    this.state = {
      NameFirst: "",
      NameLast: "",
      DOB: "",
      Email: "",
      //  Password: "", taking out reference to Password and PasswordConf due to compile errors
      //  PasswordConf: "",
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
      CurrentMentalHealthTreatmentPlan: "",
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

  // YANG, this is the part that needs modification.  The AXIOS GET request gets the data from the server, so you need to load it in and make use of in this form

  componentDidMount() {
    axios
      .get(`/api/getClient`)
      .then((res) => {
        this.setState({
          NameFirst: res.data.data.client.NameFirst,
          NameLast: res.data.data.client.NameLast,
          DOB: res.data.data.client.DOB,
          Email: res.data.data.client.Email,

          GenderIdentity: res.data.data.client.GenderIdentity,
          PhoneHome: res.data.data.client.PhoneHome,
          PhoneMobile: res.data.data.client.PhoneMobile,
          HomeAddress: res.data.data.client.HomeAddress,
          MedicareNumber: res.data.data.client.MedicareNumber,
          MedicareIRN: res.data.data.client.MedicareIRN,
          MedicareExpiry: res.data.data.client.MedicareExpiry,
          ContactMethod: res.data.data.client.ContactMethod,
          GPName: res.data.data.client.GPName,
          GPAddress: res.data.data.client.GPAddress,
          CurrentMentalHealthTreatmentPlan:
            res.data.data.client.CurrentMentalHealthTreatmentPlan,
          CurrentMentalHealthTreatmentPlanStart:
            res.data.data.client.CurrentMentalHealthTreatmentPlanStart,
          Indigenous: res.data.data.client.Indigenous,
          Religious: res.data.data.client.Religious,
          ReligiousBelief: res.data.data.client.ReligiousBelief,
          Ethnicity: res.data.data.client.Ethnicity,
          Languages: res.data.data.client.Languages,
          EmergencyContactFirstName:
            res.data.data.client.EmergencyContactFirstName,
          EmergencyContactLastName:
            res.data.data.client.EmergencyContactLastName,
          EmergencyContactPhone: res.data.data.client.EmergencyContactPhone,
          EmergencyContactRelationship:
            res.data.data.client.EmergencyContactRelationship,
          Consent: res.data.data.client.Consent,
          formErrors: {},
        });

        if (this.state.CurrentMentalHealthTreatmentPlan === "No") {
          this.setState({
            disabled: true,
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  //adding code for object validation Geraldine Dessa 22/1/21

  //duplicate objects for validation
  handleProfileValidation() {
    const {
      NameFirst,
      NameLast,
      DOB,
      Email,
      //Password,
      //PasswordConf,
      GenderIdentity,
      PhoneHome,
      PhoneMobile,
      HomeAddress,
      MedicareNumber,
      MedicareIRN,
      MedicareExpiry,
      ContactMethod,
      GPName,
      GPAddress,
      CurrentMentalHealthTreatmentPlan,
      CurrentMentalHealthTreatmentPlanStart,
      Indigenous,
      Religious,
      //ReligiousBelief,
      Ethnicity,
      //Languages,
      EmergencyContactFirstName,
      EmergencyContactLastName,
      EmergencyContactPhone,
      EmergencyContactRelationship,
      Consent,
    } = this.state;
    let formErrors = {};
    let formvalid = true;

    //Validation of required fields
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
    //if (!Password) {
    //  formvalid = false;
    //  formErrors["PasswordErr"] = "Password required";
    //} else if (Password.length <= 8) {
    //  formErrors["PasswordErr"] =
    //   "The recommended password length is at least 8 characters, please include a capital letter and special character also";
    //}

    //Password Confirmation Validation
    //if (!PasswordConf) {
    //  formvalid = false;
    //  formErrors["PasswordConfErr"] = "Password confirmation required";
    //} else if (PasswordConf !== Password) {
    //  formvalid = false;
    //  formErrors["PasswordConfErr"] = "Password confirmation don't match";
    //}

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

    //GP Name
    if (!GPName) {
      formvalid = false;
      formErrors["GPNameErr"] = "GP's name is required";
    }

    //GP Address
    if (!GPAddress) {
      formvalid = false;
      formErrors["GPAddressErr"] = "GP's practicing address is required";
    }

    //if (
    //  !/^(0[1-9]|1[0-9]|2[0-9]|3[0-1])\/(0[1-9]|1[0-2])\/([0-9]{4})$/.test(
    //    CurrentMentalHealthTreatmentPlanStart
    //  )
    //) {
    //  formvalid = false;
    //  formErrors["CurrentMentalHealthTreatmentPlanStartErr"] =
    //    "Invalid current mental health treatment start";
    //}

    //validation on treatment plan start date needs to be fixed
    if (CurrentMentalHealthTreatmentPlan) {
      if (
        !/^(0[1-9]|1[0-9]|2[0-9]|3[0-1])\/(0[1-9]|1[0-2])\/([0-9]{4})$/.test(
          CurrentMentalHealthTreatmentPlanStart
        )
      ) {
        formvalid = false;
        formErrors["CurrentMentalHealthTreatmentPlanStartErr"] =
          "Invalid date entered";
      }
    }
    //if (CurrentMentalHealthTreatmentPlanStart.value === "Yes") {
    //   formvalid = false;
    //   formErrors["CurrentMentalHealthTreatmentPlanStartErr"] = "Test";
    // }

    // if (CurrentMentalHealthTreatmentPlanStart) {
    //  formvalid = false;
    //  formErrors["CurrentMentalHealthTreatmentPlanStartErr"] =
    //    "test";
    //}

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
    //delete this.state.formErrors;
    delete this.state.formErrors;
    //delete this.state.disabled;
    if (this.handleProfileValidation() === true) {
      // call our updateClient function from authActions.js
      this.props.updateClient(this.state);
      alert("Updated Succesful.");
    }
  };

  render() {
    const {
      NameFirstErr,
      NameLastErr,
      emailErr,
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
      //ConsentErr,
    } = this.state.formErrors;
    //Registration form begins:
    return (
      <React.Fragment>
        <NavigationBarDash />
        <Jumbotron />
        <Container>
          <Form onSubmit={this.submitHandler}>
            <h1 className="htitle">Profile</h1>
            <br />
            <div className="form-container">
              {/*Personal Details */}
              <h5 className="htitle2">
                <b>Update Personal details</b>
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
                    disabled={true}
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
                    checked={this.state.GenderIdentity === "Female"}
                    onChange={this.changeHandler}
                  />
                  <Form.Check
                    inline
                    type="radio"
                    label="Male"
                    name="GenderIdentity"
                    value={"Male"}
                    checked={this.state.GenderIdentity === "Male"}
                    onChange={this.changeHandler}
                  />
                  <Form.Check
                    inline
                    type="radio"
                    label="Non-Binary"
                    name="GenderIdentity"
                    value={"Non-Binary"}
                    checked={this.state.GenderIdentity === "Non-Binary"}
                    onChange={this.changeHandler}
                  />
                  <Form.Check
                    inline
                    type="radio"
                    label="Prefer not to say"
                    name="GenderIdentity"
                    value={"Prefer not to say"}
                    checked={this.state.GenderIdentity === "Prefer not to say"}
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
                {ContactMethodErr && (
                  <p className="error">{ContactMethodErr}</p>
                )}
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
                    checked={this.state.ContactMethod === "Telephone"}
                    onChange={this.changeHandler}
                  />
                  <Form.Check
                    inline
                    type="radio"
                    label="Email"
                    name="ContactMethod"
                    value="Email"
                    checked={this.state.ContactMethod === "Email"}
                    onChange={this.changeHandler}
                  />
                  <Form.Check
                    inline
                    type="radio"
                    label="Text"
                    name="ContactMethod"
                    value="Text"
                    checked={this.state.ContactMethod === "Text"}
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
                &nbsp; &nbsp;
                <br />
                <br />
                {/* <Col sm={12}>
                  <Form.Check
                    inline
                    type="radio"
                    label="Yes"
                    name="CurrentMentalHealthTreatmentPlan"
                    value="Yes"
                    onClick={this.handleGameClik.bind(this)}
                    onChange={this.changeHandler}
                  />
                  <Form.Check
                    inline
                    type="radio"
                    label="No"
                    name="CurrentMentalHealthTreatmentPlan"
                    value="No"
                    onClick={this.handleGameClik.bind(this)}
                    onChange={this.changeHandler}
                  /> */}
                {/*  Confirm with Valerie on 'not sure' -- 27/12/2020 8:53pm Kemal and Luke
                  <Form.Check
                    inline
                    type="radio"
                    label="Not Sure"
                    name="OptionRadios"
                    id="NotSureRadio3"
                  />
                  */}
                {/* </Col> */}
                {/* {CurrentMentalHealthTreatmentPlanErr && (
                  <p className="error">{CurrentMentalHealthTreatmentPlanErr}</p>
                )} */}
                {/* MHTP start date -- IF USER CLICKS YES TO ABOVE, THEN THIS SHOULD GENERATE (NOT ALWAYS REQUIRED FIELD) */}
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
                    checked={this.state.Indigenous === "Yes"}
                    onChange={this.changeHandler}
                  />
                  <Form.Check
                    inline
                    type="radio"
                    label="No"
                    name="Indigenous"
                    value="No"
                    checked={this.state.Indigenous === "No"}
                    onChange={this.changeHandler}
                  />
                  <Form.Check
                    inline
                    type="radio"
                    label="Prefer not to say"
                    name="Indigenous"
                    value="Prefer not to say"
                    checked={this.state.Indigenous === "Prefer not to say"}
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
                    checked={this.state.Religious === "Yes"}
                    onChange={this.changeHandler}
                  />
                  <Form.Check
                    inline
                    type="radio"
                    label="No"
                    name="Religious"
                    value="No"
                    checked={this.state.Religious === "No"}
                    onChange={this.changeHandler}
                  />
                  <Form.Check
                    inline
                    type="radio"
                    label="Prefer not to say"
                    name="Religious"
                    value="Prefer not to say"
                    checked={this.state.Religious === "Prefer not to say"}
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
                    checked={
                      this.state.EmergencyContactRelationship === "Mother"
                    }
                    onChange={this.changeHandler}
                  />
                  <Form.Check
                    inline
                    type="radio"
                    label="Father"
                    name="EmergencyContactRelationship"
                    value="Father"
                    checked={
                      this.state.EmergencyContactRelationship === "Father"
                    }
                    onChange={this.changeHandler}
                  />
                  <Form.Check
                    inline
                    type="radio"
                    label="Brother"
                    name="EmergencyContactRelationship"
                    value="Brother"
                    checked={
                      this.state.EmergencyContactRelationship === "Brother"
                    }
                    onChange={this.changeHandler}
                  />
                  <Form.Check
                    inline
                    type="radio"
                    label="Sister"
                    name="EmergencyContactRelationship"
                    value="Sister"
                    checked={
                      this.state.EmergencyContactRelationship === "Sister"
                    }
                    onChange={this.changeHandler}
                  />
                  <Form.Check
                    inline
                    type="radio"
                    label="Partner"
                    name="EmergencyContactRelationship"
                    value="Partner"
                    checked={
                      this.state.EmergencyContactRelationship === "Partner"
                    }
                    onChange={this.changeHandler}
                  />
                  <Form.Check
                    inline
                    type="radio"
                    label="Wife"
                    name="EmergencyContactRelationship"
                    value="Wife"
                    checked={this.state.EmergencyContactRelationship === "Wife"}
                    onChange={this.changeHandler}
                  />
                  <Form.Check
                    inline
                    type="radio"
                    label="Husband"
                    name="EmergencyContactRelationship"
                    value="Husband"
                    checked={
                      this.state.EmergencyContactRelationship === "Husband"
                    }
                    onChange={this.changeHandler}
                  />
                  <Form.Check
                    inline
                    type="radio"
                    label="Son"
                    name="EmergencyContactRelationship"
                    value="Son"
                    checked={this.state.EmergencyContactRelationship === "Son"}
                    onChange={this.changeHandler}
                  />
                  <Form.Check
                    inline
                    type="radio"
                    label="Daughter"
                    name="EmergencyContactRelationship"
                    value="Daughter"
                    checked={
                      this.state.EmergencyContactRelationship === "Daughter"
                    }
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
                    checked={
                      this.state.EmergencyContactRelationship === "Cousin"
                    }
                    onChange={this.changeHandler}
                  />
                  <Form.Check
                    inline
                    type="radio"
                    label="Aunt"
                    name="EmergencyContactRelationship"
                    value="Aunt"
                    checked={this.state.EmergencyContactRelationship === "Aunt"}
                    onChange={this.changeHandler}
                  />
                  <Form.Check
                    inline
                    type="radio"
                    label="Uncle"
                    name="EmergencyContactRelationship"
                    value="Uncle"
                    checked={
                      this.state.EmergencyContactRelationship === "Uncle"
                    }
                    onChange={this.changeHandler}
                  />
                  <Form.Check
                    inline
                    type="radio"
                    label="Carer"
                    name="EmergencyContactRelationship"
                    value="Carer"
                    checked={
                      this.state.EmergencyContactRelationship === "Carer"
                    }
                    onChange={this.changeHandler}
                  />
                  <Form.Check
                    inline
                    type="radio"
                    label="Guardian"
                    name="EmergencyContactRelationship"
                    value="Guardian"
                    checked={
                      this.state.EmergencyContactRelationship === "Guardian"
                    }
                    onChange={this.changeHandler}
                  />
                  <Form.Check
                    inline
                    type="radio"
                    label="Power of Attorney"
                    name="EmergencyContactRelationship"
                    value="Power of Attorney"
                    checked={
                      this.state.EmergencyContactRelationship ===
                      "Power of Attorney"
                    }
                    onChange={this.changeHandler}
                  />
                </Col>
                {EmergencyContactRelationshipErr && (
                  <p className="error">{EmergencyContactRelationshipErr}</p>
                )}
              </Form.Group>
              <br />
              <Button
                type="submit"
                className="btn3"
                name="Consent"
                value="Yes"
                onChange={this.changeHandler}
              >
                Save Changes
              </Button>
              <br />
              <br />
              <Button
                className="btn3"
                name="Consent"
                value="Yes"
                href="/dashboard"
              >
                Cancel
              </Button>
            </div>
          </Form>
        </Container>
        <Footer />
      </React.Fragment>
    );
  }
}
Profile.propTypes = {
  updateClient: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, { updateClient })(withRouter(Profile));
