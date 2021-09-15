import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, Route, useParams } from 'react-router-dom';

import { imageUrl } from './config';
import LogoutButton from './LogoutButton';
import PokemonDetail from './PokemonDetail';
import PokemonForm from './PokemonForm';
import Fab from './Fab';
import { getPokemon, showForm } from './store/pokemon';

const PokemonBrowser = props => {
  const pokemon = useSelector((state) => state.pokemon.list);
  const token = useSelector((state) => state.authentication.token);
  const formVisible = useSelector((state) => state.pokemon.formVisible);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPokemon());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { id } = useParams();
  const pokemonId = Number.parseInt(id);

  if (!pokemon) {
    return null;
  }
  return (
    <main>
      <LogoutButton token={token} />
      <nav>
        <Fab hidden={formVisible} onClick={() => dispatch(showForm())} />
        {pokemon.map((pokemon) => {
          return (
            <NavLink key={pokemon.name} to={`/pokemon/${pokemon.id}`}>
              <div
                className={
                  pokemonId === pokemon.id
                    ? "nav-entry is-selected"
                    : "nav-entry"
                }
              >
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
        <PokemonForm token={token} />
      ) : (
        <Route
          path="/pokemon/:id"
          render={(props) => <PokemonDetail {...props} token={token} />}
        />
      )}
    </main>
  );
}

export default PokemonBrowser;
