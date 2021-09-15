function printKeys(object) {
  return Object.keys(object);
}
function printValues(object) {
  return Object.values(object);
}
console.log(
  printKeys({
    dog: "Strelka",
    dog2: "Belka",
  })
);
console.log(
  printValues({
    dog: "Strelka",
    dog2: "Belka",
  })
);
