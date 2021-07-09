---
title: "Building request workflows"
order: 57
page_id: "building_workflows"
search_keyword: "postman.setNextRequest, setNextRequest"
contextual_links:
  - type: section
    name: "Prerequisites"
  - type: link
    name: "Intro to scripts"
    url: "/docs/writing-scripts/intro-to-scripts/"
  - type: section
    name: "Additional Resources"
  - type: subtitle
    name: "Related Blog Posts"
  - type: link
    name: "Check for broken links on your website using a Postman Collection"
    url: "https://blog.postman.com/check-for-broken-links-on-your-website-using-a-postman-collection/"

warning: false

---

When you start a collection run, all requests are run in the order you see them in Postman. So all requests are executed first, by order of the folder, and then any requests in the root of the collection.

However, you can override this behavior using a built-in function called `postman.setNextRequest()`. This function, as the name suggests, allows you to specify which request runs next.

[![set next request method](https://assets.postman.com/postman-docs/Test_script10.png)](https://assets.postman.com/postman-docs/Test_script10.png)

## Set the request to be executed next

```js
postman.setNextRequest("request_name");
```

## Loop over the current request

Providing the name of current run to `setNextRequest` leads to Postman running the current request continuously.

[![looping current request](https://assets.postman.com/postman-docs/branching_and_looping/branching_and_looping.png)](https://assets.postman.com/postman-docs/branching_and_looping/branching_and_looping.png)

**Note:** While looping over one request continuously, one should wrap `setNextRequest` in some logic so as to ensure that the request does not run indefinitely otherwise the collection runner would need to be force closed.

## Stop workflow execution

```js
postman.setNextRequest(null);
```

Some salient points about `postman.setNextRequest()`:

1. Specify the name or ID of the subsequent request and the collection runner will take care of the rest.
1. It can be used in the pre-request or the test script. If there's more than one assignment, the last set value takes precedence.
1. If `postman.setNextRequest()` is absent in a request, the collection runner defaults to linear execution and moves to the next request

Remember these two facts as you use this workflow:

* `postman.setNextRequest()` is always executed at the end of the current request. This means that if you put this function before other code blocks anywhere in pre-request or test script, these blocks will still execute.
* `postman.setNextRequest()` has a scope, which is the source of your collection run. If you run a collection, you can jump to any request in the collection (even requests inside folders, using the same syntax). However, if you run a folder, the scope of `postman.setNextRequest()` is limited to that folder. So you can jump to any request in this folder, but not ones that are outside of the folder. It includes requests inside other folders, and also root-level requests in the collection. To read more about [running collections or folders](/docs/running-collections/intro-to-collection-runs/).
