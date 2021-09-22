import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';

import LoginPanel from './LoginPanel';
import PokemonBrowser from './PokemonBrowser';
import { loadToken } from './store/authentication';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    rest.needLogin === true
      ? <Redirect to='/login' />
      : <Component {...props} />
  )} />
)

const App = () =>  {
  const token = useSelector(state => state.authentication.token);
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  const needLogin = !token;

  useEffect(() => {
    setLoaded(true);
    dispatch(loadToken());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  if (!loaded) {
    return null;
  }
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login" component={LoginPanel} />
        <PrivateRoute
          path="/"
          exact={true}
          needLogin={needLogin}
          component={PokemonBrowser}
        />
        <PrivateRoute
          path="/pokemon/:pokemonId"
          exact={true}
          needLogin={needLogin}
          component={PokemonBrowser}
        />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
