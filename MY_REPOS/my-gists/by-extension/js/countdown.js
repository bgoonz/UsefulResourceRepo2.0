const countdown = (msgFn, fn, count = 3, interval = 500) => {
  let timer = setInterval(() => {
    process.stdout.write('\u001b[?25l');
    process.stdout.write('\u001b[2K\r');
    process.stdout.write(msgFn(count));
    if (count-- === 0) {
      process.stdout.write('\u001b[?25h');
      process.stdout.write('\u001b[2K\r');
      clearInterval(timer);
      fn();
    }
  }, interval);
};

countdown(n => `Starting example in ${n}`, () => console.log('Lift off!'), 5);
