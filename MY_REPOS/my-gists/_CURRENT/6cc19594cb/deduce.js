function fDAdder(arr) {
  console.log(this);
  return arr.reduce((acc, ele) => {
    return acc + ele;
  });
}
fDAdder([1, 2, 4, 6]);
