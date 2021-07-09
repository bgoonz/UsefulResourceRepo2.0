---
title: "Custom Webhooks"
order: 162
page_id: "custom_webhooks"
warning: false
contextual_links:
  - type: section
    name: "Prerequisite"
  - type: link
    name: "Grouping requests in collections"
    url: "/docs/sending-requests/intro-to-collections/"
---

> __[Integrations are available on Postman Team, Business, and Enterprise plans.](https://www.postman.com/pricing/)__

Postman provides a custom webhook integration which enables you to automate workflows between your favorite apps and services to get notifications, synchronize files, collect data, and more. It offers many services with predefined flows available for easy implementation.

You can configure a custom webhook with Postman to send events such as monitor results, team and collection-specific activity feeds, and to back up your Postman Collections.

## Contents

* [Static IP Support](#static-ip-support)
* [Configuring custom webhook URL](#configuring-custom-webhook-url)
* [Back up your Postman Collections](#back-up-your-postman-collections)
    * [Backup Collections](#backup-collections)
* [Send collection activity feed to custom webhooks](#send-collection-activity-feed-to-custom-webhooks)
* [Send Monitor run results to custom webhooks](#send-monitor-run-results-to-custom-webhooks)
    * [Monitor Run Results](#monitor-run-results)
* [Send a team activity feed to custom webhooks](#send-a-team-activity-feed-to-custom-webhooks)
    * [Team Activity](#team-activity)

## Static IP Support

If your network is behind a firewall that requires whitelisted IP addresses, you will need to use a static IP address to enable collection backups to custom webhooks on custom domains.

Contact your IT team to whitelist the following static IP in your firewall to enable collection backups to webhooks:

* US East: `3.212.102.200`

Once you whitelist this IP address, calls for the custom webhook will be able to connect to your network and allow the webhook to work as expected.

## Configuring custom webhook URL

1. On the [Integrations](https://postman.postman.co/integrations/browse) page, search and select Webhooks from the list of integrations.

[![custom_webhook](https://assets.postman.com/postman-docs/custom-webhooks.jpg)](https://assets.postman.com/postman-docs/custom-webhooks.jpg)  

Each integration's page explains how to use the integration and what it can do. If available, you can view previously configured integrations for the selected integration.

![Workspace Integrations](https://assets.postman.com/postman-docs/webhooks-teammates.jpg)
2. Select __Add Integration__ to configure your integration. Enter the required information for account and access authorization. Select the workspace you need to add the integration to and proceed with the integration setup.

[![webhooks_view2](https://assets.postman.com/postman-docs/custom-webhooks-setup.jpg)](https://assets.postman.com/postman-docs/custom-webhooks-setup.jpg)  

## Back up your Postman Collections

You can use custom webhooks to back up your Postman collections. This will require a few quick steps to set up:

1. Click **Add Integration**.
2. In the **Backup your Postman Collections** page:
   * Enter any name
   * Select the collection.
   * Enter the webhook URL.

3. Click **Add Integration**.

[![webhooks collections1](https://assets.postman.com/postman-docs/add-integration-setup.jpg)](https://assets.postman.com/postman-docs/add-integration-setup.jpg)

Once the integration has been created, you can view the integration you just created in addition to the other active integrations created by your team:

[![configured integrations](https://assets.postman.com/postman-docs/view-webhooks-all.jpg)](https://assets.postman.com/postman-docs/view-webhooks-all.jpg)

### **Backup Collections**

The following is a schema for Backup Collections:

```json
{
  "$schema": "http://json-schema.org/draft-04/schema#",
  "definitions": {},
  "id": "http://example.com/example.json",
  "properties": {
    "collection": {
      "id": "/properties/collection",
      "properties": {},
      "type": "object"
    }
  },
  "type": "object"
}
```

## Send collection activity feed to custom webhooks

The activity feed is where you can view all changes being made to your Postman collection by your teammates. Integrating with webhooks gives you the freedom to connect with email services like Outlook, Gmail, or a custom SMTP service.

To send collection activity feed to custom webhooks:

1. Click **Add Integration**.
2. In the **Collection Activity Feed** page, enter the webhook URL to send team updates to this specific URL.
3. Click **Add Integration**.

## Send Monitor run results to custom webhooks

Postman Monitors allows you to run your collections on a schedule without any manual intervention. With the custom webhooks, you can use those results by connecting to other available services.

To send monitor run results to custom webhooks:

1. Click **Add Integration**.
2. In the **Monitor Run Results** page, select the monitor you want to send to custom webhooks.
3. Click **Add Integration**.

[![webhook_mon_runs](https://assets.postman.com/postman-docs/webhooks_monitors1.png)](https://assets.postman.com/postman-docs/webhooks_monitors1.png)

You can also configure advanced options to alert you when a monitor run completes or when three failures occur and the first monitor run after those failures completes successfully.

Your integration should be ready. Whenever your monitor runs, the results will be posted to your webhook.

### Monitor Run Results

The following is a schema for monitor run results:

```json
{
  "$schema": "http://json-schema.org/draft-04/schema#",
  "definitions": {},
  "id": "http://example.com/example.json",
  "properties": {
    "collection_name": {
      "id": "/properties/collection_name",
      "type": "string"
    },
    "collection_uid": {
      "id": "/properties/collection_uid",
      "type": "string"
    },
    "environment_name": {
      "id": "/properties/environment_name",
      "type": "string"
    },
    "environment_uid": {
      "id": "/properties/environment_uid",
      "type": "string"
    },
    "metrics": {
      "id": "/properties/metrics",
      "properties": {
        "errors":
          "id": "/properties/metrics/properties/errors",
          "type": "integer"
        },
        "failedTests": {
          "id": "/properties/metrics/properties/failedTests",
          "type": "integer"
        },
        "passedTests": {
          "id": "/properties/metrics/properties/passedTests",
          "type": "integer"
        },
        "requestCount": {
          "id": "/properties/metrics/properties/requestCount",
          "type": "integer"
        },
        "totalLatency": {
          "id": "/properties/metrics/properties/totalLatency",
          "type": "integer"
        },
        "warnings": {
          "id": "/properties/metrics/properties/warnings",
          "type": "integer"
        }
      },
      "type": "object"
    },
    "monitor_name": {
      "id": "/properties/monitor_name",
      "type": "string"
    },
    "monitor_uid": {
      "id": "/properties/monitor_uid",
      "type": "string"
    },
    "user_id": {
      "id": "/properties/user_id",
      "type": "string"
    },
    "user_name": {
      "id": "/properties/user_name",
      "type": "string"
    }
  },
  "type": "object"
}
```

## Send a team activity feed to custom webhooks

The activity feed is where you can track changes made to your collections and within your team. Integrating with webhooks gives you the freedom to connect with many services.

To send a team activity feed to a custom webhook:

1. Click the **Add Integration** button.
2. In the **Team Activity Feed** page, enter the webhook URL to send team updates to this specific URL.
3. Click the **Add Integration** button.

[![custom webhook](https://assets.postman.com/postman-docs/WS-integrations-msFlow-teamactivityfeed.png)](https://assets.postman.com/postman-docs/WS-integrations-msFlow-teamactivityfeed.png)

## Team Activity

The following is a schema for Team Activity:

```json
{
  "$schema": "http://json-schema.org/draft-04/schema#",
  "definitions": {},
  "id": "http://example.com/example.json",
  "properties": {
    "action": {
      "id": "/properties/action",
      "type": "string"
    },
    "collection_name": {
      "id": "/properties/collection_name",
      "type": "string"
    },
    "collection_uid": {
      "id": "/properties/collection_uid",
      "type": "string"
    },
    "message": {
      "id": "/properties/message",
      "type": "string"
    },
    "model": {
      "id": "/properties/model",
      "type": "string"
    },
    "model_name": {
      "id": "/properties/model_name",
      "type": "string"
    },
    "model_uid": {
      "id": "/properties/model_uid",
      "type": "string"
    },
    "user_id": {
      "id": "/properties/user_id",
      "type": "string"
    },
    "user_name": {
      "id": "/properties/user_name",
      "type": "string"
    }
  },
  "type": "object"
}
```
