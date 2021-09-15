# Absolutely Everything You Could Need To Know About How JavaScript Works.

Seriously… this list is utterly exhaustive it covers more core concepts than I can hold the names of in working memory on a very good day.

## Absolutely Everything You Could Need To Know About How JavaScript Works. <a id="3194"></a>

### Seriously… this list is utterly exhaustive it covers more core concepts than I can hold the names of in working memory on a very good day. <a id="ba90"></a>

### But first a little bit of mildly shameful self promotion: <a id="2a5d"></a>

> \(self promotion ends after the line denoted by a bunch of pictures of my dog🐕 \)
>
> \(Followed by a brief introduction to JavaScript for beginners\)
>
> \(Finally the main content / resources / imbedded YouTube links\)

![](https://cdn-images-1.medium.com/max/800/0*huxNcspoDvOfqxvn.gif)

## My Blog: <a id="2a83"></a>

## Discover More: <a id="8df7"></a>

![https://bgoonz-blog.netlify.app/](https://cdn-images-1.medium.com/max/600/1*_J5NcnQmHmPDBvZodMmyaA.png)

_**This is a work in progress and may be broken or hosted elsewhere at some time in the future.**_

Related posts: ![](https://cdn-images-1.medium.com/max/2560/1*2FC8D_rbP4cT3jukydhtkg.png)

## The Beginner’s Guide To JavaScript <a id="9482"></a>

> This is a quick intro for complete beginners … skip below for more advanced content and resources! \(below the next photo montage of my dog\)

## Skip The Following **↓** To Get To Main Content!! <a id="c219"></a>

![](https://cdn-images-1.medium.com/max/600/1*HCYn5Uz_jZ6uRjgp_NA5Yw.png)

**If you wanna skip this section you’ll find the main content about 10% of the way down the page… it will look like this:**

![](https://cdn-images-1.medium.com/max/600/0*iHxLNzz1MOZACC5u.png)

## The Number Data Type <a id="a203"></a>

The **number** data type in JS is used to represent any numerical  
values, including integers and decimal numbers. **Basic Arithmetic Operators** are the symbols that perform particular operations.

* **+** \(addition\)
* **-** \(subtraction\)
* **asterisk** \(multiplication\)
* **/** \(division\)
* **%** \(modulo\)

JS evaluates more complex expressions using the general math order of  
operations aka PEMDAS.

* **PEMDAS** : Parentheses, Exponents, Multiplication, Division, Modulo, Addition, Subtraction.
* _To force a specific order of operation, use the group operator \( \) around a part of the expression._

**Modulo** : Very useful operation to check divisibility of numbers,  
check for even & odd, whether a number is prime, and much more!  
_\(Discrete Math concept, circular problems can be solved with modulo\)_

* Whenever you have a smaller number % a larger number, the answer will just be the initial small number.
* `console.log(7 % 10); // => 7;`

## The String Data Type <a id="76b9"></a>

The **string** data type is a primitive data type that used to represent  
textual data.

* can be wrapped by either **single** or **double** quotation marks, _best to choose one and stick with it for consistency_.
* If your string contains quotation marks inside, can layer single or double quotation marks to allow it to work.

```text
"That's a great string"; (valid)
'Shakespeare wrote, "To be or not to be"'; (valid)
'That's a bad string'; (invalid)
```

* Alt. way to add other quotes within strings is to use template literals.

## `This is a template literal` <a id="cbef"></a>

`${function} // use ${} to invoke functions within.`

> **.length** : property that can be appended to data to return the length.
>
> empty strings have a length of zero.
>
> **indices** : indexes of data that begin at 0, can call upon index by using the bracket notation \[ \].

```text
console.log("bootcamp"[0]); // => "b"
console.log("bootcamp"[10]); // => "undefined"
console.log("boots"[1 * 2]); // => "o"
console.log("boots"["boot".length - 1]); // => "t"
```

* we can pass expressions through the brackets as well since JS always evaluates expressions first.
* The index of the last character of a string is always one less than it’s length.
* **indexOf\(\)** : method used to find the first index of a given character within a string.
* `console.log("bagel".indexOf("b")); // => 0 console.log("bagel".indexOf("z")); // => -1`
* **if the character inside the indexOf\(\) search does not exist in the string, the output will be -1.**
* the indexOf\(\) search will return the first instanced index of the the char in the string.
* **concatenate** : word to describe joining strings together into a single string.

## The Boolean Data Type <a id="b731"></a>

The **Boolean** data type is the simplest data type since there are only  
two values: **true** and **false**.

* **Logical Operators** \(Boolean Operators\) are used to establish logic in our code.
* **!** \(not\) : reverses a Boolean value.

`console.log(!true); // => false console.log(!!false); // => false`

* **&&** \(and\) **Truth Table**

![](https://cdn-images-1.medium.com/max/800/0*Y4qzqSB0C-9AmtXf.png)

* **Logical Order of Operations** : JS will evaluate !, then &&, then \|\|.
* **De Morgan’s Law** : Common mistake in Boolean logic is incorrectly distributing ! across parentheses.
* `!(A || B) === !A && !B; !(A && B) === !A || !B;`
* In summary, to correctly distribute ! across parentheses we must also flip the operation within.

## Comparison Operators <a id="b016"></a>

All comparison operators will result in a Boolean output.

**The relative comparators**

* **&gt;** \(greater than\)
* **&lt;** \(less than\)
* **&gt;=** \(greater than or equal to\)
* **&lt;=** \(less than or equal to\)
* **===** \(equal to\)
* **!==** \(not equal to\)

> Fun Fact: “a” &lt; “b” is considered valid JS Code because string  
> comparisons are compared lexicographically \(meaning dictionary order\),  
> so “a” is less than “b” because it appears earlier!
>
> If there is ever a standstill comparison of two string  
> lexicographically \(i.e. app vs apple\) the comparison will deem the  
> shorter string lesser.

**Difference between == and ===**

* **===** : Strict Equality, will only return true if the two comparisons are entirely the same.
* **==** : Loose Equality, will return true even if the values are of a different type, due to coercion. \(Avoid using this\)

## Variables <a id="a7af"></a>

Variables are used to store information to be referenced and manipulated  
in a program.

* We initialize a variable by using the **let** keyword and a **=** single equals sign \(assignment operator\).
* `let bootcamp = "Lambda"; console.log(bootcamp); // "Lambda"`
* JS variable names can contain any alphanumeric characters, underscores, or dollar signs \(cannot being with a number\).
* If you do not declare a value for a variable, undefined is automatically set.
* `let bootcamp; console.log(bootcamp); // undefined`
* We can change the value of a previously declared variable \(let, not const\) by re-assigning it another value.
* **let** is the updated version of **var**; there are some differences in terms of hoisting and global/block scope — will be covered later in the course \(common interview question!\)

**Assignment Shorthand**

```text
let num = 0;num += 10; // same as num = num + 10num -= 2; // same as num = num - 2num /= 4; // same as num = num / 4num *= 7; // same as num = num * 7
```

* In general, any nonsensical arithmetic will result in **NaN** ; usually operations that include undefined.
* **declaration** : process of simply introducing a variable name.
* **initialization** : process of both declaring and assigning a variable on the same line.

## Functions <a id="678c"></a>

A function is a procedure of code that will run when called. Functions  
are used so that we do not have to rewrite code to do the same thing  
over and over. \(Think of them as ‘subprograms’\)

* **Function Declaration** : Process when we first initially write our function.
* Includes three things:
* Name of the function.
* A list of _parameters_ \(\)
* The code to execute {}
* **Function Calls** : We can call upon our function whenever and wherever\* we want. \(\*wherever is only after the initial declaration\)
* JS evaluates code top down, left to right.
* When we execute a declared function later on in our program we refer to this as **invoking** our function.
* Every function in JS returns undefined unless otherwise specified.
* When we hit a **return** statement in a function we immediately exit the function and return to where we called the function.
* When naming functions in JS always use camelCase and name it something appropriate. &gt; Great code reads like English and almost explains itself. Think: Elegant, readable, and maintainable!

## Parameters and Arguments <a id="56b3"></a>

* **Parameters** : Comma separated variables specified as part of a function’s declaration.
* **Arguments** : Values passed to the function when it is invoked.
* _If the number of arguments passed during a function invocation is different than the number of parameters listed, it will still work._
* However, is there are not enough arguments provided for parameters our function will likely yield **Nan**.

![](https://cdn-images-1.medium.com/max/2560/1*2FC8D_rbP4cT3jukydhtkg.png)

> END OF INTRO FOR BEGINNERS \(MAIN ARTICLE BELOW\)

## ↓↓**Absolutely Everything You Could Need To Know About JavaScript**↓↓ <a id="5dc7"></a>

![](https://cdn-images-1.medium.com/max/800/0*fOaTsnCJCYc3wD4x) ![](https://cdn-images-1.medium.com/max/800/1*b31hiO4ynbDLRrXWEFF4aQ.png)

Here’s a live code editor where you can mess with any of the examples…

Here’s a live code editor where you can mess with any of the examples…

### Coding practice <a id="22a4"></a>

## Dependent on data <a id="5609"></a>

> _Something that data structure and algorithms have in common when talking about time complexity is that they are both dealing with data. When you deal with data you become dependent on them and as a result the time complexity is also dependent of the data that you received. To solve this problem we talk about 3 different time complexity._

* **The best-case complexity: when the data looks the best**
* **The worst-case complexity: when the data looks the worst**
* **The average-case complexity: when the data looks average**

## Big O notation <a id="b65d"></a>

The complexity is usually expressed with the Big O notation. The wikipedia page about this subject is pretty complex but you can find here a good summary of the different complexity for the most famous data structures and sorting algorithms.

## The Array data structure <a id="60f4"></a>

![](https://cdn-images-1.medium.com/max/800/0*Qk3UYgeqXamRrFLR.gif)

## Definition <a id="59b3"></a>

An Array data structure, or simply an Array, is a data structure consisting of a collection of elements \(values or variables\), each identified by at least one array index or key. The simplest type of data structure is a linear array, also called one-dimensional array. From Wikipedia

Arrays are among the oldest and most important data structures and are used by every program. They are also used to implement many other data structures.

## [A primitive as an object](https://javascript.info/primitives-methods#a-primitive-as-an-object) <a id="dcd7"></a>

Here’s the paradox faced by the creator of JavaScript:

* There are many things one would want to do with a primitive like a string or a number. It would be great to access them using methods.
* Primitives must be as fast and lightweight as possible.

The solution looks a little bit awkward, but here it is:

1. Primitives are still primitive. A single value, as desired.
2. The language allows access to methods and properties of strings, numbers, booleans and symbols.
3. In order for that to work, a special “object wrapper” that provides the extra functionality is created, and then is destroyed.

The “object wrappers” are different for each primitive type and are called: `String`, `Number`, `Boolean` and `Symbol`. Thus, they provide different sets of methods.

For instance, there exists a string method [str.toUpperCase\(\)](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/String/toUpperCase) that returns a capitalized `str`.

Here’s how it works:

```text
let str = "Hello";
```

```text
alert( str.toUpperCase() ); // HELLO
```

Simple, right? Here’s what actually happens in `str.toUpperCase()`:

1. The string `str` is a primitive. So in the moment of accessing its property, a special object is created that knows the value of the string, and has useful methods, like `toUpperCase()`.
2. That method runs and returns a new string \(shown by `alert`\).
3. The special object is destroyed, leaving the primitive `str` alone.

So primitives can provide methods, but they still remain lightweight.

The JavaScript engine highly optimizes this process. It may even skip the creation of the extra object at all. But it must still adhere to the specification and behave as if it creates one.

## DOES IT MUTATE: <a id="abab"></a>

[LINK….](https://doesitmutate.xyz/)

## [.concat](https://doesitmutate.xyz/concat) <a id="1388"></a>

no mutation

## Description <a id="dde7"></a>

The concat\(\) method is used to merge two or more arrays. This method does not change the existing arrays, but instead returns a new array.

```text
Array.prototype.concat ( [ item1 [ , item2 [ , … ] ] ] )
```

## Example <a id="cb2b"></a>

```text
var array1 = ['a', 'b', 'c'];
var array2 = ['d', 'e', 'f'];
```

```text
console.log(array1.concat(array2));
// expected output: Array ["a", "b", "c", "d", "e", "f"]
```

### [.copyWithin\(\)](https://doesitmutate.xyz/copywithin) <a id="7316"></a>

**mutates**

## Description <a id="44b4"></a>

The copyWithin\(\) method shallow copies part of an array to another location in the same array and returns it, without modifying its size.

```text
arr.copyWithin(target)
arr.copyWithin(target, start)
arr.copyWithin(target, start, end)
```

## Example <a id="442b"></a>

```text
var array1 = ['a', 'b', 'c', 'd', 'e'];
```

```text
// copy to index 0 the element at index 3
console.log(array1.copyWithin(0, 3, 4));
// expected output: Array ["d", "b", "c", "d", "e"]
```

```text
// copy to index 1 all elements from index 3 to the end
console.log(array1.copyWithin(1, 3));
// expected output: Array ["d", "d", "e", "d", "e"]
```

## [.entries\(\)](https://doesitmutate.xyz/entries) <a id="5fa5"></a>

### no mutation <a id="c311"></a>

## Description <a id="70df"></a>

The entries\(\) method returns a new Array Iterator object that contains the key/value pairs for each index in the array.

```text
a.entries()
```

## Example <a id="f21a"></a>

```text
var array1 = ['a', 'b', 'c'];
```

```text
var iterator1 = array1.entries();
```

```text
console.log(iterator1.next().value);
// expected output: Array [0, "a"]
```

```text
console.log(iterator1.next().value);
// expected output: Array [1, "b"]
```

## [.every](https://doesitmutate.xyz/every) <a id="236c"></a>

### no mutation <a id="f401"></a>

## Description <a id="977e"></a>

The every\(\) method tests whether all elements in the array pass the test implemented by the provided function.

```text
Array.prototype.every ( callbackfn [ , thisArg ] )
```

## Example <a id="36fe"></a>

```text
function isBelowThreshold(currentValue) {
  return currentValue < 40;
}
```

```text
var array1 = [1, 30, 39, 29, 10, 13];
```

```text
console.log(array1.every(isBelowThreshold));
// expected output: true
```

## [.fill\(\)](https://doesitmutate.xyz/fill) <a id="cbc9"></a>

### mutates <a id="80a9"></a>

## Description <a id="4ba7"></a>

The fill\(\) method fills all the elements of an array from a start index to an end index with a static value.

```text
arr.fill(value)
arr.fill(value, start)
arr.fill(value, start, end)
```

## Example : <a id="e884"></a>

```text
var array1 = [1, 2, 3, 4];
```

```text
// fill with 0 from position 2 until position 4
console.log(array1.fill(0, 2, 4));
// expected output: [1, 2, 0, 0]
```

```text
// fill with 5 from position 1
console.log(array1.fill(5, 1));
// expected output: [1, 5, 5, 5]
```

```text
console.log(array1.fill(6));
// expected output: [6, 6, 6, 6]
```

## [.filter](https://doesitmutate.xyz/filter) <a id="ab75"></a>

### no mutation <a id="cbda"></a>

## Description <a id="deb8"></a>

The filter\(\) method creates a new array with all elements that pass the test implemented by the provided function.

```text
Array.prototype.filter ( callbackfn [ , thisArg ] )
```

## Example <a id="10de"></a>

```text
var words = ['spray', 'limit', 'elite', 'exuberant', 'destruction', 'present'];
```

```text
const result = words.filter(word => word.length > 6);
```

```text
console.log(result);
// expected output: Array ["exuberant", "destruction", "present"]
```

## [.find\(\)](https://doesitmutate.xyz/find) <a id="6569"></a>

no mutation

## Description <a id="8805"></a>

The find\(\) method returns a value of the first element in the array that satisfies the provided testing function. Otherwise undefined is returned.

```text
arr.find(callback[, thisArg])
```

## Example <a id="3dd7"></a>

```text
var array1 = [5, 12, 8, 130, 44];
```

```text
var found = array1.find(function(element) {
  return element > 10;
});
```

```text
console.log(found);
// expected output: 12
```

[https://codeburst.io/javascript-prototype-cb29d82b8809](https://codeburst.io/javascript-prototype-cb29d82b8809)

[https://www.youtube.com/watch?v=Jh\_Uzqzz\_wM](https://www.youtube.com/watch?v=Jh_Uzqzz_wM)

[https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures)  
[https://javascript.info/closure](https://javascript.info/closure)

[https://codeburst.io/understand-closures-in-javascript-d07852fa51e7](https://codeburst.io/understand-closures-in-javascript-d07852fa51e7)

[https://www.youtube.com/watch?v=1JsJx1x35c0](https://www.youtube.com/watch?v=1JsJx1x35c0)

[http://www.bradoncode.com/blog/2012/04/big-o-algorithm-examples-in-javascript.html](http://www.bradoncode.com/blog/2012/04/big-o-algorithm-examples-in-javascript.html)

[https://www.sitepoint.com/simple-inheritance-javascript/](https://www.sitepoint.com/simple-inheritance-javascript/)

≡

