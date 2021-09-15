# Algorithms in JavaScript

> 40 Problems, Solutions, and Explanations

40 Problems, Solutions, and Explanations
----------------------------------------

[![Thon Ly](https://miro.medium.com/fit/c/96/96/1*GEKuz1L4KPVBovXQLXM6sA.jpeg)](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/@thonly?source=post_page-----b0bed68f4038--------------------------------)

![Image for post](https://miro.medium.com/max/60/1*CMYOFHdAKR7pNWE2F-zIHA.jpeg?q=20)

![Image for post](https://miro.medium.com/max/3840/1*CMYOFHdAKR7pNWE2F-zIHA.jpeg)

The **interview process** usually begins with an initial _phone screen_ and then an all-day _on-site_ that check for _coding skills_ and _cultural fit_. Almost without exception, the deciding factor is **coding aptitude**. After all, engineers are paid to deliver working software at the end of the day. Traditionally, _whiteboarding_ is used to test for this aptitude. More than getting the answer right is the thought process clearly articulated. In code as in life, the right answer is not always clear, but good reasoning is usually good enough. The ability to _reason_ _effectively_ signals the potential to learn, adapt, and evolve. The best engineers are always growing, and the best companies are always innovating.

**Algorithm challenges** are effective because there are more than one way to solve them. This opens the possibility for decisions to be made and the calculus of those decisions. When solving an algorithm problem, we should challenge ourselves to look at the _problem definition_ from multiple perspectives, then weigh the _benefits_ and _demerits_ of various approaches. With enough practice, we might even glimpse a universal truth: _there’s no “perfect" solution._

To truly master **Algorithms** is to understand them in relationship to **Data** **Structures**. Data structures and algorithms go hand-in-hand like Yin and Yang, the _glass_ and the _water_. Without the glass, water cannot be contained. Without data structures, we have no objects by which to apply logic. Without water, the glass is empty and devoid of sustenance. Without algorithms, objects cannot be transformed or “consumed".

_For a quick high-level analysis of_ [_Data Structures in JavaScript_](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/siliconwat/data-structures-in-javascript-1b9aed0ea17c)_:_

Applied to code, an algorithm is just a `function` that transforms a certain **input** _data structure_ into a certain **output** _data structure_. The **logic** _inside_ decides the transformation. First and foremost, the inputs and outputs should _clearly_ be defined, ideally, as **unit tests**. This requires fully understanding the problem at hand, which is not to be underestimated, because a thorough analysis of the problem can surface the solution naturally, without needing to write any code.

Once the problem domain is thoroughly grasped, **brainstorming** of the solution space can begin. _What variables will be needed? How many loops and what kinds? Are there any clever built-in methods that can help? Edge cases to consider?_ Complex or repeated logic can be difficult to read and understand. _Can helper functions be extracted or abstracted?_ An algorithm usually needs to be scalable. _As input sizes grow, how will the function perform?_ _Should there be some kind of caching mechanisms?_ Generally, memory optimizations (space) will need to be sacrificed for performance gains (time).

> To make the problem more concrete, draw **diagrams**!

When a high-level structure of the solution begins to appear, the **pseudocode** can begin. To really impress the interviewer, look _ahead_ for opportunities to refactor and **reuse** code. Sometimes, similar-behaving functions can be combined into a more general function that accepts an extra parameter. Other times, de-parametrization through **currying** is better. Keeping functions **pure** to ease testing and maintenance also shows foresight. In other words, consider **architectural** and **design patterns** in the calculus of your decisions.

> If anything is unclear, _ask_ for clarification!

Big O
-----

To assist in the calculus of runtime complexities, we approximate the scalability of an algorithm by extrapolating its _input sizes_ toward infinity before counting the _number of operations_ required. At this worst-case runtime upper bound, we can drop coefficients and additive terms, retaining only factors that dominate the function. Consequently, just a few categories can describe the scalability of almost any algorithm.

The most optimum algorithm scales in _constant_ time and space. This means it does not care at all about the growth of its inputs. Next best is _logarithmic_ time or space, then _linear_, _linearithmic_, _quadratic_, and _exponential_. The worst is _factorial_ time or space. In **Big-O** notation:

1.  **Constant**: O(1)
2.  **Logarithmic**: O(log n)
3.  **Linear**: O(n)
4.  **Linearithmic**: O(n log n)
5.  **Quadratic**: O(n²)
6.  **Expontential**: O(2^n)
7.  **Factorial**: O(n!)

![Image for post](https://miro.medium.com/max/60/1*-j3Q4EiyBgc1tDTR5uKTnQ.png?q=20)

![Image for post](https://miro.medium.com/max/3364/1*-j3Q4EiyBgc1tDTR5uKTnQ.png)

Graph: [http://bigocheatsheet.com](http://bigocheatsheet.com/)

Big-O _asymptotic analysis_ is an indispensable tool as we consider the tradeoff between time and space complexities of an algorithm. However, Big O ignores constant factors when in actual practice may matter. Moreover, optimizing for time and space may increase implementation time or negatively impact code readability. When designing the structure and logic of an algorithm, the intuitive feel for what is truly negligible is as important.

Arrays
------

The cleanest algorithm usually takes advantage of _standard_ **objects** inherent in the language. Arguably the most important in computer science is `Arrays`. In JavaScript, no other object has more utility methods than arrays. Array methods worth remembering are: `sort`, `reverse`, `slice`, and `splice`. Array elements are inserted beginning at the _0th index_. This means the last element is at `array.length — 1`. Arrays are the most optimal for _indexing_ (pushing), but can be terrible at _inserting_, _deleting_ (not popping), and _searching_. In JavaScript, arrays can grow _dynamically_.

In **Big O**:

*   **Indexing**: O(1)
*   **Inserting**: O(n)
*   **Deleting**: O(n)
*   **Brute-Force Searching**: O(n)
*   **Optimized Searching**: O(log n)

Examples of these `Array` methods in code:

It’s also worthwhile to read the full documentation on MDN about `Arrays`:

Similar to arrays are `Sets` and `Maps`. In a [set](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set), items are guaranteed to be _unique_. In a [map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map), items consist of _keys_ and _values_ in a dictionary-like relationship. Of course, `Objects` (and their literals) can also be used to store key-value pairs, but the keys must be `strings`.

Iterations
----------

Intimately associated with `Arrays` is **iterating** through them using loops. In JavaScript, we can use _five_ different _control structures_ for iterations. The most customizable is the `for` loop, which we can use to iterate through array _indexes_ in almost any order. If the _number of iterations_ cannot be determined, we can use `while` and `do while` loops until a certain condition is met. For any object, we can use the `for in` and `for of` loops to iterate through its keys and values, respectively. To get both simultaneously, we can loop through its `entries()`. We can also _break out_ of a loop at any time using a `break` statement, or _skip_ _ahead_ to the next iteration using a `continue` statement. For the most control, iterating through `generator` functions is the best.

Native array methods that iterate through all its items are: `indexOf`, `lastIndexOf`, `includes`, `fill`, and `join`. Additionally, we can provide a `callback` function to the following methods: `findIndex`, `find`, `filter`, `forEach`, `map`, `some`, `every`, and `reduce`.

Examples of these `Array` methods in code:

Recursions
----------

In a seminal paper, the [Church-Turing Thesis](https://en.wikipedia.org/wiki/Church%E2%80%93Turing_thesis) proves that any iterative function can be reproduced with a recursive one, and vice versa. Sometimes, a recursive approach is cleaner, clearer, and more elegant. Take this iterative `factorial` function for example:

const **factorial** = number => {  
  let product = 1;  
  for (let i = 2; i <= number; i++) {  
    product \*= i;  
  }  
  return product;  
};

Expressed as a `recursive` function, only _one_ line of code is needed!

const **factorial** = number => {  
  return number < 2 ? 1 : number \* factorial(number - 1);  
};

All recursive functions share a _common pattern_. They are made from creating a _recursive part_ that calls itself, and a _base case_ that does not. Whenever a `function` calls itself, it pushes a new `execution context` to the `execution stack`. This continues until the _base case_ is met, then the _stack_ unwinds as _contexts_ are popped off one by one. For this reason, careless dependence on recursion can lead to the dreaded `stack overflow` runtime error.

The `factorial` function in live code:

Finally, we are ready to take on any algorithm challenge! 😉

In this section, we will walk through 22 _commonly-asked_ algorithm questions in order of difficulty. Alternate approaches will be discussed as well their tradeoffs and runtime complexities. Usually, the most elegant solution utilizes a special “trick" or key insight. With this in mind, let’s begin!

1\. String Reversal
-------------------

Given a `string of characters` as _input_, write a `function` that returns it with the characters _reversed_.

describe("String Reversal", () => {  
 it("**Should reverse string**", () => {  
  assert.equal(reverse("Hello World!"), "!dlroW olleH");  
 });  
});

**Analysis**:

If we know the “trick", the solution is trivial. That trick is to realize we can simply use the built-in `reverse` method for an _array._ First, we use the `split` method on a _string_ to generate an `array of characters`, then we can apply the `reverse` method before using the `join` method to combine the characters back into a _string_ again. This solution can be written in just one line of code! Though not as elegant, the problem can also be solved using the latest syntax and helper method. With the new `for of` loop that iterates through every character of any string, we can show off our familiarity with the latest syntax. Alternatively, we can also use the array’s `reduce` method which eliminates the need to keep a temporary variable.

Given a string of characters, every character needs to be visited once. Though this happens multiple times, the _time complexity_ normalizes out to _linear_. And since no separate internal data structure is kept, the _space complexity_ is _constant_.

**Code**:

2\. Palindrome
--------------

A _palindrome_ is a `word` or `phrase` that reads the same _backward as forward_. Write a `function` that checks for this.

describe("Palindrome", () => {  
 it("**Should return true**", () => {  
  assert.equal(isPalindrome("Cigar? Toss it in a can. It is so tragic"), true);  
 }); it("**Should return false**", () => {  
  assert.equal(isPalindrome("sit ad est love"), false);  
 });  
});

**Analysis**:

The key insight here is to realize that we can build on what we’d learned from the previous problem. Except, we need to return a `boolean` value. This is as simple as returning a _triple equality_ check against the _original string_. We could also use the new `every` method on an _array_ to check that the _first_ and _last_ characters match up in sequential order _towards the center_. However, this will check two times more than necessary. Similar to the previous problem, the runtime complexities for both time and space are identical.

What if we wanted to expand our function to test an entire _phrase_? We can create a _helper function_ that uses **Regular Expressions** and the `replace` method on a `string` to keep only the letters. If regular expressions are not allowed, we can create an `array` of _acceptable characters_ to use as a filter.

**Code**:

3\. Integer Reversal
--------------------

Given an `integer`, _reverse_ the order of the digits.

describe("Integer Reversal", () => {  
 it("**Should reverse integer**", () => {  
  assert.equal(reverse(1234), 4321);  
  assert.equal(reverse(-1200), -21);  
 });  
});

**Analysis**:

The clever trick here is to first convert the integer to a `string` using the built-in `toString` method. Then, we can simply reuse the logic from the _String Reversal_ algorithm. After the digits are reversed, we can use the global `parseInt` function to convert the string back to an integer, and `Math.sign` to carry over the polarity. This approach reduces to just one line of code!

Since we reuse the logic from _String Reversal_, this algorithm also shares the same runtime complexities for both space and time.

**Code**:

4\. Fizz Buzz
-------------

Given a `number` as an input, print out every integer from 1 to that number. However, when the integer is divisible by 2, print out “Fizz"; when it’s divisible by 3, print out “Buzz"; when it’s divisible by both 2 and 3, print out “Fizz Buzz".

describe("Fizz Buzz", () => {  
 beforeEach(() => (output = fizzBuzz(30))); it("**Should output number**", () => {  
  assert.equal(output\[0\], 1);  
 }); it("**Should output Fizz**", () => {  
  assert.equal(output\[1\], "Fizz");  
 }); it("**Should output Buzz**", () => {  
  assert.equal(output\[2\], "Buzz");  
 }); it("**Should output Fizz Buzz**", () => {  
  assert.equal(output\[5\], "Fizz Buzz");  
 });  
});

**Analysis**:

When we realize that the _modulus operator_ can be used to check for divisibility, this classic algorithm challenge becomes trivial. The modulus divides two numbers and returns the remainder. Therefore, we can simply loop through every integer and check for remainders of `0`. To show off our mathematical prowess, we can take into account that when a number is divisible by both `a` and `b`, it’s also divisible by their _lowest common multiple_.

As usual, the runtime complexities are the same because every integer is visited and checked without needing to keep an internal state.

**Code**:

5\. Max Character
-----------------

Given a `string` of characters, return the `character` that _appears the most often_.

describe("Max Character", () => {  
 it("**Should return max character**", () => {  
  assert.equal(max("Hello World!"), "l");  
 });  
});

**Analysis**:

The trick is to create a table that tallies the appearance of each character as we loop through the string. This table can be created using an `object literal` where the `characters` are _keys_ and the `counters` are _values_. Then, we can iterate through the table to find the character that has the largest counter by keeping _temporary_ `variables` for its key and value.

Though we use two separate loops that iterate through two different inputs (_character string_ and _character map_), the time complexity is still _linear_. It may be derived from the character string, but eventually, the size of the character map will reach a limit because there’s only a _finite_ number of characters in any language. For the same reason, the space complexity is _constant_ despite how the input string grows even though an internal state is kept. Temporary primitives are also negligible at large scales.

**Code**:

6\. Anagrams
------------

Anagrams are `words` or `phrases` that contain the _same number of characters_. Create a `function` that checks for this.

describe("Anagrams", () => {  
 it("**Should implement anagrams**", () => {  
  assert.equal(anagrams("hello world", "world hello"), true);  
  assert.equal(anagrams("hellow world", "hello there"), false);  
  assert.equal(anagrams("hellow world", "hello there!"), false);  
 });  
});

**Analysis**:

An obvious approach is to create a _character map_ that tallies the number of characters for each input string. Then, we can compare the maps to see if they are identical. The logic that creates the character maps can be extracted as a _helper function_ for easier reuse. To be thorough, we should first remove all non-alphabetic characters from the input strings and then make the remainder all lowercase.

As we’ve seen, character maps have a _linear_ time complexity and a _constant_ space complexity. To be more precise, this approach has `O(n + m)` for time because two different strings are checked.

A more elegant approach is to realize that we can simply `sort` the input strings and then check for equality! However, the downside is that sorting usually requires _linearithmic_ time.

**Code**:

7\. Vowels
----------

Given a `string` of words or phrases, _count_ the number of `vowels`.

describe("Vowels", () => {  
 it("**Should count vowels**", () => {  
  assert.equal(vowels("hello world"), 3);  
 });  
});

**Analysis**:

The easiest solution is to take advantage of _regular expressions_ to extract all the vowels and then count them. If regular expressions are not allowed, we can simply loop through every character and check it against a collection of vowels. The string should be _lowercased_ first.

Both approaches have _linear_ time complexity and _constant_ space complexity because every character needs to be checked and temporary primitives are negligible.

**Code**:

8\. Array Chunking
------------------

Given an `array` and a `size`, split the array _items_ into a `list` of _arrays_ of the given size.

describe("Array Chunking", () => {  
 it("**Should implement array chunking**", () => {  
  assert.deepEqual(chunk(\[1, 2, 3, 4\], 2), \[\[1, 2\], \[3, 4\]\]);  
  assert.deepEqual(chunk(\[1, 2, 3, 4\], 3), \[\[1, 2, 3\], \[4\]\]);  
  assert.deepEqual(chunk(\[1, 2, 3, 4\], 5), \[\[1, 2, 3, 4\]\]);  
 });  
});

**Analysis**:

An obvious solution is to keep a reference to the last “chunk" and check its size as we loop through the array items. A more elegant solution is to use the built-in `slice` method. This way, no reference is needed, producing a cleaner code. This can be achieved with a `while` loop or a `for` loop that increments by steps of the given size.

These algorithms all have _linear_ time complexity because every array item needs to be visited once. They also have a _linear_ space complexity because an internal array of “chunks" is kept which grows proportionally to the input array.

**Code**:

9\. Reverse Array
-----------------

Given an `array` of items, _reverse_ the order.

describe("Reverse Arrays", () => {  
 it("**Should reverse arrays**", () => {  
  assert.deepEqual(reverseArray(\[1, 2, 3, 4\]), \[4, 3, 2, 1\]);  
  assert.deepEqual(reverseArray(\[1, 2, 3, 4, 5\]), \[5, 4, 3, 2, 1\]);  
 });  
});

**Analysis**:

Of course, an obvious solution is to use the built-in `reverse` method. But this would be too easy! If not allowed, we can simply loop through one half of the array and _swap_ the beginning with the end. This means we will need to temporarily store _one_ of the items in memory. To circumvent this need, we can use _destructuring assignment_ with array matching.

Though only one half of the input array is visited, the time complexity is still _linear_ because Big O asymptotically ignores coefficients.

**Code**:

10\. Reverse Words
------------------

Given a `phrase`, _reverse_ the order of the characters of each word.

describe("Reverse Words", () => {  
 it("**Should reverse words**", () => {  
  assert.equal(reverseWords("I love JavaScript!"), "I evol !tpircSavaJ");  
 });  
});

**Analysis**:

We can use the split method to create an array of individual words. Then for each word, we can reuse the logic from _Reverse String_ to reverse its characters. An alternative approach is to loop through each word in _reverse order_ and store the result in a temporary variable. Either way, we will need to temporarily save all the reversed words before joining them at the end.

Because every character is visited and the required temporary variable grows proportionately to the input string, the time and space complexities are _linear_.

**Code**:

11\. Capitalization
-------------------

Given a `phrase`, _capitalize_ every word.

describe("Capitalization", () => {  
 it("**Should capitalize phrase**", () => {  
  assert.equal(capitalize("hello world"), "Hello World");  
 });  
});

**Analysis**:

One approach is to loop through every character, and when the previous character is a _space_, apply `toUpperCase` to capitalize the current character. Because **string literals** are _immutable_ in JavaScript, we will need to rebuild the input string with the appropriate capitalizations. This approach requires us to always capitalize the first character. Perhaps a cleaner approach is to `split` the input string into an _array of words._ Then, we can loop through this array and capitalize the first characters, before joining the words back together again. For the same reason of immutability, we will need to hold in memory a _temporary array_ that contains the appropriate capitalizations.

Both approaches have a _linear_ time complexity because every character is visited at least once. They also have a _linear_ space complexity because a temporary variable is kept which grows proportionally to the input string.

**Code**:

12\. Caesar Cipher
------------------

Given a `phrase`, _substitute_ each character by shifting it up or down the alphabet by a given `integer`. If necessary, the shifting should wrap around back to the beginning or end of the alphabet.

describe("Caesar Cipher", () => {  
 it("**Should shift to the right**", () => {  
  assert.equal(caesarCipher("I love JavaScript!", 100), "E hkra FwrwOynelp!");  
 });it("**Should shift to the left**", () => {  
  assert.equal(caesarCipher("I love JavaScript!", -100), "M pszi NezeWgvmtx!");  
 });  
});

**Analysis**:

Firstly, we will need to create an `array` of _alphabet characters_ in order to calculate the result of shifting a character. This means we need to lowercase the `input string` before iterating through its characters. We should use a regular `for` loop to easily keep track of the current index. We will need to build up a `new string` that contains the shifted characters per iteration. When we meet a non-alphabetic character, we should immediately append it to the end of our solution string and use the `continue` statement to skip ahead to the next iteration. The key insight is to realize that we can use the `modulus operator` to mimic the behavior of wrapping around to the beginning or end of the alphabet array when the shifting is more than 26. Lastly, we need to check for capitalization in the original string before appending the result to our solution.

Since every character in the input string needs to be visited and a new string needs to be created from it, this algorithm has a _linear_ time and space complexity.

**Code**:

13\. Ransom Note
----------------

Given a `magazine of words` and a `ransom note`, determine if it’s possible to “cut out" and create the _ransom note_ from the _magazine words_.

const **magazine** =  
 "_Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum_";describe("Ransom Note", () => {  
 it("**Should return true**", () => {  
  assert.equal(ransomNote("sit ad est sint", magazine), true);  
 });it("**Should return false**", () => {  
  assert.equal(ransomNote("sit ad est love", magazine), false);  
 });it("**Should return true**", () => {  
  assert.equal(ransomNote("sit ad est sint in in", magazine), true);  
 });it("**Should return false**", () => {  
  assert.equal(ransomNote("sit ad est sint in in in in", magazine), false);  
 });  
});

**Analysis**:

An obvious solution is to split the magazine words and ransom words into _arrays_ of individual words, and then check every ransom word against every magazine word. However, this approach scales in _quadratic_ time, or `O(n * m)` which is not performant. If we create a table of magazine words first, and then check each ransom word against this table, we can achieve _linear_ time. This is because table lookup in _map objects_ occurs in _constant_ time. However, we will need to sacrifice space complexity in order to hold the map object in memory.

In code, this means we create a count of every magazine word, and then check if this “hash table" contains the right number of ransom words.

**Code**:

14\. Mean, Median, and Mode
---------------------------

Given an `array` of numbers, calculate the _mean_, _median_, and _mode_.

const **stat1** = new Stats(\[1, 2, 3, 4, 4, 5, 5\]);  
const **stat2** = new Stats(\[1, 1, 2, 2, 3, 3, 4, 4\]);describe("Mean", () => {  
 it("**Should implement mean**", () => {  
  assert.equal(Stats.round(stat1.mean()), 3.43);  
  assert.equal(Stats.round(stat2.mean()), 2.5);  
 });  
});describe("Median", () => {  
 it("**Should implement median**", () => {  
  assert.equal(stat1.median(), 4);  
  assert.equal(stat2.median(), 2.5);  
 });  
});describe("Mode", () => {  
 it("**Should implement mode**", () => {  
  assert.deepEqual(stat1.mode(), \[4, 5\]);  
  assert.deepEqual(stat2.mode(), \[\]);  
 });  
});

**Analysis**:

In terms of difficulty, the algorithm to find the _mean_ of a collection of numbers is the easiest. Statistically, the `mean` is defined as the _sum_ of the collection divided by its _size_. Therefore, we can simply use the array’s `reduce` method to calculate its sum and then divide that by its `length`. This algorithm has runtime complexities of _linear_ time and _constant_ space because every number needs to be added while no internal memory is necessary.

The algorithm to find the _median_ of a collection is of medium difficulty. First, we need to sort the array, but if its size is even, we will need extra logic to deal with two middle numbers. In these cases, we will need to return the _average_ of those two numbers. This algorithm has a _linearithmic_ time complexity due to sorting and a _linear_ space complexity because internal memory is needed to hold the sorted array.

The algorithm to find the _mode_ is the most challenging. Since the `mode` is defined as the number or numbers that appear the most often, we will need to maintain a _frequency table_. To complicate things further, if every value appears the same number of times, there is no mode. In code, this means we will need to create a _hash map_ that tallies the frequency of each unique number, and then loop through it to collect the maximum number or numbers, or none. Because every number needs to be counted to create the hash table which is held in memory, this algorithm has a _linear_ time and space complexity.

**Code**:

15\. Two Sum
------------

Given an `array` of numbers, return _all pairs_ that add up to a given `sum`. The numbers can be used more than once.

describe("Two Sum", () => {  
 it("**Should implement two sum**", () => {  
  assert.deepEqual(twoSum(\[1, 2, 2, 3, 4\], 4), \[\[2, 2\], \[3, 1\]\]);  
 });  
});

**Analysis**:

An obvious solution is to create _nested loops_ that check each number against every other number in the same array. Those that add up to the given sum can be pushed to a _solution array_ as pairs. However, this nesting causes a _quadratic_ time complexity which is not performant for large inputs.

A clever trick is to maintain an array that contains the “counterpart" of each number as we iterate through the input array, while simultaneously checking for the existence of each number’s counterpart. By maintaining such an array, we sacrifice space efficiency to gain a _linear_ time complexity.

**Code**:

16\. Max Profit
---------------

Given an `array` of stock prices, find the _minimum_ `buy price` and the _maximum_ `sell price` that produce the _greatest profit_.

describe("Max Profit", () => {  
 it("**Should return minimum buy price and maximum sell price**", () => {  
  assert.deepEqual(maxProfit(\[1, 2, 3, 4, 5\]), \[1, 5\]);  
  assert.deepEqual(maxProfit(\[2, 1, 5, 3, 4\]), \[1, 5\]);  
  assert.deepEqual(maxProfit(\[2, 10, 1, 3\]), \[2, 10\]);  
  assert.deepEqual(maxProfit(\[2, 1, 2, 11\]), \[1, 11\]);  
});

**Analysis**:

Again, we can create _nested loops_ that check every possible combination of buy price and sell price to see which pair produces the greatest profit. Because technically we cannot sell before we buy, not every combination needs to be checked. Specifically, for a given buy price, we can ignore all preceding prices for the sell price. As such, the time complexity for this algorithm is better than _quadratic_.

With a little more thought, we can solve the problem using only one loop through the prices array. The key insight is to realize that the sell price should never be less than the buy price; if so, we should have bought the stock at that lower price. In code, this means we can simply hold a _temporary boolean_ to indicate that we should change the buy price on the next iteration. Requiring only one loop, this elegant approach has a _linear_ time and _constant_ space complexity.

**Code**:

17\. Sieve of Eratosthenes
--------------------------

For a given `number`, find all the _prime numbers_ from zero to that number.

describe("Sieve of Eratosthenes", () => {  
 it("**Should return all prime numbers**", () => {  
  assert.deepEqual(primes(10), \[2, 3, 5, 7\]);  
 });  
});

**Analysis**:

At first blush, we may be tempted to loop through every possible number and simply use the modulus operator to check for all the possible divisibilities. However, it’s easy to surmise that this approach is terribly inefficient, with a time complexity worse than quadratic. Thankfully, _Eratosthenes of Cyrene_, the inventor of geography, also invented an efficient method for identifying prime numbers.

In code, the first step is to create an array as large as the given number, with all its values initialized as `true`. In other words, the array _indexes_ represent all the possible prime numbers, with all being _true_ at the beginning. Then, we create a `for` loop that iterates from 2 to the _square root_ of the given number, using array _key interpolation_ to designate the `product` with every number as _false_. By definition, products of any integer cannot be prime, while 0 and 1 are ignored because divisibility by them does not affect primality. Lastly, we can simply filter out all the _falsey_ values to arrive at all the prime numbers.

By sacrificing space efficiency to maintain an internal “hash table", this _sieve_ of Eratosthenes has a time complexity better than quadratic, or `O(n * log (log n))`.

**Code**:

18\. Fibonacci
--------------

Implement a `function` that returns the _fibonacci number_ at a given `index`.

describe("Fibonacci", () => {  
 it("**Should implement fibonacci**", () => {  
  assert.equal(fibonacci(1), 1);  
  assert.equal(fibonacci(2), 1);  
  assert.equal(fibonacci(3), 2);  
  assert.equal(fibonacci(6), 8);  
  assert.equal(fibonacci(10), 55);  
 });  
});

**Analysis**:

Since a fibonacci number is the sum of the previous two, the simplest approach is to use _recursion_. The fibonacci series is premised on the first two being 0 and 1; therefore, we can use this fact to create our _base case_. For index that is greater than 2, we can recall our fibonacci function to add the previous two. Though quite elegant, this recursive approach is terribly inefficient, with an _exponential_ time and _linear_ space complexity. Because every function call requires exponential memory on the call stack, it will quickly break.

Though not as elegant, an iterative approach is more time efficient. By using a loop to build the entire fibonacci series up to the given index, it achieves _linear_ time and space.

**Code**:

19\. Memoized Fibonacci
-----------------------

Implement a _performant_ recursive function for the fibonacci series.

describe("Memoized Fibonacci", () => {  
 it("**Should implement memoized fibonacci**", () => {  
  assert.equal(fibonacci(6), 8);  
  assert.equal(fibonacci(10), 55);  
 });  
});

**Analysis**:

Since the fibonacci series makes redundant exponential calls to itself, it can benefit dramatically from a strategy called _memoization_. In other words, if we keep a _cache_ of all the inputs and outputs as we call our function, the number of calls will reduce to _linear_ time. Of course, this means we have sacrificed additional memory.

In code, we can implement the memoization technique inside the function itself, or we can abstract it as a higher-order utility function that decorates any function with memoization.

**Code**:

20\. Staircase
--------------

For a given number of `steps`, print out a “staircase" using _hashes_ and _spaces_.

describe("Steps", () => {  
 it("**Should print steps**", () => {  
  assert.equal(steps(3), "#  \\n## \\n###\\n");  
  assert.equal(\_steps(3), "#  \\n## \\n###\\n");  
 });  
});

**Analysis**:

The key insight is to realize that as we move down the steps, the number of `hashes` _increments_ while the number of `spaces` _decrements_. If we have `n` steps, the overall dimension is `n` by `n`. This means the runtime complexity is _quadratic_ for both time and space.

A recursive approach is also possible using this insight. Except, we need to pass along _additional parameters_ in place of the necessary temporary variables.

**Code**:

21\. Pyramid
------------

For a given number of `levels`, print out a “pyramid" using _hashes_ and _spaces_.

describe("Pyramid", () => {  
 it("**Should print pyramid**", () => {  
  assert.equal(pyramid(3), "  #  \\n ### \\n#####\\n");  
  assert.equal(\_pyramid(3), "  #  \\n ### \\n#####\\n");  
 });  
});

**Analysis**:

The key insight is to realize that a pyramid with `n` steps (height) has a width of `2 * n — 1`. Then, it’s just a matter of _incrementing_ the number of _hashes_ and _decrementing_ the number of _spaces_ starting from the center outwards as we go down the levels. Since this algorithm iteratively builds up a pyramid of size `n` by `2 * n — 1`, it has a `quadratic` runtime complexity for both time and space.

Again, a recursive approach is also possible using this insight. Except, we need to pass along _additional parameters_ in place of the necessary temporary variables.

**Code**:

22\. Matrix Spiral
------------------

Create a _square matrix_ of a given `size` in which elements are in _spiral order_.

describe("Matrix Spiral", () => {  
 it("**Should implement matrix spiral**", () => {  
  assert.deepEqual(spiral(3), \[\[1, 2, 3\], \[8, 9, 4\], \[7, 6, 5\]\]);  
 });  
});

**Analysis**:

Though a very challenging problem, the trick is to create `temporary variables` that point at the _current row_ and _current column_, both at the _start_ and the _end_. That way, we can iteratively _increment_ the `starting row` and `starting column` and _decrement_ the `ending row` and `ending column` in a manner that spirals toward the center of the matrix.

Because this algorithm iteratively builds up a _square_ matrix of a given size, its runtime complexity is _quadratic_ for both time and space.

**Code**:

Since data structures are the “building blocks" of algorithms, it’s worthwhile to explore the most popular ones.

_Again, for a quick high-level analysis, check out:_

Queues
------

Given two `queues` as inputs, create a _new_ queue by “weaving" them together.

describe("Weaving with Queues", () => {  
 it("**Should weave two queues together**", () => {  
  const one = new Queue();  
  one.enqueue(1);  
  one.enqueue(2);  
  one.enqueue(3); const two = new Queue();  
  two.enqueue("one");  
  two.enqueue("two");  
  two.enqueue("three"); const result = weave(one, two);  
  assert.equal(result.dequeue(), 1);  
  assert.equal(result.dequeue(), "one");  
  assert.equal(result.dequeue(), 2);  
  assert.equal(result.dequeue(), "two");  
  assert.equal(result.dequeue(), 3);  
  assert.equal(result.dequeue(), "three");  
  assert.equal(result.dequeue(), undefined);  
 });

**Analysis**:

At the minimum, the `Queue` class needs to have an `enqueue`, `dequeue`, and `peek` methods. Then, we can use the `while` loop to _peek_ for existence, and if truthy, we can _dequeue_ it out and then _enqueue_ it to our new `queue`.

This algorithm has `O(n + m)` for both time and space because we need to iterate through two different collections and store them.

**Code**:

Stacks
------

Implement a `Queue` class using two _stacks_.

describe("Queue from Stacks", () => {  
 it("**Should implement queue using two stacks**", () => {  
  const queue = new Queue();  
  queue.enqueue(1);  
  queue.enqueue(2);  
  queue.enqueue(3);  
  assert.equal(queue.peek(), 1);  
  assert.equal(queue.dequeue(), 1);  
  assert.equal(queue.dequeue(), 2);  
  assert.equal(queue.dequeue(), 3);  
  assert.equal(queue.dequeue(), undefined);  
 });  
});

**Analysis**:

We can begin with a _class constructor_ that initializes two stacks. Because the _last_ record inserted is the _first_ record removed in a _stack_, we will need to loop to the last record to “dequeue" or “peek" to mimic the behavior of a _queue,_ whereby the the _first_ record inserted is the _first_ record removed. We can do this by using the second stack to _temporarily_ hold all the items from the first stack until we reach the end. After the “peeking" or “dequeuing", we simply move everything back to the first stack. To “enqueue" a record, we can simply push it to the first stack.

Though we use two stacks and need to loop twice, this algorithm is still asymptotically _linear_ in time and space.

**Code**:

Linked Lists
------------

Single linked lists usually have the following functionalities:

describe("Linked List", () => {  
 it("**Should implement insertHead**", () => {  
  const chain = new LinkedList();  
  chain.insertHead(1);  
  assert.equal(chain.head.data, 1);  
 }); it("**Should implement size**", () => {  
  const chain = new LinkedList();  
  chain.insertHead(1);  
  assert.equal(chain.size(), 1);  
 }); it("**Should implement getHead**", () => {  
  const chain = new LinkedList();  
  chain.insertHead(1);  
  assert.equal(chain.getHead().data, 1);  
 }); it("**Should implement getTail**", () => {  
  const chain = new LinkedList();  
  chain.insertHead(1);  
  assert.equal(chain.getTail().data, 1);  
 }); it("**Should implement clear**", () => {  
  const chain = new LinkedList();  
  chain.insertHead(1);  
  chain.clear();  
  assert.equal(chain.size(), 0);  
 }); it("**Should implement removeHead**", () => {  
  const chain = new LinkedList();  
  chain.insertHead(1);  
  chain.removeHead();  
  assert.equal(chain.size(), 0);  
 }); it("**Should implement removeTail**", () => {  
  const chain = new LinkedList();  
  chain.insertHead(1);  
  chain.removeTail();  
  assert.equal(chain.size(), 0);  
 }); it("**Should implement insertTail**", () => {  
  const chain = new LinkedList();  
  chain.insertTail(1);  
  assert.equal(chain.getTail().data, 1);  
 }); it("**Should implement getAt**", () => {  
  const chain = new LinkedList();  
  chain.insertHead(1);  
  assert.equal(chain.getAt(0).data, 1);  
 }); it("**Should implement removeAt**", () => {  
  const chain = new LinkedList();  
  chain.insertHead(1);  
  chain.removeAt(0);  
  assert.equal(chain.size(), 0);  
 }); it("**Should implement insertAt**", () => {  
  const chain = new LinkedList();  
  chain.insertAt(0, 1);  
  assert.equal(chain.getAt(0).data, 1);  
 }); it("**Should implement forEach**", () => {  
  const chain = new LinkedList();  
  chain.insertHead(1);  
  chain.insertHead(2);  
  chain.forEach((node, index) => (node.data = node.data + index));  
  assert.equal(chain.getTail().data, 2);  
 }); it("**Should implement iterator**", () => {  
  const chain = new LinkedList();  
  chain.insertHead(1);  
  chain.insertHead(2);  
  for (let node of chain) node.data = node.data + 1;  
  assert.equal(chain.getTail().data, 2);  
 });  
});

**Code**:

**Challenge #1: Midpoint**

Without keeping a counter, return the _middle value_ of a linked list.

describe("Midpoint of Linked List", () => {  
 it("**Should return midpoint of linked list**", () => {  
  const chain = new LinkedList();  
  chain.insertHead(1);  
  chain.insertHead(2);  
  chain.insertHead(3);  
  chain.insertHead(4);  
  chain.insertHead(5);  
  assert.equal(midpoint(chain).data, 3);  
 });  
});

**Analysis**:

The trick is to traverse down the list _two times_, one of which is _two times faster_. When the faster one reaches the end, the slower one stops at the middle!

This algorithm has _linear_ time and _constant_ space.

**Code**:

**Challenge #2: Circular**

Without keeping node references, check if a linked list is _circular_.

describe("Circular Linked List", () => {  
 it("**Should check for circular linked list**", () => {  
  const chain = new LinkedList();  
  chain.insertHead(1);  
  chain.insertHead(2);  
  chain.insertHead(3);  
  chain.head.next.next.next = chain.head;  
  assert.equal(circular(chain), true);  
 });  
});

**Analysis**:

Many linked list functionalities are predicated on having a _definite_ ending node. Therefore, ensuring that it’s not circular is critical. Again, the trick is to traverse the list two times, one of which is two times faster. If the list is circular, eventually, the faster one will loop around and coincide with the slower one. We can exit the loop here and return `true`. Otherwise, the end will be reached, and we can return `false`.

This algorithm also has _linear_ time and _constant_ space.

**Code**:

**Challenge #3: From Tail**

Without keeping a counter, return the _value_ in a linked list that is at a given `step` away from the end.

describe("From Tail of Linked List", () => {  
 it("**Should step from tail of linked list**", () => {  
  const chain = new LinkedList();  
  chain.insertHead(1);  
  chain.insertHead(2);  
  chain.insertHead(3);  
  chain.insertHead(4);  
  chain.insertHead(5);  
  assert.equal(fromTail(chain, 2).data, 3);  
 });  
});

**Analysis**:

The trick is similar to the previous in that we traverse the list two times. In this case, however, the “faster" one begins _ahead_ of the “slower" one, at the given `step` away. Then, we walk them both down the list at the same pace until the faster one reaches the end. At that point, the slower one is precisely at the right step away from the end.

This algorithm also has _linear_ time and _constant_ space.

**Code**:

Trees
-----

Trees usually have the following functionalities:

describe("Trees", () => {  
 it("**Should add and remove nodes**", () => {  
  const root = new Node(1);  
  root.add(2);  
  assert.equal(root.data, 1);  
  assert.equal(root.children\[0\].data, 2);  
  root.remove(2);  
  assert.equal(root.children.length, 0);  
 }); it("**Should traverse by breadth**", () => {  
  const tree = new Tree();  
  tree.root = new Node(1);  
  tree.root.add(2);  
  tree.root.add(3);  
  tree.root.children\[0\].add(4); const numbers = \[\];  
  tree.traverseBF(node => numbers.push(node.data));  
  assert.deepEqual(numbers, \[1, 2, 3, 4\]);  
 }); it("**Should traverse by depth**", () => {  
  const tree = new Tree();  
  tree.root = new Node(1);  
  tree.root.add(2);  
  tree.root.add(3);  
  tree.root.children\[0\].add(4); const numbers = \[\];  
  tree.traverseDF(node => numbers.push(node.data));  
  assert.deepEqual(numbers, \[1, 2, 4, 3\]);  
 });  
});

**Code**:

**Challenge #1: Tree Widths**

For a given `tree`, return the _width_ of each level.

describe("Width of Tree Levels", () => {  
 it("**Should return width of each tree level**", () => {  
  const root = new Node(1);  
  root.add(2);  
  root.add(3);  
  root.children\[1\].add(4); assert.deepEqual(treeWidths(root), \[1, 2, 1\]);  
 });  
});

**Analysis**:

A tree can be traversed by _depth first_ or _breadth first_ using a `stack` or `queue` to help iterate through all its _slices_ and _levels_, respectively. Since we want to count all the nodes on each level, we need to traverse the tree by _breadth first_ with the help of a `queue`. The trick here is to enqueue a special `marker` to let us know that the end of the current level has been reached so that we can _reset_ the `counter` for the next level.

This approach has a _linear_ time and space complexity. Though our `counter` is an array, its size can never be greater than linear.

**Code**:

**Challenge #2: Tree Height**

For a given `tree`, return the _height_ (maximum number of levels).

describe("Height of Tree", () => {  
 it("**Should return max number of levels**", () => {  
  const root = new Node(1);  
  root.add(2);  
  root.add(3);  
  root.children\[1\].add(4); assert.deepEqual(treeHeight(root), 2);  
 });  
});

**Analysis**:

We can simply reuse our logic from the first challenge. In this case, however, we increment our `counter` whenever we encounter `“reset"` instead. The logic is nearly identical, so this algorithm also has a _linear_ time and space complexity. Here, our `counter` is just an integer, which makes its size even more negligible.

**Code**:

Graphs
------

Please check back! (TK)

There are many algorithms that we can use to sort a collection of data. Thankfully, interviewers only expect us to understand the basics and first principles. For instance, the best algorithms can achieve _linearithmic_ time in _constant_ space. In this spirit, we will review the most popular ones in order of increasing difficulty and efficiency.

Bubble Sort
-----------

This algorithm is the easiest to understand but is also the most inefficient. It _compares_ every item against every other item, _swapping_ the order until the bigger ones “bubble" to the top. This algorithm requires _quadratic_ time and _constant_ space.

Insertion Sort
--------------

Like bubble sort, every item is compared with every other item. Instead of swapping, it “splices" in the correct order. In effect, it maintains the original order of repeated items. This “greedy" algorithm also requires _quadratic_ time and _constant_ space.

Selection Sort
--------------

As the loop iterates through a collection, this algorithm finds and “selects" the index with the _lowest value_ and swaps it with the beginning index wherever appropriate. This algorithm also requires _quadratic_ time and _constant_ space.

Quick Sort
----------

This algorithm recursively selects an element as the _pivot_ and iteratively pushes all the smaller elements to the left and all the larger elements to the right until all is sorted. This algorithm requires _quadratic_ time and _logarithmic_ space such that in practice is often the _fastest_. As such, most programming languages natively implement this algorithm for sorting.

Merge Sort
----------

Though one of the most efficient, this algorithm can be challenging to understand. It requires a _recursive_ part that splits up a collection into single units, and then an _iterative_ part that combines them back together in the right order. This algorithm takes _linearithmic_ time and _linear_ space.

Counting Sort
-------------

If we somehow know the _maximum value_, we can use this algorithm to sort a collection in _linear_ time and space! The maximum value lets us create an array of that size to _count_ the occurrence of each _index value_. Then, it’s just a matter of extracting all the indexes that have _non-zero_ counts into our result array. By exploiting the _constant-time_ lookup of arrays, this hash-like algorithm is the most performant possible.

Other Sorting Algorithms
------------------------

![Image for post](https://miro.medium.com/max/2424/1*7ErHjLrOGhdkmMm_nQfo-g.png)

Chart: [http://bigocheatsheet.com](http://bigocheatsheet.com/)

The worst algorithm needs to search every item in a collection, taking `O(n)` time. If somehow the collection is already sorted, only half needs to be checked at each iteration, taking just `O(log n)` time, a huge performance boost especially for very large datasets.

Binary Search
-------------

When a collection is sorted, we can _iteratively_ or _recursively_ check our desired value against the middle item, discarding the half where we know our value cannot exist. In effect, our target can be found in _logarithmic_ time and _constant_ space.

Binary Search Tree
------------------

An alternative to sorting a collection is to generate a _Binary Search Tree_ (BST) from it. As a BST, searching through it is as efficient as binary search. In a similar way, we can discard the half that we know cannot contain our desired value at every iteration. In fact, another way to sort a collection is to do a depth-first traversal across this tree _in-order_!

BST creation happens in _linear_ time and space, but searching through it happens in _logarithmic_ time and _constant_ space.

To validate that a binary tree is a BST, we can recursively check that every left child must be less than the root (maximum possible) and every right child must be greater than the root (minimum possible) _at every root_. This solution requires _linear_ time and _constant_ space.

In modern web development, **functions** lie at the heart of the web experience. **Data structures** enter and exit functions while **algorithms** dictate the internal mechanics. The way a data structure scales is described by its _space complexity_, while the way an algorithm scales is described by its _time complexity_. In practice, runtime complexities are expressed as **Big-O** notations which help engineers to compare and contrast all the solution possibilities. The most efficient runtime is _constant_ and does not depend on input sizes; the most inefficient requires _exponential_ operations and memories. To truly master algorithms and data structures is to be able to reason _linearly_ and _systemically_ in parallel_._

Theoretically, every problem has both an **iterative** solution and a **recursive** one. An iterative approach starts from the bottom and _dynamically_ arrives at a solution. A recursive approach starts from the top by recognizing _overlapping subproblems_. Usually, a recursive solution is more expressive and simpler to implement, but an iterative solution is easier to grok and requires less memory. With _first-class_ functions and _control-flow_ constructs, JavaScript natively supports both approaches. Generally, space efficiency needs to be sacrificed for performance gains, or time efficiency needs to be sacrificed for less memory usage. The right balance depends on the context and the environment. Thankfully, most interviewers are more concerned with the _calculus_ than the outcome.

To really impress your interviewer, expand her purview by looking ahead and above for opportunities to utilize **architectures** and **design patterns** that increase _reusability_ and _maintainability_. If you’re seeking a senior position, knowledge of fundamentals and first principles, and experience with system-level design are equally important. Nevertheless, the best companies also assess for _cultural fit_. Because no one is perfect, the right team is essential. More importantly, some things in this world are impossible to achieve alone. More often than not, the things we create together and for each other are the most satisfying and meaningful.

_Interested in_ **_blockchain_**_?_ [_Learn Ethereum_](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/heartbankacademy/a-complete-mental-model-for-ethereum-dapp-development-5ce08598ed0a) _and come work for us!_

References:

*   [https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global\_Objects/Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)
*   [https://en.wikipedia.org/wiki/Church%E2%80%93Turing\_thesis](https://en.wikipedia.org/wiki/Church%E2%80%93Turing_thesis)
*   [http://bigocheatsheet.com/](http://bigocheatsheet.com/)
*   [https://www.udemy.com/coding-interview-bootcamp-algorithms-and-data-structure/](https://www.udemy.com/coding-interview-bootcamp-algorithms-and-data-structure/)
*   [https://www.toptal.com/developers/sorting-algorithms](https://www.toptal.com/developers/sorting-algorithms)


[Source](https://medium.com/siliconwat/algorithms-in-javascript-b0bed68f4038)
