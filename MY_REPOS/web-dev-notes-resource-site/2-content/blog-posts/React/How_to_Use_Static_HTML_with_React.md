# How to Use Static HTML with React

> Pluralsight Guides

Introduction
------------

There may be an instance where you would want to display HTML inside a React Component. The HTML could be from an external source or a file that you want to display to the user.

By default, React does not permit you to inject HTML in a component, for various reasons including cross-site scripting. However, for some cases like a CMS or WYSIWYG editor, you have to deal with raw HTML. In this guide, you will learn how you can embed raw HTML inside a component.

dangerouslySetInnerHTML Prop
----------------------------

If you try to render an HTML string inside a component directly, React will automatically sanitize it and render it as a plain string.

    1
    2
    3
    

jsx

The above code will not render the string "John Doe" in a heading. Instead, the complete string, including the H1 tags, will be displayed to the user, thanks to React.

![](https://i.imgur.com/HBp2cpM.png)

To render the string as HTML, you need to use the `dangerouslySetInnerHTML` prop.

    1
    2
    3
    

jsx

The `dangerouslySetInnerHTML` prop was built to present and inject DOM formatted content into the frontend. The use of this prop is considered a bad practice, especially when dealing with user inputs. You should consider any user input as unsafe and sanitize it before injecting it into the frontend.

The `dangerouslySetInnerHTML` prop must be an object with a key `__html` and value of an HTML string. Misusing the `dangerouslySetInnerHTML` prop might open up your app to cross-site scripting attacks. Hence, before using this prop, you need to ensure that the HTML string is sanitized properly and coming from a reliable source. You should avoid passing any user-accepted input into the `dangerouslySetInnerHTML` prop.

### Cross-Site Scripting (XSS)

Cross-Site Scripting (XSS) attacks allow a malicious user or hacker to inject unsafe HTML code into a website for other end users. This allows the hacker to access personal data like cookies, local storage, etc.

Safer Alternative to dangerouslySetInnerHTML
--------------------------------------------

If XSS is a primary concern, you can use an external library like [DOMPurify](https://github.com/cure53/DOMPurify) to sanitize the HTML string before injecting it into the DOM using the `dangerouslySetInnerHTML` prop.

To install the DOMPurify library, run the following command.

You can see the example usage below.

    1
    2
    3
    4
    5
    6
    7
    

jsx

You can also configure `DOMPurify` to allow only specific tags and attributes.

    1
    2
    3
    4
    5
    6
    

jsx

Conclusion
----------

Security is the primary concern when dealing with HTML content from the user. You cannot trust any input from users, even admin users who are maintaining or writing content for the app. Hence you should always sanitize the HTML content using `DOMPurify` or any other library before injecting it into the DOM. Keep in mind that sanitizing large HTML strings on the client side might degrade the app performance; fortunately, `DOMPurify` can also be used on a NodeJS server, and therefore you should consider sanitizing the content in the backend.


[Source](https://www.pluralsight.com/guides/how-to-use-static-html-with-react)