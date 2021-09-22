// Array#reduce

// summing all elements of an array:

let nums = [3, 7, 5, 9];

let sum = nums.reduce(function(accum, el) {
    return accum + el;
});

console.log(sum);

// Array#reduce is an array method that runs a function each time
// for every element of the array,
// and assigns the the return value of that function to the accumulator variable
// every time the function is run
// at the very end, #reduce returns the final accumulator value


// initial accumulator is default the first value of the array
// #reduce takes an optional second argument that can be the default starting value for the accumulator:

let sum2 = nums.reduce(function (accum, el) {
    return accum + el;
}, 100);

// multiplying all elements together:

let product = nums.reduce(function (accum, el) {
    return accum * el;
});

console.log(product);


// finding the max number of an array:
let max = nums.reduce(function(accum, el) {
    if (el > accum) {
        return el;
    } else {
        return accum;
    }
});

console.log(max);