# Learn ReactJS: 6 Tips from Over 3 Years of React Development

> React JS is one of the best frameworks out there for interactive JavaScript, but like any other framework it's not magic. Read these 6 tips from over 3 years of React development and learn how to be a better React.js developer.

We’ve written a lot of React since our first React feature over three years ago when we sprinkled React into a Rail’s table view via the [react-rails project](https://github.com/reactjs/react-rails). From that humble beginning we’ve moved to writing entire applications in React and even using [React to render HTML on the server](https://reactjs.org/docs/react-dom-server.html#rendertostring)! To help share the knowledge we’ve learned over the years, I’ve compiled a list of tips that lead to a quality React codebase.

1\. Decouple Your Code
----------------------

React brings a lot to the table but at the end of the day it’s a library like any other library, rather than a cure-all. React will, if left untended, become an unorganized mess. One of the biggest lessons I’ve learned while writing React is how important it is to write [“decoupled code"](https://softwareengineering.stackexchange.com/questions/244476/what-is-decoupling-and-what-development-areas-can-it-apply-to#244478). Decoupling code is important because it leaves the core functionality of your application untethered to a specific technology stack or framework. This concept isn’t [new or unique to React](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/foundry/idiomatic_sails_js_mvc_app), and long-time jQuery devs will already understand this concept. But decoupling with jQuery was more difficult because the modern DOM APIs we use now were not yet available or ready back in jQuery’s heyday.

One of the best resources I’ve found about writing decoupled code comes from Jim Weirich. While his [Decoupling from Rails](https://www.youtube.com/watch?v=tg5RFeSfBM4) talk uses Ruby on Rails as the example, the principles are true and apply to any software application. Jim stresses one of the key wins in decoupling from Rails is how much quicker unit tests run, and while that’s true for decoupling from React, there are other wins as well.

Benefits of Decoupling
----------------------

1.  **Avoid Lock-In to a Specific Framework**: Another win, which Jim also touches on, is that by decoupling from a framework your code becomes more portable. JS frameworks come and go and this usually means that at some point in an application or site’s lifetime it will get upgraded. If the core pieces of your application are framework-agnostic it makes migrating frameworks much easier and straightforward.
2.  **More Vanilla JS**: Another benefit of decoupling from React is that you will be writing more “vanilla" or standard JavaScript. This is great because it makes your codebase less specialized and more JavaScript-centric (and not more React-centric), therefore devs who aren’t React specialists can more easily work on it.
3.  **Easier Testing**: Jim demonstrates in his talk how much quicker it is to unit-test Rails if you don’t have to spin up all of Rails to test. This applies to React as well. You don’t have to spin up [Phantom](http://phantomjs.org/) ([R.I.P.](https://www.google.com/url?q=https://groups.google.com/forum/%23!topic/phantomjs/9aI5d-LDuNE&sa=D&ust=1536332023487000&usg=AFQjCNHFnykwDdV9h5DY9GJwyqH7fECX2g)) or [Headless Chrome](https://github.com/GoogleChrome/puppeteer) just to run your unit tests. In most cases you can simply import the module or class you want to test, and test it without any other tooling.

2\. Use Classnames for Dynamic Class Names
------------------------------------------

This is a short and simple tip. Use the excellent [classnames package](https://github.com/JedWatson/classnames) by Jed Watson to manage your dynamic classes. Instead of sprinkling [ternaries](https://www.google.com/url?q=https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_Operator&sa=D&ust=1536332023490000&usg=AFQjCNGh5xO4AV2kMAZZ1HtGV58-ZVJwTw) all over your render methods, you can abstract those class names into variables that rely on the classnames function returning the proper name.

3\. Start Simple, Stupid
------------------------

To put it another way: Keep it vanilla. What I mean by “keep it vanilla" is don’t reach for other pieces in the “React ecosystem" until you see the use case for them. React + the classnames package is where I like to start (and honestly, I’ll usually wait to pull in classnames). Keeping it simple keeps the project manageable for your entire team, which is a huge win. Dave Rupert recently wrote a post titled [“The React is ‘just’ JavaScript Myth"](https://daverupert.com/2018/06/the-react-is-just-javascript-myth/) in which he illustrates this problem:

> React is so much more than “just JavaScript." React is an ecosystem. I feel like it’s a disservice to anyone trying to learn to diminish all that React entails. React shows up on the scene with Babel, Webpack, and JSX (which each have their own learning curve) then quickly branches out into technologies like Redux, React-Router, Immutable.js, Axios, Jest, Next.js, Create-React-App, GraphQL, and whatever weird plugin you need for your app.

The fact that most “starter projects" and tutorials include React plus a boatload of other dependencies (plugins, libraries, and other technologies that Dave lists above) is a problem. I would argue, though, that it’s not a new problem and is one that jQuery, other JS frameworks before React, and even Rails certainly have had too. Understanding what each plugin or library does and how it impacts your overall design is critical, and yet it’s so easy to add things without much thought and to end up in a mess.

4\. Keep Render Clean Until It Becomes a Problem
------------------------------------------------

React’s `render` method can get quite messy. I usually move chunks or pieces of functionality “up and out" into class methods or plain modules to keep `render` resembling a wrapper function more than a place where processing occurs. However, this can quickly make your component file huge. If you find yourself “yo-yoing" up and down a component file trying to follow the flow, it’s probably time to consolidate some of those pieces into another class method or move that functionality out into its own component.

5\. Server-Side Rendering Isn’t a Silver Bullet
-----------------------------------------------

Server-side rendering your React application is the gold standard of the React community. Server rendering brings a couple benefits:

*   Potentially improved performance, since the request from the client can respond with HTML
*   Potential ability to reuse frontend code on the backend

Despite what you may hear, server rendering your React is not easy and it probably isn’t really possible unless you’ve already done some other things in this post. It’s best to treat the server-rendered side “branch" of your application like a completely separate platform (because it is!). Server rendering gives you another vector to decouple (and test) your application code: the DOM. To render a React component on the server, you can’t reference the DOM at all or your application will fail. Therefore you need to design your server-rendered application in such a way that it is decoupled from React _and_ the DOM wherever possible. Server rendering is an awesome feat but it’s not something that comes without any costs in terms of time or architecture planning effort.

6\. Understand How Render Actually Works
----------------------------------------

This tip applies to any framework or library: [Dispel the magic](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/foundry/leveling_up). Know how the particular package works and understand its characteristics. I thought I knew everything about React’s `render` method until [a month or two ago](https://twitter.com/a_simpson/status/1008821833376976896) when I realized via a Twitter discussion that I had incorrectly assumed something important about how React works with “foreign" DOM. This was a helpful reminder that will definitely impact how I approach future decisions involving React and third-party plugins or scripts that modify the DOM.

If you spend enough time with any technology, the benefits and flaws will become more and more apparent. I still love React and the value it brings to a project, but I’ve also seen that it’s not magic. For one thing, React isn’t very forgiving if the developer doesn’t have a good handle on JavaScript because so much of being productive in React is predicated on being proficient in JavaScript. That said, React is one of the best choices for just about any interactive JavaScript, not just full applications. Features like the [component model](https://reactjs.org/docs/components-and-props.html), its [performance](https://reactjs.org/docs/optimizing-performance.html), and [data flow model](https://reactjs.org/docs/state-and-lifecycle.html#the-data-flows-down) make it an extremely compelling tool.


[Source](https://sparkbox.com/foundry/6_tips_to_learn_react_js_development)
