---
title: "Viewing documentation"
order: 104
page_id: "viewing_documentation"
contextual_links:
  - type: section
    name: "Prerequisites"
  - type: link
    name: "Grouping requests in collections"
    url: "/docs/sending-requests/intro-to-collections/"
  - type: section
    name: "Additional Resources"
  - type: subtitle
    name: "Case Studies"
  - type: link
    name: "Cisco DevNet"
    url: "https://www.postman.com/case-studies/cisco-devnet/"
  - type: link
    name: "Imgur"
    url: "https://www.postman.com/case-studies/imgur/"
  - type: subtitle
    name: "Videos"
  - type: link
    name: "API documentation with Postman"
    url: "https://www.youtube.com/watch?v=Ayo_KdLLcTA"
  - type: subtitle
    name: "Related Blog Posts"
  - type: link
    name: "Simplifying API documentation for a great first user experience"
    url: "https://blog.postman.com/simplifying-api-documentation-for-a-great-first-user-experience/"
  - type: section
    name: "Next Steps"
  - type: link
    name: "Publishing your docs"
    url: "/docs/publishing-your-api/publishing-your-docs/"

warning: false

---
You can view and comment on private documentation shared with you. Documentation for each collection is published privately by default—you can make documentation visible within a team workspace by sharing the collection. You can optionally choose to publish documentation, in which case anyone with the link can view it.

> If you have edit access to a collection, you can edit its documentation while viewing it in the web browser.

## Contents

* [Viewing private documentation](#viewing-private-documentation)
    * [Commenting on documentation](#commenting-on-documentation)
* [Viewing public documentation](#viewing-public-documentation)
* [Next steps](#next-steps)

## Viewing private documentation

You can [view documentation for any collection that has been shared with you](/docs/publishing-your-api/documenting-your-api/). You must be logged in to your Postman account to view private documentation.

> Postman Team, Business, and Enterprise teammates with view permissions can comment on documentation, while teammates with edit permissions can write, revise, and update it.

To view documentation for a collection you have access to in Postman, select the collection, click the three dots (...), and choose __View Documentation__. The collection documentation will open within a new tab in the application (both in the browser and desktop application).

![View Docs](https://assets.postman.com/postman-docs/view-docs-b.jpg)

At the top, you can select an environment, layout, and sample language.

![View Docs](https://assets.postman.com/postman-docs/SimpleKart+header+expanded+layout+menu.jpg)

You will also see detail on each request, including sample code in various client languages, required authorization type, an indicator of the method, the URL, description, headers, request and response structures, and examples. Documentation authors can optionally include other details.

![Public Documentation](https://assets.postman.com/postman-docs/Everything+displayed+in+docs.jpg)

> The private URL is only accessible to Postman users logged in with appropriate permissions. To make documentation viewable publicly, you can [publish it](/docs/publishing-your-api/publishing-your-docs/).

You can alternatively access documentation by visiting your [user profile](https://postman.co/me) in the browser, choosing __Collections__, and clicking the name of a collection.

![Browse Collection](https://assets.postman.com/postman-docs/user-profile.jpg)

If the documentation you are viewing has multiple versions published, you can select a specific version to view.

<img alt="Docs Versions" src="https://assets.postman.com/postman-docs/docs-versions.jpg" width="400px"/>

### Commenting on documentation

You can view and post comments on your API documentation to collaborate with teammates. When you view the documentation for a collection, you will see any existing comments on it.

![Documentation Comment](https://assets.postman.com/postman-docs/docs-comments.jpg)

You can add a comment to join in the discussion. Comments on documentation reflect [comments on the corresponding collection](/docs/collaborating-in-postman/commenting-on-collections/).

> You can only comment on private documentation.

## Viewing public documentation

You can access [public documentation](/docs/publishing-your-api/publishing-your-docs/) through a URL in your web browser. Postman generates the URL when the documentation is published—the URL is also accessible from the [web dashboard](https://go.postman.co/).

![Public Doc Link](https://assets.postman.com/postman-docs/public-doc-link.jpg)

When you view public documentation, you will see any shared environments, the layout, and the sample code language at the top. You can expand the menu of any of these details to change them.

![View Docs](https://assets.postman.com/postman-docs/SimpleKart+header+expanded+layout+menu.jpg)

For each request, you will see a description of the request, the method and URL, the required authorization type, and any headers or parameters. On the right, you will see example client code snippets for the request, together with example response bodies and headers in the language selected.

![Public Documentation](https://assets.postman.com/postman-docs/Everything+displayed+in+docs.jpg)

## Next steps

Learn more about [collaborating with your team](/docs/collaborating-in-postman/collaboration-intro/) in Postman.
