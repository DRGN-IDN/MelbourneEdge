import React, { Component } from "react";
import { Nav, Navbar } from "react-bootstrap";
import { Container } from "react-bootstrap";
import PropTypes from "prop-types";
import "../MEdge.css";
import styled from "styled-components";
import { connect } from "react-redux";
import { logout } from "../actions/authActions";

//CHANGELOG:
// PHUONG DANG 220436263 27/12/2020 || creating a navbar for dashboard
// LUKE SCIBERRAS 213085878 29/01/2021 || REMOVED UNUSUED VARIABLES AND IMPORTS.

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

class NavigationBarDash extends Component {
  onLogoutClick = (e) => {
    e.preventDefault();
    this.props.logout();
  };

  render() {
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
                {/* NAVIGATION LINKS */}
                <Nav.Item>
                  <Nav.Link href="/dashboard">Dashboard</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link href="/profile">Profile</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link onClick={this.onLogoutClick}>Log out</Nav.Link>
                </Nav.Item>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        </Container>
      </Styles>
    );
  }
}

NavigationBarDash.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(NavigationBarDash);
