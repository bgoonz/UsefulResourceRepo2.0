---
title: "Publishing your docs"
order: 103
page_id: "publishing_your_docs"
contextual_links:
  - type: section
    name: "Prerequisites"
  - type: link
    name: "Grouping requests in collections"
    url: "/docs/sending-requests/intro-to-collections/"
  - type: section
    name: "Additional Resources"
  - type: subtitle
    name: "Case Studies"
  - type: link
    name: "Imgur"
    url: "https://www.postman.com/resources/case-studies/imgur/"
  - type: subtitle
    name: "Videos"
  - type: link
    name: "API documentation with Postman"
    url: "https://www.youtube.com/watch?v=Ayo_KdLLcTA"
  - type: subtitle
    name: "Related Blog Posts"
  - type: link
    name: "API Network Exploration: Infermedica"
    url: "https://blog.postman.com/api-network-exploration-infermedica/"

warning: false
---

You can publish your API documentation to make it available for public viewing by anyone who has the link. Published documentation allows anyone who wants to learn how to use your API to view detail on endpoints, including parameters, request and response bodies, and example code.

[![postman API docs](https://assets.postman.com/postman-docs/postman-api-docs.jpg)](https://assets.postman.com/postman-docs/postman-api-docs.jpg)

Your public documentation will always display up-to-date content representing the current state of your collection. You don’t need to repeat the publication flow each time you want to update your documentation.

Your documentation will include the **Run in Postman** button so users can interact with your API directly in Postman. For example, check out the [Postman API documentation](https://documenter.postman.com/view/631643/JsLs/)—generated from a Postman Collection. You can publish your documentation to the API Network or as a template to make your collections publicly available in Postman, aiding developer onboarding and adoption.

> You can publish documentation for collections that you created or have permission to edit.

## Contents

* [Making your documentation public](#making-your-documentation-public)
    * [Configuring your public docs](#configuring-your-public-docs)
    * [Customizing your docs](#customizing-your-docs)
* [Sharing your public docs](#sharing-your-public-docs)
* [Publishing and unpublishing](#publishing-and-unpublishing)
* [Next steps](#next-steps)

## Making your documentation public

You can publish docs from an existing private documentation page or from the collection in Postman.

To publish from your collection's [private documentation](/docs/publishing-your-api/documenting-your-api/) in the web browser, select a version and click __Publish__.

![Publish Docs](https://assets.postman.com/postman-docs/publish-docs-r.jpg)

To publish from the collection in Postman, select the collection in __Collections__, open the actions menu (__...__), and choose __View Documentation__. From here, select __Publish__ to publish your collection.

![Publish Docs](https://assets.postman.com/postman-docs/view-docs-b.jpg)

> Any confidential information in your environment, such as __passwords and access tokens__ may become publicly visible when you publish your docs. Remove all sensitive information from the environment before you publish.

### Configuring your public docs

In the __Publish Collection__ page, you can configure how you want your public docs to appear.

* Select a collection [version](/docs/publishing-your-api/documenting-your-api/#versioning-your-docs) to publish.
* Select an [environment](/docs/publishing-your-api/documenting-your-api/#documentation-environments) to populate variables in your published documentation.

![Publish Config](https://assets.postman.com/postman-docs/pub-collection-b.jpg)

You can preview your documentation before publishing it. This opens a live preview of the documentation in another window which reloads on any change.

In this live preview, Postman scans the documentation for anything that appears to be a sensitive token. If Postman identifies a potential secret, you will see a banner at the top of this window. Postman will also highlight identified secrets throughout the page. This gives you the chance to update the documentation before publishing it.

![Preview secrets](https://assets.postman.com/postman-docs/client-scanner-b.jpg)

### Customizing your docs

> With Postman Team, Business, or Enterprise, you can opt to use a [custom domain](/docs/publishing-your-api/custom-doc-domains/) for your public documentation site.

You can configure the style of your public docs by selecting colors for the header background, code background, and highlights. You can also choose single or double column view as the default layout for your docs. Try making changes and preview to see how your docs will appear when published.

![Style Docs](https://assets.postman.com/postman-docs/Customizing+public+docs+layout.jpg)

Team admins can customize the style of your public docs by [editing your team profile](/docs/administration/team-settings/#editing-your-team-profile), including your team name and logo, in your [team settings](https://go.postman.co/settings/team/general). Your team logo will replace the Postman logo in your team's published docs—updated logo images may take a few minutes to appear.

> You can make changes to styling after publishing your docs by heading to the [Postman Dashboard](https://go.postman.co/workspaces) and navigating to your published collection. Select **Published** in the upper-right corner > **Edit Published Documentation** > **Edit settings**. Make your changes and click **Save and republish collection** to update.

![Edit Published Documentation](https://assets.postman.com/postman-docs/edit-pub-doc.jpg)

## Sharing your public docs

To share your API documentation with your users and the wider Postman community, enable __Collection discovery__ by toggling the switch. This will make your docs and the associated collections available via the Postman [API Network and templates](https://www.postman.com/explore).

![Collection Discovery](https://assets.postman.com/postman-docs/discovery-switch-template.jpg)

> When you publish public documentation, anyone with the URL can access it. By sharing your documentation with the API Network or as a template, you increase the visibility of your API to a wider range of consumers by leveraging the Postman community. Users can then access both the API Network and community templates via the __New__ button within the Postman app or [on the web](https://explore.postman.com).

* Choose __Add to API Network__ to [feature your team docs in the Postman publisher network](/docs/publishing-your-api/publishing-your-docs/).

You can only add to API Network when publishing from a team. You can configure your team profile by clicking __Public Profile Settings__, enabling your profile, and filling out your team details for display.

<img alt="Publish as Team" src="https://assets.postman.com/postman-docs/publish-team.jpg" width="500px"/>

![Enable Profile](https://assets.postman.com/postman-docs/enable-profile.jpg)

Your team profile can include a name, description, custom URL, and logo.

![Profile Detail](https://assets.postman.com/postman-docs/profile-detail.jpg)

Add listing details for your public documentation, including name, summary, description, and relevant tags.

![Listing Detail](https://assets.postman.com/postman-docs/listing-detail.jpg)

> If you edit your published docs, the changes will not automatically be reflected in your API network or template listing, so you will need to update the details displayed at [explore.postman.com](https://explore.postman.com) manually.

If you do not want to make your docs discoverable at this time, you can go ahead and publish then add them to the API Network or Postman Templates later.

<iframe loading="lazy" class="mb-4" width="560" height="315" src="https://www.youtube-nocookie.com/embed/w-EgqQ8Anvw" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## Publishing and unpublishing

Once you have your publish settings complete, click __Publish Collection__ to make your docs public.

![Publish Docs](https://assets.postman.com/postman-docs/publish-button.jpg)

You will see a confirmation that your docs are public together with a link you can share.

![Docs Published](https://assets.postman.com/postman-docs/docs-published.jpg)

You can unpublish your docs at any time by clicking __Unpublish__.

![Unpublish Docs](https://assets.postman.com/postman-docs/unpublish-docs.jpg)

## Next steps

[![Imgur API docs](https://i.imgur.com/oXgXznt.png)](https://i.imgur.com/oXgXznt.png)

Find out more about [sharing your docs](/docs/publishing-your-api/publishing-your-docs/).
