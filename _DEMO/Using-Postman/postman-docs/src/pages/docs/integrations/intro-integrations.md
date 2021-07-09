---
title: "Integrating with Postman"
order: 161
page_id: "intro_integrations"
warning: false
contextual_links:
  - type: section
    name: "Prerequisites"
  - type: link
    name: "Grouping requests in collections"
    url: "/docs/sending-requests/intro-to-collections/"
  - type: section
    name: "Additional Resources"
  - type: subtitle
    name: "Related Blog Posts"
  - type: link
    name: "Integrations: how Postman plays with some of your favorite tools"
    url: "https://blog.postman.com/integrations-how-postman-plays-with-some-of-your-favorite-tools/"
---

> __[Integrations are available on Postman Team, Business, and Enterprise plans.](https://www.postman.com/pricing/)__

Postman provides an API development toolchain aimed at integrating with your workflow.

The Postman team develops an open ecosystem in conjunction with industry partners to build integrations that facilitate your API projects.

Integrations allow you to automate sharing data and functionality between Postman and other tools you might be using for your API development.

> If you use GitHub or GitLab for your repository management and use Postman to develop and test your APIs, you can save your Postman Collections to your repositories with the [Postman to GitHub integration](/docs/integrations/available-integrations/github/) and [Postman to GitLab integration](https://learning.postman.com/docs/integrations/available-integrations/gitlab/).

## Contents

* [Accessing Integrations](#accessing-integrations)
* [Static IP Support](#static-ip-support)

## Accessing integrations

You can access integrations by navigating to [Browse Integrations](https://postman.postman.co/integrations/browse) from your [Home page](http://go.postman.co/) and selecting "Integrations" from the menu on the left. Search and select the integration you wish to add to your workspace.

![Workspace Integrations](https://assets.postman.com/postman-docs/browse-integrations.jpg)

Each integration's page explains how to use the integration and what it could do. If available, you can select **View** or **View All** to view previously configured integrations for the selected integration.

![Workspace Integrations](https://assets.postman.com/postman-docs/integrations-from-teammates.jpg)

Select __Add Integration__ to configure your integration. Enter the required information for account and access authorization. Select your workspace to add the integration to and complete the setup process.

![Add Integrations](https://assets.postman.com/postman-docs/add-integration-b.jpg)

## Static IP Support

You can use static IP addresses to enable integrations and custom webhooks for Postman Collection backups that need to access hosted (private) networks behind firewalls that require whitelisted IP addresses.

Contact your IT team to whitelist the following static IP in your firewall to enable collection backup integrations and webhooks:

* US East: `3.212.102.200`

Once you whitelist this IP address, calls for the integrations and webhooks will be able to connect to your network and allow the integrations and webhooks to work as expected.

> DNS records should use the public IP address for instances which are behind a firewall or not accessible via the internet.

Postman supports implementing static IP addresses for the following integrations and webhooks:

* [Custom Webhooks](https://learning.postman.com/docs/integrations/webhooks/)
* [GitHub Custom Domain Backup](https://learning.postman.com/docs/integrations/available-integrations/github/#backup-collections-to-github-on-custom-domain)
* [GitLab Custom Domain Backup](https://learning.postman.com/docs/integrations/available-integrations/gitlab/#backup-your-postman-collections-to-gitlab-on-a-custom-domain)
