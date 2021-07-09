---
title: "PagerDuty"
order: 177
page_id: "pagerduty"
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

PagerDuty is a popular incident management solution that integrates with monitoring stacks for alerting, on-call scheduling, and automatic escalation of critical incidents.

You can configure this service to deliver alerts by text, email, call, or through iOS and Android apps.

You can use this integration to trigger incidents in PagerDuty based on your Postman Monitor results, helping your team investigate and resolve Collection run failures quickly.

## Retrieving your PagerDuty Integration Key

Create an account or use a preexisting one to log in to [PagerDuty](https://app.pagerduty.com/).  
In the header toolbar, select **Services**. If you are creating a new service for this integration, select **Services** and then **+ New Service**.

![pagerduty menu](https://assets.postman.com/postman-docs/pagerduty-new-service.jpg)

Enter your Service Name and choose Postman as the Integration Type.

Click the **Add Service** link at the bottom of the page to create a new service.

![pagerduty menu](https://assets.postman.com/postman-docs/pagerduty-config-service.jpg)

Save the PagerDuty Integration Key to use later.

![pagerduty menu](https://assets.postman.com/postman-docs/pagerduty-integrations-key.jpg)

## Configuring Postman with PagerDuty

From the [Integrations search page](https://go.postman.co/integrations/browse?category=all), search and select PagerDuty.

![pagerduty menu](https://assets.postman.com/postman-docs/pagerduty-search-all.jpg)

You can select **View All** to see all PagerDuty integrations created by your team.

![pagerduty menu](https://assets.postman.com/postman-docs/pagerduty-all-integrations.jpg)

To create your own integration, select **Add Integration**.

![pagerduty menu](https://assets.postman.com/postman-docs/pagerduty-view-all.jpg)

Enter the name of the integration, workspace, monitor, and your PagerDuty Integration Key. Select **Add Integration** to start configuring the integration.

![pagerduty menu](https://assets.postman.com/postman-docs/pagerduty-add-integration-configuration.jpg)

## Viewing PagerDuty results

The PagerDuty console will continuously update to display any incidents that result from your Postman Monitors. If the selected Monitor fails, you’ll receive notifications on PagerDuty according to the formatting and business rules you’ve already set.

[![pagerduty results](https://assets.postman.com/postman-docs/pagerduty_results.png)](https://assets.postman.com/postman-docs/pagerduty_results.png)
