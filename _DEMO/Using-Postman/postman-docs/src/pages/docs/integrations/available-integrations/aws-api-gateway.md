---
title: "AWS API Gateway"
order: 163.1
page_id: "aws-api-gateway"
warning: false
contextual_links:
  - type: section
    name: "Prerequisites"
  - type: link
    name: "Intro to collections"
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

You can upload your API schemas directly to AWS API Gateway from Postman with this integration.

> This integration uses version 2 of the AWS API and only supports HTTP APIs with OpenAPI 3.0 schemas.

## Contents

* [Uploading API schemas to AWS API Gateway](#uploading-api-schemas-to-aws-api-gateway)

    * [Configuring an AWS API Gateway integration](#configuring-an-aws-api-gateway-integration)

* [Next steps](#next-steps)

## Uploading API schemas to AWS API Gateway

You can directly upload your API schemas from Postman to AWS API Gateway. Once the integration is configured, any new changes to your schema in Postman will also appear in your AWS API Gateway.

### Configuring an AWS API Gateway integration

1. Select [**Home**](https://go.postman.co/home).

    ![postman home](https://assets.postman.com/postman-docs/awsgateway-home.jpg)

1. Select [**Integrations**](https://postman.postman.co/integrations/browse?category=all).

    ![postman integrations](https://assets.postman.com/postman-docs/awsgateway-integrations.jpg)

1. Search and select **AWS API Gateway**.
1. Select **Add Integration**.

    ![aws gateway add integration](https://assets.postman.com/postman-docs/aws-gateway-add-integration.jpg)

1. Enter your AWS access key ID, secret access key, and region, select **Continue**.

    > Learn [how to get your AWS credentials](https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/getting-your-credentials.html).

    ![aws gateway auth and proceed](https://assets.postman.com/postman-docs/aws-gateway-auth-proceed.jpg)

1. Select your API, API version, and the API Gateway you'd like to deploy to from the dropdown menus. You can use an existing API Gateway, or create a new one by selecting **Create New API Gateway** from the dropdown.

    > If you are creating a new API Gateway, auto-deployment will automatically be set to false in AWS.

    ![aws gateway create](https://assets.postman.com/postman-docs/select-api-version-gateway-7.jpg)

    > You can have one AWS API Gateway integration configured for each API version.

To confirm this integration, navigate to your AWS Gateway dashboard, select your API Gateway, then select **Integrations** to view your newly uploaded endpoints.

![Configured integration in AWS](https://assets.postman.com/postman-docs/configured-in-aws-2.jpg)

This integration will be triggered whenever the configured Postman schema is updated. Any configured AWS integrations will be preserved.

> Note that if the API or specific API version is deleted, its configured integration will also be deleted.

## Next steps

Learn more about other Postman integrations, including [custom webhooks](/docs/integrations/webhooks/) and [Slack](/docs/integrations/available-integrations/slack/).
