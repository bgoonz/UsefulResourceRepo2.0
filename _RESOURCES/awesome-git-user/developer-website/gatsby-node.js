const path = require(`path`);
const { createFilePath } = require(`gatsby-source-filesystem`);
const _ = require("lodash");

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;
  if (node.internal.type === `MarkdownRemark`) {
    const slug = createFilePath({ node, getNode, basePath: `pages` });

    createNodeField({
      node,
      name: `slug`,
      value: slug,
    });
  }
};

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
  const postTemplate = path.resolve(`./src/templates/postTemplate.js`);
  const projectTemplate = path.resolve(`./src/templates/projectTemplate.js`);
  const result = await graphql(`
    query {
      allMarkdownRemark {
        edges {
          node {
            fields {
              slug
            }
            frontmatter {
              tags
              pagetype
            }
          }
        }
      }
    }
  `);

  result.data.allMarkdownRemark.edges.forEach(({ node }) => {
    if (node.frontmatter.pagetype === "post") {
      createPage({
        path: node.fields.slug,
        component: postTemplate,
        context: {
          slug: node.fields.slug,
        },
      });
    }
  });
  result.data.allMarkdownRemark.edges.forEach(({ node }) => {
    if (node.frontmatter.pagetype === "project") {
      createPage({
        path: node.fields.slug,
        component: projectTemplate,
        context: {
          slug: node.fields.slug,
        },
      });
    }
  });

  // Tag pages:
  let tags = [];
  // Iterate through each post, putting all found tags into `tags`
  _.each(result.data.allMarkdownRemark.edges, (edge) => {
    if (_.get(edge, "node.frontmatter.tags")) {
      tags = tags.concat(edge.node.frontmatter.tags);
    }
  });

  // Eliminate duplicate tags
  tags = _.uniq(tags);

  // Make tag pages
  tags.forEach((tag) => {
    createPage({
      path: `/tags/${_.kebabCase(tag)}/`,
      component: path.resolve("src/templates/tagTemplate.js"),
      context: {
        tag,
      },
    });
  });

  const postsPerPage = 3;
  const posts = [];
  result.data.allMarkdownRemark.edges.forEach((edge) => {
    if (edge.node.frontmatter.pagetype === "post") {
      posts.push(edge);
    }
  });
  const numPages = Math.ceil(posts.length / postsPerPage);

  Array.from({ length: numPages }).forEach((_, i) => {
    createPage({
      path: i === 0 ? `/posts` : `/posts/${i + 1}`,
      component: path.resolve("./src/templates/postsTemplate.js"),
      context: {
        limit: postsPerPage,
        skip: i * postsPerPage,
        numPages,
        currentPage: i + 1,
      },
    });
  });
};
