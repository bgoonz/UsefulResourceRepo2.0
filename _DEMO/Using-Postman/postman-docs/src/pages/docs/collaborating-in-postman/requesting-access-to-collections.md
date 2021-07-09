---
title: "Requesting access"
order: 73
page_id: "requesting-access-to-collections"
contextual_links:
  - type: section
    name: "Prerequisites"
  - type: link
    name: "Sharing your work"
    url: "/docs/collaborating-in-postman/sharing/"
  - type: link
    name: "Defining roles"
    url: "/docs/collaborating-in-postman/roles-and-permissions/"

warning: false

---

You can request edit access to a team member's personal or private collection, API, or monitor. You will need a link to the collection, API, or monitor, or have access to it in Postman. When you submit a request, the owner will receive a notification prompting them to choose whether to grant you the role.

- [Requesting access to collections](#requesting-access-to-collections)
    - [Requesting editor role on a collection](#requesting-editor-role-on-a-collection)
- [Requesting access to APIs](#requesting-access-to-apis)
    - [Requesting editor role on an API](#requesting-editor-role-on-an-api)
- [Requesting access to Monitors](#requesting-access-to-monitors)
    - [Requesting editor role on a monitor](#requesting-editor-role-on-a-monitor)
- [Approving requests for access](#approving-requests-for-access)

## Requesting access to collections

You will have a viewer role on a collection by default. You can request an editor role on a collection.

### Requesting editor role on a collection

There might be collections that you can view but not edit. These collections have a lock icon next to the collection name.

<img alt="Collection Lock" src="https://assets.postman.com/postman-docs/collection-lock-v8.jpg" width="300px">

You can request the Editor role on this collection:

1. Click the ellipsis icon (...) next to the collection name in the sidebar to open the following menu and choose **Manage Roles**.
<img alt="Collection Context Menu" src="https://assets.postman.com/postman-docs/collection-context-menu-v8.jpg" width="300px">

2. Click **Request Access** in the modal.
<img alt="Manage Roles Blocked" src="https://assets.postman.com/postman-docs/manage-roles-blocked-v8.jpg">

3. Select a person to send the request to and select the __Editor__ [role](/docs/collaborating-in-postman/roles-and-permissions/) from the __Role__ dropdown list.
<img alt="Request Additional Access" src="https://assets.postman.com/postman-docs/request-additional-access-v8.jpg">

4. Complete your request by clicking **Request Access**.

This will trigger an email to the person you requested access from. When they approve your request, you will be notified by email. Your request will expire in 15 days, but you can make additional requests on the same collection after that period.

## Requesting access to APIs

You will have a viewer role on an API by default. You can request an editor role on an API.

### Requesting editor role on an API

There might be APIs that you can view in your team workspace but can't edit. These APIs have a lock icon next to the API name.

<img alt="Requesting Editor Role on an API" src="https://assets.postman.com/postman-docs/request-access-to-api-v8.jpg" width="300px">

You can request the Editor role on this API:

1. Click the ellipsis icon (...) next to the API name in the sidebar to open the following menu and choose **Manage Roles**.
<img alt="Manage roles for API" src="https://assets.postman.com/postman-docs/request-editor-api-manage-roles-v8.jpg" />

2. Click **Request Access** in the modal.

3. Select a person to send the request to and select the __Editor__ [role](/docs/collaborating-in-postman/roles-and-permissions/) from the __Role__ dropdown list.

4. Complete your request by clicking **Request Access**.
<img alt="Request Access to API" src="https://assets.postman.com/postman-docs/request-editor-role-on-api-v8.jpg"/>

This will trigger an email to the person you requested access from. When they approve your request, you will be notified by email. Your request will expire in 15 days, but you can make additional requests on the same API after that period.

## Requesting access to Monitors

Editing a monitor requires you to have edit access for that specific monitor.

### Requesting editor role on a monitor

To get edit access for a monitor, you will first need to be a member of the team that owns the monitor, and then a member of the workspace that contains the monitor.

Once you have joined the team and [joined the workspace](/docs/collaborating-in-postman/using-workspaces/managing-workspaces/#joining-workspaces), navigate to the monitor in question in Postman. In the upper right, hover over the monitor and select **...** > **Edit**.

<img src="https://assets.postman.com/postman-docs/manage-roles-request-access-monitor.jpg" alt="Manage roles request access"/>

Click **Request Access**.

<img src="https://assets.postman.com/postman-docs/manage-roles-request-access-monitor-21.jpg" alt="You need additional access modal"/>

Select the team member you would like to send your request to and the **Editor** role, then **Request Access**.

<img src="https://assets.postman.com/postman-docs/request-access-monitor-send-request.jpg" alt="Request access to monitor" width="500px"/>

When your request for access is approved, you will receive a notification in Postman.

## Approving requests for access

Your team members can request access from you in the following cases:

1. If your team members have the link to a personal collection, API, or monitor, they won't be able to view it, but they will be able to see the name and request access to it.

2. If you have the Editor role on a collection, API, or monitor that is shared, a team member who has the Viewer role will be able to request an additional role from you.

> The Viewer role is available depending on your [Postman plan](https://www.postman.com/pricing).

You will receive an email detailing the request for access.

![Request Detail Email](https://assets.postman.com/postman-docs/request-detail-email-v8.jpg)

Click **Approve Request** if you want to grant access to the collection, API, or monitor. If you do not wish to give access, you can ignore the request. A request for access will expire in 15 days.

To learn more about how you can collaborate with your team in Postman, see [Working with your team](/docs/collaborating-in-postman/collaboration-intro/).
