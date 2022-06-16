import React from "react";
import { Jumbotron as Jumbo, Container } from "react-bootstrap";
import "../MEdge.css";

//CHANGELOG:
// ACHMAD MUSTAFA KEMAL 219374683 25/12/2020 8:30 - 11:30PM || creating a jumbotron for a register form with using react-bootstrap dependency

function Jumbotron() {
  return (
    <Container fluid>
      <Jumbo fluid className="jumbotron" />
    </Container>
  );
}

export default Jumbotron;
