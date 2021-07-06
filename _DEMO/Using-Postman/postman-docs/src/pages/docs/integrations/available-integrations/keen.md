---
title: "Keen"
order: 171
page_id: "keen"
warning: false
contextual_links:
  - type: section
    name: "Prerequisites"
  - type: link
    name: "Grouping requests in collections"
    url: "/docs/sending-requests/intro-to-collections/"
---

> **[Integrations are available on Postman Team, Business, and Enterprise plans.](https://www.postman.com/pricing/)**

You can use Keen IO for API-based computation, Amazon S3 backups, and building visualizations and dashboards for your APIs. Connect your Postman Monitor results to Keen Streams with the Postman to Keen Integration.

Setting up a Keen integration requires you to get a project ID and API key before configuring Postman Monitors to push to Keen steams. After you set up the integration, you can view all monitoring data in Keen IO.

## Retrieving your Keen IO project ID and API Key

1. Log in to [Keen IO](https://keen.io/home/).
1. Select **Projects**.

    ![keen dashboard](https://assets.postman.com/postman-docs/keen-projects.jpg)
1. Find the organization and project for which you’d like to stream Postman Monitor data.
1. Select the **Access** tab in the dashboard.
1. Make a note of your project ID and API key to use later.

    ![keen dashboard](https://assets.postman.com/postman-docs/keen-write-key.jpg)

## Configuring Postman monitors

In the **[Integrations](https://go.postman.co/workspaces)** tab for your workspace, select Keen IO from the list of third party integrations.

[![keen dashboard](https://assets.postman.com/postman-docs/integrations_keen1.png)](https://assets.postman.com/postman-docs/integrations_keen1.png)

Click the **View Details** button to see information about Keen IO.

From the **[Integrations search page](https://postman.postman.co/integrations/browse?category=all)** search and select Keen IO.

![keen dashboard](https://assets.postman.com/postman-docs/keen-search-all.jpg)

Select **Add Integration**.

![keen dashboard](https://assets.postman.com/postman-docs/keen-add-integration.jpg)

Enter your integration information to connect Keen IO to Postman Monitors for API-based computation, S3 backups, and building visualizations in the **Send Monitor Run Results** page.

![keen dashboard](https://assets.postman.com/postman-docs/keen-add-integration-configuration.jpg)

Select **Add Integration**. You can send the results of multiple monitors to the same Keen IO collection.

## Viewing data in Keen IO

Within a few minutes, you should start to see data flowing into Keen IO if your Monitor is running. If you’ve sent the results of multiple Postman Monitors to Keen, you’ll be able to segment by Monitor name/id, Collection name/id, error code, and so on.

Here’s a preview of analyses from the Postman Monitors integration. You can build visualizations into dashboards that your team or customers can view with [Keen dashboard templates](https://keen.io/docs/visualize/how-to-create-a-dashboard/).

[![keen analytics](https://assets.postman.com/postman-docs/keen_dashboard2.png)](https://assets.postman.com/postman-docs/keen_dashboard2.png)
