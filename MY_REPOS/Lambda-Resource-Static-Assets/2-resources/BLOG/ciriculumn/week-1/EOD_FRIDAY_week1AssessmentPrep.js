//Write a function combine that takes two arguments and returns a new string containing both arguments
let combine = function (name1, name2) {
	return name1 + " " + name2
}
console.log(combine("Dwight", "Shrute"))
console.log(combine("Michael", "Scott"))

//Define a function addNums that adds two numbers together. Call the function, pass in arguments and print the
//return value of the function
let addNums = function (num1, num2) {
	let sum = num1 + num2
	return sum
}
console.log(addNums(2, 4))

//Identify the difference between parameters and arguments.
function pamAndJim(person1, person2) {
	return person1 + " and " + person2 + " forever"
}

console.log(pamAndJim("Pam Beesly", "Jim Halpert"))

//What happens when there extra arguments
function add(firstParameter, secondParameter) {
	return firstParameter + secondParameter
}

console.log(add(1, 2, 17, 14))

// What happens when there are not enough arguments
function add(firstParameter, secondParameter) {
	return firstParameter + secondParameter
}

console.log(add("hello "))
console.log(add(2))

// Transform this function from declaration to expression
// function transform() {
// 	return "we transformed the function!!"
// }

let transform = function () {
	return "we transformed the function!"
}

console.log(transform())
