const wait = async (ms: number) =>
  new Promise<void>((resolve) => {
    setTimeout(() => resolve(), ms);
  });


await wait(10000); // wait for 10 seconds


export { };
// Continue...
