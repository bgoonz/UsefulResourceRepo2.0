import React, { Component } from "react";
import { connect } from "react-redux";
import { createPokemon, getPokemonTypes, hideForm } from "./store/pokemon";

class PokemonForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      attack: "",
      defense: "",
      imageUrl: "",
      name: "",
      type: "",
      move1: "",
      move2: "",
      types: [],
    };
    this.updateAttack = this.updateProperty("attack");
    this.updateDefense = this.updateProperty("defense");
    this.updateImageUrl = this.updateProperty("imageUrl");
    this.updateName = this.updateProperty("name");
    this.updateType = this.updateProperty("type");
    this.updateMove1 = this.updateProperty("move1");
    this.updateMove2 = this.updateProperty("move2");
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentDidMount() {
    this.props.getPokemonTypes();
  }

  async handleSubmit(e) {
    e.preventDefault();

    const payload = this.state;
    payload.moves = [payload.move1, payload.move2];

    this.props.createPokemon(payload);
  }

  updateProperty = (property) => (e) => {
    this.setState({
      [property]: e.target.value,
    });
  };

  render() {
    return (
      <section className="new-form-holder centered middled">
        <form onSubmit={this.handleSubmit}>
          <input
            type="number"
            placeholder="Attack"
            min="0"
            max="100"
            required
            value={this.state.attack}
            onChange={this.updateAttack}
          />
          <input
            type="number"
            placeholder="Defense"
            min="0"
            max="100"
            required
            value={this.state.defense}
            onChange={this.updateDefense}
          />
          <input
            type="text"
            placeholder="Image URL"
            value={this.state.imageUrl}
            onChange={this.updateImageUrl}
          />
          <input
            type="text"
            placeholder="Name"
            value={this.state.name}
            onChange={this.updateName}
          />
          <input
            type="text"
            placeholder="Move 1"
            value={this.state.move1}
            onChange={this.updateMove1}
          />
          <input
            type="text"
            placeholder="Move 2"
            value={this.state.move2}
            onChange={this.updateMove2}
          />
          <select onChange={this.updateType}>
            {this.props.types.map((type) => (
              <option key={type}>{type}</option>
            ))}
          </select>
          <button type="submit">Create new Pokemon</button>
          <button type="button" onClick={this.props.hideForm}>
            Cancel
          </button>
        </form>
      </section>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    types: state.pokemon.types,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createPokemon: (data) => dispatch(createPokemon(data)),
    getPokemonTypes: () => dispatch(getPokemonTypes()),
    hideForm: () => dispatch(hideForm()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PokemonForm);
