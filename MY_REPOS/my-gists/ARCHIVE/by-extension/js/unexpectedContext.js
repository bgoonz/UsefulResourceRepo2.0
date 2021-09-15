let dog = {
  name: "Bowser",
  changeName: function () {
    this.name = "Layla";
  },
};
let change = dog.changeName;
console.log(change()); // undefined
console.log(dog); // { name: 'Bowser', changeName: [Function: changeName] }
console.log(this); // Object [global] {etc, etc, etc,  name: 'Layla'}