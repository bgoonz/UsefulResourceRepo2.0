# React Props Cheatsheet: 10 Patterns You Should Know

> Props are a powerful tool to use in React, but how do you use them effectively to write robust, reliable React components and applications? In this tutorial, we will be reviewing ten patterns you should use when working with props in React. We will not only touch on what these

Props are a powerful tool to use in React, but how do you use them effectively to write robust, reliable React components and applications?

In this tutorial, we will be reviewing ten patterns you should use when working with props in React.

We will not only touch on what these patterns are and how to use them, but you'll see how to use them on your own through practical, real-world examples.

Let’s get started!

### Want Your Own Copy?‬ 📄

**[Click here to download the cheatsheet in PDF format](http://bit.ly/react-props-2021)** (it takes 5 seconds).

It includes all of the essential information here as a convenient PDF guide.

1\. React props can be passed conditionally
-------------------------------------------

Props that are passed to components can be thought of like arguments that are passed to a function.

If prop values are not passed a certain component, an error will not be thrown. Instead, within the component that prop will have a value of `undefined`.

![](https://www.freecodecamp.org/news/content/images/2021/02/props-1-min.gif)

If you would like to be alerted to when a value is not passed as a prop to a component, you can use a tool like prop-types or TypeScript using these tools.

> With prop-types or TypeScript, we can tell React the props we are passing for a given component, what their values should be, and whether they are optional.

In plain React, be aware that passing props can be something you forget to do. Also you might not pass a certain prop to a component, if you so choose.

2\. React props passed with just their name have a value of true
----------------------------------------------------------------

Every prop must be given an associated value that is provided after the equals operator.

But what happens when we don't provide that equals operator as well as a value?

If you just provide the proper name on a component with nothing else, you pass a boolean value of true for that prop to the component. There is no need to write that a prop is equal to true.

Instead, you can just include the prop value, and it will be given the boolean value true when you use it in a component to which you pass it.

![](https://www.freecodecamp.org/news/content/images/2021/02/props-2-min.gif)

3\. React props can be accessed as an object or destructured
------------------------------------------------------------

There are a couple of patterns we can use for accessing prop values in our components.

Props can be accessed as an entire object which is usually called "props". Or they can be destructured, since props will always be an object, into separate variables.

If you have a lot of props that you're passing down to your component, it may be best to include them on the entire props object and access them by saying `props.propName`.

However, if you only have a few props that you're passing down to your component, you can immediately destructure them within the parameters of your function component.

![](https://www.freecodecamp.org/news/content/images/2021/02/props-3-min.gif)

You can use ES6 object destructuring to include a set of curly braces within your function component's parameters, and immediately grab the properties off of the object, as well as declare them as separate variables.

This cuts down on our code and eliminates the need to say `props.propName` to get each props value.

4\. React components can be passed as props (including children)
----------------------------------------------------------------

We've seen that props are very flexible, and if we don't pass them to a component, an error will not be thrown.

This flexibility is also extended to what we can pass as a prop. Not only can JSX elements be passed as props to components, but we can also pass other components as props.

In fact, there is a special type of prop that is automatically provided on the props object called `children`.

> We receive any children for a given component if any components or elements are passed between the opening and closing tags of that component.

![](https://www.freecodecamp.org/news/content/images/2021/02/props-4-min.gif)

The children prop allows us to compose our components in powerful ways.

This is especially helpful when we need to wrap one component around another, such as for styling, or to pass more component data to the children components to give two examples:

1.  Children props are very helpful when you want to make a generic layout component and give the same layout to all of the components that are passed as children.
2.  Also, children are useful when you want to place a context provider from React context around your component tree to easily provide what is placed on context provider to all of its child components so they can receive the same data.

5\. Anything can be passed as a prop in React (especially functions)
--------------------------------------------------------------------

Any normal JavaScript value can be passed as props as well, including functions.

There are some powerful patterns which have emerged, due to the ability to pass functions as props. A very common pattern is passing a function down to a child component as a prop, which can update the parent component's state, and then calling it within that child component.

![](https://www.freecodecamp.org/news/content/images/2021/02/props-5-min.gif)

> Using this function that is passed down to update the parent's state and perform a function is called "lifting state up".

Additionally, there are other patterns, such as the render props pattern, which also involve passing a function down to a child component to then be called back and perform some cross-component function.

6\. Update a React prop's value with state
------------------------------------------

Props cannot be directly updated.

To pass a prop value to a component, we cannot within that function component attempt to immediately change that prop's value.

> Prop values must be pure values. In other words, they cannot be mutated or changed directly.

We know that in React if we want to change values over time, the appropriate means to do so is with state.

![](https://www.freecodecamp.org/news/content/images/2021/02/props-6-min.gif)

If we would like to pass in a prop value to a component and change it later on, we can give it to a stateful React hook to store that value as a variable. Then we can update it later on using the appropriate setter function. We can do so with the `useState` hook or the `useReducer` hook, for example.

7\. React props can be spread in individually
---------------------------------------------

What if we have an object whose properties we want to pass down as individual prop values?

This object has a lot of properties, however. Do we need to manually create individual props and set the prop to `object.propertyName`?

No – instead of doing that for every property, we can very easily take the object and spread its properties down to a component as individual prop values using the object spread operator `{...myPropObject}`.

![](https://www.freecodecamp.org/news/content/images/2021/02/props-7-min.gif)

By using this syntax, which is a feature in ES7, it enables us to automatically create individual props according to an object's property names, without having to write all those property names out.

It's very convenient when working with large objects with a lot of properties we want to pass as individual props to a component.

8\. React props can be given a default value if none is provided
----------------------------------------------------------------

What if we already know that we are passing down a prop to one instance of a component, but we're not passing that prop to another instance of it?

Or maybe I know that the prop might not have a value. What do we do to give it a default value instead of just the value `undefined` if no prop value is passed to it?

If we are using destructuring to access that prop within our function component, we can use the equals operator to give it a default value. So if no prop value is passed for that prop, we can use the equals operator next to it and set it to a better default value.

![](https://www.freecodecamp.org/news/content/images/2021/02/props-8-min.gif)

Setting a default value is very important because the normal default value for a prop is `undefined`. This can help us avoid errors that may result from our expected prop value not being there.

9\. React props can be renamed to avoid errors
----------------------------------------------

Additionally, what if there is a naming conflict with one of our props?

What if we use a prop name across many of our components already and we see that there is another value within our component that has the same variable name?

Instead of having to go around and rename all of our prop values on all of our instances of our components, we can just use a colon after that prop name, if we're destructuring it, to give it an alias.

![](https://www.freecodecamp.org/news/content/images/2021/02/props-9-min.gif)

In other words, we give it a different name just in that instance. This will avoid the naming conflict as well as the error.

10\. Don't attempt to destructure React props multiple times
------------------------------------------------------------

If we are destructuring an object from our props object, be aware that it is possible to destructure that prop even further into its constituent properties.

However, it is not generally recommended to do so unless you are very confident that that object will always have those properties.

If one of those properties is missing and you attempt to destructure it multiple levels deep, it can give you a pretty nasty error when you're trying to access a property that doesn't exist.

![](https://www.freecodecamp.org/news/content/images/2021/02/props-10-min.gif)

Note that you can use destructuring as much as you'd like, but it can be hard to read up to a certain point and it also can be unreliable. If you're trying to access a property on an object, which may not exist, it will cause an error.

Want to keep this guide for future reference?‬
----------------------------------------------

**[Click here to download the cheatsheet as a helpful PDF](http://bit.ly/react-props-2021).**

Here are 3 quick wins you get when you grab the downloadable version:

*   You'll get tons of copyable code snippets for easy reuse in your own projects.
*   It is a great reference guide to strengthen your skills as a React developer and for job interviews.
*   You can take, use, print, read, and re-read this guide literally anywhere that you like.

Learn to code for free. freeCodeCamp's open source curriculum has helped more than 40,000 people get jobs as developers. [Get started](https://www.freecodecamp.org/learn)


[Source](https://www.freecodecamp.org/news/react-props-cheatsheet/)