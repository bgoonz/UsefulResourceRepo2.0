// Array#filter

// Array#filter is an array method that runs/performs a function each time
// for every element of the array, and returns a new array
// needs to return a boolean
// if the boolean value is true, when run for an element, that element is saved in the new array
// if the boolean value is false, that element is not included in the new array
// like #forEach, #filter also passes the element, index, and array to the function given

let parks = ['Zion', 'Yellowstone', 'Acadia', 'Yosemite']

/* classic way:

    let yParks = [];
    for (let i = 0; i < parks.length; i++) {
        let park = parks[i];
        
        if (park[0] === 'Y) {
            yParks.push(park);
        }
    }

    console.log(yParks);

*/

// with Array#filter method:

let yParks = parks.filter(function(park) {
    return park[0] === 'Y';
});

console.log("Parks that begin with the letter 'Y':")
console.log(yParks);

let oParks = parks.filter(function(park) {
    return park.includes('o')
});

console.log("Parks that include the letter 'o':")
console.log(oParks);

let selectedParks = parks.filter(function(park) {
   return park.length > 7;
})

console.log("Parks with length greater than 7:");
console.log(selectedParks)



