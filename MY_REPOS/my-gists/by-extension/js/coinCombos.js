/*
Recursive Solution How do we go about defining a recursive function? Function definition — Our function should accept parameters. This way we can always test the value of these params to check whether or not we have reached the base case. Defining our base case — What is the trivial case, where we already know the solution for the problem. Make the problem smaller — Incrementing/decrementing our parameters which are passed into every recursive function call. If we don’t do this, our problem will never be terminated, and we will hit an infinite loop. Let’s start off with thinking about our base case. What would be really easy to solve? Once we understand this, we will have a clearer understanding of how our function declaration should look like. Handling the base cases Case 1: What if the amount of change we are required to return is equal to 0? This is easy, there is only 1 way to returns 0 cents. We shouldn’t return anything at all. Case 2: What if we have to return a certain amount of change (amount > 0), but have no coins? In this case, we should return 0, b/c we have exactly zero ways to return change. Case 3: What if we need to return a negative amount of change? That’s impossible! So we can return 0 in this case as well.
*/
function numWaysRecursive( coinValues, totalCoins, amount ) {
  if ( amount === 0 ) return 1; // Perfect!
  if ( amount < 0 ) return 0; // No solution exists for negative amount
  if ( totalCoins < 0 && amount > 0 ) return 0; // We don't have coins left!
  console.log(
    "checking ways to make " +
    amount +
    " with " +
    coinValues.slice( totalCoins )
  );
  return (
    numWaysRecursive(
      coinValues,
      totalCoins,
      amount - coinValues[ totalCoins ]
    ) + numWaysRecursive( coinValues, totalCoins - 1, amount )
  );
}
//-------------------------------------------------------------------------------
//-------------------W Memoization (Below)---------------------------------------
//-------------------------------------------------------------------------------
function numWaysMemo( amount, coinValues ) {
  // intialize an array of zeros with indices up to amount
  let waysOfDoingNcents = [];
  for ( let i = 0; i <= amount; i++ ) {
    waysOfDoingNcents[ i ] = 0;
  }
  // there is 1 way to renturn 0 cents
  waysOfDoingNcents[ 0 ] = 1;
  for ( let j = 0; j < coinValues.length; j++ ) {
    // we can only start returning change with coins in our coinValues
    let coin = coinValues[ j ];
    // we start bottom up, each time reducing change amout with curr coin.
    for ( let higherAmount = coin; higherAmount <= amount; higherAmount++ ) {
      let higherAmountRemainder = higherAmount - coin;
      // ways to create change is equivalent to reducing the problem to a known problem
      // and gaining all the ways to solve for smaller problems
      waysOfDoingNcents[ higherAmount ] +=
        waysOfDoingNcents[ higherAmountRemainder ];
    }
  }
  return waysOfDoingNcents[ amount ];
}
let coinValues = [ 1, 2, 3 ];
let amount = 4;
console.log( numWaysRecursive( coinValues, coinValues.length - 1, amount ) );
console.log( numWaysMemo( amount, coinValues ) );
//RESULT:
/*
checking ways to make 4 with 3
checking ways to make 1 with 3
checking ways to make 1 with 2, 3
checking ways to make 1 with 1, 2, 3
checking ways to make 4 with 2, 3
checking ways to make 2 with 2, 3
checking ways to make 2 with 1, 2, 3
checking ways to make 1 with 1, 2, 3
checking ways to make 4 with 1, 2, 3
checking ways to make 3 with 1, 2, 3
checking ways to make 2 with 1, 2, 3
checking ways to make 1 with 1, 2, 3
4
4
*/
