import React, { Component } from "react";
import axios from "axios";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../actions/authActions";
import classnames from "classnames";

class Register extends Component {
  constructor(props) {
    super(props);

    // this.onchangeUsername = this.onchangeUsername.bind(this);
    // this.onchangePassword = this.onchangePassword.bind(this);
    // this.onchangePassword2 = this.onchangePassword2.bind(this);
    // this.onchangeEmail = this.onchangeEmail.bind(this);
    this.onChange = this.onChange.bind(this);

    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      username: "",
      email: "",
      password: "",
      password2: "",
      role: "visitor",
      errors: {}
    };
  }

  componentDidMount() {
    // If logged in and user navigates to Register page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }
  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  // onchangeUsername(e) {
  //   this.setState({
  //     username: e.target.value
  //   });
  // }
  // onchangePassword(e) {
  //   this.setState({
  //     password: e.target.value
  //   });
  // }

  // onchangePassword2(e) {
  //   this.setState({
  //     password2: e.target.value
  //   });
  // }
  // onchangeEmail(e) {
  //   this.setState({
  //     email: e.target.value
  //   });
  // }

  onSubmit(e) {
    e.preventDefault();

    const user = {
      username: this.state.username,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2,
      role: this.state.role
    };

    console.log(user);

    // axios
    //   .post("http://localhost:3001/users/add", user)
    //   .then(res => console.log(res.data));
    this.props.registerUser(user, this.props.history);
    console.log(user);

    console.log("2!!!");
    //window.location = "/"; // go back to main page when finish
    this.setState({
      username: "",
      email: "",
      password: "",
      password2: ""
    });
  }

  render() {
    const { errors } = this.state; // same as : const errors = this.state.errors;

    return (
      <div>
        <h3>Register Page </h3>
        <p className="grey-text text-darken-1">
          Already have an account? <Link to="/login">Log in</Link>
        </p>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label> username:</label>
            <span className="red-text">{errors.username}</span>
            <input
              type="text"
              required
              className="form-control"
              value={this.state.username}
              onChange={this.onChange}
              error={errors.username}
              id="username"
              className={classnames("", {
                invalid: errors.username
              })}
            />
            <label> Email:</label>
            <span className="red-text">{errors.email}</span>

            <input
              type="email"
              required
              className="form-control"
              value={this.state.email}
              onChange={this.onChange}
              error={errors.email}
              id="email"
              className={classnames("", {
                invalid: errors.email
              })}
            />
            <label> password:</label>
            <span className="red-text">{errors.password}</span>
            <input
              type="password"
              required
              className="form-control"
              value={this.state.password}
              onChange={this.onChange}
              error={errors.password}
              id="password"
              className={classnames("", {
                invalid: errors.password
              })}
            />
            <label>repeat password:</label>
            <span className="red-text">{errors.password2}</span>

            <input
              type="password"
              required
              className="form-control"
              value={this.state.password2}
              onChange={this.onChange}
              error={errors.password2}
              id="password2"
              className={classnames("", {
                invalid: errors.password2
              })}
            />
          </div>
          <div className="form-group">
            <input type="submit" value="Sign Up" className="btn btn-primary" />
          </div>
        </form>
      </div>
    );
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});
export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(Register));
