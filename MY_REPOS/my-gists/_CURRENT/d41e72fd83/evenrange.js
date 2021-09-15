/***********************************************************************
Write a recursive function called `flatten` that takes a single array with
any number of nested arrays and returns and array with all the nested
contents on one level.

Examples:

flatten([]); // => []
flatten([1, 2]); // => [1, 2]
flatten([1, [2, [3]]]); // => [1, 2, 3]
***********************************************************************/

function flatten(arr) {
  let newArray = [];

  arr.forEach(function (contents) {
    if (Array.isArray(contents)) {
      newArray.push(...flatten(contents));
    } else {
      newArray.push(contents);
    }
  });

  return newArray;
}

/**************DO NOT MODIFY ANYTHING UNDER THIS LINE*****************/
module.exports = flatten;

/***********************************************************************
Below we've declared a new object for a calculator that has a property
representing the total - which is currently set to 0.

Write four methods within this object named:
1. add(num) - add the num arg to the total
2. subtract(num) - subtract the num arg from the total
3. divide(num) - divide the total by the num arg
4. multiply(num) - multiply the total by the num arg

Each of the above methods should return the total.

Examples:

calculator.add(50); // => returns 50
calculator.subtract(35); // => returns 15
calculator.multiply(10); // => returns 150
calculator.divide(5); // => returns 30
calculator.total // => returns 30

***********************************************************************/

const calculator = {
  total: 0,
  add: function (num) {
    this.total += num;
    return this.total;
  },
  subtract: function (num) {
    this.total -= num;
    return this.total;
  },
  divide: function (num) {
    this.total /= num;
    return this.total;
  },
  multiply: function (num) {
    this.total *= num;
    return this.total;
  },
};

module.exports = calculator;

/***********************************************************************
Write a function `keyInObjectArray(objArray, keyString)` that takes in an array of 
objects as the first parameter and a string as the second. The `keyInObjectArray` 
will return `true` if any of the objects contains the `keyString` as a key within them, and 
`false` if not.


Examples:
let objArray = [
  { name: "Rupert" },
  { age: 42 },
  { planet: "Earth", system: "Milky Way" }
];

keyInObjectArray(objArray, 'planet'); // => true
keyInObjectArray(objArray, 'age'); // => true
keyInObjectArray(objArray, 'food'); // => false
keyInObjectArray(objArray, 'animal'); // => false

***********************************************************************/

function keyInObjectArray(objArray, keyString) {
  let keyFound = false;

  // you can't explicitlyreturn from within a `forEach` function so
  // the way we can get around that is by setting a variable for our boolean
  // and flipping it within our case statement
  objArray.forEach(function (obj) {
    if (obj[keyString] !== undefined) {
      keyFound = true;
    }
  });

  return keyFound;
}

module.exports = keyInObjectArray;

/******************************************************************************
Write a function reverseString(string) that takes in a hyphenated string and
returns a the hyphenated string reversed.

Examples:

reverseString("Go-to-the-store") => "store-the-to-Go"
reverseString("Jump,-jump-for-joy") => "joy-for-jump-Jump,"
*******************************************************************************/

function reverseString(string) {
  let words = string.split("-");
  let reversed = [];

  for (let i = words.length - 1; i >= 0; i--) {
    let word = words[i];
    reversed.push(word);
  }

  let reversedStr = reversed.join("-");
  return reversedStr;
}

/**************DO NOT MODIFY ANYTHING UNDER THIS  LINE*************************/
module.exports = reverseString;

/***********************************************************************
Write a function `breakDownObj(obj)` that takes in an object as a parameter 
and returns an array containing:  all the keys from the object **and** all the 
values of the object.

**Hint**: Use spread syntax to spread out elements into an array!


Examples:
let object1 = {name: 'Rupert', age: 5, speak: 'Meow'};
breakDownObj(object1); // => [ 'name', 'age', 'speak', 'Rupert', 5, 'Meow' ]

let object2 = {location: 'NY', borough: 'Brooklyn'};
breakDownObj(object2); // => [ 'location', 'borough', 'NY', 'Brooklyn' ]
***********************************************************************/

function breakDownObj(obj) {
  let keys = Object.keys(obj);
  let values = Object.values(obj);

  return [...keys, ...values];
}

module.exports = breakDownObj;

/******************************************************************************
Write a function intersect(arr1, arr2) that takes in two arrays and returns a
new array containing the elements common to both arr1 and arr2.

Hint: use indexOf

Examples:

intersect(['a', 'b', 'c', 'd'], ['b', 'd', 'e']) => [ 'b', 'd' ]
intersect(['a', 'b', 'c'], ['x', 'y', 'z']) => []
*******************************************************************************/

function intersect(arr1, arr2) {
  let commonEles = [];

  for (let i = 0; i < arr1.length; i++) {
    let ele = arr1[i];
    if (arr2.indexOf(ele) > -1) {
      commonEles.push(ele);
    }
  }

  return commonEles;
}

/**************DO NOT MODIFY ANYTHING UNDER THIS  LINE*************************/
module.exports = intersect;

/***********************************************************************
Below we've declared a function named `makeDog` for you that will return an object
representing a dog.

You will be writing two new methods on the object returned by `makeDog` below. 
These two methods wil be: changeName(newName) and speak(word).
The speak function will intake a word and then return a sentence with the name
of the dog saying that word. The changeName function will intake a newName and
will set the dog object's name to be the passed in name. See below for examples:


Examples:
let dog1 = makeDog(); // returns an object 
console.log( dog1.name ); // Jet
console.log( dog1.speak( "hello" ) ); // Jet says hello
console.log(dog1.changeName("Freyja")); // Freyja
console.log(dog1.name); // Freyja
console.log(dog1.speak("hello")); // Freyja says hello

let dog2 = makeDog();
console.log(dog2.name); // Jet

***********************************************************************/

function makeDog() {
  return {
    name: "Jet",
    // here we have to use an anonymous function to ensure the context
    // is set correctly when this method is invoked
    speak: function (word) {
      return this.name + " says " + word;
    },
    changeName: function (newName) {
      this.name = newName;
      return this.name;
    },
  };
}

module.exports = makeDog;

/***********************************************************************
Write a function `mirrorArray(array)` that takes in an array as an
argument and returns a new array "mirrored" as shown in the examples:

Examples:

mirrorArray([1,2,3]); // => [ 1, 2, 3, 3, 2, 1 ]
mirrorArray(['a', 'b', 'c', 'd']); // => [ 'a', 'b', 'c', 'd', 'd', 'c', 'b', 'a' ]
***********************************************************************/

const mirrorArray = (array) => {
  let newArray = [];

  for (let i = 0; i < array.length; i += 1) {
    let el = array[i];
    newArray.push(el);
  }

  for (let i = array.length - 1; i >= 0; i -= 1) {
    let el = array[i];
    newArray.push(el);
  }

  return newArray;
};

module.exports = mirrorArray;

/******************************************************************************
Write a function fuzzBizz(max) that returns an array of numbers under
the max. Each number should be either divisible by 2 or 7, BUT NOT BOTH.

Examples:

fuzzBizz(17) => [ 2, 4, 6, 7, 8, 10, 12, 16 ]
fuzzBizz(30) => [ 2, 4, 6, 7, 8, 10, 12, 16, 18, 20, 21, 22, 24, 26 ]
*******************************************************************************/

function fuzzBizz(max) {
  let nums = [];

  for (let i = 0; i < max; i++) {
    if ((i % 2 === 0 || i % 7 === 0) && i % 14 !== 0) {
      nums.push(i);
    }
  }

  return nums;
}

/**************DO NOT MODIFY ANYTHING UNDER THIS  LINE*************************/
module.exports = fuzzBizz;

/***********************************************************************
Write a function `valuePair(obj1, obj2, key)` that takes in two objects
and a key (string). The function should return an array containing the
corresponding values of the objects for the given key.

Examples:
let object1 = {name: 'One', location: 'NY', age: 3};
let object2 = {name: 'Two', location: 'SF'};
valuePair(object1, object2, 'location'); // => [ 'NY', 'SF' ]
valuePair(object1, object2, 'name'); // => [ 'One', 'Two' ]
***********************************************************************/

function valuePair(obj1, obj2, key) {
  let val1 = obj1[key];
  let val2 = obj2[key];
  let arr = [val1, val2];

  return arr;
}

module.exports = valuePair;

/***********************************************************************
Write a function `appleCounter(appleObj)` that takes in an object containing a 
number of keys that have the word 'apple' contained within them. The `appleCounter`
function will be in charge of returning the number of keys that contain the word 
"apple".

**Hint**: you may want to take all the keys and lower case them for easier
searching.


Example:
let obj = { banana: "yay!" };
appleCounter(obj); // => 0

let obj1 = { crabapple: "yum!" };
appleCounter(obj1); // => 1

let obj2 = { crabapple: "yum!", honeyapple: "super yum", banana: "yay" };
appleCounter(obj2); // => 2


let obj3 = {
  crabApple: "yum!",
  honeyApple: "super yum",
  banana: "yay",
  bigapple: "NYC"
};
appleCounter(obj3); // => 3
***********************************************************************/

function appleCounter(appleObj) {
  let counter = 0;

  for (let key in appleObj) {
    key = key.toLowerCase();
    if (key.indexOf("apple") > -1) {
      counter += 1;
    }
  }

  return counter;
}

module.exports = appleCounter;

/***********************************************************************
Let's practice writing closures by creating a function named `sandwichMaker()`.
This function will return another function that will accept a string to add 
to the sandwich order (which will start off with a default "tomato" ingredient),
separating each incoming ingredient with "and".

Look below to see how this function is invoked:

let sandwich = sandwichMaker(); // => returns a function
sandwich("spinach") // => "One sandwich with tomato and spinach"
sandwich("jelly") // => "One sandwich with tomato and spinach and jelly"
sandwich("bread") // => "One sandwich with tomato and spinach and jelly and bread"

Another Sandwich:
let sandwich2 = sandwichMaker(); // => returns a function
sandwich2("pb") // => "One sandwich with tomato and pb"

***********************************************************************/

function sandwichMaker() {
  let order = "One sandwich with tomato";

  return function (food) {
    order = order.slice(0, order.length) + " and " + food;
    return order;
  };
}

module.exports = sandwichMaker;

/***********************************************************************
Write a function `mirrorArray(array)` that takes in an array as an
argument and returns a new array "mirrored" as shown in the examples:

Examples:

mirrorArray([1,2,3]); // => [ 1, 2, 3, 3, 2, 1 ]
mirrorArray(['a', 'b', 'c', 'd']); // => [ 'a', 'b', 'c', 'd', 'd', 'c', 'b', 'a' ]
***********************************************************************/

// solution 1
function mirrorArray(array) {
  let newArray = array.slice(0, array.length);

  for (let i = array.length - 1; i >= 0; i -= 1) {
    let el = array[i];
    newArray.push(el);
  }

  return newArray;
}

// solution 2
function mirrorArray(array) {
  let newArray = [];

  for (let i = 0; i < array.length; i += 1) {
    let el = array[i];
    newArray.push(el);
  }

  for (let i = array.length - 1; i >= 0; i -= 1) {
    let el = array[i];
    newArray.push(el);
  }

  return newArray;
}

module.exports = mirrorArray;

/***********************************************************************
Write a function named `changeContext(function, object)` that will accept a
function and an object. The changeContext function should return the result of
the function being invoked with the passed in object as it's context. 

Take careful note of how this is invoked:

let map = {
  secret: "I don't know where I'm going",
};

let bat = {
  secret: "I'm scared of the dark",
};

function getSecret() {
  return this.secret;
}
console.log( changeContext( getSecret, bat ) ); // prints "I'm scared of the dark"
console.log(changeContext(getSecret, map)); // prints "I don't know where I'm going"

***********************************************************************/

function changeContext(func, obj) {
  let secretFunc = func.bind(obj);
  return secretFunc();
}

module.exports = changeContext;

/***********************************************************************
Write a
function named `restSum`
that accepts all incoming parameters and sums them.

**Hint**: Use rest parameter syntax!

Examples:
restSum(3,5,6); // => 14
restSum(1, 2, 3, 4, 5, 6, 7, 8, 9); // => 14
restSum( 0 ); // => 0
***********************************************************************/

function restSum(...otherNums) {
  let sum = 0;
  otherNums.forEach(function (num) {
    sum += num;
  });
  return sum;
}

module.exports = restSum;

/***********************************************************************
Write a function named `boundByAnArg(function, arg)` that will accept a
function and an argument. When invoked the boundByAnArg function will return a
function that will utilize the original argument passed into boundByAnArg. 

See below for an example:

function iSpy(thing) {
  return "I spy a " + thing;
}

let spyTree = boundByAnArg(iSpy, "tree");
console.log(spyTree()); // prints "I spy a tree"
console.log(spyTree("car")); // prints "I spy a tree"

let spyCar = boundByAnArg(iSpy, "car");
console.log(spyCar()); // prints "I spy a car"
console.log(spyCar("potato")); // prints "I spy a car"

***********************************************************************/

function boundByAnArg(func, arg) {
  return func.bind(null, arg);
}

module.exports = boundByAnArg;

/***********************************************************************
Write a function named `spreadItOut(array1, array2)` that accepts two arrays and
uses *spread operator* syntax to return a single array. 



Examples:
spreadItOut([3,5,6], [1,2,3]); // => [3,5,6,1,2,3];
spreadItOut([], [1,2,3]); // => 14;
spreadItOut(["apple", "banana"], [1,2,3]); // => ["apple", "banana", 1, 2, 3];
***********************************************************************/

function spreadItOut(array1, array2) {
  let joinedArray = [...array1, ...array2];
  return joinedArray;
}

module.exports = spreadItOut;

/***********************************************************************
Write a function `arrayConverter(array)` that will intake an
array as an argument and returns an object representing the count of each
value in the array. **Hint:** don't forget you can check if a key is present
in an object by using `obj[key] === undefined`.

Examples:

console.log(arrayConverter(["apple", "apple"])); // => {apple: 2}
console.log(arrayConverter(["mango", "pineapple"])); // => {mango: 1, pineapple: 1}
console.log(arrayConverter(["apple", "banana", "potato", "banana"])); // => {apple: 1, banana: 2, potato: 1}
***********************************************************************/

function arrayConverter(array) {
  let arrayObject = {};
  // iterate through the array one value at a time
  for (let i = 0; i < array.length; i++) {
    let currentValue = array[i];
    // if the value doesn't exist in the object already then we add it
    if (arrayObject[currentValue] === undefined) {
      arrayObject[currentValue] = 1;
    } else {
      // otherwise we increment the count of the value in the object
      arrayObject[currentValue] += 1;
    }
  }
  return arrayObject;
}

module.exports = arrayConverter;

/***********************************************************************
Write a function named `funcTimer(time, func)` that will allow you to hand
in a function and a number representing milliseconds. The `funcTimer` should use
the global.setTimeout function to invoke the passed in function in `time` amount
of seconds. 

There are no specs for this problem - try it in the console yourself to
test your answer!

Examples:

function partyFunc () {
  console.log("Party time!")
}

funcTimer(5000, partyFunc); // in 5 seconds prints: "Party time!"


***********************************************************************/

function funcTimer(time, func) {
  setTimeout(func, time);
}

module.exports = funcTimer;

/***********************************************************************
Write a function named `hiddenCounter()`. This function will do two things - first
it will define a count variable, then it will return a function. 
When invoked the function returned by hiddenCounter will increment the counter by 1.

Look below to see how this function is invoked:

let hidden1 = hiddenCounter(); //returns a function
hidden1(); // returns 1
hidden1(); // returns 2

let hidden2 = hiddenCounter(); // returns a function
hidden2(); // returns 1


***********************************************************************/

function hiddenCounter() {
  let count = 0;
  return () => (count += 1);
}

module.exports = hiddenCounter;

/***********************************************************************
Write a function `stringConverter(string)` that will intake a
string as an argument and returns an object representing the count of each
character in the string. **Hint:** don't forget you can check if a key is present
in an object by using `obj[key] === undefined`.

Examples:

console.log(stringConverter("apple")); // => {a: 1, p: 2, l: 1, e: 1}
console.log(stringConverter("banana")); // => {b: 1, a: 3, n: 2}
console.log(stringConverter("raccoon")); // => {r: 1, a: 1, c: 2, o: 2, n: 1}
***********************************************************************/

function stringConverter(string) {
  let stringObject = {};
  // iterate through the string one letter at a time
  for (let i = 0; i < string.length; i++) {
    let currentLetter = string[i];
    // if the letter doesn't exist in the object already the we add it
    if (stringObject[currentLetter] === undefined) {
      stringObject[currentLetter] = 1;
    } else {
      // otherwise we increment the count of the letter in the object
      stringObject[currentLetter] += 1;
    }
  }
  return stringObject;
}

module.exports = stringConverter;

/***********************************************************************
Write a function `countScores(people)` that takes in an array of score
objects (people) as its input. A score object has two key-value pairs:
the scorer (string) and a point value (number). `countScores(people)` should
return an object that has key-value pairs listing each person who scored as a key
and the sum of the total points for the game as their value.


Example 1:
let ppl = [{name: "Anthony", score: 10},
            {name: "Fred", score : 10},
            {name: "Anthony", score: -8},
            {name: "Winnie", score: 12}];

console.log(countScores(ppl)); //=> { Anthony: 2, Fred: 10, Winnie: 12 }

Example 2:
let peeps = [
  {name: "Anthony", score: 2},
  {name: "Winnie", score: 2},
  {name: "Fred", score: 2},
  {name: "Winnie", score: 2},
  {name: "Fred", score: 2},
  {name: "Anthony", score: 2},
  {name: "Winnie", score: 2}
];
console.log(countScores(peeps)); //=> { Anthony: 4, Fred: 4, Winnie: 6 }
***********************************************************************/

function countScores(people) {
  let scoresObj = {};

  for (let i = 0; i < people.length; i += 1) {
    let personObj = people[i];
    let name = personObj.name;
    let score = personObj.score;

    if (scoresObj[name]) {
      scoresObj[name] += score;
    } else {
      scoresObj[name] = score;
    }
  }
  return scoresObj;
}

module.exports = countScores;

/***********************************************************************
Below we've declared a new object for a calculator that has a property
representing the total. This time around we'll make our calculator a bit
fancier! Let's first add some new functionality.

Write two methods within this object named:
1. modulo(num) - sets the total to the remainder of division with the arg number
2. squared() - multiplies the total by its self

Each of the above methods should return the total.

Example:
fancyCalculator.setTotal(5) // => returns 5
fancyCalculator.squared() // => returns 25
fancyCalculator.modulo(4) // => returns 1
fancyCalculator.total // => returns 1
***********************************************************************/

const fancyCalculator = {
  total: 0,
  setTotal: function (num) {
    this.total = num;
    return this.total;
  },
  modulo: function (num) {
    this.total %= num;
    return this.total;
  },
  squared: function () {
    this.total *= this.total;
    return this.total;
  },
};

module.exports = fancyCalculator;

/***********************************************************************
Write a function named: interrupter(interruptingWord). The interrupter function will
accept a word and return a function. When the function returned by interrupter
is invoked with a string the string will be returned with "interruptions".

Look below to see how this function is invoked:
let rudePerson = interrupter("what"); // => returns a function
console.log(rudePerson("how are you")); // prints "how what are what you"
console.log(rudePerson("I like pie")); // prints "I what like what pie"


Invoking the interrupter function again: 
let rudePerson2 = interrupter("yo"); // => returns a function
console.log(rudePerson2("I love dogs")); // prints "I yo love yo dogs"


***********************************************************************/

function interrupter(interruptingWord) {
  return function (sentence) {
    let words = sentence.split(" ");
    let newString = "";

    for (let index = 0; index < words.length; index++) {
      let word = words[index];
      if (index === words.length - 1) {
        newString += word;
      } else {
        newString += word + " " + interruptingWord + " ";
      }
    }

    return newString;
  };
}

module.exports = interrupter;

/***********************************************************************
Write a function named: countDownTimer(n). This function will represent a count
down of days till the New Year. The countDownTimer function will 
take in a number argument (n) the first time it is called and if that
number is greater than 0 the countDownTimer will return a function.

The function returned by countDownTimer can then be invoked n times before it 
returns a string of "Happy New Year!". Look closely at how this function is 
invoked below:

Example 1:
  console.log(countDownTimer(0)); // prints "Happy New Year!"

Example 3:
  let oneDay = countDownTimer(1); // returns a function
  console.log(oneDay()); // prints "Happy New Year!"

Example 3:
  let twoDays = countDownTimer(2); // returns a function
  console.log(twoDays()); // returns a function
  console.log(twoDays()); // prints "Happy New Year!"

Example 4:
  let threeDays = countDownTimer(3); // returns a function
  console.log(threeDays()); // returns a function
  console.log(threeDays()); // returns a function
  console.log(threeDays()); // prints "Happy New Year!"

***********************************************************************/
function countDownTimer(num) {
  if (num === 0) return "Happy New Year!";
  const _count = () => {
    num -= 1;
    if (num <= 0) {
      return "Happy New Year!";
    } else {
      return _count;
    }
  };
  return _count;
}

module.exports = countDownTimer;

/*********************************************************************** 

Write a function named `allTheArgs`. This function will intake a function and
multiple arguments and will return a function. When the function
returned by the allTheArgs function is invoked it will pass the arguments from
the first call of allTheArgs *as well as the arguments when it is invoked*.

Example 1:
const adder = (...nums) => nums.reduce((num, sum) => sum + num);

let addFive = allTheArgs(adder, 5);

console.log(addFive()); // prints 5
console.log(addFive(5)); // prints 10
console.log(addFive(10)); // prints 15

let addTwenty = allTheArgs(adder, 5, 10, 5);

console.log(addTwenty(5)); // prints 25
console.log(addTwenty(10)); // prints 30

Example 2:
const bow = (...names) => {
  let nameArr = Array.from(names);
  return "You bowed to " + names.join(" and ");
};

console.log(bow("Sandy")) // prints "You bowed to Sandy"

let bowSandy = allTheArgs(bow, "Sandy");
console.log(bowSandy()); // prints "You bowed to Sandy"
console.log(bowSandy("Joe", "Nico")); // prints "You bowed to Sandy and Joe and Nico"

***********************************************************************/

function allTheArgs(func, ...args) {
  return func.bind(null, ...args);
}

module.exports = allTheArgs;

/***********************************************************************
Below we have provided a function named 'callCenter(name)' that when invoked
returns an object with a name property and sayHello method.

let judy = callCenter("Judy");
judy.sayHello(); // prints "Hello this is Judy"

You will be writing a method on the object returned by callCenter that will be
named callMeLater(time). The callMeLater function will intake a time in
milliseconds and will invoke the `sayHello` method after the number of
milliseconds has passed.

This can be accomplished using the global.setTimeout function to invoke the
sayHello function in `time` amount of milliseconds. Be warned though: using the
global.setTimeout will be setting the *context* of the function it invoked as the
global object. If you  find yourself with the incorrect context when `sayHello`
is eventually invoked think about how you can ensure the context for sayHello will
always be the same.

There are no specs for this problem - run the below examples until everything 
runs correctly!

Example 1:
let judy = callCenter("Judy");
judy.sayHello(); // prints "Hello this is Judy"
judy.callMeLater(1000); // waits one second then prints "Hello this is Judy"

Example 2:
let melan = callCenter("Melan");
melan.sayHello(); // prints "Hello this is Melan"
melan.callMeLater(1000); // waits one second then prints "Hello this is Melan"


***********************************************************************/

const callCenter = (name) => {
  return {
    name: name,
    sayHello: function () {
      console.log("Hello this is " + this.name);
    },
    callMeLater: function (time) {
      return setTimeout(this.sayHello.bind(this), time);
    },
  };
};

// module.exports = boundfuncTimer;

/***********************************************************************
Write a function named: lazyAdder(firstNum). The lazyAdder function will
accept a number and return a function. When the function returned by lazyAdder
is invoked it will again accept a number, (secondNum), and then return a function.
When the last mentioned function is invoked with a number, (thirdNum), it will
FINALLY return a number. See below for examples!

Example 1:
let firstAdd = lazyAdder(1);
let secondAdd = firstAdd(2);
let sum = secondAdd(3);
console.log(sum); // prints 6

Example 2:
let func1 = lazyAdder(10);
let func2 = func1(20);
let total = func2(3);
console.log(total); // prints 33

***********************************************************************/

function lazyAdder(firstNum) {
  return function (secondNum) {
    return function (thirdNum) {
      return firstNum + secondNum + thirdNum;
    };
  };
}

module.exports = lazyAdder;

/***********************************************************************
Write a function named `callOnTarget(function, obj1, ob2)`.  `callOnTarget` will
accept a function to invoke that will use the first passed in object, (obj1), as
the context for that function call and the second passed in object, (obj2), as 
an argument being passed to the function upon invocation. 
Take a look at the below examples for more clarity!

**Hint**: use Function#bind()!

Exames:

const cat = {
  name: "Breakfast"
};

onstmouse = {
  name: "Jerry"
};

nction greet(other) {
  rern "I'm " + this.name + ". Nice to meet you, " + other.name;
 }

console.log(callOnTarget(greet, cat, mouse)); // "I'm Breakfast. Nice to meet you, Jerry"
conse.log(callOnTarget(greet, mouse, cat)); // "I'm Jerry. Nice to meet you, Breakfast"

const dog = {
  name: "Noodles",
  chase: function(animal) {
  return "Woof, my name is " + this.name + " and I'm chasing " + animal.name;
  }
};

console.log(callOnTarget(dog.chase, cat, dog)); // "Woof, my name is Breakfast and I'm chasing Noodles"

*********************************************************************/

const cat = {
  name: "Breakfast"
};

const mouse = {
  na: "Jerry"


uncton greet(other) {
return "I'm " + this.name + ". Nice to meet you, " + other.name;
}

function callOnTarget(func, obj1, obj2) {
  let boundFunc = func.bind(obj1);
  return boundFunc(obj2);



module.exports = callOnTarget;
  
                                                       
/***********************************************************************
For this problem you will be writing a function capable of finding the volume
for a rectangle (height * width * length). In order to enter the
required measurements we'll need to measure them one at a time.

Write a function named `recVolume(height)`. The recVolume function will be passed
a height int and will return a function. The function returned by recVolume can 
then be invoked two more times with a single argument number each time (one for
length and one for width). Once all three numbers (height, width, length) have
been collected return the volume of the rectangle. Any subsequent calls to the 
function returned by recVolume should continue to return the original volume.

Example 1:
let table1 = recVolume(5); // returns a function
table1(4); // returns a function
console.log(table1(3)); // prints 60
console.log(table1(145)); // STILL prints 60

Example 3:
let table2 = recVolume(3); // returns a function
table2(2); // returns a function
console.log(table2(1)); // prints 6
console.log(table2(75)); // STILL prints 6

***********************************************************************/
function recVolume(height) {
  let dimensions = [height];
  const _measure = (num) => {
    if (dimensions.length < 3) {
      dimensions.push(num);
    }
    if (dimensions.length === 3) {
      let sum = dimensions.reduce((acc, el) => (acc *= el));
      return sum;
    } else {
      return _measure;
    }
  };
  return _measure;
}

module.exports = recVolume;

/***********************************************************************
Write a function named `dynamicDivide(divisor)`. The dynamicDivide function will
return a new function that when invoked will divide the argument number by the
divisor.


Look below to see how this function is invoked:

const halfer = dynamicDivide(2); // returns a function
halfer(20); // returns 10

const divideByThree = dynamicDivide(3);
divideByThree(30); // returns 10

const  divideByFive = dynamicDivide(5);
divideByFive(50); // returns 10


***********************************************************************/

function dynamicDivide(divisor) {
  return function (dividend) {
    return dividend / divisor;
  };
}

/**************DO NOT MODIFY ANYTHING UNDER THIS  LINE*****************/
module.exports = dynamicDivide;

/***********************************************************************
Write a function named `smoothieMachine` that accepts any number of params and
returns an object with an ingredients property and a function named `addIngredients`.

The ingredients property will be set to an array containing all of the parameters
initially passed in to the `smoothieMachine` function when it was invoked. 
The `addIngredients` method on the object returned by the `smoothieMachine` function 
will accept any number of passed in parameters and will return a string listing
all the smoothie ingredients.

See below for examples:

let smoothie1 = smoothieMachine();

console.log(smoothie1.addIngredients("milk"));
// prints "I'm having a smoothie with milk"
console.log(smoothie1.addIngredients("kale", "spinach"));
// prints "I'm having a smoothie with milk and kale and spinach"
console.log(smoothie1.addIngredients("honey", "pears", "berries"));
// prints "I'm having a smoothie with milk and kale and spinach and honey and pears and berries"

let smoothie2 = smoothieMachine("apples", "bananas", "berries");
console.log(smoothie2.addIngredients("pineapple"));
// prints "I'm having a smoothie with apples and bananas and berries and pineapple"
***********************************************************************/

const smoothieMachine = (...ingredients) => {
  return {
    ingredients: [...ingredients],
    addIngredients: function (...moreIngredients) {
      this.ingredients.push(...moreIngredients);

      return "I'm having a smoothie with " + this.ingredients.join(" and ");
    },
  };
};

/**************DO NOT MODIFY ANYTHING UNDER THIS  LINE*****************/
module.exports = smoothieMachine;

/***********************************************************************
Let's practice writing closures by creating a method called `dynamicMultiply(num)`.
The dynamicMultiply function will return a new function that will allow us to
create new separate custom multiply functions.


Look below to see how this function is invoked:

const doubler = dynamicMultiply(2); // returns a functions
doubler(5); // returns 10

const tripler = dynamicMultiply(3);
tripler(5); // returns 15

const multiplyByFive = dynamicMultiply(5);
multiplyByFive(5); // returns 25


***********************************************************************/

function dynamicMultiply(num) {
  let multiplier = num;

  return function (factor) {
    return multiplier * factor;
  };
}

module.exports = dynamicMultiply;

/***********************************************************************
Declare a function named partyPlanner(). When invoked the partyPlanner function will
return an object that represents a party. The object returned by partyPlanner will
have a property named guestList that will point to an array. 

The object returned by partyPlanner will additionally have two functions:
1. throwParty() - which will return a different string depending on the number 
 guests on the guestList. 
  A. If there are no guests the returned string request more guests
  B. If there are guests on the guestList the returned sting will include those 
  guest's names.

2. addToGuestList(name) - will add a name to the party object's guestList property


Closely look at the examples below for more information on each method:

Examples:
const party = partyPlanner();

console.log(party.throwParty()); // prints "gotta add people to the guest list"

party.addToGuestList("James");
console.log(party.throwParty()); // prints "Welcome to the party James"

party.addToGuestList("Alvin"); 
console.log(party.throwParty()); // prints "Welcome to the party James and Alvin"

Example 2:
const party2 = partyPlanner();
console.log(party2.throwParty()); // prints "gotta add people to the guest list"

party2.addToGuestList("Lucy");
console.log(party2.throwParty()); // prints "Welcome to the party Lucy"
***********************************************************************/

function partyPlanner() {
  return {
    guestList: [],
    throwParty: function () {
      if (this.guestList.length > 0) {
        return "Welcome to the party " + this.guestList.join(" and ");
      } else {
        return "gotta add people to the guest list";
      }
    },
    addToGuestList: function (name) {
      this.guestList.push(name);
    },
  };
}

module.exports = partyPlanner;

/***********************************************************************
Write a function named: coupon(discount). The coupon function will intake a
number to apply as a discount, and will return a function that accepts an array
of prices. Every call to the function returned by coupon will return the array
of prices with the discount applied.

Example 1:
let tenPercent = coupon(0.1);
console.log(tenPercent([10, 20, 30])); // [ 9, 18, 27 ]

Example 2:
let twentyPercent = coupon(0.2);
console.log(twentyPercent([10, 20, 30])); // [ 8, 16, 24 ]


***********************************************************************/
function coupon(discount) {
  return (prices) => {
    return prices.map((price) => (price -= price * discount));
  };
}

module.exports = coupon;

/***********************************************************************
Write a function reverseStr(str) that accepts a string and returns that string
reversed. 

Write this function using a fat arrow function!

Examples:
let result1 = reverseStr("hello"); // returns "olleh"
let result2 = reverseStr("garden"); // returns "nedrag"
let result3 = reverseStr("potato"); // returns "otatop"


***********************************************************************/

let reverseStr = (str) => str.split("").reverse().join("");

/**************DO NOT MODIFY ANYTHING UNDER THIS LINE*****************/
module.exports = reverseStr;

/***********************************************************************
Write a function named `boundfuncTimer(obj, func, time)` that will accept an object,
a function to call upon that object, and a number representing milliseconds.

The `boundfuncTimer` should use the global.setTimeout function to invoke the
passed in function on the object in `time` amount of seconds. 

There are no specs for this problem - try it in the console yourself to
test your answer!

**Hint**: use Function#bind()!

Examples:

const dog = {
  age: 1
};

const cat = {
  age: 5
};

function growOlder () {
  this.age++;
  console.log(this.age)
}

boundfuncTimer(dog, growOlder, 5000); // in 5 seconds prints: 2
boundfuncTimer(cat, growOlder, 7000); // in 7 seconds prints: 6


***********************************************************************/

function boundfuncTimer(obj, func, time) {
  setTimeout(func.bind(obj), time);
}

module.exports = boundfuncTimer;

/******************************************************************************
Write a function named plannedIntersect(firstArr) that takes in an array and
returns a function. When the function returned by plannedIntersect is invoked
passing in an array (secondArr) it returns a new array containing the elements
common to both firstArr and secondArr.


Example 1:
let abc = plannedIntersect(["a", "b", "c"]); // returns a function
console.log(abc(["b", "d", "c"])); // returns [ 'b', 'c' ]

Example 2:
let fame = plannedIntersect(["f", "a", "m", "e"]); // returns a function
console.log(fame(["a", "f", "z", "b"])); // returns [ 'f', 'a' ]

*******************************************************************************/

function plannedIntersect(firstArr) {
  return (secondArr) => {
    let common = [];

    for (let i = 0; i < firstArr.length; i++) {
      let el = firstArr[i];
      if (secondArr.indexOf(el) > -1) {
        common.push(el);
      }
    }

    return common;
  };
}

/**************DO NOT MODIFY ANYTHING UNDER THIS  LINE*************************/
module.exports = plannedIntersect;

/***********************************************************************
Write a function named: coinCollector(numCoins). The coinCollector function will
accept a number of coins (greater that 0) to collect when it is first invoked
and will return a function. The function returned by coinCollector can then be
invoked numCoins number of times passing in one coin (represented by an int) to
be added to the collection.

Once the function returned by coinCollector has the numCoins required it will
return an array of the coins it has gathered.

Example 1:
  let oneCoin = coinCollector(1); // returns a function
  console.log(oneCoin(10)); // prints [10]

Example 2:
  let twoCoins = coinCollector(2); // returns a function
  twoCoins(25); // returns a function
  console.log(twoCoins(10)); // prints [25, 10]

Example 3:
  let threeCoins = coinCollector(3); // returns a function
  threeCoins(25); // returns a function
  threeCoins(5); // returns a function
  console.log(threeCoins(10)); // prints [ 25, 5, 10 ]

***********************************************************************/
function coinCollector(numCoins) {
  let coins = [];
  const _collect = (coin) => {
    coins.push(coin);
    if (coins.length >= numCoins) {
      return coins;
    } else {
      return _collect;
    }
  };
  return _collect;
}

module.exports = coinCollector;

/***********************************************************************

Currying is the process of decomposing a function that takes multiple arguments
into one that takes single arguments successively until it has the sufficient
number of arguments to run.This technique is named after the
logician Haskell Curry(the functional programming language Haskell is, too).

Write a `curriedSum` function that takes an integer(how many numbers to sum)
and returns a function that can be successively called with single arguments
until it finally returns a sum.

Here is a breakdown of how curriedSum(numArgs) should work:
    - Define an empty array, `numbers`.
    - Define a function, `_curriedSum` that:
        - Closes over `numArgs` and `numbers`.
        - Takes a single number as an argument.
        - Appends this to the `numbers` array each time.
        - If `numbers.length === numArgs`, it sums the numbers in the array and
        returns the result.
        - Else, it returns itself.
    - Returns `_curriedSum`.

If you're confused, think of it this way: `_curriedSum` keeps collecting
arguments and returning itself until it has enough arguments, at which point it
actually does the required work of summing.


Example:
// 1
const sum = curriedSum(4); // returns a function
sum(5) // returns a function
sum(20) // returns a function
sum(30) // returns a function
sum(20); // => returns 75

// 2
// this function can also be invoked like this:
const sum = curriedSum(3)(2)(1)(7); // => returns 10

***********************************************************************/

function curriedSum(numArgs) {
  const numbers = [];

  function _curriedSum(num) {
    numbers.push(num);

    if (numbers.length === numArgs) {
      let total = 0;

      numbers.forEach((n) => {
        total += n;
      });

      return total;
    } else {
      return _curriedSum;
    }
  }

  return _curriedSum;
}

module.exports = curriedSum;

function myMap(inputArray, callback) {
  const outputArray = [];
  for (let index = 0; index < inputArray.length; index++) {
    outputArray.push(callback(inputArray[index], index, inputArray));
  }
  return outputArray;
}

module.exports = myMap;

function returnsThree() {
  return 3;
}

function reciprocal(n) {
  if (n < 1 || n > 1000000) {
    throw new TypeError("Number out of range from 1 to 1000000");
  }
  return 1 / n;
}

module.exports = {
  returnsThree,
  reciprocal,
};

class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  sayHello() {
    return `Hello, ${this.name}.`;
  }
  visit(otherPerson) {
    return `${this.name} visited ${otherPerson.name}`;
  }
  switchVisit(otherPerson) {
    return otherPerson.visit(this);
  }
  update(obj) {
    if (typeof obj !== "object") {
      throw new TypeError(`${typeof obj} must be an object.`);
    }
    if (!obj.name || !obj.age) {
      throw new TypeError(`Object must have both a name and an age property.`);
    }
    this.name = obj.name;
    this.age = obj.age;
  }
  tryUpdate(obj) {
    try {
      this.update(obj);
    } catch (err) {
      return false;
    }
    return true;
  }
  static greetAll(people) {
    return people.map((person) => person.sayHello());
  }
}

module.exports = Person;

module.exports = function reverseString(string) {
  if (typeof string !== "string") {
    throw new TypeError(
      `reverseString requires a string not a ${typeof string}`
    );
  }
  return [...string].reverse().join("");
};

<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <title>
      C:/MY-WEB-DEV/__My-Git/DS_ALGO/DS-ALGO-OFFICIAL/CONTENT/Resources/My-Data-Structures-Notes/tiny-prac-probs/problems
    </title>
    <link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/gh/bgoonz/GIT-CDN-FILES/right.css"
    />
  </head>

  <body>
    <table
      border="0"
      cellspacing="1"
      cellpadding="2"
      summary="file table"
      class="file-table centered"
    >
      <tr>
        <td colspan="4" class="header-row"><b>Folders</b></td>
      </tr>
      <tr>
        <td><a href="../right.html" target="rframe">&lt;Go Back&gt;</a></td>
      </tr>
    </table>
    <br />

    <table
      border="0"
      cellspacing="1"
      cellpadding="2"
      summary="file table"
      class="file-table centered"
    >
      <tr>
        <th></th>
        <th></th>
        <th></th>
        <th></th>
      </tr>
      <tr>
        <td><a href="00-arrow-addfive.js">00-arrow-...ive.js</a>&nbsp;</td>
        <td><a href="04-recursive-sum.js">04-recurs...sum.js</a>&nbsp;</td>
        <td><a href="09-mirror-array.js">09-mirror-array.js</a>&nbsp;</td>
        <td><a href="20-call-on-target.js">20-call-o...get.js</a>&nbsp;</td>
      </tr>
      <tr class="row2">
        <td><a href="01-arrow-full-name.js">01-arrow-...ame.js</a>&nbsp;</td>
        <td><a href="05-car-drive.js">05-car-drive.js</a>&nbsp;</td>
        <td><a href="10-change-context.js">10-change...ext.js</a>&nbsp;</td>
        <td><a href="21-volume.js">21-volume.js</a>&nbsp;</td>
      </tr>
      <tr>
        <td><a href="01-diff-array-lens.js">01-diff-a...ens.js</a>&nbsp;</td>
        <td><a href="05-does-key-exist.js">05-does-k...ist.js</a>&nbsp;</td>
        <td><a href="10-rest-sum.js">10-rest-sum.js</a>&nbsp;</td>
        <td><a href="22-dynamic-divide.js">22-dynami...ide.js</a>&nbsp;</td>
      </tr>
      <tr class="row2">
        <td><a href="01-keys-in-object.js">01-keys-i...ect.js</a>&nbsp;</td>
        <td><a href="05-even-range.js">05-even-range.js</a>&nbsp;</td>
        <td><a href="11-bound-by-arg.js">11-bound-by-arg.js</a>&nbsp;</td>
        <td><a href="23-smoothie-machine.js">23-smooth...ine.js</a>&nbsp;</td>
      </tr>
      <tr>
        <td>
          <a href="01-recursive-fibonacci.js">01-recurs...cci.js</a>&nbsp;
        </td>
        <td><a href="05-recursive-flatten.js">05-recurs...ten.js</a>&nbsp;</td>
        <td><a href="11-spread-it-out.js">11-spread...out.js</a>&nbsp;</td>
        <td>
          <a href="24-closure-dynamic-multi.js">24-closur...lti.js</a>&nbsp;
        </td>
      </tr>
      <tr class="row2">
        <td><a href="02-arrow-my-map.js">02-arrow-my-map.js</a>&nbsp;</td>
        <td><a href="06-calculator.js">06-calculator.js</a>&nbsp;</td>
        <td><a href="12-array-converter.js">12-array-...ter.js</a>&nbsp;</td>
        <td><a href="25-party-planner.js">25-party-...ner.js</a>&nbsp;</td>
      </tr>
      <tr>
        <td><a href="02-avg-value.js">02-avg-value.js</a>&nbsp;</td>
        <td>
          <a href="06-key-in-object-array.js">06-key-in...ray.js</a>&nbsp;
        </td>
        <td><a href="12-set-time-out.js">12-set-time-out.js</a>&nbsp;</td>
        <td><a href="26-coupon.js">26-coupon.js</a>&nbsp;</td>
      </tr>
      <tr class="row2">
        <td>
          <a href="02-recursive-factorial.js">02-recurs...ial.js</a>&nbsp;
        </td>
        <td><a href="06-reverse-string.js">06-revers...ing.js</a>&nbsp;</td>
        <td><a href="13-hidden-counter.js">13-hidden...ter.js</a>&nbsp;</td>
        <td><a href="27-arrow-reverse.js">27-arrow-...rse.js</a>&nbsp;</td>
      </tr>
      <tr>
        <td><a href="02-values-in-object.js">02-values...ect.js</a>&nbsp;</td>
        <td><a href="07-break-down-object.js">07-break-...ect.js</a>&nbsp;</td>
        <td><a href="13-string-converter.js">13-string...ter.js</a>&nbsp;</td>
        <td><a href="28-bind-set-time-out.js">28-bind-s...out.js</a>&nbsp;</td>
      </tr>
      <tr class="row2">
        <td><a href="03-arrow-rest-sum.js">03-arrow-...sum.js</a>&nbsp;</td>
        <td><a href="07-intersect-arrays.js">07-inters...ays.js</a>&nbsp;</td>
        <td><a href="14-count-scores.js">14-count-scores.js</a>&nbsp;</td>
        <td>
          <a href="29-planned-intersection.js">29-planne...ion.js</a>&nbsp;
        </td>
      </tr>
      <tr>
        <td><a href="03-recursive-exponent.js">03-recurs...ent.js</a>&nbsp;</td>
        <td><a href="07-make-dog.js">07-make-dog.js</a>&nbsp;</td>
        <td><a href="14-fancy-calculator.js">14-fancy-...tor.js</a>&nbsp;</td>
        <td><a href="30-coin-collector.js">30-coin-c...tor.js</a>&nbsp;</td>
      </tr>
      <tr class="row2">
        <td><a href="03-set-key-in-object.js">03-set-ke...ect.js</a>&nbsp;</td>
        <td><a href="08-arrow-mirror-array.js">08-arrow-...ray.js</a>&nbsp;</td>
        <td><a href="15-interrupter.js">15-interrupter.js</a>&nbsp;</td>
        <td><a href="31-curried-sum.js">31-curried-sum.js</a>&nbsp;</td>
      </tr>
      <tr>
        <td><a href="03-tripler.js">03-tripler.js</a>&nbsp;</td>
        <td><a href="08-fuzz-bizz.js">08-fuzz-bizz.js</a>&nbsp;</td>
        <td><a href="16-count-down.js">16-count-down.js</a>&nbsp;</td>
        <td><a href="my-map.js">my-map.js</a>&nbsp;</td>
      </tr>
      <tr class="row2">
        <td>
          <a href="04-arrow-average-value.js">04-arrow-...lue.js</a>&nbsp;
        </td>
        <td><a href="08-value-pair.js">08-value-pair.js</a>&nbsp;</td>
        <td><a href="17-all-the-args.js">17-all-the-args.js</a>&nbsp;</td>
        <td><a href="number-fun.js">number-fun.js</a>&nbsp;</td>
      </tr>
      <tr>
        <td><a href="04-get-full-name.js">04-get-fu...ame.js</a>&nbsp;</td>
        <td><a href="09-apple-counter.js">09-apple-...ter.js</a>&nbsp;</td>
        <td><a href="18-call-me-later.js">18-call-m...ter.js</a>&nbsp;</td>
        <td><a href="person.js">person.js</a>&nbsp;</td>
      </tr>
      <tr class="row2">
        <td><a href="04-odd-range.js">04-odd-range.js</a>&nbsp;</td>
        <td><a href="09-closure-sandwiches.js">09-closur...hes.js</a>&nbsp;</td>
        <td><a href="19-lazy-adder.js">19-lazy-adder.js</a>&nbsp;</td>
        <td><a href="reverse-string.js">reverse-string.js</a>&nbsp;</td>
      </tr>
    </table>

    <p class="summary-style">
      Folders: 1<br />
      Files: 64<br />
      Size of all files: 59968 KB
    </p>
  </body>
</html>

/***********************************************************************
We've just covered how to write functions using arrow function syntax. 
Let's give some old functions a new flair by rewriting them using fat arrow syntax.

Write a function `addFive` that accepts a number and will return that number
plus 5. Write this function on a single line, and utilize a fat arrow function's 
ability to implicitly return by leaving out your own return statement.


Examples:
let result1 = addFive(0); // returns 5
let result2 = addFive(10); // returns 15
let result3 = addFive(37); // returns 42


***********************************************************************/

let addFive = (num) => num + 5;

/**************DO NOT MODIFY ANYTHING UNDER THIS LINE*****************/
module.exports = addFive;

/***********************************************************************
Write a function using fat arrow syntax, `arrowGetFullName(person)` that takes in
a person object and returns a string containing their full name. 

Assign the below function to a variable using the const keyword. Using the const
keyword will allow any value assigned to that variable protection from being
reassigned within that scope.

Examples:
let p1 = {firstName: 'John', lastName: 'Doe'};
arrowGetFullName(p1); // => 'John Doe'
let p2 = {firstName: 'Charlie', lastName: 'Brown', age: 9};
arrowGetFullName( p2 ); // => 'Charlie Brown'
***********************************************************************/

const arrowGetFullName = (person) => person.firstName + " " + person.lastName;

module.exports = arrowGetFullName;

/***********************************************************************
Write a function `diffArrayLen(arr1, arr2)` that takes two arrays. The
function should return true if the arrays have different lengths. The
function should return false otherwise.

Examples:

let a1 = ['a', 'b', 'c'];
let a2 = ['w', 'x', 'y'];
let a3 = [1, 3, 7, 4];

diffArrayLen(a1, a2); // => false
diffArrayLen(a1, a3); // => true
***********************************************************************/

function diffArrayLen(arr1, arr2) {
  return arr1.length !== arr2.length;
}

module.exports = diffArrayLen;

/***********************************************************************
Write a function called `keysInObject(obj)` that takes in an object and returns 
an array of all the keys within that Object.

Do this once using using a `for...in` loop and once using `Object.keys`.

Examples:

let animals = {dog: 'Wolfie', cat: 'Jet', bison: 'Bilbo'}
let foods = {apple: 'tart', lemon: 'sour', mango: 'sweet'}
keysInObject(animals); // => ["dog", "cat", "bison"]
keysInObject(foods); // => ["apple", "lemon", "mango"]
***********************************************************************/

function keysInObject(obj) {
  return Object.keys(obj);
}

// solution 2
// function keysInObject(obj) {
//   let array = [];
//   for (key in obj) {
//     array.push(key);
//   }
//   return array;
// }

module.exports = keysInObject;

/***********************************************************************
Write a recursive function called `fibonacci` that takes an integer, `n`,
and returns the `n`th number in the Fibonacci sequence.

Not familiar with the Fibonacci sequence? Beginning with 0 and 1, we add the two previous numbers in the sequence together to form the next one:

0, 1, 1, 2, 3, 5, 8, etc....

We count Fibonacci numbers beginning with the first 1. Take a look at the
examples below if you're unsure where to start!

Examples:

fibonacci(1); // => 1
fibonacci(2); // => 1
fibonacci(3); // => 2
fibonacci(4); // => 3
fibonacci(10); // => 55
***********************************************************************/

function fibonacci(n) {
  if (n === 1 || n === 2) {
    return 1;
  }

  return fibonacci(n - 1) + fibonacci(n - 2);
}

/**************DO NOT MODIFY ANYTHING UNDER THIS LINE*****************/
module.exports = fibonacci;

/***********************************************************************
Write a function using fat arrow syntax named `arrowMyMap` that accepts an array
and a callback as arguments. The function will return an array of new elements
obtained by calling the callback on each element of the array, passing in the 
element. Assign the below function to a variable using the const keyword.

Do not use the built in Array#map - use Array#forEach for iteration.


Examples:
let result1 = arrowMyMap([100, 25, 81, 64], Math.sqrt);
console.log(result1);   // [ 10, 5, 9, 8 ]

const yell = el => el.toUpperCase() + '!'

let result2 = arrowMyMap(['run', 'Forrest'], yell);
cons    ole.log(result2);   // [ 'RUN!', 'FORREST!' ]
    
***********************************************************************/

const arrowMyMap = (array, cb) => {
  let mapped = [];

  array.forEach((el) => mapped.push(cb(el)));
  return mapped;
};

module.exports = arrowMyMap;

/***********************************************************************
Write a function `avgValue(array)` that takes in an array of numbers and
returns the average number.

Examples:

avgValue([10, 20]); // => 15
avgValue([2, 3, 7]); // => 4
avgValue([100, 60, 64]); // => 74.66666666666667
***********************************************************************/

function avgValue(array) {
  let total = 0;

  for (let i = 0; i < array.length; i += 1) {
    let num = array[i];
    total += num;
  }
  let avg = total / array.length;
  return avg;
}

module.exports = avgValue;

/***********************************************************************
Write a recursive function called `factorial` that takes an integer, `num`,
and returns the factorial of `num`. Assume the value of `num` is greater 
than or equal to 1.

A factorial is the number get when multiplying a number by itself minus one
all the way down to 1 (but not 0)! We represent them with an exclamation
point, also sometimes called a "bang" in programming.

5! = 5 x 4 x 3 x 2 x 1 = 120

Examples:

factorial(1); // => 1
factorial(3); // => 6
factorial(5); // => 120
***********************************************************************/

function factorial(num) {
  if (num === 1) {
    return 1;
  }

  return num * factorial(num - 1);
}

/**************DO NOT MODIFY ANYTHING UNDER THIS LINE*****************/
module.exports = factorial;

/***********************************************************************
Write a function called `valuesInObject(obj)` that takes in an object and returns 
an array of all the values within that Object. 


Do this once using using a `for...in` loop and once using `Object.values`.


Examples:

let animals = {
  dog: "Wolfie",
  cat: "Jet",
  bison: "Bilbo"
}
let foods = {
  apple: "tart",
  lemon: "sour",
  mango: "sweet"
}
valuesInObject(animals); // => ["Wolfie", "Jet", "Bilbo"]
valuesInObject(foods); // => ["tart", "sour", "sweet"]
** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** * /

function valuesInObject(  ob j ) {
  return Object.values( obj );
}

// solution 2
// function valuesInObject(obj) {
//   let array = [];
//   for (key in obj) {
//     let value = obj[key];
//     array.push(value);
//   }
//   return array;
// }


module.exports = valuesInObject;

/***********************************************************************
Write a function named `arrowRestSum` that accepts all incoming parameters
and sums them. Assign the below function to a variable using the const keyword.

**Hint**: Use rest parameter syntax!

Examples:
arrowRestSum(3,5,6); // => 14
arrowRestSum(1, 2, 3, 4, 5, 6, 7, 8, 9); // => 14
arrowRestSum(0); // => 0
***********************************************************************/

const arrowRestSum = (...otherNums) => {
  let sum = otherNums.reduce((acc, el) => (acc += el));
  return sum;
};

module.exports = arrowRestSum;

/***********************************************************************
Write a recursive function called `exponent` that takes two integers, 
`num`
and `power`, and returns `num`
raised to the `power`
th power.Your

function should work when `num`
or `power`
are positive OR negative.

Exponents are used to represent a number being multiplied by itself a
given number of times:

4 ^ 3 = 4 x 4 x 4 = 64

Negative exponents represent the same action, but in the denominator instead
of the numerator:

4^-3 = (1/4) * (1/4) * (1/4) = 1/64.

Examples:

exponent(3, 2); // => 9
exponent(2, -2); // => 1/4 (or 0.25)
exponent(5, 5); // => 3,125
***********************************************************************/

function exponent(num, power) {
  if (power < 0) {
    return 1 / exponent(num, Math.abs(power));
  }

  if (power === 1) {
    return num;
  }

  return num * exponent(num, power - 1);
}

/**************DO NOT MODIFY ANYTHING UNDER THIS LINE*****************/
module.exports = exponent;

/***********************************************************************
Write a function `setKeyInObject(obj, string, value)` that takes in three parameters. The first parameter is an object, the second parameter will be a 
string and the third parameter will be a value. Your job is to return the object
adding the second parameter as a key using the third parameter as its value.
Examples:
let obj = {}
setKeyInObject(obj, "apple", "yum"); // => {apple: "yum"}

let obj1 = {str: "hello"}
setKeyInObject(obj1, "num", 3); // => {str: "hello", num: 3}
***********************************************************************/

function setKeyInObject(obj, string, value) {
  let key = string;
  obj[key] = value;
  return obj;
}

module.exports = setKeyInObject;

/*******************************************************************************
Write a function tripler(array) that takes in an array and returns a new array
containing 3 times every element of the original array.

Examples:

tripler( [ 1, 2, 3 ] ); // => [ 3, 6, 9 ]
tripler( [ 4, 1, 7 ] ); // => [ 12, 3, 21 ]
*******************************************************************************/

function tripler(array) {
  let newArray = [];

  for (let index = 0; index < array.length; index++) {
    const num = array[index];
    newArray.push(num * 3);
  }

  return newArray;
}

/**************DO NOT MODIFY ANYTHING UNDER THIS  LINE*************************/
module.exports = tripler;

/***********************************************************************
Write a function using fat arrow syntax, `arrowAvgValue(array)` that takes in an
array of numbers and returns the average number. Assign the below function to a
variable using the const keyword.

Examples:

arrowAvgValue([10, 20]); // => 15
arrowAvgValue([2, 3, 7]); // => 4
arrowAvgValue([100, 60, 64]); // => 74.66666666666667
***********************************************************************/

const arrowAvgValue = (array) => {
  let sum = array.reduce((el, sum = 0) => (sum += el));

  let avg = sum / array.length;
  return avg;
};

module.exports = arrowAvgValue;

/***********************************************************************
Write a function `getFullName(person)` that takes in an person object
and returns a string containing their full name.


Examples:
let p1 = {firstName: 'John', lastName: 'Doe'};
getFullName(p1); // => 'John Doe'
let p2 = {firstName: 'Charlie', lastName: 'Brown', age: 9};
getFullName(p2); // => 'Charlie Brown'
***********************************************************************/

function getFullName(person) {
  let name = person.firstName + " " + person.lastName;
  return name;
}

module.exports = getFullName;

/******************************************************************************
Write a function oddRange(end) that takes in a number and returns an array 
containing all positive odd numbers up to `end`.

Examples:

oddRange(13); // => [ 1, 3, 5, 7, 9, 11, 13 ]
oddRange(6); // => [ 1, 3, 5 ]
*******************************************************************************/

function oddRange(end) {
  let arr = [];

  for (let i = 1; i <= end; i += 2) {
    arr.push(i);
  }

  return arr;
}

/**************DO NOT MODIFY ANYTHING UNDER THIS  LINE*************************/
module.exports = oddRange;

/***********************************************************************
Write a recursive function called `sum` that takes an array of integers
and returns the value of all the integers added together. Your array may
include a mix of positive and negative integers!

Examples:

sum([1, 2, 3]); // => 6
sum([0, 1, -3]); // => -2
sum([1, 2, 3, 4, 5]); //=> 15
***********************************************************************/

function sum(arr) {
  if (arr.length === 0) {
    return 0;
  }

  return arr[0] + sum(arr.slice(1));
}

/**************DO NOT MODIFY ANYTHING UNDER THIS LINE*****************/
module.exports = sum;

/***********************************************************************
Below we've declared a new object for a car that has a property representing speed.
Write a method within this object named `drive(newSpeed)`. This method should
set the speed to the passed in argument, and then return the present speed.

**Hint**: Use the keyword *this*!

Examples:

car.drive(10); // => returns 10
console.log(car) // => {speed: 10, drive: ƒ}

car.drive(50); // => returns 50
console.log(car) // -> {speed: 50, drive: ƒ}
car.drive( 100 ); // => returns 100
console.log(car) // -> {speed: 100, drive: ƒ}

***********************************************************************/

const car = {
  speed: 0,
  // here we have to use an anonymous function to ensure the context
  // is set correctly when this method is invoked
  drive: function (newSpeed) {
    this.speed = newSpeed;
    return this.speed;
  },
};

module.exports = car;

/***********************************************************************
Write a function `doesKeyExist(obj, key)` that takes in an object and a
key and returns true if the key is inside the object and false if the
key is not inside the object.

Examples:

let obj1 = {bootcamp: 'App Academy', course: 'Bootcamp Prep'}
doesKeyExist(obj1, 'course'); // => true
doesKeyExist(obj1, 'name'); // => false
***********************************************************************/

function doesKeyExist(obj, key) {
  return obj[key] !== undefined;
}

module.exports = doesKeyExist;

/*******************************************************************************
Write a function evenRange(start, end) that returns an array containing all even
numbers between 'start' and 'end' in sequential order.

Examples:

evenRange(13, 20) => [ 14, 16, 18, 20 ]
evenRange(4, 11) => [ 4, 6, 8, 10 ]
evenRange(8, 5) => []
*******************************************************************************/

function evenRange(start, end) {
  var array = [];

  for (var i = start; i <= end; i += 1) {
    if (i % 2 === 0) {
      array.push(i);
    }
  }

  return array;
}

/**************DO NOT MODIFY ANYTHING UNDER THIS  LINE*************************/
module.exports = evenRange;
