import React, { Component } from "react";
import HeadLine from "./header";
//import Tries from "./tries";
import ProductList from "./ProductsList";
import axios from "axios";
import ProductInfo from "./productInfo";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../actions/authActions";
import Can from "./can";

class Structure extends Component {
  constructor(props) {
    super(props);
    this.handleAddToCart = this.handleAddToCart.bind(this);
    this.handleClick = this.handleClick.bind(this);

    this.state = { orderNumber: null, user: null, cart: [], products: [] };
  }
  componentDidMount() {
    console.log(this.state.cart);
  }
  componentWillMount() {
    axios
      .get("http://localhost:3001/products/")
      .then(response => {
        this.setState({ products: response.data });
      })
      .catch(error => {
        console.log(error);
      });

    axios
      .get("http://localhost:3001/order/" + this.props.auth.user.id)
      .then(response => {
        console.log(response.data);
        console.log(
          response.data[response.data.length - 1] &&
            response.data[response.data.length - 1].productsList
        );
        // this.setState({
        //   cart: [
        //     ...this.state.cart,
        //     response.data[response.data.length - 1].productsList
        //   ]
        // });
        response.data[response.data.length - 1] &&
          this.setState({
            cart: response.data[response.data.length - 1].productsList,
            orderNumber: response.data[response.data.length - 1]._id
          }); //get list of products from last inProgress order, to continue order.
        //console.log(response.data[response.data.length - 1].productsList);
      })
      .catch(error => {
        console.log(error);
      });
  }
  componentDidMount() {
    console.log(this.state.cart);
  }

  componentDidUpdate() {
    console.log(this.state.cart);

    // return (
    //   <ProductList
    //     cart={this.state.cart}
    //     products={this.state.products}
    //     handleAddToCart={this.handleAddToCart}
    //   />
    // );
  }
  handleAddToCart(cart, user) {
    //this.setState({ cart: [...this.state.cart, cart], user: user });
    this.setState({ cart: cart, user: user });
    console.log("cart: ", cart);
    console.log("user: ", user);
    // return <OrderBox cart={cart} user={user}></OrderBox>;
  }

  handleClick() {
    console.log("in click!");

    if (this.state.cart.length > 0) {
      let totalCost = 0;
      let CartProds = this.state.cart.map(prod => {
        return {
          ...prod,
          amount: prod.amount && prod.amount != 1 ? prod.amount : 1,
          size: prod.size ? prod.size : prod.sizes ? prod.sizes[0] : undefined,
          totalCost: prod.cost
        };
      });

      this.state.cart.forEach(element => {
        totalCost += element.cost;
      });
      const order = {
        userEmail: this.state.user ? this.state.user.user.id : null,
        productsList: CartProds,
        cost: totalCost,
        status: "new"
      };

      console.log(order);

      this.state.orderNumber
        ? axios
            .post(
              "http://localhost:3001/order/update/" + this.state.orderNumber,
              order
            )
            .then(res => console.log(res.data))
        : axios
            .post("http://localhost:3001/order/add", order)
            .then(res => console.log(res.data));
    }
    window.location = "/orderBox"; // go back to main page when finish
  } //orderBox

  render() {
    console.log("cart:::: ", this.state.cart);
    console.log("user", this.props.auth.user.role);

    return (
      this.state.products.length > 0 && (
        <div>
          <Can
            role={this.props.auth.user.role}
            perform="product:addToCart"
            yes={() => (
              <div className="roundedCartButton">
                <button
                  className="cartButton"
                  type="button"
                  onClick={this.handleClick}
                >
                  <img
                    width="40px"
                    src={
                      this.state.cart && this.state.cart.length > 0
                        ? require("../images/shopping-cart-full.png")
                        : require("../images/shopping-cart-empty.png")
                    }
                  />
                  <div className="cartButtonSum">
                    {this.state.cart && this.state.cart.length}
                  </div>
                </button>
                {/* <a target="_blank" href="https://icons8.com/icons/set/shopping-cart-with-money">Shopping Cart With Money icon</a> icon by <a target="_blank" href="https://icons8.com">Icons8</a> */}
              </div>
            )}
          />
          <HeadLine products={this.state.products} />
          <div className="container">
            <ProductList
              cart={this.state.cart}
              products={this.state.products}
              handleAddToCart={this.handleAddToCart}
            />
          </div>
        </div>
      )
    );
  }
}

Structure.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(mapStateToProps, { logoutUser })(Structure);
