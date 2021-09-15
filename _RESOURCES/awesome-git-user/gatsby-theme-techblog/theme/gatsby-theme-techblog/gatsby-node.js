const fs = require("fs");
const { createFilePath } = require(`gatsby-source-filesystem`);
const _ = require("lodash");

// Make sure the data directory exists
exports.onPreBootstrap = ({ reporter }, options) => {
  const contentPath = options.contentPath || `posts`;
  const blogPath = "blog";
  if (!fs.existsSync(contentPath)) {
    reporter.info(`creating the ${contentPath} directory`);
    fs.mkdirSync(contentPath);
  }
  if (!fs.existsSync(blogPath)) {
    reporter.info(`creating the ${blogPath} directory`);
    fs.mkdirSync(blogPath);
  }
};

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;
  if (node.internal.type === `Mdx`) {
    const slug = createFilePath({ node, getNode, basePath: `pages` });
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    });
  }
};

// query for posts and create pages
exports.createPages = async ({ actions, graphql, reporter }) => {
  const result = await graphql(`
    query {
      allMdx(sort: { fields: frontmatter___date, order: DESC }) {
        edges {
          node {
            id
            fields {
              slug
            }
            frontmatter {
              title
              tags
              published
              date
            }
          }
        }
      }
    }
  `);
  if (result.errors) {
    reporter.panic("error loading posts", result.errors);
    return;
  }
  const posts = result.data.allMdx.edges;
  posts.forEach(({ node }) => {
    const slug = node.fields.slug;
    actions.createPage({
      path: slug,
      component: require.resolve("./src/templates/post.js"),
      context: {
        postID: node.id,
      },
    });
  });

  // Extract tag data from query
  // Tag pages:
  let tags = [];
  // Iterate through each post, putting all found tags into `tags`
  _.each(posts, (edge) => {
    if (_.get(edge, "node.frontmatter.tags")) {
      tags = tags.concat(edge.node.frontmatter.tags);
    }
  });

  // Eliminate duplicate tags
  tags = _.uniq(tags);

  // Make tag pages
  tags.forEach((tag) => {
    actions.createPage({
      path: `/tags/${_.kebabCase(tag)}/`,
      component: require.resolve("./src/templates/tags.js"),
      context: {
        tag,
      },
    });
  });

  const postsPerPage = 3;
  const numPages = Math.ceil(posts.length / postsPerPage);

  Array.from({ length: numPages }).forEach((_, i) => {
    actions.createPage({
      path: i === 0 ? `/blog` : `/blog/${i + 1}`,
      component: require.resolve("./src/templates/paginated-list.js"),
      context: {
        limit: postsPerPage,
        skip: i * postsPerPage,
        numPages,
        currentPage: i + 1,
      },
    });
  });
};
