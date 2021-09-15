// I want addOne() to be the only way to access/alter the 'counter'
function addOne() {
    let counter = 0;
    counter++;
    return counter;
}
let result1 = addOne();
let result2 = addOne();
let result3 = addOne();
console.log(result1); // <Fill in Expected Result>
console.log(result2); // <Fill in Expected Result>
console.log(result3); // <Fill in Expected Result>