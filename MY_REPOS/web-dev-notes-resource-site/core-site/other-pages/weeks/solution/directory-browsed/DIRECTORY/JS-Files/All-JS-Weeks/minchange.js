function minChange(coins, amount) {
	if (amount === 0) return 0;

	let numCoins = [];
	coins.forEach((coin) => {
		if (coin <= amount) {
			numCoins.push(minChange(coins, amount - coin) + 1);
		}
	});

	return Math.min(...numCoins);
}

// This solution utilizes memoization to solve minChange
function minChangeMemo(coins, amount, memo = {}) {
	// console.log('starting memo we are checking:', memo);
	if (amount in memo) return memo[amount];
	if (amount === 0) return 0;

	let numCoins = [];
	coins.forEach((coin) => {
		if (coin <= amount) {
			numCoins.push(minChangeMemo(coins, amount - coin, memo) + 1);
		}
	});
	// console.log('coins found:', numCoins);
	memo[amount] = Math.min(...numCoins);
	// console.log('post memo:', memo);
	return memo[amount];
}

// This solution utilizes tabulation to solve minChange
function minChangeTab(coins, amount) {
	const tab = new Array(amount + 1);
	tab.fill(Infinity);
	tab[0] = 0;
	for (let i = 0; i <= amount; i++) {
		if (tab[i] === Infinity) continue;
		coins.forEach((coin) => {
			if (i + coin <= amount && tab[i] + 1 < tab[i + coin]) {
				tab[i + coin] = tab[i] + 1;
			}
		});
	}
	return tab[tab.length - 1];
}

// console.log(minChange([ 1, 2, 5 ], 11)); // => 3, because 5 + 5 + 1 = 11
// console.log(minChange([ 1, 4, 5 ], 8)); // => 2, because 4 + 4 = 8
// console.log(minChange([ 1, 5, 10, 25 ], 15)); // => 2, because 10 + 5 = 15

const target = 60;

const startTime = new Date();
console.log('startTime', startTime);
console.log('result:', minChange([ 1, 5, 10, 25 ], target));
const endTime = new Date();
const elapsed = endTime - startTime;
console.log('endTime', endTime);
console.log('elapsed', elapsed);

const startTimeMemo = new Date();
console.log('startTimeMemo', startTimeMemo);
console.log('result:', minChangeMemo([ 1, 5, 10, 25 ], target));
const endTimeMemo = new Date();
const elapsedMemo = endTimeMemo - startTimeMemo;
console.log('endTimeMemo', endTimeMemo);
console.log('elapsedMemo', elapsedMemo);

const startTimeTab = new Date();
console.log('startTimeTab', startTimeTab);
console.log('result:', minChangeTab([ 1, 5, 10, 25 ], target));
const endTimeTab = new Date();
const elapsedTab = endTimeTab - startTimeTab;
console.log('endTimeTab', endTimeTab);
console.log('elapsedTab', elapsedTab);
