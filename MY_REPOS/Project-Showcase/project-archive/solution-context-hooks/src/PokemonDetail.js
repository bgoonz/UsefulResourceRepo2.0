import React, { useEffect, useContext } from "react";
import { useParams } from 'react-router-dom';
import { imageUrl } from "./config";
import { getOnePokemon } from "./fetches/pokemon";
import PokemonContext from './PokemonContext';

const PokemonDetail = () => {
  const { token, selectedPokemon, setSelectedPokemon } = useContext(PokemonContext);
  const { id } = useParams();

  useEffect(() => {
    (async() => {
      const pokemon = await getOnePokemon(id, token);
      setSelectedPokemon(pokemon);
    })();
  }, [id, token, setSelectedPokemon])

  if (!selectedPokemon) {
    return null;
  }
  return (
    <div className="pokemon-detail">
      <div
        className={`pokemon-detail-image-background`}
        style={{
          backgroundImage: `url('${imageUrl}/images/${selectedPokemon.type}.jpg')`,
        }}
      >
        <div
          className="pokemon-detail-image"
          style={{
            backgroundImage: `url('${imageUrl}${selectedPokemon.imageUrl}')`,
          }}
        ></div>
        <h1 className="bigger">{selectedPokemon.name}</h1>
      </div>
      <div className="pokemon-detail-lists">
        <div>
          <h2>Information</h2>
          <ul>
            <li>
              <b>Type</b> {selectedPokemon.type}
            </li>
            <li>
              <b>Attack</b> {selectedPokemon.attack}
            </li>
            <li>
              <b>Defense</b> {selectedPokemon.defense}
            </li>
            <li>
              <b>Moves</b>
              <ul>
                {selectedPokemon.moves.map((move) => (
                  <li key={move}>{move}</li>
                ))}
              </ul>
            </li>
          </ul>
        </div>
        <div>
          <h2>Items</h2>
          <table>
            <thead>
              <tr>
                <th></th>
                <th>Name</th>
                <th>Happiness</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {selectedPokemon.items.map((item) => (
                <tr key={item.price * item.happiness}>
                  <td>
                    <img
                      className="item-image"
                      alt={item.imageUrl}
                      src={`${imageUrl}${item.imageUrl}`}
                    />
                  </td>
                  <td>{item.name}</td>
                  <td className="centered">{item.happiness}</td>
                  <td className="centered">${item.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PokemonDetail;