// re https://stackoverflow.com/questions/62621666/how-can-i-reliably-merge-objects-from-these-2-arrays-and-loop-the-resulting-arra/62623714?noredirect=1#comment110766294_62623714

function with_nested_for_each([a, b]) {
	const result = [];

	a.forEach(p => {
		b.forEach(q => {
			if (p.code === q.code) {
				result.push(Object.assign({}, p, q));
			}
		});
	});
	
	return result;
}

function with_lookup(sources) {
	const codes = new Set( // using a set is an easy way to dedupe
		sources.map(source => source.map(d => d.code)).flat()
	);
	
	const lookups = sources.map(source => {
		const lookup = new Map();
		source.forEach(d => lookup.set(d.code, d));
		return lookup;
	});
	
	return Array.from(codes, code => {
		return Object.assign({}, ...lookups.map(d => d.get(code) || {}));
	});
}

function test(n) {
	const a = [];
	const b = [];

	for (let i = 0; i < n; i += 1) {
		const code = i;

		a.push({
			code,
			foo: Math.random()
		});

		b.push({
			code,
			bar: Math.random()
		});
	}

	console.time('with_nested_for_each');
	const result_1 = with_nested_for_each([a, b]);
	console.timeEnd('with_nested_for_each');

	console.time('with_lookup');
	const result_2 = with_lookup([a, b]);
	console.timeEnd('with_lookup');

	console.log({ result_1, result_2 });
}