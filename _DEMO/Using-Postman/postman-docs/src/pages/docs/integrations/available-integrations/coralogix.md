---
title: "Coralogix"
order: 165
page_id: "coralogix"
warning: false
contextual_links:
  - type: section
    name: "Prerequisites"
  - type: link
    name: "Grouping requests in collections"
    url: "/docs/sending-requests/intro-to-collections/"
---

> **[Integrations are available on Postman Team, Business, and Enterprise plans.](https://www.postman.com/pricing/)**

Coralogix is a machine learning powered log analytics platform which drastically improves the delivery and maintenance process for software providers. This integration allows you to configure your Postman Monitors to send metrics to Coralogix where you can visualize and compare metrics.

Setting up a Coralogix integration requires you to get an API key from Coralogix and configure your Postman Monitors. After you set up the integration, you can view real-time alerts based on the results of your monitors.

## Retrieving your Coralogix Private Key

Log in to [Coralogix](https://dashboard.coralogix.com/#/login). The following screen appears:

[![coralogix settings](https://assets.postman.com/postman-docs/Coralogix_Settings.png)](https://assets.postman.com/postman-docs/Coralogix_Settings.png)

Click "Settings" to go to the following screen:

[![coralogix settings](https://assets.postman.com/postman-docs/Coralogix_Pvtkey1.png)](https://assets.postman.com/postman-docs/Coralogix_Pvtkey1.png)

Navigate to "Send your logs" tab and copy the private key for later use, as illustrated in the above screen (highlighted in red circle).

## Configuring Coralogix Integration

1. From the [Integrations](https://go.postman.co/integrations/browse?category=all) page, search and select Coralogix from the list of integrations.

   ![coralogix integrations page](https://assets.postman.com/postman-docs/coralogix-search-all-b.jpg)

1. Select **Add Integration** to start configuring the integration for your workspace.

    ![coralogix integrations page](https://assets.postman.com/postman-docs/coralogix-add-integration.jpg)

1. To send your monitor metrics and events to Coralogix:

    * Select the monitor whose data you would like to send to Coralogix.
    * Enter a Coralogix private key.
    * Optionally indicate if you want to send collection or environment details for each run.

    Select **Add Integration** to save the configuration.

## Analyzing metrics in Coralogix

Once the data starts flowing into Coralogix, you can view and analyze these metrics in the Coralogix dashboard, as illustrated in the screen below:

[![coralogix dashboard](https://assets.postman.com/postman-docs/coralogix_dashboard1.png)](https://assets.postman.com/postman-docs/coralogix_dashboard1.png)

Click 'logs' tab to a view a list of all logs. You can filter the services by name. As many services may be running in your system, you can filter by selecting Postman to view all coralogix logs for Postman. The schema appears, as illustrated below:

[![coralogix logs view](https://assets.postman.com/postman-docs/coralogix_schema1.png)](https://assets.postman.com/postman-docs/coralogix_schema1.png)
