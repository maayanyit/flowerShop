import React, { Component } from "react";
import { Card, Button } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import Can from "./can";

class ItemCard extends Component {
  // handleClick(prod) {
  //   this.props.history.push("/productInfo/" + prod._id);
  // }
  state = { clicked: true, ModalShow: false };

  componentWillMount() {
    this.setState({ clicked: !this.props.inCart });
  }
  handleDeleteClick = () => {
    this.setState({
      ModalShow: true
    });
  };
  handleClose = () =>
    this.setState({
      ModalShow: false
    });

  render() {
    const product = this.props.product;

    console.log(this.props.auth);
    return (
      <div>
        <span id="card">
          <Card id="card" style={{ width: "18rem", color: "crimson" }}>
            <Card.Img variant="top" src={product.productImage} />

            <div className="product-list-itemHover">
              {/* <Button
              //variant="primary"
              onClick={this.props.handleClick.bind(this, product)}
            >
              more details
            </Button> */}

              <Can
                role={this.props.auth.user.role}
                perform="product:addToCart"
                yes={() => (
                  <Button
                    variant={this.state.clicked ? "success" : "secondary"}
                    onClick={() => {
                      this.props.handleClick(product);
                      this.setState({ clicked: !this.state.clicked });
                    }}
                  >
                    {this.state.clicked ? "add to cart" : "remove from cart"}
                  </Button>
                )}
              />
              <div className="cardButtons">
                <Can
                  role={this.props.auth.user.role}
                  perform="product:edit"
                  yes={() => (
                    <div className="cardButton">
                      <Button
                        variant="warning"
                        onClick={() => {
                          this.props.handleEditClick(product);
                        }}
                      >
                        {"edit"}
                      </Button>
                    </div>
                  )}
                />

                <Can
                  role={this.props.auth.user.role}
                  perform="product:delete"
                  yes={() => (
                    <div className="cardButton">
                      <Button
                        variant="danger"
                        onClick={() => {
                          this.handleDeleteClick();
                        }}
                      >
                        {"delete"}
                      </Button>
                    </div>
                  )}
                />
              </div>

              <Card.Text>{product.description}</Card.Text>
            </div>

            <Card.Body>
              <Card.Title>{product.productname}</Card.Title>

              <Card.Text>{product.cost}</Card.Text>
            </Card.Body>
          </Card>
        </span>
        <Modal show={this.state.ModalShow} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>are you sure you want to delete this item?</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Close
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                this.props.handleDeleteClick(product._id);
                this.handleClose();
              }}
            >
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
      </div>

      //     <div className="BookItem">
      //     <div className="BookItem__img"
      //         style={{
      //             backgroundImage: `url($\{book.image\})`,
      //             width: '800px',
      //             height: 300,
      //             backgroundSize: 'contain',
      //             backgroundRepeat: 'no-repeat',
      //             backgroundPosition: 'top left'
      //         }}
      //     >
      //         <img
      //             src={book.image}
      //             alt="Book Item"
      //         />
      //     </div>
      //     <div className="BookItem__details">
      //         <div className="BookItem__cat">
      //             {book.category}
      //         </div>
      //         <h4>{book.title}</h4>
      //         <h5>{book.author}</h5>
      //         <div className="BookItem__price-cart">
      //             <p>${book.price}</p>
      //             <button
      //                 onClick={this.props.handleClick.bind(this, book)}
      //             ><span className="fa fa-cart-plus"></span> Buy</button>
      //         </div>
      //         <div className="BootItem__description">
      //             {book.description}
      //         </div>
      //         <div className="BookItem__stock" style=\{{color: book.inStock >= 5 ? '#417505' : '#CE0814'\}}>
      //             {book.inStock} In Stock
      //         </div>
      //     </div>
      // </div>
    );
  }
}

export default withRouter(ItemCard);
