import React, { useEffect, useContext } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';

import LoginPanel from './LoginPanel';
import PokemonBrowser from './PokemonBrowser';
import PokemonContext from './PokemonContext';

const PrivateRoute = (props) => {
  return (<Route render={() => {
    return (
      props.needLogin === true
        ? <Redirect to='/login' />
        : props.children
      );
    }}/>);
}

const App = () =>  {
  const {token, setToken} = useContext(PokemonContext);

  useEffect(() => {
    (async() => {
      const localToken = window.localStorage.getItem("token");
      if (localToken) {
        setToken(localToken);
      }
    })();
  },[setToken]);

  const needLogin = !token;

  return (
    <BrowserRouter>
      <Switch>
        <Route
          path="/login"
          render={(props) => (
            <LoginPanel {...props}/>
          )}
        />
        <PrivateRoute
          path="/"
          exact={true}
          needLogin={needLogin}>
          <PokemonBrowser
          />
        </PrivateRoute>
        <PrivateRoute
          path="/pokemon/:pokemonId"
          exact={true}
          needLogin={needLogin}>
          <PokemonBrowser
          />
        </PrivateRoute>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
