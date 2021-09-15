<!-- AUTO-GENERATED-CONTENT:START (STARTER) -->
<p align="center">
  <a href="https://www.gatsbyjs.org">
    <img alt="Gatsby" src="https://avatars3.githubusercontent.com/u/12551863?s=400&v=4" width="60" />
  </a>
</p>
<h1 align="center">
  Writer Showcase - A Gatsby Starter
</h1>

_Writer Showcase is a Gatsby Starter blog template created with writers in mind, but really, anyone can use it. It's totally usable right out of the box, but minimalist enough to be easily modifiable to suit your needs. _<br>

[![Netlify Status](https://api.netlify.com/api/v1/badges/ae092d09-ae34-4fc0-8179-322c86d197b4/deploy-status)](https://app.netlify.com/sites/developer-diary/deploys)

## Features

- Ready to go - Blog author name, author image, etc,... can be easily added using a config file.
- Includes Netlify CMS. Users can log in to an admin page and easily create a blog post with a nice, simple user interface.
- Blog posts created as markdown files. It's easy to get started with markdown if you're unfamiliar - [Markdown Cheatsheet](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet)
- Gatsby v.2
- React v.16.12.
- Mobile responsive
- Pagination
- Minimalist design makes it highly modifiable; make your own customized contact forms and search components, for example.
- SEO component for use in pages so search engines can find them.
- Style with Sass

## Getting Started

If you don't have Gatsby CLI installed yet, do that:

```
npm install -g gatsby-cli
```

Install this starter with your name of choice for your blog:

```
gatsby new your-blog-name https://github.com/willjw3/gatsby-starter-writer-showcase.git
```

Navigate into your new project's directory:

```
cd your-blog-name
```

and run the development server:

```
gatsby develop
```

Go to the [http://localhost:8000](http://localhost:8000) to see your new blog.<br>
Go to [http://localhost:8000/\_\_\_graphql](http://localhost:8000/___graphql) to explore your site with a simple GraphQL interface.<br>
Go to the [http://localhost:8000/admin/](http://localhost:8000/admin/) to access the content management system. (Make sure you've set things up with Netlify CMS first - see "Adding blog posts using Netlify CMS (Content Management System)" below)

## Adding Your Information To The Blog

You can add your blog's url, title, tagline, author, social-media contact info and more in the `gatsby-config.js` file.

## Adding blog posts using Netlify CMS (Content Management System)

If you aren't familiar with Netlify CMS, the first thing you'll want to do is familiarize yourself with it. [Netlify CMS](https://www.netlifycms.org/)<br>
_Note: It's recommended that you deploy your site with Netlify. Netlify hosting and Netlify CMS are separate, but work best when used together._<br>
Both the `gatsby-plugin-netlify-cms` plugin and the `netlify-cms-app` are already installed in your blog. All you need to do is set up your site for continuous deployment with a platform like [Netlify](https://www.netlify.com/) and connect Netlify CMS to your GitHub (if you're using GitHub) repository by doing the following:<br>

(From the Netlify CMS docs)

> Netlify's Identity and Git Gateway services allow you to manage CMS admin users for your site without requiring them to have an account with your Git host or commit access on your repo. From your site dashboard on Netlify:

> Go to Settings > Identity, and select Enable Identity service.
> Under Registration preferences, select Open or Invite only. In most cases, you want only invited users to access your CMS, but if you're just experimenting, you can leave it open for convenience.
> If you'd like to allow one-click login with services like Google and GitHub, check the boxes next to the services you'd like to use, under External providers.
> Scroll down to Services > Git Gateway, and click Enable Git Gateway. This authenticates with your Git host and generates an API access token. In this case, we're leaving the Roles field blank, which means any logged in user may access the CMS. For information on changing this, check the Netlify Identity documentation.

**Creating Blog Posts with the CMS**

- Go to `<your site's url>/admin` and log in.
- Fill in the fields:
  - TAGS: enter in tag names separated by commas and spaces. Ex: `gatsby, graphql`
  - PUBLISHED: toggle the switch to the on position. This is the same as setting the frontmatter field manually (`published: true`)
  - DATE: leave the current date and time, or click to bring up the date picker.
  - TITLE: enter your post's title. Ex: `My First Post`
  - BODY: enter your post's main body content, either in Markdown or in Rich Text.
- Click 'Publish'

## Adding Blog Posts Manually

Using your favorite text editor, go into your project's directory and find the `posts` folder. In that folder, add a new markdown file with your new blog post's name in mind. For example, if your post were to be called "Make a Blog With Gatsby", you might want to create the file `make-blog-with-gatsby.md` <br>

Add the frontmatter to that markdown file:

```
---
title: 'Make a Blog With React'
tags: ["react", "nodejs"]
published: true
date: '2019-05-29'
---
```

and then add the rest of your content below the frontmatter.

## Authors

- Will Ward [@willjw3](https://github.com/willjw3)

## Contribute

- Fork the repo
- Create your feature branch (git checkout -b feature/fooBar)
- Commit your changes (git commit -am 'Add some fooBar')
- Push to the branch (git push origin feature/fooBar)
- Create a new Pull Request

## 🎓 Learning Gatsby

Looking for more guidance? Full documentation for Gatsby lives [on the website](https://www.gatsbyjs.org/). Here are some places to start:

- **For most developers, we recommend starting with our [in-depth tutorial for creating a site with Gatsby](https://www.gatsbyjs.org/tutorial/).** It starts with zero assumptions about your level of ability and walks through every step of the process.

- **To dive straight into code samples, head [to our documentation](https://www.gatsbyjs.org/docs/).** In particular, check out the _Guides_, _API Reference_, and _Advanced Tutorials_ sections in the sidebar.

## 💫 Deploy

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/gatsbyjs/gatsby-starter-default)
