const anotherFunction = () => {
  for (
    var i = 0;
    i < 10;
    i++ //con var todo dara 10
  ) {
    setTimeout(() => {
      console.log(i);
    }, 1000);
  }
};

anotherFunction();
