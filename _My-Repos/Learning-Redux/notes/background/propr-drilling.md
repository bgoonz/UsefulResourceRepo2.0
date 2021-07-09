# How To Avoid Prop Drilling in React Using Component Composition

> Prop Drilling is the process by which you pass data from one part of the React Component tree to another by going through other parts that…

## No Redux or Context API

[![Olusola Samuel](https://miro.medium.com/fit/c/96/96/1*4uKprtl6FxkdLgi0ozr1TA.jpeg)](https://solathecoder.medium.com/?source=post_page-----c42adfcdde1b--------------------------------)

![](https://miro.medium.com/max/2560/1*zd8xNfpnLt5nHEpNmXPMQw.jpeg)

Prop Drilling is the process by which you pass data from one part of the React Component tree to another by going through other parts that do not need the data but only help in passing it around.

Imagine someone living in Lagos, Nigeria placing an order on Amazon for a package. The package will have to go through many hands — it has to be flown by air to Nigeria, transported to the Lagos, moved from place to place until it gets into the hands of the buyer. At each stage, Amazon employs the services of people that do not ‘care’ about the product, they only help to ‘pass’ it to the person who cared — the buyer.

Prop drilling is similar: You pass data (props) from some `FirstComponent` to another `SecondComponent`— which doesn’t need the data to render but only passes it to another `ThirdComponent`, which also doesn’t need it and may pass it to another `FourthComponent`. This may continue until the data gets to the `ComponentNeedingProps`.

Consider the code snippet below:

[gist](https://gist.github.com/bgoonz/03340eb3c61cf93ff650ad74e1c7c01e)

The `content` prop is passed to `FirstComponent` in the root component, `App`. But `FirstComponent` does not need the prop to render, it only passes it to `SecondComponent`, which passes it to `ThirdComponent`, which passes it to `ComponentNeedingProps`. It is this component that uses the `content` prop to render content in `<h3>{content}</h3>`.

Prop drilling doesn’t have to be a problem. If we are passing data only between 2 or 3 levels, we are fine. It will be easy to trace the flow of data. But imagine, we are drilling 5 levels, or 10 levels, or 15.

![](https://miro.medium.com/max/60/1*R4csNpIyGu4cHg54n2P7xA.jpeg?q=20)

![](https://miro.medium.com/max/1014/1*R4csNpIyGu4cHg54n2P7xA.jpeg)

Prop drilling is not a new problem in React (quite obviously), and there have been many solutions that let us pass data down to deeply nested Components.

One of which is Redux: You create a data `store` and `connect` any component to the `store` and voila, no matter where the component is positioned in the Component Tree it has access to the store.

React also has the concept of `Context` which lets you create something like a global `data store` and any Component in ‘context’ can have access to the data store.

If you however want to solve this problem **without using context**, you can use Component Composition as suggested by the [React Docs:](https://reactjs.org/docs/context.html#when-to-use-context)

_If you only want to avoid passing some props through many levels, component composition is often a simpler solution than context_

You can learn more here [Before You Use Context](https://reactjs.org/docs/context.html#before-you-use-context) and also, check out

’s thread on why you should avoid using the Context API.

Component Composition is when you compose different Components, usually simple, together to create more complex functionality. If you have ever written a React app, I bet that you have been composing components. Take for example:

function LoginForm(props){  
return (

)  
}

Here, by using composition we are creating a ‘complex’ functionality, `LoginForm` by composing two simpler functionalities, `Button` and `Input` components. You can read more on the composition on React [documentation page](https://reactjs.org/docs/composition-vs-inheritance.html).

The actual problem is that we want `ComponentNeedingProps` to be rendered in `ThirdComponent` but it needs data from the root component, `App` to do so. In other words, `ComponentNeedingProps` needs data from somewhere higher in the Component Tree (`App`) from where it is rendered (`ThirdComponent`).

The Solution?

You can compose components by making one a child of another, for example:

`ReactComponent2` is invoked inside of `ReactComponent1` and hence it is a child of it. Every component has an ‘automatic’ prop named `children` that holds the children of the Component. So in `ReactComponent1` we can write:

function ReactComponent1({ children }) {  
return  
(

I render my children  
{children}

)  
}

How can we use it in this case? Remember we want `ComponentNeedingProps` to be rendered in another component down in the Component Tree, if we can pass `ComponentNeedingProps` as a child component with the data it needs and then render it in its parent then we have successfully avoided prop drilling.

So, we will have:

### I am the third component

     <ComponentNeedingProps content={content}  />

And in the declaration of `ThirdComponent` we have:

function ThirdComponent({ children }) {  
return (

    <h3>I am the third component</h3>
     {children}

);  
}

This doesn’t look much different from what we had earlier but wait for the magic.

By following this technique of rendering children, we can refactor `App` to this:

function App() {  
const content = “Who needs me?”;  
return (

);  
}

Then we refactor each of the other components to render their `children`

FirstComponent:

function FirstComponent({ children }) {  
return (

### I am the first component

;  
{ children }

);  
}

SecondComponent:

function SecondComponent({ children }) {  
return (

### I am the second component

;  
{children}

);  
}

ThirdComponent:

function ThirdComponent({ children }) {  
return (

### I am the third component

{children}

);  
}

`ComponentNeedingProps` stays as it is:

function ComponentNeedingProps({ content }) {  
return

### {content}

}

Did you see it? We have avoided prop drilling by giving `ComponentNeedingProps` the data it needs right from the source of the data `App` and then by using the children prop, we passed it down to where it should be rendered, `ThirdComponent`.

Awesome. See the complete code:

[final](https://gist.github.com/bgoonz/14f267102d11fd116256e5e10c2be817)

## When should you use the Context API?

You can also use the Context API to avoid prop drilling and I may write another article on that in the nearest future.

If you need to have some data accessible by many components at different nesting levels, then you should use the Context API. React docs advises that we ‘apply it sparingly because it makes component reuse more difficult.’ In other words, you might not be able to reuse your components ‘out of context’.

That is it for this post, thank you for reading through. You can play with the code on [CodeSandbox](https://codesandbox.io/s/propdrilling-vs-composition-updated-qe8nm?file=/src/App.js:0-878)

Happy Coding.

**_Note_**\_: This post has had to go through major revisions based on the feedback provided in the comments. I am grateful for all the people who provided useful feedback. Some of the comments below do not apply to this revision.\_

[Source](https://javascript.plainenglish.io/how-to-avoid-prop-drilling-in-react-using-component-composition-c42adfcdde1b)
