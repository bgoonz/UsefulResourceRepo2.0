---
title: "Using the Scratch Pad"
order: 7.1
page_id: "using-the-scratch-pad"
warning: false
---

The _Scratch Pad_ is a space where you can work while not being connected to Postman Servers. When you aren't logged in or don't have a network connection, you can still access some Postman features offline, such as creating collections and requests, or sending requests.

All your work in the Scratch Pad will be stored locally and will not be synced online with Postman. After working in the Scratch Pad, you can later move your work into a workspace once you log in.

## Entering the Scratch Pad

If you're logged out or your connection to Postman is broken, you'll see a global banner at the top of the screen indicating that you're already in the Scratch Pad.

<img alt="Scratch Pad global banner" src="https://assets.postman.com/postman-docs/scratch-pad-notice.jpg" width="350px" />

If you are logged in and want to go to the Scratch Pad, click the gear icon to the right side of the header toolbar and select **Scratch Pad**.

<img alt="Enter Scratch Pad" src="https://assets.postman.com/postman-docs/scratch-pad-enter.jpg" width="200px" />

## Scratch Pad features

While you are in the Scratch Pad, you can:

* Create, edit, rename, or delete a collection, folder, environment, HTTP request, or WebSocket request.
* Send a request.
* View your history of your sent requests.
* Write and execute test scripts and visualizers.
* Export collections and environments.
* Edit documentation for a collection or request.

## Leaving the Scratch Pad

To leave the Scratch Pad:

1. Ensure you have a network connection to Postman, and log in.
1. Switch to a workspace using the **Workspaces** menu at the top of Postman. For more information, see [Using and managing workspaces](/docs/collaborating-in-postman/using-workspaces/managing-workspaces/).

> You can also select **Switch to a Workspace** from the Scratch Menu global banner at the top of the screen.

## Exporting data from the Scratch Pad

When you leave the Scratch Pad, your data remains there; you won't see it in your workspace. But you can export the data from the Scratch Pad, then import it to a workspace.

To export all Scratch Pad data:

1. Go to the Scratch Pad.
1. Select the gear icon in the upper-right corner to open **Settings**, and select the **Data** tab.
1. Click **Export Data**.
1. This opens the **Export data** page in your web browser. Click **Export Data**.
1. Select **Collections**, **Environments**, or both, and select **Request Data Export**.
1. You'll get an email with a link to download the data dump, which is a single JSON file containing your data.

You can also export a single collection or an environment. For more information, see [Exporting Postman data](/docs/getting-started/importing-and-exporting-data/#exporting-postman-data)

To import Scratch Pad data:

1. Log in and switch to a workspace using the **Workspaces** menu at the top of Postman. For more information, see [Using and managing workspaces](/docs/collaborating-in-postman/using-workspaces/managing-workspaces/)
1. Click **Import** in the upper-left corner.
1. Drag and drop your exported data dump, collection, or environment and click **Import**.

For more information on importing, see [Importing data into Postman](/docs/getting-started/importing-and-exporting-data/#importing-data-into-postman).
