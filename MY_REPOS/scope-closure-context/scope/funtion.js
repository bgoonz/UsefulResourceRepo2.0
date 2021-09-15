const fruits = () => {
  var fruit = "appel";
  console.log(fruit);
};

fruits();
console.log(fruit); //'en este no podemos llegar

const anotherFunction = () => {
  var x = 1;
  var x = 2;

  let y = 1;
  // let y=2;//esto no lo podemos hacer let no permite redeclararse

  console.log(x);
  console.log(y);
};

anotherFunction();
