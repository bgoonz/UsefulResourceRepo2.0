class Girlfriend {
  constructor() {
    this.name = "JavaScript";
  }
  displayName() {
    console.log(this.name);
  }
}
const Ming = new Girlfriend();
Ming.displayName(); // => Javascript
const displayAgain = Ming.displayName;
displayAgain(); // => Result in a Type Error: Cannot read property 'name' of undefined.