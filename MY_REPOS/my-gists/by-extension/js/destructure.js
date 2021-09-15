let array = [35, 9];let [firstEl, secondEl] = array;console.log(firstEl); // => 35console.log(secondEl); // => 9// can also destructure using … syntax let array = [35, 9, 14]; let [head, …tail] = array; console.log(head); // => 35 console.log(tail); // => [9, 14]-Destructure an object to reference specific values

//     if you want to use variable names that don 't match the keys, you can use aliasing -
//     `let { oldkeyname: newkeyname } = object` -
//     rule of thumb- only destructure values from objects that are two levels deep ``

let obj = {
   name: "Wilfred",
   appearance: ["short", "mustache"],
   favorites: {
      color: "mauve",
      food: "spaghetti squash",
      number: 3
   }
}
// with variable names that match keys
let { name, appearance } = obj;
console.log(name); // "Wilfred"
console.log(appearance); // ["short", "mustache"]// with new variable names (aliasing)
let {name: myName, appearance: myAppearance} = obj;console.log(myName); // "Wilfred"
console.log(myAppearance); // ["short", "mustache"]// in a function call
let sayHello = function({name}) {
console.log("Hello, " + name); // "Hello Wilfred"
}// nested objects + aliasing
let { favorites: {color, food: vegetable} } = obj;
console.log(color, vegetable); //=> mauve spaghetti squash