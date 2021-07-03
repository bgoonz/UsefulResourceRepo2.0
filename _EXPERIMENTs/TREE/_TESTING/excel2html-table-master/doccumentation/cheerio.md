# cheerio

> Tiny, fast, and elegant implementation of core jQuery designed specifically for the server

##### Fast, flexible & lean implementation of core jQuery designed specifically for the server.

[![Travis CI](https://camo.githubusercontent.com/8346e7a8789ac28222f352bafb393b7a04650b2918352a1a11db62eb4733c5d5/68747470733a2f2f7365637572652e7472617669732d63692e6f72672f6368656572696f6a732f6368656572696f2e7376673f6272616e63683d6d6173746572)](http://travis-ci.org/cheeriojs/cheerio) [ ![Coverage](https://camo.githubusercontent.com/f6ed6b9d58f0f8e1f0350a7da5ebd1f623de0157731a4bfe1b3b5cf177351b82/687474703a2f2f696d672e736869656c64732e696f2f636f766572616c6c732f6368656572696f6a732f6368656572696f2e7376673f6272616e63683d6d6173746572267374796c653d666c6174) ](https://coveralls.io/r/cheeriojs/cheerio) [ ![Join the chat at https://gitter.im/cheeriojs/cheerio](https://camo.githubusercontent.com/5dbac0213da25c445bd11f168587c11a200ba153ef3014e8408e462e410169b3/68747470733a2f2f6261646765732e6769747465722e696d2f4a6f696e253230436861742e737667) ](https://gitter.im/cheeriojs/cheerio?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge) [ ![OpenCollective backers](https://camo.githubusercontent.com/15a658314ee4863d78803d509443997764f84ba5d494da6eba75e5f2f7511125/68747470733a2f2f6f70656e636f6c6c6563746976652e636f6d2f6368656572696f2f6261636b6572732f62616467652e737667) ](#backers) [![OpenCollective sponsors](https://camo.githubusercontent.com/bfe99c12aeccb4c969c7b0cd27b1ebfba2272a95f04ba0c51cde1632a8e86769/68747470733a2f2f6f70656e636f6c6c6563746976652e636f6d2f6368656572696f2f73706f6e736f72732f62616467652e737667)](#sponsors)

[中文文档 (Chinese Readme)](https://github.com/cheeriojs/cheerio/wiki/Chinese-README)

const cheerio \= require('cheerio');
const $ \= cheerio.load('<h2 class="title">Hello world</h2>');

$('h2.title').text('Hello there!');
$('h2').addClass('welcome');

$.html();
//=> <html><head></head><body><h2 class="title welcome">Hello there!</h2></body></html>

## Note

We are currently working on the 1.0.0 release of cheerio on the `main` branch. The source code for the last published version, `0.22.0`, can be found [here](https://github.com/cheeriojs/cheerio/tree/aa90399c9c02f12432bfff97b8f1c7d8ece7c307).

## Installation

`npm install cheerio`

## Features

**❤ Familiar syntax:** Cheerio implements a subset of core jQuery. Cheerio removes all the DOM inconsistencies and browser cruft from the jQuery library, revealing its truly gorgeous API.

**ϟ Blazingly fast:** Cheerio works with a very simple, consistent DOM model. As a result parsing, manipulating, and rendering are incredibly efficient.

**❁ Incredibly flexible:** Cheerio wraps around [parse5](https://github.com/inikulin/parse5) parser and can optionally use @FB55's forgiving [htmlparser2](https://github.com/fb55/htmlparser2/). Cheerio can parse nearly any HTML or XML document.

## Cheerio is not a web browser

Cheerio parses markup and provides an API for traversing/manipulating the resulting data structure. It does not interpret the result as a web browser does. Specifically, it does _not_ produce a visual rendering, apply CSS, load external resources, or execute JavaScript. If your use case requires any of this functionality, you should consider projects like [PhantomJS](http://phantomjs.org/) or [JSDom](https://github.com/tmpvar/jsdom).

## API

### Markup example we'll be using:

<ul id\="fruits"\>
  <li class\="apple"\>Apple</li\>
  <li class\="orange"\>Orange</li\>
  <li class\="pear"\>Pear</li\>
</ul\>

This is the HTML markup we will be using in all of the API examples.

### Loading

First you need to load in the HTML. This step in jQuery is implicit, since jQuery operates on the one, baked-in DOM. With Cheerio, we need to pass in the HTML document.

This is the _preferred_ method:

const cheerio \= require('cheerio');
const $ \= cheerio.load('<ul id="fruits">...</ul>');

$.html();
//=> <html><head></head><body><ul id="fruits">...</ul></body></html>

Similar to web browser contexts, `load` will introduce `<html>`, `<head>`, and `<body>` elements if they are not already present. You can set `load`'s third argument to `false` to disable this.

const $ \= cheerio.load('<ul id="fruits">...</ul>', null, false);

$.html();
//=> '<ul id="fruits">...</ul>'

Optionally, you can also load in the HTML by passing the string as the context:

const $ \= require('cheerio');
$('ul', '<ul id="fruits">...</ul>');

Or as the root:

const $ \= require('cheerio');
$('li', 'ul', '<ul id="fruits">...</ul>');

If you need to modify parsing options for XML input, you may pass an extra object to `.load()`:

const $ \= cheerio.load('<ul id="fruits">...</ul>', {
xml: {
normalizeWhitespace: true,
},
});

The options in the `xml` object are taken directly from [htmlparser2](https://github.com/fb55/htmlparser2/wiki/Parser-options), therefore any options that can be used in `htmlparser2` are valid in cheerio as well. When `xml` is set, the default options are:

{
xmlMode: true,
decodeEntities: true, // Decode HTML entities.
withStartIndices: false, // Add a \`startIndex\` property to nodes.
withEndIndices: false, // Add an \`endIndex\` property to nodes.
}

For a full list of options and their effects, see [this](https://github.com/fb55/DomHandler) and [htmlparser2's options](https://github.com/fb55/htmlparser2/wiki/Parser-options).

Some users may wish to parse markup with the `htmlparser2` library, and traverse/manipulate the resulting structure with Cheerio. This may be the case for those upgrading from pre-1.0 releases of Cheerio (which relied on `htmlparser2`), for those dealing with invalid markup (because `htmlparser2` is more forgiving), or for those operating in performance-critical situations (because `htmlparser2` may be faster in some cases). Note that "more forgiving" means `htmlparser2` has error-correcting mechanisms that aren't always a match for the standards observed by web browsers. This behavior may be useful when parsing non-HTML content.

To support these cases, `load` also accepts a `htmlparser2`\-compatible data structure as its first argument. Users may install `htmlparser2`, use it to parse input, and pass the result to `load`:

// Usage as of htmlparser2 version 3:
const htmlparser2 \= require('htmlparser2');
const dom \= htmlparser2.parseDOM(document, options);

const $ \= cheerio.load(dom);

### Selectors

Cheerio's selector implementation is nearly identical to jQuery's, so the API is very similar.

#### $( selector, \[context\], \[root\] )

`selector` searches within the `context` scope which searches within the `root` scope. `selector` and `context` can be a string expression, DOM Element, array of DOM elements, or cheerio object. `root` is typically the HTML document string.

This selector method is the starting point for traversing and manipulating the document. Like jQuery, it's the primary method for selecting elements in the document, but unlike jQuery it's built on top of the CSSSelect library, which implements most of the Sizzle selectors.

$('.apple', '#fruits').text();
//=> Apple

$('ul .pear').attr('class');
//=> pear

$('li\[class=orange\]').html();
//=> Orange

##### XML Namespaces

You can select with XML Namespaces but [due to the CSS specification](https://www.w3.org/TR/2011/REC-css3-selectors-20110929/#attribute-selectors), the colon (`:`) needs to be escaped for the selector to be valid.

### Rendering

When you're ready to render the document, you can call the `html` method on the "root" selection:

$.root().html();
//=> <html>
// <head></head>
// <body>
// <ul id="fruits">
// <li class="apple">Apple</li>
// <li class="orange">Orange</li>
// <li class="pear">Pear</li>
// </ul>
// </body>
// </html>

If you want to render the [`outerHTML`](https://developer.mozilla.org/en-US/docs/Web/API/Element/outerHTML) of a selection, you can use the `html` utility functon:

cheerio.html($('.pear'));
//=> <li class="pear">Pear</li>

By default, `html` will leave some tags open. Sometimes you may instead want to render a valid XML document. For example, you might parse the following XML snippet:

const $ = cheerio.load('<media:thumbnail url\="http://www.foo.com/keyframe.jpg" width\="75" height\="50" time\="12:05:01.123"/>');

... and later want to render to XML. To do this, you can use the 'xml' utility function:

$.xml();
//=> <media:thumbnail url="http://www.foo.com/keyframe.jpg" width="75" height="50" time="12:05:01.123"/>

You may also render the text content of a Cheerio object using the `text` static method:

const $ \= cheerio.load('This is <em>content</em>.');
cheerio.text($('body'));
//=> This is content.

### Plugins

Once you have loaded a document, you may extend the prototype or the equivalent `fn` property with custom plugin methods:

const $ \= cheerio.load('<html><body>Hello, <b>world</b>!</body></html>');
$.prototype.logHtml \= function () {
console.log(this.html());
};

$('body').logHtml(); // logs "Hello, <b>world</b>!" to the console

### The "DOM Node" object

Cheerio collections are made up of objects that bear some resemblance to [browser-based DOM nodes](https://developer.mozilla.org/en-US/docs/Web/API/Node). You can expect them to define the following properties:

- `tagName`
- `parentNode`
- `previousSibling`
- `nextSibling`
- `nodeValue`
- `firstChild`
- `childNodes`
- `lastChild`

## Screencasts

[http://vimeo.com/31950192](http://vimeo.com/31950192)

> This video tutorial is a follow-up to Nettut's "How to Scrape Web Pages with Node.js and jQuery", using cheerio instead of JSDOM + jQuery. This video shows how easy it is to use cheerio and how much faster cheerio is than JSDOM + jQuery.

## Cheerio in the real world

Are you using cheerio in production? Add it to the [wiki](https://github.com/cheeriojs/cheerio/wiki/Cheerio-in-Production)!

## Testing

To run the test suite, download the repository, then within the cheerio directory, run:

This will download the development packages and run the test suite.

## Sponsors

Does your company use Cheerio in production? Please consider [sponsoring this project](https://opencollective.com/cheerio#sponsor). Your help will allow maintainers to dedicate more time and resources to its development and support.

[![](https://camo.githubusercontent.com/e1d77cf3d5038cc2eee326ae08987234c9339aece7c0892ae1f28684f310e51a/68747470733a2f2f6f70656e636f6c6c6563746976652e636f6d2f6368656572696f2f73706f6e736f722f302f6176617461722e737667)](https://opencollective.com/cheerio/sponsor/0/website) [![](https://camo.githubusercontent.com/258c27740dbe965c244feef5a3fa1542590ad8729abebdef6a91248b50556f61/68747470733a2f2f6f70656e636f6c6c6563746976652e636f6d2f6368656572696f2f73706f6e736f722f312f6176617461722e737667)](https://opencollective.com/cheerio/sponsor/1/website) [![](https://camo.githubusercontent.com/db16cdf53d437f3ef7a46334cd4de22971cfea3a5cd715289791d05b0e43d17b/68747470733a2f2f6f70656e636f6c6c6563746976652e636f6d2f6368656572696f2f73706f6e736f722f322f6176617461722e737667)](https://opencollective.com/cheerio/sponsor/2/website) [![](https://camo.githubusercontent.com/66e1015c2c9490b85b7a4943fd876bc6ab4cbc006484f7ed0627c5c2b12a8eed/68747470733a2f2f6f70656e636f6c6c6563746976652e636f6d2f6368656572696f2f73706f6e736f722f332f6176617461722e737667)](https://opencollective.com/cheerio/sponsor/3/website) [![](https://camo.githubusercontent.com/ef94b0925a6f8f3a1178e7d0bafe526539e7e794566fee0fa75ab452f75b841a/68747470733a2f2f6f70656e636f6c6c6563746976652e636f6d2f6368656572696f2f73706f6e736f722f342f6176617461722e737667)](https://opencollective.com/cheerio/sponsor/4/website) [![](https://camo.githubusercontent.com/7d3abecad1231dcae9830676ad2063e273d8d22680ec1310669af44d7f93d774/68747470733a2f2f6f70656e636f6c6c6563746976652e636f6d2f6368656572696f2f73706f6e736f722f352f6176617461722e737667)](https://opencollective.com/cheerio/sponsor/5/website) [![](https://camo.githubusercontent.com/68ad3b96f5d552a29dfb653e7503f4a679eb465a669be9a0581a97ca64c5134a/68747470733a2f2f6f70656e636f6c6c6563746976652e636f6d2f6368656572696f2f73706f6e736f722f362f6176617461722e737667)](https://opencollective.com/cheerio/sponsor/6/website) [![](https://camo.githubusercontent.com/98e460b74f73e10475e7daf98881ad05a359ae5159cc55564422cabb6303b700/68747470733a2f2f6f70656e636f6c6c6563746976652e636f6d2f6368656572696f2f73706f6e736f722f372f6176617461722e737667)](https://opencollective.com/cheerio/sponsor/7/website) [![](https://camo.githubusercontent.com/551f4217c29f7a5b3b96ca26e0c7f9beccad8e14d53165c124f195bc95877bfe/68747470733a2f2f6f70656e636f6c6c6563746976652e636f6d2f6368656572696f2f73706f6e736f722f382f6176617461722e737667)](https://opencollective.com/cheerio/sponsor/8/website) [![](https://camo.githubusercontent.com/0d07dce88fc51746b2b09110c4365f6787fbaff2df5cb6bb99d16cf62e717e4a/68747470733a2f2f6f70656e636f6c6c6563746976652e636f6d2f6368656572696f2f73706f6e736f722f392f6176617461722e737667)](https://opencollective.com/cheerio/sponsor/9/website) [![](https://camo.githubusercontent.com/8ede62e671556c0380280f1e8de49fd3d4f22cf6eea6be0d0720d058284386c6/68747470733a2f2f6f70656e636f6c6c6563746976652e636f6d2f6368656572696f2f73706f6e736f722f31302f6176617461722e737667)](https://opencollective.com/cheerio/sponsor/10/website) [![](https://camo.githubusercontent.com/fef20ea1c806a0102becbc00720286f0d63155eefc8b67bb0dbe7756fa356ba2/68747470733a2f2f6f70656e636f6c6c6563746976652e636f6d2f6368656572696f2f73706f6e736f722f31312f6176617461722e737667)](https://opencollective.com/cheerio/sponsor/11/website) [![](https://camo.githubusercontent.com/2f1a8920c03322861b16ccdc66fb8b1c81b9040c48bded008a599e1298b3df48/68747470733a2f2f6f70656e636f6c6c6563746976652e636f6d2f6368656572696f2f73706f6e736f722f31322f6176617461722e737667)](https://opencollective.com/cheerio/sponsor/12/website) [![](https://camo.githubusercontent.com/b21734d3ee4b7edb1c9d1c640622b9a279cc6def0ebbb6b413a68800e45a1534/68747470733a2f2f6f70656e636f6c6c6563746976652e636f6d2f6368656572696f2f73706f6e736f722f31332f6176617461722e737667)](https://opencollective.com/cheerio/sponsor/13/website) [![](https://camo.githubusercontent.com/7410280ef1ddd006c34a57d3a05c6cd9cc612cf2918a639e7b6e5c0ef96989b7/68747470733a2f2f6f70656e636f6c6c6563746976652e636f6d2f6368656572696f2f73706f6e736f722f31342f6176617461722e737667)](https://opencollective.com/cheerio/sponsor/14/website) [![](https://camo.githubusercontent.com/cce5065f2f074adea5a6d271926f93a5c0affb662ff7594a40cd53e8aa6ede2e/68747470733a2f2f6f70656e636f6c6c6563746976652e636f6d2f6368656572696f2f73706f6e736f722f31352f6176617461722e737667)](https://opencollective.com/cheerio/sponsor/15/website) [![](https://camo.githubusercontent.com/41b307f16ab13fc52eaa7cdf1e097cf5246e1c9028dd41194ac42d1ed68e4241/68747470733a2f2f6f70656e636f6c6c6563746976652e636f6d2f6368656572696f2f73706f6e736f722f31362f6176617461722e737667)](https://opencollective.com/cheerio/sponsor/16/website) [![](https://camo.githubusercontent.com/4daf4e3c320a7647bd1c885390bf339a6a9dbfa697a8b95a43f309f290ab38da/68747470733a2f2f6f70656e636f6c6c6563746976652e636f6d2f6368656572696f2f73706f6e736f722f31372f6176617461722e737667)](https://opencollective.com/cheerio/sponsor/17/website) [![](https://camo.githubusercontent.com/4b4a61fb43b9b6ce1cec8393ca13e020354407561ca48db90e7c0520356fa904/68747470733a2f2f6f70656e636f6c6c6563746976652e636f6d2f6368656572696f2f73706f6e736f722f31382f6176617461722e737667)](https://opencollective.com/cheerio/sponsor/18/website) [![](https://camo.githubusercontent.com/0caad3f042c91f1d9bffeacb0a9e7944f86cb7b94cc72144b25936ee9539171b/68747470733a2f2f6f70656e636f6c6c6563746976652e636f6d2f6368656572696f2f73706f6e736f722f31392f6176617461722e737667)](https://opencollective.com/cheerio/sponsor/19/website) [![](https://camo.githubusercontent.com/b88544aeb7b0e00e78dd56be03c1c90d4b069ad020632c69e0f6ef605103fb62/68747470733a2f2f6f70656e636f6c6c6563746976652e636f6d2f6368656572696f2f73706f6e736f722f32302f6176617461722e737667)](https://opencollective.com/cheerio/sponsor/20/website) [![](https://camo.githubusercontent.com/aace21f0ed2313898b8bb7783737f984bb40c3f1472f022ff1a9cd5acdd7537b/68747470733a2f2f6f70656e636f6c6c6563746976652e636f6d2f6368656572696f2f73706f6e736f722f32312f6176617461722e737667)](https://opencollective.com/cheerio/sponsor/21/website) [![](https://camo.githubusercontent.com/3a34d0eec1dae62dbffae7ac38d71c8b6429d4f10d7559da35b2b23dd4d1ba88/68747470733a2f2f6f70656e636f6c6c6563746976652e636f6d2f6368656572696f2f73706f6e736f722f32322f6176617461722e737667)](https://opencollective.com/cheerio/sponsor/22/website) [![](https://camo.githubusercontent.com/039f546015e68d8fa80f31c5d611cc73315d6b4c549f3b066930100d7d39334f/68747470733a2f2f6f70656e636f6c6c6563746976652e636f6d2f6368656572696f2f73706f6e736f722f32332f6176617461722e737667)](https://opencollective.com/cheerio/sponsor/23/website) [![](https://camo.githubusercontent.com/87d8b4e2430e1c35a25cbe04b332a35941ae8cc67b11bb0638ac03bad6ca24a3/68747470733a2f2f6f70656e636f6c6c6563746976652e636f6d2f6368656572696f2f73706f6e736f722f32342f6176617461722e737667)](https://opencollective.com/cheerio/sponsor/24/website) [![](https://camo.githubusercontent.com/030fe80cf35b60950bc6ff348029764bc43a938222c8496d79ae90d91073dcf7/68747470733a2f2f6f70656e636f6c6c6563746976652e636f6d2f6368656572696f2f73706f6e736f722f32352f6176617461722e737667)](https://opencollective.com/cheerio/sponsor/25/website) [![](https://camo.githubusercontent.com/c3ee75eb4191d80dc7ce7b17f9997858920f2ec937db4f2e7a25673f49797112/68747470733a2f2f6f70656e636f6c6c6563746976652e636f6d2f6368656572696f2f73706f6e736f722f32362f6176617461722e737667)](https://opencollective.com/cheerio/sponsor/26/website) [![](https://camo.githubusercontent.com/61efcf92ab003b92c58ac72d33275d5cb45bca9460c16c5917927a7f47794ada/68747470733a2f2f6f70656e636f6c6c6563746976652e636f6d2f6368656572696f2f73706f6e736f722f32372f6176617461722e737667)](https://opencollective.com/cheerio/sponsor/27/website) [![](https://camo.githubusercontent.com/f600e3e8d2f68aba411d3f25e4fe17651cab348f161b7815556328f3a79247c8/68747470733a2f2f6f70656e636f6c6c6563746976652e636f6d2f6368656572696f2f73706f6e736f722f32382f6176617461722e737667)](https://opencollective.com/cheerio/sponsor/28/website) [![](https://camo.githubusercontent.com/79673d24d0c24430bd5b5db401c89ba79263efe3de04eecb1750c7f9937954a7/68747470733a2f2f6f70656e636f6c6c6563746976652e636f6d2f6368656572696f2f73706f6e736f722f32392f6176617461722e737667)](https://opencollective.com/cheerio/sponsor/29/website)

## Backers

[Become a backer](https://opencollective.com/cheerio#backer) to show your support for Cheerio and help us maintain and improve this open source project.

[![](https://camo.githubusercontent.com/ac8e49777bbeaef26f2ac1ef8f0419f90d15e944ad3ba8b9c108dbc09e3901a3/68747470733a2f2f6f70656e636f6c6c6563746976652e636f6d2f6368656572696f2f6261636b65722f302f6176617461722e737667)](https://opencollective.com/cheerio/backer/0/website) [![](https://camo.githubusercontent.com/e6990b5f4d3bb4cd5be2a9409a979187ec6d2229f19652a8b7d7eee5467df58b/68747470733a2f2f6f70656e636f6c6c6563746976652e636f6d2f6368656572696f2f6261636b65722f312f6176617461722e737667)](https://opencollective.com/cheerio/backer/1/website) [![](https://camo.githubusercontent.com/9de0f54290a48c184436c0e7cdeb27b95e521c0f88aa1fac993ca5f76fc9fe3b/68747470733a2f2f6f70656e636f6c6c6563746976652e636f6d2f6368656572696f2f6261636b65722f322f6176617461722e737667)](https://opencollective.com/cheerio/backer/2/website) [![](https://camo.githubusercontent.com/284bc74ee02672581c1eb0e091a4ae93ee7ab771e9254c691e3a292a43970edd/68747470733a2f2f6f70656e636f6c6c6563746976652e636f6d2f6368656572696f2f6261636b65722f332f6176617461722e737667)](https://opencollective.com/cheerio/backer/3/website) [![](https://camo.githubusercontent.com/073b96849cfd72ae047f3c5dd472569e75cd6f761b33e0104ea3053750c48fd2/68747470733a2f2f6f70656e636f6c6c6563746976652e636f6d2f6368656572696f2f6261636b65722f342f6176617461722e737667)](https://opencollective.com/cheerio/backer/4/website) [![](https://camo.githubusercontent.com/a6a0428b30788188618b7d9676ba32f4056212e03be9c3384ca3e7aed6418533/68747470733a2f2f6f70656e636f6c6c6563746976652e636f6d2f6368656572696f2f6261636b65722f352f6176617461722e737667)](https://opencollective.com/cheerio/backer/5/website) [![](https://camo.githubusercontent.com/be5ebce6a623cecf11898896712c85c658887b781903e87fa7d4e124035bcffd/68747470733a2f2f6f70656e636f6c6c6563746976652e636f6d2f6368656572696f2f6261636b65722f362f6176617461722e737667)](https://opencollective.com/cheerio/backer/6/website) [![](https://camo.githubusercontent.com/3ae7543eff8e80b1cd7c63b6c6ea225f14c5d5cc37cfd4fee6c86e80997d25eb/68747470733a2f2f6f70656e636f6c6c6563746976652e636f6d2f6368656572696f2f6261636b65722f372f6176617461722e737667)](https://opencollective.com/cheerio/backer/7/website) [![](https://camo.githubusercontent.com/30530520ec33f7d0b8a979fbfedc6cccd5108e0d8bb15dd0fb28bd27b3dbb8c8/68747470733a2f2f6f70656e636f6c6c6563746976652e636f6d2f6368656572696f2f6261636b65722f382f6176617461722e737667)](https://opencollective.com/cheerio/backer/8/website) [![](https://camo.githubusercontent.com/1b4109aa9faf4c1b598bc009c9370facac2407cf41c2a89709c071d99baed8e7/68747470733a2f2f6f70656e636f6c6c6563746976652e636f6d2f6368656572696f2f6261636b65722f392f6176617461722e737667)](https://opencollective.com/cheerio/backer/9/website) [![](https://camo.githubusercontent.com/ff9e1e896b3807a693e604a4e66c9deed1f6dbbf303e78cbd2e50262e7f10e8e/68747470733a2f2f6f70656e636f6c6c6563746976652e636f6d2f6368656572696f2f6261636b65722f31302f6176617461722e737667)](https://opencollective.com/cheerio/backer/10/website) [![](https://camo.githubusercontent.com/4a242863de7c0d000f8ca42cd436371a385824333340350db918b920e00d78e7/68747470733a2f2f6f70656e636f6c6c6563746976652e636f6d2f6368656572696f2f6261636b65722f31312f6176617461722e737667)](https://opencollective.com/cheerio/backer/11/website) [![](https://camo.githubusercontent.com/cb035498b39f0291e93942bd289e2c16593d503707de27c49ef4e1aa332ef870/68747470733a2f2f6f70656e636f6c6c6563746976652e636f6d2f6368656572696f2f6261636b65722f31322f6176617461722e737667)](https://opencollective.com/cheerio/backer/12/website) [![](https://camo.githubusercontent.com/09791aa334462a3140579b9eca67c3463b108b0280e80ae352f462402c4d19bd/68747470733a2f2f6f70656e636f6c6c6563746976652e636f6d2f6368656572696f2f6261636b65722f31332f6176617461722e737667)](https://opencollective.com/cheerio/backer/13/website) [![](https://camo.githubusercontent.com/6591d62a80563f1b3263a6fd479b2deb68a1a48e00a0f229687882239a580a80/68747470733a2f2f6f70656e636f6c6c6563746976652e636f6d2f6368656572696f2f6261636b65722f31342f6176617461722e737667)](https://opencollective.com/cheerio/backer/14/website) [![](https://camo.githubusercontent.com/18ff8bdb6cad36106462d3abdd11ddf9974c2ae060b71c5879432de136bece98/68747470733a2f2f6f70656e636f6c6c6563746976652e636f6d2f6368656572696f2f6261636b65722f31352f6176617461722e737667)](https://opencollective.com/cheerio/backer/15/website) [![](https://camo.githubusercontent.com/46ef612f8ce6935ddf8017d6f45d09f50033b703e66c23503cb6e5652c7304b1/68747470733a2f2f6f70656e636f6c6c6563746976652e636f6d2f6368656572696f2f6261636b65722f31362f6176617461722e737667)](https://opencollective.com/cheerio/backer/16/website) [![](https://camo.githubusercontent.com/ad4c0354cf83222b6a78db6770334170cf71186441ecb0df81ca8a232574a16a/68747470733a2f2f6f70656e636f6c6c6563746976652e636f6d2f6368656572696f2f6261636b65722f31372f6176617461722e737667)](https://opencollective.com/cheerio/backer/17/website) [![](https://camo.githubusercontent.com/8c4e0deb14f06d609e3234dfb3d6a77b7b6695a1470c62f80edb17466d230600/68747470733a2f2f6f70656e636f6c6c6563746976652e636f6d2f6368656572696f2f6261636b65722f31382f6176617461722e737667)](https://opencollective.com/cheerio/backer/18/website) [![](https://camo.githubusercontent.com/54e6009c997278b768c1ec85cda04cefc3c8179a212b3527d262c8798fc87b6d/68747470733a2f2f6f70656e636f6c6c6563746976652e636f6d2f6368656572696f2f6261636b65722f31392f6176617461722e737667)](https://opencollective.com/cheerio/backer/19/website) [![](https://camo.githubusercontent.com/f4e029259b1a81bba4c8556a4e5d95f6bec50a2d716920338f4d3ed06dfd2c92/68747470733a2f2f6f70656e636f6c6c6563746976652e636f6d2f6368656572696f2f6261636b65722f32302f6176617461722e737667)](https://opencollective.com/cheerio/backer/20/website) [![](https://camo.githubusercontent.com/5d77c84976b0e909bae56d09405e0e8ec6e1e7d10077b74d18b391172906f592/68747470733a2f2f6f70656e636f6c6c6563746976652e636f6d2f6368656572696f2f6261636b65722f32312f6176617461722e737667)](https://opencollective.com/cheerio/backer/21/website) [![](https://camo.githubusercontent.com/3027641bbb9e94189455cbe350526826cf2254445d7bd5bcf4b39db6d959690f/68747470733a2f2f6f70656e636f6c6c6563746976652e636f6d2f6368656572696f2f6261636b65722f32322f6176617461722e737667)](https://opencollective.com/cheerio/backer/22/website) [![](https://camo.githubusercontent.com/215854b2a618878fa09dc824a31ecf4ace566ac576093238c898bebc44266bbf/68747470733a2f2f6f70656e636f6c6c6563746976652e636f6d2f6368656572696f2f6261636b65722f32332f6176617461722e737667)](https://opencollective.com/cheerio/backer/23/website) [![](https://camo.githubusercontent.com/4089cc9c512c48bbc68cda1604dadbce7de0b4fd7bc4ebe1503b9f2f72fd94fc/68747470733a2f2f6f70656e636f6c6c6563746976652e636f6d2f6368656572696f2f6261636b65722f32342f6176617461722e737667)](https://opencollective.com/cheerio/backer/24/website) [![](https://camo.githubusercontent.com/80c8d4a5fe4ec07a10c4f6801b393d858f657197ac4880821ba93812da3b0134/68747470733a2f2f6f70656e636f6c6c6563746976652e636f6d2f6368656572696f2f6261636b65722f32352f6176617461722e737667)](https://opencollective.com/cheerio/backer/25/website) [![](https://camo.githubusercontent.com/7c51aa13c7ebf16c1aa647985a4856fa8265b88883b7d8997b2d6fa95d32f99f/68747470733a2f2f6f70656e636f6c6c6563746976652e636f6d2f6368656572696f2f6261636b65722f32362f6176617461722e737667)](https://opencollective.com/cheerio/backer/26/website) [![](https://camo.githubusercontent.com/826784d03a669f778658314f93135e07a5e19cdc042a26102cc67eace51025ff/68747470733a2f2f6f70656e636f6c6c6563746976652e636f6d2f6368656572696f2f6261636b65722f32372f6176617461722e737667)](https://opencollective.com/cheerio/backer/27/website) [![](https://camo.githubusercontent.com/66bdb58deb568e7b5d309868d1c6da186253eaef29612d697eb02e9367fb87c1/68747470733a2f2f6f70656e636f6c6c6563746976652e636f6d2f6368656572696f2f6261636b65722f32382f6176617461722e737667)](https://opencollective.com/cheerio/backer/28/website) [![](https://camo.githubusercontent.com/25e3547ca2de93243599de3ee31fa6a213a46ab9e6277d38b0abfb655437570c/68747470733a2f2f6f70656e636f6c6c6563746976652e636f6d2f6368656572696f2f6261636b65722f32392f6176617461722e737667)](https://opencollective.com/cheerio/backer/29/website)

## Special Thanks

This library stands on the shoulders of some incredible developers. A special thanks to:

**• @FB55 for node-htmlparser2 & CSSSelect:** Felix has a knack for writing speedy parsing engines. He completely re-wrote both @tautologistic's `node-htmlparser` and @harry's `node-soupselect` from the ground up, making both of them much faster and more flexible. Cheerio would not be possible without his foundational work

**• @jQuery team for jQuery:** The core API is the best of its class and despite dealing with all the browser inconsistencies the code base is extremely clean and easy to follow. Much of cheerio's implementation and documentation is from jQuery. Thanks guys.

**• @visionmedia:** The style, the structure, the open-source"-ness" of this library comes from studying TJ's style and using many of his libraries. This dude consistently pumps out high-quality libraries and has always been more than willing to help or answer questions. You rock TJ.

## License

MIT

[Source](https://www.npmjs.com/package/cheerio)
