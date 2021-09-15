function run() {
  console.log(foo); // undefined
  var foo = "Foo";
  console.log(foo); // Foo
}
run();
// Consider this func1 function and it's nested scopes.
// global scope
function func1(arg1) {
  // func1 scope
  return function func2(arg2) {
    // func2 scope
    return function func3(arg3) {
      // func3 scope
      console.log(arg1, arg2, arg3);
    };
  };
}
