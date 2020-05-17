import React, { Component } from "react";
import { Card, Button, Container, Row, Col } from "react-bootstrap";
import ItemCard from "./cards";
import { CardSubtitle } from "react-bootstrap/Card";

class Tries extends Component {
  state = {};
  render() {
    return (
      <div>
        <div className="head-line" />

        <Container>
          <Row>
            <Col md={4}>
              <ItemCard />
            </Col>
            <Col md={{ span: 4, offset: 4 }}>
              <ItemCard />
            </Col>
          </Row>
          <Row>
            <Col md={{ span: 3, offset: 3 }}>
              <ItemCard />
            </Col>
            <Col md={{ span: 3, offset: 3 }}>
              <ItemCard />
            </Col>
          </Row>
          <Row>
            <Col md={{ span: 6, offset: 3 }}>
              <ItemCard />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Tries;
