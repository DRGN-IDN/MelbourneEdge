import React, { Component } from "react";
import "../../MEdge.css";
import { Container, Col, Row } from "react-bootstrap";
import Table from "react-bootstrap/Table";

import NavigationBarDash from "../../components/NavigationBarDash";
import Jumbotron from "../../components/Jumbotron";
import Footer from "../../components/Footer";
import axios from "axios";

//CHANGELOG:
// ACHMAD MUSTAFA KEMAL : 24/01/2021  Create list of Client page for admin

class adminListClients extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
    };
  }

  componentDidMount() {
    axios
      .get("/api/admin/getClients")
      .then((response) => {
        console.log(response);
        this.setState({ posts: response.data.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  render() {
    const { posts } = this.state;
    return (
      <React.Fragment>
        <NavigationBarDash />
        <Jumbotron />
        <Container fluid>
          <h1 className="htitle">List of Client</h1>
          <br />
          <div className="form-container">
            <Table striped bordered hover variant="dark" responsive="md">
              <thead>
                <tr>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Email Address</th>
                  <th>Phone Number</th>
                </tr>
              </thead>
              {posts && posts.length
                ? posts.map((post) => (
                    <tbody key={post._id}>
                      <td>{post.NameFirst}</td>
                      <td>{post.NameLast}</td>
                      <td>{post.Email}</td>
                      <td>{post.PhoneMobile}</td>
                    </tbody>
                  ))
                : null}
            </Table>
            <br />
            <br />
            <Row>
              <Col sm="4"></Col>
              <Col sm="4"></Col>
              <Col sm="4"></Col>
            </Row>
          </div>
        </Container>
        <Footer />
      </React.Fragment>
    );
  }
}

export default adminListClients;
