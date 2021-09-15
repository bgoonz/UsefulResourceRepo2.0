const adder = (arg1) => {
  return (arg2) => {
    return arg1 + arg2;
  };
};
const func2 = adder(2);
const result = func2(2);
console.log(result); // => 4;
