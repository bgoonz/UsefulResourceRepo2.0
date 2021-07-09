---
title: "Monitoring FAQs"
order: 95
page_id: "faqs_monitors"
search_keyword: "console.log, console.warn"
warning: false
---

## General questions

### What can I test with Monitors?

You can use Postman Monitors for simple uptime monitoring to ensure your servers are online or for performance monitoring to ensure your servers are responding promptly. You also can write detailed [test suites](/docs/writing-scripts/test-scripts/) to check monitors for proper behavior, business logic, error handling, and so on.

### What restrictions apply?

To learn what restrictions apply, see [Intro to Monitoring](/docs/designing-and-developing-your-api/monitoring-your-api/intro-monitors/).

### How many monitors can I create?

There is no limit to the number of monitors you can create. You can have any number of collections, each with any number of monitors. And each monitor can run on a different schedule.

### What timezone is my monitor set to?

Your monitor's timezone is automatically set to the timezone of your computer at the time of the monitor's creation.

### How long can a monitor run?

Monitors are currently limited to 5 minutes for each run. This limit applies to all HTTP requests, responses, and test scripts.

### How do I persist variables between monitor runs?

Variables created or edited during a monitor run are automatically reset following each run. You can change this behavior and persist variable values by utilizing the [Postman API](https://docs.api.getpostman.com/#6517e0d6-3bc3-3da5-ab57-7a578a8504ce) to update your environment each time your monitor runs.

### How many HTTP requests can a monitor send?

There is no limit to the number of requests, although the total run-time cannot exceed 5 minutes.

### How much data can a monitor send or receive?

There is nearly no limit to the amount of data that can be sent or received per request. However, large requests or responses take longer to send and receive. As a result, be sure that you can do everything within the 5 minute time limit.

### Are static IP addresses dedicated to individual customers or shared?

The provided static IP addresses are fixed to their specified region and shared by all customers who enable this feature, which is available to Postman Business and Enterprise teams. For more information, see [Running Postman monitors using static IPs](/docs/designing-and-developing-your-api/monitoring-your-api/using-static-IPs-to-monitor/).

### How do I troubleshoot problems?

You can view the full console output for every monitor run, including any errors. You can also use methods, such as `console.log()`, `console.warn()`, and so on to output your own debugging information. To learn more about troubleshooting monitors, see [Troubleshooting monitors](/docs/designing-and-developing-your-api/monitoring-your-api/troubleshooting-monitors/).

## Security

### Who can see my Monitors?

Monitors are visible to all members of the workspace they were created in. If a collection is shared in both a personal and team workspace, but its monitor is created in the personal workspace, members of the team workspace will not be able to view or access that monitor.

### Who can edit my Monitors?

Monitors can be edited in their respective workspace by members who have been granted [Editor permissions](/docs/collaborating-in-postman/roles-and-permissions/) on the monitor. To review or manage which team members have Editor or Viewer permissions on a specific monitor, navigate to your workspace and select **Monitors** from the left sidebar. Hover over the monitor in question and select **...** > **Manage Roles**.

### Can I delete a Monitor?

You can delete a monitor at any time. Once deleted, all run history for the monitor is deleted too. If you want to retain the history, then you should pause the monitor instead of deleting it.

### Where do Monitors run?

Monitors run on Postman's cloud infrastructure, which is hosted by Amazon Web Services (AWS). More information about the cloud infrastructure is available on the [Security overview](https://www.postman.com/security).

### Can Monitors access private networks?

No. Monitors can only connect to URLs that are publicly-available on the Internet. You cannot monitor APIs that run on private networks, VPNs, or corporate intranets.

### Will Monitors impact my API performance?

You have full control over the behavior of your monitors. Not only can you determine which of your API endpoints are called, you can also determine how many and how often they are called. In addition, Postman restricts each monitor’s total run time to 5 minutes, to limit the number of requests it can perform.
