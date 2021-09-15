---
title: "Full Stack Apollo GraphQL Tutorial: Part 1 - The Setup"
tags: ["react", "nodejs", "graphql"]
published: true
date: "2019-07-17"
---

**Full Project Prerequisites:** Ability to build a full-stack web app using Node and React, and a basic understanding of what GraphQL is. For further info, follow this link: [What is GraphQL?](https://graphql.org/)<br>
**Part 1 Prerequisites:** Ability to set up a Node.js server with a framework such as Express.
<br>

<iframe width="560" height="315" src="https://www.youtube.com/embed/h-ZCVUAzR-0" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

<br>

Apollo GraphQL is an excellent platform for building full-stack GraphQL web applications, and [Apollo Docs](https://www.apollographql.com/docs/) has a full-stack tutorial to help new users get started. This tutorial loosely parallels that one; however, this one should be a bit easier to follow. Our example app won't be anywhere near as cool or as good-looking as the one in the Apollo Docs tutorial, but you'll be able to write your own Apollo-React-Node project boilerplate code by the time you're done with this one.

###Simple Overview###

We'll use two data sources for our project, one an external API and the other an internal API. The external API comes from the US Geological Survey (USGS) and returns earthquake data. The internal one _we'll_ make, and it'll be an API that returns information about registered users of the app, such as a user name, an email address, a user id, and a list of saved events (earthquakes). Also, since GraphQL is database-agnostic, we'll write a simple mock database along with data retrieval functions, and forgo the use of something like MongoDB or an SQL database. Finally, we won't be using a state container like Redux for our project; we'll take advantage of the way Apollo Client allows us to manage local state in the Apollo cache and query it in parallel with remote data using GraphQL.

###Getting Started###
**Note:** _We'll be using npm here. Feel free, of course, to use your package manager of choice._

Create a new project directory and initialize it. Call your project anything you like, the cheesier the better.

```
$ mkdir quakehunter && cd quakehunter
$ npm init -y
```

<br>

**Apollo Server Setup**

Install two dependencies, `apollo-server` and `graphql`

```
$ npm i apollo-server graphql
```

<br>

In the project root, make a directory called `server` and add a file called `index.js`.

```
~~/quakehunter
$ mkdir server && cd server
$ touch index.js
```

<br>

Though we'll only be dealing with the server side for the next several parts of the tutorial, let's add a `client` folder in the project root as sort of a placeholder, so we can see our basic project structure.

```
$ cd ..
$ mkdir client
```

<br>

Your project file structure should now look like this:

```
📦quakehunter
 ┣ 📂client
 ┣ 📂node_modules
 ┣ 📂server
 ┃ ┗ 📜index.js
 ┣ 📜.gitignore
 ┣ 📜package-lock.json
 ┗ 📜package.json
```

<br>

Add the following code to `server/index.js`
<br>

_server/index.js_

```
const { ApolloServer } = require('apollo-server');
const typeDefs = require('./schema');

const server = new ApolloServer({ typeDefs });
```

<br>

**What's Happening:**
<br>
We bring in the apollo-server and create an instance of it. We also import our graphql schema and make ready to use the type definitions from it. Note that we have to pass in our type definitions as the parameter `typeDefs` to our Apollo Server.

**typeDefs**
<br>
With GraphQL, you'll deal with several _types_. There are 'query' types, 'mutation' types, and what you'd normally consider object types in JavaScript, for example. In the case of an object type, you can loosely compare them to schemas in Mongoose. Let's add our type definitions to `schema.js`. In your server folder, create the `schema.js` file and add the following code:
<br>

_server/schema.js_

```
const { gql } = require('apollo-server');

const typeDefs = gql``;

module.exports = typeDefs;
```

<br>

**Whoa! What The @#!% is Going On?!**
<br>
Okay, let's slow things down a bit and talk a little more about what we're doing and why we're doing it. About the schema, according to Apollo Docs:

> **--** _Every graph API is centered around its schema. You can think of a schema as a blueprint that describes all of your data's types and their relationships. A schema also defines what data we can fetch through queries and what data we can update through mutations. It is strongly typed, which unlocks powerful developer tooling._
> <br>

Oftentimes, the response you get when making a request can be unsatisfying; you just can't get what you want in the way that you want it. This is as much true of life in general as it is of web development.
<br>

With GraphQL, you don't have to worry about that, though.
<br>

How does it all work?
<br>
Well, to help get your head around it, it might be useful to create your own abstract visualization. For now, maybe you could think of our Apollo Server creating a data cloud that envelops our entire app, grabs all the data we'll need and makes it 'magically' ready in the cloud, so that when it's needed our app can just grab the bits of data it wants and use them quickly. More realistically speaking, our GraphQL server fetches all the data we could possibly need in our app and processes it as soon as it's up and running, making that data available for querying with a very simple and intuitive query pattern. When our app needs the data, the waiting time for a response from a source API is cut out because the call has already been made by Apollo Server. There's no waiting time for that response (which may be oversized for our needs) to be processed either because, as you may have guessed, that too has been taken care of. The only waiting time we need to worry about is the time it takes to get the data from our App's graph (created by the GraphQL server, it's what we have abstractly thought of as a 'cloud').

In short, we'll be able to get just the data we want through very simple queries on the front end. However, on the back end, we'll have to tell our GraphQL server (Apollo Server in this case) how to extract the data from the various responses it'll get from our data-source API requests so it can give us exactly what we need. It's not all magic, you know... &#128580;

Anyway, in our `schema.js` file we import `gql` and use the [schema definition language (SDL)](https://graphql.org/learn/schema/#type-language) between the backticks to define our types. Initially, we want to fetch a list of earthquakes that occurred within a range of dates (which can be specified in the request to the API) and we want a user to be able to add quakes of interest to a list attached to their profile. So, for now we'll fill in our `schema.js` file in the following way (between the backticks!):
<br>

**The Query Type**
<br>
\*server/schema.js`

```
type Query {
  quakes: [Quake]!
  quake(id: ID!): Quake
  # Queries for the current user
  me: User
}
```

<br>

The `quakes` query returns a list of quakes. `[Quake]` is an array of Quake objects (we'll define the Quake type shortly). This array can't be null because we've designated it non-nullable by adding the exclamation mark (Types in GraphQL are nullable by default). The `quake` query returns an individual Quake event. This query requires an id paramater. The `me` query returns the current user's information.
<br>

**The Quake Type**
<br>
_server/schema.js_

```
type Quake {
  id: ID
  magnitude: Float
  location: String
  when: String
  time: String
}
```

<br>

Notice how the Quake type slightly resembles a schema in Mongoose. The differences, however, are easy to see. For example, after each key-value pair, no comma is necessary.
<br>

**The User Type**
<br>
_server/schema.js_

```
type User {
  id: ID!
  username: String!
  email: String!
  password: String!
  records: [Quake]
}
```

<br>

This one's fairly easy to follow if you were able to get the ones above. The `id`, `username`, `email`, and `password` fields are all required ones. `records` is an array of Quake events that the user has saved to their profile.
<br>

**The Mutation Type**
<br>
_server/schema.js_

```
type Mutation {
  # if false, saving record failed -- check errors
  saveRecord(recordId: ID! recordWhen: String): RecordUpdateResponse!

  # if false, deleting record failed -- check errors
  deleteRecord(recordId: ID!): RecordUpdateResponse!

  login(email: String): String # login token
}
```

<br>

The `saveRecord` mutation does exactly what the name implies, it saves a record of a quake of specific interest to the user. The `deleteRecord` mutation deletes a specific record the user no longer wishes to have in the `records` list. We've made it so both of these mutations provide a response to show a user whether their list of records has been updated or not. That response has a type as well.

**The RecordUpdateResponse Type**
<br>
_server/schema.js_

```
type RecordUpdateResponse {
  success: Boolean!
  message: String
  records: [Quake]
}
```

<br>

Returned upon attempting to save or delete a record, we get an indication of success or failure, a message related to that indication, and a current list of records for the current user.
<br>

Our `schema.js` file should now look like:
<br>
_server/schema.js_

```
const { gql } = require('apollo-server');

const typeDefs = gql`
    type Query {
        quakes: [Quake]!
        quake(id: ID!): Quake
        # Queries for the current user
        me: User
    }

    type Quake {
        id: ID
        magnitude: Float
        location: String
        when: String
        time: String
    }

    type User {
        id: ID!
        username: String!
        email: String!
        password: String!
        records: [Quake]
    }

    type Mutation {
        # if false, saving record failed -- check errors
        saveRecord(recordId: ID! recordWhen: String): RecordUpdateResponse!

        # if false, deleting record failed -- check errors
        deleteRecord(recordId: ID!): RecordUpdateResponse!

        login(email: String): String # login token
    }

    type RecordUpdateResponse {
        success: Boolean!
        message: String
        records: [Quake]
    }
`;

module.exports = typeDefs;
```

<br>

**Running the Apollo Server**
<br>
We're about ready to run our server; we just need to update the code in our server's `index.js` file.
<br>
_server/index.js_

```
const { ApolloServer } = require('apollo-server');
const typeDefs = require('./schema');

const server = new ApolloServer({ typeDefs });

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
```

<br>

If you've set up an Express server in Node before, the bit we've just added should look quite familiar.
<br>

Also, let's add a `server` script to our `package.json` file so that we can run our server independently.
<br>
_package.json_

```
{
  "name": "quakehunter",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "server": "cd server && nodemon index.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "apollo-server": "^2.7.0",
    "graphql": "^14.4.2"
  }
}
```

<br>

Now, run the server.

```
$ npm run server
```

<br>

Hopefully, you see in the console:

```
🚀 Server ready at http://localhost:4000/
```

<br>

If not, debug time for you. Good luck!
<br>

So, we've done the basic setup for our project. In the next part, we'll explore what things will look like from the front end with [GraphQL Playground](https://github.com/prisma/graphql-playground). See you there!
