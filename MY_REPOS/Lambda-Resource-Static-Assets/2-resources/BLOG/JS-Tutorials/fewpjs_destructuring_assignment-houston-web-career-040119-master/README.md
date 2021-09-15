# Destructuring Assignment

## Learning Goals

- Use destructuring to assign data to variables

## Introduction

As developers, sometimes we receive information in a collection like an
`Object` and we want to "pick and choose" elements out of the collection. It's
a major pain to extract each property / value pair out of an Object. Here
_destructuring_ can be a real help! Not only does destructuring help when
working with data in your application, it's essential for understanding how
to get JavaScript to include third-party code (like you find on [npm][]).

## Use Destructuring to Assign Data to Variables

In JavaScript, when we want to assign data to single variables from a top level
object such as this, we normally do it individually like so:

```js
const doggie = {
  first: 'Buzz',
  breed: 'Great Pyrenees',
  fur_color: 'black and white',
  activity_level: 'sloth-like',
  favorite_food: 'hot_dogs'
};
const first = doggie.first;  // Buzz
const breed = doggie.breed; // Great Pyrenees
```

This is pretty repetitive code, and it feels like there should be an easier way
to do this. With `destructuring`, there is! JavaScript gives us the ability to
assign multiple single variables at one time using a simple syntax. 

```js

const doggie = {
  first: 'Buzz',
  breed: 'Great Pyrenees',
  fur_color: 'black and white',
  activity_level: 'sloth-like',
  favorite_food: 'hot_dogs'
};

const { first, breed } = doggie;
console.log(first); 
console.log(breed); 

```

We can also use it to destructure a nested syntax:
```js

const doggie = {
  first: 'Buzz',
  breed: 'Great Pyrenees',
  fur_color: 'black and white',
  activity_level: 'sloth-like',
  favorite_foods: {
    meats:{
      ham: 'smoked',
      hot_dog: 'oscar_meyer',
    },
    cheeses:{
      american: 'kraft'
    }
  }
};

const { ham, hot_dog } = doggie.favorite_foods.meats;
console.log(ham); 
console.log(hot_dog); 

```

### Destructuring Assignment with Arrays

Destructuring does not just work on objects - we can also use the same syntax
with `Array`s as well. 

```js

const dogs = ['Great Pyrenees', 'Pug', 'Bull Mastiff']
const [medium, small, giant] = dogs
console.log(medium, small, giant) // Great Pyrenees, Pug, Bull Mastiff
```

The cool part is we can pick the parts of the `Array` that we want to assign!
```js

const dogs = ['Great Pyrenees', 'Pug', 'Bull Mastiff']
const [, small, giant] = dogs
console.log(small , giant) //  Pug, Bull Mastiff
```

### Destructuring Assignment with Strings

We can also destructure with strings, as a whole:

```js
const dogsName = 'Sir Woody BarksALot'
const [title, firstName, lastName] = 'Sir Woody BarksALot'.split(' ')
console.log(title, firstName, lastName) // Sir Woody BarksALot
```

And we can also destructure it in parts, just as we did with `Array`s above: 

```js
const dogsName = 'Sir Woody BarksALot'
const [title, ,lastName] = 'Sir Woody BarksALot'.split(' ')
console.log(title, lastName) // Sir BarksALot
```

## Instructions

We are going to give you several `String`s, `Array`s, and `Object`s and you're
going to write several destructuring assignments for each. Write your code in
the `index.js` file. Let the instructions in the README and the tests guide you
through the process. 

## Conclusion

"Destructuring assignment" is a fast, and efficient way to assign data to
variables from objects, `Array`s, and strings. It allows us to pick and choose the
pieces of data that we want to assign, and gives us lots of freedom to
manipulate the data as it is coming in. With practice, you'll be proficient at
it in no time. 

## Resources

* [Destructuring assignment](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment)

[npm]: https://www.npmjs.com/
