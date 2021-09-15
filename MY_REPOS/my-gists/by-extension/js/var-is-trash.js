//A var declared anywhere in a function will be automatically included at the top level of that function and assigned ‘undefined’. For instance:

function hello( assign ) {
  console.log(message); //prints undefined
  if (assign) {
    var message = "Hello there!";
    console.log(message); // prints "Hello there!"
  }
}
//Notice that you can print out the contents of message even though it may have never been initialized. This is because Javascript actually rewrites that code into:

function hello( assign ) {
  var message = undefined;
  console.log(message); //prints undefined
  if (assign) {
    message = "Hello there!";
    console.log(message); // prints "Hello there!"
  }
}