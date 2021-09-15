//! Phase 1:
//- create two similar functions.
//- Each can return a number or string. 
//-Before the second function, place the async keyword. 
//-Use the console to log the calls to both functions.

//function num1() {
//    return 1;
//}
//async function num2() {
//    return 2;
//}
//console.log( 'num1', num1() ); //num1 1
//console.log( 'num2', num2() ); //num2 Promise {2}

//-When you run your program (node promises.js ), you should see something like this:
/*
 *   num1 1
 *   num2 Promise {
 *       2
 *   }
 */
//-Notice that the "plain" function just returns the value 
//-the "async" function returns a promise. 
//#Now add another call to the async function and attach the then function to get its result and log it.

//num2().then( (result) => console.log( result ) ); //2

//!Phase 2: await
//-Declare a constant that awaits the call to your other async function and logs the value. 
//-remember to call your new function so it will run 
//-(since functions are only stored, but not run, when defined).


//-Run your program again and now you should see something like this:
//*waiting 2

//-await stops all flow until the promise returns.

//!Phase 3: DIY Promise ( custom Promise so that you can have some delay before the promise is resolved. )
//#If you'd like to use await again, then you will need to wrap your experiment in a function (and call it).


//---------------------------------------------------------------------------------------
////                  |
//// official answer  ˅
/*
async function waitForMyPromise() {
    const promise = new Promise( ( resolve ) => {
        setTimeout( () => {
            resolve( 'done!!!' );
        }, 1000 )
    } );

    const result = await promise;
    console.log( 'my promise is', result );
}
waitForMyPromise();
*/
//-This time when you run your program, you will need to wait one second (1000 milliseconds) before the final message will appear.
//*my promise is done!!!
//!Phase 4: And then ...
//- you could also use (then) to wait for a promise; even a custom one. 
//- you can create another new Promise and attach .then() to it.

//new Promise( ( resolve ) => {
//    setTimeout( () => {
//        resolve( '2' );
//    }, 2000 )
//} ).then( ( resu ) => console.log( 'my promise:', resu, 'my other promise:', resu ) ); //my promise: 2 my other promise: 2


/*
new Promise( ( resolve ) => {
    setTimeout( () => {
        resolve( 'done!' );
    }, 1500 )
} ).then( r => console.log( 'then my other promise is', r ) );
*/
//-Now, when running your program the output would look something like this.
//*my promise is done!!!
//*then my other promise is done!!!






//!Phase 5: About setTimeout:

//-setTimeout does not follow the Promises pattern.
//-you could create your own wait function to remedy this
//-you already discovered that an async function returns a promise.


function wait( ms ) {
    return new Promise( ( resolve ) => {
        setTimeout( resolve, ms ) //*resolve of new promise is similar to .then which calls setTimeout and passes resolve into the callback of the setTimeout function.
    } );
}
wait();

//-all waiting can use the same flow in your code regardless of whether it is a file read or write, web calls, or even timeout! 😃

//#Go ahead and try it out. See if you can cause a two-second pause before a message displays.
/*
async function doStuff() {
    await wait( 2000 )
    console.log( 'The waiting is over!' )
}
doStuff();
*/

//!Phase 6: reject ... catch

//-explore the negative side of async calls and Promises for those times they are unable to do what they were asked to do. 
//-In other words, the Promise triggers reject instead of resolve .


//#Start by creating yourself a function that returns a promise. 
//#Give it one argument that is a random value,
//# and use that value to determine if the promise is successful (resolve ) or unsuccessful (reject ).



/*
const tryRandomPromise = ( random ) => new Promise( ( resolve, reject ) => {
    if ( random > 0.5 ) {
        resolve( 'success!!!' );
    } else {
        reject( 'random error' );
    }
} );

*/


/*
n order to test this, you may want to use a loop( e.g.for loop ) to call it several times, and hopefully see both success and failure.For your first experiment, use.then() and.catch() to handle the two cases.

For an added challenge, you can also use the wait
promise you created above in a chain with the random promise.

for ( let i = 1; i < 10; i++ ) {
    const random = Math.random();
    wait( 2000 + random * 1000 )
        .then( () => tryRandomPromise( random ) )
        .then( result => console.log( 'random try #', i, result ) )
        .catch( error => console.error( 'random try #', i, error ) );
}

In this example, the wait is a minimum of 2 seconds and a maximum of 3 seconds.That is because Math.random() returns a value between 0 and 1. This choice was made so the new messages will appear after the other experiments.Of course, you can adjust the timeouts anyway you 'd like!

Because the same random number is used with the wait and the random promise, the output shows all the errors before the successes( in random numeric order ).
*/