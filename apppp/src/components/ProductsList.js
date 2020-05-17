import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Card, Button } from "react-bootstrap";
import ItemCard from "./cards";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../actions/authActions";
import Can from "./can";
// const ItemCard = props => (
//   <Card style={{ width: "18rem" }}>
//     <Card.Img variant="top" src={props.product.productImage} />
//     <Card.Body>
//       <Card.Title>{props.product.productname}</Card.Title>
//       <Card.Text>{props.product.description}</Card.Text>
//       <Card.Text>{props.product.cost}</Card.Text>
//       <Button variant="primary">Add</Button>
//     </Card.Body>
//   </Card>
// );

class ProductsList extends Component {
  constructor(props) {
    super(props);
    this.deleteProduct = this.deleteProduct.bind(this);
    // this.handleClick = this.handleClick.bind(this);

    this.handleAddToCart = this.handleAddToCart.bind(this);
    this.handleEditClick = this.handleEditClick.bind(this);

    this.state = { products: [], cart: [] };
  }

  componentWillMount() {
    //  console.log("products:", this.props.products);

    this.setState({ products: this.props.products, cart: this.props.cart });
    console.log(this.props.cart);
  }
  componentDidUpdate() {
    this.props.handleAddToCart(this.state.cart, this.props.auth);
  }

  deleteProduct(id) {
    console.log("delete!!!!!!" + id);
    axios
      .delete("http://localhost:3001/products/" + id)
      .then(res => console.log(res.data));

    this.setState({
      products: this.state.products.filter(prod => prod._id !== id)
    });
  }
  handleEditClick(prod) {
    console.log(prod._id);
    window.location = "/updateProduct/" + prod._id;
  }
  handleAddToCart(prod) {
    console.log(prod._id);
    const cartItem = this.state.cart.find(x => x._id === prod._id);
    !cartItem > 0 //if item is not in cart, then add it. else remove it from cart.
      ? this.setState({ cart: [...this.state.cart, prod] })
      : this.setState({
          cart: this.state.cart.filter(x => x._id !== prod._id)
        });
    //this.props.handleAddToCart(this.state.cart, this.props.auth);
    console.log(this.state.cart);
    console.log(this.props.auth);
  } //&& book.inStock
  // handleClick(prod) {
  //   this.props.handleAddToCart(prod);
  // }
  productsList() {
    console.log("products:", this.state.products);
    console.log("cart in list:::", this.state.cart);
    return (
      this.state.products &&
      this.state.products.map(prod => {
        return (
          <div key={prod._id} className="product-list-item">
            <ItemCard
              handleClick={this.handleAddToCart}
              handleEditClick={this.handleEditClick}
              handleDeleteClick={this.deleteProduct}
              product={prod}
              inCart={
                this.state.cart && this.state.cart.find(x => x._id === prod._id)
              }
              auth={this.props.auth}
            />
          </div>
        );
      })
    );
  }

  render() {
    return (
      <div>
        <h3> products </h3>
        <div className="product-list">{this.productsList()}</div>
      </div>
    );
  }
}

ProductsList.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(mapStateToProps, { logoutUser })(ProductsList);
