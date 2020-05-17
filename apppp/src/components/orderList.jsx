import React, { Component } from "react";
import axios from "axios";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../actions/authActions";
import { Accordion, Card } from "react-bootstrap";
import { Dropdown, Button, DropdownButton, Table } from "react-bootstrap";
import OrderItem from "./orderItem";
import Modal from "react-bootstrap/Modal";

// import Table from "react-bootstrap/Table";

class OrderList extends Component {
  constructor(props) {
    super(props);

    this.orderList = this.orderList.bind(this);

    this.state = {
      orders: [],
    };
  }

  componentWillMount() {
    console.log(this.props.auth);
    axios
      .get("http://localhost:3001/order/allOrders/" + this.props.auth.user.id)
      .then((response) => {
        console.log(response);

        this.setState({
          orders: response.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  orderList() {
    return this.state.orders.map((order) => {
      console.log(order);
      return (
        <div key={order._id}>
          <Card>
            <Accordion.Toggle as={Card.Header} eventKey={order._id}>
              <table>
                <tbody>
                  <tr>
                    <th>Created At: {Date(order.createdAt)}</th>
                    <th>Products: {order.productsList.length}</th>
                    <th>Total cost: {order.cost}</th>
                    <th>Status: {order.status}</th>
                  </tr>
                </tbody>
              </table>
            </Accordion.Toggle>
            <Accordion.Collapse eventKey={order._id}>
              <Card.Body>
                <table>
                  <thead style={{ color: "crimson" }}>
                    <tr>
                      <th>Product Name</th>
                      <th>Description</th>
                      <th>Unit Price</th>
                      <th>Amount</th>
                      <th>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {order.productsList.map((prod) => {
                      return (
                        <OrderItem
                          key={prod.id}
                          item={prod}
                          calcTotalPrice={this.calcTotalPrice}
                        />
                      );
                    })}
                  </tbody>
                </table>
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        </div>
      );
    });
  }

  render() {
    return (
      <div className="accordionStyle">
        <h2>History:</h2>
        <Accordion>
          {this.orderList()}
          {/* <Card>
            <Accordion.Toggle as={Card.Header} eventKey="1">
              Click me!
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="1">
              <Card.Body>Hello! I'm another body</Card.Body>
            </Accordion.Collapse>
          </Card> */}
        </Accordion>
      </div>
    );
  }
}

OrderList.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, { logoutUser })(OrderList);
