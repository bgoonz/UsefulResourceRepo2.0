# A Collection of JavaScript CDN Resources - KeyCDN Support

> Use a JavaScript CDN combination for libraries, frameworks, or any other static JS files to help improve the delivery speed of these assets.

Updated on October 4, 2018

![A Collection of JavaScript CDN Resources](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/img/support/javascript-cdn.png)

Using a JavaScript CDN combination for libraries, frameworks, or any other static JS files can help **improve the delivery speed of these assets**. A CDN works by using a group of strategically placed servers to help shorten the distance between your website visitors and the servers that provide them with the requested data.

This means that instead of a visitor's request going all the way to the origin server and back, it will simply be directed towards the client's nearest point of presence (POP). According to a Stackoverflow survey of 49,397 responses, **55.4% of people said they use JS**. Since JavaScript is one of the most popular technologies used in programming, there is a good chance that your website / web project is using JS in one way or another.

Source: [stackoverflow.com](http://stackoverflow.com/research/developer-survey-2016)

Using a JavaScript CDN combination can be done in a couple of different ways depending on wether or not you already have a CDN account. If you do have a CDN account and have followed an [integration guide](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/support/integrations) for your site, you are likely already delivering your JavaScript assets via your provider's network of POPs. However, depending on your setup and given your CDN provider allows you to [push files](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/support/upload-data-to-a-push-zone) to a CDN storage cloud, you can reference the JS libraries by using your Zone URL (`https://lorem-1c6b.kxcdn.com/path/to/your/javascript`) or Zone Alias (`https://cdn.yourdomain.com/path/to/your/javascript`)

Alternatively a third party CDN service such as [cdnjs](https://cdnjs.com/), [jsdeliver](https://www.jsdelivr.com/), etc. can be used to reference popular JS libraries. This article covers a few popular JavaScript libraries and how each can be **optimized for faster delivery with the use of a JavaScript CDN**.

Underscore.js[#](#underscore-js)


------------------------------------

[Underscore.js](http://underscorejs.org/) is a library of JavaScript functions that are useful for common programming tasks. This library doesn't require you to extend any existing built-in objects as it takes advantage of functional programming design. Underscore.js provides **over 100 functions** that support both common functional helpers and more specialized tasks.

Using an [Underscore CDN](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/support/underscore-cdn) combination will help further improve the delivery of this JS library. You may reference the library using your own CDN account or with a third party CDN service with the following snippet (ensure that you first check for the latest version **x.y.z**).

    <script src="https://cdnjs.cloudflare.com/ajax/libs/underscore.js/x.y.z/underscore-min.js"></script>

Moment.js[#](#moment-js)


----------------------------

[Moment.js](http://momentjs.com/) is an open source library that allows you to parse, validate, manipulate and display dates in JavaScript. This library can be run from within a browser or in a Node.js application.

For users running the library from within a browser, a [Moment.js CDN](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/support/moment-js-cdn) combination can be used when referencing the file within your HTML. For users referencing from a third party CDN, the following link can be used (ensure that you first check for the latest version **x.y.z**).

    <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/x.y.z/moment.min.js"></script>

React.js[#](#react-js)


--------------------------

[React](https://facebook.github.io/react/) is an open source JavaScript library widely used for building UIs. The project is currently maintained by Facebook, Instagram and a large community of developers. React also has a sister library called [React Native](https://facebook.github.io/react-native/) which allows iOS and Android applications to take advantage of the React architecture.

Read our [ReactJS CDN](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/support/react-cdn) article to learn more about React and the benefits of delivering it via a CDN has to offer. To reference the React library via a third party CDN service, the following link can be used (ensure that you first check for the latest version **x.y.z**).

    <script src="https://cdnjs.cloudflare.com/ajax/libs/react/x.y.z/react.min.js"></script>

Require.js[#](#require-js)


------------------------------

[RequireJS](http://requirejs.org/) is a JavaScript module and file loader. When using Require.js, your code is separated in modules where **each module handles a single responsibility**. By separating code into modules this helps improve the speed and quality of your code.

Using a [RequireJS CDN](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/support/requirejs-cdn) combination will help improve the delivery speed of this JS file. If you do not have an existing CDN account, you can reference the file using the following link (ensure that you first check for the latest version **x.y.z**).

    <script data-main="scripts/main" src="https://cdnjs.cloudflare.com/ajax/libs/require.js/x.y.z/require.js"></script>

Handlebars.js[#](#handlebars-js)


------------------------------------

[Handlebars](http://handlebarsjs.com/) is an open source, JavaScript based templating engine. It allows you to separate the generation of HTML from the rest of your JS, giving you the ability to write cleaner code. A Handlebars template is HTML combined with Handlebars expressions, e.g. {{some content}}, for example:

    <div class="title">
        <h1>{{title}}</h1>
        <div class="content">
            {{content}}
        </div>
    </div>

Read our [Handlebars CDN](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/support/using-handlebars-cdn-combination) article to learn more about Handlebars.js and the benefits of delivering it via a CDN has to offer. To reference Handlebars.js via a third party CDN service, the following link can be used (ensure that you first check for the latest version **x.y.z**).

    <script src="https://cdnjs.cloudflare.com/ajax/libs/handlebars.js/x.y.z/handlebars.min.js"></script>

Knockout.js[#](#knockout-js)


--------------------------------

[Knockout](http://knockoutjs.com/) is another popular open source JavaScript library used to help **create responsive and rich web applications**. This library is especially useful for web applications that have UI sections that update dynamically.

Use a [Knockout CDN](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/support/knockout-cdn) combination when using this library in a web project. Doing so will help improve the file's delivery speed and redundancy, among other things. To reference the React library via a third party CDN service, the following link can be used (ensure that you first check for the latest version **x.y.z**).

    <script src="https://cdnjs.cloudflare.com/ajax/libs/knockout/x.y.z/knockout-min.js"></script>

Benefits of a JavaScript CDN combination[#](#benefits-of-a-javascript-cdn-combination)


------------------------------------------------------------------------------------------

There are various benefits to delivering JavaScript libraries using a CDN. Whether you're using your own CDN account or a third party service, there are [multiple reasons](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/support/7-reasons-you-should-use-a-content-distribution-network) for using a JavaScript CDN combination.

Although there are various [free CDNs](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/blog/free-cdns) that allow you to reference other popular libraries, frameworks, etc - there do exist additional benefits for users who use their own CDN account to deliver static assets:

*   **All static assets can be cached and delivered** - not only the libraries which are hosted on free CDNs
*   Content can be further accelerated given your CDN provider uses [HTTP/2](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/support/http2) and optimized servers
*   Increased granularity into the **reporting details** of assets delivered through your CDN provider
*   Greater control over **purging** content / feature configuration

What you need to consider when loading assets from multiple sources[#](#what-you-need-to-consider-when-loading-assets-from-multiple-sources)


------------------------------------------------------------------------------------------------------------------------------------------------

As mentioned above, there are multiple benefits to using a JavaScript CDN combination. Although, there can be cons to referencing your JavaScript libraries from multiple sources as is the case when using free CDN services. For example, due to the fact that the files you are requesting are hosted somewhere other than your CDN or origin server, the client must establish a connection to another host which requires an additional DNS lookup amongst other latency incurring processes.

It is always a good idea to [reduce DNS lookups](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/support/reduce-dns-lookups) to optimize the delivery of your website's assets. Additionally, if you're using [HTTP/2](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/support/http2) supported server(s) having all assets consolidated on a single domain can help further improve performance by taking full advantage of the benefits of the new protocol.

Keeping these aspects in mind is important as you decide how vital improving the performance of your web assets is to you. Through delivering all static assets from a CDN using a single domain, you can take advantage of the geographic presence of the CDN's servers as well as follow best practice.


[Source](https://www.keycdn.com/support/javascript-cdn-resources)