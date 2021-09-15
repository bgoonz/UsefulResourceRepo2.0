/***********************************************************************
Write a function `boundInterval` that accepts a callback, delay in 
milliseconds, and object as arguments. The function should bind the callback 
to the given object and set an interval with the given delay using that 
bound callback. The function should return the Timeout object for the 
interval.

In addition to Mocha, we recommend that you test your code manually using 
node with the examples below.

Examples:

function bark() {
  console.log(this.name + ' barks');
}

const dog = { name: 'Fido', colour: 'brown'};
const cat = { name: 'Sennacy', colour: 'black'};

boundInterval(bark, 500, dog); // prints 'Fido barks' every 500 ms

const timeoutObj = boundInterval(bark, 250, cat); // prints 'Sennacy barks' every 250 ms
console.log(timeoutObj); // Timeout { ... }
***********************************************************************/

function boundInterval(cb, delay, thisArg) {
  return setInterval(cb.bind(thisArg), delay);
}

/**************DO NOT MODIFY ANYTHING UNDER THIS  LINE*****************/
try {
  module.exports = boundInterval;
} catch {
  module.exports = null;
}
