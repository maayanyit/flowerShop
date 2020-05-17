import React, { Component } from "react";
import axios from "axios";

export default class CreateUser extends Component {
  constructor(props) {
    super(props);

    this.onchangeUsername = this.onchangeUsername.bind(this);
    this.onchangePassword = this.onchangePassword.bind(this);

    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      username: "",
      password: ""
    };
  }

  onchangeUsername(e) {
    this.setState({
      username: e.target.value
    });
  }
  onchangePassword(e) {
    this.setState({
      password: e.target.value
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const user = {
      username: this.state.username,
      password: this.state.password
    };

    console.log(user);

    axios
      .post("http://localhost:3001/users/add", user)
      .then(res => console.log(res.data));

    //window.location = "/"; // go back to main page when finish
    this.setState({
      username: "",
      password: ""
    });
  }

  render() {
    return (
      <div>
        <h3>Create New User </h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label> username:</label>
            <input
              type="text"
              required
              className="form-control"
              value={this.state.username}
              onChange={this.onchangeUsername}
            />
            <label> password:</label>
            <input
              type="text"
              required
              className="form-control"
              value={this.state.password}
              onChange={this.onchangePassword}
            />
          </div>
          <div className="form-group">
            <input
              type="submit"
              value="Create User"
              className="btn btn-primary"
            />
          </div>
        </form>
      </div>
    );
  }
}
