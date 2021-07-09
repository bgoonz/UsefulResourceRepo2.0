---
title: "Sharing your work"
order: 73.1
page_id: "sharing"
contextual_links:
  - type: section
    name: "Prerequisites"
  - type: link
    name: "Working with your team"
    url: "/docs/collaborating-in-postman/collaboration-intro/"
  - type: section
    name: "Additional Resources"
  - type: subtitle
    name: "Videos"
  - type: link
    name: "Sharing Postman Collections"
    url: "https://www.youtube.com/watch?v=KMLaibEaf7Y"
  - type: link
    name: "How to Share Postman Collections"
    url: "https://www.youtube.com/watch?v=mVTsK6ZdY6c"
  - type: section
    name: "Next Steps"
  - type: link
    name: "Creating Workspaces"
    url: "/docs/collaborating-in-postman/using-workspaces/creating-workspaces/"

warning: false

---

You can share Postman entities you are working on with collaborators, including collections, APIs, and environments.

> To share a collection run, see [Using the Collection Runner](/docs/running-collections/intro-to-collection-runs/).
>
> To share a collection via embed, use the [Run in Postman](/docs/publishing-your-api/run-in-postman/introduction-run-button/) button.
>
> To share by file, see [Importing and exporting data](/docs/getting-started/importing-and-exporting-data/)

## Contents

* [Sharing to workspaces](#sharing-to-workspaces)
* [Sharing by link](#sharing-by-link)
* [Next steps](#next-steps)

> To share your work via workspaces you will need to be signed in to your [Postman account](/docs/getting-started/postman-account/).

## Sharing to workspaces

When you work in a Postman workspace, any entities you save to the workspace will be visible to other team members who share the workspace—with [varying access levels](/docs/collaborating-in-postman/roles-and-permissions/) depending on your team's configuration.

You can share various Postman entities to workspaces, or move them from one workspace to another, including collections, environments, and APIs.

To share an entity from Postman, find the entity based on what type it is:

* To share a collection, open __Collections__ on the left of Postman and click __Share collection__ in the __...__ menu.

<img alt="Share collection" src="https://assets.postman.com/postman-docs/share-collection-from-sidebar-v8.jpg" width="600px"/>

* To share an API, open __APIs__ on the left of Postman and click __Share API__ in the __...__ menu.

<img alt="Share API" src="https://assets.postman.com/postman-docs/share-api-from-sidebar-v8.jpg" width="600px"/>

* To share an environment, open __Environments__ on the left of Postman and click __Share environment__ in the __...__ menu.

<img alt="Share environment" src="https://assets.postman.com/postman-docs/share-environment-from-sidebar-v8.jpg" width="600px"/>

You can share collections, APIs, and environments to specific workspaces. _You can additionally share collections via embed and [link](#sharing-by-link) options._

In the share modal, select the workspace you want to share the entity to. Team members in the target workspace will be able to access the entity when you share it there.

[![Share workspace selection](https://assets.postman.com/postman-docs/share-modal-workspace-selection-team-v8.jpg)](https://assets.postman.com/postman-docs/share-modal-workspace-selection-team-v8.jpg)

Toggle the radio button if you also want to remove the entity from its current workspace. If you want to share the collection but keep it in the current workspace as well, click **Share collection**. If you want the collection to be removed from the current workspace after you share it, click **Share collection and remove from current workspace**.

> When you remove a collection from a workspace, all mocks, monitors, and integrations associated with it will also be removed.

Click __Share and Continue__.

[![Share role selection](https://assets.postman.com/postman-docs/share-role-selection-v8.jpg)](https://assets.postman.com/postman-docs/share-role-selection-v8.jpg)

Select view or edit access levels for each collaborator or the workspace as a whole. Click __Save Roles__.

> Refer to [Roles and permissions](/docs/collaborating-in-postman/roles-and-permissions/) for more information on role-based user permissions.

If you want to restore a collection to a workspace it's been removed from, share the collection again. If the collection is deleted and you need to restore access to it, you will need to [recover it](/docs/sending-requests/intro-to-collections/#managing-collections) first.

## Sharing by link

You can share a collection using a link. In the collection share modal, select __Get public link__.

![Share by link](https://assets.postman.com/postman-docs/collection-get-public-link.jpg)

The link is a snapshot of your collection, so click __Update Link__ and copy it for the most up to date version. You can then share it by pasting the copied link. You can also delete the link using the trash button.

> You can manage a complete list of your active collection links from your [Postman profile](https://go.postman.co/me/collections?view=links).

## Next steps

Team members can [request access](/docs/collaborating-in-postman/requesting-access-to-collections/) to collections, environments, and APIs.

For more detail on working with environments as a team, see [Managing environments](/docs/sending-requests/managing-environments/). For more on working with APIs, see [Managing and sharing APIs](/docs/designing-and-developing-your-api/managing-apis/).
