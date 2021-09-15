# Best Practices in Using IFrames with React

> Learn how to use Iframes with React following the best practices for Security and Performance

## Learn how to use Iframes with React following the best practices for Security and Performance

[![Andrea Perera](https://miro.medium.com/fit/c/96/96/1*gzBO95eXbO4dNkKa2sjang@2x.jpeg)](https://andriperera.medium.com/?source=post_page-----6193feaa1e08--------------------------------)

![](https://miro.medium.com/max/1400/0*RzU-xkQ-xnTinsx2)

Photo by [Chance Anderson](https://unsplash.com/@chanceanderson?utm_source=medium&utm_medium=referral) on [Unsplash](https://unsplash.com/?utm_source=medium&utm_medium=referral)

Today it’s challenging to find standalone web apps. We can find most of these apps work with each other where the integrations happen either from the frontend or backend. When looking at these integrations, one of the oldest yet simple integration strategy is using Iframes.

In a Nutshell, Iframes allow you to embed content from other websites into yours.

> When looking at the history, an “Inline frame” called Iframe was introduced in 1997 with HTML 4.01 by Microsoft Internet Explorer.

First and foremost, let’s look at how to embed an Iframe in a React project.

Technically, an Iframes could be as small as the following code snippet.

<iframe src="[https://www.youtube.com/embed/cWDJoK8zw58](https://www.youtube.com/embed/cWDJoK8zw58)"></iframe>

![](https://miro.medium.com/max/60/1*In8qfrTXuTZTiKt_Mv2ixw.png?q=20)

![](https://miro.medium.com/max/1400/1*In8qfrTXuTZTiKt_Mv2ixw.png)

Similarly, as you can see in the below code snippet, embedding a YouTube Iframe in React is straight forward.

import React from "react";  
import ReactDOM from "react-dom";class App extends React.Component {  
 render() {  
 return <iframe src="[https://www.youtube.com/embed/cWDJoK8zw58](https://www.youtube.com/embed/cWDJoK8zw58)" />;  
 }  
}ReactDOM.render(<App />, document.getElementById("container"));

However, though it’s easy to embed an Iframe into your React app, making it secure, fast, and reliable requires specific expertise. Therefore, it’s essential to understand the best practices around using Iframes with React.

As an experiment, I’ve used YouTube to embed a video into a React app. When I copy-paste a YouTube video link directly into the Iframe, it threw an error saying **“www.youtube.com refused to connect.”** To embed a YouTube video to an Iframe, I had to use their embed URLs.

## Verify the X-Frame-Options

Suppose you closely observe the error in Chrome Dev Tools. In that case, you can find that YouTube prevents the loading of their direct URLs (Not the embeddable one) by using [X-Frame-Options](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Frame-Options) set to “same-origin” returning in the HTTP Header from YouTube servers.

![](https://miro.medium.com/max/60/1*eA-DK3p3sOOLNw9au6RmNA.png?q=20)

![](https://miro.medium.com/max/1110/1*eA-DK3p3sOOLNw9au6RmNA.png)

X-Frame-Options Error

> Therefore, we must embed only URLs that are advertised as embeddable. Otherwise, even if it works initially (Unlike the case of YouTube), these could get blocked without your knowledge using X-Frame-Options.

And I hope it’s clear that adding any URL into an Iframe doesn’t work with React or any other frontend library or framework unless the embedding site allows your web app domain to embed it.

Embedding an Iframe inside a React app comes with some risks where Iframe will load content outside your control unless you take the necessary measures.

## Using Sandbox Attribute

You can use the [sandbox](https://html.spec.whatwg.org/multipage/iframe-embed-object.html#attr-iframe-sandbox) attribute, which will ensure the content within the Iframe cannot change the parent(Host) web URL, access browser storage, cookies, or run plugins. If you add sandbox without any value document will be fully sandboxed.

**<iframe src="**[https://www.youtube.com/embed/cWDJoK8zw58](https://www.youtube.com/embed/cWDJoK8zw58)" **sandbox=''/>**

But YouTube embedded Iframe will give you the following error.

![](https://miro.medium.com/max/60/1*40KT9drKLnjMRGijrE3EHw.png?q=20)

![](https://miro.medium.com/max/960/1*40KT9drKLnjMRGijrE3EHw.png)

Script Execution Error

The error is self-explanatory, and for YouTube embedded video to work, you need both `allow-scripts` and `allow-same-origin` to be set with sandbox.

> However, adding both of these attributes together defies the purpose of using the sandbox as a malicious attacker can execute a script and remove sandboxing.

Therefore, using `sandbox` is the best fit for HTML content embedding, which doesn’t depend on JavaScript for rendering HTML.

## Can We Use Content Security Policies (CSP)?

Having a CSP is a great defense for your React app against cross-site scripting attacks. Unfortunately, there aren’t any restrictions we can enforce using CSP for the content loaded inside Iframes.

However, a [working draft](https://w3c.github.io/webappsec-cspee/) by W3C allows the embedding site to propose a CSP for the Iframe by setting an attribute on it. Therefore, we have to wait for some time to see the CSP restrictions on Iframe.

Page loading performance is a topic discussed along with Iframes. Since the content loaded in Iframe is out of your control, it could lead to performance degradation in your web app if it’s poorly designed.

However, the issue is not universal. After testing the YouTube embedded React app with Chrome DevTools [Lighthouse](https://github.com/GoogleChrome/lighthouse), it clearly showed minimal impact, as shown below.

![](https://miro.medium.com/max/60/1*T9kjR575P5RE2srHBmc3Tw.png?q=20)

![](https://miro.medium.com/max/1400/1*T9kjR575P5RE2srHBmc3Tw.png)

Lighthouse Report for the web app with YouTube embedded

> To boost page loading speed, set the iframe src/url attribute with JavaScript after the main content has been loaded. This makes your website available earlier and reduces your official page load time which is an important [SEO](https://developer.mozilla.org/en-US/docs/Glossary/SEO) metric.” ~ [MDN mozilla](https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Other_embedding_technologies)

Besides, if you trust the Iframe source, you could also embed it using dangerouslySetInnerHTML. Here, the React will bypass the Iframe content while checking the differences between Virtual and Real DOM, which slightly improves your app performance.

import React from "react";  
import ReactDOM from "react-dom";class App extends React.Component {  
 render() {  
 return <div dangerouslySetInnerHTML={{ \_\_html: "<iframe src='[https://www.youtube.com/embed/cWDJoK8zw58'](https://www.youtube.com/embed/cWDJoK8zw58') />"}} />;  
 }  
}ReactDOM.render(<App />, document.getElementById("container"));

However, as the name implies, it is dangerous to use the attribute unless you trust the Iframe source or take care of the sanitization of content passed to \_\_html.

> Therefore, use this with caution only if a need arise due to performance limitations.

As you have seen, adding an Iframe is straightforward. However, you should follow several best practices to use Iframes appropriately in web apps to reduce the overall risks of including an external site in your web app.

Besides, if you allow dynamic additions of Iframes, you should trust these embedded URLs unless you use sandbox mode. Otherwise, the risk is high for XSS attacks on the web app. And if an incident happens, the possibility of sending sensitive information could be leaked to the Iframe origins.

I hope this article has provided awareness for you to use Iframes properly in React apps.

Thanks for Reading!

[Source](https://blog.bitsrc.io/best-practices-in-using-iframes-with-react-6193feaa1e08)
