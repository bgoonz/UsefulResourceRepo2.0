let me = {
    name: "Ian",
    instruments: ['bass', 'synth', 'guitar'],
    siblings: {
        brothers: ['Alistair'],
        sisters: ['Meghan']
    }
}

let {
    name,
    instruments: musical_instruments,
    siblings: {
        sisters
    }
} = me;

console.log(sisters);

function printInstruments({
    instruments
}) {
    console.log(instruments);
}
printInstruments(me);

function printSiblings({
    siblings: {
        sisters,
        brothers
    }
}) {
    console.log("Sisters", sisters);
    console.log("Brothers", brothers);
}

printSiblings(me);

//rest parameters
// combines parameters into array

...parameterName

splice is an example of where we 've seen this before

let arr = 'my dog has fleas'.split(' ');
arr.splice(3, 1, 'trees')

    //spread operator
    // take an arrray and spread them into arguments

    ...argContainer

OR

// take an object or array and spread their elements/attributes into another object or array

function multiply(multiplier, ...theArgs) {
    return theArgs.map(function(element) {
        return multiplier * element
    })
}

let arr = multiply(2, 1, 2, 3)
console.log(arr)

let me = {
    name: "Ian",
    instruments: ['bass', 'synth', 'guitar'],
    siblings: {
        brothers: ['Alistair'],
        sisters: ['Meghan']
    }
}

let countryArr = ['USA', 'Canada', 'UK'];
//me[countries] = countryArr;

let myCountries = {
    'countries': countryArr
};

let newMe = {
    ...me,
    ...countries
}