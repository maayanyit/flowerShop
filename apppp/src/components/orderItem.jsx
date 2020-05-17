import React, { Component } from "react";

class OrderItem extends Component {
  state = { totalCost: 0 };

  componentWillMount() {
    this.setState({
      totalCost: this.props.item.cost * this.props.item.amount
    });
  }

  render() {
    return (
      <tr>
        <td>
          <div>{this.props.item.productname}</div>
        </td>

        <td>
          <div>{this.props.item.description}</div>
        </td>
        <td>
          <div>{this.props.item.cost}</div>
        </td>

        <td>
          <div>{this.props.item.amount}</div>
        </td>
        <td>
          <div>{this.state.totalCost}</div>
        </td>
      </tr>
    );
  }
}

export default OrderItem;
