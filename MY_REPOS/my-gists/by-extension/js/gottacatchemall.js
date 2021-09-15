const pokemon = {
  firstname: "Pika",
  lastname: "Chu",
  getPokeName: function () {
    const fullname = `${this.firstname} ${this.lastname}`;
    return fullname;
  },
};
console.log(pokemon.getPokeName());
