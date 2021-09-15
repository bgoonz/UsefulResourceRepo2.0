const pokemon = {
  firstname: "Pika",
  lastname: "Chu",
  getPokeName: function () {
    const fullname = `${this.firstname} ${this.lastname}`;
    return fullname;
  },
};
const logPokemon = pokemon.getPokename.bind(pokemon);
logPokemon("sushi", "algorithms"); // Pika Chu loves sushi and algorithms
