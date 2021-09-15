
// Important takeaway here is being able to connect code patterns with complexities
// Doing an exact number of calculations (independent of input) -> constant O(1)
function constant_1( n ) {
  return n * 2 + 1;
}
// Looping an exact number of times (independent of input) -> constant O(1)
function constant_2( n ) {
  for ( let i = 1; i <= 20; i++ ) {
    console.log( i );
  }
}
// Recursive calls that divide the input -> logarithmic O(log n)
function logarithmic( n ) {
  console.log( n );
  if ( n <= 1 ) return;
  logarithmic( n / 2 );
}
// Loops that depend on the size of the input -> linear O(n)
function linear_1( n ) {
  for ( let i = 1; i <= n; i++ ) {
    console.log( i );
  }
}
// Recursive calls that depend on the size of the input (decrementing instead of dividing) -> linear O(n)
function linear_2( n ) {
  console.log( n );
  if ( n === 1 ) return;
  linear_2( n - 1 );
}
// Looping through input on each stack frame, while recursively dividing our data (commonly seen in sorts like merge and quick sort) -> loglinear O(n log n)
function loglinear( n ) {
  if ( n <= 1 ) return;
  for ( let i = 1; i <= n; i++ ) { // n calculations in each stack frame
    console.log( n );
  }
  loglinear( n / 2 ); // log n number of stack frames
  loglinear( n / 2 );
}
// Nesting loops that depend on the size of the input -> polynomial O(n^c)
// O(n^2)
function quadratic( n ) {
  for ( let i = 1; i <= n; i++ ) {
    for ( let j = 1; j <= n; j++ ) {
      console.log( `${i}, ${j}` );
    }
  }
}

// O(n^3)
function cubic( n ) {
  for ( let i = 1; i <= n; i++ ) {
    for ( let j = 1; j <= n; j++ ) {
      for ( let k = 1; k <= n; k++ ) {
        console.log( `${i}, ${j}, ${k}` );
      }
    }
  }
}
// Branching out on each recursive call, with the number of calls dependent on the size of the input -> exponential O(c^n)
// O(2^n)
function exponential_2n( n ) {
  console.log( n );
  if ( n === 1 ) return;
  exponential_2n( n - 1 );
  exponential_2n( n - 1 );
}

// O(3^n)
function exponential_3n( n ) {
  console.log( n );
  if ( n === 1 ) return;
  exponential_3n( n - 1 );
  exponential_3n( n - 1 );
  exponential_3n( n - 1 );
}
// When both the number of recursive calls and the number of branches made in the calls are dependent on the size of the input -> factorial O(n!)
function factorial( n ) {
  console.log( n );
  if ( n === 1 ) return;
  for ( let i = 1; i <= n; i++ ) { // Here we're making n branches on this frame
    factorial( n - 1 ); // Since we are decrementing, we're making n stack frames
  }
}
