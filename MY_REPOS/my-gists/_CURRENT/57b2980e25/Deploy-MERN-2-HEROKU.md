# How To Deploy a Full-Stack MERN App with Heroku/Netlify

> This post is intended to be a guide for those that want to deploy a full-stack MERN app. It will be v...

![Cover image for How To Deploy a Full-Stack MERN App with Heroku/Netlify](https://res.cloudinary.com/practicaldev/image/fetch/s--y8i0Pv96--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/i/jy1eavpf2fm467w8uopz.jpeg)

 [![stlnick profile image](https://res.cloudinary.com/practicaldev/image/fetch/s--l5ouojJb--/c_fill,f_auto,fl_progressive,h_50,q_auto,w_50/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/420087/17853aea-aa22-4f9f-ac6a-6ceb9a501d3e.jpg) Nick](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/stlnick)  Aug 29, 2020 ・_Updated on Aug 31, 2020_ ・12 min read  

This post is intended to be a guide for those that want to deploy a full-stack MERN app. It will be very specific on steps so it's a bit of a read, however, it will ensure there is minimal to no confusion on how to get from point A to point B.

Feel free to hop around if you've got some of these steps done, know how to do them already, what have you.

If this is your first time _don't intimidate yourself!_ Just read and complete each step **one at a time**.

**NOTE**: This guide is based on _my specific project structure_ and this works well for it. There are definitely other ways to deploy _and_ other ways people prefer to have their project structured.

[](#project-context)Project Context
-----------------------------------

So you've got a cool project you'd like to show off to the world, how do we deploy a full-stack MERN app?

Let's first get some basics out of the way and context on how I did this: my project structure, basic configuration, and why I chose this way of deployment.

### [](#what-is-mern)**What is MERN**?

MERN stands for **MongoDB - Express - React - Node**.

*   MongoDB for the database
*   Node & Express for the server-side
*   React for the client-side

There's also the MEAN stack, which uses Angular instead of React, and the... MEVN(?) stack... whatever, it uses Vue instead of React or Angular.

### [](#project-structure)**Project Structure**

One thing that is definitely dev to dev, company to company, is how we structure our project as a whole. By this I mean where our directories are in relation to each other. Here is my fully collapsed root directory to show you the top-level:

[![Root directory structure](https://res.cloudinary.com/practicaldev/image/fetch/s--z8m6KIip--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/i/r5a5u5mpha2066whz3gl.png)](https://res.cloudinary.com/practicaldev/image/fetch/s--z8m6KIip--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/i/r5a5u5mpha2066whz3gl.png)

Just three things:

*   My VS Code settings and extensions JSON files
*   Client-Side Code
*   Server-Side Code

I like this structure because to me there's a clear separation of responsibilities. It makes it easier for me to work on one or the other by just collapsing that whole folder. For instance if there's some UI feature I want to add/fix/alter then I have no reason to open my `server` directory.

I feel it makes it logical and simple to work with. Again, this is absolutely personal preference. This is also a big reason why this project was deployed in the way this guide will describe.

### [](#some-options-for-deployment)**Some Options for Deployment**

Credit to Dave Ceddia for putting this list together - this was found [in a blog post](https://daveceddia.com/deploy-react-express-app-heroku/) of his.

1.  Keep `client` and `server` together
    *   Your Express and React files will live on the same machine and Express will both serve your API requests **and** the React files as well
2.  Put your API behind a proxy
    *   This will allow your Express and React files to still live on one machine but each will be served by a different server
3.  Split `client` and `server` apart _(the option for this guide)_
    *   Host your Express API on one machine and the React App on another

Deployment is not something I have a ton of experience with so the first two options I've never attempted.

I do know that in some cases for deployment on one machine a lot of devs must nest their entire `client` directory **inside of** `server`. This was a big reason I went the route I did for deployment because for me I wanted to keep the structure pictured above with a clear separation of client-side code and server-side code.

### [](#project-configuration)**Project Configuration**

The base of the project I deployed was the Create-React-App, which comes with a `webpack.config.js` and other basic configurations out of the box, for the front-end.

I also used Webpack for the `server` directory as well to allow all those beautiful `import`s and `export`s to work for me and allow me to separate responsibilities on the server-side.

Here's a shot of the `client` and `server` directories expanded just to show you how I have it setup. There's only a couple things that will _need to be there_ for this project structure to work which I'll point out.

[![Expanded root directory](https://res.cloudinary.com/practicaldev/image/fetch/s--K1tSNzwe--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/i/n4igseg6h83wfz3vyzwv.png)](https://res.cloudinary.com/practicaldev/image/fetch/s--K1tSNzwe--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/i/n4igseg6h83wfz3vyzwv.png)

Each directory, `client` and `server`, needs:

*   `.gitignore`
    *   To ignore the files and directories we don't want stored in our repo
*   `package.json`
    *   To specify our separate `dependencies` and `devDependencies`
*   `webpack.config.js`
    *   The `client` **doesn't have one** because Create-React-App again provides one out of the box so I didn't need to specify it there

You may have noticed I have a `yarn.lock` inside `client` and a `package-lock.json` inside `server`. I intentionally use `yarn` for client-side and `npm` for server-side because it helps me just keep those separate in my mind. I know if I'm using `yarn` then I'm in `client` and if I'm using `npm` I'm in `server`. Once again just a personal preference - you could use `yarn` or `npm` for both and have no issues.

You may have also noticed the `Procfile` which we'll get to later in the guide. As a teaser this will be needed by Heroku to deploy our `server` code which is why it lives inside of `server`.

Now that we have some context on how my project is setup let's talk about the actual process of deploying.

[](#deployment-process)Deployment Process
-----------------------------------------

What we're going to do specifically is host our `server` code on Heroku and our `client` code on Netlify. So our React App hosted on Netlify will make API requests to our Express API hosted on Heroku.

This will assume that you have both `client` and `server` running correctly and that you have _already connected your app to a hosted database on MongoDB_.

### [](#steps)**Steps**

1.  [Create a Netlify account](https://app.netlify.com/signup) or sign in if you have one
    
2.  [Create a Heroku account](https://signup.heroku.com/login) or sign in if you have one
    
3.  [Install the Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli#download-and-install)
    
    *   There is instructions on how to do this for both Mac and Windows in this linked article
4.  Go to your terminal and type `heroku login`
    
    *   This will prompt you to press any key, once you do it will take you to your browser where you will just need to click 'Log In'.
    *   Once this is successful you can close that browser window and **navigate to your text editor now with your project open**
5.  Create a file named `Procfile`, **no file extension**, in `/server` directory.
    
    *   Include this text and **this text only** in the `Procfile`
        *   `web: node dist/main.js`
    *   This tells Heroku what to do after building our app - which specifically is to run our bundled file from webpack with all of our server logic inside it
    *   If we didn't include this it would likely build just fine but never actually start our server
6.  Now we must add to our `server/package.json` the following block:
    
    *   You can more than likely add this anywhere (not nested in any other property) but I added it right below the `"main"` property near the top in the `server/package.json`.
    *   Recommended to check your node and npm versions first to know which versions to put in this next block. While it likely won't break your app with a slightly different version it is safer to specify the versions you used in development to prevent unexpected behavior.
    *   `node -v` or `node --version` to check your Node version
    *   `npm -v` or `npm --version` to check your npm version
    *   Add those versions that return to this `engines` property if they're different than mine.
    *   I used `"14.x"` for `node` to say, "As long as the major version of Node is 14 then use the latest minor version. Major version releases are when they're likely to be _breaking changes_ which we want to avoid.
    
        "engines": {
            "node": "14.x",
            "npm": "6.14.7"
        },
        
    
7.  We need to allow access to your MongoDB database now from a new IP address. For simplicity, I added all IP addresses to be allowed.
    
8.  In development I had the express server listen to `localhost:5000` to run there and my react app ran on port `3000`. We must change what this Express server will listen for to `app.listen(process.env.PORT || 5000)`
    
    *   So this will tell the server to listen to the `.env` environment variable `PORT` which **_we should not have set in our own_** `.env` _file_. OR it will listen to port 5000.
    *   The `process.env.PORT` will be set by Heroku's `.env` - they essentially will tell our server which port to listen to.
    *   If there is no such `process.env.PORT`, in other words there is no `.env` file that has been configured, then it will default to `5000`. This will allow us to keep that code in _and_ be able to run it in our local development environment on port `5000` because we _do not_ have a `.env` variable `PORT`.
    
        // server.js
        
        /*
          Other code...
        */
        
        app.listen(process.env.PORT || 3000);
        
    
    * * *
    
    **Ensure in your terminal that you are inside the _root_ of the project you are deploying for these next two steps**
    
    * * *
    
9.  Now back inside your Terminal the next command we type is `heroku git:remote -a <project-name>`. Replace `<project-name>` with really whatever name you want - I recommend the name of your project to keep it simple. So for example it will look like `heroku git:remote -a my-project`.
    
    *   This is going to create a remote connection with Heroku specifically and also create a branch on that remote for you and your app name will be the name you provided, such as `my-project` above. Next we're going to actually `push` our server code to that remote Heroku branch.
    
        heroku git:remote -a my-project
        
    
10.  The command we need to push our `server` code specifically, because we have the separation of `client` and `server` in our project structure, is `git subtree push --prefix server heroku master`
    
    *   This is telling git to push a subtree, or in other words a _subdirectory_, from our current git repo. The `--prefix` flag comes before that subdirectory that we want to push, in our case it is `server`. And lastly we're telling it to push to the remote `heroku` our `master` branch.
    
        git subtree push --prefix server heroku master
        
    
    * * *
    
    **IF you want to test and ensure that you've deployed your server to Heroku just add in a test route in your `server.js` like:**  
    
        app.get('/', (req, res) => { res.send('Hello from Express!')
        
    
    You can view your app by:  
    \- Copy and pasting the url that will appear in your Terminal after successfully pushing your code to the remote Heroku branch  
    \- Navigating to your project on [the Heroku website](http://heroku.com/) and there will be a button that says 'View App' - click it and it will take you there
    
    *   If you see the 'Hello from Express!' (or whatever test message you used) then that means your server is running correctly
    
    * * *
    
11.  Now for our MongoDB connection to work we must define an environment variable for Heroku to store our MongoDB connection string.
    
    > We want to keep our connection string secret as we don't want anybody able to connect to our database and change, delete, add things etc.  
    > In our local build the connection string, is stored in our `.env` file inside of `/server`. I named by connection string `MONGODB_URI`. You can do this next step on the Heroku CLI or on the Heroku website.  
    > I recommend the website it's more straightforward and you don't have to worry about escaping special characters. I'm going to describe the next steps going through the website.
    
    *   Navigate to your dashboard on Heroku
    *   Click on your project name that will be present from our previous steps where we created our remote branch and pushed the code
    *   Navigate to the Settings tab near the top
    *   The second section is 'Config Vars' - click on 'Reveal Config Vars'
    *   You'll see two inputs:
        *   One is the name of your environment variable - name this **whatever you have it named in your local build**. For me that is `MONGODB_URI`.
        *   Second is the value - paste your whole connection string here that you should copy from your `.env` file directly to avoid any typos.
    *   Then just click 'Add' and our MongoDB connection environment variable is set. ![Heroku site config vars](https://res.cloudinary.com/practicaldev/image/fetch/s--D4fJ2hPQ--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/i/7ewhhh5fybrk94691c6i.png)
    
    * * *
    
    Our `server` code is officially deployed and configured correctly. Now onto the `client` code with Netlify.
    
    * * *
    
12.  Next is to deploy the front-end React code in `/client` to Netlify. Login to Netlify if you haven't already, the default tab should be `Sites` or just navigate to that tab.
    
13.  **LASTLY** after we deploy our front-end React code we must ensure _any requests_ we're sending from the client-side is changed to use our Heroku URL now instead of localhost.
    
    *   In my structure the requests were being made from `client/api/index.js` so navigate to that file and _any request that contains_ `http://localhost:5000` must be replaced by your Heroku URL.
    
        // Before
        const res = await fetch('http://localhost:5000/scores/'
        
        // After
        const res = await fetch('https://my-project.herokuapp.com/scores/')
        
        // 'my-project' in the URL will either be the auto-generated
        // name from Netlify or if you changed the name it will
        // be the name you gave it
        
    

**Ensure that you push these changes up to GitHub.** Netlify will trigger a redeploy when they detect changes to your `master` branch. So for this to work you must make those changes apparent to Netlify essentially.

Now any request, instead of going to your local server you've ran while developing, will go to the hosted server you just deployed to Heroku with all of your Express Routes still intact and functioning properly.

* * *

It's undoubtedly a long process to get this done. But the important thing is that _it can be done_!

It's awesome to see the things we build on our local machine in development. After this though you can send a _live link_ to your friends, colleagues, etc. for them to check it out!

This is awesome to have a live example as well for anyone looking for a job. Being able to not only have a link on your Resume or Portfolio site to the code on GitHub but for recruiters, managers, whoever to be able to see the project in action _is huge_!

[](#let-me-know-in-the-comments)Let me know in the comments...
--------------------------------------------------------------

... how you like to deploy! Link me an article, give me a brief overview, or whatever you want. I'd love to hear of the other ways devs get their projects out there for the world to see and enjoy!


[Source](https://dev.to/stlnick/how-to-deploy-a-full-stack-mern-app-with-heroku-netlify-ncb)