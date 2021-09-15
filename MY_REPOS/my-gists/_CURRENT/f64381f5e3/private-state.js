function createCounter() {
  // this function starts a counter at 0, then returns a
  // new function that can access and change that counter
  //
  // each new counter you create will have a single internal
  // state, that can be changed only by calling the function.
  // you can't access that state from outside of the function,
  // even though the count variable in question is initialized
  // by the outer function, and it remains accessible to the
  // inner function after the outer function returns.
  let count = 0;
  return function () {
    count++;
    return count;
  };
}
let counter = createCounter();
console.log( counter() ); //=> 1
console.log( counter() ); //=> 2
// so the closure here comes into play because
// an inner function is accessing and changing
// a variable from an outer function// the closure is the combination of the counter
// function and the all the variables that existed
// in the scope that it was declared in. because
// inner blocks/functions have access to outer
// scopes, that includes the scope of the outer
// function.// so counter variable is a closure, in that
// it contains the inner count value that was
// initialized by the outer createCounter() function
// count has been captured or closed over// this state is private, so if i run createCounter again
// i get a totally separate count that doesn't interact
// with the previous one and each of the new functions
// will have their own internal state based on the
// initial declaration in the now-closed outer function
let counter2 = createCounter();
console.log( counter2() ); // => 1
// if i set a new function equal to my existing counter
// the internal state is shared with the new function
let counter3 = counter2;
console.log( counter3() );
