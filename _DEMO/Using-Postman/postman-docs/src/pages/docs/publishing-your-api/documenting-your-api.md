---
title: "Documenting your API"
order: 101
page_id: "documenting_your_api"
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
    name: "Authoring your documentation"
    url: "/docs/publishing-your-api/authoring-your-documentation/"
  - type: link
    name: "Publishing your docs"
    url: "/docs/publishing-your-api/publishing-your-docs/"

warning: false

---

You can automatically generate documentation for your Postman APIs. You can share your documentation privately or publish it on the web. Postman generates and hosts documentation based on collections, synced in realtime and accessible via the browser. You can use documentation to collaborate with team members and partners, or to support developer adoption for your public APIs.

![Public Documentation](https://assets.postman.com/postman-docs/API+docs+SK.jpg)

## Contents

* [Generating your documentation](#generating-your-documentation)
    * [Documenting an existing collection](#documenting-an-existing-collection)
    * [Creating documentation for a new collection](#creating-documentation-for-a-new-collection)
    * [Including detail in your docs](#including-detail-in-your-docs)
* [Accessing doc views](#accessing-doc-views)
* [Documentation environments](#documentation-environments)
* [Versioning your docs](#versioning-your-docs)
* [Next steps](#next-steps)

## Generating your documentation

Documentation is based on a Postman collection, so you can [generate it from an existing collection](#documenting-an-existing-collection) or [create it in conjunction with a new collection](#creating-documentation-for-a-new-collection).

### Documenting an existing collection

To generate and view documentation for an existing collection from Postman, use the __Collections__ tab on the left to select the collection. Select the collection you need to document and open the collection detail. On the right, from the documentation tab you can create the documentation.

![View Docs](https://assets.postman.com/postman-docs/collections-view-complete-doc.jpg)

Or, you can select __View complete collection documentation__, to create and edit your documentation in an expanded view.

![Full Docs View](https://assets.postman.com/postman-docs/collection-docs-full.jpg)

Alternatively, use the __New__ button, and select __API Documentation__. Choose __Select an existing collection__ and click the collection you want to view docs for.

![Document Collection](https://assets.postman.com/postman-docs/document-collection.jpg)

Enter or edit the markdown description of your collection and click __Save__.

![Collection Description](https://assets.postman.com/postman-docs/collection-description.jpg)

You will see a confirmation that your documentation is published, and a link you can visit to view it in the browser.

![Docs Link](https://assets.postman.com/postman-docs/docs-link.jpg)

You can carry out additional edits directly on the documentation page—you'll see editable areas highlighted on hover. Click to edit, make your changes, and save them to update the text.

<img src="https://assets.postman.com/postman-docs/inline-edit-heading.jpg" alt="Edit Header" width="400px"/>

You can also view documentation from the [web dashboard](https://go.postman.co/)—select __View all collections__, then select a collection to view its docs in the browser.

![Collections in Web](https://assets.postman.com/postman-docs/collections-profile-page.jpg)

> By default your documentation is private, so only people you share the collection with will be able to see it. You can [publish your documentation](/docs/publishing-your-api/publishing-your-docs/) for public viewing.

Some detail [is included in your documentation by default](#including-detail-in-your-docs), and you can optionally add further detail.

### Creating documentation for a new collection

You can create documentation from the Postman launch screen or using the __New__ button and choosing __API Documentation__. __Create a new collection__ will be selected by default. Add any initial requests you want to document within your new collection and click __Next__.

![Document Request](https://assets.postman.com/postman-docs/document-new-request.jpg)

Name the collection, enter a markdown description to display in your docs, and click __Save__.

![Collection Description](https://assets.postman.com/postman-docs/collection-description.jpg)

You will see a confirmation that your documentation is published, and a link you can visit to view it in the browser.

![Docs Link](https://assets.postman.com/postman-docs/docs-link.jpg)

> By default your documentation is private, so only people you share the collection with will be able to see it. You can [publish your documentation](/docs/publishing-your-api/publishing-your-docs/) for public viewing.

### Including detail in your docs

Your docs will automatically include detail on your requests, with sample code in various client languages. Each collection / request listing indicates the method, required authorization type, URL, description, headers, request and response structures, and examples. In both private and public documentation, all key-value pairs in headers, parameters, and request bodies will be displayed for each request.

![Request details](https://assets.postman.com/postman-docs/Request+details.jpg)

Private docs include a link to share the associated collection, and public docs include a [Run in Postman button](/docs/publishing-your-api/run-in-postman/introduction-run-button/), allowing viewers to import the collection directly into Postman to try your requests out. Your documentation page will be structured to reflect the folders and requests in your collection.

You can add detail to your descriptions using [Markdown](/docs/publishing-your-api/authoring-your-documentation/). Postman supports [GitHub-flavored Markdown](https://github.github.com/gfm/), so you can include various types of content, such as lists, tables, images, and links.

![Docs Folders](https://assets.postman.com/postman-docs/docs-folders.jpg)

For more on adding detail to your docs, see [Authoring your documentation](/docs/publishing-your-api/authoring-your-documentation/).

## Accessing doc views

By default your documentation is private, and viewable only to people you have [shared a collection](/docs/collaborating-in-postman/sharing/) with. If you [publish your documentation](/docs/publishing-your-api/publishing-your-docs/), anyone with the link can view it in a browser.

For more on accessing private and public docs, see [Viewing documentation](/docs/publishing-your-api/viewing-documentation/).

> Your documentation receives a number of free views per month and is dependent on your [Postman plan](https://www.postman.com/pricing) beyond that. You can check your usage limits through the [Postman API](https://docs.api.getpostman.com) or the [account usage page](https://go.pstmn.io/postman-account-limits).

## Documentation environments

You can use environments to set variables that will be available in your documentation. Anyone viewing private documentation will be able to access environments shared with them. For public documentation, you can select an environment to share during the publication process—this will make the environment available to anyone viewing the published documentation link.

![Doc Environment](https://assets.postman.com/postman-docs/Environments+in+docs.jpg)

Associating an environment with your documentation means that the values of any environment variables your requests reference will automatically populate in the doc content. Anyone using the __Run in Postman__ button from your docs will also be able to access the shared environment when they import the collection into Postman.

To use a variable value in your documentation, [create](/docs/sending-requests/managing-environments/) or select an environment.

![Environment Quick Look](https://assets.postman.com/postman-docs/env-quick.jpg)

[Add the new variable](/docs/sending-requests/managing-environments/#adding-environment-variables) if you haven't already done so.

![Environment Variable](https://assets.postman.com/postman-docs/edit-env-variables-b.jpg)

When you [reference a variable](/docs/sending-requests/managing-environments/#accessing-environments) in your requests, the value from the selected environment will automatically be published along with your documentation.

![Reference Variable](https://assets.postman.com/postman-docs/reference-var.jpg)

This means that anyone viewing your documentation will see the variable value along with the relevant environment.

![Variable Value in Docs](https://assets.postman.com/postman-docs/documented-var.jpg)

You can reference variables in your description text to show the values in your documentation.

<img alt="Inline Documentation Edit with Variable" src="https://assets.postman.com/postman-docs/inline-doc-variable.jpg" width="500px"/>

If someone imports the collection using the __Run in Postman__ button from your docs, they will also import the environment and variable.

> Variable values will be published explicitly in your docs, so make sure they don't contain any sensitive data.

## Versioning your docs

Any version tags you add to your collections will be published along with your docs. You can add versions to an [API](/docs/collaborating-in-postman/versioning-an-api/) or collection.

![Add Version](https://assets.postman.com/postman-docs/docs-version-options.jpg)

If you share a collection privately, viewers will be able to select versions from a drop-down list in your docs.

![Docs Versions](https://assets.postman.com/postman-docs/docs-versions.jpg)

When you publish docs to share publicly, you can select a version all viewers will see.

![Publish Version](https://assets.postman.com/postman-docs/publish-version.jpg)

## Next steps

Learn more about [authoring your docs](/docs/publishing-your-api/authoring-your-documentation/) and [publishing them](/docs/publishing-your-api/publishing-your-docs/).
