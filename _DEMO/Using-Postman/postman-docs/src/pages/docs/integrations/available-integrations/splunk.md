---
title: "Splunk"
order: 177
page_id: "splunk"
warning: false
contextual_links:
  - type: section
    name: "Prerequisites"
  - type: link
    name: "Grouping requests in collections"
    url: "/docs/sending-requests/intro-to-collections/"
---

> **[Integrations are available on Postman Team, Business, and Enterprise plans.](https://www.postman.com/pricing/)**

Splunk is a monitoring service for cloud-scale applications. It combines data from servers, databases, tools, and services to present a unified view of an entire stack. This integration allows you to configure your Postman Monitors to send metrics to Splunk where you can visualize and compare them with other metrics.

Setting up a Splunk integration requires you to get an HTTP Event Collector (HEC) Token from Splunk and configure your Postman Monitors. After you set up the integration, you can view real-time alerts based on the results of your monitors.

## Retrieving your Splunk HEC token

Log in to [Splunk](https://login.splunk.com) and follow the [steps from Splunk](https://docs.splunk.com/Documentation/Splunk/8.1.0/Metrics/GetMetricsInOther#Get_metrics_in_from_clients_over_HTTP_or_HTTPS
) to create and save your HTTP Event Collector token (HEC token). Save the HEC token to configure the Postman Splunk integration.

![save splunk HEC token](https://assets.postman.com/postman-docs/splunk-http-event-collection-token-created.jpg)

## Configuring Postman Splunk integration

1. On your Postman Home page, navigate to **Integrations**, select **Browse All Integrations**, and select **Splunk** in the list of third-party integrations.

   [![splunk integrations search all](https://assets.postman.com/postman-docs/splunk-all-search.jpg)](https://assets.postman.com/postman-docs/splunk-all-search.jpg)

1. You can select **View All** to see all integrations already created by your team.

   [![splunk integrations view all](https://assets.postman.com/postman-docs/splunk-view-all.jpg)](https://assets.postman.com/postman-docs/splunk-view-all.jpg)

1. Select **Splunk** to start the configuration process.

   [![splunk integrations view all](https://assets.postman.com/postman-docs/splunk-all-search.jpg)](https://assets.postman.com/postman-docs/splunk-all-search.jpg)

1. To send your monitor metrics and events to Splunk:

   * Name your new integration.
   * Select the workspace and monitor whose data you would like to send to Splunk.
   * Enter your Splunk HEC token, as described above.
   * Enter your Splunk host URL and port.

   [![splunk integration configuration](https://assets.postman.com/postman-docs/splunk-add-integration.jpg)](https://assets.postman.com/postman-docs/splunk-add-integration.jpg)

1. Select **Add Integration** to save the configuration.

## Viewing data in Splunk

As soon as your monitor runs, the data will start flowing into Splunk.

### Viewing data in a list

1. Navigate to the Splunk homepage, from the left navigation bar, select **Search & Reporting**.

1. Enter a **metric** to search for and select it from the results to view details regarding it.

[![splunk metrics search](https://assets.postman.com/postman-docs/splunk-search-events-metric-example3.jpg)](https://assets.postman.com/postman-docs/splunk-search-events-metric-example3.jpg)

[![splunk metric details](https://assets.postman.com/postman-docs/splunk-search-events-metric-example2.jpg)](https://assets.postman.com/postman-docs/splunk-search-events-metric-example2.jpg)

### Viewing data as a Pivot table

1. Navigate to the Splunk homepage, from the left navigation bar, select **Search & Reporting**.

1. Select **Visualization** and enter a **metric** to search for.

1. Select **Pivot**.

1. Select the metrics and filters you need to visualize on the table.

[![splunk pivot table](https://assets.postman.com/postman-docs/splunk-search-event-pivot-example.jpg)](https://assets.postman.com/postman-docs/splunk-search-event-pivot-example.jpg)

Once the data is present in Splunk, you can filter it based on the monitor name/uid, collection name/uid, user name/id, and environment name/uid (if present).
