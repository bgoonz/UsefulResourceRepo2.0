---
title: "Full Stack Apollo GraphQL Tutorial: Part 5 - Pagination"
tags: ["react", "nodejs", "graphql"]
published: true
date: "2019-08-05"
---

**Part 5 Prerequisites:** Successful completion of [part 4](https://developer-log.netlify.com/full-stack-apollo-graphql-tutorial-pt-4-hooking-up-data-sources-pt-2/).
<br>

<iframe width="560" height="315" src="https://www.youtube.com/embed/wlkk3OBdC1U" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

<br>

Now that we have our data sources hooked up, let's deal with handling large data sets. If we load a large data set in one go, the user may have to wait an unacceptable amount of time before being able to interact with the data. Most of us are familiar with the experience of having to wait for a page to display correctly while it loads. With pagination, we can load our data to the page we'll display it on in small chunks, say, 20 items at a time. In our application, one item is one record of an earthquake event.
<br>

First, go to your `quakeAPI` file and update one of our custom data parameters. In the `quakeReducer`function, change the `time` property to `cursor`.
<br>

_server/datasources/quake.js_

```
...
return {
    magnitude: quake.properties.mag,
    location: quake.properties.place,
    when: datestring,
    cursor: `${timestamp}`,
    id: quake.id
};
```

<br>

Recall, we defined `timestamp` when building our custom data response; `const timestamp = quake.properties.time`.
<br>

Next, update your schema.
<br>

_server/schema.js_

```
type Quake {
  id: ID!
  location: String
  magnitude: Float
  when: String
  cursor: String
}
```

<br>

From [Apollo Docs (Paginated Queries)](https://www.apollographql.com/docs/tutorial/resolvers/#paginated-queries), you can get the code we'll need to update our `Query` type's `quakes` query. Just change the bits about launches to quakes and you're good to go.
<br>

_server/schema.js_

```
  type Query {
    quakes( # replace the current quakes query with this one.
    """
    The number of results to show. Must be >= 1. Default = 20
    """
    pageSize: Int
    """
    If you add a cursor here, it will only return results _after_ this cursor
    """
    after: String
  ): QuakeConnection!
    quake(id: ID!): Quake
    users: [User]
    # Queries for the current user
    me: User
}

"""
Simple wrapper around our list of quakes that contains a cursor to the
last item in the list. Pass this cursor to the quakes query to fetch results
after these.
"""
type QuakeConnection { # add this below the Query type as an additional type.
  cursor: String!
  hasMore: Boolean!
  quakes: [Quake]!
}
```

<br>

After updating the schema, you'll need to update `server/utils.js` to include the pagination logic (below is the completely updated file).
<br>

_server/utils.js_

```
const db = require("./db")

module.exports = {
    paginateResults: ({
        after: cursor,
        pageSize = 20,
        results,
        // can pass in a function to calculate an item's cursor
        getCursor = () => null,
      }) => {
        if (pageSize < 1) return [];

        if (!cursor) return results.slice(0, pageSize);
        const cursorIndex = results.findIndex(item => {
          // if an item has a `cursor` on it, use that, otherwise try to generate one
          let itemCursor = item.cursor ? item.cursor : getCursor(item);

          // if there's still not a cursor, return false by default
          return itemCursor ? cursor === itemCursor : false;
        });

        return cursorIndex >= 0
          ? cursorIndex === results.length - 1 // don't let us overflow
            ? []
            : results.slice(
                cursorIndex + 1,
                Math.min(results.length, cursorIndex + 1 + pageSize),
              )
          : results.slice(0, pageSize);
      },
    createStore: () => {
        const users = db.map(user => {
            return user
        })
        return { users }
    }
}
```

<br>

**What's going on?**
<br>
The function `paginateResults` takes in four parameters, `after`, `pageSize`, `results`, and the function `getCursor`. `after` is a value you pass in that is equal to the `cursor` attached to a quake event. It's a marker that will allow you to load the next twenty quake events after the last one displayed in the previous twenty. It would put a placeholder on the twentieth element so that the next twenty will start with the twenty-first element in the overall quake list, which in some cases may be several hundred quake objects (events) in length. `pageSize` lets you choose how many quake events should be displayed at one time. `results` is the overall quake list returned from the USGS Earthquake Catalog. `getCursor` would be a function that would generate a cursor if none were available on an item. We won't be dealing with such cases in this tutorial.
<br>

`after` is the cursor value we pass in. If we don't pass in a value, `(!cursor)` is truthy, and only the first twenty items in the `results` quake list are displayed. If we do pass in a value for `after`, there is a cursor, so we get a value called `cursorIndex` by using the JavaScript function `findIndex` [(See the documentation)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex). Once we get the `cursorIndex`, we check where we are in the `results` list. If we're at the end of the list, we return no more data. If not, we return either the next twenty items, or the remaining items in the list, whichever is fewer in number. If we aren't able to find a cursor that matches the one we pass in, we just display the first twenty items.
<br>

Finally, we update our `quakes` resolver.
<br>

_server/resolvers.js_

```
...
quakes: async (_, { pageSize = 20, after }, { dataSources }) => {
    const allQuakes = await dataSources.quakeAPI.getAllQuakes();
    // we want these in reverse chronological order
    allQuakes.reverse();
    const quakes = paginateResults({
        after,
        pageSize,
        results: allQuakes
    });
    return {
        quakes,
        cursor: quakes.length ? quakes[quakes.length - 1].cursor : null,
        // if the cursor of the end of the paginated results is the same as the
        // last item in _all_ results, then there are no more results after this
        hasMore: quakes.length
        ? quakes[quakes.length - 1].cursor !==
            allQuakes[allQuakes.length - 1].cursor
        : false
    };
},
```

<br>

**What's going on?**
<br>
We get the entire list of quakes, pass it into the function `paginateResults` as `results` along with `pageSize` and `after`, which get passed into our resolver from the client side. After displaying a page of quakes (if there were any to display), we set the cursor equal to the cursor value of the last element displayed on that page (or in that batch if we're loading the next twenty below the first twenty on the same page). If there weren't any quakes to display, the cursor is set to `null`. We check the cursor value of the last item (quake) displayed and we check the cursor value of the last item in the overall list. If the two cursor values are different, there are more results to be displayed. If they're the same, then we've reached the end of our list and can't display any more quakes.
<br>

Now, in GraphQL Playground, you can run the following query:
<br>

_GraphQL Playground_

```
query {
  quakes {
   cursor
    hasMore
    quakes {
      magnitude
      location
      when
      cursor
    }
  }
}
```

<br>

The first `cursor` value displayed (only one time and at the top of your query results) should match the `cursor` value attached to the last item displayed. There should only be twenty quakes displayed. If you pass the `cursor` value into your query as the `after` value, you should see the next twenty quakes in the overall list.
<br>

_GraphQL Playground_

```
query {
  quakes (after: "1388540766560") {
   cursor
    hasMore
    quakes {
      magnitude
      location
      when
      cursor
    }
  }
}
```

<br>

Of course, if your request to the Earthquake Catalog API is different than the one we've been using in this tutorial, you'll pass in a different cursor value.
<br>

So, that's it for pagination for now. The complete updated files for this part are given below.
<br>

_server/datasources/quake.js_

```
const { RESTDataSource } = require('apollo-datasource-rest');

class QuakeAPI extends RESTDataSource {
    constructor() {
        super();
        this.baseURL = 'https://earthquake.usgs.gov/fdsnws/event/1/';
    }

    async getAllQuakes() {
        const query = "query?format=geojson&starttime=2014-01-01&endtime=2014-01-02"
        const response = await this.get(query);
        return Array.isArray(response.features)
            ? response.features.map(quake => this.quakeReducer(quake))
            : [];
    }

    quakeReducer(quake) {

        const date = new Date(quake.properties.time)
        const year = date.getFullYear();
        const month = monthName(date.getMonth())
        const day = date.getDate();
        const hour = date.getHours();
        const minute = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
        const seconds = date.getSeconds();
        const datestring = `${month} ${day}, ${year} at ${hour}:${minute} and ${seconds} seconds`;
        const timestamp = quake.properties.time

        function monthName(index) {
            const monthLegend = {
                0: "January",
                1: "February",
                2: "March",
                3: "April",
                4: "May",
                5: "June",
                6: "July",
                7: "August",
                8: "September",
                9: "October",
                10: "November",
                11: "December"
            }
            return monthLegend[index];
        };
        return {
            magnitude: quake.properties.mag,
            location: quake.properties.place,
            when: datestring,
            cursor: `${timestamp}`,
            id: quake.id
        };
    }


}

module.exports = QuakeAPI;
```

<br>

_server/schema.js_

```
const { gql } = require('apollo-server');

const typeDefs = gql`
  type Query {
    quakes( # replace the current launches query with this one.
    """
    The number of results to show. Must be >= 1. Default = 20
    """
    pageSize: Int
    """
    If you add a cursor here, it will only return results _after_ this cursor
    """
    after: String
  ): QuakeConnection!
    quake(id: ID!): Quake
    users: [User]
    # Queries for the current user
    me: User
}

"""
Simple wrapper around our list of quakes that contains a cursor to the
last item in the list. Pass this cursor to the quakes query to fetch results
after these.
"""
type QuakeConnection { # add this below the Query type as an additional type.
  cursor: String!
  hasMore: Boolean!
  quakes: [Quake]!
}

type Quake {
  id: ID!
  location: String
  magnitude: Float
  when: String
  cursor: String
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
  saveRecord(recordId: ID!): RecordUpdateResponse!
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

_server/utils.js_

```
const db = require("./db")

module.exports = {
    paginateResults: ({
        after: cursor,
        pageSize = 20,
        results,
        // can pass in a function to calculate an item's cursor
        getCursor = () => null,
      }) => {
        if (pageSize < 1) return [];

        if (!cursor) return results.slice(0, pageSize);
        const cursorIndex = results.findIndex(item => {
          // if an item has a `cursor` on it, use that, otherwise try to generate one
          let itemCursor = item.cursor ? item.cursor : getCursor(item);

          // if there's still not a cursor, return false by default
          return itemCursor ? cursor === itemCursor : false;
        });

        return cursorIndex >= 0
          ? cursorIndex === results.length - 1 // don't let us overflow
            ? []
            : results.slice(
                cursorIndex + 1,
                Math.min(results.length, cursorIndex + 1 + pageSize),
              )
          : results.slice(0, pageSize);
      },
    createStore: () => {
        const users = db.map(user => {
            return user
        })
        return { users }
    }
}
```

<br>

_server/resolvers.js_

```
const { paginateResults } = require('./utils');

module.exports = {
    Query: {
        quakes: async (_, { pageSize = 20, after }, { dataSources }) => {
            const allQuakes = await dataSources.quakeAPI.getAllQuakes();
            // we want these in reverse chronological order
            allQuakes.reverse();
            const quakes = paginateResults({
              after,
              pageSize,
              results: allQuakes
            });
            return {
              quakes,
              cursor: quakes.length ? quakes[quakes.length - 1].cursor : null,
              // if the cursor of the end of the paginated results is the same as the
              // last item in _all_ results, then there are no more results after this
              hasMore: quakes.length
                ? quakes[quakes.length - 1].cursor !==
                  allQuakes[allQuakes.length - 1].cursor
                : false
            };
          },
        quake: (_, { id }, { dataSources }) =>
            dataSources.quakeAPI.getQuakeById({ quakeId: id }),
        users: (_, __, { dataSources }) =>
            dataSources.userAPI.getUsers()
    }
};
```
