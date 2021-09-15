
## FAQ

### How can I run 100 async/promise-returning functions with only 5 running at once?

This is a good use-case for [`p-map`](https://github.com/sindresorhus/p-map). You might ask why you can't just specify an array of promises. Promises represent values of a computation and not the computation itself - they are eager. So by the time `p-map` starts reading the array, all the actions creating those promises have already started running. `p-map` works by executing a promise-returning function in a mapper function. This way the promises are created lazily and can be concurrency limited. Check out [`p-all`](https://github.com/sindresorhus/p-all) instead if you're using different functions to get each promise.

```js
const pMap = require('p-map');

const urls = [
	'https://sindresorhus.com',
	'https://avajs.dev',
	'https://github.com',
	…
];

console.log(urls.length);
//=> 100

const mapper = url => {
	return fetchStats(url); //=> Promise
};

pMap(urls, mapper, {concurrency: 5}).then(result => {
	console.log(result);
	//=> [{url: 'https://sindresorhus.com', stats: {…}}, …]
});
```

### How can I reduce nesting?

Let's say you want to fetch some data, process it, and return both the data and the processed data.

The common approach would be to nest the promises:

```js
const getData = id =>
	Storage
		.find(id)
		.then(data => {
			return process(data).then(result => {
				return prepare(data, result);
			});
		});
```

But we can take advantage of `Promise.all`:

```js
const getData = id =>
	Storage
		.find(id)
		.then(data => Promise.all([data, process(data)])
		.then(([data, result]) => prepare(data, result));
```

And even simpler with [async functions](https://www.2ality.com/2016/02/async-functions.html): *(Requires Babel or Node.js 8)*

```js
const getData = async id => {
	const data = await Storage.find(id);
	return prepare(data, await process(data));
};
```

### What about something like [`Bluebird#spread()`](http://bluebirdjs.com/docs/api/spread.html)?

Bluebird:

```js
Promise.resolve([1, 2]).spread((one, two) => {
	console.log(one, two);
	//=> 1 2
});
```

Instead, use [destructuring](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment):

```js
Promise.resolve([1, 2]).then(([one, two]) => {
	console.log(one, two);
	//=> 1 2
});
```

### What about something like [`Bluebird.join()`](http://bluebirdjs.com/docs/api/promise.join.html)?

Bluebird:

```js
Promise.join(p1, p2, p3, (r1, r2, r3) => {
	// …
});
```

Instead, use an [async function](https://jakearchibald.com/2014/es7-async-functions/) and [destructuring](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment):

```js
const [r1, r2, r3] = await Promise.all([p1, p2, p3]);
// …
```

### How do I break out of a promise chain?

You might think you want to break out ("return early") when doing conditional logic in promise chains.

Here you would like to only run the `onlyRunConditional` promises if `conditional` is truthy.

```js
alwaysRun1()
	.then(() => alwaysRun2())
	.then(conditional => conditional || somehowBreakTheChain())
	.then(() => onlyRunConditional1())
	.then(() => onlyRunConditional2())
	.then(() => onlyRunConditional3())
	.then(() => onlyRunConditional4())
	.then(() => alwaysRun3());
```

You could implement the above by [abusing the promise rejection mechanism](https://github.com/sindresorhus/p-break). However, it would be better to branch out the chain instead. Promises can not only be chained, but also nested and unnested.

```js
const runConditional = () =>
	onlyRunConditional1()
		.then(() => onlyRunConditional2())
		.then(() => onlyRunConditional3())
		.then(() => onlyRunConditional4());

alwaysRun1()
	.then(() => alwaysRun2())
	.then(conditional => conditional && runConditional())
	.then(() => alwaysRun3());
```
