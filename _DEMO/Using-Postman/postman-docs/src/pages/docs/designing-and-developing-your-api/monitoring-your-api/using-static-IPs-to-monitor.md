---
title: Running Postman monitors using static IPs
order: 93
page_id: "using_static_IPs_to_monitor"
warning: false
contextual_links:
  - type: section
    name: "Prerequisites"
  - type: link
    name: "Intro to monitoring"
    url: "/docs/designing-and-developing-your-api/monitoring-your-api/intro-monitors/"
  - type: section
    name: "Next steps"
  - type: link
    name: "Integrations for monitoring"
    url: "/docs/integrations/intro-integrations/"
---

> __[Static IP address monitoring is available on Postman Business and Enterprise plans.](https://www.postman.com/pricing)__

Postman's static IP feature allows you to monitor your APIs that are behind a restricted firewall. This feature is available to all Postman Business and Enterprise customers, provided your IT team [whitelists](#whitelisting-static-ip-addresses) the associated static IP addresses.

The provided static IP addresses are fixed to their specified region and shared by all customers who utilize this feature.

## Contents

* [Whitelisting static IP addresses](#whitelisting-static-ip-addresses)

* [Creating a new monitor to run from a static IP address](#creating-a-new-monitor-to-run-from-a-static-ip-address)

* [Changing an existing monitor to run from a static IP address](#changing-an-existing-monitor-to-run-from-a-static-ip-address)

* [Next steps](#next-steps)

## Whitelisting static IP addresses

Static IP addresses are available for US east and US west regions. Contact your IT team to whitelist the following IP addresses:

* US East: `34.201.186.27`
* US West: `52.89.173.88`

## Creating a new monitor to run from a static IP address

When [creating a new monitor](/docs/designing-and-developing-your-api/monitoring-your-api/setting-up-monitor/#creating-a-monitor), opt to **Manually Select Region**. Select your desired static IP regions, then click **Create**.

<img src="https://assets.postman.com/postman-docs/monitor-manually-select-region.jpg" height="500px" alt="Manually select regions"/>

## Changing an existing monitor to run from a static IP address

Open your workspace in Postman and select **Monitors** from the left sidebar. Select your monitor, then **...** in the upper-right corner > **Edit**.

<img src="https://assets.postman.com/postman-docs/select-edit-monitor.jpg" width="400px" alt="Edit monitor"/>

Under **Regions**, opt to **Select regions manually**. Select your desired static IP regions, then click **Save Changes**.

<img src="https://assets.postman.com/postman-docs/monitor-manually-select-region.jpg" height="500px" alt="Manually select regions"/>

## Next steps

Learn how to set up [integrations](/docs/integrations/intro-integrations/) for your monitoring results.
