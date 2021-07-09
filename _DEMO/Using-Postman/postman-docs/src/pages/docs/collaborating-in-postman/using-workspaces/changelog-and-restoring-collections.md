---
title: "Viewing workspace activity"
order: 79
page_id: "changelog_and_restoring_collections"
contextual_links:
  - type: section
    name: "Prerequisites"
  - type: link
    name: "Grouping requests in collections"
    url: "/docs/sending-requests/intro-to-collections/"
  - type: section
    name: "Additional Resources"
  - type: section
    name: "Associated Topics"
  - type: link
    name: "Intro to Integrations"
    url: "/docs/integrations/intro-integrations/"

warning: false
---

> **[Changelog is available on Postman Team, Business, and Enterprise plans.](https://www.postman.com/pricing/)**

Your Postman collections display a changelog for reviewing create, update, and delete events. You can use the changelog to keep track of any updates you and your collaborators make to your private and team collections. The changelog also lets you rollback a collection and restore it to any previous point in time. Postman also tracks activity within teams and accounts.

## Contents

* Viewing changes to a [collection](#viewing-the-collection-changelog), [workspace](#viewing-workspace-activity), [team](#viewing-team-activity), or [user account](#viewing-user-activity).
* [Restoring collections and folders](#restoring-collections-and-folders)
* [Exporting team activity](#exporting-team-activity-to-other-platforms)
* [Next steps](#next-steps)

## Viewing the collection changelog

To review the changelog for a collection in Postman, select the __Collections__ tab in the left sidebar and click the __Changelog__ icon on the right of Postman to see a chronological list of collection activities.

The changelog indicates the date of each update, the user who carried it out, what type of update they performed, and the time the change occurred. The changelog collates consecutive updates on the same session to the same entity for readability.

![Collection changelog](https://assets.postman.com/postman-docs/collection-changelog-v8.jpg)

With a Postman Team, Business, or Enterprise account, you can see generated diffs detailing changes to a collection.

<img alt="Changelog diffs" src ="https://assets.postman.com/postman-docs/changelog-diff-v8.jpg" width=400px/>

## Viewing workspace activity

You can [access the activity feed from Postman](#accessing-the-activity-feed-from-postman). The activity feed will show information on who added or removed collections, environments, or entities from the workspace as well as members joining and leaving the workspace. You can [filter this information](#filtering-the-activity-feed) directly within the activity feed.

You can also see who is actively working in your workspace at any time. The avatars of members currently active in the workspace will be brightly colored and displayed at the top of your Postman screen.

<img alt="Active user" src="https://assets.postman.com/postman-docs/active-member-v8.jpg" width="300px"/>

### Accessing the activity feed from Postman

To access the activity feed in Postman, select the Overview tab and navigate to the **Activity** section to see the events that have occured within the workspace.

[![Activity feed from postman](https://assets.postman.com/postman-docs/activity-feed-overview-v8.jpg)](https://assets.postman.com/postman-docs/activity-feed-overview-v8.jpg)

### Filtering the activity feed

Filtering the activity feed allows you to display the relevant information directly instead of having to scroll through the feed. You can choose to filter by [user](#filtering-by-user) or by [entity](#filtering-by-entity) (Workspace, API, Collection, Environment).

To reset your search, click **Clear filters** at the right of the activity feed. You can also refresh the results by clicking **Refresh** at the right of the activity feed.

#### Filtering by user

Filtering by user will only display the actions the specified user carried out.
To filter by user, click **User** at the top of the activity feed and select the user(s). You can search for a specific user by typing their name in the search field. Once you have selected the user(s), click **Apply**.

> The user list will only show the users that are part of the workspace, not all team members.

[![Activity filtering by user](https://assets.postman.com/postman-docs/filter-by-user.gif)](https://assets.postman.com/postman-docs/filter-by-user.gif)

#### Filtering by entity

Filtering by entity will only display the actions carried out on the selected entity type. Available entities are `Workspace`, `API`, `Collection`, and `Environment`.
To filter by entity, click **Entity** at the top of the activity feed and select the entity or entities. You can search for a specific entity by typing its name in the search field. Once you have selected the entity or entities, click **Apply**.

> You can access the changelog of a specific collection by clicking **View Changelog** next to actions on collections.

[![Activity filtering by entity](https://assets.postman.com/postman-docs/filter-by-entity.gif)](https://assets.postman.com/postman-docs/filter-by-entity.gif)

## Viewing team activity

You can review the activity for a team with a Postman Team, Business, or Enterprise account. In [Postman](https://app.getpostman.com), use the __Workspaces__ dropdown to select your team, then navigate to the __Activity__ feed to view the events.

## Viewing user activity

You can review the activity for your own account in [Postman](https://app.getpostman.com). Click your avatar in the top right, and select __Profile__ — the __Activity__ tab will list your events.

## Restoring collections and folders

With a Postman Team, Business, or Enterprise account, you can use the changelog to restore a collection to a previous point in time. Click __Restore__ under a change to revert the collection to the point immediately _after_ the change was applied. The changelog will update and Postman will display a confirmation message indicating the time the collection has been restored to.

<img alt="Restore from changelog" src="https://assets.postman.com/postman-docs/restore-changelog-v8.jpg" width="400px"/>

If you accidentally delete a folder, you can recover it by clicking __Restore__.

<img alt="Recover folder" src="https://assets.postman.com/postman-docs/restore-folder-v8.jpg" width="400px"/>

You may see a warning on any request tabs you have open that are affected by reverting the collection, for example indicating a conflict or deletion.

![Revert conflict](https://assets.postman.com/postman-docs/revert-conflict-v8.jpg)

Postman will prompt you to resolve any conflicts that may cause you to lose unsaved data.

## Exporting team activity to other platforms

With a Postman Team, Business, or Enterprise account, you can pipe team activity feeds to external communication channels:

* [Slack integration](/docs/integrations/available-integrations/slack/)
* [Microsoft Teams integration](/docs/integrations/available-integrations/microsoft-teams/)  

## Next steps

For more on working with a team in Postman, see the [collaboration intro](/docs/collaborating-in-postman/collaboration-intro/). To learn how to invite input on your API projects, see [sharing your work](/docs/collaborating-in-postman/sharing/).
