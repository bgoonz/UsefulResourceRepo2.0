export function observable(value) {
	const subscribers = [];

	function set(newValue) {
		if (newValue === value) return;
		value = newValue;
		subscribers.forEach(fn => fn(value));
	}

	function update(fn) {
		set(fn(value));
	}

	function subscribe(fn) {
		subscribers.push(fn);
		fn(value);
		return function() {
			const index = subscribers.indexOf(fn);
			if (index !== -1) subscribers.splice(index, 1);
		};
	}

	return { set, update, subscribe };
}

export function readonly(start, value) {
	const subscribers = [];
	let stop;

	function set(newValue) {
		if (newValue === value) return;
		value = newValue;
		subscribers.forEach(fn => fn(value));
	}

	return {
		subscribe(fn) {
			if (subscribers.length === 0) {
				stop = start(set);
			}

			subscribers.push(fn);
			fn(value);

			return function() {
				const index = subscribers.indexOf(fn);
				if (index !== -1) subscribers.splice(index, 1);

				if (subscribers.length === 0) {
					stop();
					stop = null;
				}
			};
		}
	};
}

export function derived(...args) {
	const fn = args.pop();

	return readonly(set => {
		let inited = false;
		const values = [];

		const unsubscribers = args.map((arg, i) =>
			arg.subscribe(value => {
				values[i] = value;
				if (inited) set(fn(...values));
			})
		);

		inited = true;
		set(fn(...values));
		
		return function stop() {
			unsubscribers.forEach(fn => fn());
		};
	});
}
