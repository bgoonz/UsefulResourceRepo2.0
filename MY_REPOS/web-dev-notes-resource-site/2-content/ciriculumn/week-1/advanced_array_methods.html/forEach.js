// Array#forEach

// forEach is a method that can be called on an array that takes a function as an argument

[1, 2, 3].forEach( function() {});
let array = [1,2,3];
array.forEach(function() {});

// Under the hood, Javascript iterate over each element of the array and will run this function
// each time it visits each element

function printHi(){
    console.log("hi");
}

array.forEach(function(){
    console.log("hi");
});

// When invoking the function, each time, Javascript passes the function 3 things
// the element, the index, and the array

// In the above example, JS is passing this info, but our function we defined
// does not specify an parameters for us to be able to use the info

// If we're interested in this info, we can define our function to make use of the info

array.forEach(function(el, i, arr){

});

// what does forEach return?

// what's the difference between using for loop and forEach?

function myIncludes(){

}

// what does forEach return?








let parks = ['Zion', 'Yellowstone', 'Acadia', 'Yosemite']

/* classic way:

    for (let i = 0; i < parks.length; i++) {
        let park = parks[i];
        console.log(park);
    }

*/

// with Array#forEach method:

parks.forEach(function(ele, i, array) {
    console.log(ele);
    console.log(i);
    console.log(array);
    console.log('---')
});

let str = '';
parks.forEach(function(ele) {
    str += ele;
});
console.log(str);

// Array#forEach is an array method that runs/performs a function each time
// for every element of the array
// does not need a return statement

