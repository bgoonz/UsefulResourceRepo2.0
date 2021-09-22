/*********************************************************************
Write a function, minChange(coins, amount), that accepts an array of coin values
and a target amount as arguments. The method should the minimum number of coins
needed to make the target amount. A coin value can be used multiple times.

Solve this with memoization first, and then try a tabulated version.

Examples:

minChange([1, 2, 5], 11)         // => 3, because 5 + 5 + 1 = 11
minChange([1, 4, 5], 8))         // => 2, because 4 + 4 = 8
minChange([1, 5, 10, 25], 15)    // => 2, because 10 + 5 = 15
minChange([1, 5, 10, 25], 100)   // => 4, because 25 + 25 + 25 + 25 = 100
*********************************************************************/

// memoized version

function minChange(coins, amount, memo = {}) {
  if (amount === 0) return 0;

  if (amount in memo) return memo[amount];

  let num_coins = [];
  coins.forEach((coin) => {
    if (coin <= amount) {
      num_coins.push(minChange(coins, amount - coin, memo) + 1);
    }
  });

  memo[amount] = Math.min(...num_coins);
  return memo[amount];
}

// tabulated version

function minChange(coins, amount) {
  let table = new Array(amount + 1).fill(Infinity);
  table[0] = 0;

  coins.forEach((val) => {
    for (let amt = 0; amt < table.length; amt++) {
      for (let qty = 0; qty * val <= amt; qty++) {
        remainder = amt - qty * val;
        attempt = table[remainder] + qty;
        if (attempt < table[amt]) table[amt] = attempt;
      }
    }
  });

  return table[amount];
}

module.exports = { minChange };
