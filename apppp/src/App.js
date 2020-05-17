import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import NavigationBar from "./components/navBar";
import CreateProduct from "./components/CreateProduct";
import ProductsList from "./components/ProductsList";
import CreateUser from "./components/CreateUser";
import Structure from "./components/structure";
import OrderBox from "./components/orderBox";
import Login from "./components/login";
import Register from "./components/register";
import aboutPage from "./components/aboutPage";
import UpdateProduct from "./components/updateProduct";
import OrderList from "./components/orderList";
import ProductInfo from "./components/productInfo";
import { Provider } from "react-redux";
import store from "./store";

import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";
import PrivateRoute from "./components/private-route/PrivateRoute";
import Dashboard from "./components/dashboard/Dashboard";
import passwordRecover from "./components/passwordRecover";

// Check for token to keep user logged in
if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
  console.log("decoded: test!! \n");

  console.log(decoded);
  // Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Redirect to login
    window.location.href = "./login";
  }
}

function App() {
  return (
    <Provider store={store}>
      <Router>
        <NavigationBar />
        <div className="contain">
          <div className="container">
            <div className="containerBody">
              <br />
              <Route path="/" exact component={Structure} />
              <Route path="/list" exact component={ProductsList} />
              {/* <Route path="/edit/:id" exact component={EditProduct} /> */}
              <Route path="/register" exact component={Register} />

              <Route path="/login" exact component={Login} />
              <Route path="/create" exact component={CreateProduct} />
              <Route path="/updateProduct/:id" component={UpdateProduct} />
              <Switch>
                <Route path="/OrderList" component={OrderList} />

                <Route path="/productInfo/:id" component={ProductInfo} />
                <Route path="/orderBox" component={OrderBox} />
                <Route path="/aboutPage" component={aboutPage} />
                <Route path="/dashboard" component={Dashboard} />
                <Route path="/passwordRecover" component={passwordRecover} />
              </Switch>
            </div>
          </div>
          <div className="bottomTitle">
            <p> ©Maayan Yitzhak</p>
            <p>
              This site has been set up by MY, for study purposes. it is not to
              be used commercially
            </p>
          </div>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
