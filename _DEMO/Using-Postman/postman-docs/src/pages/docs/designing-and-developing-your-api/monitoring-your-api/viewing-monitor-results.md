---
title: "Viewing monitor results"
order: 90
page_id: "viewing_monitor_results"
contextual_links:
  - type: section
    name: "Additional Resources"
  - type: subtitle
    name: "Case Studies"
  - type: link
    name: "Monetary"
    url: "https://www.postman.com/case-studies/monetary/"
  - type: subtitle
    name: "Videos"
  - type: link
    name: "API monitoring with Postman"
    url: "https://www.youtube.com/watch?v=3nOP_TYTuA8"

warning: false
---

Postman allows you to track the health and performance of your APIs. With Postman, you can stay up to date on what's happening across all monitors in your workspace and dive into individual monitors to examine test results and performance over time.

## Contents

* [Viewing monitors in Postman](#viewing-monitors-in-postman)

    * [Monitor summary](#monitor-summary)

    * [Individual requests](#individual-requests)

    * [Filters](#filters)

        * [Filtering by request](#filtering-by-request)

        * [Filtering by type](#filtering-by-type)

        * [Filtering by run result](#filtering-by-run-result)

        * [Filtering by region](#filtering-by-region)

        * [Filtering by formula](#filtering-by-formula)

    * [Time traverse](#time-traverse)

    * [Test results](#test-results)

    * [Console log](#console-log)

    * [Activity log](#activity-log)

    * [Monitor details](#monitor-details)

* [Next steps](#next-steps)

## Viewing monitors in Postman

You can view your monitors in Postman by navigating to your workspace and selecting **Monitors** in the left sidebar. Select your monitor to open a tab detailing its latest performance.

<img src="https://assets.postman.com/postman-docs/view-monitor-in-tab3.jpg" alt="View monitor in tab"/>

> Monitors in team workspaces are visible to all members of the workspace.

### Monitor summary

You can use the **Monitor Summary** to see how your APIs have performed over time. Each monitor run is represented by a bar in the graph.

The upper section charts your monitor's average response time for each run, while the lower section visualizes the number of failed tests for each run across all regions. To view the exact response time and failed percent, you can hover over each run individually.

![Monitor summary](https://assets.postman.com/postman-docs/monitor-summary-with-hover.jpg)

> A red bar indicates that either tests failed or errors occurred during the run. For more information, view your [Console Log](/docs/designing-and-developing-your-api/monitoring-your-api/viewing-monitor-results/#console-log).

### Individual requests

You can select **Individual requests** to break down your monitor summary into separate requests.

![Request split](https://assets.postman.com/postman-docs/monitors-individual-requests.jpg)

### Filters

You can use filters to identify recurring patterns in your monitoring runs by selecting particular requests, run types, results, and regions (if applicable).

[![monitor filters](https://assets.postman.com/postman-docs/monitor-filters-example.gif)](https://assets.postman.com/postman-docs/monitor-filters-example.gif)

> You can **Clear Filters** to return to your original dashboard view.

#### Filtering by request

You can filter by request to compare an individual request's response time in different runs. Click to open the drop-down menu **All Requests** under **Filter By**, then select your request.

#### Filtering by type

You can filter by run type to compare how the response time changes between manual runs, scheduled runs, and webhook runs. Click to open the drop-down menu **Type: All**, then select the type of run you'd like to analyze further.

> Manual runs are initiated in Postman or are triggered by the [Postman API](https://documenter.postman.com/view/631643/JsLs/?version=latest#5b277ca0-7114-e04e-f1f5-246fbbd6d973). Scheduled runs are initiated by the schedule you set when creating or editing your monitor. Webhook runs are initiated by integrations you've created.

#### Filtering by run result

Each run is labeled based on its result:

* **Successful**: Your monitor completed the run with no issues and passed all tests.
* **Failure**: Your monitor completed the run, however one or more tests failed.
* **Error**: Your monitor was unable to complete its run due to an error. An error can occur if there is a syntax error in the code you've written, a network error, or for various other reasons. If you encounter one, your [Console Log](#console-log) will help you identify what caused it.
* **Abort**: Your monitor was unable to complete its run within the allotted five minutes, at which point it timed out.

You can filter by run result to compare how your runs with the same result have differed. Click to open the drop-down menu **Run result: All**, then select one or more types of run results to view.

#### Filtering by region

You can filter by [region](/docs/designing-and-developing-your-api/monitoring-your-api/setting-up-monitor/#adding-regions) to compare how runs within different regions have varied. Click to open the drop-down menu **All Regions**, then select a region to view.

> This feature is only available if you selected multiple regions when you created or last edited your monitor. To learn more about regions, see [Adding regions](/docs/designing-and-developing-your-api/monitoring-your-api/setting-up-monitor/#adding-regions).

#### Filtering by formula

You can filter by mathematical formula to view the average, sum, minimum, and maximum response time for each run:

* **Average**: The average of the total response time across all regions.
* **Sum**: The sum of the response time across all regions.
* **Minimum**: The minimum total response time for a run across all regions.
* **Maximum**: The maximum total response time for a run across all regions.

Click to open the drop-down menu **Average**, then select an option. To view the newly calculated response time value, you can hover over each run individually.

### Time traverse

You can navigate through past run results to review what happened at a particular point in time. To do so, click **Go to** in the upper-left corner of the monitor summary or request split graph. Select the time and date, then click **Apply** to view a specific run.

![Time traverse](https://assets.postman.com/postman-docs/monitors-time-traverse20.jpg)

> To revert the view to your most recent runs, select the time and date you defined in the upper-left corner of the graph, then click **Reset**.

### Test results

You can view **Test Results** below the monitor summary to find more detailed information on your tests, including which passed or failed, response codes, and response times.

[![test results](https://assets.postman.com/postman-docs/monitor-view-test-results0.jpg)](https://assets.postman.com/postman-docs/monitor-view-test-results0.jpg)

> If your monitor is configured to run in multiple regions, you can view the test results for a particular region by selecting that region from the dropdown to the right of the **Test Results**.

### Console log

You can view the **Console Log** below the monitor summary.

This section logs monitor run details along with the [`console.log`](/docs/sending-requests/troubleshooting-api-requests/) statements that run as part of your pre-request and test scripts. Run details specify the various stages of a monitor run such as preparing run, running, rerunning ([if applicable](/docs/designing-and-developing-your-api/monitoring-your-api/setting-up-monitor/#using-retry-on-failure)), and the run result, along with error and test failure information. Selecting a request in the Console Log will open it in a tab, allowing you to review and/or edit the request as needed.

[![console log](https://assets.postman.com/postman-docs/monitor-view-console-log0.jpg)](https://assets.postman.com/postman-docs/monitor-view-console-log0.jpg)

> If your monitor is configured to run in multiple regions, you can view the console logs for a particular region by selecting that region from the dropdown to the right of the **Console Log** tab.

You can use this console to both troubleshoot issues and learn more about an individual run's behavior.

### Activity log

You can view a monitor's activity logs by selecting the <img src="https://assets.postman.com/postman-docs/activity-feed-icon-2.png" width="20px" style="margin:0" alt="Activity log clock symbol"/> (clock icon) in the upper-right corner > **View activity logs**.

<img src="https://assets.postman.com/postman-docs/monitor-activity-log20.jpg" width="400px" alt="Activity log"/>

You can check these logs to learn when a monitor was created, edited, paused, or resumed running, and which team member performed each action.

### Monitor details

You can view details about a monitor by selecting the info (i) icon in the upper-right corner. Here you can view a monitor's ID, creator, creation date and time, collection, environment, and integration options.

<img src="https://assets.postman.com/postman-docs/monitor-information10.jpg" width="400px" alt="Monitor details"/>

## Next steps

Learn how to [troubleshoot your monitors](/docs/designing-and-developing-your-api/monitoring-your-api/troubleshooting-monitors/) and check out [Postman monitoring FAQs](/docs/designing-and-developing-your-api/monitoring-your-api/faqs-monitors/).
