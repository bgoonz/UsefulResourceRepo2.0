import React, { useEffect, useContext } from "react";
import { NavLink, Route } from "react-router-dom";
import { imageUrl } from "./config";
import LogoutButton from "./LogoutButton";
import PokemonDetail from "./PokemonDetail";
import PokemonForm from "./PokemonForm";
import Fab from "./Fab";
import { getPokemon } from "./fetches/pokemon";
import PokemonContext from "./PokemonContext";

const PokemonBrowser = () => {
  const {
    token,
    pokemon,
    setPokemon,
    formVisible,
    setFormVisible,
  } = useContext(PokemonContext);

  useEffect(() => {
    (async () => {
      const pokemon = await getPokemon(token);
      setPokemon(pokemon);
    })();
  }, [setPokemon, token]);

  const showForm = () => {
    setFormVisible(!formVisible);
  };

  if (!pokemon) {
    return null;
  }
  return (
    <main>
      <LogoutButton/>
      <nav>
        <Fab hidden={formVisible} onClick={showForm} />
        {pokemon.map((pokemon) => {
          return (
            <NavLink key={pokemon.name} to={`/pokemon/${pokemon.id}`}>
              <div className={"nav-entry"}>
                <div
                  className="nav-entry-image"
                  style={{
                    backgroundImage: `url('${imageUrl}${pokemon.imageUrl}')`,
                  }}
                ></div>
                <div>
                  <div className="primary-text">{pokemon.name}</div>
                  <div className="secondary-text">
                    Born {new Date(pokemon.updatedAt).toDateString()}
                  </div>
                </div>
              </div>
            </NavLink>
          );
        })}
      </nav>
      {formVisible ? (
        <PokemonForm />
      ) : (
        <Route
          path="/pokemon/:id"
          render={(props) => <PokemonDetail {...props} />}
        />
      )}
    </main>
  );
};

export default PokemonBrowser;
