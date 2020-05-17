import React, { Component } from "react";
import { Dropdown, Button, DropdownButton, Table } from "react-bootstrap";

class CartItem extends Component {
  constructor(props) {
    super(props);

    this.onchangeAmount = this.onchangeAmount.bind(this);
    this.onchangeSize = this.onchangeSize.bind(this);

    this.state = {
      orderProd: null,
      size: "",
      amount: 1,
      cost: 0,
      totalCost: null,
    };
  }

  componentWillMount() {
    console.log(this.props.product.sizes);
    console.log(this.props.product.sizes[0]);
    this.props.product.sizes &&
      this.setState({
        size: this.props.product.sizes[0]
          ? this.props.product.sizes[0]
          : this.props.product.sizes[1],
        amount: this.props.product.amount ? this.props.product.amount : 1,
        orderProd: this.props.product,
        cost: this.props.product.cost,
        totalCost: this.props.product.totalCost
          ? this.props.product.totalCost
          : null,
      });
  }

  //   componentDidUpdate() {
  //     let prod = this.state.orderProd;
  //     prod.amount = this.state.amount;
  //     prod.size = this.state.size;
  //     console.log(prod);
  //     this.props.handleModifyProd(prod);
  //   }
  onchangeAmount(e) {
    this.setState({
      amount: e.target.value,
    });
    let sizeCalcCost = this.sizeCost(this.state.size);
    console.log(this.props.product.cost * sizeCalcCost * e.target.value);
    this.setState({
      totalCost: this.props.product.cost * sizeCalcCost * e.target.value,
    });
    this.props.handleModifyProd(
      "amount",
      e.target.value,
      this.state.orderProd._id
    );
    this.props.handleModifyProd(
      "totalCost",
      this.props.product.cost * sizeCalcCost * e.target.value,
      this.state.orderProd._id
    );
  }
  onchangeSize(size) {
    console.log(size);
    this.setState({
      size: size,
    });
  }
  sizes(sizeList) {
    console.log("size", sizeList);
    // console.log("size[0]", sizeList[0].split(","));
    return sizeList.map((size) => {
      return (
        size != "" && (
          <Dropdown.Item
            key={sizeList.indexOf(size)}
            onClick={() => {
              this.onchangeSize(size);
              // this.props.ChooseSize(size);
              let sizeCalcCost = this.sizeCost(size);
              this.setState({
                totalCost:
                  this.props.product.cost * sizeCalcCost * this.state.amount,
              });
              this.props.handleModifyProd(
                "size",
                size,
                this.state.orderProd._id
              );
              this.props.handleModifyProd(
                "totalCost",
                this.props.product.cost * sizeCalcCost * this.state.amount,
                this.state.orderProd._id
              );
            }}
          >
            {size}
          </Dropdown.Item>
        )
      );
    });
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

  render() {
    console.log(this.props);
    return (
      <tr>
        <td className="productOrder">
          <img
            style={{ margin: "10px" }}
            width="30px"
            src={this.props.product.productImage}
          />
          <div className="orderTable">{this.props.product.productname}</div>
        </td>

        <td> {this.props.product.description}</td>
        <td>
          <DropdownButton
            variant="light"
            id="dropdown-basic-button"
            title={this.state.size}
          >
            {this.sizes(this.props.product.sizes)}
          </DropdownButton>
        </td>
        <td>
          <input
            style={{ width: "40%" }}
            type="number"
            min="1"
            max="5"
            value={this.state.amount}
            onChange={this.onchangeAmount}
          />
        </td>
        <td>
          <div>
            {this.state.totalCost === null
              ? this.props.product.cost *
                this.sizeCost(this.state.size) *
                this.state.amount
              : this.state.totalCost}
          </div>

          {/* {this.onchangeCostSize(prod.cost)} */}
        </td>
      </tr>
    );
  }
}

export default CartItem;
