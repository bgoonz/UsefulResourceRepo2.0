const func1 = () => {
  console.log(1);
};

const func2 = () => {
  return 2;
};

const func3 = async () => {
  const func2Var = await func2();
  console.log(func2Var);
};

const func4 = () => {
  setTimeout(() => {
    console.log("My promise is done after 2 seconds!");
  }, 2000);
};

const wrapper = async () => {
  await func1();
  await func3();
  await func4();
};

const starterPromise = () => {
  return new Promise((resolve, reject) => {
    resolve(console.log("this is the first of my promises"));
  });
};

//starterPromise().then(() => wrapper());

// const wait = async (time, cb) => {
//   await setTimeout(() => {
//     cb();
//   }, time);
// };

const wait = async (time, cb) => {
  await new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(cb());
    }, time);
  });
};

const superWrapper = async () => {
  await wait(2000, starterPromise);
  await wrapper();
};

const rejecterPromise = () => {
  return new Promise((resolve, reject) => {
    let value = Math.random() + 2;
    return value < 2.5
      ? resolve(console.log("The number is less than 2.5"))
      : reject("ERROR: The number isn't less than 2.5");
  });
};

superWrapper().then(() => {
  for (let i = 0; i < 10; i++) {
    wait(2000, rejecterPromise).catch((err) => console.error(err));
  }
});

console.log("This will probably run first");

/*
async keyword returns a promise object.
await makes a function block code beyond it, lets asychronous code run synchronously.
*/
//function wait (time){return new Promise (res =>{setTimeout(resolve,time)}}
