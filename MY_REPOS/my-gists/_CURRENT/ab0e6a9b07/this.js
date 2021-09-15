function Person(name) {
  // this.name = name;
  // let that = this;
  setTimeout(function () {
    // console.log(this); // => Window
    // console.log(that); // => [Function] => Person
    // this.sayName(); // => no method error
    that.sayName();
  }, 1000);
}
Person.prototype.sayName = function () {
  console.log(this.name);
};
const jane = new Person("Jane");
