---
title: "Setting up mock servers"
order: 84
page_id: "setting_up_mock"
contextual_links:
  - type: section
    name: "Prerequisites"
  - type: link
    name: "Sending requests"
    url: "/docs/sending-requests/requests/"
  - type: link
    name: "Grouping requests in collections"
    url: "/docs/sending-requests/intro-to-collections/"
  - type: section
    name: "Additional Resources"
  - type: subtitle
    name: "Videos"
  - type: link
    name: "Fake APIs for Real Developers"
    url: "https://www.youtube.com/watch?v=fgtDZPOPzLU"
  - type: subtitle
    name: "Related Blog Posts"
  - type: link
    name: "Mock responses in Postman by using Examples"
    url: "https://blog.postman.com/mock-responses-in-postman-by-using-examples/"
  - type: link
    name: "Simulate a back end with Postman’s mock service"
    url: "https://blog.postman.com/simulate-a-back-end-with-postmans-mock-service/"
  - type: link
    name: "Team collaboration with Postman mock servers"
    url: "https://blog.postman.com/team-collaboration-with-postman-mock-servers/"
  - type: link
    name: "Introducing Postman Mock Call Logs"
    url:  "https://blog.postman.com/introducing-postman-mock-call-logs/"
  - type: section
    name: "Next Steps"
  - type: link
    name: "Test scripts"
    url: "/docs/writing-scripts/test-scripts/"

warning: false
---

You can make requests that return mock data defined within Postman if you do not have a production API ready, or you do not want to run your requests against real data yet. By adding a mock server to your collection and adding examples to your requests, you can simulate the behavior of a real API.

When you send a request to a mock server, Postman will match the request configuration to the examples you have saved for the request and respond with the data you added to the example. You will see any existing mocks in your workspace from __Mock Servers__ on the left of Postman.

> You need to be signed into a Postman account to create a mock server.

[![Mock server](https://assets.postman.com/postman-docs/mocks-v8.jpg)](https://assets.postman.com/postman-docs/mocks-v8.jpg)

## Mocks quick start

To try out a mock server, carry out the following steps:

* Make a request to any API in Postman–making sure your request is saved to a collection.
* Click **...** at the top right and choose __Add example__. Postman will automatically populate the example with the response you received when you sent the request.
* In **Collections** on the left, select the collection and open the __Info__ using the button on the right. Click **Create mock server**.
* Give your mock a name, leaving the default version selected, and the delay option unchecked. Click **Create Mock Server**.
* Copy the mock URL and go back into your request. Replace the base part of the URL with the mock server URL (everything before the path e.g. up to `/customers`).
* Click **Send**—Postman should return the example response you saved for the request, this time from the mock server.
* Open the example again and alter the mock response JSON, then save it and send the request again—you will see your edited mock response.

## Contents

* [Creating mock servers](#creating-mock-servers)
    * [Configuring mock details](#configuring-mock-details)
* [Making requests to mocks](#making-requests-to-mocks)
    * [Using HTTP access control for a mock](#using-http-access-control-for-a-mock)
* [Viewing mock calls](#viewing-mock-calls)
    * [Troubleshooting mock calls](#troubleshooting-mock-calls)

## Creating mock servers

You can create mock servers from an existing collection, or Postman will create a new collection for your mock server. You can create a new mock [from scratch](#creating-a-mock-from-scratch), [from a collection](#creating-a-mock-from-a-collection), [from the New button](#creating-a-mock-from-the-new-button), [from an API](#creating-a-mock-from-an-api), or [from your history](#creating-a-mock-from-history).

### Creating a mock from scratch

In __Mock Servers__ on the left of Postman, click the __+__ button.

<img alt="New mock" src="https://assets.postman.com/postman-docs/new-mock-v8.jpg" width="350px"/>

Select an existing collection or add a new one (adding an initial request for a new one).

[![Mock new collection](https://assets.postman.com/postman-docs/mock-collection-v8.jpg)](https://assets.postman.com/postman-docs/mock-collection-v8.jpg)

Configure your [mock details](#configuring-mock-details).

### Creating a mock from a collection

Open a collection in Postman, and open the __Info__ from the button in the right sidebar. Click __Create mock server__.

[![New mock](https://assets.postman.com/postman-docs/add-mock-v8.jpg)](https://assets.postman.com/postman-docs/add-mock-v8.jpg)

Configure your [mock details](#configuring-mock-details).

### Creating a mock from the New button

Click __New__ and choose __Mock Server__.

[![New mock](https://assets.postman.com/postman-docs/mock-new-v8.jpg)](https://assets.postman.com/postman-docs/mock-new-v8.jpg)

Choose whether you want to mock an existing collection or generate a new one for your mock (adding a request).

Configure your [mock details](#configuring-mock-details).

### Creating a mock from an API

If you want to generate a mocks collection from an API or add a mock to an API collection, open the API from __APIs__ on the left of Postman. Select the __Develop__ tab and __Add Mock Server__. You can add an existing mock or create a new one to link to your API specification

[![Mock API](https://assets.postman.com/postman-docs/api-mock-v8.jpg)](https://assets.postman.com/postman-docs/api-mock-v8.jpg)

Choose whether you want to generate a collection from your API spec to use for mocking, select an existing collection to mock, or create a new collection.

[![Mock API](https://assets.postman.com/postman-docs/mock-collection-api-v8.jpg)](https://assets.postman.com/postman-docs/mock-collection-api-v8.jpg)

Configure your [mock details](#configuring-mock-details).

### Creating a mock from history

You can build a mock based on requests from your Postman history. In __History__ on the left, hover over a request or date and click __...__, choosing __Mock Request(s)__.

<img alt="Mock history" src="https://assets.postman.com/postman-docs/mock-history-v8.jpg" width="350px"/>

Configure your [mock details](#configuring-mock-details).

## Configuring mock details

When you create a mock server you will give it a name, choose a version tag (if your collection has a specific version you want to mock), choose an optional environment to run the mock against, and configure a delay before the server sends your mock responses  (choosing to simulate 2G/3G networks or specify a custom delay in milliseconds).

> If you choose to make your mock server private, you will need to add a [Postman API key](/docs/developer/intro-api/) in the request header: `x-api-key:<Your-Postman-API-key>`. You can [share the collection](/docs/collaborating-in-postman/sharing/) and your collaborators can use their Postman API keys to consume the mock.

[![New mock](https://assets.postman.com/postman-docs/mock-config-v8.jpg)](https://assets.postman.com/postman-docs/mock-config-v8.jpg)

With your details in place, click **Create Mock Server**.

> You can also opt to save the mock URL to an [environment variable](/docs/sending-requests/variables/) which you can then reference in your requests by making the environment active before sending.

Postman will display the details you'll need to use the mock (you can also get these from the collection at any time).

[![Mock detail](https://assets.postman.com/postman-docs/mock-detail-v8.jpg)](https://assets.postman.com/postman-docs/mock-detail-v8.jpg)

Click **Copy Mock URL** to begin making requests to your mock.

You will see details of the mock in the collection overview info on the right.

[![Mock in collection](https://assets.postman.com/postman-docs/mock-info-v8.jpg)](https://assets.postman.com/postman-docs/mock-info-v8.jpg)

Open the mock from __Mock Servers__ on the left to edit or delete–use the __...__ menu.

## Making requests to mocks

With your mock URL, you can start making requests right away. Make sure the request you want to mock has at least one [example](/docs/sending-requests/examples/) added to it.

<img alt="Add example" src="https://assets.postman.com/postman-docs/add-example-v8.jpg" width="300px"/>

[![Example added](https://assets.postman.com/postman-docs/example-added-v8.jpg)](https://assets.postman.com/postman-docs/example-added-v8.jpg)

Open a tab (or edit the address in an existing tab) and add the mock URL:

```shell
https://<mock-id>.mock.pstmn.io/<request-path>
```

For example:

```shell
https://3589dfde-f398-45cd-88eb-b0fa0192fc3f.mock.pstmn.io/matches
```

The mock URL includes the ID for the mock and the path for the request with a saved example.

[![Mock example](https://assets.postman.com/postman-docs/mock-example-v8.jpg)](https://assets.postman.com/postman-docs/mock-example-v8.jpg)

If you save your mock URL to a variable, you can reference it across requests—for example if you have a production server and a mock server, you could have an [environment](/docs/sending-requests/managing-environments/) for each one with the same variable name in each for the mock URL. With your requests using the variable, you can then switch between the two environments.

> You can also retrieve your mock ID from the [Postman API](https://documenter.postman.com/view/631643/JsLs/?version=latest#018b5d62-f6fc-f752-597e-c1eb4bb98d24)

When you **Send** a request to your mock server URL it will send back one of the examples you added to the request with the same path and method. ([You can provide multiple examples](/docs/designing-and-developing-your-api/mocking-data/mocking-with-examples/) and Postman will return the one that matches your request configuration most closely).

If you configured a delay for your mock server, Postman will wait the specified period of time before sending the response.

> Your Postman account gives you a limited number of free mock server calls per month. Check your [usage limits](https://go.postman.co/usage).

### Using HTTP access control for a mock

In addition to using the Postman app to make requests to mock endpoints, you can also make those requests in a browser.

A web browser makes a cross-origin HTTP request when it requests a resource from a domain, protocol, or port that's different from its own. [Cross-Origin Resource Sharing (CORS)](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) is a standard that defines a way in which a browser and server can interact securely, in this case referring to how a web browser interacts with the mock endpoints hosted on the Postman server.

CORS is enabled for Postman mock servers. As a result, you can stub your web apps with mocked data using the mock endpoints. Development or production web apps can then make requests to your Postman mock endpoint and receive example responses.

## Viewing mock calls

You can view and search the details of calls to your mock servers using the mock call log. Open a mock from __Mock Servers__ on the left of Postman. Your mock overview and call log will open.

[![Mock Call](https://assets.postman.com/postman-docs/mock-calls-v8.jpg)](https://assets.postman.com/postman-docs/mock-calls-v8.jpg)

The mock call log lists an overview of calls made to the mock url, together with request and response details you can drill down into.

Mock call log entries indicate the time a request was sent, the request method and path, and a response overview. Click an entry to see more detail on request headers and body, or response headers and body.

Use the search field to find particular calls, and the refresh button at the top of the list to view up to date requests.

### Troubleshooting mock calls

You can use the mock call log to troubleshoot your requests to mock servers.

[![Mock Call Error](https://assets.postman.com/postman-docs/mock-not-found-v8.jpg)](https://assets.postman.com/postman-docs/mock-not-found-v8.jpg)

If you see `No matching requests` listed in the __Response__ column, this may mean that your mock server is not setup correctly. Make sure [you have an example saved for the request](/docs/designing-and-developing-your-api/mocking-data/mocking-with-examples/) in the collection you have the mock connected to.

In the case of a service outage, you will get a 502/503/504 response. Please subscribe and check the Postman [status page](https://status.postman.com/) for updates if you encounter this.

## Next steps

For more information about mock servers, see the following resources:

* [Mocking with examples](/docs/designing-and-developing-your-api/mocking-data/mocking-with-examples/)
* [Mocking with the Postman API](/docs/designing-and-developing-your-api/mocking-data/mock-with-api/)
* [Matching algorithm](/docs/designing-and-developing-your-api/mocking-data/matching-algorithm/)
