import React, { Component } from "react";
import NavigationBar from "./navBar";
import "../index.css";
import { Carousel, Card, Button } from "react-bootstrap";
import "../images/flowers.jpg";
//import "../images";
class HeadLine extends Component {
  constructor(props) {
    super(props);
    // this.handleClick = this.handleClick.bind(this);

    this.state = { products: [] };
  }

  componentWillMount() {
    //  console.log("products:", this.props.products);

    this.setState({ products: this.props.products });
  }

  getCarouselItems(products) {
    let prods = [];
    const numItems = products.length;
    for (let i = 5; i > 0 && i < numItems; i--) {
      prods.push(
        <Carousel.Item key={products[numItems - i]._id}>
          <div className="carouselImg">
            <img
              className="d-block w-100"
              width={500}
              height={300}
              src={products[numItems - i].productImage}
              alt={products[numItems - i].productname}
            />
          </div>
          <div className="carouselText">
            <Carousel.Caption style={{ color: "#343a40" }}>
              <h3>{products[numItems - i].productname}</h3>
              <p>{products[numItems - i].description}</p>
            </Carousel.Caption>
          </div>
        </Carousel.Item>
      );
    }
    return prods;
  }

  render() {
    console.log("products:", this.state.products);
    return (
      <div className="carouselBorder">
        <Carousel>{this.getCarouselItems(this.state.products)}</Carousel>
      </div>
    );
  }
}

export default HeadLine;
