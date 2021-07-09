\[

![stackFAME](https://miro.medium.com/max/284/1*swMzMD4QNvE5GyLpFfJR5Q.png)

\](https://medium.com/stackfame?source=post\_page—–befd31677ec5——————————–)

[![VithalReddy](https://miro.medium.com/fit/c/96/96/1*GlQSX_dAtVf7agV94PlmgA.jpeg)](https://medium.com/@vithalreddy?source=post_page-----befd31677ec5--------------------------------)

![](https://miro.medium.com/max/1108/1*ACjUS_t19OrsP-dDLytV9A.gif)

node.js fs

Do you need to get all files present in the directory or you want to scan a directory for files using node.js, then you’re on the correct web page because in this Nodejs How to Tutorial, we will learning **How to get the list of all files in a directory in Node.js.**

We will be using **Node.js fs core module** to get all files in the directory, we can use following **fs**methods.

- **fs.readdir(path, callbackFunction)** — This method will read all files in the directory.You need to pass directory path as the first argument and in the second argument, you can any callback function.
- **path.join()** — This method of node.js path module, we will be using to get the path of the directory and This will join all given path segments together.

1.  Load all the required Nodejs Packages using **“require”.**
2.  Get the path of the directory using **path.join()** method.
3.  Pass the directory path and callback function in **fs.readdir(path, callbackFunction)** Method.
4.  The callback function should have error handling and result handling logic.
5.  inside callback function **handle the error** and run **forEach** on the array of files list from the directory.
6.  Apply your logic for each file or all the files inside the **forEach** function.

Full code:

first appeared on [Web Development Blog StackFrame](https://stackfame.com/graphql-req-object).

\[

## stackFAME

\](https://medium.com/stackfame?source=post\_sidebar————————–post\_sidebar———–)

StackFAME - Top Quality NodeJS and Web Development…

[![VithalReddy](https://miro.medium.com/fit/c/160/160/1*GlQSX_dAtVf7agV94PlmgA.jpeg)](https://medium.com/@vithalreddy?source=follow_footer-------------------------------------)

Written by

Full Stack Developer and Dreamer.

[![stackFAME](https://miro.medium.com/fit/c/160/160/1*DglaZA08HEi52qKUhU1L8g.jpeg)](https://medium.com/stackfame?source=follow_footer-------------------------------------)

StackFAME - Top Quality NodeJS and Web Development Tutorials

[![VithalReddy](https://miro.medium.com/fit/c/80/80/1*GlQSX_dAtVf7agV94PlmgA.jpeg)](https://medium.com/@vithalreddy?source=follow_footer-------------------------------------)

Written by

Full Stack Developer and Dreamer.

[![stackFAME](https://miro.medium.com/fit/c/80/80/1*DglaZA08HEi52qKUhU1L8g.jpeg)](https://medium.com/stackfame?source=follow_footer-------------------------------------)

StackFAME - Top Quality NodeJS and Web Development Tutorials

Medium is an open platform where 170 million readers come to find insightful and dynamic thinking. Here, expert and undiscovered voices alike dive into the heart of any topic and bring new ideas to the surface. [Learn more](https://medium.com/about?autoplay=1&source=post_page-----befd31677ec5--------------------------------)

Follow the writers, publications, and topics that matter to you, and you’ll see them on your homepage and in your inbox. [Explore](https://medium.com/topics?source=post_page-----befd31677ec5--------------------------------)

If you have a story to tell, knowledge to share, or a perspective to offer — welcome home. It’s easy and free to post your thinking on any topic. [Start a blog](https://medium.com/creator-tools?source=post_page-----befd31677ec5--------------------------------)

Get the Medium app

[![A button that says ‘Download on the App Store’, and if clicked it will lead you to the iOS App store](https://miro.medium.com/max/270/1*Crl55Tm6yDNMoucPo1tvDg.png)](https://itunes.apple.com/app/medium-everyones-stories/id828256236?pt=698524&mt=8&ct=post_page&source=post_page-----befd31677ec5--------------------------------)

[![A button that says ‘Get it on, Google Play’, and if clicked it will lead you to the Google Play store](https://miro.medium.com/max/270/1*W_RAPQ62h0em559zluJLdQ.png)](https://play.google.com/store/apps/details?id=com.medium.reader&source=post_page-----befd31677ec5--------------------------------)
