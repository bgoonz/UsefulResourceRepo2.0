const helloWork = () => {
  const hello = "hello work";
  console.log(hello);
};

helloWork();
console.log(hello); //'en este no podemos llegar

var scope = "i am global";

const functionScote = () => {
  var scope = "i am just a local";
  const func = () => {
    return scope;
  };
  console.log(func());
};

functionScote();
console.log(scope); //ambito lexico
