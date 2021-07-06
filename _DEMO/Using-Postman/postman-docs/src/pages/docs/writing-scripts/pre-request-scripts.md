---
title: "Writing pre-request scripts"
order: 42
page_id: "pre_request_scripts"
contextual_links:
  - type: section
    name: "Prerequisites"
  - type: link
    name: "Sending requests"
    url: "/docs/sending-requests/requests/"
  - type: link
    name: "Intro to Scripts"
    url: "/docs/writing-scripts/intro-to-scripts/"
  - type: link
    name: "Using variables"
    url: "/docs/sending-requests/variables/"
  - type: section
    name: "Additional Resources"
  - type: subtitle
    name: "Related Blog Posts"
  - type: link
    name: "Germaphobia collection (see pre-request scripts in action)"
    url: "https://blog.postman.com/germaphobia/"
  - type: link
    name: "The Good Collection (take advantage of the pre-request)"
    url: "https://blog.postman.com/the-good-collection/"
  - type: link
    name: "Keep it DRY with collection and folder elements"
    url: "https://blog.postman.com/keep-it-dry-with-collection-and-folder-elements/"
  - type: section
    name: "Next Steps"
  - type: link
    name: "Test scripts"
    url: "/docs/writing-scripts/test-scripts/"

warning: false

---

You can use pre-request scripts in Postman to execute JavaScript before a request runs. By including code in the __Pre-request Script__ tab for a request, collection, or folder, you can carry out pre-processing such as setting variable values, parameters, headers, and body data. You can also use pre-request scripts for debugging code, for example by logging output to the console.

An example usage of pre-request scripting could be as follows:

* You have a series of requests in a collection and are running them in a sequence, e.g. using the [collection runner](/docs/running-collections/intro-to-collection-runs/).
* The second request is dependent on a value returned from the first request.
* The value needs to be processed before you pass it to the second request.
* The first request sets the data value from a response field to a variable in its __Tests__ script.
* The second request retrieves the value and processes it in its __Pre-request Script__, then sets the processed value to a variable (which is referenced in the second request, e.g. in its parameters).

## Scripting before your request runs

To include code you want to execute before Postman sends a request, open the request and select the __Pre-request Script__ tab. Enter the JavaScript you need to process before the request runs.

![Pre Request Code](https://assets.postman.com/postman-docs/pre-request-script-v8.jpg)

When you click __Send__, the code will execute before Postman sends the request to the API.

## Re-using pre-request scripts

You can add pre-request scripts to entire collections as well as to folders within collections. In both cases, your pre-request script will run before every request in the collection or folder. This allows you to define commonly used pre-processing or debugging steps you need to execute for multiple requests.

To add pre-processing to a group of requests, locate the collection or folder in __Collections__ on the left of Postman. Click __...__ to __View more actions__ and select __Edit__.

<img src="https://assets.postman.com/postman-docs/edit-collection-action-v8.jpg" alt="Collection Actions" width="300px"/>

Open __Pre-request Scripts__ to enter code that will run before every request in the collection or folder.

![Collection pre request script](https://assets.postman.com/postman-docs/edit-collection-pre-request-v8.jpg)

> You can define a pre-request script when you first create a collection or folder, or at any time after that.

## Next steps

For more detail on what you can do in your pre-request scripts, check out [Test Scripts](/docs/writing-scripts/test-scripts/) and the [Postman Sandbox](/docs/writing-scripts/script-references/postman-sandbox-api-reference/).
