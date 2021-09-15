let numArray = [1, 2, 3];
let moreNums = [...numArray, 4, 5, 6];
console.log(moreNums);
let shoe = {
  color: "red",
  size: 10,
};
let newShoe = {
  ...shoe,
  brand: "Nike",
  size: 12,
};
console.log(newShoe);
newShoe.color = "black";
console.log(newShoe);
console.log(shoe);
