import React, { Component } from "react";
import axios from "axios";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../actions/authActions";
import { Dropdown, Button, DropdownButton, Table } from "react-bootstrap";
import CartItem from "./cartItem";
import Modal from "react-bootstrap/Modal";

// import Table from "react-bootstrap/Table";

class OrderBox extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.handleModifyProd = this.handleModifyProd.bind(this);

    //  console.log(this.props);

    this.state = {
      order: [],
      productsList: [],
      totalCost: 0,
      ModalShow: false,
      status: ""
    };
  }

  componentWillMount() {
    console.log(this.props.auth);
    axios
      .get("http://localhost:3001/order/" + this.props.auth.user.id)
      .then(response => {
        console.log(response);
        let tempCost = 0;
        response.data[response.data.length - 1] &&
          response.data[response.data.length - 1].productsList.forEach(prod => {
            tempCost = tempCost + prod.cost * prod.amount;
          });

        this.setState({
          order: response.data[response.data.length - 1],
          productsList: response.data[response.data.length - 1].productsList,
          totalCost: tempCost,
          status: response.data[response.data.length - 1].status
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  componentWillUnmount() {
    const order = {
      userEmail: this.props.auth ? this.props.auth.user.id : null,
      productsList: this.state.productsList,
      cost: this.state.totalCost,
      status: this.state.status
    };
    this.state.productsList.length > 0 &&
      this.state.status != "done" &&
      axios
        .post(
          "http://localhost:3001/order/update/" + this.state.order._id,
          order
        )
        .then(res => console.log(res));
  }

  handleClose = () => {
    this.setState({
      ModalShow: false
    });
    window.location = "/";
  };

  handleModifyProd(prop, val, id) {
    // modify chosen size and amount in specific product
    console.log(prop + "  " + id);
    let index = this.state.productsList.findIndex(obj => obj._id === id);
    this.state.productsList[index][prop] = val;

    console.log(this.state.productsList[index]);

    let Total = 0;
    this.state.productsList.forEach(prod => {
      console.log(prod["totalCost"]);
      Total += prod["totalCost"] ? prod["totalCost"] : prod.cost * prod.amount;
      console.log(Total);
    });
    this.setState({ totalCost: Total });
    console.log(Total);
  }

  sizeCost(size) {
    let cost = 1;

    switch (size) {
      case "small":
        cost = 1;
        break;
      case "medium":
        cost = 1.5;
        break;
      case "large":
        cost = 2;
        break;
      case "extraLarge":
        cost = 2.5;
        break;
      default:
        cost = 1;
        break;
    }
    return cost;
  }

  onSubmit() {
    const order = {
      userEmail: this.props.auth ? this.props.auth.user.id : null,
      productsList: this.state.productsList,
      cost: this.state.totalCost,
      status: "done"
    };

    console.log(order);
    console.log(this.state.order._id);
    this.state.productsList.length > 0 &&
      axios
        .post(
          "http://localhost:3001/order/update/" + this.state.order._id,
          order
        )
        .then(res => console.log(res));

    this.setState({
      ModalShow: true,
      status: "done"
    });
  }

  productsList() {
    console.log(this.state.productsList);

    return this.state.productsList ? (
      this.state.productsList.map(prod => {
        return (
          <CartItem
            key={prod._id}
            product={prod}
            handleModifyProd={this.handleModifyProd}
          />
        );
      })
    ) : (
      <tr>
        <td>no products to display yet</td>
      </tr>
    );
  }

  render() {
    console.log("in orderbox");
    console.log(this.state.order);

    return (
      // <div>
      //   <h3> products </h3>
      //   {this.productsList()}
      // </div>

      // style={{ width: "70%" }}
      <div>
        <Table responsive="md">
          <thead style={{ color: "crimson" }}>
            <tr>
              <th>My Shopping Cart</th>
              <th>Description</th>
              <th>Size</th>
              <th>Amount</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {this.productsList()}

            <tr>
              <td>
                <br /> Total: {this.state.totalCost}
              </td>
            </tr>
          </tbody>
        </Table>
        <Button
          variant="warning"
          onClick={() => {
            this.onSubmit();
          }}
        >
          Order>>
        </Button>

        <Modal show={this.state.ModalShow} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Order recieved {this.state.status}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            thank you for buying here, hope you enjoyed :) your order is in
            progress and will be ready shortly
          </Modal.Body>
          <Modal.Footer>
            <Button variant="warning" onClick={this.handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

OrderBox.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(mapStateToProps, { logoutUser })(OrderBox);
