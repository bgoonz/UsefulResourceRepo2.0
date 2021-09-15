// Work through this problem on https://leetcode.com/problems/coin-change-2/ and use the specs given there.
// Feel free to use this file for scratch work.

// coins of different denominations
// total amount of money
// find the number of combinations that make up that amount
// assume you have an infinite number of each coin

// if there is only one coin, if it is > the amount, return 0
// all of the denominations have to be <= to the amount
// each time we find a combination that adds up to the amount, we need to store 
//  that combination

// amount = 5
// coins = [1, 2, 5]

// 5 = 5
// 5 = 2 + 2 + 1
// 5 = 2 + 1 + 1 + 1
// 5 = 1 + 1 + 1 + 1 + 1

// var change = function(amount, coins) {
//   var count = 0;
//   var possibilities = [];
//   coins.forEach(coin => {
//     if (coin === amount) {
//       count += 1
//     } else if (coin === 1) {
//       count += 1
//     } else {
//       let possibilities = amount / coin 
//       count += Math.floor(possibilities)
//     }
//   })

//   console.log(count)
//   return count
// }

var change = function(amount, coins, memo={}) {
  let key = amount + '-' + coins;
  if (key in memo) return memo[key];
  if (amount === 0) return 1;

  let currentCoin = coins[coins.length - 1]

  let total = 0;

  for (let qty = 0; qty * currentCoin <= amount; qty++) {
    total += change(amount - qty * currentCoin, coins.slice(0, -1), memo);
  }

  memo[key] = total;
  return memo[key]
}