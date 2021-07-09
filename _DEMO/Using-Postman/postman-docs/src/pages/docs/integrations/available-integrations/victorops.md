---
title: "VictorOps"
order: 179
page_id: "victorops"
warning: false
contextual_links:
  - type: section
    name: "Prerequisites"
  - type: link
    name: "Grouping requests in collections"
    url: "/docs/sending-requests/intro-to-collections/"
  - type: link
    name: "Intro to Monitoring"
    url: "/docs/designing-and-developing-your-api/monitoring-your-api/intro-monitors/"
---

> **[Integrations are available on Postman Team, Business, and Enterprise plans.](https://www.postman.com/pricing/)**

VictorOps is a real-time incident management platform that combines the power of people and data to handle incidents as they occur and prepare for the next one.

This integration allows you to configure [Postman Monitors](/docs/designing-and-developing-your-api/monitoring-your-api/intro-monitors/) to trigger incidents on VictorOps whenever it fails.

## Get the VictorOps API Key

Log in to your VictorOps account and go to the `Settings` tab. On the `Settings` page, select `Integrations` from the `Alert Behavior` dropdown.

[![log in to victorops](https://assets.postman.com/postman-docs/58842896.png)](https://assets.postman.com/postman-docs/58842896.png)

From the list of integrations, select the `REST Generic` Integration.

[![select REST Generic](https://assets.postman.com/postman-docs/58843113.png)](https://assets.postman.com/postman-docs/58843113.png)

If the integration is not already enabled, click the `Enable Integration` button.

[![enable integration](https://assets.postman.com/postman-docs/58843154.png)](https://assets.postman.com/postman-docs/58843154.png)

If the integration is enabled, you will see a URL which contains the API Key.

[![view API key](https://assets.postman.com/postman-docs/58843264.png)](https://assets.postman.com/postman-docs/58843264.png)

Copy the API Key and save it for later. You can also provide routing keys if you are using teams within VictorOps. Routing keys allow the creation of incidents to be directed towards a specific team, so that they get notified about a particular failure. To get the routing key, click on the `Alert Behavior` dropdown and select `Route Keys`.

[![make a note of keys](https://assets.postman.com/postman-docs/58842580.png)](https://assets.postman.com/postman-docs/58842580.png)

You can enter your own key and select a team for which the key is applicable.

[![enter key](https://assets.postman.com/postman-docs/58842547.png)](https://assets.postman.com/postman-docs/58842547.png)

## Configuring Postman Monitors

From the [Integrations search page](https://go.postman.co/integrations/browse?category=all) search and select VictorOps from the results.

![victorOps search](https://assets.postman.com/postman-docs/victorops-all-search.jpg)

Select **Add Integration** to start configuring this integration for your workspace.

![victorOps add integration](https://assets.postman.com/postman-docs/victorops-add-integration.jpg)

Follow the steps to below to configure the VictorOps integration:

* Select a monitor to send to VictorOps.
* Enter the VictorOps API key.
* Click "Advanced Options" if you want to add a VictorOps Routing Key.
* Click the **Add Integration** button.

You can send the results of multiple monitors to the same VictorOps collection.

![victorOps add integration](https://assets.postman.com/postman-docs/victorops-add-integration-config.jpg)

You can see your newly created integration and every instance of this integration created by your team.

![victorOps add integration](https://assets.postman.com/postman-docs/victorops-view-all-integrations.jpg)

Click the name of the monitor you added to this integration to view the monitoring results.

![victorOps add integration](https://assets.postman.com/postman-docs/victorops-view-all-integrations-rr.jpg)

## Incidents on VictorOps

An incident on VictorOps consists of the basic information of which monitor failed, with the number of errors and failed tests. It also provides a direct link to the failing monitor. This integration automatically acknowledges a triggered incident if the subsequent run succeeds.

[![victorops view](https://assets.postman.com/postman-docs/58843343.png)](https://assets.postman.com/postman-docs/58843343.png)
