[![VithalReddy](https://miro.medium.com/fit/c/96/96/1*GlQSX_dAtVf7agV94PlmgA.jpeg)](https://medium.com/@vithalreddy?source=post_page-----8402c1bbb097--------------------------------)

If you’re working with GraphQL (a query language for your API), and you’re using **_apollo-server-express_**, You may notice unlike **_express-graphql,_** **request object** will not be available in **context**, if it’s not defined in apollo-sever-express middleware, but don’t worry, if want **request object** available in **context**, just use following quick hack, not really and you’re done.

normal **_apollo-server-express middleware:_**

> app.use**(**‘/graphql’, bodyParser.json**()**, graphqlExpress**({** yourSchema **}))**;

consider, you want request user as context:

> app.use**(**‘/graphql’, bodyParser.json**()**, graphqlExpress**(**req =&gt; **({**YourSchema, context: **{** user: req.user **}**
>
> **}))**;

Here, we are using **es6** arrow functions and passing request object in that function.so that it will be available to pass in context of **graphql** query.

Now, you can pass context in your resolver functions to access request object inside resolver function.

first appeared on [Web Development Blog StackFrame](https://stackfame.com/graphql-req-object).
