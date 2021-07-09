---
title: "Using Run in Postman buttons"
order: 108
page_id: "introduction_run_button"
warning: false
contextual_links:
    - type: section
      name: "Prerequisites"
    - type: link
      name: "Grouping requests in collections"
      url: "/docs/sending-requests/intro-to-collections/"
    - type: section
      name: "Additional resources"
    - type: subtitle
      name: "Videos"
    - type: link
      name: "How to share Postman collections"
      url: "https://www.youtube.com/watch?v=mVTsK6ZdY6c"
    - type: link
      name: "WTD: Postman for API development and docs"
      url: "https://podcast.writethedocs.org/2018/01/22/postman-for-api-docs-write-the-docs/"
    - type: section
      name: "Next steps"
    - type: link
      name: "Creating the Run in Postman button"
      url: "/docs/publishing-your-api/run-in-postman/creating-run-button/"

---

The all-new <img alt="Run in Postman button icon" src="https://assets.postman.com/postman-docs/run-in-postman-button-icon.jpg" width="100px"/> button is a way to share a Postman collection (and optional environment) with your users. The live Run in Postman buttons automatically stay updated with changes in the original collection, so you will always get the most recent version of your collection without publishers having to manually update the collection's link. You can also attach a linked environment with this new button, to help consumers make faster API calls.

![Twitter API button](https://assets.postman.com/postman-docs/twitter-api-RIP-button.jpg)

## User interaction with your button

When a user comes across <img alt="Run in Postman button icon" src="https://assets.postman.com/postman-docs/run-in-postman-button-icon.jpg" width="100px"/> button, they can choose to fork the collection to their workspace, view the collection in the public workspace, or import the collection into Postman. Then, they can begin interacting with your API. The Run in Postman button allows the consumers to fork your collection, which creates a copy of the collection while maintaining a link to the parent.

<img alt="Fork collection for run in postman" src="https://assets.postman.com/postman-docs/fork-collection-for-run-in-postman.jpg" height="350px"/>

Run in postman buttons are only available for documentation and embed flows.

> **Security check**: Do not leak sensitive data like access keys in your collection or environment. Read more about [securely using API keys in Postman](https://blog.postman.com/how-to-use-api-keys/).

## Next steps

Create a [Run in Postman button](/docs/publishing-your-api/run-in-postman/creating-run-button/).
