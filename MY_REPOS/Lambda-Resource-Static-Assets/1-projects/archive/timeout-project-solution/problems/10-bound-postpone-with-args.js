/***********************************************************************
Write a function `boundPostponeWithArgs` that accepts a callback, a delay in 
milliseconds, and an object as arguments. `boundPostponeWithArgs` should 
return a new function. When the returned function is called, it should invoke 
the callback bound to the given object after the delay. When the returned 
function is called, it should also pass any arguments it receives to the callback.

In addition to Mocha, we recommend that you test your code manually using 
node with the examples below.

Examples

const barkAt = function (target) {
  console.log(this.name + ' is barking at ' + target);
};

const dog = {name: 'Strelka', age: 3};
const strelkaBarkAt = boundPostponeWithArgs(barkAt, 500, dog);
strelkaBarkAt('Charly'); // prints 'Strelka is barking at Charly' after 500 ms
strelkaBarkAt('Alice'); // prints 'Strelka is barking at Alice' after 500 ms


const cat = {name: 'Whiskers', color: 'orange'};
const whiskersBarkAt = boundPostponeWithArgs(barkAt, 1000, cat);
whiskersBarkAt('Bex'); // prints 'Whiskers is barking at Bex' after 1000 ms
whiskersBarkAt('Marnie'); // prints 'Whiskers is barking at Marnie' after 1000 ms
***********************************************************************/

function boundPostponeWithArgs(cb, delay, thisArg) {
  return function (...args) {
    setTimeout(cb.bind(thisArg), delay, ...args);
  };
}

/**************DO NOT MODIFY ANYTHING UNDER THIS  LINE*****************/
try {
  module.exports = boundPostponeWithArgs;
} catch {
  module.exports = null;
}
