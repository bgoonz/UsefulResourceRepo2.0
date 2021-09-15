import React from "react";
import { connect } from "react-redux";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";

import LoginPanel from "./LoginPanel";
import PokemonBrowser from "./PokemonBrowser";
import { loadToken } from "./store/authentication";

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      rest.needLogin === true ? (
        <Redirect to="/login" />
      ) : (
        <Component {...props} />
      )
    }
  />
);

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
    };
  }

  async componentDidMount() {
    this.setState({ loaded: true });
    this.props.loadToken();
  }

  render() {
    if (!this.state.loaded) {
      return null;
    }
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/login" component={LoginPanel} />
          <PrivateRoute
            path="/"
            exact={true}
            needLogin={this.props.needLogin}
            component={PokemonBrowser}
          />
          <PrivateRoute
            path="/pokemon/:pokemonId"
            exact={true}
            needLogin={this.props.needLogin}
            component={PokemonBrowser}
          />
        </Switch>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    needLogin: !state.authentication.token,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadToken: () => dispatch(loadToken()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
