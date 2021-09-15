import speculation from 'speculation';

const wait = (
  time,
  cancel = Promise.reject() // By default, don't cancel
) => speculation((resolve, reject, onCancel) => {
  const timer = setTimeout(resolve, time);

  // Use onCancel to clean up any lingering resources
  // and then call reject(). You can pass a custom reason.
  onCancel(() => {
    clearTimeout(timer);
    reject(new Error('Cancelled'));
  });
}, cancel); // remember to pass in cancel!

wait(200, wait(500)).then(
  () => console.log('Hello!'),
  (e) => console.log(e)
); // 'Hello!'

wait(200, wait(50)).then(
  () => console.log('Hello!'),
  (e) => console.log(e)
); // [Error: Cancelled]