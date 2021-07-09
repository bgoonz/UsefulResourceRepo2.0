---
title: "Opsgenie"
order: 176
page_id: "Opsgenie"
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

## Contents

* [Get the Opsgenie API Key](#get-the-opsgenie-api-key)

* [Configuring Postman Integration](#configuring-postman-integration)

* [Alerts on Opsgenie](#alerts-on-opsgenie)

[Opsgenie](https://www.atlassian.com/software/opsgenie) is an incident management and alerting tool that allows you to effectively manage alerts across the infrastructure. It has several communication features such as SMS, phone calls, and iOS & Android push notifications, and collaboration features such as escalations and schedules.

This integration with Opsgenie triggers an alert in Opsgenie whenever there is an alert in Postman Monitor. The alert will then automatically close after the first successful run.

This integration allows you to configure [Postman Monitors](/docs/designing-and-developing-your-api/monitoring-your-api/intro-monitors/) to trigger alerts on Opsgenie whenever your monitor fails.

## Get the Opsgenie API Key

Log in to your Opsgenie account and go to the **Teams** tab and select the team you will add an integration to.

![log in to Opsgenie](https://assets.postman.com/postman-docs/opsgenie-teams-select-bb.jpg)

From the left nav, select **Integrations** > **Add integration**.

![Add Opsgenie integration](https://assets.postman.com/postman-docs/opsgenie-teams-add-integration-bb.jpg)

From the list of integrations, select the [**API integration**](https://docs.opsgenie.com/docs/api-integration) option.

![select API integration option](https://assets.postman.com/postman-docs/opsgenie-search-select-api.jpg)

On the configuration page, fill in your information and select **Save Integration**.

Copy your API Key and save it for later.

![Save Opsgenie API key](https://assets.postman.com/postman-docs/opsgenie-save-integration.jpg)

## Configuring Postman integration

From the Integrations [search page](https://postman.postman.co/integrations/browse?category=all), search and select Opsgenie from the results.

On the Integration details page, select **Add Integration**.

![add Opsgenie integration](https://assets.postman.com/postman-docs/opsgenie-add-integration-b.jpg)

On the integration authentication page, enter the Opsgenie API key you saved from your Opsgenie console. Select the [**Opsgenie site region** for your Opsgenie account](https://docs.opsgenie.com/docs/opsgenie-data-residency).

![Add Opsgenie API key into Postman](https://assets.postman.com/postman-docs/opsgenie-with-api-key.jpg)

On the integration configuration page, enter a nickname for your integration, your workspace, alert tags, and alert priorities.

<img src="https://assets.postman.com/postman-docs/opsgenie-save-configuration-b.jpg" alt="Save opsgenie configuration" width="500px"/>

After you create the integration, you can see all of the integrations created by your team. Select an integration to see the run logs for it.

![View integration run log](https://assets.postman.com/postman-docs/opsgenie-run-logs.jpg)

## Alerts on Opsgenie

An alert on Opsgenie consists of the following information below:

* Description of failing tests (failures in your test scripts you have written in Postman)
* Number of errors (errors occur when Postman is unable to fetch a response from your API)

* Description of failing tests
* Number of failed tests
* Number of passed tests
* Number of errors
* Response time

It will also provide a direct link to the failing monitor.

This integration automatically closes a triggered alert if a subsequent run succeeds. All failures from the same monitor are grouped under the a single Opsgenie alert.

When there is an alert on Postman, you will also see one on your Opsgenie console.

![View list of alerts in Opsgenie](https://assets.postman.com/postman-docs/opsgenie-alerts-list-bb.jpg)

Select the alert in Opsgenie to see more information.

![View Opsgenie alert details](https://assets.postman.com/postman-docs/opsgenie-alerts-details.jpg)
