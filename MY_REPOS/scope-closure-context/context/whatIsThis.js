/*
Context is most often determined by how a function is invoked. When a function is called as a method of an object, this is set to the object the method is called on:


*/
var obj = {
  foo: function () {
    return this;
  },
};

obj.foo() === obj; // true

/*
The same principle applies when invoking a function with the new operator to create an instance of an object. When invoked in this manner, the value of this within the scope of the function will be set to the newly created instance:


*/

function foo() {
  alert(this);
}

foo(); // window
new foo(); // foo

/*
When called as an unbound function, this will default to the global context or window object in the browser. However, if the function is executed in strict mode, the context will default to undefined.


*/

/*



*/

/*



*/

/*



*/
