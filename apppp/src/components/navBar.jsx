import React, { Component } from "react";
import {
  Navbar,
  NavDropdown,
  Nav,
  Form,
  FormControl,
  Button,
} from "react-bootstrap";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../actions/authActions";

import Can from "./can";

class NavigationBar extends Component {
  render() {
    console.log(this.props);
    {
      console.log("./logoo.jpg");
    }
    return (
      <Navbar bg="dark" variant="dark" expand="lg">
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <img
              src="logoo.jpg"
              width="40"
              height="40"
              className="d-inline-block align-top"
              alt="logo"
            />
            <Nav.Link href="/">Home</Nav.Link>
            <Can
              role={this.props.auth.user.role}
              perform="product:create"
              yes={() => <Nav.Link href="/create">create product</Nav.Link>}
            />
            <Can
              role={this.props.auth.user.role}
              perform="order:historySelf"
              yes={() => (
                <Nav.Link href="/OrderList">My Orders History</Nav.Link>
              )}
            />

            <Navbar.Toggle />
          </Nav>

          <Nav>
            <Nav.Link href="/aboutPage">about</Nav.Link>{" "}
            {this.props.auth.isAuthenticated ? (
              <Navbar.Text>
                Signed in as: {this.props.auth.user.username} (
                <a href="/login">Logout</a>)
              </Navbar.Text>
            ) : (
              <Nav.Link href="/login">Login</Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

NavigationBar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, { logoutUser })(NavigationBar);
