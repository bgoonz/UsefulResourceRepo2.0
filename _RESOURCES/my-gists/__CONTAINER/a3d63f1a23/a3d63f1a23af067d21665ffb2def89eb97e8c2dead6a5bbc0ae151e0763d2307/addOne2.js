function addOne() {
    // this time, we define counter within our function
    let counter = 0;
    counter++;
}
// what do we expect to happen here?
console.log(counter); // <Fill in Expected Result>
// should this work? why/why not?
counter++;
console.log(counter); // <Fill in Expected Result>
addOne();
console.log(counter); // <Fill in Expected Result>