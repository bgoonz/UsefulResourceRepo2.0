// Recursive function example
exports.recursive = function factorial( number ) {
  if ( number < 2 ) {
    return 1;
  }

  return number * factorial( number - 1 );
};

// Iterative solution
export function iterative( number ) {
  let result = 1;

  for ( let i = 1; i <= number; i++ ) {
    result *= i;
  }

  return result;
}

// Iterative using a reverse loop
export function iterativeReverse( number ) {
  let result = 1;

  while ( number ) {
    result *= number;
    number -= 1;
  }

  return result;
}
