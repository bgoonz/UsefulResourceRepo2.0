# ✨ Azimuth Gatsby Contentful Theme ✨

This Stackbit's "Azimuth" theme built with [Gatsby](https://gatsbyjs.com) theme powered by [Contentful](https://www.contentful.com).

Click the button below to create a new website from this theme using Stackbit:

<p align="center">
  <a href="https://app.stackbit.com/create?theme=https://github.com/stackbit-themes/azimuth-gatsby-contentful&utm_source=theme-readme&utm_medium=referral&utm_campaign=stackbit_themes"><img alt="Create with Stackbit" src="https://assets.stackbit.com/badge/create-with-stackbit.svg"/></a>
</p>

## Quick Start 🏎

[Create a site](https://app.stackbit.com/create?theme=https://github.com/stackbit-themes/azimuth-gatsby-contentful&utm_source=theme-readme&utm_medium=referral&utm_campaign=stackbit_themes) from this theme using Stackbit.

Stackbit will execute following steps for you

-   Create a new GitHub repository with the contents of this repository.
-   Create a new [Contentful](https://www.contentful.com) project.
-   Create [Netlify](https://www.netlify.com) site connected to the GitHub repo
-   Deploy the Netlify site.
-   Create a Stackbit project that will allow you edit your website via on-page
    visual editing experience.

Additionally, Stackbit will connect all services together:

-   Create a "commit" webhook in GitHub that will trigger Netlify deployment as
    soon as new commit is pushed to GitHub.
-   Create a "publish" webhook in Contentful that will trigger Netlify deployment as
    soon as content is published in Contentful.

## Editing Content 📝

Once Stackbit creates a site, you can start editing the content using the free
on-page editing experience provided by the [Stackbit Studio](https://stackbit.com?utm_source=project-readme&utm_medium=referral&utm_campaign=user_themes).

[![](https://i3.ytimg.com/vi/zd9lGRLVDm4/hqdefault.jpg)](https://stackbit.link/project-readme-lead-video)

Here's a few resources to get you started:

-   📺 &nbsp; [Editing Content](https://stackbit.link/project-readme-editing-video)
-   📺 &nbsp; [Adding, Reordering and Deleting Items](https://stackbit.link/project-readme-adding-video)
-   📺 &nbsp; [Collaboration](https://stackbit.link/project-readme-collaboration-video)
-   📺 &nbsp; [Publishing](https://stackbit.link/project-readme-publishing-video)
-   📚 &nbsp; [Stackbit Documentation](https://stackbit.link/project-readme-documentation)

If you need a hand, make sure to check the [Stackbit support page](https://stackbit.link/project-readme-support).

## Develop Locally

1.  [Create a site](https://app.stackbit.com/create?theme=https://github.com/stackbit-themes/azimuth-gatsby-contentful&utm_source=theme-readme&utm_medium=referral&utm_campaign=stackbit_themes) from this theme using Stackbit.

1.  Stackbit will create a new GitHub repository, a [Contentful](https://www.contentful.com) project, and deploy the site via the selected serverless deployment platform (e.g., [Netlify](https://www.netlify.com)).

1.  Once finished, you will be redirected to Stackbit Studio where you will be
    able to edit the content using the free on-page editing experience, and
    publish new versions of your site

1.  To develop your site locally, clone the generated repository.

1.  Install npm dependencies:

        npm install

1.  Set the following environment variables locally.

    -   `CONTENTFUL_SPACE_ID` - Contentful Space ID. You can acquire the space ID from Contentful's app URL: https://app.contentful.com/spaces/<SPACE_ID>.
    -   `CONTENTFUL_ACCESS_TOKEN` - Content Delivery API - access token. You can acquire from Contentful's app in API Key's section - "Settings" => "API Keys" => "Content delivery / preview tokens" => "Add API Key" or pick one Stackbit generated for you.

1.  Start the Gatsby local development server (run from project root):

        npm run develop

1.  Open [http://localhost:8000/](http://localhost:8000/) in the browser. You can now edit the site contents, and the browser will live-update your changes. 🎉

## Building for production 🏗

To build a static site for production, run the following command

```shell
npm run build
```

The exported site will be written to the `public` folder. The contents of this folder
can be deployed by serverless deployment platform such as [Netlify](https://www.netlify.com).

## Contributing 🙏

To contribute to this theme please follow the following steps:

1.  Clone this repository locally

1.  Create a new Space in Contentful

1.  Create new Contentful Personal Access Tokens [here](https://app.contentful.com/account/profile/cma_tokens/)

1.  Install dependencies

        npm install

1.  Import Contentful data stored in `contentful/export.json` to the new space by running the following command. Replace the `<management_token>` placeholder with your Personal Access Token and the `<space_id>` placeholder with the new space ID.

    ```shell
    ./contentful/import.js <management_token> <space_id>
    ```

1.  Create "Content Delivery API - Access Token" via Contentful app "Settings" => "API Keys" => "Content delivery / preview tokens" => "Add API Key".

1.  Define following environment variables to allow Gatsby to fetch the content
    from Contentful when developing or building the site. Replace {SPACE_ID} with your Space ID and {CDA} with the mew Content Delivery API - access token.

    ```
    export CONTENTFUL_SPACE_ID={SPACE_ID}
    export CONTENTFUL_ACCESS_TOKEN={CDA}
    ```

1.  Lastly, run the development server (from project folder):

         npm run develop

    Navigate to [http://localhost:8000](http://localhost:8000) to see the site.
    Update site code, and the content in Contentful.

1.  Once you finish updating the code and contents, export the contents back to the `contentful/export.json` file by running the following command. Replace the `<management_token>` placeholder with your Personal Access Token and the `<space_id>` placeholder with the new space ID.

    ```shell
    ./contentful/export.js <management_token> <space_id>
    ```

1.  Commit, push and submit a pull-request 🎉

## Learn More 📚

To learn more about Stackbit, take a look at the following resources:

-   [Stackbit Documentation](https://www.stackbit.com/docs/)
-   Configure your theme using [stackbit.yaml](https://www.stackbit.com/docs/stackbit-yaml/)

To learn more about Gatsby, take a look at the following resources:

-   [Gatsby Documentation](https://www.gatsbyjs.com/docs/) - learn about Gatsby features and API.

To learn more about Contentful, take a look at the following resources:

-   [Contentful Docs](https://www.contentful.com/developers/docs/)
-   [Importing and exporting content with the Contentful CLI](https://www.contentful.com/developers/docs/tutorials/cli/import-and-export/)

To learn more about Netlify, take a look at the following resources:

-   [Netlify Docs](https://docs.netlify.com/)
