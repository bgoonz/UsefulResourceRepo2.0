---
title: Blog starter
shortTitle: Blog
categories: ['starter']
---

The **Blog** starter is the most advanced **default** starter in the **Kit**. It's the [Website](../website-starter) starter + **blog** functionality based on **markdown** files.

![gatsby-starter-kit-blog](./gatsby-starter-kit-blog.png)

<a class="demoLink"  target="_blank" href="https://gatsby-starter-kit-blog.netlify.com">Live demo</a>

## Features

- A bunch of ready to use **themeable** React components.
- Default **theme** applied to all components.
- Posts pages automatically created from markdown **posts** files.
- Automaticaly created **Category** pages for blog posts.
- Web pages automatically created from markdown **pages** files.
- **Categories** for markdown **posts** and **pages**.
- Markdown **parts** files let you edit content inside
  React components without touching the code.
- **Author** block below every post content.
- **Next / Prev** block below every post content.
- **Comments** by Facebook widget.
- **Social share** buttons block.
- Central **config** object.
- Easy editable **menu**.
- Feather **icons**.
- **Seo** component for managing meta tags.
- Google **Analytics** support.
- Auto generated **sitemap**.

## Gatsby plugins

- gatsby-plugin-catch-links
- gatsby-plugin-emotion
- gatsby-plugin-google-analytics
- gatsby-plugin-sharp
- gatsby-plugin-sitemap
- gatsby-plugin-react-helmet
- gatsby-plugin-resolve-src
- gatsby-remark-copy-linked-file
- gatsby-remark-emojis
- gatsby-remark-images
- gatsby-remark-prismjs
- gatsby-remark-responsive-iframe
- gatsby-remark-smartypants
- gatsby-transformer-remark
- gatsby-source-filesystem

## Add-ons

- @react-website-themes/default
- emotion
- emotion-server
- facepaint
- react-custom-share
- react-emotion
- react-facebook
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
      │   ├── pages
      │   │   ├── catalog
      │   │   │   └── index.md
      │   │   └── about
      │   │       └── index.md
      │   ├── posts
      │   │   ├── 2017-10-01___two-things-are
      │   │   |   ├── photo.png
      │   │   │   └── index.md
      |   |
      |   |   ...
      |   |
      │   │   └── 2017-10-21___like-nonsense
      │   │       ├── photo.png
      │   │       └── index.md
      │   └── parts
      │       ├── author.md
      │       ├── copyright.md
      │       ├── footerLinks.md
      │       ├── hero.md
      │       ├── notFound.md
      │       └── welcome.md
      ├── pages
      │   ├── 404.js
      │   ├── blog.js
      │   └── index.js
      └── templates
          ├── CategoryTemplate.js
          ├── PageTemplate.js
          └── PostTemplate.js
```

## Installation

**Default usage**

```shell
gatsby new [NEW_DIRECTORY_FOR_YOUR_SITE] https://github.com/greglobinski/gatsby-starter-kit.git#blog-with-content
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
git checkout --track origin/blog-with-content
...
git checkout -b my-blog
...
yarn install
...
gatsby develop
```
