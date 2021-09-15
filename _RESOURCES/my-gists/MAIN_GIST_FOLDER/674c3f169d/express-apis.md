# Express Lesson In Learning To Write Express APIs

This article will cover the basics of express from the perspective of a beginner without concerning it’s self with the underlying…

---

### Express Lesson In Learning To Write Express APIs

### This article will cover the basics of express from the perspective of a beginner without concerning it’s self with the underlying mechanisms and theory that underlies the application of the framework. 

<figure><img src="https://cdn-images-1.medium.com/max/800/0*yUozFGA0FQpjcXFf.gif" class="graf-image" /></figure>### For starters, what is expressJS¿

When introduced, node.js gave developers the chance to use JavaScript to write software that, up to that point, could only be written using lower level languages like C, C++, Java, Python…

In this tutorial we will cover how to write **web services** that can communicate with clients (the front end application) using **J**ava**S**cript **O**bject **N**otation (JSON).

- <span id="5334">JavaScript is asynchronous, which allows us to take full advantage of the processor it’s running on. Taking full advantage of the processor is crucial because the node process will be running on a single CPU.</span>
- <span id="0b8b">Using JavaScript gives us access to the npm repository. This repository is the largest ecosystem of useful libraries (most of them free to use) in **npm modules**.</span>

### To write a simple web server with `Node.js`:

1.  <span id="7e3f">Use Node’s `HTTP` module to abstract away complex network-related operations.</span>

<!-- -->

    npm i http

1.  <span id="50b0">Write the single **_request handler_** function to handle all requests to the server.</span>

The request handler is a function that takes the `request` coming from the client and produces the `response`. The function takes two arguments: 1) an object representing the `request` and 2) an object representing the `response`.

This process works, but the resulting code is verbose, even for the simplest of servers. Also, note that when using only Node.js to build a server, we use a single request handler function for all requests.

<figure><img src="https://cdn-images-1.medium.com/max/800/0*PTKhCN2p9S8EDZ4r.gif" class="graf-image" /></figure>

[View original.](https://medium.com/p/75e3267b284a)

Exported from [Medium](https://medium.com) on July 13, 2021.
