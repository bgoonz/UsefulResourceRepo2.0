---
title: "Troubleshooting monitors"
order: 94
page_id: "troubleshooting_monitors"
search_keyword: "console.log"
contextual_links:
  - type: section
    name: "Prerequisites"
  - type: link
    name: "Intro to Monitoring"
    url: "/docs/designing-and-developing-your-api/monitoring-your-api/intro-monitors/"
  - type: section
    name: "Next Steps"
  - type: link
    name: "Troubleshooting API requests"
    url: "/docs/sending-requests/troubleshooting-api-requests/"

warning: false
---

When you save changes to your collections in Postman, they are automatically and instantaneously synced to your Postman monitors. You can use this to debug in Postman locally, while your monitors seamlessly update to Postman's servers.

## Viewing failed monitors

You can utilize the [Postman console log](/docs/designing-and-developing-your-api/monitoring-your-api/viewing-monitor-results/#console-log) to debug issues that arise in your monitors.

To view, navigate to your workspace and select **Monitors** in the left sidebar. Select your monitor in question, then click on your failed run in the performance graph. Select **Console Log** below the graph to view monitor run details along with any console.log statements that you have included in your pre-request and test scripts.

[![Failed monitor run console log](https://assets.postman.com/postman-docs/monitor-console-log-failed-run.jpg)](https://assets.postman.com/postman-docs/monitor-console-log-failed-run.jpg)

Check out [Troubleshooting API requests](/docs/sending-requests/troubleshooting-api-requests/) for more information on debugging with console logs.

## Debugging local run attempts

* Run the failing monitor's collection with its environment in Postman or [Newman](/docs/running-collections/using-newman-cli/command-line-integration-with-newman/) to see if it works correctly.
* If a local run passes, check that [sync](/docs/getting-started/syncing/) is working properly by looking for the green sync symbol in Postman's header. This will ensure any local changes persist.

<img alt="Sync working header" src="https://assets.postman.com/postman-docs/header-sync-working-2.jpg"/>

## Debugging variable issues

* Ensure that the same environment is used across local runs and monitor runs. To confirm, add ``console.log(environment);`` to your request scripts and compare the results across monitoring and local runs.

* If your collection run depends on a saved global variable, change it to an environment variable. Saved global variables are not supported in monitors at this time.

## Logging relevant information

* Often, issues come from unexpected response bodies or header values. You can log these with the following:

    ```js
    console.log(JSON.stringify(responseBody, null, 2));
    console.log(JSON.stringify(responseHeaders, null, 2));
    ```

## Uncaught errors

* Wrapping suspicious code in a ``try - catch`` block will also let the test and pre-request scripts in your collection run to completion, allowing you to see the entire picture.
