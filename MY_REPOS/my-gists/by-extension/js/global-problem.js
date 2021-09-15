let counter = 0;
function addOne() {
    counter++;
}
// I want addOne() to be the only way to access/alter the 'counter', but that's not the case. 
addOne();
addOne();
addOne();
counter = -Infinity;
console.log(counter); // <Fill in Expected Result>