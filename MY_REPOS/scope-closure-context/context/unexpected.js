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

/*
In the above example we get undefined when we assign our this function to a variable bc there is no obj to reference except the global one!

global.setTimeout() : popular method of setting a function to run on a timer.

*/
let hello = function () {
  console.log("hello!");
};

// global. is a method of the global object!
global.setTimeout(hello, 5000); // waits 5 seconds then prints "hello!"
/*
Strictly Protecting the Global Object

We can run JS in strict mode by tagging use strict at the top of our program.

If we try to invoke this on our global function in strict mode we will no longer be able to access it and instead just get undefined.
Changing Context using Bind

"The simplest use of bind() is to make a function that, no matter how it is called, is called with a particular this value".
*/
let cat = {
  purr: function () {
    console.log("meow");
  },
  purrMore: function () {
    this.purr();
  },
};

let sayMeow = cat.purrMore;
console.log(sayMeow()); // TypeError

let boundCat = sayMeow.bind(cat);

boundCat(); // prints "meow"
/*
Binding with Arguments

We can also use bind() to bind arguments to a function.
*/
let aboundFunc = func.bind(context, arg1, arg2 /*etc...*/);
const sum = function (a, b) {
  return a + b;
};

const add3 = sum.bind(null, 3);

console.log(add3(10)); // 13
const multiply = function (a, b) {
  return a * b;
};

const double = multiply.bind(null, 2);
const triple = multiply.bind(null, 3);

console.log(double(3)); // 6
console.log(triple(3)); // 9
