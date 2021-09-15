---
title: Markdown files' names conventions
shortTitle: Markdown files' names
categories: ['guides']
---

All starters of **Gatsby Starter Kit** use **Markdown** files to store content. The markdown files are gathered in sub-folders of `src/content/`. Depending on a starter there could be four type sub-folders under `src/content/`:

```
root
  └── src
      ├── content
      │   ├── docs
      │   ├── pages
      │   ├── posts
      │   └── parts
```

To effectively employ the Kit's built-in scripts you should obey some naming rules.

## Posts

Let's start with **posts**. If you install the [Blog](/blog-starter) starter with a default content you will see something like this.

```
root
  └── src
      ├── content
      │   ├── posts
      │   │   ├── 2017-10-01___two-things-are-infinit
      │   │   |   ├── photo.png
      │   │   │   └── index.md
      │   │   ├── 2017-10-03___be-who-you-are
      │   │   |   ├── photo.png
      │   │   │   └── index.md
      |   |
      |   |   ...
      |   |
      │   │   └── 2017-10-21___like-nonsense
      │   │       ├── photo.png
      │   │       └── index.md
```

Every post markdown file `index.md` has its own separate folder. The name of the post's folder should be consistent with the **pattern**.

- a post date **prefix** (YYYY-MM-DD pattern)
- a **separator** `___` (three underscores)
- a **slug** (kebab-case or whatever you want)

The starters use the [onCreateNode](https://www.gatsbyjs.org/docs/node-apis/#onCreateNode) method of the Gatsby Node API to transform the name of every folder into two node fields `slug` and `prefix`.

### slug

Take a look at the code of the `gatsby-node.js` file.

```javascript
const { createFilePath } = require(`gatsby-source-filesystem`);

const SLUG_SEPARATOR = '___';

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;
  if (node.internal.type === `MarkdownRemark`) {
    const fileNode = getNode(node.parent);
    const filePath = createFilePath({ node, getNode });

    const source = fileNode.sourceInstanceName;

    const separatorExists = ~filePath.indexOf(SLUG_SEPARATOR);

    let slug;
    let prefix;

    if (separatorExists) {
      const separatorPosition = filePath.indexOf(SLUG_SEPARATOR);
      const slugBeginning = separatorPosition + SLUG_SEPARATOR.length;
      slug =
        separatorPosition === 1
          ? null
          : `/${filePath.substring(slugBeginning)}`;
      prefix = filePath.substring(1, separatorPosition);
    } else {
      slug = filePath;
      prefix = '';
    }

    if (source !== 'parts') {
      createNodeField({
        node,
        name: `slug`,
        value: slug,
      });
    }
    createNodeField({
      node,
      name: `prefix`,
      value: prefix,
    });
  }
};
```

Pay attention to two fragments. The first assigns `null` to `slug` when the **separator** is at the beginning of the folder's name.

```javascript
slug = separatorPosition === 1 ? null : `/${filePath.substring(slugBeginning)}`;
```

So, if you name a folder like below, with separator `___`, but without the date `prefix`, the slug will have value of `null`.

```
src/content/posts/___this-is-post-folder-name/
```

The second fragment prevents creation of the `slug` field for nodes with `source` equal to **parts**.

```javascript
if (source !== 'parts') {
  createNodeField({
    node,
    name: `slug`,
    value: slug,
  });
}
```

Later in the same file we use the [onCreatePage](https://www.gatsbyjs.org/docs/node-apis/#onCreatePage) method of the Gatsby Node API to create web pages for every eligible node.

```javascript
exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;

  return new Promise((resolve, reject) => {
    const pageTemplate = path.resolve('./src/templates/PageTemplate.js');

    resolve(
      graphql(`
        {
          allMarkdownRemark(filter: { fields: { slug: { ne: null } } }) {
            edges {
              node {
                fields {
                  slug
                }
              }
            }
          }
        }
      `).then(result => {
        if (result.errors) {
          console.log(result.errors);
          reject(result.errors);
        }

        const items = result.data.allMarkdownRemark.edges;

        items.forEach(({ node }) => {
          const slug = node.fields.slug;
          const source = node.fields.source;

          createPage({
            path: slug,
            component: pageTemplate,
            context: {
              slug,
            },
          });
        });
      })
    );
  });
};
```

This time pay attention to this fragment with **GraphQL filter**

```javascript
allMarkdownRemark(filter: { fields: { slug: { ne: null } } }) {
```

We query only for nodes with the `slug` value different than `null`. So, this combined with the fragments described earlier make that web pages are not created for any of **parts** markdown files and **posts** or **pages** named like this `/src/content/pages/___post-folder-name`.

Thus, if you want to create a **draft** post or page, name it's folder with the **separator** at the beginning.

```
src/content/posts/___hey-iam-a-draft-post/
```

Whenever you will be ready to publish the post, just edit it's folder name, add the date prefix.

```
src/content/posts/2018-08-19___hey-iam-a-published-post-now/
```

### prefix

The **prefix** field is used by the starters to order posts or pages. Take a look at the code below.

```javascript
export const query = graphql`
  query {
    posts: allMarkdownRemark(
      filter: { fields: { source: { eq: "posts" }, slug: { ne: null } } }
      sort: { fields: [fields___prefix], order: DESC }
    ) {
      edges {
        node {
          excerpt(pruneLength: 250)
          fields {
            slug
            prefix
          }
          frontmatter {
            title
            categories
          }
        }
      }
    }
  }
`;
```

It's a fragment of the `src/pages/blog.js` file of the [Blog](./blog-starter) starter. It presents a GraphQL query for data for a component presenting a list of blog posts. Pay attention to the query arguments.

```javascript
filter: { fields: { source: { eq: "posts" }, slug: { ne: null } } }
sort: { fields: [fields___prefix], order: DESC }
```

We query for **posts** which have the `slug` field defined, different than `null` and we order the result according to the `prefix` field.

So, if you name a post like below

```
src/content/posts/hey-iam-a-unordered-post/
```

the script will not know where to place the post on the list.

## Pages

The pages are the subjects to the same naming conventions.

- A name with the **separator** at the beginning makes a **draft** page.
- The **prefix** orders pages.

**A note.** The **docs** markdown files in the [Classy Docs](./classy-docs-starter) starter are standard **pages**, they got a separate folder only for convenience.

## Motivation

These naming conventions let you **at a single glance** learn about the posts/pages status or position.

You do not have to open the post file to know if the post is still a draft or a published one already. You do not have to open the page file to know if it should be before or after another one on the listing. That's convenient, isn't it?
