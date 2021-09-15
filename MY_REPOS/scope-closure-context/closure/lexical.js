const buildCount = (i) => {
  let count = i;
  const displayCount = () => {
    console.log(count++);
  };
  return displayCount;
};

const myCount = buildCount(1);
myCount(); //1
myCount(); //2
myCount(); //3

console.log("---------------");
const myOtherCount = buildCount(10);
myOtherCount(); //10
myOtherCount(); //11
