// class Spiderman {
let SpidermanPrototype = {
  lookOut() {
    alert('My Spider-Sense is tingling.');
  }
};

// let miles = new Spiderman();
let miles = { __proto__: SpidermanPrototype };
miles.lookOut();