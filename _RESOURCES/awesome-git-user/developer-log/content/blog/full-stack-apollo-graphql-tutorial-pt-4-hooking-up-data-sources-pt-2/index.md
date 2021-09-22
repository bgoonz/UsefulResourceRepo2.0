---
title: "Full Stack Apollo GraphQL Tutorial: Part 4 - Hooking Up Your Data Sources - Part 2"
tags: ["react", "nodejs", "graphql"]
published: true
date: "2019-07-25"
---

**Part 4 Prerequisites:** Successful completion of [part 3](https://developer-log.netlify.com/full-stack-apollo-graphql-tutorial-pt-3-hooking-up-data-sources-pt-1/).
<br>

<iframe width="560" height="315" src="https://www.youtube.com/embed/JnLEhfBM_24" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

<br>

In part 3, we built our `QuakeAPI` using the Apollo package `apollo-datasource-rest`. This time we'll use the package `apollo-datasource` to build a custom `UserAPI` data source, so add that dependency now.
<br>

```
npm i apollo-datasource
```

<br>

Our UserAPI will require access to a database where a collection of users is stored. At [this point in the Apollo Docs tutorial](https://www.apollographql.com/docs/tutorial/data-source/#build-a-custom-data-source), you're handed two files, `utils.js` and `user.js` with everything already filled in. For this, tutorial, we're going to build our own `utils.js` and `user.js` files. First, let's create a super-simple mock database. In your server folder, create a file called `db.js`. You're free, of course, to create your own user data, but if you're not into doing that, use the following code.
<br>

_server/db.js_

```
const db = [
    {
        id: "5xc1",
        username: "mbolton",
        email: "mbolton@initech.com",
        password: "abc123",
        records: [
            {
                id: "usc000lv5e",
                magnitude: 5.1,
                location: "76km NNW of Davila, Philippines",
                when: "January 1, 2014 at 9:01 and 16 seconds"
            },
            {
                id: "usc000lv5j",
                magnitude: 4.5,
                location: "163km W of Neiafu, Tonga",
                when: "January 1, 2014 at 9:05 and 28 seconds"
            },
            {
                id: "uw60664271",
                magnitude: 2.2,
                location: "1km NW of Sweet Home, Oregon",
                when: "January 1, 2014 at 9:05 and 55 seconds"
            },
            {
                id: "nc72133841",
                magnitude: 0.57,
                location: "9km WNW of The Geysers, California",
                when: "January 1, 2014 at 9:10 and 10 seconds"
            }
        ]
    },
    {
        id: "5xc2",
        username: "blumbergh",
        email: "wlumbergh@initech.com",
        password: "bossman1",
        records: [
            {
                id: "usc000lv5e",
                magnitude: 5.1,
                location: "76km NNW of Davila, Philippines",
                when: "January 1, 2014 at 9:01 and 16 seconds"
            }
        ]
    },
    {
        id: "5xc3",
        username: "mwaddams",
        email: "mwaddams@zmail.com",
        password: "swingline1",
        records: []
    }
];

module.exports = db
```

<br>

We have three users stored in our database, two of them having saved records to their profiles and one having not. We'll define methods for accessing our database information in the `user.js` file (`UserAPI`), but instead of touching the database directly in `user.js`, we'll create a store where we can keep the data we'll want. We'll do that in our `utils.js` file, so let's create that now.
<br>

_server/utils.js_

```
const db = require("./db")

```

<br>

If we were using, say, MongoDB, we could get the users from the database with Mongoose using the `Model.find()` method; however, we're not, so we have to create our own methods, which isn't hard at all. For now, we'll just create the method that gets all the users from the database.
<br>

_server/utils.js_

```
const db = require("./db")


module.exports = {
    createStore: () => {
        const users = db.map(user => {
            return user
        })

        return { users }
    }
}
```

<br>

Easy enough, right?
<br>

Now, let's hook this up to our `UserAPI`.
<br>

_server/datasources/user.js_

```
const { DataSource } = require("apollo-datasource")

class UserAPI extends DataSource {
    constructor({ store }) {
        super()
        this.store = store
    }

    initialize(config) {
        this.context = config.context
    }

    async getUsers() {
        const users = this.store.users
        return users
    }
}

module.exports = UserAPI
```

<br>

**What's Going On?**
<br>
We bring in the `DataSource` class from the `apollo-datasource` package and extend it to build our `UserAPI`. In the constructor, we pass in `store`, which we'll get from Apollo Server by creating an instance of `createStore` in `server/index.js`. As for the following bit:
<br>

```
 initialize(config) {
        this.context = config.context
    }
```

<br>

Apollo Docs says:

> - _The `initialize` method: You'll need to implement this method if you want to pass in any configuration options to your class. Here, we're using this method to access our graph API's context._
> - _`this.context`: A graph API's context is an object that's shared among every resolver in a GraphQL request. We're going to explain this in more detail in the next section. Right now, all you need to know is that the context is useful for storing user information._

The `getUsers()` method in our `UserAPI` is pretty straightforward; we get the list of users from `store` and return that list.
<br>

So, now we need to add our `UserAPI` data source to our Apollo Server.
<br>

_server/index.js_

```
const { ApolloServer } = require('apollo-server')
const typeDefs = require('./schema')
const resolvers = require('./resolvers')
const { createStore } = require("./utils")

const QuakeAPI = require('./datasources/quake')
const UserAPI = require("./datasources/user")

const store = createStore()

const server = new ApolloServer({
    typeDefs,
    resolvers,
    dataSources: () => ({
        quakeAPI: new QuakeAPI(),
        userAPI: new UserAPI({ store })
    })
});

server.listen().then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
});
```

<br>

**What's Going On?**
<br>
We bring in `createStore` from our `utils.js` file and create and instance of it called `store`. We also bring in our `UserAPI` from our `user.js` file and create an instance of it in Apollo Server with `store` passed in as a parameter (Now we finally see where `store` gets passed into our `UserAPI`). All we need to do now, if we want to see our list of users on the front-end (in this case, all we've got is GraphQL Playground, but that's good enough for now), is update our schema and our resolvers.
<br>

First, update your `Query` type in `typeDefs`.
<br>

_server/schema.js_

```
type Query {
    quakes: [Quake]!
    quake(id: ID!): Quake
    users: [User]
    # Queries for the current user
    me: User
}
```

<br>

Then, update your `Query` resolvers.
<br>

_server/resolvers.js_

```
Query: {
    quakes: (_, __, { dataSources }) =>
        dataSources.quakeAPI.getAllQuakes(),
    quake: (_, { id }, { dataSources }) =>
        dataSources.launchAPI.getQuakeById({ quakeId: id }),
    users: (_, __, { dataSources }) =>
        dataSources.userAPI.getUsers()
}
```

<br>

If you run a query for `users` in GraphQL Playground, you should be able to see them all now.
<br>

So, that's it for this part. Next time, we'll add pagination to our app to make sure the server only sends data to the client in small amounts. See you there!
