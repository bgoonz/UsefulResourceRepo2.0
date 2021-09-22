// Array#map

// map runs a function for every element of the array
// passes the function the element, index, and array
// return value of each function call is mapped to a respective spot in the array


let parks = ['Zion', 'Yellowstone', 'Acadia', 'Yosemite']

/* classic way:

    let newParks = [];
    for (let i = 0; i < parks.length; i++) {
        let park = parks[i];
        newParks.push(park.toUpperCase());
    }

    console.log(newParks);
*/

// with Array#forEach method:

let newParks = parks.map(function(park) {
    return park.toUpperCase();
});

console.log(newParks);

let newParks2 = parks.map(function(park) {
    return park + ' national park'
});

console.log(newParks2)

// Array#map is an array method that runs a function each time
// for every element of the array,
// and 'maps' the return value of that function to a corresponding place in a new array

// needs a return statement otherwise will map 'undefined'
// like #forEach, #map passes the element, index, and array to the function given