---
title: "Grouping requests in collections"
order: 23.1
page_id: "intro_to_collections"
contextual_links:
  - type: section
    name: "Prerequisites"
  - type: link
    name: "Sending requests"
    url: "/docs/sending-requests/requests/"
  - type: section
    name: "Additional Resources"
  - type: subtitle
    name: "Case Studies"
  - type: link
    name: "Ping Identity"
    url: "https://www.postman.com/case-studies/pingidentity/"
  - type: subtitle
    name: "Videos"
  - type: link
    name: "Intro to Postman & Postman Collections"
    url: "https://www.youtube.com/watch?v=ptvV_Fc3hd8"
  - type: dynamic_blog
    name: "Related Blog Posts"
    blog_tag: "collections"
  - type: section
    name: "Next Steps"
  - type: link
    name: "Using the Collection Runner"
    url: "/docs/running-collections/intro-to-collection-runs/"

warning: false
---

You can group your Postman requests and examples into collections to keep your workspace organized, to collaborate with teammates, to generate API documentation / test suites, and to automate request runs.

Select __Collections__ in the left sidebar of Postman to see the list or collections in a workspace.

[![Collections](https://assets.postman.com/postman-docs/collections-v8.jpg)](https://assets.postman.com/postman-docs/collections-v8.jpg)

Click a collection to open its overview in a tab. You can open and close collection content by clicking the arrow to the left, and favorite (&#9733;) to move a collection to the top of the list. You can add sub-folders to create an extra level of nesting with your requests and examples. Use the search text-field to filter through your collections.

## Contents

* [Creating collections](#creating-collections)
* [Adding requests](#adding-requests)
* [Managing collections](#managing-collections)
* [Using collections](#using-collections)

## Creating collections

You can create a new collection by clicking __+__ in the left sidebar, the __New__ button &gt; __Collection__, or the overview that appears when you first launch Postman.

<img alt="New collection" src="https://assets.postman.com/postman-docs/new-collection-v8.jpg" width="400px"/>

Give your new collection a name. You can start adding requests if you don't want to specify collection details until later.

[![Collection opened](https://assets.postman.com/postman-docs/collection-created-v8.jpg)](https://assets.postman.com/postman-docs/collection-created-v8.jpg)

You can optionally specify a description for your collection (which will appear in its documentation and in the workspace when anyone opens it), authorization config, pre-request and test script code, and any variables you want to share across all requests in the collection.

To see an overview of a collection, open it from the sidebar. You can edit your collection description inline by hovering over the text and clicking the pencil icon.

[![Collection description](https://assets.postman.com/postman-docs/collection-description-v8.jpg)](https://assets.postman.com/postman-docs/collection-description-v8.jpg)

> You can use [markdown in your collection descriptions](https://documenter.postman.com/view/33232/markdown-in-api-documentation/JsGc?version=latest).

You can edit details for your collections at any time by clicking the collection to open it in a tab.

> You can duplicate a collection—however you can alternatively [fork it](/docs/collaborating-in-postman/version-control-for-collections/) to develop collection versions.

## Adding requests

You can add existing requests to collections and can create new requests inside collections. If you have a request open in Postman, click __Save__ or __Save As__. Choose (or create) a collection and click __Save__.

<img alt="Save request" src="https://assets.postman.com/postman-docs/save-request-v8.jpg" width="350px"/>

To add a new request to a collection, open a new tab and save it from there, or in __Collections__ on the left of Postman, click __...__ on the collection and choose __Add Request__.

<img alt="Add request to folder" src="https://assets.postman.com/postman-docs/collection-menu-v8.jpg" width="350px"/>

You can also create a request by clicking __New__ &gt; __Request__.

<img alt="Save request" src="https://assets.postman.com/postman-docs/request-collection-v8.jpg" width="500px"/>

Give your request a name and optional description, then __Save__ it to the selected collection.

> You can also create and save requests from the workspace overview tab when you have no open requests or collections, or from an empty collection or folder by clicking __Add a request__.

To save a request from your history, select its __...__ menu in __History__ on the left of Postman, and choose __Save Request__. Choose a collection and __Save__.

<img alt="Save request from history" src="https://assets.postman.com/postman-docs/save-history-v8.jpg" width="350px"/>

> You can select multiple requests to save from your history by clicking the __+__ button next to the date.

## Managing collections

To add a folder to your collection, open its __...__ menu in __Collections__ on the left of Postman, and choose __Add Folder__. You can then add requests and examples to the folder either by dragging them over it from inside the collection, or choosing __Add a request__ when empty / __Add Request__ from the __...__ menu.

<img alt="Add request to folder" src="https://assets.postman.com/postman-docs/folders-v8.jpg" width="350px"/>

You can reorder the requests, folders, and examples inside a collection by clicking and dragging them.

<img alt="Reorder collections" src="https://assets.postman.com/postman-docs/reordering-examples.gif"/>

To delete a collection, in __Collections__ click __...__ and select __Delete__.

If you'd like to revert your collection to a previous state, you can open the changelog from the right of the collection overview.

[![Changelog](https://assets.postman.com/postman-docs/changelog-v8.jpg)](https://assets.postman.com/postman-docs/changelog-v8.jpg)

You can [share](/docs/collaborating-in-postman/sharing/) your collections to a workspace, by publishing a [Run in Postman](/docs/publishing-your-api/run-in-postman/creating-run-button/) button on a web page, or by sharing a public link.

### Recovering deleted collections

You can recover deleted collections in Postman using __Trash__. Click `...` next to the collection search bar and select __Open Trash__. You can restore the deleted collections or permanently delete them. You can alternatively open the trash from the statisbar in the bottom right corner in Postman.

<img alt="Trash" src="https://assets.postman.com/postman-docs/trash-v8.jpg"/>

Recovery options depend on your Postman plan:

* With a free account you can recover collections up to one day old.
* Team accounts can recover collections up to 30 days.
* With Postman Business and Enterprise you can recover collections up to 90 days.

If you aren't able to recover a deleted collection, it may have been removed from a workspace rather than deleted. If the collection appears in another workspace, you can move it by clicking __Share__.

## Using collections

You can use collections to power various parts of your API development, testing, and publishing workflows. Use the buttons to the right of the collection to see documentation, comments, the changelog, pull requests, and an overview of the collection including linked elements such as mocks and monitors.

[![Collection options](https://assets.postman.com/postman-docs/collection-info-v8.jpg)](https://assets.postman.com/postman-docs/collection-info-v8.jpg)

* The [Collection Runner](/docs/running-collections/intro-to-collection-runs/) allows you to run all requests in a collection and build testing workflows into your runs.
* You can define [scripts](/docs/writing-scripts/intro-to-scripts/) in your collection, and they will run for each request inside it.
* [Collection variables](/docs/sending-requests/variables/) allow you to define values to use throughout the requests in the collection.
* You can generate [API documentation](/docs/publishing-your-api/documenting-your-api/) from a collection and share it publicly as well as adding it to the [Postman API Network](https://www.postman.com/explore).
* Attaching a [monitor](/docs/designing-and-developing-your-api/monitoring-your-api/intro-monitors/) to a collection lets you schedule collection runs.
* If you add [examples](/docs/sending-requests/examples/) to your requests, you can use [mock servers](/docs/designing-and-developing-your-api/mocking-data/setting-up-mock/) to return sample data during testing and development.

You can generate collections from API specifications using the [Postman API Builder](/docs/designing-and-developing-your-api/the-api-workflow/).
