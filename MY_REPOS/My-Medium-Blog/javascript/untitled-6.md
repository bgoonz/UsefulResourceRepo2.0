# Array Callback Methods Implemented With For Loops

## Array Callback Methods Implemented With For Loops <a id="1921"></a>

### How to implement array callback methods in JavaScript <a id="e029"></a>

![](https://cdn-images-1.medium.com/max/800/0*WpKqOdTsTPhvapuW)

### Functions are called “First Class Objects” in JavaScript because: <a id="ea15"></a>

* A function is an instance of the Object type
* A function can have properties and has a link back to its constructor method
* You can store the function in a variable
* You can pass the function as a parameter to another function
* You can return the function from a function

What do you think will be printed in the following:

### Anonymous callback, a named callback <a id="8d4f"></a>

```text
function foo(callback) {
    console.log('grape');
    callback();
}
```

```text
function bar() {
    console.log('banana');
}
```

```text
const fruitBasket = function() {
    console.log('apple');
    bar();
    foo(bar);
    foo(function() {
        console.log('orange');
    });
    console.log('pear');
};
```

```text
fruitBasket();
```

### Function that takes in a value and two callbacks. The function should return the result of the callback who’s invocation results in a larger value. <a id="b8e8"></a>

```text
function greaterValue(value, cb1, cb2) {
    // compare cb1 invoked with value to cb2 invoked with value
    // return the greater result
```

```text
    let res1 = cb1(value);
    let res2 = cb2(value);
    if (res1 > res2) {
        // if this is false, we move out of if statement
        return res1;
    }
    return res2;
}
```

```text
let negate = function(num) {
    return num * -1;
};
```

```text
let addOne = function(num) {
    return num + 1;
};
```

```text
console.log(greaterValue(3, negate, addOne));
console.log(greaterValue(-2, negate, addOne));
```

_Note: we do not invoke_ _`negate`_ _or_ _`addOne`_ _\(by using_ _`()`_ _to call them\), we are passing the function itself._

### Write a function, myMap, that takes in an array and a callback as arguments. The function should mimic the behavior of Array.prototype.map. <a id="217c"></a>

```text
function myMap(arr, callback) {
    // iterate through the array, perform the cb on each element
    // return a new array with those new values
    let mapped = [];
```

```text
    for (let i = 0; i < arr.length; i++) {
        // remember that map passes three args with each element.
        let val = callback(arr[i], i, arr);
        mapped.push(val);
    }
```

```text
    return mapped;
}
```

```text
let double = function(num) {
    return num * 2;
};
console.log(myMap([1, 2, 3], double));
```

### Write a function, myFilter, that takes in an array and a callback as arguments. The function should mimic the behavior of Array.prototype.filter. <a id="47af"></a>

```text
function myFilter(arr, callback) {
    let filtered = [];
```

```text
    for (let i = 0; i < arr.length; i++) {
        let element = arr[i];
```

```text
        if (callback(element, i, arr)) {
            filtered.push(element);
        }
    }
```

```text
    return filtered;
}
```

### Write a function, myEvery, that takes in an array and a callback as arguments. The function should mimic the behavior of Array.prototype.every. <a id="ac49"></a>

```text
function myEvery(arr, callback) {
    for (let i = 0; i < arr.length; i++) {
        let element = arr[i];
```

```text
        if (callback(element, i, arr) === false) {
            return false;
        }
    }
    return true;
}
```

## Further Examples of the above concepts <a id="ceeb"></a>

```text
const createMeowValue = () => {
  console.log(this.name);
  let meow = function () {
    console.log(this);
    console.log(this.name + ' meows');
  }
  meow = meow.bind(this);
  return meow;
};
```

```text
const name = 'Fluffy';
```

```text
const cat = {
  name: name,
  age: 12,
  createMeow: function () {
    console.log(this.name);
    let meow = () => {
      const hello = 'hello';
      console.log(this.name + ' meows');
    };
    let world = '';
    if (true) {
      world = 'world';
    }
    console.log(world);
    // meow = meow.bind(this);
    return meow;
  }
};
```

```text
cat.newKey = function () {
  const outermostContext = this;
  const innerFunc = () => {
    secondContext = this;
    console.log(secondContext === outermostContext)
    return function () {
      innermostContext = this;
    }
  };
  return innerFunc.bind(outermostContext);
};
```

```text
const meow = cat.createMeow(); // method-style invocation
meow(); // function-style invocation
```

```text
console.log('-------')
```

```text
const createMeow = cat.createMeow;
const globalMeow = createMeow(); // function-style
globalMeow(); // function-style
```

```text
function createSmoothie(ingredient) {
  const ingredients = [ingredient];
  return ingredients;
}
```

```text
// console.log(createSmoothie('banana'));
// console.log(createSmoothie('apple'));
```

```text
// one parameter only
// first argument is a string
// return an array
// DO NOT USE forEach
```

References:

_More content at_ [_**plainenglish.io**_](http://plainenglish.io/)

