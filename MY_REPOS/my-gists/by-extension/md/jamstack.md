Are you already using the Jamstack? Boost your understanding of modern web dev and learn what the Jamstack is --- and what it's not --- in this overview.

TABLE OF CONTENTS
-----------------

1.  [The Jamstack is not a traditional tech stack.](https://www.learnwithjason.dev/blog/wtf-is-jamstack#the-jamstack-is-not-a-traditional-tech-stack)
2.  [Jamstack is more of an architecture.](https://www.learnwithjason.dev/blog/wtf-is-jamstack#jamstack-is-more-of-an-architecture)
3.  [What architectural decisions make an app a Jamstack app?](https://www.learnwithjason.dev/blog/wtf-is-jamstack#what-architectural-decisions-make-an-app-a-jamstack-app)
4.  [Isn't this the same as what we used to do?](https://www.learnwithjason.dev/blog/wtf-is-jamstack#isnt-this-the-same-as-what-we-used-to-do)
5.  [The Jamstack is not just marketing fluff.](https://www.learnwithjason.dev/blog/wtf-is-jamstack#the-jamstack-is-not-just-marketing-fluff)
6.  [The Jamstack is dope.](https://www.learnwithjason.dev/blog/wtf-is-jamstack#the-jamstack-is-dope)

At a high level, the Jamstack is an architectural approach to web apps that focuses on:

-   generating cacheable, static assets at build time whenever possible,
-   deploying those assets to CDNs, and
-   using client-side JavaScript to call third-party APIs and serverless functions for dynamic interactions and data.

For individual developers, the Jamstack lowers the barrier to entry, cuts down on the number of tools to learn, and provides modern tooling to build web apps.

For teams, the Jamstack helps enforce a more maintainable architecture and decreases iteration time, enabling faster delivery along with increased security and scalability.

For users, Jamstack apps typically load faster and are more reliable, which makes the web a less frustrating place.

[](https://www.learnwithjason.dev/blog/wtf-is-jamstack#the-jamstack-is-not-a-traditional-tech-stack)The Jamstack is not a traditional tech stack.
-------------------------------------------------------------------------------------------------------------------------------------------------

The Jamstack is not a "stack" in the same way the term is commonly used, such as the LAMP stack (Linux, Apache, MySQL, PHP) or MERN stack (Mongo, Express, React, Node).

It *is* true that the origin of Jamstack comes from the acronym JAM, standing for JavaScript, APIs, and Markup (or [maybe Markdown? who knows?](https://dev.to/shortdiv/what-does-the-m-in-jamstack-actually-mean-5hnf)). However, as people started adopting the principals of Jamstack, it immediately outgrew this stack and came to represent a more generalized approach.

Instead of being a descriptive acronym describing a particular tech stack, Jamstack joins "[radar](https://www.etymonline.com/word/radar)" and "[laser](https://www.etymonline.com/word/laser)" as an often-inaccurately-used acronym that represents a general idea instead of a precise origin.

[](https://www.learnwithjason.dev/blog/wtf-is-jamstack#jamstack-is-more-of-an-architecture)Jamstack is more of an *architecture*.
---------------------------------------------------------------------------------------------------------------------------------

The Jamstack is similar to terms like "[microservices](https://en.wikipedia.org/wiki/Microservices)" and "[monolith](https://en.wikipedia.org/wiki/Monolithic_application)" because it doesn't describe the specifics of implementation. Instead, these terms communicate the high-level details about how the code is organized.

If we hear someone describe a codebase as a monolith or microservices, we get a broad idea of the architecture and can make some high-level assumptions about how the code works. However, knowing the high-level architecture doesn't tell us anything about the specifics of how the code is implemented.

Jamstack is like that: if we hear an app described as a Jamstack app, we can make broad architectural assumptions, but the implementation details can vary widely between teams.

[](https://www.learnwithjason.dev/blog/wtf-is-jamstack#what-architectural-decisions-make-an-app-a-jamstack-app)What architectural decisions make an app a Jamstack app?
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------

If the Jamstack allows us to make architectural assumptions, *what are those assumptions?* In the broadest strokes, the software architecture decisions that make up the Jamstack are:

-   Assets are generated at build time, not request time.
-   Apps are deployed to CDNs instead of always-on servers.
-   Deployments ship atomic, static assets instead of dynamic, derived assets.
-   Dynamic interactions use APIs and serverless functions instead of monolithic servers.

### [](https://www.learnwithjason.dev/blog/wtf-is-jamstack#assets-are-generated-at-build-time-not-request-time)Assets are generated at build time, not request time

Any performance-minded developer will tell you to cache responses to both speed up our apps and reduce load on our servers. In just about any production stack out there, we can expect to find caching in place.

Often, this is done by waiting for a site visitor to hit a URL, doing work on the server at request time to generate the assets required to render the page, then caching that response so the next visitor is able to get the assets without waiting for the server to do the work.

![Flowcharts of both request time rendering and build time rendering.](https://res.cloudinary.com/jlengstorf/image/upload/q_auto,f_auto/v1585355836/lwj/blog/wtf-is-jamstack/rtr-vs-btr.png)

A comparison of request time rendering and build time rendering.

The Jamstack takes this one step further: if you generate the cache at build time, no one ever has to wait for assets to be generated.

This gives us much more certainty about our deployment process because, as [Phil Hawksworth puts it](https://dev.to/philhawksworth/prerendering-is-the-key-to-a-tasty-jamstack-22pp), "by pre-rendering our sites we can be certain that our pages are correct before we deploy them".

### [](https://www.learnwithjason.dev/blog/wtf-is-jamstack#apps-are-deployed-to-cdns-instead-of-always-on-servers)Apps are deployed to CDNs instead of always-on servers

By thinking of our apps as pre-generated caches, we eliminate the need for always-on servers. This creates several huge benefits:

-   Our sites load faster because we can deploy to Content Delivery Networks (CDNs), putting our app assets closer to the people trying to load them.
-   We cut down on costs. Using CDNs means we don't have to pay for massively scalable servers to handle traffic spikes. We're shipping more reliable sites *and* reducing operational overhead.
-   Our apps are more secure because there's no active connection to a server or database. Sites are made of pre-generated, static assets, which means we don't *need* a server or database to display them.
-   Our apps are more stable. There are very few moving parts between your site visitors and the content they're requesting, so there are fewer points of failure in the request chain.

### [](https://www.learnwithjason.dev/blog/wtf-is-jamstack#deployments-ship-atomic-static-assets-instead-of-dynamic-derived-assets)Deployments ship atomic, static assets instead of dynamic, derived assets

Because we build the *entire* site once, we get a very cool benefit: atomic deploys. Once the site is built, we have all of the markup, styles, scripts, data --- *everything* in one place that won't be modified again after the build. This means that if we make a mistake, we can roll back to a previous deploy by straight-up replacing the bad deploy's files with a previous good deploy.

![Flowcharts of rolling back an atomic deploy.](https://res.cloudinary.com/jlengstorf/image/upload/q_auto,f_auto/v1585363148/lwj/blog/wtf-is-jamstack/atomic-deploy.png)

Because build time rendering gives us atomic deploys, we can easily roll back if something goes wrong.

This *also* means we can set up previews for new ideas quickly and easily: we can create a branch in our repo, run a build, and then host that site at a private, temporary URL to send the idea around for feedback.

At Netlify, where I work, [instant rollbacks, branch deploys, and deploy previews for pull requests](https://www.netlify.com/products/build/?utm_source=learnwithjason&utm_medium=wtf-is-jamstack-jl&utm_campaign=devex) are all powered by this concept. I rarely hear anyone talk about it, but this is one of the most powerful benefits of the Jamstack.

### [](https://www.learnwithjason.dev/blog/wtf-is-jamstack#dynamic-data-uses-apis-and-serverless-functions-instead-of-monolithic-servers)Dynamic data uses APIs and serverless functions instead of monolithic servers

Not everything can be cached, however: what if our site's users log in and need to see their own data? It doesn't make sense to try and build that ahead of time --- it would be a huge security risk, for one thing --- so we still need a way to handle user input and load personalized data on-demand.

Handling dynamic data and interactions is a core part of the Jamstack approach, which may seem counterintuitive after we've just spent most of this article talking about generating static assets.

This is an important distinction: static assets do not mean static apps.

A JavaScript file is a static asset. Using JavaScript, we can make calls out to other APIs, third-party services, and all sorts of other data sources --- this means we have all the same flexibility to generate dynamic content that we have with a traditional server request.

I've written a whole article with [examples of dynamic patterns in the Jamstack](https://www.smashingmagazine.com/2019/12/dynamic-async-functionality-jamsstack-websites/), so I won't go into detail here, but the short version is: Jamstack apps can take advantage of third-party APIs and our own serverless functions to create just about any kind of dynamic interactions we can imagine.

The benefit here is that we get to focus just on the data and business logic instead of building out all the boilerplate for a service and dealing with the operational overhead of keeping it deployed and maintained.

[](https://www.learnwithjason.dev/blog/wtf-is-jamstack#isnt-this-the-same-as-what-we-used-to-do)Isn't this the same as what we used to do?
------------------------------------------------------------------------------------------------------------------------------------------

In a sense, the Jamstack is a return to a very old method of building websites: we create a static asset --- an HTML file --- and put that online somewhere. If you've ever dragged a file into an FTP program to make website changes, this may feel familiar.

The difficulty of manually editing every file on a site and uploading the changes via FTP was high, and it left a lot of room for human error.

As web development evolved, more tooling was created to generate assets automatically. We saw the rise of PHP, followed by the even more dramatic rise of WordPress. We saw Node enter the scene, with frameworks like Express for building our own template-driven servers. We saw Grunt, Gulp, Webpack, and other tools enter the mix to automate complicated build processes.

And somewhere along the way, it became *complicated* to get a website up on the web.

Jamstack returns to the old way of deploying static files as a folder --- we're swapping out traditional hosting for a CDN --- and introduces new innovations that make the process of creating sites boring again.

The Jamstack combines tried-and-true development and deployment strategies with more ergonomic tooling, better abstractions around common infrastructure, and improvements to the JavaScript ecosystem have helped smooth out the developer experience around all this powerful tooling, decreasing the friction to build and deploy web apps.

[](https://www.learnwithjason.dev/blog/wtf-is-jamstack#the-jamstack-is-not-just-marketing-fluff)The Jamstack is not just marketing fluff.
-----------------------------------------------------------------------------------------------------------------------------------------

A common criticism of the Jamstack is that it's just a marketing term for stuff that already exists.

Depending on what you're predisposed to believe, this statement can fall anywhere on the spectrum of true and false.

Put cynically, the Jamstack is "just putting static files on S3".

Put charitably, the Jamstack is "revolutionizing web development by removing barriers and giving frontend developers superpowers".

Somewhere in the middle lies a more objective assessment: the Jamstack is a label for a broad assortment of website-building techniques. These techniques are based on several mature solutions that have existed long before the Jamstack was around to describe it, and *also* introduces new innovations that streamline the process and make building in this way more approachable.

[](https://www.learnwithjason.dev/blog/wtf-is-jamstack#the-jamstack-is-dope)The Jamstack is dope.
-------------------------------------------------------------------------------------------------

To recap, let's run through the Big Ideas™ of the Jamstack that we covered in this article:

1.  The Jamstack is not just marketing fluff.
2.  The Jamstack is not actually a tech stack.
3.  The Jamstack is an architectural approach to building web apps that focuses on static assets shipped to CDNs using APIs and/or serverless functions to add dynamic functoinality.
4.  For a large number of web apps, the Jamstack will be faster, more reliable, and more efficient than other architectural approaches.

I'm obviously biased, given that I work at Netlify. However, I love the Jamstack and have been recommending it since long before I took a job at Netlify --- I was pushing for this approach when I worked at IBM back in 2016 and didn't have a word to describe the approach yet. 💜

Are you exploring the Jamstack for an upcoming project? What questions do you have about it? I really want to hear from you --- [hit me up on Twitter](http://twitter.com/compose/tweet?text=Hey%20@jlengstorf!%20I%E2%80%99m%20looking%20into%20the%20Jamstack%20for%20a%20project%20and%20I%20have%20questions.) or reply to any of [my newsletter](https://www.learnwithjason.dev/newsletter/) messages! (I'm serious, too: hearing what you find confusing, inspiring, frustrating, etc. about the Jamstack helps me know what I should create content about, so *please* don't hold back!)