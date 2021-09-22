import React from "react";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import { connect } from "react-redux";
// Components
import { Header } from "components/shared/header/Header";
import RentalListing from "components/rental/rental-listing/RentalListing";
import RentalSearchListing from "components/rental/rental-listing/RentalSearchListing";
import RentalDetail from "components/rental/rental-detail/RentalDetail";
import Register from "components/register/Register";
import Login from "components/login/Login";
import RentalCreate from "components/rental/rental-create/RentalCreate";
import RentalManage from "components/rental/rental-manage/RentalManage";
import ManageBookings from "components/manage/manage-bookings/ManageBookings";
import { ProtectedRoute } from "components/shared/auth/ProtectedRoute";
import { AuthRoute } from "components/shared/auth/AuthRoute";
// HOC
// import { withQueryString } from 'hoc/withQueryString';
// const LoginWithQueryString = withQueryString(Login);

// Actions
import * as actions from "./actions";

class RentalApp extends React.Component {
  constructor(props) {
    super(props);

    this.invalidateUser = this.invalidateUser.bind(this);
  }

  componentWillMount() {
    this.checkToken();
  }

  checkToken() {
    const token = localStorage.getItem("auth_token");

    if (token) {
      this.props.dispatch(actions.loginSuccess(token));
      this.props.dispatch(actions.initUser(token));
    }
  }

  invalidateUser() {
    this.props.dispatch(actions.logout());
  }

  render() {
    const { auth } = this.props;

    return (
      <BrowserRouter>
        <div className="App">
          <Header
            invalidateUser={this.invalidateUser}
            isAuth={auth.isAuth}
            username={auth.username}
          />
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
                auth={auth}
                exact
                path="/rentals/new"
                component={RentalCreate}
              />
              <ProtectedRoute
                auth={auth}
                exact
                path="/rentals/manage"
                component={RentalManage}
              />
              <ProtectedRoute
                auth={auth}
                exact
                path="/bookings/manage"
                component={ManageBookings}
              />
              <Route
                auth={auth}
                exact
                path="/rentals/:id"
                component={RentalDetail}
              />
              <AuthRoute
                auth={auth}
                exact
                path="/register"
                component={Register}
              />
              <AuthRoute auth={auth} exact path="/login" component={Login} />
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}

export default connect(mapStateToProps)(RentalApp);
