---
title: "Creating workspaces"
order: 77
page_id: "creating_workspaces"
contextual_links:
  - type: section
    name: "Prerequisites"
  - type: link
    name: "Working with your team"
    url: "/docs/collaborating-in-postman/collaboration-intro/"
  - type: section
    name: "Additional Resources"
  - type: subtitle
    name: "Related Blog Posts"
  - type: link
    name: "Workspaces! What are they good for?"
    url: "https://blog.postman.com/workspaces-the-biggest-thing-to-hit-postman-this-month/"
  - type: link
    name: "Setting up your first public workspace"
    url: "https://blog.postman.com/how-to-set-up-public-workspaces/"
  - type: subtitle
    name: "Case Studies"
  - type: link
    name: "Movember Foundation"
    url: "https://www.postman.com/case-studies/movember-foundation/"
  - type: subtitle
    name: "Videos"
  - type: link
    name: "Team collaboration with Postman"
    url: "https://www.youtube.com/watch?v=8tLvvQ-3Nx0"
  - type: section
    name: "Next Steps"
  - type: link
    name: "Using and managing workspaces"
    url: "/docs/collaborating-in-postman/using-workspaces/managing-workspaces/"

warning: false

---

Workspaces allow you to organize your Postman work and collaborate with teammates. You can group your projects together, with workspace acting as the single source of truth for related APIs, collections, environments, mocks, monitors, and other linked entities. By collaborating in a workspace, your edits are synced with your team in realtime.

[![Create workspace homepage](https://assets.postman.com/postman-docs/create-workspace-homepage.jpg)](https://assets.postman.com/postman-docs/create-workspace-homepage.jpg)

Personal workspaces are visible only to you—with a [Postman account](/docs/getting-started/postman-account/) you can create unlimited workspaces. With team workspaces, you can share and manage access to project components with collaborators. [Public workspaces](/docs/collaborating-in-postman/public-workspaces/) enable you to collaborate on entities with anyone across the world.

By sharing a component such as a collection to a workspace, collaborators with access to the workspace can also access it—by default with readonly permissions. You can [configure access settings](/docs/collaborating-in-postman/roles-and-permissions/) for the workspace on an individual basis to provide permissions depending on your account.

Workspaces can also create visibility for the projects within a team, since collections in the workspace are visible to all members sharing it. Request history is also saved to a workspace, which can aid collaborative debugging efforts.

> For Postman Business and Enterprise teams, a private workspace is a team workspace that is only visible to the user who created it, plus team members who have been invited to join it. Private workspaces allow teams to restrict access to collections, environments, mocks, and monitors that are relevant only to a particular group.

## Creating a new workspace

To create a new workspace, select the workspace dropdown menu at the left of Postman, and click **New Workspace**.

<img alt="Create new workspace" src="https://assets.postman.com/postman-docs/default-create-new-workspace.jpg" width="300px"/>

Use the visibility dropdown to choose a __Personal__, __Team__, __Private__, or __Public__ workspace. Note that you can share elements to a different workspace at a later date if you are not sure which type to create.

To create a personal workspace, enter the workspace name and summary. Select the visibility dropdown menu and choose __Personal__.

<img alt="Personal Workspace" src="https://assets.postman.com/postman-docs/create-personal-workspace.jpg" width="500px"/>

To create a team workspace, enter the workspace name and summary. Select the visibility dropdown menu and choose __Team__. Add collaborators by entering their email addresses, then define their [workspace roles](/docs/collaborating-in-postman/roles-and-permissions/#workspace-roles).

[![Team workspace](https://assets.postman.com/postman-docs/create-team-workspace.jpg)](https://assets.postman.com/postman-docs/create-team-workspace.jpg)

If you are an Admin user and add any email addresses not associated with current team members, they will be invited to join the team.

> Postman Business and Enterprise users can check the box to limit visibility of this workspace to invited members, making a [private workspace](/docs/collaborating-in-postman/using-workspaces/managing-workspaces/).

Click **Create Workspace** and Postman will open your new workspace. You can add elements to the workspace and invite new members using the __Invite__ button at the top at any time.

To create a new workspace, you can click the __New__ button above the navigation bar, select __Workspace__ and follow the same steps.

[![Create workspace new button](https://assets.postman.com/postman-docs/create-workspace-new-button-v8.jpg)](https://assets.postman.com/postman-docs/create-workspace-new-button-v8.jpg)

You can also create a new workspace in the [Workspaces dashboard](https://app.getpostman.com/dashboard). Click **Create New** and follow the same steps.

[![Create new workspace dashboard](https://assets.postman.com/postman-docs/create-new-workspace-dashboard.jpg)](https://assets.postman.com/postman-docs/create-new-workspace-dashboard.jpg)

## Next steps

Check out some tips on how to [use and manage your workspaces](/docs/collaborating-in-postman/using-workspaces/managing-workspaces/). You can also use your workspace [activity feed](/docs/collaborating-in-postman/using-workspaces/changelog-and-restoring-collections/) to keep up to date with progress on the projects within it.
