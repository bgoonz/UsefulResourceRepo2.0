---
title: "GitHub"
order: 168
page_id: "github"
warning: false
contextual_links:
  - type: section
    name: "Prerequisites"
  - type: link
    name: "Grouping requests in collections"
    url: "/docs/sending-requests/intro-to-collections/"
  - type: section
    name: "Additional Resources"
  - type: subtitle
    name: "Related Blog posts"
  - type: link
    name: "Syncing Your OpenAPI, RAML, and GraphQL Schema to GitHub with Postman"
    url:  "https://blog.postman.com/syncing-your-openapi-raml-and-graphql-schema-to-github-with-postman/"
---

> __[Syncing API Schemas on GitHub is available with a free Postman account. You can back up your collections to GitHub on Postman Team, Business, and Enterprise plans.](https://www.postman.com/pricing)__

Postman enables you to back up your collections (for paid plans only) or synchronize your API schemas on GitHub. For each of these integrations, you'll need to [generate a GitHub personal access token](#generating-a-github-personal-access-token).

> If you are looking to import data into Postman from a GitHub repository, see [Importing via GitHub repositories](/docs/getting-started/importing-and-exporting-data/#importing-via-github-repositories).

* [Backing up collections on GitHub](#backing-up-collections-on-github)
* [Syncing API schemas on GitHub](#syncing-your-api-schemas-on-github)
* [Troubleshooting GitHub Sync](#troubleshooting-github-sync)

## Generating a GitHub Personal Access Token

In order to set up an integration, you will need a GitHub Personal Access Token.

1. Log in to [GitHub](https://github.com/).

1. If you don’t already have a Personal Access Token from GitHub, [generate a new one](https://github.com/settings/tokens).

1. For backing up your collections, select the `repo` and the `user` scope. For syncing your API schema, select only the `repo` scope.

   [![repo scope](https://assets.postman.com/postman-docs/WS-integrations-github-repo-scope.png)](https://assets.postman.com/postman-docs/WS-integrations-github-repo-scope.png)
   [![user scope](https://assets.postman.com/postman-docs/WS-integrations-github-user-scope.png)](https://assets.postman.com/postman-docs/WS-integrations-github-user-scope.png)

1. Once that token is generated, copy it and save it somewhere for future use.
   [![generated token](https://assets.postman.com/postman-docs/WS-integrations-github-generated-token.png)](https://assets.postman.com/postman-docs/WS-integrations-github-generated-token.png)

## Backing up collections on GitHub

 You can back up and sync your Postman collections with a GitHub repo. Once the integration is complete, any new changes to your collection in Postman will also appear in the repository.

 > Backing up collections on GitHub is available for Team, Business and Enterprise plans only.

1. From the [Integrations search page](https://go.postman.co/integrations/browse?category=all), search for GitHub and select it from the results.

   [![github integration](https://assets.postman.com/postman-docs/integrations-github1.jpg)](https://assets.postman.com/postman-docs/integrations-github1.jpg)

1. Next to **Backup a collection**, click **Add Integration** to authorize a backup of your Postman collections.

1. Enter your GitHub Personal Access Token and click the **Proceed** button.

   [![access token](https://assets.postman.com/postman-docs/integrations-github-schema-pat.jpg)](https://assets.postman.com/postman-docs/integrations-github-schema-pat.jpg)

1. Once the token is verified, you'll be able to configure the integration.

   [![configure](https://assets.postman.com/postman-docs/integrations-github-add.jpg)](https://assets.postman.com/postman-docs/integrations-github-add.jpg)

   * Give the integration a nickname.
   * Select a workspace containing the collection to back up.
   * Select a collection to back up.
   * Select the GitHub repository where it will be backed up.
   * Enter the directory where the collection will be pushed. If the directory does not exist, it will be created for you. If you do not specify anything, the default directory will be `Postman Collections`.
   * Enter the file name of the collection in the repository.
   * Enter the branch where the collection will be pushed. This branch must already exist in your repository. If you do not specify anything, it will be pushed to the default branch of the repository.

1. To finish, click **Add Integration**.

> Every change saved to your Postman Collection automatically commits changes to your GitHub repo in real time. You can navigate to your GitHub repository to view your collections.

[![github integrations screen](https://assets.postman.com/postman-docs/Github_Integrations5.png)](https://assets.postman.com/postman-docs/Github_Integrations5.png)

## Backing up collections to GitHub on a custom domain

Backing up collection to GitHub with a custom domain name is similar to the above, with the following differences.

1. From the initial GitHub integrations page, next to **Backup a collection (custom domain)**, click **Add Integration**.

1. In addition to your Personal Access Token, enter your GitHub Custom Domain, and click **Proceed**:

   [![access token custom](https://assets.postman.com/postman-docs/integrations-github-custom-domain-pat.jpg)](https://assets.postman.com/postman-docs/integrations-github-custom-domain-pat.jpg)

1. Complete the same steps as above to configure your collection, repository, directory, file name, and branch.

1. To finish, click **Add Integration**.

### Static IP Support

If your network is behind a firewall that requires whitelisted IP addresses, you will need to use a static IP address to enable collection backups to GitHub on custom domains.

Contact your IT team to whitelist the following static IP in your firewall to enable collection backups to GitHub:

* US East: `3.212.102.200`

Once you whitelist this IP address, calls for this integration will be able to connect to your network and allow the integration to work as expected.

## Syncing your API schemas on GitHub

Syncing your API schemas will enable a two-way sync between the schema stored in the GitHub repository and the schema on Postman.

1. From the [Integrations search page](https://go.postman.co/integrations/browse?category=all), search for GitHub and select it from the results.

1. Next to **Sync API schema**, click **Add Integration** to authorize a backup of your Postman collections.

1. Enter your Personal Access Token, select **I consent to Postman collecting and storing my GitHub Access Token**, then click **Proceed**.

1. On the next page, give the integration a nickname, select the workspace and API you want to sync with GitHub, and the GitHub repository where the schema should sync from the dropdowns, then click **Add Integration**.

   > The list of your GitHub repositories may take some time to load.

   [![github integrations screen](https://assets.postman.com/postman-docs/integrations-github-schema.jpg)](https://assets.postman.com/postman-docs/integrations-github-schema.jpg)

1. On the next page you need to set up your webhook. Go to the settings page of your GitHub repository, click **Webhooks**, then **Add webhook**. Copy over the **Payload URL** and **Secret** from Postman, set **Content type** to `application/json`, and click **Add webhook**. Refer to the [GitHub documentation](https://developer.github.com/webhooks/creating/#setting-up-a-webhook) for more detail.

   [![add webhook](https://assets.postman.com/postman-docs/addwebhook.gif)](https://assets.postman.com/postman-docs/addwebhook.gif)

1. Back to the Postman dashboard, click **Add API Version**, and select the following details:

   * The API Version you want to sync, such as `1.0`.
   * The repository directory where you want the schema file to be saved, such as `api`.
      * Leave this field blank to save the schema at the root of your repository. If the folder specified doesn't exist on the repository it will be created.
   * The name and extension of the schema file, such as `petstore.yaml`.
      * If the file doesn't exist on the repository it will be created.

   [![github integrations screen](https://assets.postman.com/postman-docs/integrations-github-schema-version.jpg)](https://assets.postman.com/postman-docs/integrations-github-schema-version.jpg)

1. To finish, click **Add API Version**.

You can sync multiple API versions by clicking **Add API Version** again. To delete an existing API version, hover over the entry, click the grey **X** to the right, then click **Remove API Version**.

> If you are linking an existing API schema on Postman to an existing schema file on GitHub, a pop-up message will appear asking which schema you want to keep. The other schema will be overwritten.

Once the integration is complete, return to the Postman app and navigate to your API. A badge will show the sync status, file, and repository.

[![github integrations screen](https://assets.postman.com/postman-docs/integrations-github-schema-done.jpg)](https://assets.postman.com/postman-docs/integrations-github-schema-done.jpg)

The sync of API schemas is two-way; after your first schema sync, each change to the schema in Postman will appear in the repository as a new commit. Similarly, if you or someone else updates the file on the GitHub repository, the API schema on Postman will be updated.

To ensure that changes made in GitHub work properly in your  collection, use the Validate option as described [here](https://learning.postman.com/docs/collaborating-in-postman/versioning-an-api/#validating-apis).

> If changes take place on the repository while you are editing the file on Postman, a **Conflict** state will be displayed. Saving the changes on Postman will override the file on GitHub.

[![commit example github](https://assets.postman.com/postman-docs/commitexamplegithub.png)](https://assets.postman.com/postman-docs/commitexamplegithub.png)

## Troubleshooting GitHub Sync

If you're having issues with your GitHub integration and find your data isn't syncing to GitHub, please ensure that the following requirements are in place:

* The GitHub integration has been added to the same workspace as the content you're trying to push to the GitHub repo.
* The correct option has been chosen when setting up your integration and selecting __Backup your Postman Collections to GitHub__, for example if you're using a custom domain.
* Your repo has been initialized with a `Readme.md` file. Check the box __Initialize this repository with a README__ and then configure a new integration on it.
* The scopes `user` and `repo` are selected when creating the access token on GitHub.
* The branch specified in the setup already exists on GitHub. _The integration will not create one if the branch doesn't exist._
* You have permissions to push to the branch.
* If all else fails, try reinstalling the integration.

> If your enterprise version of GitHub is on-premises / self-hosted, this may be a firewall issue.
