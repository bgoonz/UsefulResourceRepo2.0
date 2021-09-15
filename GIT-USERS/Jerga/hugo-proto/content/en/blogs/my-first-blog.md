---
title: "My First Blog Title"
subtitle: "My First Blog Subtitle"
content: "new content hello there guys"
date: 2021-04-22T09:24:38+01:00
image: images/gatsby.jpg
author:
  name: "Filip Jerga"
  image: "images/filip.jpg"
tags:
  - js
  - gatsby
  - development
  - programming
categories:
  - web development
series:
  - JAMStack
draft: false
---

{{<kokos name="Filipooo">}}
<span>
Hello World nanan
</span>
{{</kokos>}}

## Chapter 0 — Resources

Full Course: [Electron & React JS: Build Native Chat App with Javascript](https://academy.eincode.com/courses/electron-react-js-build-native-chat-app-with-javascript)

Youtube Guide: [https://youtu.be/VCl8li22mrA](https://youtu.be/VCl8li22mrA)

Github Repo: [https://github.com/Jerga99/electron-react-boilerplate](https://github.com/Jerga99/electron-react-boilerplate)

## Chapter 1 — What is Electron JS?

In short? Electron js is a framework for creating native applications with web technologies like Javascript, Html & CSS. Yes, you hear right, you can use Html to create awesome native applications that can run across multiple platforms like macOS, Windows, and Linux.

Many popular applications like Visual Studio Code, Slack, Discord, Twitch, WhatsApp are created in Electron.

### **So how does it work?**

First, open your coding editors and get ready for programming. Let’s create a very simple application. We will start with coding and then we will look at the theoretic part.

1.  Create an empty folder for your application
2.  initialize npm inside of this folder, run: `npm init -y`
3.  install electron, run: `npm install --save-dev electron`
4.  specify start script in **package.json** to: `"start": electron .`
5.  upon running `npm start` Electron will try to run the file specified in the `main` option of package.json
6.  specify `"main": main.js`
7.  create `main.js` with the following content : `console.log("Hello World");`

    {
    "name": "your-electron-app",
    "version": "1.0.0",
    "description": "",
    "main": "main.js",
    "devDependencies": {
    "electron": "^10.1.2",
    },
    "scripts": {
    "start": "electron .",
    },
    "author": "",
    "license": "ISC"
    }package.json

    console.log("Hello World");
    main.js

On `npm start` electron will run `main.js` file, you should see “Hello World” in the terminal console. Interesting thing is that application will keep running and will be loaded in the memory of your computer. It’s up to the user to shut it down.

Now we need to create a graphical user interface(GUI) to interact with our application. For this, we will use pure Html and JS.

## Chapter 2— Browser Window

In Electron we recognize 2 main processes. **Main** and **Renderer** process. The process which runs **package.json**’s `main.js` script is the main process.

The main process can create a GUI in the form of a web page. Each “web page” runs it’s own renderer process.

Did I use the term “web page”? Yes, Electron is built on top of the same source code as Google Chrome browser called **Chromium**.

Again, let’s code a simple browser window, and then we will get into an explanation.

Open `main.js` file, and type the following code:
{{< highlight js >}}
const { BrowserWindow, app } = require('electron');

function createWindow() {
const win = new BrowserWindow({
width: 1200,
height: 800,
backgroundColor: "white",
webPreferences: {
nodeIntegration: false,
worldSafeExecuteJavaScript: true,
contextIsolation: true
}
})

win.loadFile('index.html')
}

app.whenReady().then(createWindow);
{{< /highlight >}}

Function `createWindow` will create browser window 1200x800px with white background.

Normally you would be able to access Electron and Node API in the rendered process(Browser Window) but by writing `nodeIntegration: false` we are disabling it. It’s considered a good security practice. We will access these APIs differently.

> In normal browsers, web pages usually run in a sandboxed environment and are not allowed access to native resources. Electron users, however, have the power to use Node.js APIs in web pages allowing lower level operating system interactions.

After the browser window is initialized it tries to run **index.html** file.

`createWindow` function is executed when Promise of `app.whenReady` is resolved. This will happen as soon as Electron is fully initialized.

The last thing missing is `index.html` file. Let’s create one:

    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8" />
        <meta http-equiv="Content-Security-Policy" content="script-src 'self'" />
        <title>Electron Chat</title>
      </head>
      <body>
        <div id ="root">
          <h1>Hello World</h1>
        </div>
      </body>
    </html>index.html

Just standard Html displaying **Hello world**.

Now let’s run `npm start` and this is what you should see:

<div class="blog-image blog-image-center">![](https://cdn.sanity.io/images/55mm68d3/production/816a45b2d815771c24f7a111d37d0170b9d28475-1400x1072.png?h=600&fm=jpg&q=70&fit=max)</div>

Congrats, you have just created a native application with the use of pure Html and JS.

## Chapter 3— Is this Web App?

How do you access a normal web page? You will open Google Chrome or other browser and type a URL of a web page you want to visit.

Let’s say we are visiting **medium.com.** The browser will make a request to **medium.com** server, after some time you will receive a response from the server with an Html document and usually a bunch of JS, CSS files…

The browser will take all of this content and render it on the screen and **Medium** application is displayed.

Electron is utilizing all of these steps into one. First, the application is running locally on your computer, the same as Google Chrome. Upon running Electron app, a browser window is created with the content of Html, JS & CSS we have specified to load beforehand.

Same as Google Chrome browser can run natively on your computer, Electron app can do the same.

<div class="blog-image blog-image-center">![](https://cdn.sanity.io/images/55mm68d3/production/a84e3a0ab24ccbcadc3bc3f34871eaebd37dda8b-1400x577.png?h=600&fm=jpg&q=70&fit=max)</div>

Chrome and Electron have a lot of in common.

Chromium is a web engine for rendering the UI — in other words, a full Chrome-like web browser.

Chromium can parse HTML, create DOM tree, render the view, and all of this fancy stuff. That’s why we can use HTML in Electron.

V8 is the name of the JavaScript engine that powers Google Chrome. It’s the thing that takes our JavaScript and executes it while browsing with Chrome.

Electron application is using Node.js and Node.js is internally using V8 engine. That’s the reason why we can use JS in Electron application + thanks to Node we can access the lower API of our operating system, which is not allowed on a typical web page.

### So is this web app?

No, but it’s very very similar. What you are creating in Electron is a native application that uses web technologies(Html, JS, CSS …) with the ability to access “lower” operating system interactions (ability to access a file system, power state changes of a computer, and much more…).

You can create any native application not much different from applications you are using on your computers in your daily life.

That’s it from this part of the tutorial. In the next part, I will show you how to integrate React Library into your Electron app.

If Electron is something that interests you then feel free to check my full course:

Full Course: [Electron & React JS: Build Native Chat App with Javascript](https://academy.eincode.com/courses/electron-react-js-build-native-chat-app-with-javascript)

Youtube Guide: [https://youtu.be/VCl8li22mrA](https://youtu.be/VCl8li22mrA)

Github Repo: [https://github.com/Jerga99/electron-react-boilerplate](https://github.com/Jerga99/electron-react-boilerplate)

Have a nice day!

Cheers,

Filip
