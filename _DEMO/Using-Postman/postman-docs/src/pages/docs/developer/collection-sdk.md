---
title: "Collection SDK"
order: 148
page_id: "collection_sdk"
contextual_links:
  - type: section
    name: "Prerequisites"
  - type: link
    name: "Grouping requests in collections"
    url: "/docs/sending-requests/intro-to-collections/"
  - type: section
    name: "Next Steps"
  - type: link
    name: "Running collections on the command line"
    url: "/docs/running-collections/using-newman-cli/command-line-integration-with-newman/"

warning: false

---

The Collection SDK is a node.js utility that allows you to work with Postman [Collections](/docs/sending-requests/intro-to-collections/) and build them dynamically into your API project pipeline.

With the Collection SDK, you can create and manipulate collections, exporting them in a format that you can then integrate with other utilities including the Postman app and [Newman CLI](/docs/running-collections/using-newman-cli/command-line-integration-with-newman/).

## Accessing the Collection SDK

The Collection SDK is an open source project—[visit the repo](https://github.com/postmanlabs/postman-collection) for more detail on using the module in your own projects. The [SDK documentation](http://www.postmanlabs.com/postman-collection/) provides an overview of the available objects and methods within the SDK, as well as an intro to the related [concepts](http://www.postmanlabs.com/postman-collection/tutorial-concepts.html).

You can install the SDK from [NPM](https://www.npmjs.com/package/postman-collection) or direct from the repo. The following excerpt demonstrates using the SDK to read a file and parse it into a collection object in JavaScript:

```js
var fs = require('fs'),
  Collection = require('postman-collection').Collection,
  myCollection;

myCollection = new Collection(JSON.parse
  (fs.readFileSync('sample-collection.json').toString()));

console.log(myCollection.toJSON());
```

The Collection SDK provides an interface for working with the data structures defined by the [Postman Collection Schema](https://schema.getpostman.com/). You can use the SDK methods to create and manipulate collection elements, define request detail, variables, authentication, and so on.

## Next steps

Get started with the Collection SDK from the [project repo](https://github.com/postmanlabs/postman-collection), installing it and using the methods to build collections in a way that suits your development or testing project. You can also fork and contribute to the project, or create issues for any problems or feature requests.

If you're working with the Collection SDK to automate part of your collection run workflow, you can integrate your collection SDK development using the [Postman CLI Newman](/docs/running-collections/using-newman-cli/command-line-integration-with-newman/).
