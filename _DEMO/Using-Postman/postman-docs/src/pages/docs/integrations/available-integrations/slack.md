---
title: "Slack"
order: 178
page_id: "slack"
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
    name: "Videos"
  - type: link
    name: "Updated: Using Variables in Postman Requests & Collections"
    url: "https://www.youtube.com/watch?v=X_CEYzhjCnI&t=24s"
  - type: subtitle
    name: "Related Blog Posts"
  - type: link
    name: "Librarian: building a serverless slack app using Postman and Airtable"
    url: "https://blog.postman.com/librarian-building-a-serverless-slack-app-using-postman-and-airtable/"
---

> **[Integrations are available on Postman Team, Business, and Enterprise plans.](https://www.postman.com/pricing/)**

The Postman to Slack integration enables you to receive notifications for the Team Activity Feed, Postman Search, and Monitor Run Results.

## Configuring Postman with Slack

From the [Integrations search page](https://go.postman.co/integrations/browse?category=all) search for Slack and select it from the results.

![search for slack integration](https://assets.postman.com/postman-docs/slack-search-all.jpg)

From the integration details page you can choose to:

* Post team activity

  Add your team's Activity Feed to specified Slack channels.

* Post monitoring results

  Send your Monitor Run Results to specified Slack channels.

![select slack integration](https://assets.postman.com/postman-docs/slack-post-monitoring-results.jpg)

Select **View All** to view all instances of the integration created by your team.

## Add an Activity Feed to Slack

In the **Slack Details** page, click the **Add Integration** button for Team Activity Feed.

In the **Team Activity Feed** page, click the **Authorize** button.

[![authorize slack](https://assets.postman.com/postman-docs/WS-integrations-slack-teamactivityfeed.png)](https://assets.postman.com/postman-docs/WS-integrations-slack-teamactivityfeed.png)

In the **Slack sign in to your workspace** page, enter your workspace’s Slack URL, and click the **Continue** button.

[![signin slack](https://assets.postman.com/postman-docs/WS-integrations-slack-signin.png)](https://assets.postman.com/postman-docs/WS-integrations-slack-signin.png)

In the **Sign in to Postman** page, enter your email address and password and click the **Sign In** button.

[![company_slack](https://assets.postman.com/postman-docs/WS-integrations-slack-signin-company.png)](https://assets.postman.com/postman-docs/WS-integrations-slack-signin-company.png)

In the **Select channel** page, select the channel where you want to post and click the **Authorize** button.

[![auth_slack](https://assets.postman.com/postman-docs/WS-integrations-slack-identity.png)](https://assets.postman.com/postman-docs/WS-integrations-slack-identity.png)

The team activity appears in the **Configured Integrations** page.

[![configured_slack](https://assets.postman.com/postman-docs/WS-integrations-slack-configured.png)](https://assets.postman.com/postman-docs/WS-integrations-slack-configured.png)

## Send your Monitor Run Results to Slack

From the [Slack integration details](https://postman.postman.co/integrations/service/slack) page select **Add Integration** for **Post monitoring results** option.

On the **Permission request** page, select the Slack channel your want to post to and select **Allow**.

![configured_slack](https://assets.postman.com/postman-docs/slack-post-monitoring-results-permission.jpg)

![configured_slack](https://assets.postman.com/postman-docs/slack-post-monitoring-results-authorized.jpg)

Return to the browser tab for Postman and enter the following:

* Nickname

  A nickname for your integration.

* Workspace

  The workspace your monitor belongs to.

* Monitor

  The results of the monitor will be sent to Slack.

* Slack Webhook URL

  This option is pre-filled with information from the authorization process.

* Slack Channel
  This option is pre-filled with the information from the authorization process.

* Advanced Options:

    * Notify for completed monitor runs
    * Notify for 3 failures and the first success
>
    > You can click the Advanced Options link to indicate if you want notifications for all completed monitor runs, or notifications for three failed monitor runs and then the first successful monitor run.

![configured_slack](https://assets.postman.com/postman-docs/slack-post-monitoring-results-save-config.jpg)

The following is an example of a set of monitor results when sent to Slack:

![configured_slack_example](https://assets.postman.com/postman-docs/slack-post-monitoring-results-example.jpg)
