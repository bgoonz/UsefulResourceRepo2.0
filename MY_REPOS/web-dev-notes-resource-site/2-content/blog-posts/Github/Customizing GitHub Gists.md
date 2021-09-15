# Customizing GitHub Gists

> GitHub Gists let you save and share snippets of code. They’re popular with people who write about code, since you can embed them right into your articles, like...

[GitHub Gists](https://gist.github.com/) let you save and share snippets of code. They’re popular with people who write about code, since you can embed them right into your articles, like this.

Check the HTML and you’ll see that all it took was a single `<script>` tag to embed that Gist.

    <script src="https://gist.github.com/lonekorean/8a6a3c508b7c71deb4070d3314900b1f.js"></script>

Now that we’ve covered the gist of using Gists (sorry), let’s get into some ways to customize them.

[link to this subheading](#changing-the-look-and-feel)Changing the Look and Feel
--------------------------------------------------------------------------------

The sample Gist above is what you get by default. Inoffensive, but it’s not the look I wanted for my site. Fortunately, you can use custom CSS to override the styles. Here’s that Gist again, but this time with custom styles very similar to what I’m using on my site.

The Gist is functionally the same, but looks considerably different. I’ve also used CSS to hide the “hosted with ❤️️ by GitHub” bar at the bottom, since I don’t really care for it (your mileage may vary). Here’s the full CSS.

    @import url('https://fonts.googleapis.com/css?family=Droid+Sans+Mono');body .gist .gist-file {  margin-bottom: 0;  border: 1px dashed #adb5bd;  border-radius: 0;}body .gist .gist-data {  border-bottom: none;  border-radius: 0;  background-color: #f1f3f5;}body .gist .blob-wrapper {  border-radius: 0;}body .gist .highlight {  background-color: transparent;  font-family: 'Droid Sans Mono', monospace;  font-size: 14px;}body .gist .highlight td {  padding: 5px 15px !important;  line-height: 1;  font-family: inherit;  font-size: inherit;}body .gist tr:first-child td {  padding-top: 15px !important;}body .gist tr:last-child td {  padding-bottom: 15px !important;}body .gist .blob-num {  color: #ced4da;  background-color: #495057;  pointer-events: none;}body .gist .gist-meta {  display: none;}

A couple notes here.

*   I’m prepending all selectors with `body .gist`. This increases specificity, which allows my styles take priority over the default ones.
*   There are some spots where I’m forced to use `!important`. I’m not thrilled about it, but it’s necessary to override default styles that also have `!important`.

[link to this subheading](#gist-syntax-themes)Gist Syntax Themes
----------------------------------------------------------------

So far, we haven’t messed with the syntax highlighting colors. If you use dev tools to inspect the contents of an embedded Gist, you’ll see a bunch of `<span>` tags with classes like `pl-c1`, `pl-en`, `pl-k`, etc. These apply the colors for various tokens. Here’s a small sample. You can see [the full list/stylesheet in this thread](https://github.com/StylishThemes/GitHub-Dark/issues/197#issuecomment-63717143).

    .pl-c1 { color: #0086b3; } .pl-en { color: #795da3; } .pl-k  { color: #a71d5d; } 

Armed with this knowledge, you could override these styles and create your own color theme, but that could get tedious. There are premade stylesheets people have shared to do the work for you, but all the ones I found were broken (they used [Pygments’](http://pygments.org/) grammar, which GitHub dropped in late 2014).

And then I found [GitHub Dark](https://userstyles.org/styles/37035/github-dark). It’s a full-on restyling of the entire GitHub website, but a portion of its CSS is exactly what we’re looking for. Much love to [StylishThemes](https://github.com/StylishThemes) for making this!

So I adapted the CSS to create drop-in stylesheets that apply various color themes to Gists. For example, here’s the Monokai theme.

All you have to do is add [this stylesheet](https://github.com/lonekorean/gist-syntax-themes/blob/master/stylesheets/monokai.css) to your page. For more themes, check out my [gist-syntax-themes](https://github.com/lonekorean/gist-syntax-themes) project on GitHub.

[link to this subheading](#tweaking-colors-with-css-filters)Tweaking Colors with CSS Filters
--------------------------------------------------------------------------------------------

If you’d rather not mess with a bunch of style overrides, then there is an alternative. You can use [CSS filters](https://developer.mozilla.org/en-US/docs/Web/CSS/filter) to adjust the colors. You get less control for sure, but it’s quicker and more lightweight.

All it takes is a single style. Here’s an example.

    body .gist .blob-code {  filter: hue-rotate(90deg);}

You can even combine multiple filters (separated by spaces).

    body .gist .blob-code {  filter: brightness(70%) saturate(150%);}

That’s actually the one I use on my site. I’m generally fine with the default Gist syntax colors, except that they’re **not accessible** — the [contrast ratio](http://webaim.org/resources/contrastchecker/) isn’t high enough. Decreasing `brightness` fixes this, while bumping up `saturate` keeps the colors vivid.

This demo lets you play around with various filters to see what your Gists would look like. Side note, there’s nothing stopping you from using the drop-in stylesheets from earlier AND these CSS filters at the same time.

[link to this subheading](#scripting)Scripting
----------------------------------------------

This might be obvious, but once a Gist’s markup has been injected into a page, you can use JavaScript to muck around with it.

The following is a snippet of vanilla JavaScript that clears out IDs. Why? Because Gists insert element IDs based on filenames, so if your page embeds multiple Gists with the same filenames, you’ll get ID collisions. This is bad from both a technical and accessibility perspective.

    let gistIdElements = document.querySelectorAll('.gist [id]');Array.from(gistIdElements).forEach((el) => {  el.removeAttribute('id');});

[link to this subheading](#full-control-with-the-api)Full Control with the API
------------------------------------------------------------------------------

Everything I’ve shown you so far is built on the embedded script approach — drop the magic `<script>` tag into your page and GitHub takes care of all the markup for you. It’s convenient and good enough for most… but what if you want absolute, uncompromising control?

This is where the [Gist API](https://developer.github.com/v3/gists/) comes in. It lets you retrieve Gist data on your own terms and **do whatever you want**. Reading data from the Gist API is pretty easy. It doesn’t require any sort of authentication or access key (creating, updating, and deleting data does, but these are beyond the scope of this article).

To get the data for a particular Gist, hit a [URL like this](https://api.github.com/gists/8a6a3c508b7c71deb4070d3314900b1f).

    https://api.github.com/gists/8a6a3c508b7c71deb4070d3314900b1f

That’ll give you a JSON response with all the data you need.

The ID in that URL is the same one you’d see in the `src` of the embedded script and the URL of the [GitHub page for the Gist](https://gist.github.com/lonekorean/8a6a3c508b7c71deb4070d3314900b1f).

Here’s a quick demo that simply display a Gist via the API. It’s a client-side jQuery demo, but you could do this sort of thing server-side, embedding Gists directly into your pages before they even hit the browser!

And here’s the code.

    const url = 'https://api.github.com/gists/8a6a3c508b7c71deb4070d3314900b1f';function handleDone(data) {    let filename = Object.keys(data.files)[0];  let code = data.files[filename].content;  $('pre').text(code);  $('h1').text(data.description);}function handleFail() {  console.log('Something went wrong. :(');}$.get(url).done(handleDone).fail(handleFail);

Nothing fancy, but keep in mind this is a super simple demo — you can do whatever you want from this point. Also, notice that syntax highlighting is gone. You don’t get this for free through the API, though there are [syntax highlighting plugins](http://ourcodeworld.com/articles/read/140/top-5-best-code-syntax-highlighter-javascript-plugins) you could use to fill the gap.

There are many other Gist API endpoints to explore, such as one to [list a user’s Gists](https://developer.github.com/v3/gists/#list-a-users-gists). If full control is what you want and you’re not afraid to do the extra work, then the API is the way to go.

[link to this subheading](#make-gists-your-own)Make Gists Your Own
------------------------------------------------------------------

I’ve covered several ways to make Gists look the way you want them to, with varying degrees of effort. Hopefully one of these methods, or a combination of them, will help you find exactly what you’re looking for. If you have any other tips I’ve missed, please reach out!


[Source](https://codersblock.com/blog/customizing-github-gists/)