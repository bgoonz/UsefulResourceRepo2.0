# JavaScript ES2021 Features You Need to Know

> Learn about JavaScript ES2021 features with practical examples.

Learn about JavaScript ES2021 features with practical examples.
---------------------------------------------------------------

[

![Towards Dev](https://miro.medium.com/fit/c/56/56/1*nob8kyajM2D7wKDuAvPmVg.png)



](https://medium.com/@TowardsDev?source=post_page-----d864eccad081--------------------------------)

JavaScript is one of the more popular programming languages, especially in web development. Thanks to the ECMAScript versions, a lot of new useful features are being released in JavaScript every year. ECMAScript 2021 has come out with some interesting and powerful features that we can use in JavaScript. They have not been released yet, but we are able to have a look at them.

In this article, we will discover some useful ES2021 features that you need to know in JavaScript. Let’s get right into it.

Numeric separators is one of the useful features that have been introduced in ES2021. They make it easier to read large numbers in JavaScript by providing separation between digits using underscores \_.

Take a look at the example below:

let myNumber = 1\_000\_000;  
console.log(myNumber); //output: 1000000  
let num = 0.000\_0002;  
console.log(num); //output: 2e-7

This makes it much easier to read big numbers when editing your code.

The method replaceAll() is one of the features I really like about ES2021. This method allows you to replace all the characters that you specify in a string without using a regex.

The method replaceAll() takes two parameters: the character we want to replace and the character we want to replace it by.

The following example will help you understand it more:

let myStr = ‘Prograssing’;  
console.log(myStr.replaceAll(“s”, “m”)); //output: Programming

As you can see, we replaced all the s characters with m characters using replaceAll(). This allows you to easily replace stuff on strings, you don’t need to use regex anymore in such cases.

Another cool feature of ES2021 is WeakRef(). It’s used to hold a weak reference to another object, which means it doesn’t prevent the garbage collector from collecting the object. It’s useful when we don’t want to keep the object in memory forever.

To create a new WeakRef , we pass an object as an argument for WeakRef() and we call deref() on the weak reference to read the reference.

Take a look at the example below:

const myObject = new WeakRef({  
name: ‘John’,  
age: 25  
});//Read the object.  
console.log(myObject.deref()); //output: {name: “John”, age: 25}//Access name.  
console.log(myObject.deref().name); //output: John

This is just a simple example to give you an idea. I would recommend using weak refs only when needed.

**Promise.any()** takes an array of promises as an argument. If all the promises are resolved, the first resolved one will be returned by Promise.any() . If all the promises are rejected, you will get an error.

Here is an example:

const promise1 = new Promise((resolve, reject) => {  
 resolve(‘promise1 was resolved.’);  
});  
const promise2 = new Promise((resolve, reject) => {  
 resolve(‘promise2 was resolved.’);  
});  
const promise3 = new Promise((resolve, reject) => {  
 resolve(‘promise3 was resolved.’);  
});let result = Promise.any(\[promise1, promise2, promise3\]);  
console.log(result); //output: promise1 was resolved.

As you can see above, Promise.any() returned the promise1 because it’s the first that was resolved. If all the promises were rejected, we would get an AggregateError that contains the reasons for rejection.

ES2021 has introduced three useful logical assignment operators: &&= , ||= , and ??= .

The logical assignment operator &&= is used between two values. If the first value is _truthy_, the second value will be assigned to it.

Here is an example:

**let firstNumber = 5;  
let secondNumber = 20;****firstNumber &&= secondNumber; //output: 20  
console.log(firstNumber); //output: 20****//Here is an equivalent to it:  
if(firstNumber){  
 firstNumber = secondNumber;  
}**

The logical assignment operator ||= is also used between two values. If the first value is not truthy(_falsy_), the second value will be assigned to it.

Here is an example:

**let firstNumber = null;  
let secondNumber = 10;  
firstNumber ||= secondNumber; //output: 10  
console.log(firstNumber); //output: 10  
//Here is an equivalent to it:  
if(!firstNumber){  
 firstNumber = secondNumber;  
}**

The logical assignment operator ??= checks if the first value is null or undefined. If it is, the second value is assigned to it.

Here is an example:

**//when first value is null or undefined  
let firstNumber = null;  
let secondNumber = 10;  
firstNumber ??= secondNumber; //output: 10  
console.log(firstNumber); //output: 10****//when first value is truthy  
firstNumber = 9;  
firstNumber ??= secondNumber; //output: 9  
console.log(firstNumber); //output: 9****//Here is an equivalent to it:  
if(firstNumber == null || firstNumber == undefined){  
 firstNumber = secondNumber;  
}**

As you can see, these operators make it much easier to assign values without using conditional statements.

ES2021 has come with useful JavaScript features to make the life of the developer much easier. That’s why we always need to stay updated with the latest technologies.

Thank you for reading this article. I hope you found it useful.


[Source](https://towardsdev.com/javascript-es2021-features-d864eccad081)