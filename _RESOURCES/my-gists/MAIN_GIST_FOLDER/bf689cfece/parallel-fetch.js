// setup
const wait = value => new Promise(resolve => {
  setTimeout(() => resolve(value), 3000);
});
  
const fetchFoo = () => wait('foo');
const fetchBar = () => wait('bar');
const fetchBaz = () => wait('baz');

const fetchDataSlowly = async time => {
  // Bad. Requests run in serial waterfall.
  const foo = await fetchFoo();
  const bar = await fetchBar();
  const baz = await fetchBaz();
  return { foo, bar, baz, time: Date.now() - time };
};

fetchDataSlowly(Date.now())
  .then(({ foo, bar, baz, time }) => {
    console.log('fetched slowly:', foo, bar, baz, time
    );
  });

  
const fetchDataQuickly = async time => {
  // Good. Fetches run in parallel.
  const [
    foo,
    bar,
    baz
  ] = await Promise.all([
    fetchFoo(),
    fetchBar(),
    fetchBaz()
  ]);
  return { foo, bar, baz, time: Date.now() - time };
};

fetchDataQuickly(Date.now())
  .then(({ foo, bar, baz, time}) => {
    console.log('fetched quickly:', foo, bar, baz, time);
  });


const fetchDataQuickly2 = async time => {
  // Also good.
  const fooReady = fetchFoo();
  const barReady = fetchBar();
  const bazReady = fetchBaz();

  const foo = await fooReady;
  const bar = await barReady;
  const baz = await bazReady;
  return { foo, bar, baz, time: Date.now() - time };
};

fetchDataQuickly2(Date.now())
  .then(({ foo, bar, baz, time}) => {
    console.log('fetched quickly:', foo, bar, baz, time);
  });
 