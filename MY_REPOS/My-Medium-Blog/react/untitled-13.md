# Basic React Tutorial

Random Things to Remember

## Basic React Tutorial <a id="bb0a"></a>

### Random Things to Remember <a id="cef0"></a>

### Using `()` implicitly returns components.Role of `index.js` is to _render_ your application.The reference to `root` comes from a div in the body of your public html file.State of a component is simply a regular JS Object.Class Components require `render()` method to return JSX.Functional Components directly return JSX.`Class` is `className` in React.When parsing for an integer just chain `Number.parseInt("123")` <a id="8aac"></a>

![](https://cdn-images-1.medium.com/max/800/0*16IltJu5wXjzgXyU.gif)

* **Use ternary operator if you want to make a conditional inside a fragment.**

```text
{ x === y ? <div>Naisu</div> : <div>Not Naisu</div>; }
```

```text
Purpose of React.Fragment is to allow you to create groups of children without adding an extra dom element.
```

* **React** manages the creation and updating of DOM nodes in your Web page.
* All it does is dynamically render stuff into your DOM.
* What it doesn’t do:
* Ajax
* Services
* Local Storage
* Provide a CSS framework
* **React** is unopinionated
* Just contains a few rules for developers to follow, and it just works.
* **JSX** : Javascript Extension is a language invented to help write React Applications \(looks like a mixture of JS and HTML\)
* Here is an overview of the difference between rendering out vanilla JS to create elements, and JSX:
* This may seem like a lot of code but when you end up building many components, it becomes nice to put each of those functions/classes into their own files to organize your code. **Using tools with React**
* **`React DevTools`** : New tool in your browser to see ow React is working in the browser
* **`create-react-app`** : Extensible command-line tool to help generate standard React applications.
* **`Webpack`** : In between tool for dealing with the extra build step involved.

![](https://cdn-images-1.medium.com/max/800/0*4O0NPGEa-1NcDOIA.png)

* **HMR** : \(Hot Module Replacement\) When you make changes to your source code the changes are delivered in real-time.
* React Developers created something called `Flux Architecture` to moderate how their web page consumes and modifies data received from back-end API's.

![](https://cdn-images-1.medium.com/max/800/0*hXODC_ZsM-egMFI4.png)

* **Choosing React**
* Basically, React is super important to learn and master.

## React Concepts and Features <a id="c653"></a>

There are many benefits to using React over just Vanilla JS.

* **`Modularity`**
* To avoid the mess of many event listeners and template strings, React gives you the benefit of a lot of modularity.
* **`Easy to start`**
* No specials tools are needed to use Basic React.
* You can start working directly with **`createElement`** method in React.
* **`Declarative Programming`**
* React is declarative in nature, utilizing either it’s build in createElement method or the higher-level language known as JSX.
* **`Reusability`**
* Create elements that can be re-used over and over. **One-flow of data**
* React apps are built as a combination of parent and child components.
* Parents can have one or more child components, all children have parents.
* Data is never passed from child to the parent.
* **`Virtual DOM`** : React provides a Virtual DOM that acts as an agent between the real DOM and the developer to help debug, maintain, and provide general use.
* Due to this usage, React handles web pages much more intelligently; making it one of the speediest Front End Libraries available.

