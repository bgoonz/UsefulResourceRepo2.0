import React, { useState, useEffect } from "react";

import PokemonContext from './PokemonContext';
import App from './App';

const AppWithContext = (props) => {
  const [token, setToken] = useState('');
  const [pokemon, setPokemon] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState();
  const [formVisible, setFormVisible] = useState(false);

  useEffect(() => {
    (async () => {
      const localToken = window.localStorage.getItem("token");
      if (localToken) {
        setToken(localToken);
      }
    })();
  }, []);

  const value = {
      token,
      setToken,
      pokemon,
      setPokemon,
      selectedPokemon,
      setSelectedPokemon,
      formVisible,
      setFormVisible
  };

  return (
    <PokemonContext.Provider value={value}>
        <App/>
    </PokemonContext.Provider>
  );
};

export default AppWithContext;
