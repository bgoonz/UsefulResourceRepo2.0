In Github's **README.md** file uses this format. [**Jekyll**](https://jekyllrb.com/) static blog template's uses markdown format.

You can easily use markdown wherever you want. If you use **github** you have to learn how to write markdown. You can write enhanced detail **README.md** on your projects. It's really powerful writing tool you can use.

## **What Markdown?**

Markdown is a lightweight markup language with plain text formatting syntax. It is designed to convert to structured HTML. It is often used to format readme files.

## **How to use Markdown?**

We have talked too much about markdown, now you can see how it is used with examples.

I will use [**VSCode**](https://code.visualstudio.com/) to preview Markdown file. Firstly you need to create a file that include end of name **.md**.

To preview **md** files in vscode you need to open [**Markdown Preview**](https://code.visualstudio.com/docs/languages/markdown). If you does not install **Markdown Preview**.

- Open VSCode and press **Ctrl + Shift + X**
- Enter **Markdown Preview** and will see and install it.
- After installed **Markdown Preview**, press **Ctrl + Shift + P** and type **Markdown Preview**, will see and select.

Once we have made the necessary preparations, we can start.

## **Markdown Formatting**

## **Heading**

Markdown allows you to divide your text with headings. It has six headings. It's so simple to write heading with **hash** characters(**#**).

\# This is an H1 tag
\## This is an H2 tag
\### This is an H3 tag
\#### This is an H4 tag
\##### This is an H5 tag
\###### This is an H6 tag

Headers looks like below.

## **Emphasis**

Emphasis can be added more than one way with asterisk(\*) or underscore(\_) characters.

\*Italic text with asterisk\*\_Italic text with underscore\_

To do _italic_ emphasis you can use asterisk **\\** or **\_**. This text looks like below

\*\*Bold text with double asterisk\*\*\_\_Italic text with double underscore\_\_

To do **Bold** emphasis you can use asterisk **\*\\\*\\\*** or **\_\_**. This text looks like below

To do **_Bold Italic_** you can also use asterisk like this.

\*\*\*Bold Italic Text\*\*\*

**Strike-throughs**

~~deleted words~~

## **Unordered**

Unordered list you can also use asterisk(\*) by starting each line. You don't have to forget a space with after asterisk(\*). It's so important.

\* Item 1\* Item 2\* Item 3\* Item 4 \* Item 4a \* Item 4b

## **Ordered**

Ordered lists similiarly with Unordered list. This is starting with number and after number a **\*\*(.)\*\***dot.

1\. Item 11\. Item 21\. Item 3 1. Item 3a 1. Item 3b

## **Images**

Images load is so simply in markdown. You can simply add your image **Alt Text** to **!\[Alt Text\]** and add image **url or path** to **!\[Alt Text\](**URL or IMAGE PATH**)**. You can also add **Optional title** to your images URL end with a space.

The **Optional Title** is displayed in a small pop up when user hovers over the image.

!\[GitHub Logo\](/images/logo.png "Optional Title")Format: !\[Superman Logo\](url "Optional Title")

## **Links**

There are two ways to create a link. First one is to include the link inline **\[WishText\](**URL**)** URL. So user click on _WishText_ go to _URL_ link.

The second one is so simply. Directly write your URL to markdown and it will immediately detect as web link.

[http://github.com](http://github.com/) — automatic!\[GitHub\](http://github.com)

## **Blockquotes**

You can indicate a quoted section of text. So just add **\>** by beginning each line.

As Mustafa Kemal Atatürk said:\>One day my mortal body will turn to dust, but the Turkish Republic will stand forever.

**Inline code**

I think you should use an\`<addr>\` element here instead.

## **Code Syntax**

Firstly you can also type your code with 4 space.

```js
function alertMarkdown() {
  alert("Hello Markdown");
}
```

```bat
echo something
```

## **Task Lists**

Task list has many usage on **github**. So users can also add to-do lists. Usage is simple. Just add **\- \[\]** not to-do or add **\- \[x\]** done.

\- \[x\] update login UI\- \[ \] dashboard UI design.

Task lists appears like below.

## **Tables**

First Header | Second Header — — — — — — | — — — — — — -Content from cell 1 | Content from cell 2Content in the first column | Content in the second column

Also create tables simply. Divide list of words with hyphens **\*\*-\*\***, and separating each column with a pipe |.

**Definition Lists**

Jekyll: is a blog-aware, static site generator in Ruby.

**Jekyll**

is a blog-aware, static site generator in Ruby.

## **Footnotes**

This articles has many references.\[^1\]\[^1\]: Linus Torvals.

This articles has many references.\[<sup>1</sup>\]

\[<sup>1</sup>\]: Linus Torvals.

## **Horizontal Rules**

\*\*\*\* \* \* \* \* — -\_\_\_

Horizontal Rules sipmly created by three or more \*(asterisk), hyphens(-) or underscore(\_) on a line. You can also add spaces in characters like **\\\* \\\* \\ \*\\ \\\***.

## **Markdown with HTML&CSS**

We can also use markdown with html tags and decorate with CSS.

## **Images**

If you use markdown image load format **!\[Alt Text\](**imageURL or Path**)**, this image will not center on the page. This will always show on the left side. You can use html change image align.

You can use '\<img> tag\' to load image from url or path. Also set **width, height and align**.
<span style="color:blue" style="alignment:left">_left alignment_</span>

<img align="left" width="100" height="100" src="https://zeppelin.apache.org/docs/0.7.0/assets/themes/zeppelin/img/docs-img/markdown-example-pegdown-parser.png">
<span style="color:blue" style="alignment:right">*right alignment*</span>

<img align="right" width="100" height="100" src="data:image/png;base64,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">

**center alignment**

<p align="center"><img width="200" height="200" src="https://lh3.googleusercontent.com/proxy/yLJPJUCkE9DzBjcm5U_Edke7J6UEQYR3wrQqx5riDn9NW6fS8S1fb1D-2Xb7-0BR1Bcre4Ir2S2u1Woz7E8fZ6LQFKfwe7R1n2ldvbBGXQ"></p>

## **Collapse Sections**

Collapsing large sections of text can make your plain text much easier to read.

<details><summary>"Click Here to expand"</summary>this is hidden text block.</details>

## **Using CSS**

Also you can use CSS stylesheet in your markdown plain text. You can do that two way. One of these is a write **\`<style>\`** in your markdown file and then use them in html tags.

<style>.pclass{background-color: yellow;color: blue;}</style><p class="pclass">Hello Markdown….</p><button >Markdown Button</button>

![Image for post](https://miro.medium.com/max/60/1*V2ntxXOBT7IUWp3p9PatWA.png?q=20)

![Image for post](https://miro.medium.com/max/1844/1*V2ntxXOBT7IUWp3p9PatWA.png)

The last one way is adding with \`<link>\` css files. I will add latest [**Bootstrap**](https://getbootstrap.com/) css files from url like below.

<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/css/bootstrap.min.css" integrity="sha384–9gVQ4dYFwwWSjIDZnLEWnxCjeSWFphJiwGPXr1jddIhOegiu1FwO5qRGvFXOdJZ4" crossorigin="anonymous">

Added Bootstrap buttons to show you how to use with css files.

<button type="button" class="btn btn-success">Success</button><button type="button" class="btn btn-info">Info</button><button type="button" class="btn btn-warning">Warning</button>

![Image for post](https://miro.medium.com/max/60/1*WGYOGjJnU7iaj476cUmY8w.png?q=20)

![Image for post](https://miro.medium.com/max/1818/1*WGYOGjJnU7iaj476cUmY8w.png)

**ATTENTION**

If you convert your markdown file to **pdf, docx or etc** with **pandoc** you don't use html tags. So **Pandoc** does not support html tags in markdown file. You can use markdown style simply. If you use you can not see your images and styles.

I hope you enjoy reading.

Visit my blog for more → [https://coderkan.github.io/](https://coderkan.github.io/)

Have a nice coding…

[Source](https://medium.com/echohub/write-simple-and-effective-markdown-tips-8e01fdddd70)
