[![VithalReddy](https://miro.medium.com/fit/c/96/96/1*GlQSX_dAtVf7agV94PlmgA.jpeg)](https://medium.com/@vithalreddy?source=post_page-----105749e90040--------------------------------)

[Node.js](https://stackfame.com/nodejs) is very popular nowadays because of it’s feature like:

- JavaScript runtime built on [Chrome’s V8 JavaScript engine](https://developers.google.com/v8/)
- Node.js uses an event-driven, non-blocking I/O model
- Which makes it lightweight and efficient
- Node.js’ package ecosystem, [**npm**](https://stackfame.com/npm), is the largest ecosystem of open source libraries in the world.

Because of these features, Node.Js because very popular in no time and Now its developer’s favorite language for developing Rest APIs and Building high scaling apps.

So, Today in this How to Guide, we will be discussing all the methods for updating NodeJs to Latest version in Linux Os, Ubuntu Os, Windows 7, 8, 10 and Mac Osx using NVM (Node Version Manager) and NPM (Node Package Manager). And At last, we will discuss **Best way to update Node.JS**

**NVM installation:**

Go to NVM’s [official documentation](https://github.com/creationix/nvm/blob/master/README.md) and install the script using curl or wget method.

Verify installation by using the following command,

command -v nvm

Steps to update Node.JS using NVM:

When you’re working with multiple Node.Js utilities, sometimes you need some specific Node.js version installed, for this purpose nvm is the best option as we show the procedure below:

nvm install 10.2.0

and, you can easily switch:

nvm use 12

You can check what versions are currently installed with nvm ls and see what is available to install by using nvm ls-remote and you can even set default version using nvm alias default node

If you want to uninstall some version, use nvm uninstall 4.1.2

By NVM can be your Buddy if you’re troubleshooting your node.js app and you need to switch between versions.It has a lot of built-in utilities go and check it’s documentation fellas.

[**READ** How To Deploy Node.js App on Ubuntu with Forever and Nginx](https://stackfame.com/deploy-nodejs-app-on-ubuntu-with-forever-and-nginx)

- First Check the version of installed npm using `npm -v` and then update it to latest version using npm install npm@latest -g
- To update Node, you’ll need npm’s handy [n module](https://www.npmjs.com/package/n). Run this code to clear npm’s cache, install n, and install the latest stable version of Node:
- sudo npm cache clean -f sudo npm install -g n sudo n stable
- To install the latest released version, use n latest . Alternatively, you can run n \#.\#.\# to get a specific Node version.

- Go to NodeJs [Download page](https://nodejs.org/en/download/), download any release you want and install it using installer for your windows or macOs.
- After installing you can verify, installation using
- npm -v node -v
- And,

You’re done, Now you have successfully installed Node.Js and NPM on your Windows or Mac Os uisng official installers.

Now, Coming to Best way to update Your Node.JS:

The best way is to use NVM, as it provides lot of built-in utilities, which are well documented and tested.

If you get any error during installation or update process, please leave the comment below and we will solve it for you.

first appeared on [stackfame.com](https://stackfame.com/update-node-js-latest-version)
