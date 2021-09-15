# The Mega Full-Stack Web Development Resource Guide


-------

*   Why is this guide a thing?
*   About this (long) guide

Development Resources
---------------------

*   Text Editors/IDEs
*   Terminals/Shells
*   Browsers

Client-Side / Frontend Resources
--------------------------------

*   HTML
*   CSS
*   JavaScript
*   TypeScript
*   Frontend JavaScript Frameworks
*   Client-Side APIs
*   WebAssembly

Server-Side / Backend Resources
-------------------------------

*   JavaScript Runtimes
*   Python
*   Go
*   Rust
*   Databases
*   The Cloud

Miscellaneous Resources
-----------------------

*   Sources For Inspiration
*   General Education Resources
*   Great Blogs/Articles/Books
*   Stock Image Resources

Why Is This Guide A Thing?
--------------------------

I have a meticulously organized digital life.

My computer’s file system allows me to track down any photo, video, or document I’ve created during any month over the past 13 years.

My Google Drive is similarly organized to keep track of documents such as the high school resume I used to get my first job or the documents I made for every single class during my 5 years of college.

And, importantly for this post, I have a Chrome bookmark system that allowed me to stay organized and learn computer science/software engineering after a sudden change of direction in my last 2 years of college.

![](https://miro.medium.com/freeze/max/60/0*RFARH8wUpI9y6RUv.gif?q=20)

![](https://miro.medium.com/max/1600/0*RFARH8wUpI9y6RUv.gif)

Contained in these bookmark folders are links to hundreds of resources ranging from artificial intelligence to development tooling. This catalog of resources allowed me to organize my thinking as I learned new topics and to ultimately collect some incredible content that was instrumental to my learning during college.

Now, as a recent graduate, I want to pass on some of those resources that were so helpful to me. My hope is that those in their own process of learning might find something useful in all of this just as I did.

As hinted via the title above, this guide is focused on full-stack web development resources.

This is due in part to an effort to limit the scope of this guide, but also because I’m really passionate about the internet and what it has to offer — it’s quite a festive place.

In addition to simply providing an organized list of links, I’ve included high-level explanations of each topic and how it fits into the world of full-stack web dev. I’ve also included some of my own thoughts and personal recommendations (denoted by 🔥) for some of the resources.

It’s my way of highlighting those resources which have been invaluable to me and an opportunity to give some plain-English insights/information that might be helpful to those learning about these topics.

I hope you enjoy it!

![](https://miro.medium.com/max/60/0*D3L7S9FZcE1-2ndr.png?q=20)

![](https://miro.medium.com/max/3200/0*D3L7S9FZcE1-2ndr.png)

I start this guide with development tools because even with all the knowledge of full-stack development in the world you need tooling to put it to action.

For those new to the world of software tooling, it encompasses a huge variety of subtopics. Because of this, you can get lost down some pretty deep and overwhelming rabbit holes, but at it’s most basic it usually means _choosing a good text editor and terminal that is suited to the work you’ll be doing._

Text editors and IDEs (Integrated Development Environments) are desktop applications, command-line applications, or web applications where you write code — basically think Microsoft Word but specialized for writing code.

![](https://miro.medium.com/max/60/0*7ol8chUG8gaB-PRI.png?q=20)

![](https://miro.medium.com/max/3200/0*7ol8chUG8gaB-PRI.png)

There is an almost endless number of text editors and IDEs available that offer various benefits and drawbacks, so don’t be afraid to try out different options until you find something that feels comfortable.

My current favorite is the very popular Visual Studio Code made by Microsoft (which is not to be confused with Microsoft’s IDE — Visual Studio). VS Code is a flexible text editor with a huge number of settings and third-party extensions that can customize the editor’s look and functionality to fit and improve your workflow.

In addition to that, VS Code comes with some incredible built-in extensions for JavaScript and TypeScript that make it a very useful editor for web development.

*   🔥 [What Is The Difference Between An IDE And An Editor?](https://discuss.atom.io/t/what-is-the-difference-between-an-ide-and-an-editor/32629)
*   🔥 [VS Code Website](https://code.visualstudio.com/)
*   🔥 [VS Code Documentation](https://code.visualstudio.com/docs)
*   🔥 [VS Code Setup](https://welearncode.com/vscode-setup/)
*   🔥 [VS Code Top Ten Pro Tips](https://www.youtube.com/watch?v=u21W_tfPVrY&ab_channel=Fireship)
*   🔥 [Interactive Vim Tutorial](https://www.openvim.com/) –– Vim is a very powerful command-line text editor.
*   [Vim Tutorial](https://missing.csail.mit.edu/2020/editors/)
*   [Atom Website](https://atom.io/) –– Atom is another great desktop text editor made by Github.
*   [Atom Documentation](https://atom.io/docs)
*   [Code Sandbox IDE](https://codesandbox.io/) –– Code Sandbox is an online editor that is great for prototyping JavaScript-based web apps.

Text Editor Extension Resources
-------------------------------

Below are some text editor extension resources that are worth a peek.

Emmet makes the job of writing HTML a breeze by defining a succinct syntax that can be expanded into full HTML. A cheat sheet of the syntax can be found below.

Kite and TabNine are AI-powered coding assistants that provide some very impressive code autocompletion features.

*   [Emmet Cheat Sheet](https://docs.emmet.io/cheat-sheet/)
*   [Kite](https://www.kite.com/)
*   [TabNine](https://www.tabnine.com/)

Terminals, sometimes casually referred to as “command lines” or “consoles”, are desktop applications that allow you to interact with a shell.

A shell is a _text-based user interface_ that allows you to control your computer. Instead of using a mouse to click UI elements and icons, you type commands into the shell that allow you to do things like open desktop applications, run code, navigate your computer’s file system, automate tedious or repetitive tasks, and so much more.

Becoming proficient with a terminal/shell combo is a massively valuable skill in the world of not only full-stack development but of software engineering at large.

Finally, just like text editors and IDEs, there are many terminals and shells with benefits and drawbacks. So once again have fun and try different options until you find something that works for you.

My current terminal/shell combination is iTerm2 and zsh. iTerm2 is a great terminal with a rich set of features and customization options but is, unfortunately, macOS only. Zsh is the default shell for macOS.

*   🔥 [iTerm2](https://www.iterm2.com/)
*   🔥 [Hyper](https://hyper.is/) –– Hyper is another really clean cross-platform terminal created using web technologies.
*   🔥 [Mastering Zsh](https://github.com/rothgar/mastering-zsh)
*   🔥 [Ohmyzsh Website](https://ohmyz.sh/) –– Ohmyzsh is a fantastic framework for generally improving the experience of using zsh.
*   [Terminal Setup: iTerm2 + Zsh](https://dev.to/aspittel/my-terminal-setup-iterm2--zsh--30lm)
*   [Moving to Zsh](https://scriptingosx.com/2019/06/moving-to-zsh/)
*   [Switching to Zsh](http://zpalexander.com/switching-to-zsh/)
*   [Ohmyzsh GitHub](https://github.com/ohmyzsh/ohmyzsh)

![](https://miro.medium.com/max/60/0*b7Wkxw-0N-AK89vm.png?q=20)

![](https://miro.medium.com/max/3200/0*b7Wkxw-0N-AK89vm.png)

In the world of full-stack web development, the next thing to consider is browsers. These are the applications that allow you to access the internet and execute/render the frontend code (i.e. websites) you will create.

These browsers also offer tools for debugging and analyzing your website’s code. Learning how to work with these tools early on (and especially once you start learning JavaScript) is something I can’t recommend enough.

Finally, it is very important to know that the frontend code you write will not always work or look the same across different browsers (the reason for this can be better understood in the ‘How Browsers Work’ and ‘Browser Engines’ sections below). As a result, it’s highly recommended to have many of the [popular browsers](https://www.w3counter.com/globalstats.php) downloaded so you can test your website on each browser.

_Pro Tip: An amazing tool for determining whether or not your frontend code will work on a particular browser is_ [_Can I Use?_](https://caniuse.com/)_._

Understanding how to debug your code is one of the most important aspects of learning how to develop for a platform like the web. Browsers like Chrome and Firefox offer some absolutely incredible debugging and development tools. **LEARN HOW TO USE THESE TOOLS.**

*   🔥 [Chrome DevTools Guide](https://developers.google.com/web/tools/chrome-devtools/)
*   [Google LightHouse Guide](https://developers.google.com/web/tools/lighthouse/) –– Google Lighthouse is a great tool that can automatically audit the performance, accessibility, SEO, and more of your website.
*   [Firefox Developer Tools Guide](https://developer.mozilla.org/en-US/docs/Tools)
*   [Safari Web Development Tools](https://developer.apple.com/safari/tools/)
*   [Microsoft Edge Developer Tools](https://docs.microsoft.com/en-us/microsoft-edge/devtools-guide-chromium)

Understanding how browsers work under the hood will give context to the code you write and fundamentally change how you think about full-stack web development… or at least it did for me 😁.

This is an admittedly advanced topic since there is a very different skillset at play when creating a web browser versus making a website, but I still think it’s worth reviewing at some point during your full-stack education and then continuing to revisit the topic as you learn more.

*   🔥🔥🔥 [How Browsers Work Under The Hood — Aaron Gustofson Series](https://alistapart.com/article/from-url-to-interactive/)

Another really cool topic that is an even more focused look into how browsers work is learning about browser engines. This topic is not necessary to learn web development, but can once again be a nice way to gain a deeper insight into what is happening inside your browser. Also, be warned, this an advanced topic.

Browser engines, in short, are the core pieces of software built into web browsers like Chrome and Firefox that do the work of executing and rendering the website code that you write. Typically, browser engines are comprised of two primary types of engines:

*   Rendering Engines — Responsible for rendering the pixel-by-pixel layout of a website
*   JavaScript Engines — Responsible for interpreting/compiling and executing JS code (as well as WebAssembly code in some cases)

These engines are the primary reason that the frontend code you write may not work or look the same across browsers. Browsers will often use different engines that have unique implementation details which can cause differences in how a website is laid out or interpreted.

_A Quick Note: It is also common for the term “browser engine” to only refer to the part of a browser that is in charge of rendering a webpage. This is because it’s very common for JavaScript engines to be built in a way that they can function independently from a browser, whereas the rendering engine is a fundamental and baked in part of browsers. So keep that all in mind as you learn more about these engines in the wild._

*   🔥 [Browser Engines: The Crux Of Cross Browser Compatibility](https://www.lambdatest.com/blog/browser-engines-the-crux-of-cross-browser-compatibility/)
*   🔥 [Quantum Up Close: What Is A Browser Engine?](https://hacks.mozilla.org/2017/05/quantum-up-close-what-is-a-browser-engine/)
*   [Which Browser Engines Powers Your Web Browsing — And Why Does It Matter?](https://gizmodo.com/which-browser-engine-powers-your-web-browsing-and-why-d-1833935288)
*   [Understanding The Role Of Rendering Engine In Browsers](https://www.browserstack.com/guide/browser-rendering-engine)
*   [Web Browsers And Their Engines: Know Everything](https://securitygladiators.com/web-browsers-engines/)
*   [Wikipedia: Browser Engines](https://www.wikiwand.com/en/Browser_engine)

Chrome Engines
--------------

*   [V8 Website](https://v8.dev/)
*   [Blink Website](https://www.chromium.org/blink)

Firefox Engines
---------------

*   [SpiderMonkey Website](https://mozilla-spidermonkey.github.io/)
*   [MDN SpiderMonkey: The Mozilla JavaScript Runtime](https://developer.mozilla.org/en-US/docs/Mozilla/Projects/SpiderMonkey)
*   [MDN Gecko Rendering Engine](https://developer.mozilla.org/en-US/docs/Mozilla/Gecko)
*   [Servo — Parallel Browser Engine Project](https://servo.org/)
*   [Servo Design](https://github.com/servo/servo/wiki/Design)
*   [Servo Blog](https://blog.servo.org/)
*   [Servo: Today & Tomorrow](https://www.youtube.com/watch?v=UGl9VVIOo3E&feature=youtu.be&list=PL4sEzdAGvRgCYXot-o5cVKOobIXZI5iLF&ab_channel=WebEnginesHackfest)

Safari Engines
--------------

*   [WebKit Website](https://webkit.org/)

Miscellaneous Resources
-----------------------

*   [Let’s Build A Browser Engine!](https://limpet.net/mbrubeck/2014/08/08/toy-layout-engine-1.html)

![](https://miro.medium.com/max/60/0*xmFAn8wHmCSAfyGf.png?q=20)

![](https://miro.medium.com/max/3200/0*xmFAn8wHmCSAfyGf.png)

Client-side or frontend programming is the area of web development dedicated to creating everything a user of a website will see (i.e. the UI).

In its simplest form, all you need to make a website is HTML. Unfortunately, an HTML-only website will look and feel quite bland which is why CSS is also used to change the style of a website, and JavaScript is used to add more complex behavior to a website.

From that point other languages, libraries, and tools like TypeScript or React are additives that make the job of creating and maintaining websites easier.

There are many comprehensive web development guides available out there today but I’ll take a moment to call out the [Mozilla Developer Network](https://developer.mozilla.org/en-US/).

Very few resources match the quality and robustness of the Mozilla Developer Network (MDN). It is a resource that is linked to many times in this guide and is probably one of the single most helpful resources I used to grapple with many of the web development topics I’ve learned in the last two years.

It’s a website that I highly recommend you take the time to peruse and see what kind of content is available.

*   🔥🔥🔥 [MDN Learn Web Development](https://developer.mozilla.org/en-US/docs/Learn) –– MDN’s structured full-stack web development course.
*   🔥 [Dave Stearns Web Development Tutorials](https://drstearns.github.io/tutorials/) –– These amazing tutorials were used for a server-side programming course I took in college, but it also includes some incredible client-side tutorials that are worth reading as well.
*   🔥 [INFO 340 Client-Side Web Development Book](https://info340.github.io/) –– This is a fantastic client-side development book for a class I took in college. It’s written in a very human-readable way.
*   [Frontend Developer Handbook](https://frontendmasters.com/books/front-end-handbook/2019/)
*   [The Relationship Between HTML, CSS, and JavaScript Explained](https://blog.codeanalogies.com/2018/05/09/the-relationship-between-html-css-and-javascript-explained/)

![](https://miro.medium.com/max/60/0*JHpArewGSxJEvwSa.png?q=20)

![](https://miro.medium.com/max/3200/0*JHpArewGSxJEvwSa.png)

As I stated above, HTML (Hyper-Text Markup Language) is the absolute baseline for what you need to make a website. It is the place where you include the content of your website and _define the structure_ of your webpages.

An analogy that I’m fond of is that if the content (i.e. text, images, etc.) of your website is a pile of bones, then HTML is what you use to structure those bones into a skeleton (i.e. a webpage).

![](https://miro.medium.com/max/3200/0*JfAX8iLqbyl0oeFp.png)

You can use a thing called HTML tags to, for example, define a piece of text as being a paragraph or a title. Then by ordering these tags one after another you can define how all the pieces fit together.

These are some more comprehensive tutorials that cover all the major aspects of HTML. The HTML Dog resource is one that I’ve found to be particularly helpful with its simple intuitive explanations.

*   🔥 [HTML Dog — HTML Tutorial](https://htmldog.com/guides/html/)
*   [MDN — HTML Basics](https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/HTML_basics)
*   [MDN — HTML Tutorial](https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML)

Tag Reference resources can be thought of as a sort of HTML tag dictionary. It’s a place where you can browse all the different tags that are available to use inside an HTML file with included explanations and examples of how to use them. Here are a few of my favorites.

*   🔥 [HTML Reference IO](https://htmlreference.io/)
*   🔥 [HTML Dog — Tag Reference](https://htmldog.com/references/html/tags/)
*   🔥 [MDN — Tag Reference](https://developer.mozilla.org/en-US/docs/Web/HTML/Element)

HTML attributes are special words that you can use inside an HTML tag to modify or define behaviors in those tags. For example, by using the “class” attribute in a tag you can associate some CSS styles with that tag.

These references below are once again a sort of dictionary with definitions of all the attributes you can use in an HTML file.

*   [HTML Dog — Global Attributes Reference](https://htmldog.com/references/html/globalattributes/)
*   [MDN — Attributes Reference](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes)
*   [MDN — Global Attributes Reference](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes)

Character code references are another type of dictionary that defines all the possible characters you can use in an HTML document and their associated code that you type.

Say, for example, you wanted to include the division symbol on a webpage you can type “&divide;” and it will be converted into ÷.

*   🔥 [HTML Character Code Reference](https://www.toptal.com/designers/htmlarrows/arrows/)
*   [HTML Dog — Character Code Reference](https://htmldog.com/references/html/characters/)
*   [HTML Character Escape Tool](https://www.freeformatter.com/html-escape.html)

Meta tags are HTML tags that contain information about a particular webpage. These tags can define things such as the title or description of a webpage.

Notably, these meta tags can also define the information that is crucial for website SEO (search engine optimization). Below is a favorite resource of mine for automatically generating SEO related meta tags and also provides some great educational material if you scroll down below the tool.

*   🔥🔥🔥 [Meta Tag Generator](https://metatags.io/)

Website accessibility is an incredibly important topic when making websites that can cater to all users. Accessibility can take many forms — everything from blindness to having a broken arm to even having a slow internet connection. They all affect a user’s ability to access a website and its content.

Being able to design websites that accommodate the gamut of accessibility issues will not only lead to a better experience for those with disabilities but very often leads to great experiences for those without disabilities too.

*   🔥 [Introduction To Web Accessibility](https://www.w3.org/WAI/fundamentals/accessibility-intro/)
*   🔥 [MDN — Accessibility](https://developer.mozilla.org/en-US/docs/Web/Accessibility)
*   [How Browsers Interact with Screen Readers & Where ARIA Fits In](https://www.levelaccess.com/how-browsers-interact-with-screen-readers-and-where-aria-fits-in-the-mix/)
*   [The Accessibility Tree](https://developers.google.com/web/fundamentals/accessibility/semantics-builtin/the-accessibility-tree)
*   [I Used The Web For A Day Using A Screen Reader](https://www.smashingmagazine.com/2018/12/voiceover-screen-reader-web-apps/)
*   [5 Most Annoying Website Features I Face As A Blind Person Every Single Day](https://bighack.org/5-most-annoying-website-features-i-face-as-a-blind-screen-reader-user-accessibility/)

*   🔥 [A Practical Guide To SVGs On The Web](https://svgontheweb.com/)
*   [Intro To Semantic HTML](https://dev.to/kenbellows/stop-using-so-many-divs-an-intro-to-semantic-html-3i9i)
*   [MDN — Multimedia & Embedding Guides](https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding)
*   [MDN — HTML Tables Guides](https://developer.mozilla.org/en-US/docs/Learn/HTML/Tables)
*   [MDN — HTML Forms Guides](https://developer.mozilla.org/en-US/docs/Learn/Forms)
*   [A Complete Guide To Lazy Loading Images](https://imagekit.io/blog/lazy-loading-images-complete-guide/)

![](https://miro.medium.com/max/3200/0*_myGIY78dZZPdWF1.png)

After HTML, the next thing you would typically use is CSS (Cascading Style Sheets). CSS gives you the ability to add style to an HTML file (read: make your website look festive and fancy).

Following the same skeleton analogy from above, CSS would be like adding clothes to your HTML skeleton.

![](https://miro.medium.com/max/60/0*uy7Nfp2ZYcQJCQtr.png?q=20)

![](https://miro.medium.com/max/3200/0*uy7Nfp2ZYcQJCQtr.png)

CSS is incredibly powerful and lets you define everything from the color of text to complex animations. [CSS Zen Garden](http://www.csszengarden.com/) is a fantastic introductory website that shows off this power by using different CSS styles on the same HTML to create totally unique looking websites.

Once again, here are some more comprehensive tutorials for those looking for a structured walkthrough of CSS.

*   [HTML Dog — CSS Tutorial](https://htmldog.com/guides/css/)
*   [MDN — CSS Basics](https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/CSS_basics)
*   [How CSS Works](https://developer.mozilla.org/en-US/docs/Learn/CSS/First_steps/How_CSS_works)
*   [Getting To Know CSS](https://learn.shayhowe.com/html-css/getting-to-know-css/)
*   [Good And Bad CSS Practices For Beginners](https://speckyboy.com/good-bad-css-practices/)

A part of learning CSS includes learning some special vocabulary for the syntax you’re looking at. Knowing what a “property” is, or what a “selector” is, or what the difference between a “rule set” and “declaration block” is will make your process of learning CSS much easier.

*   🔥 [CSS Terms & Definitions](https://www.impressivewebs.com/css-terms-definitions/)
*   🔥 [CSS Vocab](http://apps.workflower.fi/vocabs/css/en)
*   [CSS Syntax](https://developer.mozilla.org/en-US/docs/Web/CSS/Syntax)
*   [CSS Diner](https://flukeout.github.io/)

Similar to HTML, these resources are effectively dictionaries for CSS properties.

*   🔥 [CSS Reference IO](https://cssreference.io/)
*   🔥 [MDN — CSS Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference?redirectlocale=en-US&redirectslug=CSS%2FCSS_Reference)

One of the most powerful aspects of CSS is the fact that it lets you define the layout of your website and the spacing between elements. These are a few resources that cover this topic.

*   [MDN — Intro To CSS Layout](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Introduction)
*   [CSS Layout Slidedeck](https://courses.cs.washington.edu/courses/cse154/19au/resources/assets/layout/css-layout.pdf)
*   [MDN — Box Model](https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/The_box_model)
*   [Opening The Box Model](https://learn.shayhowe.com/html-css/opening-the-box-model/)

Flexbox is, from my experience, an absolute-must-learn topic when picking up CSS. It is a much easier and more powerful way of defining the layout of elements on a webpage.

*   🔥 [CSS Flexbox In 100 Seconds](https://www.youtube.com/watch?v=K74l26pE4YA)
*   🔥 [A Complete Guide to CSS Flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox/) –– Make sure to read “Background” and “Terminology” sections of this guide.
*   🔥 [Flexbox Froggy](https://flexboxfroggy.com/)
*   [Internetting Is Hard — Flexbox Tutorial](https://www.internetingishard.com/html-and-css/flexbox/)
*   [Flexplorer](https://bennettfeely.com/flexplorer/)

Grid is another incredibly powerful way to layout elements on a webpage. As the name suggests it allows you to orient elements on a webpage in a grid.

*   🔥 [CSS Grid In 100 Seconds](https://www.youtube.com/watch?v=uuOXPWCh-6o)
*   🔥 [A Complete Guide to CSS Grid](https://css-tricks.com/snippets/css/complete-guide-grid/) –– Make sure to read all the collapsed sections at the beginning such as the “Introduction”.
*   🔥 [Grid Garden](https://codepip.com/games/grid-garden/)
*   [The Joy Of CSS Grid — Build 3 Beautifully Simple Responsive Layouts](https://www.youtube.com/watch?v=705XCEruZFs)
*   [Learn CSS Grid](https://learncssgrid.com/)

A massive concern when creating websites is the fact that it can be viewed on everything from a massive desktop screen to a tiny mobile phone.

Responsive design is the area of CSS and website design that is concerned with this issue. By using CSS Media Queries you can define how your website should look on those devices and change the styles of each element so that they look good on every screen size.

*   🔥 [Internetting Is Hard — Responsive Design Tutorial](https://www.internetingishard.com/html-and-css/responsive-design/)
*   [Responsive CSS](https://drstearns.github.io/tutorials/responsive/)
*   [MDN — Mobile Web Development](https://developer.mozilla.org/en-US/docs/Web/Guide/Mobile)
*   [Internetting Is Hard — Responsive Images](https://www.internetingishard.com/html-and-css/responsive-images/)

CSS defines some incredibly powerful (yet simple) syntax for creating animations. With this syntax, you can create everything from simple transitions to complex multistep animations.

Below are a couple of learning resources, as well as some tools and libraries that make the job of creating complex CSS animations a lot easier.

*   🔥 [CSS Animations In 100 Seconds](https://www.youtube.com/watch?v=HZHHBwzmJLk)
*   🔥 [CSS Animations For Beginners](https://thoughtbot.com/blog/css-animation-for-beginners)
*   [CSS Animations](https://drstearns.github.io/tutorials/animations/)
*   [Introduction to CSS Transitions](https://nelsonmichael.dev/introduction-to-css-transitions-ckc396nae003u5es1097h5rr1)
*   [Animista](https://animista.net/) –– A tool for generating CSS animations.
*   [Keyframes App](https://keyframes.app/) –– A tool for prototyping CSS animations.
*   [Animate.css](https://animate.style/) –– A general purpose CSS animation library.
*   [Animate On Scroll (AOS)](https://michalsnik.github.io/aos/) –– A CSS animation scroll library.
*   [Easing Functions Cheatsheet](https://easings.net/en)

As I hinted in the CSS introduction paragraphs above, the ability to define colors and also gradients is a power granted by CSS. Below are some of my favorite tools I’ve come across for helping pick color codes, color palettes, accessible colors, and gradients when creating a website.

*   🔥 [HTML Color Codes](https://htmlcolorcodes.com/)
*   🔥 [Khroma](http://khroma.co/) –– An AI-powered color generator.
*   [Accessible Colors](https://accessible-colors.com/)
*   [Coolors Color Generator](https://coolors.co/)
*   [Web Gradients](https://webgradients.com/)
*   [CSS Gradients](https://cssgradient.io/)

Defining a website font is also a power granted by CSS.

I’ll also take this opportunity to sing my praises to Google Fonts as a resource that you should absolutely try out. They have a decently sized catalog of high-quality free to use fonts that can drastically improve the look of your website.

*   🔥🔥🔥 [Google Fonts](https://fonts.google.com/)
*   🔥 [Internetting Is Hard — Web Typography](https://www.internetingishard.com/html-and-css/web-typography/)
*   [Google Font Finder](https://jmattthew.github.io/better-font-finder/better-font-finder.html)
*   [Snapfont](https://getsnapfont.com/)
*   [Dafont](https://www.dafont.com/)
*   [Font Squirrel](https://www.fontsquirrel.com/)
*   [Font Spring](https://www.fontspring.com/)

The title says it all. Below are some great resources for finding website icons and graphics. Each one is a little different in what it offers so check them all out and see which you prefer.

*   [Orion Icon Library](https://orioniconlibrary.com/)
*   [700+ CSS Icons](https://css.gg/)
*   [Heroicons](https://heroicons.com/)
*   [Font Awesome Icons](https://fontawesome.com/)
*   [Octicons](https://primer.style/octicons/)
*   [Ionicons](https://ionicons.com/)
*   [World Vector Logo](https://worldvectorlogo.com/)
*   [Awwwards Icon Sets Collection](https://www.awwwards.com/martamoskwa/collections/free-icons-sets/)
*   [Fancy Border Radius Generator](https://9elements.github.io/fancy-border-radius/)
*   [CSS Blobs](https://blobs.app/)
*   [Humaaans](https://www.humaaans.com/)
*   [unDraw](https://undraw.co/)

Preprocessors simplify the process of writing complex CSS by defining a simpler/more powerful CSS syntax you can use and then converts that to regular CSS which can be run by a browser.

*   [CSS Preprocessors Explained](https://www.freecodecamp.org/news/css-preprocessors/)
*   [Popular CSS Preprocessors With Examples](https://raygun.com/blog/css-preprocessors-examples/)
*   [Sass](https://sass-lang.com/)
*   [Less](http://lesscss.org/)

CSS Frameworks are another way to make the job of writing CSS easier. They offer predefined styles that you can use on your HTML elements and make the job of creating a website with a cohesive design a breeze.

*   [A Beginner’s Guide To CSS Frameworks](https://blog.zipboard.co/a-beginners-guide-to-css-front-end-frameworks-8045a499456b)
*   [CSS Frameworks](https://drstearns.github.io/tutorials/cssframeworks/)

*   🔥 [CSS Variables In 100 Seconds](https://www.youtube.com/watch?v=NtRmIp4eMjs)
*   🔥 [CSS Psuedo-Classes In 100 Seconds](https://www.youtube.com/watch?v=kpXKwDGtjGE)
*   🔥 [CSS Psuedo-Elements In 100 Seconds](https://www.youtube.com/watch?v=e1KpKBHJOrA)
*   [Things Nobody Ever Taught Me About CSS](https://medium.com/@devdevcharlie/things-nobody-ever-taught-me-about-css-5d16be8d5d0e)
*   [The Just In Case Mindset In CSS](https://ishadeed.com/article/the-just-in-case-mindset-css/)

![](https://miro.medium.com/max/60/0*7jYE2OXRgkt9FYvQ.png?q=20)

![](https://miro.medium.com/max/3200/0*7jYE2OXRgkt9FYvQ.png)

With JavaScript comes the power to start creating truly complex and robust websites.

In the skeleton analogy, JavaScript is what brings the skeleton to life (read: gives the webpage interactive behavior).

![](https://miro.medium.com/max/60/0*UUfaddiZpDBZujWx.png?q=20)

![](https://miro.medium.com/max/3200/0*UUfaddiZpDBZujWx.png)

You can define behaviors like what happens when you click a button. You can dynamically create, manipulate, or delete elements on a webpage based on user interaction. You can make HTTP requests to get data from a server and so much more.

Nowadays there seems to be an almost endless number of JavaScript tutorials out there. Below are my top picks.

I’ll also take a moment to say that The Modern JavaScript Tutorial has consistently stood out as an absolutely incredible resource for gaining a comprehensive understanding of JavaScript.

*   🔥🔥🔥 [The Modern JavaScript Tutorial](https://javascript.info/)
*   🔥🔥 [That Weird JavaScript Course — Fireship.io](https://www.youtube.com/watch?v=Sh6lK57Cuk4&list=PL0vfts4VzfNixzfaQWwDUg3W5TRbE7CyI)
*   🔥🔥 [MDN — JavaScript Guide](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide)
*   [MDN — JavaScript Basics](https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/JavaScript_basics)
*   [MDN — A Re-Introduction to JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript/A_re-introduction_to_JavaScript)

Below are some nice resources that cover various JavaScript basics.

*   🔥 [JavaScript Pro Tips](https://www.youtube.com/watch?v=Mus_vwhTCq0)
*   🔥 [JavaScript Loops](https://www.youtube.com/watch?v=x7Xzvm0iLCI)
*   🔥 [What Is ‘this’ In JavaScript? In 100 Seconds](https://www.youtube.com/watch?v=YOlr79NaAtQ)
*   🔥 [Beyond Console Log In 100 Seconds](https://www.youtube.com/watch?v=L8CDt1J3DAw)
*   [JavaScript Fundamentals](https://info340.github.io/javascript.html)
*   [A Gentle Explanation Of “this” In JavaScript](https://dmitripavlutin.com/gentle-explanation-of-this-in-javascript/)

Understanding the DOM (Document Object Model) is one of the most important parts of learning client-side JavaScript.

At a high-level, the DOM is a representation (specifically a tree data structure) of every element on a webpage that browsers use to keep track of page changes and rendering. The reason we care about this is that browsers expose the ability to read and manipulate the DOM using JavaScript.

This is how JavaScript has the power to dynamically create, manipulate, or delete elements on a webpage. The DOM is also the reason that single-page applications or UI libraries like React are possible.

*   [MDN — Intro To The DOM](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Client-side_web_APIs/Manipulating_documents)
*   [How To Make Changes To The DOM](https://www.digitalocean.com/community/tutorials/how-to-make-changes-to-the-dom)
*   [How To Traverse The DOM](https://www.digitalocean.com/community/tutorials/how-to-traverse-the-dom)
*   [DOM Tree Video Explanation](https://www.loom.com/share/1fb07561c8984a4f8cbf37d77f969088)

Events are another very important topic to understand when learning about client-side JavaScript.

They enable your website to have dynamic interactivity with a user. There are many events that you can set up your JavaScript to “listen” for such as a mouse click, keyboard input, or even if the user has access to the internet. When one of those events occurs you can define a piece of code that will be executed as a result.

The combination of listening for events and then executing code, as a result, enables some truly complex behavior in your websites.

*   [MDN — Intro To Events](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Events)
*   [Event-Driven Application Architecture](https://drstearns.github.io/tutorials/eventarch/)
*   [DOM Events Reference](https://developer.mozilla.org/en-US/docs/Web/Events)

JSON (JavaScript Object Notation) maintains a special importance in the world of web development because a majority of the data sent across the internet is formatted as JSON.

Most modern programming languages have methods for writing/reading (often referred to as “serializing/deserializing”) JSON which means that you can have a frontend website written in JavaScript sending data and communicating with backend server written in something like Go without any issues.

Below you will find some links for learning more about JSON and its syntax.

*   [An Introduction To JSON](https://www.digitalocean.com/community/tutorials/an-introduction-to-json)
*   [What Is JSON? An Introduction and Guide For Beginners](https://www.impressivewebs.com/what-is-json-introduction-guide-for-beginners/)

On the note of sending data and communicating with servers, AJAX (Asynchronous JavaScipt and XML) and Fetch are the way that JavaScript is able to communicate with servers by sending HTTP requests.

In particular, Fetch offers a very clean way of requesting and receiving data from a server using promises.

*   🔥 [MDN — Using Fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch)
*   [MDN — AJAX Guide](https://developer.mozilla.org/en-US/docs/Web/Guide/AJAX)

In short, promises and async/await allow JavaScript developers to do asynchronous programming. I’ll let the resources below explain the benefit of asynchronous programming in more detail, but it’s basically a way of achieving faster programs using concurrency.

As an example, a regular synchronous HTTP request will “block” your JavaScript from running other code until the results of that request are returned. However, by using promises/async/await your JavaScript can execute other code while it waits on the HTTP request to be returned. The ultimate result is that more code is run in the same amount of time when using promises and async/await.

Additionally, to be even more clear, promises are JavaScript’s way of handling asynchronous values, while async/await is a cleaner syntax for working with promises.

*   🔥 [JavaScript Promise In 100 Seconds](https://www.youtube.com/watch?v=RvYYCGs45L4)
*   🔥 [The Async Await Episode I Promised](https://www.youtube.com/watch?v=vn3tm0quoqE)
*   [MDN — Promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)
*   [Learn Async/Await By Example](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/javascript-es-2017-learn-async-await-by-example-48acc58bad65)
*   [Async JavaScript: Histories, Patterns, and Gotchas](https://codewithhugo.com/async-js/)
*   [MDN — Intro To Asynchronous JavaScript](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Introducing)
*   [MDN — Using Promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises)
*   [MDN — Concurrency Model And The Event Loop](https://developer.mozilla.org/en-US/docs/Web/JavaScript/EventLoop)

Testing your code is a ridiculously important part of maintaining healthy codebases and projects. It forces you to think critically about the edge cases of your programs and also ensures that new features/updates don’t break something you’ve previously implemented.

Testing frameworks make the job of testing your code much easier and streamlined and are well worth checking out.

Below are a few resources for diving deeper into the world of JavaScript testing frameworks, as well as some debugging resources.

*   [Best 8 JavaScript Testing Framework In 2020](https://www.lambdatest.com/blog/top-javascript-automation-testing-framework/)
*   [A Comprehensive Guide To Front End Testing](https://www.testcraft.io/front-end-testing/)
*   [Testing With Jest](https://info340.github.io/jest.html)
*   [Debugging JavaScript In Chrome DevTools](https://developers.google.com/web/tools/chrome-devtools/javascript)

Modules are simply JavaScript files/functions that can be imported into another JavaScript file/project.

*   🔥 [JavaScript Modules In 100 Seconds](https://www.youtube.com/watch?v=qgRUr-YUk1Q)
*   🔥 [ES Modules: A Cartoon Deep Dive](https://hacks.mozilla.org/2018/03/es-modules-a-cartoon-deep-dive/)
*   [MDN — JavaScript Modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules)
*   [Unbundling The JavaScript Module Bundler](https://www.youtube.com/watch?v=WGlT921ixx4)

Fun fact, “ECMAScript” is actually the official name of JavaScript. This is because the committee that defines the language specification of JavaScript is part of the European Computer Manufacturers Association (ECMA).

In 2015, the ECMA released a new specification for JavaScript that brought a ton of new features and improvements to the language. The name of this release was “ECMAScript 2015,” but since it is considered the sixth version of the language to be released it is commonly referred to as simply “ES6.”

Below are a number of resources that cover those changes and improvements.

*   🔥 [The ES6 Guide](https://flaviocopes.com/es6/)
*   🔥 [Interactive ES6 Guide](http://stack.formidable.com/es6-interactive-guide/#/)
*   🔥 [ES6 Features](https://info340.github.io/es6.html)
*   🔥 [ECMAScript6 Features](https://drstearns.github.io/tutorials/es6/)
*   [Intro To JavaScript Arrow Functions](https://flaviocopes.com/javascript-arrow-functions/)

Regular expressions (regex for short) are a way of performing complex pattern matching and are incredibly helpful for validating user input.

As an example, you can use regex to ensure that a user has written a valid email address in a sign-up form.

*   🔥 [Regular Expressions (Regex) In 100 Seconds](https://www.youtube.com/watch?v=sXQxhojSdZM)
*   🔥 [RegexOne — Interactive Regex Guide](https://regexone.com/)
*   🔥 [Rubular — Regular Expression Tester](https://rubular.com/)
*   [MDN — Regular Expressions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions)
*   [Regex Crossword](https://regexcrossword.com/)

JavaScript has become quite famous at this point for its massive ecosystem of third-party packages/libraries.

Below you will find some of my favorite libraries that I’ve come across.

*   [JavaScript Libraries](https://info340.github.io/javascript-libraries.html) –– This reading gives a nice introduction to libraries and how to use them.
*   [Lodash](https://lodash.com/) –– Lodash is an amazing utility library that makes it easier to work with arrays, numbers, objects, strings, and so on.
*   [Immutable.js](https://immutable-js.github.io/immutable-js/) –– Immutable is another utility library for immutable data structures.
*   [Blotter.js](https://blotter.js.org/) –– Blotter is a library that provides some super cool and unconventional text effects.
*   [Anime.js](https://animejs.com/) –– Anime is an incredible JavaScript animation library.
*   [Matter.js](https://brm.io/matter-js/) –– Matter is a 2D physics engine for the web.
*   [Pts.js](https://ptsjs.org/) –– Pts is a really cool visualization library.
*   [Rellax](https://dixonandmoe.com/rellax/) –– Rellax is a lightweight parallax library.
*   [Textures.js](https://riccardoscalco.it/textures/) –– Textures provides SVG patterns for data visualizations.

That’s right! You can create 3D graphics using JavaScript. It’s pretty neat.

*   [MDN — Getting Started With WebGL](https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API/Tutorial/Getting_started_with_WebGL)
*   [Awwwards WebGL Collection](https://www.awwwards.com/awwwards/collections/webgl/)
*   [Three.js](https://threejs.org/)
*   [Awwwards Three.js Collection](https://www.awwwards.com/awwwards/collections/three-js/)

*   🔥 [Whatthefuck.is](https://whatthefuck.is/) –– A series of articles written by the creator of Redux (Dan Abramov) explaining various JavaScript topics/concepts.
*   🔥 [State of JavaScript Report](https://stateofjs.com/)
*   🔥 [JavaScript Cheat Sheet](https://overapi.com/javascript)
*   🔥 [Functional Programming In JS](https://info340.github.io/functional-programming.html)
*   🔥 [Discover JavaScript Timers](https://flaviocopes.com/javascript-timers/)
*   [The Model-View-Controller (MVC) Architecture](https://drstearns.github.io/tutorials/mvc/)
*   [MDN — Strict Mode](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode)
*   [MDN — Client-Side Form Validation](https://developer.mozilla.org/en-US/docs/Learn/Forms/Form_validation)
*   [MDN — Inheritance And The Prototype Chain](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Inheritance_and_the_prototype_chain)
*   [A Crash Course In Memory Management](https://hacks.mozilla.org/2017/06/a-crash-course-in-memory-management/)
*   [MDN — Memory Management](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Memory_Management)

![](https://miro.medium.com/max/3200/0*6u5WYJ8CHkKDpUsx.png)

Moving on from JavaScript we start to enter the territory of languages, libraries, and tools that are not strictly necessary for creating frontend websites but sure do make the job of creating them easier.

One such language is TypeScript. Created by Microsoft, TypeScript is a “superset of JavaScript” meaning it’s JavaScript with extra features. Those extra features are namely a type system.

Instead of letting JavaScript determine what types of data (i.e. numbers, strings, etc.) your variables contain or your functions return, you explicitly define the data types yourself like you would in a language such as Java or C.

The benefit of doing this is that you and larger teams can catch a ton of small mistakes that could lead to runtime errors. Accidentally passed a number into a function that should accept a string? No problem, TypeScript has got your back and will let you know.

*   🔥 [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/)
*   🔥 [All You Need To Know About TypeScript](https://www.youtube.com/watch?v=eCZhz0JCVx0)
*   [TypeScript Website](https://www.typescriptlang.org/)
*   [TypeScript — The Basics](https://www.youtube.com/watch?v=ahCwqrYpIuM)
*   [The Magic Of TypeScript Decorators](https://www.youtube.com/watch?v=O6A-u_FoEX8)
*   [TypeScript Deep Dive](https://basarat.gitbook.io/typescript/)

*   [TypeScript Playground](https://www.typescriptlang.org/play)
*   [TypeScript TSConfig Reference](https://www.typescriptlang.org/tsconfig)
*   [TypeScript Tools](https://www.typescriptlang.org/tools)
*   [Understanding TypeScripts Type Notations](https://2ality.com/2018/04/type-notation-typescript.html)
*   [Helpful TypeScript Coding Guidelines](https://github.com/formium/typescript)
*   [Announcing TypeScript 4.0](https://devblogs.microsoft.com/typescript/announcing-typescript-4-0/)

![](https://miro.medium.com/max/60/0*LW8pRuuAHfKWQRqE.png?q=20)

![](https://miro.medium.com/max/3200/0*LW8pRuuAHfKWQRqE.png)

Another massive topic of frontend web development that is not strictly needed but is very often used these days is frontend JavaScript libraries and frameworks.

These libraries and frameworks make the job of creating and maintaining complex user interfaces/websites much easier.

Below are some resources focused on general frontend framework information, as well as the most popular front-end framework in 2020 — React.

*   🔥 [History of Front-End Frameworks](https://blog.logrocket.com/history-of-frontend-frameworks/)
*   🔥 [The Ultimate Guide to JavaScript Frameworks](https://jsreport.io/the-ultimate-guide-to-javascript-frameworks/)
*   [Understanding Client-Side JavaScript Frameworks](https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Client-side_JavaScript_frameworks)

*   🔥🔥🔥 [React In 100 Seconds](https://www.youtube.com/watch?v=Tn6-PIqc4UM)
*   🔥🔥🔥 [Official React Tutorial](https://reactjs.org/tutorial/tutorial.html)
*   🔥 [Introduction To React](https://info340.github.io/react.html)
*   🔥 [React How To](https://github.com/petehunt/react-howto)
*   🔥 [React ‘Aha’ Moments](https://ui.dev/react-aha-moments/)
*   [React Website](https://reactjs.org/)
*   [9 Things Every React Beginner Should Know](https://camjackson.net/post/9-things-every-reactjs-beginner-should-know)
*   [React Tutorial: An Overview and Walkthrough](https://www.taniarascia.com/getting-started-with-react/)
*   [Simple React Development In 2019](https://hackernoon.com/simple-react-development-in-2017-113bd563691f)

*   🔥 [Thinking In React Hooks](https://wattenberger.com/blog/react-hooks)
*   [A Visual Guide To State In React](https://daveceddia.com/visual-guide-to-state-in-react/)
*   [A Cartoon Guide To Flux](https://code-cartoons.com/a-cartoon-guide-to-flux-6157355ab207)
*   [A Cartoon Intro To Redux](https://code-cartoons.com/a-cartoon-intro-to-redux-3afb775501a6)

Why not combine two great technologies? Well, you can!

*   🔥🔥🔥 [TypeScript and React Guide](https://fettblog.eu/typescript-react/getting-started/)
*   🔥 [React TypeScript Cheatsheets](https://react-typescript-cheatsheet.netlify.app/)
*   [React & TypeScript Series](https://dev.to/busypeoples/notes-on-typescript-pick-exclude-and-higher-order-components-40cp)
*   [Use TypeScript To Develop React Applications](https://egghead.io/courses/use-typescript-to-develop-react-applications)

*   🔥 [React Router](https://reactrouter.com/) –– The go-to library for implementing client-side routing in React.
*   🔥 [Create React App](https://create-react-app.dev/) –– The go-to tool for creating new React applications.
*   🔥 [Framer Motion](https://www.framer.com/motion/) –– A library for implementing super clean UI animations.
*   [Next.js](https://nextjs.org/) –– A great library for server-side rendering using React.
*   [React Drag and Drop](https://react-dnd.github.io/react-dnd/about) –– A library for implementing drag and drop functionality in your React app.
*   [Formik](https://formik.org/) –– A library for creating and using forms in React.
*   [How To Use React Profiler Component To Measure Render Performance](https://medium.com/life-at-paperless/how-to-use-the-react-profiler-component-to-measure-performance-improvements-from-hooks-d43b7092d7a8)
*   [WTF Is JSX?](https://jasonformat.com/wtf-is-jsx/)
*   [Build Your Own React](https://pomb.us/build-your-own-react/)
*   [Build A Frontend Framework From Scratch To Understand How It Works](https://mfrachet.github.io/create-frontend-framework/)

![](https://miro.medium.com/max/60/0*ZX76USofIhoPzFe7.png?q=20)

![](https://miro.medium.com/max/3200/0*ZX76USofIhoPzFe7.png)

Application Programming Interfaces (APIs) are the way that different pieces of software are able to interact with each other.

As the “What Is An API?” article below describes, an API is like a menu at a restaurant. When thinking of APIs from a client-side perspective you are the customer who is ordering food, while comparatively, when thinking of APIs from a server-side perspective you are the restaurant making/delivering the food.

As a client/customer, you don’t have to worry about how the food is sourced or made. You simply just have to know the phone number of the restaurant, order a dish that’s on the menu, and it will be delivered to you.

Translated to the world of programming, it means you can request (read: order) data or resources such as [pictures of dogs](https://dog.ceo/dog-api/) or [horrible dad jokes](https://icanhazdadjoke.com/api) from an API (read: menu) that lives on a server (read: restaurant) somewhere on the internet — it could even be your own server. When that data is delivered to your website you can then use it however you please.

One final note is that client-side APIs can take three primary forms in web development: 1) Your Own API, 2) Third-Party APIs, and 3) Browser APIs.

*   🔥🔥🔥 [What Is An API? — A Simple, Non-Technical Explanation](https://www.leverege.com/blogpost/what-is-an-api)
*   [MDN — Client-Side Web APIs](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Client-side_web_APIs)

Creating your own APIs is essentially what server-side development is/can be boiled down to. Thus resources and discussion on the topic can be found in the sections below.

Third-Party APIs are APIs created by someone else (usually a company). The relationship to those APIs is exactly as described above where you are the customer ordering data or resources that will be delivered to your website.

*   [MDN — Third-Party APIs](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Client-side_web_APIs/Third_party_APIs)
*   [API List](https://apilist.fun/) –– A public list of free third-party APIs
*   [API Marketplace](https://rapidapi.com/) –– Another public list of free third-party APIs

Browser APIs are a little bit different (and a little bit cooler in my opinion). The same customer-restaurant relationship can be used, but the restaurant location has changed. Rather than being located at some far-away server, the restaurant is the web browser itself (i.e. Chrome or Firefox).

This new type of restaurant also serves slightly different and slightly cooler menu items. There are browser APIs for using [Bluetooth](https://developer.mozilla.org/en-US/docs/Web/API/Web_Bluetooth_API), checking [ambient light levels](https://developer.mozilla.org/en-US/docs/Web/API/Ambient_Light_Events), connecting [game controllers](https://developer.mozilla.org/en-US/docs/Web/API/Gamepad_API), [capturing photos or videos](https://developer.mozilla.org/en-US/docs/Web/API/MediaStream_Image_Capture_API), and many more options.

*   🔥 [10 Lesser-Known Web APIs You May Want To Use](https://blog.greenroots.info/10-lesser-known-web-apis-you-may-want-to-use-ckejv75cr012y70s158n85yhn)
*   [MDN — Introduction To Web APIs](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Client-side_web_APIs/Introduction)
*   [MDN — Guide To Web APIs](https://developer.mozilla.org/en-US/docs/Web/Guide/API)
*   [MDN — Web API Reference](https://developer.mozilla.org/en-US/docs/Web/Reference/API)
*   [Chrome APIs List](https://developer.chrome.com/apps/api_index)
*   [Chrome Web APIs](https://developer.chrome.com/apps/api_other)

![](https://miro.medium.com/max/60/0*riUXmhv9Ex7S4W0p.png?q=20)

![](https://miro.medium.com/max/3200/0*riUXmhv9Ex7S4W0p.png)

At the absolute cutting edge of frontend web technologies is one of my favorite topics to get lost in during the last year or so — WebAssembly.

WebAssembly is a low-level binary format/assembly-like language that runs in the browser — in fact as of December 2019 it is [the 4th official language of the web](https://www.w3.org/2019/12/pressrelease-wasm-rec.html.en).

By writing programs in languages like C/C++, Rust, Go, and [others](https://webassembly.org/getting-started/developers-guide/) that can compile to WebAssembly the internet could eventually be capable of running photo/video editing software, AAA video games, and [much more](https://webassembly.org/docs/use-cases/) right inside a browser.

_Note: Even though WebAssembly is the 4th official language of the web it is not supposed to be a language that will replace JavaScript but will rather work alongside it._

Read a Cartoon Intro To WebAssembly. Just read it.

*   🔥🔥🔥 [A Cartoon Intro To WebAssembly \[Article Series\]](https://hacks.mozilla.org/2017/02/a-cartoon-intro-to-webassembly/)
*   🔥 [A Cartoon Intro To WebAssembly \[YouTube\]](https://www.youtube.com/watch?v=HktWin_LPf4)
*   🔥 [MDN Guide To WebAssembly](https://developer.mozilla.org/en-US/docs/WebAssembly)
*   [WebAssembly Website](https://webassembly.org/)
*   [WebAssembly GitHub](https://github.com/WebAssembly)
*   [Flavio Copes: An Introduction To WebAssembly](https://flaviocopes.com/webassembly/)
*   [Introduction To WebAssembly](https://rsms.me/wasm-intro) –– This introduction to WebAssembly is more technical than the others.
*   [Google Codelabs: An Introduction To WebAssembly](https://codelabs.developers.google.com/codelabs/web-assembly-intro/index.html)

Since WebAssembly is still in its infancy, the use cases for when to use it are actively being explored. Watching and reading about what other companies are doing with WebAssembly can be a great way to start envisioning what’s possible.

*   🔥 [How AutoCAD Used WebAssembly](https://www.youtube.com/watch?v=BnYq7JapeDA)
*   🔥 [WebAssembly Cut Figma’s Load Time By 3X](https://www.figma.com/blog/webassembly-cut-figmas-load-time-by-3x/)

These are all fantastic articles and videos that explore the various facets and histories of WebAssembly.

*   🔥 [WebAssembly’s Post-MVP Future: A Cartoon Skill Tree](https://hacks.mozilla.org/2018/10/webassemblys-post-mvp-future/)
*   🔥 [WebAssembly: A Game Changer For The Web](https://www.youtube.com/watch?v=MaJCfdmr9Wg)
*   [The History Of WebAssembly](https://www.youtube.com/watch?v=6r0NKEQqkz0)
*   [WebAssembly: Disrupting JavaScript](https://www.youtube.com/watch?v=7mBf3Gig9io)
*   [Baby’s First WebAssembly Module](https://hacks.mozilla.org/2018/06/babys-first-rustwebassembly-module-say-hi-to-jsconf-eu/)
*   [Creating A WebAssmebly Module Instance In JavaScript](https://hacks.mozilla.org/2017/07/creating-a-webassembly-module-instance-with-javascript/)
*   [Memory In WebAssembly (And Why It’s Safer Than You Think)](https://hacks.mozilla.org/2017/07/memory-in-webassembly-and-why-its-safer-than-you-think/)
*   [Calls Between JS and WASM Are Finally Fast](https://hacks.mozilla.org/2018/10/calls-between-javascript-and-webassembly-are-finally-fast-%F0%9F%8E%89/)
*   [Making WebAssembly Even Faster](https://hacks.mozilla.org/2018/01/making-webassembly-even-faster-firefoxs-new-streaming-and-tiering-compiler/)

During the last few years, Rust has positioned itself to be one of the primary languages to use for developing WebAssembly modules.

Some incredible tools and libraries have been created to support the Rust/WebAssembly ecosystem. There is even a WebAssembly working group that is actively working to make Rust’s support of WebAssembly even better.

As a final note, a great place to start is the Rust and WebAssembly book that covers all the major aspects of Rust/WebAssembly development.

*   🔥 [Rust and WebAssembly Book](https://rustwasm.github.io/docs/book/)
*   🔥 [Rust and WebAssembly Website](https://rustwasm.github.io/)
*   🔥 [Making WebAssembly Better For Rust & For All Languages](https://hacks.mozilla.org/2018/03/making-webassembly-better-for-rust-for-all-languages/)
*   🔥 [JavaScript to Rust and Back Again: A wasm-bindgen Tale](https://hacks.mozilla.org/2018/04/javascript-to-rust-and-back-again-a-wasm-bindgen-tale/)
*   [The wasm-bindgen Guide](https://rustwasm.github.io/docs/wasm-bindgen/)
*   [The wasm-pack Book](https://rustwasm.github.io/docs/wasm-pack/)
*   [wasm-pack Website](https://rustwasm.github.io/wasm-pack/)
*   [wasm-pack GitHub](https://github.com/rustwasm/wasm-pack)
*   [Web-sys Crate Announcement](https://rustwasm.github.io/2018/09/26/announcing-web-sys.html)

For those who don’t want to go off and learn Rust, you can still take advantage of WebAssembly by using TypeScript! Kind of.

AssemblyScript is a strict variant of TypeScript that can be used to write WebAssembly modules. It means you can use your knowledge of JavaScript to gain some of the powers of WebAssembly.

And just like Rust, there is a great guide/documentation that covers how to get up and running.

*   🔥 [AssemblyScript Documentation](https://www.assemblyscript.org/introduction.html)
*   [AssemblyScript Website](https://www.assemblyscript.org/)
*   [AssemblyScript GitHub](https://github.com/AssemblyScript/assemblyscript)

Even though WebAssembly is predominantly discussed in the context of the web it does not mean it is restricted to it. In the same way that JavaScript was able to move off the web with JavaScript runtimes like Node.js and Deno, so to can WebAssembly.

Currently, there is active and evolving development on two primary WebAssembly runtimes called Wasmtime and Wasmer.

*   [Wasmtime Website](https://wasmtime.dev/)
*   [Wasmtime Guide](https://bytecodealliance.github.io/wasmtime/introduction.html)
*   [Wasmtime GitHub](https://github.com/bytecodealliance/wasmtime)
*   [Wasmtime Demos](https://github.com/bytecodealliance/wasmtime-demos)
*   [Wasmer Website](https://wasmer.io/)
*   [WebAssembly.sh](https://webassembly.sh/)
*   [Debugging WebAssembly Outside The Browser](https://hacks.mozilla.org/2019/09/debugging-webassembly-outside-of-the-browser/)

Taken from WASI’s introductory document, it is:

_“An API designed by the Wasmtime project that provides access to several operating-system-like features, including files and filesystems, Berkeley sockets, clocks, and random numbers.”_

The goal is for this API to be standardized and designed to work independently of browsers and JavaScript.

*   🔥 [WASI Intro Document](https://github.com/bytecodealliance/wasmtime/blob/main/docs/WASI-intro.md)
*   🔥 [WASI Website](https://wasi.dev/)
*   🔥 [WebAssembly Interface Types](https://hacks.mozilla.org/2019/08/webassembly-interface-types/)
*   [Standardizing WASI](https://hacks.mozilla.org/2019/03/standardizing-wasi-a-webassembly-system-interface/)
*   [WASI Background](https://github.com/bytecodealliance/wasmtime/blob/main/docs/WASI-background.md)
*   [WASI Document Guide](https://github.com/bytecodealliance/wasmtime/blob/main/docs/WASI-documents.md)

*   🔥 [Awesome WASM GitHub](https://github.com/mbasso/awesome-wasm)
*   🔥 [WebAssembly Studio](https://webassembly.studio/)
*   🔥 [Build Your Own WebAssembly Compiler In TypeScript](https://blog.scottlogic.com/2019/05/17/webassembly-compiler.html)
*   🔥 [Announcing The Bytecode Alliance](https://hacks.mozilla.org/2019/11/announcing-the-bytecode-alliance/)
*   [Bytecode Alliance Website](https://bytecodealliance.org/)
*   [Bytecode Alliance GitHub](https://github.com/bytecodealliance)
*   [WebAssembly Debugging In Chrome DevTools](https://developers.google.com/web/updates/2019/12/webassembly)
*   [WebAssembly Specification](https://webassembly.github.io/spec/core/index.html)
*   [W3C WebAssembly Community](https://www.w3.org/community/webassembly/)
*   [W3C WebAssembly Working Group](https://www.w3.org/wasm/)
*   [W3C WebAssembly Core Spec](https://www.w3.org/TR/wasm-core-1/)
*   [W3C WebAssembly JavaScript Interface](https://webassembly.github.io/spec/js-api/index.html)

![](https://miro.medium.com/max/60/0*T96H_e_Ew13CjzST.png?q=20)

![](https://miro.medium.com/max/3200/0*T96H_e_Ew13CjzST.png)

_In a sense, server-side programming could be described as the job of designing and implementing APIs._

As stated earlier, Application Programming Interfaces ([APIs](https://www.youtube.com/watch?v=JjXBrJfp5TE)) are the way that different pieces of software are able to interact with each other.

Continuing the earlier customer-restaurant analogy, as a restaurant you are exclusively preoccupied with taking customer orders, sourcing and making food, and delivering it back to the customer. Another really important component of this job is designing a menu (read: API) that is clear and best serves the customer.

Translated to the world of programming, it means at its core server-side programming is comprised of:

*   Accepting HTTP requests (read: accept orders)
*   Processing the requests and finding/creating the data or resources that were requested (read: make the food)
*   Sending the data/resources back to the client (read: deliver the order)

With all this being said, this analogy breaks down in a couple of ways because for starters a client does not always ask for data/resources to be returned to them. Rather, they might also make a request to add, update, or delete data stored on the server-side (such as adding a profile picture, updating a credit card number, or deleting a user account).

In addition to that, the model I’ve described above (that of getting, adding, updating, and deleting data/resources) is based on a form of internet communication called HTTP (more details below). HTTP is the predominant method of communication on the internet but it does not mean it’s the only one.

These are some great resources to get a better understanding of what server-side programming is and what it entails.

*   🔥🔥🔥 [Dave Stearns Server-Side Web Development Tutorials](https://drstearns.github.io/tutorials/)
*   🔥 [MDN — What Is A Web Server](https://developer.mozilla.org/en-US/docs/Learn/Common_questions/What_is_a_web_server)
*   🔥 [MDN — Introduction To The Serverside](https://developer.mozilla.org/en-US/docs/Learn/Server-side/First_steps/Introduction)
*   🔥 [MDN — Client-Server Overview](https://developer.mozilla.org/en-US/docs/Learn/Server-side/First_steps/Client-Server_overview)

![](https://miro.medium.com/max/60/0*wxI0WgS9FDW8zztF.png?q=20)

![](https://miro.medium.com/max/3200/0*wxI0WgS9FDW8zztF.png)

Thus far when describing how APIs work we’ve focused on how the API is a menu that one piece of software can use to determine what another piece of software offers/provides.

What we haven’t focused on is how these two pieces of software communicate with each other. To reference the analogy from client-side APIs, I said the frontend would use a phone number to call/message the restaurant to tell them its order. But this does not mean that calling/messaging is the only way to communicate with the restaurant — the same holds true for the internet.

The defacto way of communicating on the internet is HTTP/HTTPS (Hyper-Text Transfer Protocol \[Secure\]). Understanding this communication protocol and how to work with it is crucial for server-side development. In particular, learning about the meaning of HTTP functions like GET, POST, PUT, and DELETE will be very helpful as you dive into learning and using server-side languages/frameworks.

For the majority of web development use cases, you only need to worry about HTTP, but as you continue your backend journey you’ll discover other communication protocols like WebSockets, MQTT, SMTP, XMPP, and more.

*   🔥🔥🔥 [The Hyper-Text Transfer Protocol](https://drstearns.github.io/tutorials/http/)
*   🔥🔥 [MDN — HTTP](https://developer.mozilla.org/en-US/docs/Web/HTTP)
*   🔥 [Communicating Securely With HTTPS](https://drstearns.github.io/tutorials/https/)
*   🔥 [Real-Time Messaging Concepts/Protocols](https://www.ably.io/concepts)
*   [MDN — WebSockets APIs](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API)

Testing and debugging your APIs is a critical part of the server-side development process and lucky for you (and I) there are some great tools created for doing just that.

*   🔥 [Hoppscotch](https://hoppscotch.io/)
*   🔥 [Postman](https://www.postman.com/)
*   [Insomnia](https://insomnia.rest/)

As I stated earlier the design of an API (read: menu) is also a critically important job as it can help the client (read: customer) be confident that they are requesting the correct data/resources/actions.

The predominant way of designing APIs in 2020 is to follow the REST pattern and is well worth learning.

*   🔥 [Designing APIs According To A RESTful Pattern](https://drstearns.github.io/tutorials/rest/)
*   [REST API Documentation Best Practices](https://bocoup.com/blog/documenting-your-api)
*   [REST API Tutorial](https://www.restapitutorial.com/)
*   [API Design Cheat Sheet](https://github.com/RestCheatSheet/api-cheat-sheet)
*   [The Original REST Paper](https://www.ics.uci.edu/~fielding/pubs/dissertation/rest_arch_style.htm)

As the size and complexity of your server-side applications grow (as well as how many users your application has), how you organize or architect the various components will become a greater and greater concern.

In 2020, a hugely popular architecture is that of microservices. The idea of microservices is to break up your server-side application into small connected logical units using technologies like Docker (resources can be found in the Cloud section) so that your application is easier to maintain and can scale to many more users.

*   🔥🔥 [Introduction to Microservices Series](https://www.nginx.com/blog/introduction-to-microservices/)
*   [Another Microservices Series](https://martinfowler.com/articles/microservices.html)
*   [Microservice Cheat Sheet](https://github.com/RestCheatSheet/microservices-cheat-sheet)
*   [Platform-Building Cheat Sheet](https://github.com/RestCheatSheet/platform-cheat-sheet)
*   [Web Architecture 101](https://engineering.videoblocks.com/web-architecture-101-a3224e126947)

*   [MDN — Server-side Website Programming](https://developer.mozilla.org/en-US/docs/Learn/Server-side)
*   [MDN — Guide To Server-Side Frameworks](https://developer.mozilla.org/en-US/docs/Learn/Server-side/First_steps/Web_frameworks)
*   [Cross-Origin Resource Sharing Tutorial](https://drstearns.github.io/tutorials/cors/)
*   [What Is CORS?](https://www.codecademy.com/articles/what-is-cors)
*   [Environment Variables](https://drstearns.github.io/tutorials/env/)
*   [Tracking Sessions](https://drstearns.github.io/tutorials/sessions/)
*   [Authenticating Users](https://drstearns.github.io/tutorials/authentication/)

The next couple of sections will be dedicated to a handful of programming languages you can use on the server-side. Over time you will discover the same high-level ideas, goals, and strategies of server-side programming are generally used no matter what language and server-side framework you choose.

As a result, picking a server-side language just comes down to a matter of the language/framework itself and what kinds of benefits and drawbacks they offer.

Starting off with what I think is a natural transition from frontend to backend programming is using JavaScript on the server!

From its origins as a scripting language for Netscape Navigator (a very old web browser), JavaScript could only be interpreted and run in a browser.

However, when creating server-side programs you need code that can run on a computer (a server is essentially just a specialized computer for handling network requests). Lucky for you, there are pieces of software called JavaScript runtimes to do just that.

These runtimes allow you to run JavaScript on a computer like a regular Java or Python program, while also giving extra functionality such as accessing a computer’s file system and responding to network requests — creating the foundation for writing JavaScript that runs on a server.

The most famous and widely used JavaScript runtime is Node.js. However, a new runtime called Deno (created by the same person who invented Node.js) is also starting to pick up steam and capture attention.

![](https://miro.medium.com/max/3200/0*3D_d0tGI-ycAFtC1.png)

As stated above, Node.js (also sometimes referred to as “Node”) is easily the most famous and widely used JavaScript runtime for executing JS code outside a browser.

These are some great resources to get oriented with Node.js and dive deeper into its core topics. The Introduction to Node.js tutorials are one of the primary sources I used to learn Node and are well worth a read.

*   🔥🔥🔥 [Introduction to Node.js](https://nodejs.dev/learn)
*   🔥🔥 [Node.js Ultimate Beginner’s Guide In 7 Easy Steps](https://www.youtube.com/watch?v=ENrzD9HAZK4)
*   🔥 [Nodejs.dev Website](https://nodejs.dev/)
*   [Nodejs.org Website](https://nodejs.org/en/)
*   [Node Documentation](https://nodejs.org/dist/latest-v14.x/docs/api/)
*   [The Definitive Node.js Handbook](https://www.freecodecamp.org/news/the-definitive-node-js-handbook-6912378afc6e/?source=linkShare-53f0cd20ca9c-1537896927)
*   [Node.js Tutorial](https://www.tutorialspoint.com/nodejs/index.htm)
*   [Why The Hell Would I Use Node.js? A Case By Case Tutorial](https://www.toptal.com/nodejs/why-the-hell-would-i-use-node-js)

Setting up a Node.js development environment is actually fairly straightforward since all the primary tools you need (i.e. the Node.js runtime and the Node Package Manager) are both downloaded when you install Node.

The only other useful piece of a Node developer environment would be to use an IDE or a text editor extension for working with Node. My recommendation is to use VS Code as it already comes with an incredible JavaScript / TypeScript / Node extension built-in.

*   [Setup Node.js Development Environment](https://www.tutorialsteacher.com/nodejs/setup-nodejs-development-environment)
*   [Setting Up A Node.js Development Environment](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/development_environment)
*   [Node.js Development Environment Setup](https://cloud.google.com/nodejs/docs/setup)

A huge benefit to using Node.js is its [insanely large](https://snyk.io/blog/npm-passes-the-1-millionth-package-milestone-what-can-we-learn/) ecosystem of third-party packages you can use (i.e. pieces of Node software written by someone else that you can use in your own Node projects).

A piece of software called the Node Package Manager (NPM) is installed when you install the Node.js runtime and is the mechanism for including and tracking the packages your Node projects use.

_Note: Another popular Node.js package management tool that you’ll often see is called Yarn._

*   [Beginner’s Guide To NPM](https://www.sitepoint.com/npm-node-package-manager/)
*   [NPM Website](https://www.npmjs.com/)
*   [NPM Trends](https://www.npmtrends.com/)
*   [Tiny-Package-Manager: Learn How NPM Or Yarn Works](https://github.com/g-plane/tiny-package-manager)

Just as you can use frameworks in client-side development to make the job of creating websites easier, so to can you use server-side frameworks to make the job of creating server-side applications easier.

There are many Node.js frameworks to choose from, but easily one of the most well known and well-used frameworks is Express.

*   🔥 [Introduction To Express](https://flaviocopes.com/express/)
*   [Express Website](https://expressjs.com/)
*   [MDN — Express / Node Guide](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs)
*   [Using Express Middleware](https://expressjs.com/en/guide/using-middleware.html)

*   [Node.js Microservices](https://drstearns.github.io/tutorials/nodeweb/)
*   [Debugging Node.js Programs](https://nodejs.org/en/docs/guides/debugging-getting-started/)
*   [Let’s Code A Web Server From Scratch With Node.js Streams](https://www.codementor.io/@ziad-saab/let-s-code-a-web-server-from-scratch-with-nodejs-streams-h4uc9utji)
*   [Building A Simple Single Sign On (SSO) Server From Scratch](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/building-a-simple-single-sign-on-sso-server-and-solution-from-scratch-in-node-js-ea6ee5fdf340)
*   [Let’s Build Express](https://github.com/antsmartian/lets-build-express)

![](https://miro.medium.com/max/3200/0*pcU_DXBHyqJze7Nt.png)

Deno is a new JavaScript runtime, created by the same person who made Node (Ryan Dahl). The runtime builds on the learning/takeaways Ryan had from building Node and as a result, includes some pretty great features when compared to Node.

Some of these features include:

*   Deno has much better security built into it
*   It supports both JavaScript and TypeScript
*   It has a pretty incredible set of built-in tools inspired by the Go language
*   It has a high-quality audited standard library also inspired by the Go language

As a final note, don’t worry about needing to learn Deno right now in 2020. Node is not going anywhere and will likely remain the dominant JavaScript runtime for many years to come. I’d rather suggest casual exploration when approaching Deno — it has some seriously cool features that can be fun to play around with. Plus, if/when it reaches industry dominance you’ll already be slightly ahead of everyone else 😉.

When diving into Deno I highly recommend watching Ryan Dahl’s talk on the 10 things he regrets about Node.js. It gives some great insight and context for the goals and design choices of Deno.

Beyond that, the Deno Manual is a wonderfully written resource for getting started with Deno.

*   🔥🔥🔥 [The Deno Manual](https://deno.land/manual)
*   🔥🔥 [10 Things I Regret About Node.js — Ryan Dahl Talk](https://www.youtube.com/watch?v=M3BM9TB-8yA)
*   🔥🔥 [Deno In 100 Seconds](https://www.youtube.com/watch?v=F0G9lZ7gecE)
*   🔥🔥 [Deno Website](https://deno.land/)
*   🔥 [Deno 1.0: What You Need To Know](https://blog.logrocket.com/deno-1-0-what-you-need-to-know/)
*   [Write A Small API Using Deno](https://dev.to/kryz/write-a-small-api-using-deno-1cl0)

This is the official setup guide found in the Deno Manual. It covers all the bases in a well written and clear way. It’s all you should need.

*   🔥 [Set Up Your Deno Environment](https://deno.land/manual/getting_started/setup_your_environment)

Deno takes a very different approach to package management compared to Node. Rather than using NPM to install and track dependencies, you import URLs pointing to the third-party modules you want to use right within any given JavaScript/TypeScript file you’re creating. When your code is executed, the modules located at the given URLs will be automatically fetched and installed.

_Note: These modules are only downloaded and installed the first time your code is run. After that, the modules are cached (read: saved locally on your computer) so that the code can be re-executed many times without the worry of having to fetch and install the modules every single time — which could take forever on slow networks._

Modules can be hosted anywhere on the web such as GitHub, a personal web server, or a CDN (content distribution network). Below are some links to Deno’s own third-party module hosting service and other popular CDNs where Deno modules can be found.

As an additional aside, this way of approaching package management is once again a design decision inspired by the Go language and is, in my opinion, a very welcome and super clean solution.

*   [Deno.land/x](https://deno.land/x)
*   [Skypack](https://www.skypack.dev/)
*   [JSPM](https://jspm.org/)

Since Deno is such a new runtime the landscape of popular frameworks and libraries is still evolving. Oak seems to be gathering some popularity since it takes a lot of design inspiration from Express and could be worth checking out.

That being said, I also left a link to the “Modules” section of the Awesome Deno GitHub where you can find links to other web frameworks as well.

*   [Oak Website](https://oakserver.github.io/oak/)
*   [Oak GitHub](https://github.com/oakserver/oak)
*   [Other Web Frameworks](https://github.com/denolib/awesome-deno#modules)

*   [Awesome Deno](https://github.com/denolib/awesome-deno)
*   [Deno GitHub](https://github.com/denoland/deno)
*   [Deno News](https://deno.land/posts)
*   [Deno Standard Library](https://deno.land/std@0.66.0)
*   [Deno Runtime API](https://doc.deno.land/builtin/stable)
*   [Deno Doc](https://doc.deno.land/)
*   [Deno Style Guide](https://github.com/denoland/deno/blob/master/docs/contributing/style_guide.md)
*   [Denon GitHub](https://github.com/denosaurs/denon) –– This is analogous to Node’s nodemon package.

![](https://miro.medium.com/max/3200/0*pbYBmDdZA4xGJm4i.png)

For those who are not as familiar with Python, it is a very high-level general-purpose programming language.

A huge goal of Python is readability and results in a language that can accomplish a lot with very little code.

Like Node, Python also has a massive ecosystem of third-party modules. When combined with the fact that Python is a general-purpose language it means that you can write high-quality code for many areas of computer science such as data science, machine learning, scientific computing, IoT, and (importantly for this guide) web development.

The official Python tutorial was my primary method of learning the syntax and ideas behind Python and is worth reading through (even if casually).

Beyond that, I’ve included some other great resources I’ve used to pick up bits and pieces of Python info.

*   🔥 [The Official Python Tutorial](https://docs.python.org/3/tutorial/index.html)
*   [Python Wiki Beginner’s Guide](https://wiki.python.org/moin/BeginnersGuide/Programmers)
*   [Advanced Python Made Easy](https://medium.com/quick-code/advanced-python-made-easy-eece317334fa)
*   [The Hitchhiker’s Guide To Python](https://docs.python-guide.org/)
*   [Full Stack Python](https://www.fullstackpython.com/flask.html)

One of the downsides of Python, in my opinion, is that setting up a development environment is not as trivial as one might hope. There are a lot of ways that a development environment can be set up and truth be told I’m not even completely confident in the one I have — it’s still a work in progress.

That being said the resources below are some of the most helpful ones I’ve come across for learning about the various ways that one can approach a Python development environment for web development.

*   🔥 [Python Development Environment, 2020 Edition](https://jacobian.org/2019/nov/11/python-environment-2020/#atom-entries)
*   🔥 [Definitive Guide To Python On MacOS](https://medium.com/@briantorresgil/definitive-guide-to-python-on-mac-osx-65acd8d969d0)
*   🔥 [Getting Started With Python In VS Code](https://code.visualstudio.com/docs/python/python-tutorial)
*   [How To Install Python 3 and Set Up a Local Programming Environment On MacOS](https://www.digitalocean.com/community/tutorials/how-to-install-python-3-and-set-up-a-local-programming-environment-on-macos)
*   [Python Virtual Environments: A Primer](https://realpython.com/python-virtual-environments-a-primer/)
*   [Comparing Python Virtual Environment Tools](https://towardsdatascience.com/comparing-python-virtual-environment-tools-9a6543643a44)
*   [Goodbye Virtual Environments?](https://medium.com/@grassfedcode/goodbye-virtual-environments-b9f8115bc2b6)
*   [Auto Formatters For Python](https://www.kevinpeters.net/auto-formatters-for-python)
*   [Black Formatter](https://github.com/psf/black)

Another big downside of Python is its disjointed package management ecosystem. There are a lot of tools trying to solve the same problem with no community consensus on what is best.

The result, at least for me, has been a lot of reading, testing, and general uncertainty about what fits my workflow the best. My current favorite is called Poetry and is very similar to NPM.

*   🔥🔥 [Poetry Website](https://python-poetry.org/)
*   🔥🔥 [Python Projects With Poetry Series](https://www.pythoncheatsheet.org/blog/python-projects-with-poetry-and-vscode-part-1/)
*   [Create and Publish a Python Package With Poetry](https://johnfraney.ca/posts/2019/05/28/create-publish-python-package-poetry/)
*   [Develop and Publish Your Python Package With Poetry](https://codingdose.info/2019/06/16/develop-and-publish-with-poetry/)
*   [Python’s New Package Landscape](http://andrewsforge.com/article/python-new-package-landscape/)
*   [Python Application Dependency Management in 2018](https://hynek.me/articles/python-app-deps-2018/)
*   [Pipenv and Poetry: Benchmarks and Ergonomics](https://johnfraney.ca/posts/2019/03/06/pipenv-poetry-benchmarks-ergonomics/)
*   [Pipenv and Poetry: Benchmarks and Ergonomics II](https://johnfraney.ca/posts/2019/11/19/pipenv-poetry-benchmarks-ergonomics-2/)
*   [Packaging a Python Library](https://blog.ionelmc.ro/2014/05/25/python-packaging/)
*   [Why You Should Use pyenv + Pipenv For Your Python Projects](https://medium.com/hackernoon/reaching-python-development-nirvana-bb5692adf30c)
*   [Faster Docker Builds With Pipenv, Poetry, or pip-tools](https://pythonspeed.com/articles/pipenv-docker/)
*   [Python3 Virtualenv Setup](https://gist.github.com/pandafulmanda/730a9355e088a9970b18275cb9eadef3)
*   [Virtualenv Documentation](https://virtualenv.pypa.io/en/stable/)

From my knowledge and experience, the two big web frameworks for Python are Flask and Django. Flask is a more lightweight framework that gives you the flexibility to implement whatever you might need but at the cost of writing more code.

Comparatively, Django is a heavier framework that gives you a lot of prebuilt software for things such as user authentication. This means you can write less code but at the cost of less flexibility if you need to create something non-traditional or more customized to your needs.

I’ve only worked with Flask at this point, so those are the resources that will be linked below.

*   [Flask Website](https://flask.palletsprojects.com/en/1.1.x/)
*   [Flask For Dummies](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/flask-for-dummies-a-beginners-guide-to-flask-part-uno-53aec6afc5b1)
*   [The Flask Mega Tutorial](https://blog.miguelgrinberg.com/post/the-flask-mega-tutorial-part-i-hello-world)
*   [Flask REST API Series](https://dev.to/dbanty/flask-rest-api-introduction-la4)
*   [How A Flask App Works](https://pythonhow.com/how-a-flask-app-works/)

*   🔥🔥🔥 [Real Python Tutorials](https://realpython.com/)
*   🔥🔥🔥 [Python Cheat Sheet](https://www.pythoncheatsheet.org/)
*   🔥 [Math To Code](https://mathtocode.com/) –– An interactive NumPy tutorial
*   [LearnPython.org](https://www.learnpython.org/)
*   [What’s \_\_init\_\_ For Me?](https://towardsdatascience.com/whats-init-for-me-d70a312da583)
*   [What’s In Python’s \_\_name\_\_?](https://medium.com/free-code-camp/whats-in-a-python-s-name-506262fe61e8)
*   [Python: Beyond The Basics II](https://medium.com/@m0etaz/python-beyond-the-basics-ii-16964d70c4da)
*   [Python Tricks 101](https://medium.com/hackernoon/python-tricks-101-2836251922e0)
*   [Try Out The Walrus Operator In Python 3.8](https://medium.com/hultner/try-out-walrus-operator-in-python-3-8-d030ce0ce601)
*   [A Byte Of Python eBook](https://python.swaroopch.com/)
*   [Python Scripts](https://medium.com/octopus-wealth/python-scripts-26e3d0bd5277)
*   [Open Sourcing a Python Project The Right Way](https://www.jeffknupp.com/blog/2013/08/16/open-sourcing-a-python-project-the-right-way/)
*   [Python Tooling Makes a Project Tick](https://medium.com/georgian-impact-blog/python-tooling-makes-a-project-tick-181d567eea44)
*   [Python Libraries To Make Your Code Readable, Reliable, And Maintainable](https://isaak.dev/2020/08/python-libraries-to-make-your-code-readable-and-maintainable)
*   [Intro To Test Framework Pytest](https://medium.com/testcult/intro-to-test-framework-pytest-5b1ce4d011ae)
*   [Official Pytest Website](https://pytest.org/en/latest/)
*   [What The Mock? A Cheatsheet for Mocking in Python](https://medium.com/@yeraydiazdiaz/what-the-mock-cheatsheet-mocking-in-python-6a71db997832)

![](https://miro.medium.com/max/3200/0*j9Qu4Upl5ufNWlAm.png)

Go is another general-purpose programming language that can be casually put in the same category as C/C++ and Rust.

It does not run quite as fast as [C++](https://benchmarksgame-team.pages.debian.net/benchmarksgame/fastest/go-gpp.html) or [Rust](https://benchmarksgame-team.pages.debian.net/benchmarksgame/fastest/go-rust.html) (although it is still much faster than [Node](https://benchmarksgame-team.pages.debian.net/benchmarksgame/fastest/go-node.html) or [Python](https://benchmarksgame-team.pages.debian.net/benchmarksgame/fastest/go-python3.html)). However, what it loses (slightly) in speed it makes up for in convenience, readability, and all the comforts of a modern language. For example, Go’s [built-in tooling](https://www.reddit.com/r/golang/comments/5hqvc1/what_are_the_built_in_go_tools_what_are_they_used/) is easily the best I’ve ever seen in a language and has led to an incredibly enjoyable developer experience anytime I’ve had to use it.

Along with some of its other [features](https://go.dev/solutions/webdev/), it makes Go an amazing language to work with for server-side development.

_Pro-Tip: If you’re just starting out with Go always type “Golang” instead of “Go” into Google searches — the results will be far more relevant._

These are a few great resources for getting started with Go, however, the server-side tutorials by Dave Stearns discussed below were my primary method for learning Go.

*   🔥 [Go.dev Website](https://go.dev/)
*   🔥 [A Tour Of Go](https://tour.golang.org/welcome/1)
*   [Go Website](https://golang.org/)
*   [How To Write Go Code](https://golang.org/doc/code.html)
*   [Go Documentation](https://golang.org/doc/)
*   [An Introduction to Go Book](https://www.golang-book.com/books/intro)
*   [Learn Web Programming In Go By Example](https://gowebexamples.com/)
*   [Go By Example](https://gobyexample.com/)

During college, I took a class on server-side development that used Go as the primary language. The creator of the course (Dave Stearns) wrote a series of tutorials to parallel the curriculum.

The tutorials on Go are some of the most clearly written and informational readings I’ve ever come across and were the primary mechanism that I used to learn the language. They are all worth reading.

*   [Introduction To Go](https://drstearns.github.io/tutorials/gointro/)
*   [The Go Language](https://drstearns.github.io/tutorials/golang/)
*   [Go Slices And Maps](https://drstearns.github.io/tutorials/goslicemap/)
*   [Go Structs And JSON](https://drstearns.github.io/tutorials/gojson/)
*   [Go Web Servers](https://drstearns.github.io/tutorials/goweb/)
*   [Tokenizing HTML Streams In Go](https://drstearns.github.io/tutorials/tokenizing/)
*   [Automated Testing In Go](https://drstearns.github.io/tutorials/testing/)
*   [Talking To Databases From Go](https://drstearns.github.io/tutorials/godb/)
*   [Sharing Values With Go Handlers](https://drstearns.github.io/tutorials/gohandlerctx/)
*   [Middleware Patterns In Go](https://drstearns.github.io/tutorials/gomiddleware/)
*   [Protecting Data Structures With Mutexes](https://drstearns.github.io/tutorials/mutexes/)

Setting up a development environment for Go is pretty straightforward. All you need is to download the language (and thus the command line tools for working with Go) and a Go language extension for your text editor of choice.

*   [Editor Plugins And IDEs](https://golang.org/doc/editors.html)
*   [IDEs And Plugins For Go](https://github.com/golang/go/wiki/IDEsAndTextEditorPlugins)
*   [Go Machine Setup (Windows/MacOS)](https://www.golang-book.com/guides/machine_setup)

As I hinted at in the Deno section above, Go has a pretty unique (and cool) way of approaching package management when compared to other languages like Node or Python.

As part of Go’s command-line tool that is installed with the language, there is a command called `go get` that can be used to download a package at a given URL. The package is installed locally to your computer and from there you can import it into any Go file you might be writing.

*   [Go Get Documentation](https://golang.org/cmd/go/#hdr-Add_dependencies_to_current_module_and_install_them)
*   [Search For Go Packages](https://pkg.go.dev/)

There are some web frameworks out there for Go, but in most cases, the built-in packages mean you don’t need any third-party libraries for server-side development!

*   [Awesome Go](https://awesome-go.com/)
*   [Go Command Documentation](https://golang.org/doc/cmd)
*   [Effective Go](https://golang.org/doc/effective_go.html)
*   [Writing Go Web Applications Tutorial](https://golang.org/doc/articles/wiki/)
*   [Create A Simple Load Balancer With Go](https://kasvith.me/posts/lets-create-a-simple-lb-go/)
*   [Gophercises](https://gophercises.com/)
*   [The Go Wiki](https://github.com/golang/go/wiki)
*   [Go Blog](https://blog.golang.org/)
*   [Go Playground](https://play.golang.org/)
*   [A Curated List Of Go Patterns](https://github.com/tmrts/go-patterns)
*   [Go Standard Packages](https://golang.org/pkg/)
*   [Go Test Coverage](https://blog.golang.org/cover)
*   [How/Why Is Concurrent Code Faster Than Sequential Code?](https://www.reddit.com/r/golang/comments/ii64br/howwhy_is_concurrent_code_faster_than_sequential/?utm_source=share&utm_medium=ios_app&utm_name=iossmf)
*   [Go Concurrency From The Ground Up](http://www.doxsey.net/blog/go-concurrency-from-the-ground-up)
*   [Concurrency Is Not Parallelism Talk](https://www.youtube.com/watch?v=cN_DpYBzKso)
*   [Go Concurrency Patterns Talk](https://www.youtube.com/watch?v=f6kdp27TYZs)
*   [The Go Memory Model](https://golang.org/ref/mem)

![](https://miro.medium.com/max/3200/0*IaxwQV_-uAGmP26n.png)

Rust is a language I’m only starting to get familiar with but one that I’m pretty excited about. It is a low-level systems language that can be thought of as a C/C++ competitor with some very nice benefits and features.

Notably, it can run really fast (as fast as [C](https://benchmarksgame-team.pages.debian.net/benchmarksgame/fastest/rust.html)/[C++](https://benchmarksgame-team.pages.debian.net/benchmarksgame/fastest/rust-gpp.html)) while at the same time providing memory safety and an incredible(-y strict) compiler/type system that together can catch a ton of bugs and output very helpful/descriptive errors messages and hints.

On the downside, Rust has some fairly complicated syntax and idioms compared to other languages, so it comes with a pretty steep learning curve. It’s definitely not a server-side language you should start out with.

With all that being said, Rust’s position sat squarely in the world of [WebAssembly](https://www.rust-lang.org/what/wasm) and [server-side](https://www.rust-lang.org/what/networking) use cases that have caught my attention in a big way.

When it comes to learning Rust you will find that the primary method of conferring information is through books. In fact, the official method for learning Rust is often called “The Book” in the Rust community and it’s well worth reading.

There is also a counter-part to the book that teaches Rust using a more hands-on example-based approach which I’ve personally found very helpful.

*   🔥🔥 [The Book](https://doc.rust-lang.org/book/)
*   🔥🔥 [Rust By Example](https://doc.rust-lang.org/stable/rust-by-example/)
*   🔥🔥 [Are We Web Yet?](https://www.arewewebyet.org/)
*   🔥 [Fireflowers](https://brson.github.io/fireflowers/)
*   [Rust Website](https://www.rust-lang.org/)

This is the official getting started page found on the Rust website. It covers installing the language and provides links to developer tools for popular text editors and IDEs. It’s all you should need to get up and running.

*   🔥 [Getting Started With Rust](https://www.rust-lang.org/learn/get-started)

Rust has a fantastic package management ecosystem that is very similar to NPM. Rust provides a command-line tool called Cargo that operates very similar to NPMs command-line tool. Also instead of calling third-party code “packages”, the term “crates” is used.

*   [Crates.io](https://crates.io/)
*   [The Cargo Book](https://doc.rust-lang.org/cargo/index.html)

Similar to Deno, the ecosystem of Rust web frameworks seems to be evolving still. However, it is much further along than Deno with Rust being nearly 5 years older.

The first link below does a great job analyzing some of the popular options in the ecosystem and providing recommendations.

*   🔥 [Choosing A Rust Web Framework, 2020 Edition](https://www.lpalmieri.com/posts/2020-07-04-choosing-a-rust-web-framework-2020-edition/)
*   [Actix Framework](https://actix.rs/) –– Similar to Flask or Express
*   [Rocket Framework](https://rocket.rs/) –– Similar to Django

*   🔥 [Rust In Production At Figma](https://www.figma.com/blog/rust-in-production-at-figma/)
*   🔥 [Rust 2018 Is Here… But What Is It?](https://hacks.mozilla.org/2018/12/rust-2018-is-here/)
*   🔥 [How Rust Helps You Prevent Bugs](https://polyfloyd.net/post/how-rust-helps-you-prevent-bugs/)
*   [Awesome Rust](https://github.com/rust-unofficial/awesome-rust/blob/master/README.md#audio)
*   [Rust In Detail: Writing A Scalable Chat Service From Scratch](https://nbaksalyar.github.io/2015/07/10/writing-chat-in-rust.html)
*   [Rust Nightly Edition Book](https://doc.rust-lang.org/nightly/edition-guide/introduction.html)
*   [Futures Explained In 200 Lines of Rust](https://cfsamson.github.io/books-futures-explained/introduction.html)

![](https://miro.medium.com/max/5200/0*dqwhBPFmkXeGWtyL.png)

Continuing the customer-restaurant analogy, databases can be thought of as the fridge or cold room in a restaurant. It’s the place where food and ingredients (read: your application data) can be stored before they’re ready to be cooked and delivered to a customer.

Just as fridges come in many different shapes and sizes, there are a variety of database types that solve different problems. The link below is an amazing video that discusses the various database types you might use.

For the purposes of this guide (and my own limited knowledge of the entire database ecosystem), we will mainly focus on the most popular type of database — _relational databases_. The most simple analogy I can think of is that relational databases are like spreadsheets that can be connected together. They use SQL (Structured Query Language) to create and maintain these spreadsheets. Below you will find resources for a popular dialect of SQL called MySQL.

Additionally, relational databases and SQL are so dominant that you will sometimes see non-relational database options casually referred to as “NoSQL databases.” That being said, I would once again highly recommend watching the video linked below to get a better understanding of what else is out there.

*   🔥🔥🔥 [7 Database Paradigms](https://www.youtube.com/watch?v=W2Z7fbCLSTw)

![](https://miro.medium.com/max/3200/0*0RBq7E-prxf_1Q-L.png)

MySQL is one of many flavors of SQL and just happens to be the version of SQL I learned. It can do all the core operations of any other SQL language but with minor syntax and feature differences.

*   🔥 [Basic MySQL Tutorial](https://www.mysqltutorial.org/basic-mysql-tutorial.aspx)
*   [MySQL For Absolute Beginners](https://www.elated.com/mysql-for-absolute-beginners/)

*   [MySQL Stored Procedures](https://www.mysqltutorial.org/mysql-stored-procedure-tutorial.aspx)
*   [MySQL Triggers](https://www.mysqltutorial.org/mysql-triggers.aspx)
*   [MySQL Views](https://www.mysqltutorial.org/mysql-views-tutorial.aspx)
*   [MySQL Functions](https://www.mysqltutorial.org/mysql-functions.aspx)
*   [SQL Joins Infographic](https://www.reddit.com/r/webdev/comments/b46iyd/sql_joins/)

*   [MySQL Node.js Tutorial](https://www.mysqltutorial.org/mysql-nodejs/)
*   [MySQL PHP Tutorial](https://www.mysqltutorial.org/php-mysql/)
*   [MySQL Python Tutorial](https://www.mysqltutorial.org/python-mysql/)

A big name in the NoSQL space that often comes up is MongoDB which uses JSON as it’s storage medium (compared to the spreadsheet-like format of SQL databases).

*   [How MongoDB Is Different From A SQL Database](https://flaviocopes.com/mongodb-vs-sql/)
*   [MongoDB Basics Tutorial](https://flaviocopes.com/mongodb/)
*   [How To Use MongoDB With Node.js](https://flaviocopes.com/node-mongodb/)

![](https://miro.medium.com/max/3200/0*g7XC0d6iiij7U62e.png)

Finally, we get to the cloud.

Physically speaking, the cloud is just a network of servers spread across the entire world that is owned and operated by a variety of companies (notably Amazon, Microsoft, and Google).

For the purposes of full-stack software engineering, the benefit of the cloud is that you can rent the computing power and storage capacity of this network to run your web applications at any scale — whether your app has tens of users or billions of users.

One of the big tasks of using the cloud is determining what services and technologies to use.

There are a mind-boggling number of these services available to use (Amazon’s AWS has over 150+ options alone). Notably, for web development, there are tons of options for web application deployment and options for database deployment. Some of these options lean towards automating the process of deployment while others are more flexible and let you use technologies like Docker and Kubernetes to set up your own custom environment.

Take your time to research these various services along with there drawbacks and benefits and you’ll be golden. Additionally, the first link below offers a great introduction to some of these services and what’s possible in the cloud.

*   🔥🔥🔥 [Cloud Computing In The Year 2020](https://www.youtube.com/watch?v=1pBuwKwaHp0)
*   [What Is The Cloud?](https://mashable.com/2013/08/26/what-is-the-cloud/)
*   [Beginner’s Guide To Understanding The Cloud](https://linchpinseo.com/guide-to-the-cloud/)

At a high-level (that leaves out a lot of details), Docker is a way of packaging your web applications into what are called “containers” so that they can be deployed basically anywhere. This is very powerful because it means you as a developer don’t have to worry about getting your application to run on different servers with different operating systems.

Kubernetes (sometimes called K8s for short) is essentially a piece of software for organizing and managing Docker containers in the Cloud.

*   🔥 [Docker In 100 Seconds](https://www.youtube.com/watch?v=Gjnup-PuquQ)
*   🔥 [Learn Docker In 7 Easy Steps — Full Beginner’s Tutorial](https://www.youtube.com/watch?v=gAkwW2tuIqE)
*   🔥 [Containerizing With Docker](https://drstearns.github.io/tutorials/docker/)
*   [A Comprehensive Intro To Docker, Virtual Machines, and Containers](https://www.freecodecamp.org/news/comprehensive-introductory-guide-to-docker-vms-and-containers-4e42a13ee103/)
*   [Docker Website](https://www.docker.com/)
*   [Docker Getting Started](https://www.docker.com/get-started)
*   [Docker Overview](https://docs.docker.com/get-started/overview/)
*   [Best Practices For Writing Dockerfiles](https://docs.docker.com/develop/develop-images/dockerfile_best-practices/)
*   [Kubernetes Website](https://kubernetes.io/)
*   [Kubernetes Basics](https://kubernetes.io/docs/tutorials/kubernetes-basics/)
*   [Kubernetes Documentation](https://kubernetes.io/docs/home/)

Heroku is another Cloud service (just like Amazon AWS or Microsoft Azure), but notably, it is my go-to service for deploying smaller applications and websites.

Plus when combined with the tips from the third link you can effectively get 24/7 uptime for free.

*   🔥🔥🔥 [Tips For Running Free Dynos On Heroku In 2020](https://railsautoscale.com/heroku-free-dynos/)
*   🔥 [What Is Heroku?](https://trifinlabs.com/what-is-heroku/)
*   [Heroku Getting Started](https://devcenter.heroku.com/start)
*   [Heroku Documentation](https://devcenter.heroku.com/categories/reference)

*   [AWS Website](https://aws.amazon.com/)
*   [Deploying to AWS](https://drstearns.github.io/tutorials/deploy2aws/)
*   [AWS Educate](https://aws.amazon.com/education/awseducate/)
*   [Microsoft Azure Website](https://azure.microsoft.com/en-us/)
*   [Azure Student Developer Resources](https://azure.microsoft.com/en-us/developer/students/)
*   [Google Cloud Website](https://cloud.google.com/)
*   [Google Cloud Getting Started](https://cloud.google.com/gcp/getting-started)
*   [DigitalOcean Website](https://www.digitalocean.com/)
*   [Deploying to Digital Ocean](https://drstearns.github.io/tutorials/deploy2do/)
*   [Cloudflare Workers](https://workers.cloudflare.com/)
*   [Cloud Run Quick Start — Docker To Serverless](https://www.youtube.com/watch?v=3OP-q55hOUI)

Finally, here are all the resources that didn’t neatly fit into the other categories but are still well worth a look 👀.

*   🔥 [Awwwards Collections](https://www.awwwards.com/collections/)
*   🔥 [Dribbble](https://dribbble.com/)
*   [Awwwards](https://www.awwwards.com/)
*   [Lookup.design](https://lookup.design/)
*   [CSS Design Awards](https://www.cssdesignawards.com/)
*   [Best Website Gallery](https://bestwebsite.gallery/)
*   [Codepen](https://codepen.io/)

*   🔥🔥🔥 [Developer Roadmaps](https://roadmap.sh/)
*   🔥 [Sideways Dictionary](https://sidewaysdictionary.com/)
*   🔥 [Choose An Open Source License](https://choosealicense.com/)
*   🔥 [FreeCodeCamp](https://www.freecodecamp.org/learn/)
*   🔥 [Crash Course Computer Science Series](https://www.youtube.com/watch?v=tpIctyqH29Q&list=PL8dPuuaLjXtNlUrzyH5r6jN9ulIgZBpdo&index=1)
*   🔥 [The Missing Semester of Your CS Education](https://missing.csail.mit.edu/)
*   [HackerRank Developer Skills Report](https://research.hackerrank.com/)
*   [Web.dev](https://web.dev/)
*   [Google Developers — Web](https://developers.google.com/web)
*   [TutorialsPoint](https://www.tutorialspoint.com/index.htm)

*   🔥🔥🔥 [Anything](https://code-cartoons.com/@linclark) [Written](https://hacks.mozilla.org/author/lclarkmozilla-com/) By [Lin Clark](https://twitter.com/codecartoons)
*   🔥 [Tania Rascia Blog](https://www.taniarascia.com/)
*   🔥 [Flavio Copes Blog](https://flaviocopes.com/)
*   🔥 [The Impostor’s Advantage](https://www.zainrizvi.io/blog/the-impostors-advantage/)
*   🔥 [How To Do Code Reviews Like A Human (Part 1)](https://mtlynch.io/human-code-reviews-1/)
*   🔥 [How To Do Code Reviews Like A Human (Part 2)](https://mtlynch.io/human-code-reviews-2/)
*   [FreeCodeCamp News](https://www.freecodecamp.org/news/)
*   [Free UX Ebooks](https://www.uxpin.com/studio/ebooks/)
*   [MVC For Noobs](https://code.tutsplus.com/tutorials/mvc-for-noobs--net-10488)
*   [Design Patterns For Humans](https://github.com/kamranahmedse/design-patterns-for-humans)
*   [The 12 Factor App](https://12factor.net/)
*   [Cooperative Software Development Book](https://faculty.washington.edu/ajko/books/cooperative-software-development/#/)

*   🔥 [Pexels](https://www.pexels.com/) –– Free/copyright free stock images.
*   [Unsplash](https://unsplash.com/) –– Free/copyright free stock images.
*   [AI-Generated Human Photos](https://generated.photos/)

Congratulations! You’ve officially made it through the mega full-stack web development resource guide. It was definitely not a short read.

I hope you picked up some new knowledge along the way. Learning the many domains of full-stack web development can be a lot to grapple with at times but if you take your time and pace it out the results are more than worth the effort.

If you would like more useful resources, thoughts, and information on web development topics, you can [**follow me**](https://twitter.com/hawkticehurst) on Twitter.

Best of luck on your own web development journeys! You got this.

_Want the Chrome bookmarks from this article for your own computer? Follow this_ [_link_](https://hawkticehurst.com/mega-full-stack-resource-guide/#download-bookmarks)_._

_Originally published at_ [_hawkticehurst.com_](https://hawkticehurst.com/mega-full-stack-resource-guide/) _on September 10, 2020._


[Source](https://codeburst.io/mega-full-stack-resource-guide-ad65b6c6e4a3)
