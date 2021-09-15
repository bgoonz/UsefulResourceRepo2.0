import React, { useState, useEffect } from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";

import LoginPanel from "./LoginPanel";
import PokemonBrowser from "./PokemonBrowser";

const PrivateRoute = (props) => {
  return (
    <Route
      render={() => {
        return props.needLogin === true ? (
          <Redirect to="/login" />
        ) : (
          props.children
        );
      }}
    />
  );
};

const App = () => {
  const [token, setToken] = useState("");
  const [pokemon, setPokemon] = useState([]);

  useEffect(() => {
    (async () => {
      const localToken = window.localStorage.getItem("token");
      if (localToken) {
        setToken(localToken);
      }
    })();
  }, []);

  const needLogin = !token;

  return (
    <BrowserRouter>
      <Switch>
        <Route
          path="/login"
          render={(props) => (
            <LoginPanel token={token} setToken={setToken} {...props} />
          )}
        />
        <PrivateRoute path="/" exact={true} needLogin={needLogin}>
          <PokemonBrowser
            pokemon={pokemon}
            setPokemon={setPokemon}
            token={token}
            setToken={setToken}
          />
        </PrivateRoute>
        <PrivateRoute
          path="/pokemon/:pokemonId"
          exact={true}
          needLogin={needLogin}
        >
          <PokemonBrowser
            pokemon={pokemon}
            setPokemon={setPokemon}
            token={token}
            setToken={setToken}
          />
        </PrivateRoute>
      </Switch>
    </BrowserRouter>
  );
};

export default App;
