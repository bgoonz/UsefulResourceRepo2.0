# REST API: Key Concepts, Best Practices, and Benefits

> Thousands of companies — from tech giants like Google, YouTube, and Twitter to startups — owe their business growth to application program interfaces or API

Reading time: 11 minutes

Thousands of companies — from tech giants like Google, YouTube, and Twitter to startups — owe their business growth to [application program interfaces](https://www.altexsoft.com/blog/engineering/what-is-api-definition-types-specifications-documentation/) or APIs. Acting as middlemen between machines, APIs make a variety of web products accessible to millions of customers across the World Wide Web.

_Catch the essence of what an API is._

Similar to waiters who take orders and bring drinks and food in a restaurant, APIs accept requests from apps and return desired data or functionality. More often than not, they do their job in REST style. This article outlines what REST is, why it is so widespread, and what makes an API truly RESTful.

What is REST API and how does it work
-------------------------------------

REST is short for **Representational State Transfer,** an architectural style for building web services that interact via an HTTP protocol. Its principles were formulated in 2000 by computer scientist Roy Fielding and gained popularity as a scalable and flexible alternative to older methods of machine-to-machine communication. It still remains the gold standard for public APIs.

![REST API in action](https://content.altexsoft.com/media/2021/03/word-image.png)

_A REST client can interact with each resource by sending an HTTP request._

The key elements of the REST API paradigm are

*   a **client** or software that runs on a user’s computer or smartphone and initiates communication;
*   a **server** that offers an API as a means of access to its data or features; and
*   a **resource**, which is any piece of content that the server can provide to the client (for example, a video or a text file).

To get access to a resource, the client sends an **HTTP request**. In return, the server generates an **HTTP response** with encoded data on the resource. Both types of REST messages are _self-descriptive,_ meaning they contain information on how to interpret and process them.

### REST request structure

Any REST request includes four essential parts: an HTTP method, an endpoint, headers, and a body.

An **HTTP method** describes what is to be done with a _resource_. There are four basic methods also named CRUD operations:

*   POST to Create a resource,
*   GET to Retrieve a resource,
*   PUT to Update a resource, and
*   DELETE to Delete a resource.

An **endpoint** contains a _Uniform Resource Identifier (URI)_ indicating where and how to find the resource on the Internet. The most common type of URI is a _Unique Resource Location_ (URL), serving as a complete web address.

**Headers** store information relevant to both the client and server. Mainly, headers provide authentication data — such as an API key, the name or IP address of the computer where the server is installed, and the information about the response format.

A **body** is used to convey additional information to the server. For instance, it may be a piece of data you want to add or replace.

![REST request structure](https://content.altexsoft.com/media/2021/03/word-image-1.png)

_REST request for creating a new user where the response will return the ID of the created resource. Source:_ [_Tableau API_](https://help.tableau.com/current/api/rest_api/en-us/REST/rest_api_concepts_example_requests.htm)

### REST response structure

In response, the server sends not the sought-for resource itself, but its **representation** — a machine-readable description of its current state. The same resource can be represented in different formats, but the most popular ones are XML and [JSON](https://www.json.org/json-en.html).

Whenever relevant, a server includes in the response hyperlinks or **hypermedia** that links to other related resources. This way, the server gives instructions on what the client can do next and what further requests it can make.

![REST response structure](https://content.altexsoft.com/media/2021/03/word-image-2.png)

_An example of a self-descriptive server response with hypermedia. Source:_ [_Lauren Long_](https://codewords.recurse.com/issues/five/what-restful-actually-means)

REST best practices: what makes an API RESTful
----------------------------------------------

REST isn’t linked to any particular technology or platform. Nor does it dictate exactly how to build an API. Instead, it introduces best practices known as _constraints_. They describe how the server processes requests and responds to them. Operating within these constraints, the system gains desirable properties.

### Client-server autonomy

**Properties gained:** modifiability, better system reliability

In the REST API system, the client and server work independently, using different tech stacks. The client doesn’t need to know anything about business logic, while the server has no idea about the user interface. The separation of responsibilities means that API providers and API consumers can be modified and it won’t backfire on their communication.

### Uniform interface

**Properties gained:** ease of use, shared understanding

Uniform interface is a key attribute that distinguishes REST APIS from non-REST APIs. It dictates a standardized way to communicate with a given server, no matter the client app or device that runs it. We already mentioned some fundamentals supporting this practice, which are

*   a unique identifier (URI) assigned to each resource,
*   self-descriptive messages explaining how to interpret them and what to do next,
*   the ability to manipulate a resource through its representation in JSON or XML, and
*   hypermedia linking to related resources.

![Uniform interface in REST design](https://content.altexsoft.com/media/2021/03/word-image-3.png)

_The server uses the same interface, no matter the client. Source:_ [_Sugandha Lahoti_](https://hub.packtpub.com/defining-rest-and-its-various-architectural-styles/)

Uniform interface helps developers easily grasp the logic of an API. [Todd Main](https://www.linkedin.com/in/todd-main-a956a51/), Director of Software Development at [Envysion](https://envysion.com/) admits being relieved if a partner company has chosen a REST approach: “_I know that I can just browse a list of objects, which I am usually already familiar with, and see what properties I can get or supply.”_ Todd adds that code implementation with a RESTful API is also easy_: “The objects passed around translate directly into data structures in my programming language.”_

### Layered architecture

**Properties gained:** improved system scalability and security

The RESTful system has a layered structure in which each layer works independently and interacts only with the layers directly connected to it. When calling a server, a client doesn’t know whether there are any intermediaries along the way.

Due to the layered architecture, you can place a proxy or load balancer between the client and server and thus improve scalability. Adding security as a separate layer enhances system safety. Although these services are involved in producing the response, the client doesn’t have to worry about what’s behind the interface.

**![Layered structure in REST API design](https://content.altexsoft.com/media/2021/03/word-image-4.png)**

_Clients interact with the API layer reaching the server via a proxy. Source:_ [_Sugandha Lahoti_](https://hub.packtpub.com/defining-rest-and-its-various-architectural-styles/)

### Caching

**Properties gained:** low server latency, increase in app speed and responsiveness

REST APIs allow clients to store frequently accessed data on their side instead of requesting them again and again. As a result, the app makes fewer calls, which reduces the load on the server and its latency. In turn, the application becomes more responsive and reliable.

### Stateless interactions

**Properties gained:** enhanced performance, app reliability

The word _stateless_ indicates that an API doesn’t store any information related to the previous sessions, treating each request independently. All data on the current client’s state is contained in the request body.

Being stateless, REST APIs don’t have to deal with the server-side state synchronization logic. Another advantage of session independence is that any server can process requests. This improves the performance of the application and reduces the risk of going down.

_“Going stateless means fewer side effects,”_ Pál Váradi Nagy, a developer at [Hanna Instruments](https://www.hannainst.com/), argues. _“In FTP for example, we have an ongoing session with commands that modify the state of the session. This state can and sometimes will be lost. So, for REST it was a decision to go as pure as possible. Meaning that it relies on PURE functions that always return the same output when given the same input, and doesn’t affect anything else.”_

### Code on Demand (CoD)

**Properties gained:** feature customization, extended functionality

Instead of sending back JSON representations, the server may return a piece of executable code on the client’s demand. The CoD practice gives the client more control over the features and allows for extended functionality.

Priority of business needs
--------------------------

**Property gained:** flexibility

Still, REST is about flexibility. Implementing REST architecture, developers can deviate from, extend, or cover only partially its standard set of constraints. Take so a fundamental constraint as _stateless interactions_. You may ignore it and keep your application stateful for those [sessions that need to be stored server-side](https://stackoverflow.com/questions/3105296/if-rest-applications-are-supposed-to-be-stateless-how-do-you-manage-sessions).

That’s why you can hear people say that practically no REST APIs actually follow Fielding’s work.

_“For me, some of the constraints (stuff like client-server architecture, or statelessness) are just good but pretty standard application design, and others are stuff I’d avoid like the plague!”_ says [Garry Taylor](https://www.linkedin.com/in/garrytaylormelbourne/), a Senior Software Developer and technical consultant. In particular, Garry speaks of code on demand as a bad idea: “_The security implications are awful, plus the server must make assumptions about the nature of the client and its ability to execute whatever code is passed.”_

REST API examples
-----------------

REST API concepts and principles may feel like something abstract — until you try working with them. Below, we give examples of real-life APIs that will help make sense of the RESTful approach.

### Trello API

A widely-used [project management tool](https://www.altexsoft.com/blog/project-management-tools-trello-basecamp-jira/) provides a simple API that makes you quickly understand REST resources and HTTP methods applied to them.

The first thing Trello’s [API introduction](https://developer.atlassian.com/cloud/trello/guides/rest-api/api-introduction/) offers to do is make a GET request to their most fundamental resource — Boards.

![Trello API request](https://content.altexsoft.com/media/2021/03/word-image-5.png)

_GET a Board message using cURL — a client-side program to make an HTTP request for the given URL._

This makes you better understand how to manipulate other basic resources — such as Lists, Cards, and Actions, using methods applicable to them. For example, there are two types of POST requests available for Cards:

_POST /1/cards/\[card id or shortlink\]/actions/comments_ means “Add a comment to a Card

_POST /1/cards/\[card id or shortlink\]/actions/idMembers_ means “Add a member to a Card”

The full list of [resources](https://developer.atlassian.com/cloud/trello/rest/api-group-tokens/#api-tokens-token-get) contains 18 objects accessible via the API. Each comes with a detailed description that includes parameters for all request types and query examples.

### Stripe API

One of the most popular [online payment solutions](https://www.altexsoft.com/blog/business/how-to-choose-and-integrate-payment-gateway-online-payments-transaction-processing-and-payment-gateways-providers/) boasts perhaps the best [API documentation](https://stripe.com/docs/api) you can find on the Internet. Stripe has a dedicated team that writes exhaustive guides with code snippets and examples of API requests and responses for every single resource. _“Our philosophy is to gear documentation towards how to use an API, rather than how it’s built,”_ [Cristina Cordova](https://www.linkedin.com/in/cristinajcordova/), the ex-Head of Payments and Platform Partnerships at Stripe, [explained](https://getputpost.co/a-look-inside-stripes-api-platform-92ba19ca9751).

![Stripe API request and response examples](https://content.altexsoft.com/media/2021/03/word-image-6.png)

_A Stripe Rest API request and response for a balance transaction._

To begin with, there is a step-by-step [Development quickstart](https://stripe.com/docs/development/quickstart) guide. Engineers who like to learn by example can take advantage of [Stripe Samples](https://github.com/stripe-samples) that enables anybody to run some working code straight off the reel.

### Twilio API

[Twilio](https://www.twilio.com/) is an API-driven platform to integrate voice and video calls along with SMS, MMS, and other messages into web and mobile apps. To encourage developers of any level to create communication tools with Twilio, the company comes up with comprehensive [REST API best practices](https://www.twilio.com/docs/usage/rest-api-best-practices). Moreover, before getting started, beginners may read a brief explanation on [“What’s a REST API, anyway?”](https://www.twilio.com/docs/usage/api)

Twilio provides a free [trial account](https://www.twilio.com/try-twilio?_ga=2.128058510.322708128.1614681008-1111485117.1613468016) to try and test API integrations. To make things even more convenient, the step-by-step guides are supported with code snippets.

![Twilio API documentation](https://content.altexsoft.com/media/2021/03/word-image-7.png)

_Text explanation on how to send SMS is illustrated with examples of an API request and JSON API response._

REST compared to other API paradigms
------------------------------------

A direct comparison among approaches to building APIs is debatable. That’s why we chose we chose to review the key features that make REST stand out against command-oriented Remote Procedure Call, standardized SOAP, and schema-based [GraphQL](https://www.altexsoft.com/blog/engineering/graphql-core-features-architecture-pros-and-cons/).

### REST vs RPC

RPC has been around for a long time and can be fairly considered the core of REST. Pál Váradi Nagy sees REST as “_a_ _restricted subset semantics of what has already been going on at large — Remote Procedure Calls_.”

The procedure part in RPC is performing a function on input and returning an output. So, RPC goes easy on the network resulting in high performance. That’s why it’s a preferred option for massive microservices systems to facilitate short and clear internal communication.

The latest RPC version is [gRPC](https://grpc.io/). Using binary data instead of text, its communication is [more compact and efficient](https://www.yonego.com/nl/why-milliseconds-matter/#gref) than REST’s. gRPC is also type-safe, meaning that it will send over only the expected data type.

However, gRPC requires setting up a client — incorporating gRPC-generated code into the client processes. It’s cumbersome for dynamic languages (e.g., JavaScript, Python) where the build process may be non-existent. REST doesn’t need that. API calls can be made even by simply typing URLs into a browser. That’s very convenient for [testing an API](https://www.altexsoft.com/blog/api-testing/), as its basic functionality can be tested using only a browser.

In addition, REST allows for better abstraction than RPC. Following RESTful constraints, you decouple the client and the server as much as possible. The RESTful connection doesn’t rely on a preexisting state, while there is no such requirement in RPC. When REST says _“Do this, and then let’s forget about each other,_” RPC may say _“Do this, then do that,”_ which will depend on the output of the previous action.

### REST vs SOAP

According to Cloud Elements’ 2017 [State of API Integration](https://offers.cloud-elements.com/the-state-of-api-integrations-report-2017-download) report, APIs using REST number 83 percent versus 15 percent of those using [SOAP.](https://www.altexsoft.com/blog/engineering/what-is-soap-formats-protocols-message-structure-and-how-soap-is-different-from-rest/) And that just proves that SOAP isn’t dead yet.

[Rob James](https://www.quora.com/profile/Rob-James-179), who’s been in software development since the 80s, points out that despite its shortcomings, SOAP provides some important advantages: “_Encapsulation is easier than the more common REST/JSON solutions. Web Service Description Language_ (or WSDL for short,  in which the SOAP API logic is written) _gives up more information than a typical JSON object provides.”_

Integrated with the WS-Security protocols, SOAP API transmits messages with a high level of privacy and integrity. That’s why it remains the best option for financial services, payment gateways ([PayPal public API](https://developer.paypal.com/docs/nvp-soap-api/PayPalSOAPAPIArchitecture/)), CRM software, identity management, and telecommunication services.

Still, Rob James admits that his goto is REST because SOAP isn’t easily altered and can be almost impossible to work around: “_I’ve come across instances where a WSDL cannot be resolved with generic tools because it was generated with a specific tool and vendor-specific tags._”

SOAP was largely based on the first version of RPC — XML. So, the biggest pro of REST over XML-bound SOAP is its multiple formats support.

### REST vs GraphQL

To get information for their request, REST API clients have to mix and match multiple endpoints. This snowballs into another problem — data over-fetching, which means that the response contains unnecessary information. This can slow the request processing.

[GraphQL](https://www.altexsoft.com/blog/engineering/graphql-core-features-architecture-pros-and-cons/) showed up in 2015 with a new philosophy of customizing endpoints. A GraphQL API starts with defining a schema that describes how data is structured on the server. Having this schema, a client understands how to formulate a single query and get a precise response.

Mobile devices are unreliable networks. So when a RESTful API must make multiple requests, the chances of failure are much higher. That’s why GraphQL’s efficient querying is very relevant for mobile APIs.

![API architecture patterns compared](https://content.altexsoft.com/media/2021/03/word-image-8.png)

_Four major API paradigms compared_

For a more consistent [overview of the four major API paradigms](https://www.altexsoft.com/blog/soap-vs-rest-vs-graphql-vs-rpc/), go to our dedicated article. You can also watch our video if you prefer more interactive content.

_Comparing web API types_

RESTful or RESTish, that is the question
----------------------------------------

The basic ideas and semantics of machine-to-machine interactions have been around for a very long time. But when REST showed up, it brought order to web APIs.

“_What made REST services important was that they were an attempt to standardize interfaces,”_ says Todd Main. He underlines that neither plain, old RPC calls nor SOAP had this structure: _“These are literally remotely available function calls. Instead, REST brings to the table a more standard way to programmatically browse a system, or at least to interface with it without consulting a manual at every step.”_

In RPC, a URL indicates an action because its main purpose is to serve requests. The idea behind REST is bigger — to organize interactions between independent systems.

REST means quite a bit more than using HTTP. “_You don’t even need to use HTTP to implement a REST architecture, although it does make it easier,”_ says [Claude Wilbur](https://www.quora.com/profile/Claude-Wilbur-1), who’s got over 30 years of programming under his belt.

But if developers fail to understand its whole concept, we may get systems that are just a little more than RPC with HTTP verbs and pretty URLs. No cacheability, wacky conventions, or zero links to discover the next available actions (hypermedia). People aware of the difference facetiously call these APIs RESTish.

On the other hand, REST, unlike SOAP, is not an etched-in-stone specification. Its implementations standardized to a certain degree can objectively qualify as RESTful. So, to be on the safe side, developers can describe their APIs not as RESTful, but as complying with REST architecture.
