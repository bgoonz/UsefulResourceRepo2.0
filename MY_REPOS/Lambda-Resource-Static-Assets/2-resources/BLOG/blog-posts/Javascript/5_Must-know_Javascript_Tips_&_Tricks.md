# 5 Must-know Javascript Tips & Tricks

> Do you know them all?

Do you know them all?
---------------------

[

![Twan Mulder](https://miro.medium.com/fit/c/56/56/1*fzuLZpihgtHTem7NMMBVsw.jpeg)



](https://medium.com/@toktoktwan?source=post_page-----d1a04e9014de--------------------------------)

![Image for post](https://miro.medium.com/max/60/1*9NpIEqA7unwxJo7t_u1YUA.png?q=20)

![Image for post](https://miro.medium.com/max/4860/1*9NpIEqA7unwxJo7t_u1YUA.png)

JavaScript keeps adding new and neat features. Sometimes, it’s hard to keep up. In this article, I’ll share a couple of cool tips & tricks to keep you up to speed and deepen your JS knowledge.

![Image for post](https://miro.medium.com/max/60/1*YumzRMDm5AVUMNhejYp9Jg.png?q=20)

![Image for post](https://miro.medium.com/max/4896/1*YumzRMDm5AVUMNhejYp9Jg.png)

Imagine having an array with some duplicate items and wanting to filter out only the unique ones.

You could try writing a _map_ or _filter_ to achieve this. Alternatively, ES6 introduces the **_Set object_**, which solves this problem in just 1 line of code.

const arrayWithUniqueItems = \[...new Set(\[1, 2, 3, 3,\])\]  
// \[1, 2, 3\]

Now, this example uses integers, but you can use strings and floating-point numbers as well!

For a little more in-depth knowledge about the Set object, check out this [article by Claire-Parker Jones](https://dev.to/clairecodes/how-to-create-an-array-of-unique-values-in-javascript-using-sets-5dg6).

![Image for post](https://miro.medium.com/max/60/1*8p7lcXKKW3eCmIoLql8vmQ.png?q=20)

![Image for post](https://miro.medium.com/max/5368/1*8p7lcXKKW3eCmIoLql8vmQ.png)

Now this is a tricky one.

Shortening your “if” statements can be a great way to simplify your code.

However, if you need to write more complicated statements, you should definitely go for the first option.

// Instead of using this                                        
if (iAmHungry) {  
   bakeAnEgg()  
}// You can use this  
if (iAmHungry) bakeAnEgg()// Or this  
iAmHungry? bakeAnEgg() : 0

Remember, readability & ease-of-use are more important than a couple less lines of code.

![Image for post](https://miro.medium.com/max/60/1*JLm5quDrO7b5rIm7idsrdw.png?q=20)

![Image for post](https://miro.medium.com/max/4024/1*JLm5quDrO7b5rIm7idsrdw.png)

A great way of shortening an array is by redefining its length property.

let array = \[0, 1, 2, 3, 4, 5, 6, 6, 8, 9\]  
array.length = 4// Result: \[0, 1, 2, 3\]

Important to know though is that this is a destructive way of changing the array. This means you lose all the other values that used to be in the array.

![Image for post](https://miro.medium.com/max/60/1*QQDQHw4aEPHucfRvk6W0vg.png?q=20)

![Image for post](https://miro.medium.com/max/4760/1*QQDQHw4aEPHucfRvk6W0vg.png)

Let’s say you want to combine multiple objects into one object containing them all.

The spread operator ( … ) is a great way to achieve this!

const obj1 = {'a': 1, 'b': 2}  
const obj2 = {'c': 3}  
const obj3 = {'d': 4}// Combine them using the spread operator              
const objCombined = {...obj1, ...obj2, ...obj3}// Result: {'a': 1, 'b': 2, 'c': 3, 'd': 4}

Something to keep in mind while using this is that whenever you update one of the objects, it doesn’t reflect those changes in the combined object.

![Image for post](https://miro.medium.com/max/60/1*Z0iAQx6K5GMl2DiECkMwNQ.png?q=20)

![Image for post](https://miro.medium.com/max/5504/1*Z0iAQx6K5GMl2DiECkMwNQ.png)

JavaScript can access the current URL using the window.location object. Pretty neat, but even cooler is that this object contains certain parts of the URL as well.

Get access to the protocol/host/pathname/search/and more!

// JavaScript can access the current URL in parts. For this URL:  
\`[https://thatsanegg.com/example/index.html?s=article\`](https://thatsanegg.com/example/index.html?s=article`)window.location.protocol == \`https:\`  
window.location.host == \`thatsanegg.com\`  
window.location.pathname == \`/example/index.html\`  
window.location.search == \`?s=article\`

That’s all!
-----------

Thanks for reading, look at how much you’ve learned 😄

This article was originally posted on [“That’s an Egg”](https://www.thatsanegg.com/) 🍳


[Source](https://blog.prototypr.io/5-must-know-javascript-tips-tricks-d1a04e9014de)