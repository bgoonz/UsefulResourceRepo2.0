---
title: Equipped starter
shortTitle: Equipped
categories: ['starter']
---

The **Equipped** starter is built upon the [Minimal](../minimal-starter) one with some additions.

![gatsby-starter-kit-equipped](./gatsby-starter-kit-equipped.png)

<a class="demoLink"  href="https://gatsby-starter-kit-equipped.netlify.com" target="_blank">Live demo</a>

## Features

- A bunch of ready to use structural no-style **React components**.
- Markdown **parts** files for editing content without touching Components' code.
- Central **config** object.
- Easy editable **menu**.
- Feather **icons**.
- **Seo** component for managing meta tags.
- Google **Analytics** support.
- Auto generated **sitemap**.

## Gatsby plugins

- gatsby-plugin-catch-links
- gatsby-plugin-google-analytics
- gatsby-plugin-react-helmet
- gatsby-plugin-resolve-src
- gatsby-plugin-sitemap
- gatsby-source-filesystem
- gatsby-transformer-remark

## Add-ons

- react-feather
- react-helmet

## Folder structure

```
root
  └── src
      ├── content
      │   ├── meta
      │   │   ├── config.js
      │   │   └── menu.js
      │   └── parts
      │       ├── copyright.md
      │       ├── footerLinks.md
      │       ├── notFound.md
      │       └── welcome.md
      ├── pages
      │   ├── 404.js
      │   └── index.js
      └── starter
          ├── Article.js
          ├── Bodytext.js
          ├── Branding.js
          ├── Footer.js
          ├── Header.js
          ├── Heading.js
          ├── Layout.js
          ├── MainMenu.js
          ├── MainMenuItem.js
          └── Seo.js
```

## Installation

**Default usage**

```shell
gatsby new [NEW_DIRECTORY_FOR_YOUR_SITE] https://github.com/greglobinski/gatsby-starter-kit.git#equipped-with-content
...
cd [NEW_DIRECTORY_FOR_YOUR_SITE]
...
gatsby develop
```

**Advanced usage**

Fork the [repository](https://github.com/greglobinski/gatsby-starter-kit).

```shell
git clone https://github.com/[your-github-name]/gatsby-starter-kit.git [NEW_DIRECTORY_FOR_YOUR_SITE]
...
cd [NEW_DIRECTORY_FOR_YOUR_SITE]
...
git checkout --track origin/equipped-with-content
...
git checkout -b my-equipped
...
yarn install
...
gatsby develop
```
