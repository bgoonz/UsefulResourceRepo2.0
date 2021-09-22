/**
 * 
 * Bryan Guner
 * e: bryan.guner@gmail.com
 * w: 
 *
 */

// Return the nth fibonocci number
// fib(1) == 1
// fib(2) == 1
// fib(n) = fib(n-1) + fib(n-2) 

function fibonocci(value) {
  if(value == 1 || value == 2){
    return 1
  }
  return fibonocci(value - 1) + fibonocci(value - 2)
}

test('fibonocci', () => {
  expect(fibonocci(6)).toEqual(8)
});
