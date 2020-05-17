import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../actions/authActions";
import { logoutUser } from "../actions/authActions";
import classnames from "classnames";

class Login extends Component {
  constructor(props) {
    super(props);

    this.onchangeEmail = this.onchangeEmail.bind(this);
    this.onchangePassword = this.onchangePassword.bind(this);
    // this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      email: "",
      password: "",

      errors: {}
    };
  }

  onchangeEmail(e) {
    this.setState({
      email: e.target.value
    });
  }
  onchangePassword(e) {
    this.setState({
      password: e.target.value
    });
  }
  componentDidMount() {
    // If logged in and user navigates to Login page, should logout them
    if (this.props.auth.isAuthenticated) {
      this.props.logoutUser();
      // this.props.history.push("/dashboard");
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }

    console.log(nextProps.auth.isAuthenticated);
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/"); // push user to dashboard when they login
    }
    console.log(nextProps.auth.isAuthenticated);
  }

  // onChange = e => {
  //   this.setState({ [e.target.id]: e.target.value });
  // };

  onSubmit(e) {
    e.preventDefault();

    const user = {
      email: this.state.email,
      password: this.state.password
    };
    console.log("user:");
    console.log(user);

    // axios
    //   .post("http://localhost:3001/users/login", user)
    //   .then(res => console.log("maayan @@@@!!!!! " + res.data));

    this.props.loginUser(user); // since we handle the redirect within our component, we don't need to pass in this.props.history as a parameter

    console.log(user);
    //window.location = "/"; // go back to main page when finish
    // this.setState({
    //   email: "",
    //   password: ""
    // });
  }

  render() {
    const { errors } = this.state; // same as : const errors = this.state.errors;

    return (
      <div>
        <h3>Login page</h3>
        <p className="grey-text text-darken-1">
          Don't have an account? <Link to="/register">Register</Link>
        </p>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label> email:</label>
            <span className="red-text">
              {errors.email}
              {errors.emailnotfound}
            </span>
            <input
              type="email"
              required
              className="form-control"
              value={this.state.email}
              id="email"
              onChange={this.onchangeEmail}
              error={errors.email}
              className={classnames("", {
                invalid: errors.email || errors.emailnotfound
              })}
            />
            <label> password:</label>
            <span className="red-text">
              {errors.password}
              {errors.passwordincorrect}
            </span>
            <input
              type="password"
              required
              className="form-control"
              value={this.state.password}
              id="password"
              onChange={this.onchangePassword}
              error={errors.password}
              className={classnames("", {
                invalid: errors.password || errors.passwordincorrect
              })}
            />
          </div>
          <div className="form-group">
            <input type="submit" value="login" className="btn btn-primary" />
          </div>
        </form>
        <p className="grey-text text-darken-1">
          forgot your password?? <Link to="/passwordRecover">Recover</Link>
        </p>
      </div>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});
export default connect(mapStateToProps, { loginUser, logoutUser })(Login);
