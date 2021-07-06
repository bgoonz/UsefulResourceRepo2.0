---
title: "Your Private API Network"
order: 73.2
page_id: "adding_private_network"
warning: false
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
    name: "Team collaboration with Postman"
    url: "https://www.youtube.com/watch?v=8tLvvQ-3Nx0"
  - type: section
    name: "Next Steps"
  - type: link
    name: "Documenting your API"
    url: "/docs/publishing-your-api/documenting-your-api/"
  - type: link
    name: "Generating collections from the API"
    url: "/docs/designing-and-developing-your-api/the-api-workflow/"

---

You can share the APIs that your team uses internally to the Private API Network. Your team can learn about and access these APIs and start using them right away.

<img alt="Private API Network" src="https://assets.postman.com/postman-docs/private-api-network-v8.jpg"/>

1. In the top left, select **Home**.
1. In the left navigation bar, select **Private API Network** to go directly to your team's [Private API Network](https://www.postman.com/network/private).

<img alt="Private API Network GIF" src="https://assets.postman.com/postman-docs/private-api-network-home-page-v8.gif"/>

> To add your API to the network, it must be in the [API Builder](/docs/designing-and-developing-your-api/the-api-workflow/). You can only add APIs, not collections, to the Private API Network.

## Contents

* [Adding your APIs](#adding-your-apis)
    * [Security](#security)
    * [Guidelines](#guidelines)
* [Folders in Private API Network](#folders-in-private-api-network)
* [Discovering and consuming private APIs](#discovering-and-consuming-private-apis)
* [Next steps](#next-steps)

### Adding your APIs

> You can only add an API to the network if you have edit access to the API, and your team members have permission to view or edit the API. Learn more about [roles and permissions](/docs/collaborating-in-postman/roles-and-permissions/).

To add an API to your team's Private API Network from [Postman](https://go.postman.co), sign in and select **Private API Network** in the left navigation bar.

<img alt="Private API Network Left Navbar" src="https://assets.postman.com/postman-docs/private-api-network-left-navbar-v8.jpg" height="350px"/>

The default view is your team's [Private API Network](https://go.postman.co/network/private). To add an API to your team's Private API Network, in the left navigation bar, select **+ Add New**.

<img alt="Private API Network" src="https://assets.postman.com/postman-docs/private-api-network-v8.jpg"/>

In the modal, choose the workspace containing the API you want to add to the network. You can select one or more APIs to add to the network at one time. For each API selected, specify the versions to add. Select **Next** and then the folder to add the APIs to. Select **Add to Network**.

<img alt="Add API Modal" src="https://assets.postman.com/postman-docs/add-new-api-to-network-v8.jpg" width="500px"/>

> The APIs that you add to the Private API Network reflect the latest state of the API in your team workspace. In other words, changes made to the API in the workspace will be reflected in the network in real time.

The API will immediately be visible in your team's [Private API Network](https://go.postman.co/network/private). From the listing, you can edit the network listing or remove the API from the network.

![Listing APIs in Private API Network](https://assets.postman.com/postman-docs/private-api-network-listing-v8.gif)

You can also add an API to your team's Private API Network from Postman. Go to the [API Builder](/docs/designing-and-developing-your-api/the-api-workflow/) via **APIs** in the left navigation bar. Select an API to see a high-level description on the **Overview** tab. You can **Edit Private API Network listing** next to the version details on the right.

![Edit private api network listing](https://assets.postman.com/postman-docs/edit-private-api-network-listing-v8.jpg)

#### Security

Private APIs are only visible to logged in users who are a part of your Postman team. They are not discoverable or accessible to anyone who is not a part of your team.

#### Guidelines

To submit an API to the network, you must have edit access to the API. You cannot add an API to the private network unless all team members have at least view access to the API. Learn more about team [roles and permissions](/docs/collaborating-in-postman/roles-and-permissions/).

### Folders in Private API Network

You can create new folders from the Private API Network view. Click __Add New__, then select __Folder__ to create a new folder.

![New folder in Private Network](https://assets.postman.com/postman-docs/add-new-folder-api-network-v8.jpg)

Once you've created the folder, click __Add New__ and select __APIs__ to add APIs to your Team's API Network. You can choose the workspace and then select as many APIs you want to add to the network at one time. For each API selected, specify the versions to add. Click __Add__.

<img alt="Add APIs Workspace" src="https://assets.postman.com/postman-docs/add-apis-workspace.jpg" width="400px"/>

To edit the API setting, click __Edit Network Listing__ icon.

<img alt="Edit Network Listing" src="https://assets.postman.com/postman-docs/edit-network-listing-v8.jpg"/>

You can change the versions, update the API summary, and modify the folder to which the API should be added.

<img alt="Edit Summary 2" src="https://assets.postman.com/postman-docs/edit-api-summary-2.jpg" width="400px"/>

You can also remove the added APIs from Postman's API Network. Click the trash icon next to the API you would like to remove from network. Once you click __Remove API__, your team members will also lose access to the API via the network.

<img alt="Remove API fom Network" src="https://assets.postman.com/postman-docs/remove-from-private-network-v8.jpg"/>

The sidebar navigation displays the folder structure for your Private API Network. You can also drag and drop the APIs and subfolders to different folders.

<img alt="Sidebar Navigation" src="https://assets.postman.com/postman-docs/sidebar-navigation-v8.jpg" width="400px"/>

> You can use the search box to search across folders, subfolders, and APIs in your Private API Network. You can also filter the folders, subfolders, and APIs based on name and recently added.

## Discovering and consuming private APIs

The Private API Network is a good place to learn about APIs shared within your team. You can browse private APIs in [the Private API Network](https://go.postman.co/network/private) under your team name, or explore public APIs in [the public API network](https://www.postman.com/explore).

> Private APIs are only visible to logged in users who are a part of your Postman team.

Under your team name, you can browse a directory of APIs shared within your team. Select an API to see a high-level description.

<img alt="Private API List" src="https://assets.postman.com/postman-docs/private-api-network-list-v8.jpg"/>

You can review information about the API and the description. Click **Open Schema** to edit the schema or make changes to the API directly. You can see team collaborators and activities like recently added collections associated with this API.

You can also review version-level details on the right. All available versions are listed below, with an indicator of the active version as well as the versions listed to the network.

<img alt="Published to network" src="https://assets.postman.com/postman-docs/private-api-high-level-overview-v8.jpg"/>

**Add to Private API Network** will display if you haven't added the API to the private network.

<img alt="Add to Private API Network" src="https://assets.postman.com/postman-docs/add-to-private-api-network-v8.jpg"/>

## Next steps

* [Writing API documentation](/docs/publishing-your-api/authoring-your-documentation/)
* [Generating collections from the API](/docs/designing-and-developing-your-api/the-api-workflow/)
