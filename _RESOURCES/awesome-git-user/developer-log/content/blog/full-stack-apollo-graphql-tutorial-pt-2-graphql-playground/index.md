---
title: "Full Stack Apollo GraphQL Tutorial: Part 2 - GraphQL Playground"
tags: ["react", "nodejs", "graphql"]
published: true
date: "2019-07-20"
---

**Part 2 Prerequisites:** Successful completion of [part 1](https://developer-log.netlify.com/full-stack-apollo-graphql-tutorial-pt-1-setup/).
<br>

<iframe width="560" height="315" src="https://www.youtube.com/embed/sOWRdvhMCVY" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

<br>

If you were able to get your Apollo Server up and running,
<br>

```
🚀 Server ready at http://localhost:4000/
```

<br>

then you should have access to GraphQL Playground. So, go to `http://localhost:4000/`. Hopefully you see an instance of GraphQL Playground that looks like this:
<br>

![GraphQL-Playground](https://dl.dropboxusercontent.com/s/k9e6n6gh10zhh65/gqlplayground.jpg?dl=0)
<br>

On the right-hand side of the screen, there should be two tabs, one called 'DOCS' and one called 'SCHEMA'. Click the 'SCHEMA' tab. All of your type definitions (`typeDefs`) should be listed. And if you click on 'DOCS', you should see your queries and mutations. Click on the `quakes` query and you'll see the type definition for `Quake` that we wrote in our schema. Very cool, right? GraphQL Playground, at this point, seems to be a proxy front-end interface that allows you to look inside your GraphQL server and examine the schema from the browser. However, it does more than that, as we'll see later after we write our resolvers. Before we write our resolvers, though, we'll need to hook up our data sources, which we'll do in the next part. See you there!
<br>
