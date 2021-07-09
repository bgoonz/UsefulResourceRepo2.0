---
title: "Bitbucket"
order: 164.1
page_id: "bitbucket"
warning: false
contextual_links:
  - type: section
    name: "Prerequisites"
  - type: link
    name: "Grouping requests in collections"
    url: "/docs/sending-requests/intro-to-collections/"
  - type: section
    name: "Next Steps"
  - type: link
    name: "Custom Webhooks"
    url: "/docs/integrations/webhooks/"
  - type: link
    name: "Slack Integration"
    url: "/docs/integrations/available-integrations/slack/"
---

> __[Integrations are available on Postman Team, Business, and Enterprise plans.](https://www.postman.com/pricing)__

You can back up your team's Postman Collections with Postman's Bitbucket integration.

## Contents

* [Backing up collections on Bitbucket](#backing-up-collections-on-bitbucket)

    * [Configuring a Bitbucket integration](#configuring-a-bitbucket-integration)

* [Next steps](#next-steps)

## Backing up collections on Bitbucket

You can back up your Postman Collections to your Bitbucket repository. Once the integration is configured, any new changes to your collection in Postman will also appear in Bitbucket.

### Configuring a Bitbucket integration

To add a Bitbucket integration, navigate to the [Postman Integrations page](https://go.postman.co/integrations/browse?category=all). Search for Bitbucket and select it from the results.

![Bitbucket search page](https://assets.postman.com/postman-docs/bitbucket-search-bb.jpg)

Select **Add Integration**.

![Bitbucket details page](https://assets.postman.com/postman-docs/bitbucket-add-integration-bb.jpg)

Enter your Bitbucket authentication and select **Authenticate and Proceed**.

> App passwords are different from account passwords. Learn [how to create an app password in Bitbucket](https://support.atlassian.com/bitbucket-cloud/docs/app-passwords/).

![Bitbucket creation](https://assets.postman.com/postman-docs/bitbucket-create-bb.jpg)

Select your collection to back up, the repository you'd like to back it up to, and designate the directory, filename, and branch. Click **Add Integration**.

![Bitbucket configuration](https://assets.postman.com/postman-docs/bitbucket-configure-bb.jpg)

Your new integration will now appear in a list along with previously created integrations.

![Configured integrations](https://assets.postman.com/postman-docs/bitbucket-add-integration-bb.jpg)

To confirm this integration, navigate to your [Bitbucket dashboard](https://bitbucket.org/dashboard/overview) > **Repositories**. Select your repository > **Commits**.

![Bitbucket commits list](https://assets.postman.com/postman-docs/bitbucket-commits.jpg)

You can select a commit to view your stored collection in JSON format.

![Bitbucket collection](https://assets.postman.com/postman-docs/bitbucket-collection.jpg)

## Next steps

Learn more about other Postman integrations, including [custom webhooks](/docs/integrations/webhooks/) and [Slack](/docs/integrations/available-integrations/slack/).
