let obj = {
  name: "my object",
  unboundFunc: function () {
    return this.name;
  },
  // this function will be able to be called on different objects},
  boundToGlobal: () => {
    // this function, no matter how you call it, will be called
    // on the global object, and it cannot be rebound
    // this is because it was defined using arrow syntax },
    return this.name;
  },
  makeFuncBoundToObj: function () {
    return () => {
      return this.name;
    };
    // this function will return a function that will be bound
    // to the object where we call the outer method
    // because the arrow syntax is nested inside one of this
    // function's methods, it cannot be rebound
  },

  makeUnboundFunc: function () {
    return function () {
      return this.name;
    };
    //this function will return a function that will still be unbound
  },

  immediatelyInvokedFunc: (function () {
    return this.name;
  })(),
  // this property will be set to the return value of this anonymous function,
  // which is invoked during the object definition;
  // basically, it's a way to check the context inside of an object, at this moment

  innerObj: {
    name: "inner object",
    innerArrowFunc: () => {
      return this.name;
    }, // the context inside a nested object is not the parent, it's still
    // the global object. entering an object definition doesn't change the context
  },
};

let otherObj = {
  name: "my other object",
};

console.log("unboundFunc: ", obj.unboundFunc());
// => "my object"
// assign unboundFunc to a variable and call it

let newFunc = obj.unboundFunc;
// this newFunc will default to being called on global object

console.log("newFunc: ", newFunc());
// => undefined
// but you could bind it directly to a different object if you wanted

console.log("newFunc: ", newFunc.bind(otherObj)());
// "my other object"
// meanwhile, obj.boundToGlobal will only ever be called on global object

console.log("boundToGlobal: ", obj.boundToGlobal());
//=> undefined
let newBoundFunc = obj.boundToGlobal;

console.log("newBoundFunc: ", newBoundFunc());
// => undefined
// even if you try to directly bind to another object, it won't work!

console.log("newBoundFunc: ", newBoundFunc.bind(otherObj)());
// => undefined
// let's make a new function that will always be bound to the context
// where we call our function maker
let boundFunc = obj.makeFuncBoundToObj();
// note that we're invoking, not just assigning

console.log("boundFunc: ", boundFunc());
// => "my object"
// we can't rebind this function

console.log("boundFunc: ", boundFunc.bind(otherObj)());
// =>"my object"
// but if I call makeFuncBoundToObj on another context
// the new bound function is stuck with that other context
let boundToOther = obj.makeFuncBoundToObj.bind(otherObj)();

console.log("boundToOther: ", boundToOther());
// => "my other object"

console.log("boundToOther: ", boundToOther.bind(obj)());
// "my other object"
// the return value of my immediately invoked function
// shows that the context inside of the object is the
// global object, not the object itself
// context only changes inside a function that is called
// on an object

console.log("immediatelyInvokedFunc: ", obj.immediatelyInvokedFunc);
// => undefined
// even though we're inside a nested object, the context is
// still the same as it was outside the outer object
// in this case, the global object

console.log("innerArrowFunc: ", obj.innerObj.innerArrowFunc());
// => undefined}-Implement a closure and explain how the closure effects scope
