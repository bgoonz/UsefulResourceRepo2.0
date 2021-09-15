# React Learning Roadmap For 2021

> The Roadmap For Learning React I Wish I Knew

The Roadmap For Learning React I Wish I Knew
--------------------------------------------

[![Mohit](https://miro.medium.com/fit/c/96/96/1*BT86Q6lnVw8evF8qKJCHYQ.jpeg)](https://mohit19.medium.com/?source=post_page-----a1c0f7456186--------------------------------)

![](https://miro.medium.com/max/60/1*77VFzpklgL26QApHui2N4A.png?q=20)

![](https://miro.medium.com/max/2556/1*77VFzpklgL26QApHui2N4A.png)

JavaScript To Know For React
----------------------------

Comparing **React** to other frameworks the best thing about React is how exposed you are while working with it, as there is no template DSL **_(JSX compiles to sensible JavaScript)_**, the component **API** has always been simpler with the addition of React Hooks and the framework offers a very little abstraction outside the core UI elements

1\. Template Literal
--------------------

Template Literal are enclosed by the backtick **(\` \`)** character instead of double or single quotes.

They can contain placeholder and these are indicated by the dollar sign and curly braces **(${}) and the expression in the placeholder and the text between the backticks get passed to the function.**

![](https://miro.medium.com/max/60/1*M2sbm5phLYxocPqyGuFeNQ.png?q=20)

![](https://miro.medium.com/max/2084/1*M2sbm5phLYxocPqyGuFeNQ.png)

2\. Shorthand Property Names
----------------------------

Pretty common for building **React** Applications, where an object is an expression that describes the initialization of an **_Object_** which consists of properties that are used to describe an **_Object_**.

The values of object properties can either contain primitive data types or other objects.

![](https://miro.medium.com/max/60/1*r8Ev8zTr849aGLigf5J28A.png?q=20)

![](https://miro.medium.com/max/2014/1*r8Ev8zTr849aGLigf5J28A.png)

3\. Arrow Functions
-------------------

Arrow functions are another way to write functions in **JavaScript**. But they do have a few differences and in React we don't have to worry about that because of **_this_** if we are using Hooks in our project rather than classes.

Arrow functions allow for terser anonymous functions and implicit returns so you will absolutely want to use them.

![](https://miro.medium.com/max/60/1*bW2mXpafvpGYqr6QLu4i8A.png?q=20)

![](https://miro.medium.com/max/2096/1*bW2mXpafvpGYqr6QLu4i8A.png)

4\. Destructuring
-----------------

One of the favorite **JS** feature that can destructure the objects and arrays.

![](https://miro.medium.com/max/60/1*qEixmUdGdLULtkep4CRfgw.png?q=20)

![](https://miro.medium.com/max/2304/1*qEixmUdGdLULtkep4CRfgw.png)

5\. Parameter Defaults
----------------------

In **JS** function parameters default to undefined, it is often useful to set a different value and this is where default parameters can help.

The general strategy for setting defaults was to test parameter values in the function body and assign a value if they are undefined.

![](https://miro.medium.com/max/60/1*yqR44_r0ddl6AW6GKBcxPA.png?q=20)

![](https://miro.medium.com/max/2270/1*yqR44_r0ddl6AW6GKBcxPA.png)

6\. Rest/ Spread Operator
-------------------------

The **… s**yntax is a kind of a collection syntax where it operates on a collection of values. You will be using it all the time in making complex applications I will highly recommend you to go through this concept as it always makes the works easy for you.

![](https://miro.medium.com/max/1690/1*PSZMoRwu2L15dogIQVQr2w.png)

7\. ESModules
-------------

Building apps with modern tools will always require you to learn about how the syntax works because any application of even trivial size will likely need to make use of modules for code reuse and organization.

8\. Ternary Operator/Conditional Operator
-----------------------------------------

This operator will save you a lot of time, in **JSX** it is the only JS operator that takes three operands:

1.  A condition followed by a question **(?)**.
2.  Then the expression to execute if the condition is truthy by a **colon(:).**
3.  And finally, the expression to execute if the condition is **falsy**.

![](https://miro.medium.com/max/1982/1*_izgYohsEGerOKJdHChdTg.png)

9\. Array Methods
-----------------

I use the arrays method all the time, you will probably use the following most used methods.

1.  find
2.  some
3.  every
4.  includes
5.  map
6.  filter
7.  reduce

For Example:

![](https://miro.medium.com/max/1834/1*dtNOyYXGG8y--wLTsNuFcg.png)

10\. Nulish Coalescing Operator
-------------------------------

This can be constructed with a logical **OR (||)** operator which returns the right-hand side operand if the left operand is any falsy value, not only null or undefined.

If you use **||** to provide some default value to another variable, you may encounter some errors if you consider any **falsy values.**

If the value is null or undefined, then you want to fall back to some default value:

![](https://miro.medium.com/max/2822/1*_df5VqaPCrAhF7Udl6C5Dg.png)

11\. Optional Chaining
----------------------

Also known as **‘Elvis operator ’** allow you to safely access properties and call functions that may not exist.

![](https://miro.medium.com/max/1834/1*LlI6NL2XFssF9gi_Xy6wvw.png)

12\. Promise and async/await
----------------------------

Promises are everywhere in the **JS** ecosystem, promises to help you manage asynchronous code, and are returned from any **DOM APIs** as well as third party libraries.

*   JSX
*   MDX
*   Components & Props
*   State & Lifecycle
*   Reconciliation & Virtual DOM
*   Handling Events
*   Refs
*   Fragments

1\. JSX (JavaScript XML)
------------------------

Let us consider a variable:

**const element = <h1>Hello, world!</h1>;**

We simply call this Tag syntax **JSX** it's neither an **HTML** nor a string.

_So why JSX is so essential to learn when it comes to_ **_React?_**

When we work with a huge number of separate components containing their own properties called **props, JSX** embraces the development of the React application, overall React doesn't require using JSX but people find it helpful as a visual is when working with UI elements in JavaScript code allowing React to show more useful error and warning messages.

**_Also, JSX has a lot of other advantages, for example, JSX prevents Injection Attacks because by default React DOM escapes any values embedded in JSX before rendering them._**

2\. MDX
-------

An authorable format that lets you write **JSX** in your Markdown documents. You can also import components such as interactive charts or alerts and embed them in your content. Using **_MDX_** has always been an advantage as there is no runtime in **MDX all compilation occurs during the build stage.**

3\. React Components & Props
----------------------------

With the newer version of **JavaScript,** we can define objects with properties using classes, and **React** let us use this syntax to create what we call **_Components._**

You need to practice two types of components:

1.  **_Class Components_**
2.  **_Functional Component_**

I have briefly explained the difference between both of them with examples (open the [**link**](https://medium.com/javascript-in-plain-english/understanding-the-difference-between-function-class-components-in-react-35279a119d29) to read further about React Components).

**4\. Props**
-------------

React props are simply like function arguments in JavaScript and attributes in **HTML**. To send props in a component we use the same syntax as in HTML attributes.

For example:

We add a name to the **userName** element.

**const myelement = <Car brand="Ford" />;**

And the component receives the argument as a prop object. If we run the following code:

It Returns, **_I am a Ford._**

So we are simply passing property to a component from the outside

**import React from 'react';  
import ReactDOM from 'react-dom';  
**  
class Car extends React.Component {  
  render() {  
    return <h2>I am a {this.props.brand}!</h2>  
  }  
}

const myelement = <Car brand="Ford" />;

ReactDOM.render(myelement, document.getElementById('root'));

5\. State & Lifecycle
---------------------

React components have a built-in **state** object, the state object is where you store property values that belong to the component. So whenever the **state** changes, the **component re-renders.**

There is a lot more to talk about states with deeper concepts but we will just talk about the outer parts.

> There are only 3 types of states**, Locally, Parenting, Remotely.**

*   **Locally**

The local state management occurs within the component itself, also this is most commonly done with the **useState**, **useReducer**, and **this.state** in class components. Look at the counter component for example:

![](https://miro.medium.com/max/2596/1*SAU69RaxZu6_fYIqTxo4wA.png)

**Local State**

*   **Parentally**

The state management happens when the data and its **_updaters_** are passed in as props from somewhere higher in the component tree.

In the above example if we use the state parentally it will be simple as moving data and updating functions to a parent controlling component and passing them in as **props** to a controlled child component.

![](https://miro.medium.com/max/1850/1*_DCOqjZnkOnrIF31SyU4vA.png)

*   **Remotely**

The remote state management happens when we store and update data outside of the ancestry of a component. We use these methods very commonly in **Redux** or the **React Context API.**

The essential part of this concept is the updaters are at a distance from the consuming component and require some work for supplying the data to the consumer.

6\. Lifecycle
-------------

As we define a lifecycle as birth, growth, and death similarly in the React components we follow this cycle as well:

**_. Created(mounted on DOM)_**

**_. Growth(Updating)_**

**_. Death(unmounted from the DOM)_**

And the lifecycle can be broken into four parts:

*   Initialization
*   Mounting
*   Updating
*   Unmounting

7\. Reconciliation & Virtual DOM
--------------------------------

Rect provided a declarative API so that we don't have to worry about exactly what changes on every update and this makes writing applications much easier. When the components state changes, React has to calculate if it is necessary to update the DOM.

**8\. Understanding The Virtual DOM**
-------------------------------------

In React for every DOM object, there is a corresponding **‘virtual DOM’** object, which is a representation of a DOM object.

**Virtual DOM** object has the same properties as the real DOM object, even though it lacks the real thing’s power to directly change what’s on the screen.

Here is what happens when you try to update the DOM in React:

1.  The entire virtual DOM gets updated.
2.  React figures which objects have changed.
3.  Only the changed objects get updated on the real DOM.
4.  Changes on the real DOM cause the screen to change.

9\. Handling Events
-------------------

React can perform actions based on user events. React has the same events as HTML: click, change, mouseover.

1.  React events are named using **camelCase** notation instead of **lowercase**.
2.  We pass a function as the event handler rather than a string.

We need to handle these events in React applications to make them responsive at every moment.

For example, let us take the **onclick** event to detect whenever a user clicks on a particular area in your component:

In HTML.

<button **onclick**\="activateLasers()">  
  Activate Lasers  
</button>

In React.

<button **onClick**\={activateLasers}>  Activate Lasers  
</button>

10\. Refs
---------

Refs are a function provided by React to access the DOM element and the React element that we create on our own. They are mostly used in cases when we want to change the value of a child component without using props and all.

**_For Example:_**

Without Refs

![](https://miro.medium.com/max/2342/1*mb9FNgynf9VqbrBMVd61Pw.png)

Using Refs

![](https://miro.medium.com/max/2436/1*SbC9hmIf4dbXfQnVMct1aw.png)

When to use Refs.

*   When using 3rd party libraries.
*   In animations.

When to not use Refs.

*   With functional components as they don't have instances.
*   On things that can be done declaratively.

11\. Fragment
-------------

In React you will be using fragment a lot when you have to render multiple components over in a component.

> A component can only return only one single element.

For Example:

We are using the **React.fragment** to render **h1 & p1** in the class component names as **BlogPostExcerpt**

![](https://miro.medium.com/max/2132/1*PmtXBNIvB7GsJxYUEj8N9Q.png)

1\. CSS In React
----------------

CSS-in-JS is not a specific thing to React it’s a technique to style our applications. In React before the rise of **CSS-in-JS,** the most widely way to work with CSS was by CSS Modules which are basically just .css files where you put all your **CSS** code such as class names, ids, animations, etc, and every time it is imported the name and animations to that specific module is scoped locally to the component by default.

![](https://miro.medium.com/max/1592/1*W2UqqtBfh7ABsUaB0uzi4g.png)

2\. CSS-In-JS
-------------

**CSS-in-JS** is different from the inline styles as we still write all our CSS in JS but instead of passing it to the style attribute we take those styles and inject an actual string of CSS in a <style> tag into the DOM.

For Example:

If you are working with inline styles all you need to do is create a JS object and pass options for styling your element.

**const styles = {  
      background: "#FE0000",  
      color: "#FFFFFF"  
    };**

Then in your element, we pass:

**<div style={styles}>  
     <h1>CSS-in-JS</h1>  
    </div>**

By using the inline style we have some limitations as we cant use the **pseudo-selector, media queries, keyframes, etc.**

But CSS-in-JS is different from inline styles, by having all your CSS in JS and using CSS-in-JS we can have separate folders to organize your styles in a better way and have files to different React components, eliminating that whole mess we have in one single **_.css file._**

**For example:**

You have to first install Styled components using your choice of the package manager.

yarn add styled-components

Then import it in your React Component:

import styled from "styled-components";

To start using it, you have to just create an object template literal,

**const StyledButton = styled.button\`  
      width: 120px;  
      height: 42px;  
      background: #FE0000;  
      color: #FFFFFF;  
    \`;**

And late to use this component that we just created you have to just pass it as the Button that we created.

**import React from "react";  
    import styled from "styled-components";

    const StyledButton = styled.button\`  
      width: 120px;  
      height: 42px;  
      background: #FE0000;  
      color: #FFFFFF;  
    \`;

    const Button = () => (  
      <StyledButton>  
        My Styled Button  
      </StyledButton>  
    );

    export default Button;

**

3\. Animation
-------------

1.  **Popmotion**

It is a low-level functional JS motion library that allows developers to animate in JS environment (**browser, Node**) to any render target **(CSS, SVG, Thee, JS, canvas, etc).**

To install:

npm install popmotion --save 

**2\. React Motion**

React Motion is an animation library for React which makes it easy to create and implement realistic animations (**You can build real natural-looking, physics-based animation).**

npx create-react-app intro-react-motion

**3\. React Spring**

Another great animation library for building physics-based animation powering most UI related animation in React, React Spring is the best of two worlds, it is a bridge between the two existing React animation library that is: **React Motion & Animated.**

**4\. React Transition Group**

This one is not an animation library like **React-Motion,** it exposes simple components useful for defining entering and existing transitions. It exposes transition stages, manages classes and group elements, and manipulate the DOM in useful ways.

1\. Redux
---------

Redux is a predictable state container for **JavaScript** apps, you can write applications that behave consistently and run in different environments **(client, server, and native)**. You can use Redux together with React and has a large ecosystem of addons available.

2\. MobX
--------

Another great state management library for React applications, all the changes to and uses of your data are tracked at runtime, building a dependencies tree capture that computation depending on your state. **MobX** allows you to manage your application state outside of any UI framework which makes your code portable and easily testable.

3\. Unstated
------------

Unstated is very simple and easy to understand if you are already comfortable with React and it builds upon existing React concepts like **setState, class structure, context, and common pattern like render props**.

4\. RxJS
--------

A library for composing async and event-based programs by using observable sequences. **RxJS** has the ability to produce values using our functions that means your code is less prone to errors.

1\. REST APIs
-------------

You will be using REST API a lot while building React applications, REST stands for ‘**Representational State Transfer**’, it is a set of rules that developers follow when they create their API. One of these rules states that we should be able to get a piece of data when we link to a specific URL.

2\. GraphQL
-----------

Developed by Facebook in 2012 because the team needed a data-fetching API powerful enough to describe all of Facebook. **GraphQL** has proven to be indirectly effective for building modern mobile and web apps giving developers a flexible rich technology for extracting data.

It can be even deployed within an IDE known as **_GraphiQL_** as an alternative to REST, GraphQL lets developers construct a request that pulls data from multiple data sources in a single **API** call.

Node.js
-------

There are plenty of options out there to use as the backend for React applications, but since using **Node.js** is becoming second nature for React developers it is recommended to learn **Node.js**. It is the most convenient platform for hosting as well as running a web server for **React** application.

*   Using an NPM **(Node Package Manager)**, Node works alongside the NPM registry to install any package through the NPM CLI.
*   Also, **Node** bundles a React application into a single file for easy compilation using webpack and several other Node modules.
*   Developers can execute the **React.js** code directly in the Node.js environment.
*   The **React DOM** has components specifically designed to work with Node.js that reduce lines of code, making server-side rendering comparatively easy

Why React and Node.js Makes a Perfect Combination:
--------------------------------------------------

*   **High Server Load:** Using Node.js with React makes sense when your web apps need handling of multiple requests and painting sever load balance.
*   **JSON APIs:** Building **JSON APIs** for your application is very efficient with Node.js due to high code reusability and easy code sharing in React.js.
*   **MERN Stack:** Node.js can also be used with React with MERN (MongoDB, Express, React & Node)stack.

Netlify CMS
-----------

A great open-source content management system for your **Git** workflow which provides you with a very friendly **UI** and intuitive workflow. You can use it with any static site generator to create folders faster and more flexible web projects.

*   **Fast & Web-Based UI:** Comes with rich-text editing in real-time preview and drag and drop media.
*   **Fully extensible:** You can create a custom-styled preview, UI widgets, and editor plugins.
*   **Easy Installation:** You have to just add two files to your site and hook up the backend by including those files in your build process or linking to our **_CDN (Content Delivery Network)._**

Creating forms in React applications will be a pain for you without using Formik, you can still create your own forms with state management in React but that becomes a very painful process when you have to add more feature in your form **(validations),** and making multiple forms in your React applications becomes really hard. But with formik, you can easily create all kinds of forms with very flexible options.

*   **Formik** takes care of the repetitive and annoying stuff and keeps track of the **values, errors** in the form fields. So you will be spending less time writing up state and change handlers and more time focusing on the project.

Next.js
-------

An awesome tool for creating web applications and mostly famous for server-side rendering, also you can create powerful web apps for different platforms.

If you are already familiar with CSS, JavaScript and a bit of React switching to Next.js will be an easy deal for you.

*   **Ecosystem Compatibility:** Compatible with JavaScript, Node, and React.
*   **Automatic Code Splitting:** Every import in the code gets bundled and served with each page, which means that all the unnecessary code never gets loaded on the page.
*   **Styled-JSX:** Allow you to write CSS directly inside the JS code.

Razzle
------

Another great alternative tool for SSR **(Server-Side-Rendering)**, abstracts all the complex configuration needed for SSR into a single dependency giving us the best experience of **_create-react-app_** and leaving all the apps architectural decisions about frameworks, routing, and data fetching on us. Not only it works with React, but also with **Reason, Elm, Vue, Angular** and will work whatever comes next.

*   **Familiarity:** Knowing ES6 JavaScript will be always an advantage and the same CSS setup as create-react-app which makes it very easy to work.
*   **Hot-Reloading:** Razzel comes with hot module reloading so that the client and server update whenever we make any changes.

React-Router
------------

_Routing is the process of keeping the browser URL in sync with what’s being rendered on the page. React router handles routing declaratively which allows us to control the data flow in the applications._

Some main components of React-Router:

*   **BrowserRouter:** A router implementation that uses HTML history API (**pushState, replaceState, and the popState** event) to keep the UI in sync with the URL.
*   **Route:** Conditioanly shown component that renders some UI when its path matches the current URL.
*   **Link:** The link component is used to create links to different routes and implement navigation around the applications (works like **_HTML anchor tag_**).
*   **Switch:** It is used to render only the first route that matches the location rather than rendering all matching routes.

Jest
----

A **JavaScript** testing framework developed by Facebook, and it is mostly used in unit testing when we provide input to the unit of code and match the output with the expected output.

> **Jest Features:**

*   **Zero Config:** A close to none configuration is required to get started with writing tests and deploying them, however, a config file can be supplied to the test as well.
*   **Snapshots:** It comes with the ability to enable snapshot testing as well when the snapshots are matched with the saved snapshot and check for matching functionality.
*   Also, Jest runs parallel to improve run time

Enzyme
------

Enzyme serves a different purpose, instead of just being a testing library it makes testing React component specifically easier and integrated with any full testing libraries including **Jest** as well. If you use React to make web apps then it makes a lot of sense to use Enzyme and Jest together to automatically test the UI.

Netlify
-------

One of the best web development platform which is known to multiply your productivity in the best possible way. By unifying modern web decoupled web elements from the local development process to advanced logics, it offers an amazing taste way to ensure much more performant, scalable, secure website and applications.

*   **Serverless Functions:** When we build static sites and don't want to deal with backend services we can use a 3rd party **BaaS** solution, we don't have to worry about creating a backend when using **Netlify** because it allows integrating serverless functions for backend solutions.
*   **Forms:** When we need to get information from the user then creating forms is the easiest way to get with this.
*   **Split-Testing:** It helps us deploy two different websites version so that we can track which one is working better for the business in a more effective way.


[Source](https://javascript.plainenglish.io/react-learning-roadmap-for-2021-a1c0f7456186)