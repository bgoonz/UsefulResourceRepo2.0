---
title: "BigPanda"
order: 164
page_id: "bigpanda"
warning: false
contextual_links:
  - type: section
    name: "Prerequisites"
  - type: link
    name: "Grouping requests in collections"
    url: "/docs/sending-requests/intro-to-collections/"
---

> **[Integrations are available on Postman Team, Business, and Enterprise plans.](https://www.postman.com/pricing/)**

BigPanda is an IT systems management platform that aggregates and correlates IT alerts to create high-level IT incidents. It directs all alerts to a single place with different connected services.

Setting up a BigPanda integration requires you to get an API key and configure Postman monitors.

After you set up the integration, you can view real-time alerts based on the results of your Postman monitors.

## Retrieving the BigPanda API key

1. Log in to your [BigPanda](https://www.bigpanda.io/) account and select "Integrations" in the header toolbar, then select **New Integration**.

1. Select "Alerts REST API" and then select the **Integrate**.

   ![alerts REST API](https://assets.postman.com/postman-docs/58834897.jpg)

1. To generate the App key, enter a name for the integration and select the **Generate App Key**.

   ![generate app key](https://assets.postman.com/postman-docs/bigPanda_generateAppkey.jpg)

   The generated App Key displays.

   ![results app key](https://assets.postman.com/postman-docs/bigPanda-appKey.jpg)

1. Save the generated App key and the API key for use later.

## Configuring Postman monitors

1. Select **[Home](https://go.postman.co/home)**.

    ![postman home page](https://assets.postman.com/postman-docs/bigpanda-home.jpg)
1. Select **[Integrations](https://go.postman.co/integrations)**.

    ![select integrations](https://assets.postman.com/postman-docs/bigpanda-integrations.jpg)
1. Select **[Browse All Integrations](https://go.postman.co/integrations/browse?category=all)**.
1. Search and select **BigPanda**.

    ![bigpanda search all](https://assets.postman.com/postman-docs/bigpanda-search-all.jpg)
1. Select **Add Integration**.

    ![add bigpanda configuration](https://assets.postman.com/postman-docs/bigpanda-add-integration.jpg)
1. Enter your BigPanda configuration.
    * Give a nickname to your integration.
    * Select the workspace to which your monitor belongs to.
    * Select a monitor.
    * Enter the BigPanda app key.
    * Enter the API token for the app.

    ![save bigpanda config](https://assets.postman.com/postman-docs/bigpanda-save-config.jpg)
1. Select **Add Integration**.

You can send the results of multiple monitors to the same BigPanda collection.
BigPanda gives you real-time alerts based on the results of your Postman Monitors. If there was a failed test or if an error occurred during the run, an alert is created on BigPanda, which would then alert the user.

![view in bigpanda](https://assets.postman.com/postman-docs/58835364.jpg)
