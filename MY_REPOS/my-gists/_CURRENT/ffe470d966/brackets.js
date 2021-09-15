let obj = {
    "one": 1,
    "two": 2
};
// Choose the square brackets property accessor when the property name is determined at
// runtime, or if the property name is not a valid identifier
let myKey = "one";
console.log(obj[myKey]);
// Choose the dot property accessor when the property name is known ahead of time.
console.log(obj.two);
