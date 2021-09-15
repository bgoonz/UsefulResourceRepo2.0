import React, { Component } from "react";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";

import { Provider } from "react-redux";

import { ToastContainer } from "react-toastify";
import Header from "components/shared/Header";
import RentalListing from "components/listings/rental-listing/RentalListing";
import RentalSearchListing from "components/listings/rental-listing/RentalSearchListing";
import RentalDetail from "components/listings/rental-detail/RentalDetail";
import RentalUpdate from "components/listings/rental-detail/RentalUpdate";
import { RentalCreate } from "components/listings/rental-create/RentalCreate";
import Login from "components/login/Login";
import { Register } from "components/register/Register";

import { RentalManage } from "components/listings/rental-manage/RentalManage";
import BookingManage from "components/bookings/BookingManage";

import { ProtectedRoute } from "components/shared/auth/ProtectedRoute";
import { LoggedInRoute } from "components/shared/auth/LoggedInRoute";

import * as actions from "./actions/authActions";

import "App.css";

const store = require("./store").init();

class App extends Component {
  componentWillMount() {
    this.checkAuthState();
  }

  checkAuthState() {
    store.dispatch(actions.checkAuthState());
  }

  logout() {
    store.dispatch(actions.logout());
  }

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <ToastContainer />
          <Header logout={this.logout} />
          <div className="container">
            <Switch>
              <Route exact path="/" render={() => <Redirect to="/rentals" />} />
              <Route exact path="/rentals" component={RentalListing} />
              <Route
                exact
                path="/rentals/:city/homes"
                component={RentalSearchListing}
              />
              <ProtectedRoute
                exact
                path="/rentals/manage"
                component={RentalManage}
              />
              <ProtectedRoute
                exact
                path="/bookings/manage"
                component={BookingManage}
              />
              <ProtectedRoute
                exact
                path="/rentals/new"
                component={RentalCreate}
              />
              <Route exact path="/rentals/:id" component={RentalDetail} />
              <Route exact path="/rentals/:id/edit" component={RentalUpdate} />
              <Route exact path="/login" component={Login} />
              <LoggedInRoute exact path="/register" component={Register} />
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
