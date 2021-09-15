let dog = {
    name: "Fido",
};
dog.bark = function() {
    console.log("bark bark!");
};
// this is the same thing as above just using Bracket Notation
dog["speak"] = function(string) {
    console.log("WOOF " + string + " WOOF!!!");
};
dog.bark(); // prints `bark bark!`
dog.speak("pizza"); // prints `WOOF pizza WOOF!!!`
let dog2 = {
    name: "Rover",
    bark: function() {
        console.log("bork bork!");
    },
    speak: function(string) {
        console.log("BORK " + string + " BORK!!!");
    },
};
// Notice that in the object above, we still separate the key-value pairs with commas.
// `bark` and `speak` are just keys with functions as values.
dog2.bark(); // prints `bork bork!`
dog2.speak("burrito"); // prints `BORK burrito BORK!!!`