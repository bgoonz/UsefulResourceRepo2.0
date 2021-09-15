//? #1.)-------------------------------------------------------------
function myFunction( n ) {
    return n * 2 + 1;
}
/*
*Answer:
!Constant: O( 1 )
*/
//? #2.)-------------------------------------------------------------
function myFunction( n ) {
    for ( let i = 1; i <= 100; i++ ) {
        console.log( i );
    }
}
/*
*Answer:
!O( 1 ): Constant;
!Why ? Because there are a fixed number of loops in the for loop.
!The for loop is not dependent upon n.
*/
//? #3.)-------------------------------------------------------------
function myFunction( n ) {
    if ( n <= 1 ) return;
    myFunction( n / 2 );
}
/*
*Answer:
!logarithmic: O( log( n ) ): because the recursion will half the size of n each time
*/
//? #4.)-------------------------------------------------------------
function myFunction( n ) {
    for ( let i = 1; i <= n; i++ ) {
        console.log( i );
    }
}
/*
*Answer:
!Linear : O(n) : Because the for loop will iterate n times
*/
//? #5.)-------------------------------------------------------------
function myFunction( n ) {
    if ( n === 1 ) return;
    myFunction( n - 1 )
}
/*
*Answer:
!Linear: O( n ): Because the recursive call will be made n times.
*/
//? #6.)-------------------------------------------------------------
function myFunction( n ) {
    if ( n <= 1 ) return;
    for ( let i = 1; i <= n; i++ ) {
        console.log( i );
    }
    myFunction( n / 2 );
    myFunction( n / 2 );
}
/*
*Answer:
!O(n * log(n)) : LogLinear because the for loop will run n times;
! then the myFunction will be called recursively 2(log(n)) so we can drop the constant and consider log(n). 
!Combining the for loop time complexity of O(n) and the recursive calls of log(n) we have O(n*log(n));
*/
//? #7.)-------------------------------------------------------------
function myFunction( n ) {
    for ( let i = 1; i <= n; i++ ) {
        for ( let j = 1; j <= n; j++ ) {
            for ( let k = 1; k <= n; k++ ) {}
        }
    }
}
/*
*Answer:
! Polynomial O(n^3) : Because the outer for (i) will run n times,
! and for each time the outer loop runs the inner (j) will run n times 
!- which is n * n - and there's another inner loop (k) that will run n times 
!- so we have n*n*n which is n3 so we have O(n3)
*/
//? #8.)-------------------------------------------------------------
function myFunction( n ) {
    if ( n === 1 ) return;
    myFunction( n - 1 );
    myFunction( n - 1 );
}
/*
*Answer:
!Exponential: O( 2^n ):
! Because each call will make two more recursive calls so they will run a total of 2n times, or O( 2n )
*/
//? #9.)-------------------------------------------------------------
function myFunction( n ) {
    if ( n === 0 ) return;
    myFunction( n - 1 );
    myFunction( n - 1 );
    myFunction( n - 1 );
}
/*
*Answer:
!Exponential: O( 3^n ): Because each call will make 3 more recursive calls, n times.
*/
//? #10.)-------------------------------------------------------------
function myFunction( n ) {
    if ( n === 1 ) return;
    for ( let i = 1; i <= n; i++ ) {
        myFunction( n - 1 );
    }
}
/*
*Answer:
! Factorial : O(n!) : The code is recursive, 
!but the number of recursive calls made in a a single stack frame depends on the input.
! So in this case, the for loop executes n times;
! but within the for loop the recursive call is made n-1 times. 
!So you have n * n-1 * n-2 * n-3 ... or O(n!);
*/


//?-******************************SORTING ALGORITHMS*****************************************/
//*Identify the type of sort, the time complexity, and the space complexity of the following code:
function swap( array, idx1, idx2 ) {
    [ array[ idx1 ], array[ idx2 ] ] = [ array[ idx2 ], array[ idx1 ] ]
}

function whichSort( array ) {
    let swapped = true;

    while ( swapped ) {
        swapped = false;

        for ( let i = 0; i < array.length; i++ ) {
            if ( array[ i ] > array[ i + 1 ] ) {
                swap( array, i, i + 1 );
                swapped = true;
            }
        }
    }
}
/*
 !Bubble Sort.Time complexity O( n^2 );
 !Space Complexity of O( 1 )
*/
//*Identify the type of sort as well as the time and space complexity of the following code:
function swap( arr, index1, index2 ) {
    [ arr[ index1 ], arr[ index2 ] ] = arr[ index2 ], arr[ index1 ] ];
}

function whichSort( list ) {
    for ( let i = 0; i < list.length; i++ ) {
        let min = i;

        for ( let j = i + 1; j < list.length; j++ ) {
            if ( list[ j ] < list[ min ] ) {
                min = j;
            }
        }
        if ( min !== i ) {
            swap( list, i, min );
        }
    }
}
/*
 !Selection Sort: Time complexity O( n^2 ) and O( 1 ) space complexity
*/
//*Identify the type of sort, as well as the time and space complexity of the following code:
function mySort( list ) {
    for ( let i = 1; i < list.length; i++ ) {
        value = list[ i ];
        hole = i;

        while ( hole > 0 && list[ hole - 1 ] > value ) {
            list[ hole ] = list[ hole - 1 ];
            hole--;
        }
        list[ hole ] = value;
    }
}
/*
!Insertion Sort.Time Complexity: O( n^2 ), Space complexity: O( 1 )
*/
//*Identify the type of sort, as well as its time and space complexity for the code below:
function doSomething( array1, array2 ) {
    let result = []
    while ( array1.length && array2.length ) {
        if ( array1[ 0 ] < array2[ 0 ] ) {
            result.push( array1.shift() );
        } else {
            result.push( array2.shift() );
        }
    }
    return [ ...result, ...array1, ...array2 ];
}

function sortSomething( array ) {
    if ( array.length <= 1 ) return array;

    const mid = Math.floor( array.length / 2 );
    const left = sortSomething( array.slice( 0, mid ) );
    const right = sortSomething( array.slice( mid ) );

    return doSomething( left, right );
}
/*
!Merge Sort: Time Complexity O( n log( n ) ) 
!since we split the array in half each time, the number of calls is O( log( n ).
!The while loop inside the doSomething( aka merge ) method will go through all of the array - n times.
!So it 's O(n * log(n));
!Space complexity is O( n ), 
!because we are copying the array n times. [ Yes, there are two copies, but each is half of the array. ]
*/

//*Identify the type of sort, the time and space complexity of the sort in the following code:
function mySort( array ) {
    if ( array.length <= 1 ) return array;

    let pivot = array.shift();

    let left = array.filter( x => x < pivot );
    let right = array.filter( x => x >= pivot );

    let sortedLeft = mySort( left );
    let sortedRight = mySort( right );

    return [ ...sortedLeft, pivot, ...sortedRight ];
}
//!QuickSort: Time complexity of O( n2 ) because sort on the left is O( n ) and sort on the right is O( n ).
//!Space complexity of Quick Sort is O( n );

//*Identify the type of sort below, and it 's time and space complexities:
function anotherSearch( list, target ) {
    if ( list.length === 0 ) return false;

    let mid = Math.floor( list.length / 2 );

    if ( list[ mid ] === target ) {
        return true;
    } else if ( list[ mid ] > target ) {
        return anotherSearch( list.slice( 0, mid ), target );
    } else {
        return anotherSearch( list.slice( mid + 1 ), target );
    }
}

//!Binary Search - Time complexity O( log( n ) );

//!Space complexity O( n )


//?-*************************USING MEMO AND TABULATION TO REDUCE TIME COMPLEXITY********************************/
//*Transform the following fibonacci function to use memoization to reduce the time complexity from polynomial time:
const fibonacci = ( n ) => {
    if ( ( n === 1 ) || ( n === 2 ) ) {
        return 1;
    }
    return fibonacci( n - 1 ) + fibonacci( n - 2 );
}
//*--------------------------------------------------------------
const fibonacci = ( n, memo = {
    0: 0,
    1: 1
} ) => {
    if ( n in memo ) return memo[ n ];
    memo[ n ] = fibonacci( n - 1, memo ) + fibonacci( n - 2, memo );
    return memo[ n ];
};
//!--------------End of problem----------------------------------------------------------------------------------------

//*Apply tabulation to the iterative version of fibonacci to make it less than polynomial time:
function fib( n ) {
    //! memoization is usually recursive whereas tabulation is often iterative/
    //! Tabulation
    let table = new Array( n + 1 ); //! this line is in most tabulation problems... the argument is the length of the new array
    //* and array is stored in concurrent memory locations so
    //table[0]=0;
    table[ 1 ] = 1; //fib(0)=0
    table[ 2 ] = 1; //fib(1)=1
    for ( let i = 2; i <= n; i++ ) { // one loop that goes through entire input so time complexity is O(n)
        //table[2]=table[0]+table[1];
        table[ i ] = table[ i - 1 ] + table[ i - 2 ];
        /* 				
        if(n===1 || n===2)return 1;
        return fib(n-1)+fib(n-2)l;
        */
    }

    return table[ n ]; //fib(n)

}
//!--------------End of problem----------------------------------------------------------------------------------------
