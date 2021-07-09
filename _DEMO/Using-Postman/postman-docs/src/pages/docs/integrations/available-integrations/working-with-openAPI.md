---
title: "OpenAPI"
order: 175
page_id: "working_with_openAPI"
contextual_links:
  - type: section
    name: "Prerequisites"
  - type: link
    name: "Grouping requests in collections"
    url: "/docs/sending-requests/intro-to-collections/"
  - type: section
    name: "Additional Resources"
  - type: subtitle
    name: "Related blog posts"
  - type: link
    name: "Postman Joins the OpenAPI Initiative"
    url: "https://blog.postman.com/postman-joins-openapi-initiative/"
  - type: link
    name: "Syncing Your OpenAPI, RAML, and GraphQL Schema to GitHub with Postman"
    url: "https://blog.postman.com/syncing-your-openapi-raml-and-graphql-schema-to-github-with-postman/"
  - type: link
    name: "Postman Supports OpenAPI 3.0"
    url: "https://blog.postman.com/postman-supports-openapi-3-0/"
warning: false
---

You can import your existing OAS 3.0 definitions (OpenAPI Specification) into Postman. Postman supports both YAML and JSON formats. You can choose to upload a file, enter a URL, or directly copy your JSON/YAML. In Postman, click 'Import' to bring up the following screen:

[![import sample](https://assets.postman.com/postman-docs/open-api-import-b.jpg)](https://assets.postman.com/postman-docs/open-api-import-b.jpg)

When importing your OpenAPI specification, Postman follows the endpoint hierarchy defined in the specification to create a collection organized into folders (if your OpenAPI has multiple levels of hierarchy).

Postman uses the schemas defined in the OpenAPI to generate request and response bodies. The following screen clearly illustrates importing of OpenAPI specification into Postman:

[![import swagger 3 file](https://assets.postman.com/postman-docs/openapi-import-api-example-b.gif)](https://assets.postman.com/postman-docs/openapi-import-api-example-b.gif)
