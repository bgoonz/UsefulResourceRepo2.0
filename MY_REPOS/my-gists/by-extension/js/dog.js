let dog = {
  name: "Bowser",
  changeName: function () {
    this.name = "Layla";
  },
};
// note this is **not invoked** - we are assigning the function itself
let change = dog.changeName;
console.log( change() );
// undefined
// our dog still has the same name
console.log( dog );
// { name: 'Bowser', changeName: [Function: changeName] }
// instead of changing the dog we changed the global name!!!
console.log( this );
// Object [global] {etc, etc, etc,  name: 'Layla'}
