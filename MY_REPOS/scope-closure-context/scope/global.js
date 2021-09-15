var hello = "Hello";
var hello = "Hello +"; //mala practica

let work = "Hello Work";
// let work='Hello Work+';//esto no es posible ya que let no puede ser reasigmada

const helloWork = "Hello Work";
console.log(hello);
const anotherFunction = () => {
  console.log(hello);
  console.log(work);
  console.log(helloWork);
};

anotherFunction();

const helloWork = () => {
  globalVar = "im global";
};

helloWork();
console.log(globalVar);

const anotherFunction = () => {
  var localvar = (globalVar = "im global");
};

anotherFunction();
console.log(globalVar);
