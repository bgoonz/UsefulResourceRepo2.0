# Create a React Website with an Express backend

> Starting a new project can be difficult, with many tiny but crucial steps. I hope to help you make some very basic scaffolding that will…

[![Richard Rosier](https://miro.medium.com/fit/c/96/96/0*PDADj3TvZl8iBRLo.jpg)](https://medium.com/@jimmyroro58?source=post_page-----24740b0a6f5e--------------------------------)

![](https://miro.medium.com/max/60/0*600bP6rXZkuc_Sna?q=20)

![](https://miro.medium.com/max/12032/0*600bP6rXZkuc_Sna)

Photo by [Joanna Kosinska](https://unsplash.com/@joannakosinska?utm_source=medium&utm_medium=referral) on [Unsplash](https://unsplash.com/?utm_source=medium&utm_medium=referral)

Starting a new project can be difficult, with many tiny but crucial steps. I hope to help you make some very basic scaffolding that will get you started on your website as quickly as possible. We’ll take advantage of create-react-app, tweaking it slightly to give us a backend server we can use.

Create directory
----------------

First, create a new directory and enter it by running the following commands.

mkdir example  
cd example

Then, run this command to initialize your directory with some basic information (leaving off the -y will allow you to manually enter that information):

npm init -y

Create backend
--------------

Next, create a folder called server and a file inside of it called index.js. You can do all this by clicking file, add new folder, etc.., but here are some quick commands to do so instead:

mkdir server  
cd server  
touch index.js  
cd ..

Now that we have an index.js, let’s install Express:

npm install express

And inside the index.js, fill it like so:

const express = require('express');const path = require('path');const app = express();  
// a test route to make sure we can reach the backend  
//this would normally go in a routes fileapp.get('/test', (req, res) => {res.send('Welcome to the backend!')})//Set the port that you want the server to run onconst port = process.env.PORT || 8080;app.listen(port);console.log('App is listening on port ' + port);

We want to be able to run our server with a simple command, so go into the package.json scripts and add this start script:

"scripts": {  
    "server": "node server/index.js"  
  },

At this point you should be able to run the server by typing `npm server` and it should say that the server is listening on the specified port. Go to `localhost:8080/test` to see our “Welcome to the backend” message. Now let’s make our frontend.

Create React frontend
---------------------

The docs for using create-react-app are very [straightforward](https://create-react-app.dev/docs/getting-started/). One line of code will give us everything we need to get started:

npx create-react-app client

`client` is the name of where we want the react app to be created. Because we want our backend and frontend separated, we used `create-react-app` inside a separate folder (client) within our website’s directory (example).

Note that there are [templates](https://www.npmjs.com/search?q=cra-template-*) available for create-react-app, and you can use them by simply running`npx create-react-app <folder-name> <template-name>`

At this point your file tree should look like this:

![](https://miro.medium.com/max/24/1*6JCB6m6JoNWZcUGOQekBPg.png?q=20)

![](https://miro.medium.com/max/520/1*6JCB6m6JoNWZcUGOQekBPg.png)

Connect the two
---------------

The last thing we need to do is make sure our frontend and backend can communicate. The development server is running on localhost:3000 (by default) and our backend server is running on localhost:8080. Because they are different servers, sending a request like `axios.get('/test')` would send the request to localhost:3000/test, rather than localhost:8080/test. So go into the **client/package.json** and add a proxy:

"proxy": "http://localhost:8080",

This proxy will tell React that any unknown requests to localhost:3000 should be sent to localhost:8080. Now we can make requests to our server easily from the frontend.

To test this, we can add a button with a custom function in App.js:

<button onClick={hitBackend}>Send request</button>

And here is the function:

const hitBackend = () => {axios.get('/test').then((response) => {console.log(response.data)})}

Now clicking that button will display a console log of “Welcome to the backend”, so we know that we are hitting our server.

Quality of life additions
-------------------------

You’ll notice that there are two package.json files in this setup. This can get tedious and confusing, as you have to switch directories to do each `npm install` . So I recommend creating a couple scripts in the **root package.json** so you can do everything from there without having to change directories.

"scripts": {  
"server": "node server/index.ts",  
"client": "cd client && npm run start",  
"build:client": "cd client && npm run build",  
"iall": "npm i && cd client && npm i",  
"startboth": "npm run server & npm run client"},

Now you can start and build the client without changing directories, and running `iall` will install everywhere so you don’t forget to do it in both. The `startboth` script will start the server and run it in the background (because of the &), then start the client.

You probably also want to install a linter such as eslint. You’ll need to do these steps both in the **root directory and in the client**:

npm install -D  eslint

The -D installs the package as a developer dependency, meaning it will be purged when you build it, saving space. Next, run

eslint --init

This will ask questions to setup the eslint configuration files. The questions are pretty simple, here are my preferences for this project:

*   **How would you like to use ESLint?** To check syntax, find problems, and enforce style
*   **What type of modules does your project use?** Javascript module (import/export)
*   **Which framework does your project use?** React
*   **Where does your code run?** both
*   **How would you like to define a style for your project?** Airbnb
*   **What format do you want your config file to be in?** JSON

After running that you should see two .eslintrc.json files, and if you make mistakes in your files they will be underlined in red.

At this point we’ve gotten everything set up, so we can actually start coding. After removing some of the files that came with create-react-app, I would save this example as a template, so that you can quickly clone it when you need to spin up another react app. That way you are not constantly spending time creating a new app each time. I hope you found this guide helpful and that it saved you some time.


[Source](https://levelup.gitconnected.com/create-a-react-app-with-an-express-backend-24740b0a6f5e)