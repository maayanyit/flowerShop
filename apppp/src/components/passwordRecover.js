import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { recoverUserPassword } from "../actions/authActions";
import classnames from "classnames";

class passwordRecover extends Component {
  constructor(props) {
    super(props);

    // this.onchangeEmail = this.onchangeEmail.bind(this);
    // this.onchangePassword = this.onchangePassword.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      email: "",
      password: "",

      errors: {}
    };
  }

  //   onchangeEmail(e) {
  //     this.setState({
  //       email: e.target.value
  //     });
  //   }
  //   onchangePassword(e) {
  //     this.setState({
  //       password: e.target.value
  //     });
  //   }

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

  onSubmit(e) {
    e.preventDefault();

    const user = {
      email: this.state.email,
      password: this.state.password
    };
    console.log("user:");
    console.log(user);

    this.props.recoverUserPassword(user, this.props.history); // since we handle the redirect within our component, we don't need to pass in this.props.history as a parameter

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
        <h3>recover password page</h3>

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
              onChange={this.onChange}
              error={errors.email}
              className={classnames("", {
                invalid: errors.email || errors.emailnotfound
              })}
            />
            <label>new password:</label>
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
              onChange={this.onChange}
              error={errors.password}
              className={classnames("", {
                invalid: errors.password || errors.passwordincorrect
              })}
            />
          </div>
          <div className="form-group">
            <input
              type="submit"
              value="change password"
              className="btn btn-primary"
            />
          </div>
        </form>
      </div>
    );
  }
}

passwordRecover.propTypes = {
  recoverUserPassword: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});
export default connect(
  mapStateToProps,
  { recoverUserPassword }
)(passwordRecover);
