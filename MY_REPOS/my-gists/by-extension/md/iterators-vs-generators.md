
---
---

# **Iterators and Iterables**

Iterators are rather strictly defined: they are object (the iterators) which contains a `next` (and possibly a few other) function. Every time the `next` function is called, it is expected to return an object with two properties:

-   `value`: the current value of the iterator
-   `done`: is the iterator finished?

An iterable on the other hand is an object which has a property with a `Symbol.iterator` key (which represents the well know symbol `@@iterator`). That key contains a function, which when called, returns a new iterator. An example of an iterable:

```js
const list = {
    entries: { 0: 'a', 1: 'b' },
    [Symbol.iterator]: function(){
        let counter = 0;
        const entries = this.entries;
        return {
            next: function(){
                return {
                    value: entries[counter],
                    done: !entries.hasOwnProperty(counter++)
                }
            }
        }
    }
};

```

Their main purpose, as their name suggests, is to provide an interface which can be iterated:

```js
for (let item of list) { console.log(item); }
// 'a'
// 'b'

```
---
---

# **Generators**

Generators on the other hand are much more versatile. It helps to think of them as functions which can be paused and resumed.

While they can be iterated (their iterables provide a `next` method), they can implement much more sophisticated procedures and provide a input/output communication through their `next` method.

A simple generator:

```js
function *mygen () {
   let myVal = yield 12;
   return myVal * 2;
}

const myIt = mygen();

const firstGenValue = myIt.next().value;
// Generator is paused and yields the first value

const result = myIt.next(firstGenValue * 2).value;

console.log(result); // 48

```



### **Generator delegation**

Generators can delegate to another generator:

```js
function *mydelgen(val) {
    yield val * 2;
}

function *mygen () {
    let myVal = yield 12;
    yield* mydelgen(myVal); // delegate to another generator
}

const myIt = mygen();
const val = myIt.next().value;
console.log(val);
console.log(myIt.next(val).value);
console.log(myIt.next().value);

```

### **Generators & Promises**

Generators and Promises together can create a sort of automatic asynchronous iterator with the help of utilities such as [co](https://github.com/tj/co).

```js
co(function *(){
  // resolve multiple promises in parallel
  let a = Promise.resolve(1);
  let b = Promise.resolve(2);
  let c = Promise.resolve(3);
  let res = yield [a, b, c];
  console.log(res);
  // => [1, 2, 3]
}).catch(onerror);

```



So in conclusion one could say that the main purpose of iterators is to create an interface for custom objects to be iterated, whereas generators provide a plethora of possibilities for synchronous and asynchronous workflows:

-   stateful functions
-   generator delegation
-   generators & promises
