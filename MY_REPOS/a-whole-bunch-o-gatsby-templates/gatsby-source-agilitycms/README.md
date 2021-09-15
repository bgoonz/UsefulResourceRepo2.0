# GatsbyJS Source Plugin for Agility CMS

This is the offical [Agility CMS](https://agilitycms.com) source plugin for GatsbyJS.

This uses the [Agility CMS Sync SDK](https://github.com/agility/agility-sync-sdk) so that builds will only refresh nodes/content that has changed since the last build was run.

## Example

For an example on how this can be used in a website see [Agility CMS GatsbyJS Starter](https://github.com/agility/agility-gatsby-starter).

## Documentation

[Learn how to get started with Gatsby and Agility CMS](https://help.agilitycms.com/hc/en-us/articles/360037873531)

## Usage

Install it:

```
npm install --save @agility/gatsby-source-agilitycms
```

Ensure you have a `gatsby-config.js` file in the root of your website and set the following:

```javascript
/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */
module.exports = {
  siteMetadata: {
    title: "Agility CMS Gatsby Starter",
  },
  plugins: [
    {
      // The name of the plugin
      resolve: "@agility/gatsby-source-agilitycms",
      options: {
        // If you are debugging content from Agility CMS, you can set this to `true`
        debug: false,
        // Your Agility Content Fetch API Guid
        guid: "046a1a87",
        // Your Agility Content Fetch API Key
        apiKey:
          "defaultlive.2b7f3a91559d794bedb688358be5e13af2b1e3ae8cd39e8ed2433bbef5d8d6ac",
        // Set this to true if you are using the preview API Key
        isPreview: agilityConfig.isPreview,
        // Your list of languages
        languages: [
          {
            // The name of the language code
            name: "English",
            // The actual language code set in Agility CMS
            code: "en-us",
            // The name to be used in the URL path that represents the current language
            path: "en",
          },
          {
            // The name of the language code
            name: "French",
            // The actual language code set in Agility CMS
            code: "fr-ca",
            // The name to be used in the URL path that represents the current language
            path: "fr",
          },
        ],
        // The channels you want to include
        channels: [
          {
            // The reference name for the website channel as it is defined in Agility CMS
            referenceName: "website",
          },
        ],
        // The master page template that will be used to render Agility CMS pages
        masterPageTemplate: "./src/templates/AgilityPage.js",
      },
    },
  ],
};
```
