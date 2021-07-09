function createAdder() {
    let counter = 0;
    return function () {
        counter++;
        return counter;
    }
}
let addOne = createAdder();
let result1 = addOne();
let result2 = addOne();
let result3 = addOne();
console.log(result1); // <Fill in Expected Result>
console.log(result2); // <Fill in Expected Result>
console.log(result3); // <Fill in Expected Result>