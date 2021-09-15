function sum(a, b) {
  console.log(this);
  //CANNOT DO THIS.X + THIS.Y here because 'this' KEYWORD HERE IS BOUND TO GLOBAL WINDOW
  console.log(a + b);
}
sum(5, 5);

stooge = {
  x: 4,
  y: 5,
};
stooge.nickname = "Hello";

anotherstooge = {};
anotherstooge.prototype = Object.create(stooge);
anotherstooge.nickname = "haha"; //THIS CAN ONLY UPDATE OR ADD NICKNAME PROPERTY TO ANOTHERSTOOGE , THE PROTOTYPE CHAIN (Stooge in this case) CAN NEVER BE AFFECTED

//console.log(anotherstooge);
//console.log(stooge);

stooge.funkty = function () {
  console.log(this); // THIS KEYWORD HERE REFERS TO STOOGE OBJECT HERE
  function yolo() {
    console.log("hello");
  }
  yolo();
  var helper = function () {
    console.log(this); //THIS KEYWORD HERE REFERS TO 'GLOBAL' WINDOW OBJECT RATHER THAN STOOGE OBJECT
  };
  helper();
};

stooge.funkty();

var Quo = function (name) {
  this.name = name;
};

Quo.prototype.getStatus = function () {
  return this.name;
};

var myQuo = new Quo("Delicious");
console.log(myQuo.getStatus());
