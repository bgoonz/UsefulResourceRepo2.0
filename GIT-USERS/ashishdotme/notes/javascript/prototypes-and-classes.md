---
id: prototye-classes
title: Prototype And Classes
---

## Generating objects using functions

We can generate objects using function but each time new object is created, there are multiple
copies of same functions.

```javascript
function personCreator(name, age) {
  const newPerson = {};
  newPerson.name = name;
  newPerson.age = age;
  newPerson.increaseAge = function () {
    newPerson.age++;
  };
  return newPerson;
}
const ashish = personCreator("Ashish Patel", 24);
ashish.increaseAge();
```

## Generating objects using prototypes

So we use prototypes to create objects for storing functions with their associated data.

```javascript
function PersonCreator(name, age){
 this.name = name;
 this.age = age;
}
PersonCreator.prototype.increaseAge = function(){
 this.age++;
};

// Using new creates a new object and returns it
const ashish = new PersonCreator(“Ashish Patel”, 24)
ashish.increaseAge()
```

Subclassing can be achieved by below code

```javascript
function PersonCreator(name, age) {
  this.name = name;
  this.age = age;
}

PersonCreator.prototype.increaseAge = function () {
  this.age++;
};

function PersonCreatorWithCaste(name, age, caste) {
  PersonCreator.call(this, name, age);
  this.caste = caste;
}

PersonCreatorWithCaste.prototype = Object.create(PersonCreator.prototype);
PersonCreatorWithCaste.prototype.displayCaste = function () {
  console.log(this.caste);
};

const ashish = new PersonCreatorWithCaste("Ashish Patel", 25, "Agharia");
console.log(ashish.age);
ashish.increaseAge();
console.log(ashish.age);
ashish.displayCaste();
```

## Generating objects using classes

Class was introduced with ES2015, it let us write the shared methods in one place instead of
writing the constructor and shared methods separately.

```javascript
class PersonCreator {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  increaseAge() {
    this.age++;
  }
}
const ashish = new PersonCreator("Ashish Patel", 24);
ashish.increaseAge();
```

Subclassing in ES2015 can be achieved by below code

```javascript
class PersonCreator {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  increaseAge() {
    this.age++;
  }
}

class PersonCreatorWithCaste extends PersonCreator {
  constructor(name, age, caste) {
    super(name, age);
    this.caste = caste;
  }

  displayCaste() {
    console.log(this.caste);
  }
}

const ashish = new PersonCreatorWithCaste("Ashish Patel", 24, "Agharia");
console.log(ashish.age);
ashish.increaseAge();
console.log(ashish.age);
ashish.displayCaste();
```
