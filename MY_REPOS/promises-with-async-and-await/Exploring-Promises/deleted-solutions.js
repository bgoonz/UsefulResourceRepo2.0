/*//----------------------------------------------------------------------------------------- */
/*//---------------------------------Phase 1: async----------------------------------------- */
/*//----------------------------------------------------------------------------------------- */
//In your file, create two similar functions.
//Each can return a number or string.
//Use the console to log the calls to both functions.
//console.log('num1', num1());
//console.log('num2', num2());
/*
num1 1
num2 Promise { 2 }
*/
//add another call to the async function and attach the then function to get its result and log it.
num2().then( result => console.log( result ) );
/*
num1 1
2
*/
//!Whenever the async keyword is used, the function automatically returns a promise.
/*//----------------------------------------------------------------------------------------- */
/*//---------------------------------Phase 2: await----------------------------------------- */
/*//----------------------------------------------------------------------------------------- */
/*
 Declare a constant that awaits the call to your other async function and
 logs the value.
 Make sure you remember to call your new function so it will run
 (since functions are only stored, but not run, when defined).
*/
/*//----------------------------------------------------------------------------------------- */
/*//---------------------------------Phase 3: DIY Promise----------------------------------------- */
/*//----------------------------------------------------------------------------------------- */
/*//----------------------------------------------------------------------------------------- */
/*//---------------------------------Phase 4: And then...----------------------------------------- */
/*//----------------------------------------------------------------------------------------- */
/*
use then to wait for a promise; even a custom one.
create another new Promise and attach .then() to it.
*/
// my promise is: DONE!!!
// then my other promise is done!
/*//----------------------------------------------------------------------------------------- */
/*//---------------------------------Phase 5:  About setTimeout----------------------------------------- */
/*//----------------------------------------------------------------------------------------- */
//setTimeout does not follow the Promises pattern.
//However, you could create your own wait function to remedy this
//-->an async function returns a promise
//-------- See if you can cause a two-second pause before a message displays.
//all waiting can use the same flow in your code
//regardless of whether it is a file read or write, web calls, or even timeout! 😃
/*
2
waiting 2
my promise is: DONE!!!
then my other promise is done!
do now!
*/
/*//----------------------------------------------------------------------------------------- */
/*//---------------------------------Phase :Reject-Catch----------------------------------------- */
/*//----------------------------------------------------------------------------------------- */
//Explore when the Promise triggers reject instead of resolve
//Create a  function that returns a promise
// Give it one argument that is a random value, and use that value
//to determine if the promise is successful (resolve) or unsuccessful (reject)
/*
In order to test this, you may want to use a loop (e.g. for loop)
to call it several times, and hopefully see both success and failure.
For your first experiment, use .then() and .catch() to handle the two cases.
|
you can also use the wait promise you created above in a chain with the random promise.
-------------------------------------------------------------------
-------------------------------------------------------------------
*/
*/
/*//----------------------------------------------------------------------------------------- */
/*//----------------Phase 7 :try ... await ... catch----------------------------------------- */
/*//----------------------------------------------------------------------------------------- */
//!create a second version of the functionality above using the await approach.
//----> remember that calls to await must be within an async function.
//-------->  the wait promise you create only returns successfully and never returns a value
//----------------> call using await wait(<your timeout here>)
//------------------------> when using await with a promise that calls reject,
//------------------------> that wrapping the call in a try block will trigger the catch block in the error case.
// call your function in a for loop again if you'd like to see a variety of results.
/*
*/
/*//----------------------------------------------------------------------------------------- */
/*//----------------Phase 8: Appreciate asynchronous functions----------------------------------------- */
/*//----------------------------------------------------------------------------------------- */
//!appreciate the asynchronous nature of Promises, you may add one additional console.log to the end of your file.
