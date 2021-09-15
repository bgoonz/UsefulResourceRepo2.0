---
title: "Full Stack Apollo GraphQL Tutorial: Part 3 - Hooking Up Your Data Sources - Part 1"
tags: ["react", "nodejs", "graphql"]
published: true
date: "2019-07-23"
---

**Part 3 Prerequisites:** Successful completion of [part 1](https://developer-log.netlify.com/full-stack-apollo-graphql-tutorial-pt-1-setup/) and [part 2](https://developer-log.netlify.com/full-stack-apollo-graphql-tutorial-pt-2-graphql-playground/).
<br>

<iframe width="560" height="315" src="https://www.youtube.com/embed/x6eXbus6UJo" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

<br>

In the last part, we used GraphQL Playground to explore our schema from the browser. Today, we'll hook up one of our data sources, an external API, and after we've done that, we'll be able to run a query using GraphQL Playground.

We're going to get earthquake data from the USGS [Earthquake Catalog](https://earthquake.usgs.gov/fdsnws/event/1/). At this point, we have no idea what the response from there will look like, so let's look into that now. Create a temporary folder (meaning you'll delete it afterward) called `dataexplore` (or whatever you like), and make new file in there called, say, `quakefetch.js`. Import the dependency `node-fetch` and paste the following into the file:
<br>

_dataexplore/quakefetch.js_

```
const fetch = require("node-fetch")

const url = "https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=2014-01-01&endtime=2014-01-02"
fetch(url)
    .then(function (response) {
        return response.json();
    })
    .then(function (quakedata) {
        console.log(quakedata);
    });
```

<br>

If you're using VS Code, you could just run this file on its own and display the results in `OUTPUT`. You'll see a large JSON response. Within that JSON, there's a large array called `features`. We'll just take the first element in that array and explore it.
<br>

_dataexplore/quakefetch.js_

```
const url = "https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=2014-01-01&endtime=2014-01-02"
fetch(url)
    .then(function (response) {
        return response.json();
    })
    .then(function (quakedata) {
        console.log(quakedata.features[0]);
    });
```

<br>

So, now we should see:
<br>

```
{ type: 'Feature',
  properties:
   { mag: 1.29,
     place: '10km SSW of Idyllwild, CA',
     time: 1388620296020,
     updated: 1457728844428,
     tz: -480,
     url:
      'https://earthquake.usgs.gov/earthquakes/eventpage/ci11408890',
     detail:
      'https://earthquake.usgs.gov/fdsnws/event/1/query?eventid=ci11408890&format=geojson',
     felt: null,
     cdi: null,
     mmi: null,
     alert: null,
     status: 'reviewed',
     tsunami: 0,
     sig: 26,
     net: 'ci',
     code: '11408890',
     ids: ',ci11408890,',
     sources: ',ci,',
     types:
      ',cap,focal-mechanism,general-link,geoserve,nearby-cities,origin,phase-data,scitech-link,',
     nst: 39,
     dmin: 0.06729,
     rms: 0.09,
     gap: 51,
     magType: 'ml',
     type: 'earthquake',
     title: 'M 1.3 - 10km SSW of Idyllwild, CA' },
  geometry:
   { type: 'Point',
     coordinates: [ -116.7776667, 33.6633333, 11.008 ] },
  id: 'ci11408890' }
```

<br>

For our simple app, we want our custom data response (when a user looks at a list of saved quakes) to be an array of quake event objects that have the following shape:
<br>

```
{
    magnitude: (quake magnitude),
    location: (quake location),
    when: (date and time quake occurred),
    time: (unix timestamp),
    id: (USGS quake event id)
}
```

<br>

If you update your `quakefetch.js` file to look like this:
<br>

_dataexplore/quakefetch.js_

```
const fetch = require("node-fetch")


const url = "https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=2014-01-01&endtime=2014-01-02"
fetch(url)
    .then(function (response) {
        return response.json();
    })
    .then(function (quakedata) {
        const quake = quakedata.features[0];
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
        const customData = {
            magnitude: quake.properties.mag,
            location: quake.properties.place,
            when: datestring,
            time: timestamp,
            id: quake.id
        }
        console.log(customData)
    });
```

<br>

You should see after running it:
<br>

```
{ magnitude: 1.29,
  location: '10km SSW of Idyllwild, CA',
  when: 'January 2, 2014 at 8:51 and 36 seconds',
  time: 1388620296020,
  id: 'ci11408890' }
```

<br>

Which is in the shape we wanted. Good!
<br>

So, now we're ready to hook up this data source.
<br>

In the server folder, create another folder called `datasources` and add a file to it called `quake.js`. This is where we'll create our first API. Install an Apollo dependency that allows us to build a data source for a REST API.
<br>

```
npm i apollo-datasource-rest
```

<br>

And, paste in the following code to your `quake.js` file:
<br>

_server/datasources/quake.js_

```
const { RESTDataSource } = require('apollo-datasource-rest');

class QuakeAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = "https://earthquake.usgs.gov/fdsnws/event/1/";
  }
}

module.exports = QuakeAPI;
```

<br>

**What's Going On?**
<br>
First, recall that this tutorial parallels [the one at Apollo Docs](https://www.apollographql.com/docs/tutorial/data-source/#connect-a-rest-api), so that's the code we're building upon. The `RESTDataSource` package has something like the `fetch` API built into it for making API requests. We've added the base URL for the USGS Earthquake Catalog. For specific queries, we'll have to extend the request url. Add the following code to your `QuakeAPI` class:
<br>

_server/datasources/quake.js_

```
 async getAllQuakes() {
        const query = "query?format=geojson&starttime=2014-01-01&endtime=2014-01-02"
        const response = await this.get(query);
        return Array.isArray(response.features)
            ? response.features.map(quake => this.quakeReducer(quake))
            : [];
    }
```

<br>

This function gets the response. Pay particular attention to the line `const query = "query?format=geojson&starttime=2014-01-01&endtime=2014-01-02"`. We create the `query` string and in the next line, it gets appended to the `baseURL`, and the `GET` request is made. Remember, `response.features` is an array, so we map over it, and for each quake object in it, a function called `quakeReducer()` gets the data we need from it and builds our customized quake object. Let's add `quakeReducer()` to our file now.
<br>

_server/datasources/quake.js_

```
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
        time: timestamp,
        id: quake.id
    };
}
```

<br>

We already did the work in building this function when we put together our temporary `quakefetch.js` file. Now, you can delete both that file and the `dataexplore` folder from your project. Our first API is now ready to be added to our Apollo Server.
<br>

Update your `index.js` file to look like this:
<br>

_server/index.js_

```
const { ApolloServer } = require('apollo-server');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');

const QuakeAPI = require('./datasources/quake');

const server = new ApolloServer({
    typeDefs,
    resolvers,
    dataSources: () => ({
        quakeAPI: new QuakeAPI(),
    })
});

server.listen().then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
});
```

<br>

It's time to make our queries functional by adding our `resolvers`. Create a file called `resolvers.js` and add the following code to it.
<br>

_server/resolvers.js_

```
module.exports = {
    Query: {
        quakes: (_, __, { dataSources }) =>
            dataSources.quakeAPI.getAllQuakes(),
        quake: (_, { id }, { dataSources }) =>
            dataSources.quakeAPI.getQuakeById({ quakeId: id }),
    }
};
```

<br>

The `quakes` query resolver uses the `getAllQuakes()` function from our `QuakeAPI` to return the custom response we desire. We haven't defined the `getQuakeById()` function yet, so only the `quakes` query will return a response to us at this point. For more info on resolvers, check out [Apollo Docs - What is a Resolver?](https://www.apollographql.com/docs/tutorial/resolvers/#what-is-a-resolver).
<br>

Finally, start up your server if it's not running already, and run the following query in the GraphQL Playground at `localhost:4000`.
<br>

_GraphQL Playground_

```
query {
  quakes {
    id
    location
    magnitude
    when
    time
  }
}
```

<br>

The response shown on the right side of the screen should look like this (truncated here):
<br>

```
{
  "data": {
    "quakes": [
      {
        "id": "ci11408890",
        "location": "10km SSW of Idyllwild, CA",
        "magnitude": 1.29,
        "when": "January 2, 2014 at 8:51 and 36 seconds",
        "time": "1388620296020"
      },
      {
        "id": "ak01421ig3u",
        "location": "117km NW of Talkeetna, Alaska",
        "magnitude": 1.1,
        "when": "January 2, 2014 at 8:47 and 26 seconds",
        "time": "1388620046501"
      },
      ...
      ...
      ...
  }
```

<br>

There you go! You have a proxy front-end interface that makes a query and returns a custom response (according to our specifications), all without actually having a front-end hooked up yet. You've gotta love working with GraphQL!
<br>

If you'd like to go through this part slowly, and with more details, I encourage you to watch the video above. If your're ready to move on, in the next part, we'll build our `UserAPI` and add _it_ to our Apollo Server. See you there!
