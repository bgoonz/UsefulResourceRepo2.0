---
title: 'Managing and sharing APIs'
order: 82
page_id: 'managing_apis'
warning: false
contextual_links:
  - type: section
    name: "Prerequisites"
  - type: link
    name: "Using the API Builder"
    url: "/docs/designing-and-developing-your-api/the-api-workflow/"
  - type: section
    name: "Additional Resources"
  - type: subtitle
    name: "Related Blog Posts"
  - type: link
    name: "Create APIs directly within the Postman app"
    url: "https://blog.postman.com/postman-7-1-create-apis-directly-within-the-postman-app/"
  - type: section
    name: "Next Steps"
  - type: link
    name: "Versioning APIs"
    url: "/docs/collaborating-in-postman/versioning-an-api/"
  - type: link
    name: "Viewing and analyzing APIs"
    url: "/docs/designing-and-developing-your-api/view-and-analyze-api-reports/"
---

When you [define your APIs](/docs/designing-and-developing-your-api/the-api-workflow/) in Postman using the API Builder, each API is associated with a workspace. You can share access to your APIs, discuss them in comments, and view schema activity.

- [Sharing APIs](#sharing-apis)
- [Commenting on APIs](#commenting-on-apis)
- [Viewing API events](#viewing-api-events)

## Sharing APIs

You can share an API via its workspace in Postman. By sharing your workspace with collaborators, you can provide access to the API via [designated roles with specific permissions](/docs/collaborating-in-postman/roles-and-permissions/), including Viewer and Editor.

> The Viewer role is only available on certain [Postman plans](https://www.postman.com/pricing).

If you share an API to a workspace, members of the workspace will have access to any shared elements linked to the API (for example documentation, test suites, monitors). Workspace members can view elements linked to an API but can only edit if an element is also shared within the workspace. If you delete the API or remove it from the workspace, members will still have access to those shared elements unless you remove them also.

In Postman, select an __API__ in the sidebar and click (__...__) to open the menu, then choose **Share API**.

<img alt="Edit API" src="https://assets.postman.com/postman-docs/v8-more-actions-2.jpg" width="250px"/>

Select a workspace, choose if you want to remove the API from the current workspace after sharing, then click __Share and Continue__.

![Share API to Workspace](https://assets.postman.com/postman-docs/v8-managing-share-api2.jpg)

Configure access levels for collaborators in your workspace and click __Save Roles__.

![API Workspace Roles](https://assets.postman.com/postman-docs/v8-managing-workspace-roles2.jpg)

In addition to sharing an API via its workspace, you can also share it to the private API network. Doing this allows your team to learn about and access these APIs and start using them right away. Learn more about [adding your API to the private network](/docs/collaborating-in-postman/adding-private-network/).

## Commenting on APIs

You can discuss your APIs with collaborators in Postman, keeping the conversation in context and available to other stakeholders. Anyone with access to the API can comment.

To leave a comment on an API, open __APIs__ in the left sidebar and select the API you want to comment on. Switch to comment mode, enter your comment, and **Add comment** to publish it.

[![api comment app](https://assets.postman.com/postman-docs/v8-managing-add-comment.gif)](https://assets.postman.com/postman-docs/v8-managing-add-comment.gif)

> You can leave inline comments on the API schema by highlighting what you want to comment on.

### Formatting comments

You can use Markdown in your comments—check out the [Markdown Cheatsheet on Github](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet) for tips on formatting.

If you want to call the attention of a collaborator in comment, you can tag them by typing `@` followed by their name—choose the person from the auto-suggested list. When you tag a member in your comment, Postman will send them a notification.

### Editing, deleting, or linking to a comment

To edit, delete, or link to one of your comments, navigate to the comment section and hover over the comment you wish to manage. Click the pen icon to edit the comment, the bin icon to delete, or the anchor icon to get a direct link to the comment.

[![api comment manage](https://assets.postman.com/postman-docs/v8-managing-comment-actions2.jpg)](https://assets.postman.com/postman-docs/v8-managing-comment-actions2.jpg)

> With Admin permissions you can delete comments made by any contributor, but you cannot update or modify comments.

## Viewing API events

You can view a changelog of your API schemas in the context bar. Open an API, then click the changelog icon.

![Schema Changelog Button](https://assets.postman.com/postman-docs/v8-managing-changelog2.jpg)

You will see a list of events on the schema and can click to expand each entry for more detail.

You can use the __Restore__ link to revert the schema to a previous state.

## Next steps

For more info on working with the API Builder in Postman, check out the following resources:

- [Versioning APIs](/docs/collaborating-in-postman/versioning-an-api/)
- [Viewing and analyzing APIs](/docs/designing-and-developing-your-api/view-and-analyze-api-reports/)
