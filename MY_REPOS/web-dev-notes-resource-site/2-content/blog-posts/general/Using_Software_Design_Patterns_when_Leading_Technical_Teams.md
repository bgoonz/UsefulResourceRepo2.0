# Using Software Design Patterns when Leading Technical Teams

> Software design patterns can open communication and help technical teams thrive. Learn about the composite pattern, adapter pattern, broker pattern, and more.

Working with larger clients as a [technical leader](https://speakerdeck.com/cromwellryan/making-the-leap-to-tech-lead) means steering several distinct teams toward a similar goal. Communication and alignment are not easy but become possible when the right guardrails are put in place. In this article, I’ll make the case for software [design patterns](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/foundry/javascript_design_patterns) and explain how to get them adopted by your teams.

Design Patterns? You Lost Me.
-----------------------------

Have you ever run into an issue that you just know someone has solved before? A situation where you stop yourself mid-function-declaration and say “What am I doing? Why reinvent the wheel here?" and then find that a Stack Overflow search quickly serves up the copy-pasta you ordered? In the world of software architecture, we call that copy-pasta a “design pattern". Design patterns are architectural solutions to common problems. They’re solutions that have come from years of developers solving the same problem different ways and agreeing on a solution.

The trick here is to remember what each pattern is intended (and not intended) to be used for and to learn how to weigh its pros and cons. Implementing the wrong pattern in the wrong situation tends to make things complicated.

I Get The Gist, But Why Should I Care?
--------------------------------------

When you’re working on a large project in an agile environment, you’ll usually find yourself on one of many small teams working toward the same goal. Those several small teams are going to encounter similar problems, and they’ll need the same solutions. It should be easy for TeamA to sift through and review code from TeamB. When priorities shift, TeamB should even be able to send over resources to help TeamA. This can happen effectively when all teams have a joint understanding of the high-level concepts that are being used in the application. Here are a couple of questions that each team should be able to answer the same way:

*   What path does your data take getting from your database to your user’s browser?
*   How are messages passed inside of your application?
*   How is your UI broken out and organized?

If these questions can be answered the same way by your small, agile teams, then you’re in good shape! However, if you’re like most others in this situation, that’s not the case. One way to get there is to establish a set of common solutions for your application to follow at a high level: you need to establish a set of design patterns.

Ok, I’m On Board. How Do I Start?
---------------------------------

There are a lot of ways to start here. I’d like to guide you through one of our recent projects to illustrate some of the decisions made along the way. This project was a product listing application for an ecommerce site. It was a data-driven user interface powered by APIs that were out of our control, so we didn’t need to worry as much about that side of things. We broke our scope out into three sections: UI structure, data flow, and inter-component communication.

### Step One: UI Structure

Our approach was driven by our user interface, so we started to think about how to break that up. Our design decompositions showed us many reusable pieces of our user interface, which led us towards using a central design system to house our many reusable components. This led us to our first design pattern decision: we would use the composite pattern to structure our page components. This pattern has become popular given the prevalence of frameworks such as [React](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/foundry/category/react) and [Vue](https://vuejs.org/).

![Architectural diagram of the composite pattern](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/uploads/article_uploads/b-delpinal_design-patterns_3.png)

The composite pattern would allow us to create tree-like structures of components where both parent and child components could be reused easily.

The composite pattern is used to create tree-like structures of components that can be reused easily. The trunk, our main “Page" component, is the overall parent. It has three direct children: Sidebar, Main Content, and Footer. Sidebar and Main Content both have two children of their own, even sharing the same Title component underneath them both. Blog Post, the second child of Main Content, also has children underneath it. The Footer is a child component with no children underneath it. This is the versatility of the composite pattern.

### Step Two: Data Flow

Once we understood how our application would be structured, we needed to identify how data would flow from our database to our user interface. Because we had multiple potential data sources being aggregated together based on our current environment, we quickly made our second design pattern decision: we would have an intermediary between our UI and our data source(s) that would implement the strategy pattern and aggregate our data appropriately.

![Architectural diagram of the strategy pattern](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/uploads/article_uploads/b-delpinal_design-patterns_2.png)

The strategy pattern would allow us to call different data sources, endpoints, or methods depending on a set of conditions.

The strategy pattern implores us to encapsulate our data endpoints in a way that allows them to be interchangeable. In our example, it gives us a template for adding a small layer of abstraction between our user interface and our data in order to get major development advantages down the road. An obvious use case here, and one I suspect many of us have seen before, is the differentiation between our local and development databases. If we are in our production environment, we want to request production data. Otherwise, we will be getting development data. The user interface should not have to worry about where our data is coming from.

One caveat to this was it could cause data coming into our page to vary wildly based on our data sources. This led us to our third design pattern decision: the data contract between our page and our data layer should remain consistent through the implementation of the adapter pattern. For it to work, the new advertiser data within our strategy pattern example would have to conform to the existing data structure that our page was expecting from our social components. For our experiment to work correctly given our new constraints, we’d need to change our user interface to allow for either data set to be accepted.

![Architectural diagram of the adapter pattern](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/uploads/article_uploads/b-delpinal_design-patterns_1.png)

The adapter pattern would allow us to change our data source without our UI knowing about it by ensuring that our data contracts remain constant.

The adapter pattern allows us to solidify our data contracts when dealing with API-driven software. Having a data adapter in place ensures that our UI can always expect the same data to come through, regardless of the data source. Incoming data sources, in this instance, can be easily swapped to allow for newer, fresher data sources or even data experimentation without the UI being aware. This gives us the benefit of being able to switch from our original database to a third party that may ingest your data and provide customers with personalized results based on their online preferences.

### Step Three: Inter-Component Communication

In a fairly complex application, you may find that your user’s interactions have widespread effects on your page. On a page where updating a parent only updates its child components, we may be able to rely on the built-in patterns that exist in frameworks like React or Vue. If we’re not using a larger framework, or need further abstraction, we will need to make a decision here. Many pattern choices exist, such as the observer pattern that describes the model and view relationship in many MVC architectures or the publish-subscribe/broker pattern that is commonly used in libraries like [Redux](https://redux.js.org/) or [EventBus](http://greenrobot.org/eventbus/).

![Architectural diagram of the observer pattern](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/uploads/article_uploads/b-delpinal_design-patterns_5.png)

The observer pattern would allow multiple components to get notified of any change made in the subject component.

The Search Bar component is our “subject" in this case. The subject is the component in this pattern that is in charge of update notifications. It will keep an array of the dependents, or observers, that need to be notified when its state changes: The Results List, Autocomplete Tooltip, and the Recommended Articles components. These components may or may not be direct UI children of the Search Bar component, this is not a requirement of the pattern. Once the Search Bar component is interacted with, it will notify the observers so that they may react accordingly.

![Architectural diagram of the publish and subscribe pattern](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/uploads/article_uploads/b-delpinal_design-patterns_4.png)

The broker (or publish-subscribe) pattern would allow components to publish or subscribe to message topics which are only known by a broker component.

We have multiple methods of asynchronous data that need to be transmitted: an email subscribe button and a buy button that allows a user to buy some of our merchandise. The broker pattern allows us to define messages that each of those buttons will publish when they’re interacted with. The publishing event will happen regardless of if anyone has subscribed to see and react to those messages. It is up to the development team to ensure that the correct messages are being published and subscribed to as the pattern does not have this as a requirement.

In our case, we wanted our functional components to be tightly coupled to the components they’ll be managing state for, and we also wanted them to directly orchestrate events that happen within their scope. This led us to make our fourth design decision: we’d implement the mediator pattern to orchestrate interactions between our components. This would ensure that our interactions were handled explicitly by our components, relieving any object ambiguity that comes with the other mentioned patterns.

![Architectural diagram of the mediator pattern](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/uploads/article_uploads/b-delpinal_design-patterns_7.png)

The mediator pattern would allow us to directly orchestrate the effect of specific events.

The mediator pattern is a method of maintaining an application state that involves one or more components whose job it is to orchestrate the behavior of the events that occur in our user interface. Making use of the mediator pattern allows you to create stateless, functional components that get their rendering information passed down to them. An email mediator might encapsulate all logic required for a user to sign up for our email list, while the overarching page mediator encapsulates only high-level logic to control the page.

If You Cross The Railroad Tracks, You’ve Gone Too Far!
------------------------------------------------------

Remember when Google Maps wasn’t a thing, and someone would give you directions like “Take a left when you see the CVS?" Maybe it was just my family, but here’s my shot at it with respect to design patterns: talking about a great solution is easy, but it’s more difficult when that great solution becomes a bit overbearing. Sometimes a team or technical leader discovers the idea of design patterns and has a sudden and unstoppable urge to establish a pattern around everything. But too much of anything can be a bad thing.

Establishing a set pattern to solve a non-existent problem can bring more overhead than benefits. Over-optimization is something we have to fight early on in projects. Earlier in my career, I worked on a project that was structured using a layered architecture pattern. Here’s the problem: that business planned to spin up a third-party team to handle the data structure in an API, which would encapsulate the business logic as well. Eventually, accepting a new property from our API meant changing the object in our data layer, our business logic layer, and our presentation layer while making no modifications in any of them. We were passing this object through two layers of code that had become obsolete because we implemented the wrong pattern due to our own lack of business understanding. Unfortunately, this sort of thing happens when we move quickly in our development cycles. As a technical leader, I hope you’ll recognize these situations and plan to pivot away from them effectively.

![Architectural diagram of the layered architecture pattern](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/uploads/article_uploads/b-delpinal_design-patterns_6.png)

A layered architecture pattern would allow our data to go through checkpoints, or layers, each of which has a specific responsibility.

In order to display our comments, blog posts, and user information to our users, we silo those three things into lanes. When the page goes to render the Blog Post component, it must go through this series of events: the blog post data layer gets the data from the database, the blog post business logic layer performs any business logic necessary, the blog post presentation logic layer performs any logic required to present the blog posts to the user, and finally, the UI is rendered as-is and presented to the user. This process happens, in that order, for each UI element.

How Do I Sell It?
-----------------

We’re not always building a new application from scratch. In fact, that’s pretty rare. Teams are often opinionated, and most of the time you’re coming from a codebase that has many decisions already made. Furthermore, the people giving the funding aren’t always willing to shell out more budget for feature-less refactors. So how do you start to rally around larger changes from the top down?

### Step One: Get Your Boss On Board

As a technical leader, you may need to get buy-in from the business before putting work into your backlog. When speaking to less technical folks, make sure you’re selling the vision, not the process. The end vision involves teams building software that can:

*   Accept future enhancements with a minimal development effort
*   Be discussed by the team using a shared vernacular
*   Allow members to be on-boarded more quickly, helping to mitigate the risk of churn

### Step Two: Get Your Team On Board

This should never be a “my way or the highway" conversation. These are the folks that have been in this codebase for quite a while, and they’re often able to point out pitfalls. For a team to have real buy-in in a time of change, they need to have a say in what that change looks like. For these conversations, I’d recommend that you do your research, arrive at the table with some ideas, and guide the conversation towards a solution instead of prescribing one. Remember, you are wearing two hats during these conversations: you are a stakeholder responsible for feature development, required to keep the overall business objectives in mind, as well as a team leader responsible for contributing to and guiding the technical focus. Those two hats aren’t easy to wear at the same time, but when this is done effectively, great things happen.

Don’t Just Set It And Forget It!
--------------------------------

Once you have some design patterns discussed, agreed upon, and implemented, don’t forget about them! Design patterns need to be talked about and re-assessed as your software grows and matures. New team members need to understand them as well as their intent when they’re on-boarded.

Whether you’re a new team looking to spin up an application, an existing team looking to place more structure around your current systems, or a single developer well-versed in design patterns, I hope this inspires you to keep your mind and lines of communication open when it comes to improving yourselves and your product.


[Source](https://sparkbox.com/foundry/using_software_design_patterns_as_a_tech_lead)
