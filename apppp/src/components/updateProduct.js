import React, { Component } from "react";
import axios from "axios";
import Checkbox from "./checkBox";

const OPTIONS = ["small", "medium", "large", "extraLarge"];

export default class UpdateProduct extends Component {
  constructor(props) {
    super(props);

    this.onchangeproductImage = this.onchangeproductImage.bind(this);
    this.onchangeDescription = this.onchangeDescription.bind(this);

    this.onchangeProductname = this.onchangeProductname.bind(this);
    this.onchangeCost = this.onchangeCost.bind(this);

    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      // checkboxes: OPTIONS.reduce(
      //   (options, option) => ({
      //     ...options,
      //     [option]: false,
      //   }),
      //   {}
      // ),
      checkboxes: [],
      product: null,
      productImage: null,
      description: "",
      productname: "",
      cost: 0,
      sizes: [],
    };
  }

  componentWillMount() {
    console.log(this.props.match.params.id);
    axios
      .get("http://localhost:3001/products/" + this.props.match.params.id)
      .then((response) => {
        console.log(response.data);
        this.setState({
          product: response.data,
          productImage: "../" + response.data.productImage,
          description: response.data.description,
          productname: response.data.productname,
          cost: response.data.cost,
        });

        response.data.sizes.forEach((element) => {
          this.setState((prevState) => ({
            checkboxes: {
              ...prevState.checkboxes,
              [element]: !prevState.checkboxes[element],
            },
          }));
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  componentDidMount() {
    console.log(this.state.productImage);
  }

  handleCheckboxChange = (changeEvent) => {
    const { name } = changeEvent.target;

    this.setState((prevState) => ({
      checkboxes: {
        ...prevState.checkboxes,
        [name]: !prevState.checkboxes[name],
      },
    }));
  };

  onchangeproductImage(e) {
    this.setState({
      productImage: e.target.files[0],
    });
  }
  onchangeDescription(e) {
    this.setState({
      description: e.target.value,
    });
  }

  onchangeProductname(e) {
    this.setState({
      productname: e.target.value,
    });
  }
  onchangeCost(e) {
    this.setState({
      cost: e.target.value,
    });
  }

  createCheckbox = (option) => (
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
      .filter((checkbox) => this.state.checkboxes[checkbox])
      .forEach((checkbox) => {
        // this.setState({ [this.state.sizes]: [...this.state.sizes, checkbox] });
        this.state.sizes = [...this.state.sizes, checkbox];

        // this.state.sizes.append(checkbox);
        console.log(checkbox, "is selected.");
      });

    console.log(this.state.sizes);

    const size = this.state.sizes;
    const fd = new FormData();
    console.log(this.state.productImage);
    // this.state.productImage.name
    //   ? fd.append(
    //       "productImage",
    //       this.state.productImage,
    //       this.state.productImage.name
    //     )
    //   : fd.append("productImage", this.state.product.productImage);
    fd.append(
      "productImage",
      this.state.productImage,
      this.state.productImage.name
    );
    fd.append("description", this.state.description);
    fd.append("productname", this.state.productname);
    fd.append("cost", this.state.cost);
    fd.append("sizes", size);

    console.log(fd);

    axios
      .post(
        "http://localhost:3001/products/update/" + this.props.match.params.id,
        fd
      )
      .then((res) => console.log(res));

    this.setState({
      productImage: "",
      description: "",
      productname: "",
      cost: 0,
    });
    window.location = "/"; // go back to main page when finish
  }

  render() {
    console.log(this.state.checkboxes);
    return (
      this.state.product && (
        <div>
          <h3>update Product </h3>
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
              <label> image:</label>
              <img
                className="updateProductImage"
                src={
                  this.state.productImage.name
                    ? "../uploads/" + this.state.productImage.name
                    : this.state.productImage
                }
                alt={this.state.productImage}
              ></img>

              {/* <button
                onClick={() => {
                  this.setState({ hide: !this.state.hide });
                }}
              >
                {"click! "}
              </button> */}
              <input
                required={!this.state.hide}
                type="file"
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
              <label> cost:</label>
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
                value="Edit Product"
                className="btn btn-success"
              />
            </div>
          </form>
        </div>
      )
    );
  }
}
