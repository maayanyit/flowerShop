import React, { Component } from "react";
import axios from "axios";
import Checkbox from "./checkBox";

const OPTIONS = ["small", "medium", "large", "extraLarge"];

export default class CreateProduct extends Component {
  constructor(props) {
    super(props);

    this.onchangeproductImage = this.onchangeproductImage.bind(this);
    this.onchangeDescription = this.onchangeDescription.bind(this);

    this.onchangeProductname = this.onchangeProductname.bind(this);
    this.onchangeCost = this.onchangeCost.bind(this);

    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      checkboxes: OPTIONS.reduce(
        (options, option) => ({
          ...options,
          [option]: false
        }),
        {}
      ),
      productImage: null,
      description: "",
      productname: "",
      cost: 0,
      sizes: []
    };
  }

  handleCheckboxChange = changeEvent => {
    const { name } = changeEvent.target;

    this.setState(prevState => ({
      checkboxes: {
        ...prevState.checkboxes,
        [name]: !prevState.checkboxes[name]
      }
    }));
  };

  onchangeproductImage(e) {
    this.setState({
      productImage: e.target.files[0]
    });
  }
  onchangeDescription(e) {
    this.setState({
      description: e.target.value
    });
  }

  onchangeProductname(e) {
    this.setState({
      productname: e.target.value
    });
  }
  onchangeCost(e) {
    this.setState({
      cost: e.target.value
    });
  }
  onchangeSize(e) {
    this.setState({
      sizes: this.state.sizes.append(e.target.value)
    });
  }

  createCheckbox = option => (
    <Checkbox
      label={option}
      isSelected={this.state.checkboxes[option]}
      onCheckboxChange={this.handleCheckboxChange}
      key={option}
    />
  );
  createCheckboxes = () => OPTIONS.map(this.createCheckbox);

  onSubmit(e) {
    e.preventDefault();

    Object.keys(this.state.checkboxes)
      .filter(checkbox => this.state.checkboxes[checkbox])
      .forEach(checkbox => {
        this.state.sizes = [...this.state.sizes, checkbox];

        // this.state.sizes.append(checkbox);
        console.log(checkbox, "is selected.");
      });
    console.log(this.state.sizes);

    // const size = JSON.stringify(this.state.sizes);
    const size = this.state.sizes;
    const fd = new FormData();
    fd.append(
      "productImage",
      this.state.productImage,
      this.state.productImage.name
    );
    // productImage: this.state.productImage,
    fd.append("description", this.state.description);
    fd.append("productname", this.state.productname);
    fd.append("cost", this.state.cost);
    fd.append("sizes", size);

    console.log(size);

    axios
      .post("http://localhost:3001/products/add", fd)
      .then(res => console.log(res));

    //window.location = "/"; // go back to main page when finish
    this.setState({
      productImage: "",
      description: "",
      productname: "",
      cost: 0
    });
  }

  render() {
    return (
      <div>
        <h3>Add New Product </h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label> name:</label>
            <input
              type="text"
              required
              className="form-control"
              value={this.state.productname}
              onChange={this.onchangeProductname}
            />
            <label> image Url:</label>
            <input
              type="file"
              required
              className="form-control"
              onChange={this.onchangeproductImage}
            />
            <label> description:</label>
            <input
              type="text"
              required
              className="form-control"
              value={this.state.description}
              onChange={this.onchangeDescription}
            />
            <label> minimum cost:</label>
            <input
              type="text"
              required
              className="form-control"
              value={this.state.cost}
              onChange={this.onchangeCost}
            />

            <label> choose optional sizes:</label>
            {this.createCheckboxes()}
          </div>
          <div className="form-group">
            <input
              type="submit"
              value="Add Product"
              className="btn btn-success"
            />
          </div>
        </form>
      </div>
    );
  }
}
