# gatsby-webinar-getting-started

Hello 👋🏻

If you're reading this you probably watched the Gatsby webinar ["Coding and Careers: Getting Started with Gatsby"](https://www.gatsbyjs.com/gatsby-coding-careers/) -- if not, I highly recommend watching the live demo and coming back later here.

The goal of the webinar and this repository is to give you an idea on how to get started with Gatsby and what you can achieve with Gatsby in a short time.

The progress of this project is split up into separate commits with descriptive messages. I'll refer to these titles further below in this README when explaining each step in more detail. I've also tagged some commits, thus simplyfing the checkout process. For example, you can use `git checkout 01` to access the first commit.

## Overview of project

Curious yet? See the [**live preview**](https://gatsbywebinargettingstarted.gtsb.io/) of the site already.

So what does the project highlight?

- **File System Route API** ([Documentation](https://www.gatsbyjs.com/docs/file-system-route-api/)): Use the File System Route API when you want to programmatically create pages from your GraphQL data, e.g. to create individual blog post pages for your blog. With this API you can control the file path and queried data by adding some extra notation to the names of your files without touching or creating `gatsby-node.js` whatsoever.

- **Leveraging the plugin ecosystem** ([Plugins search](https://www.gatsbyjs.com/plugins)): Use one of the 2000+ plugins to add functionality to your project. In this case we used plugins to source the local file system but to also access a third-party API (without learning their API syntax, it just works!). This is made possible by the universal data layer of GraphQL.

- **🧪 Bonus: Using the new gatsby-plugin-image** ([Beta](https://github.com/gatsbyjs/gatsby/discussions/27950)): The existing `gatsby-image` React component is already awesome, but we've worked on a new successor to it: `gatsby-plugin-image`. It's currently in Beta and this project already shows you how to use it. It'll be the default and our recommendation for image usage in Gatsby very soon, so this is a neat little sneak-peak into what's an essential for "Getting started with Gatsby" soon!

## Steps

### Initial commit from gatsby

After running this in the shell:

```shell
npm init gatsby

# Or if you use yarn
yarn create gatsby
```

And choosing the "CSS Modules/PostCSS" & "Add markdown support (without MDX)" option this is the output you'll get.

### Install dependencies

In order to use use Tailwind and the other plugins some dependencies need to be installed.

### Add plugin & tailwind configuration

The instructions for adding Tailwind to Gatsby can be found here: https://tailwindcss.com/docs/guides/gatsby

In this step the `gatsby-source-filesystem` plugin is changed: The path to the markdown files is `./notes` as they are placed there in the next step. For the (later used) `gatsby-source-instagram` environment variables are used inside the options (so that you don't use my tokens 😉).

### Add markdown notes

In this step two markdown files are added to the `./notes` directory. After telling Gatsby to look into this directory, restarting the development server will yield `markdownRemark` nodes in the GraphiQL overview.

### Display notes on src/pages/index.jsx

Use GraphQL to get all notes information and display it as a list on the index page. The GraphiQL interface (at `localhost:8000/___graphql`) can help you create those queries, as you can activate the `Explorer` and `Code Exporter`.

### File System Route API for notes

Hurray 🎉 Using the new File System Route API individual pages are created for each note. By using the `{}` (curly brackets) notation you signal that you want to create collection routes. With `src/pages/notes/{MarkdownRemark.frontmatter__title}.jsx` you access the model `MarkdownRemark` (as with the `allMarkdownRemark` query on the index page) and its nested field `title` inside the `frontmatter`.

The underlying query (that Gatsby executes for you with this notation) is:

```graphql
{
  allMarkdownRemark {
    nodes {
      id
      frontmatter {
        title
      }
    }
  }
}
```

The `id` information is now passed through the `pageContext` to the individual page and you can access it as a GraphQL variable with `$id`. This is used for filtering for the individual note that should be displayed.

The notes are now accessible as individual pages, e.g. `/notes/building-notes`.

### File System Route API for client-only page 'greetings'

In addition to the curly brackets notation for collection routes, you can also use `[]` (square brackets) to create client-only pages. If you're unsure what client-only routes are, head over to the [documentation about client-only routes & user authentication](https://www.gatsbyjs.com/docs/client-only-routes-and-user-authentication/) to learn more.

By placing a file at `src/pages/greetings/[name].jsx` every user/URL that goes to `/greetings/:name` is caught by this. If you go to `/greetings/World` the page will greet you with `Hello World` 😅

### Add components

I've built some React components together with Tailwind to make this site prettier!

### Use components in pages & add Instagram pages

In this step the aforementioned components are used across the site.

Also an overview of Instagram posts is added to the index page + each post gets their own page via the File System Route API. This is possible because at the beginning `gatsby-source-instagram` was already set up. The `Insta` component uses the new `gatsby-plugin-image` and looking at the GraphQL query you'll also see the new `gatsbyImageData` key.
