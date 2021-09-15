# An Introduction to Markdown \(Bonus Markdown Templates Included\)

## An Introduction to Markdown \(Bonus Markdown Templates Included\) <a id="abdd"></a>

![](https://cdn-images-1.medium.com/max/800/0*oy6szzmI0FdRUiTd.png)

## Basic Syntax Guide <a id="df36"></a>

This topic is meant to give you a very basic overview of how Markdown works, showing only some of the most common operations you use most frequently. Keep in mind that you can also use the Edit menus to inject markdown using the toolbar, which serves as a great way to see how Markdown works. However, Markdown’s greatest strength lies in its simplicity and keyboard friendly approach that lets you focus on writing your text and staying on the keyboard.

## What is Markdown <a id="ac30"></a>

Markdown is very easy to learn and get comfortable with due it’s relatively small set of markup ‘commands’. It uses already familiar syntax to represent common formatting operations. Markdown understands basic line breaks so you can generally just type text.

Markdown also allows for raw HTML inside of a markdown document, so if you want to embed something more fancy than what Markdowns syntax can do you can always fall back to HTML. However to keep documents readable that’s generally not recommended.

## Basic Markdown Syntax <a id="e27d"></a>

The following are a few examples of the most common things you are likely to do with Markdown while building typical documentation.

## Bold and Italic <a id="3805"></a>

```text
markdown
```

```text
This text **is bold**.
This text *is italic*.
```

This text is bold.  
This text _is italic_.

## Header Text <a id="444e"></a>

```text
markdown
```

```text
# Header 1
## Header 2
### Header 3
#### Header 4
##### Header 5
###### Header 6
```

## Header 1 <a id="7ae2"></a>

## Header 2 <a id="2ef2"></a>

## Header 3 <a id="c589"></a>

### Header 4 <a id="5c8b"></a>

Header 5Header 6

## Line Continuation <a id="56dc"></a>

By default Markdown adds paragraphs at double line breaks. Single line breaks by themselves are simply wrapped together into a single line. If you want to have soft returns that break a single line, add two spaces at the end of the line.

```text
markdown
```

```text
This line has a paragraph break at the end (empty line after).
```

```text
Theses two lines should display as a single
line because there's no double space at the end.
```

```text
The following line has a soft break at the end (two spaces at end)
This line should be following on the very next line.
```

This line has a paragraph break at the end \(empty line after\).

Theses two lines should display as a single line because there’s no double space at the end.

The following line has a soft break at the end \(two spaces at end\)  
This line should be following on the very next line.

## Links <a id="793e"></a>

```text
markdown
```

```text
[Help Builder Web Site](http://helpbuilder.west-wind.com/)
```

[Help Builder Web Site](http://helpbuilder.west-wind.com/)

If you need additional image tags like targets or title attributes you can also embed HTML directly:

```text
markdown
```

```text
Go the Help Builder sitest Wind site: <a href="http://west-wind.com/" target="_blank">Help Builder Site</a>.
```

## Images <a id="5a30"></a>

```text
markdown
```

```text
![Help Builder Web Site](https://helpbuilder.west-wind.com/images/HelpBuilder_600.png)
```

![](https://cdn-images-1.medium.com/max/800/0*ibU0D-Zr0qDT5h3z.png)

## Block Quotes <a id="085b"></a>

Block quotes are callouts that are great for adding notes or warnings into documentation.

```text
markdown
```

```text
> ###  Headers break on their own
> Note that headers don't need line continuation characters
as they are block elements and automatically break. Only text
lines require the double spaces for single line breaks.
```

> _Headers break on their own_
>
> _Note that headers don’t need line continuation characters as they are block elements and automatically break. Only text lines require the double spaces for single line breaks._

## Fontawesome Icons <a id="1fab"></a>

Help Builder includes a custom syntax for [FontAwesome](http://fortawesome.github.io/Font-Awesome/icons/) icons in its templates. You can embed a `@ icon-` followed by a font-awesome icon name to automatically embed that icon without full HTML syntax.

```text
markdown
```

```text
Gear:  Configuration
```

Configuration

## HTML Markup <a id="e7b4"></a>

You can also embed plain HTML markup into the page if you like. For example, if you want full control over fontawesome icons you can use this:

```text
markdown
```

```text
This text can be **embedded** into Markdown:
<i class="fa fa-refresh fa-spin fa-lg"></i> Refresh Page
```

This text can be embedded into Markdown:  
Refresh Page

## Unordered Lists <a id="dc79"></a>

```text
markdown
```

```text
* Item 1
* Item 2
* Item 3
This text is part of the third item. Use two spaces at end of the the list item to break the line.
```

```text
A double line break, breaks out of the list.
```

* Item 1
* Item 2
* Item 3 This text is part of the third item. Use two spaces at end of the the list item to break the line.

A double line break, breaks out of the list.

## Ordered Lists <a id="1eae"></a>

```text
markdown
```

```text
1. **Item 1**
Item 1 is really something
2. **Item 2**
Item two is really something else
```

```text
If you want lines to break using soft returns use two spaces at the end of a line.
```

1. Item 1 Item 1 is really something
2. Item 2 Item two is really something else

If you want to lines to break using soft returns use to spaces at the end of a line.

## Inline Code <a id="8b74"></a>

If you want to embed code in the middle of a paragraph of text to highlight a coding syntax or class/member name you can use inline code syntax:

```text
markdown
```

```text
Structured statements like `for x =1 to 10` loop structures
can be codified using single back ticks.
```

Structured statements like `for x =1 to 10` loop structures can be codified using single back ticks.

## Code Blocks with Syntax Highlighting <a id="4bcf"></a>

Markdown supports code blocks syntax in a variety of ways:

```text
markdown
```

```text
The following code demonstrates:
```

```text
    // This is code by way of four leading spaces
    // or a leading tab
```

```text
More text here
```

The following code demonstrates:

```text
pgsql
```

```text
// This is code by way of four leading spaces
// or a leading tab
```

More text here

## Code Blocks <a id="0002"></a>

You can also use triple back ticks plus an optional coding language to support for syntax highlighting \(space injected before last \` to avoid markdown parsing\):

```text
markdown
```

```text
`` `csharp
// this code will be syntax highlighted
for(var i=0; i++; i < 10)
{
    Console.WriteLine(i);
}
`` `
```

```text
csharp
```

```text
// this code will be syntax highlighted
for(var i=0; i++; i < 10)
{
    Console.WriteLine(i);
}
```

Many languages are supported: html, xml, javascript, css, csharp, foxpro, vbnet, sql, python, ruby, php and many more. Use the Code drop down list to get a list of available languages.

You can also leave out the language to get no syntax coloring but the code box:

```text
markdown
```

```text
`` `dos
robocopy c:\temp\test d:\temp\test
`` `
```

```text
dos
```

```text
robocopy c:\temp\test d:\temp\test
```

To create a formatted block but without formatting use the `txt` format:

```text
markdown
```

```text
`` `txt
This is some text that will not be syntax highlighted
but shows up in a code box.
`` `
```

which gives you:

```text
text
```

```text
This is some text that will not be syntax highlighted
but shows up in a code box.
```

### If you found this guide helpful feel free to checkout my github/gists where I host similar content: <a id="2f9a"></a>

[bgoonz’s gists · GitHub](https://gist.github.com/bgoonz)

Or Checkout my personal Resource Site:

