const _ = require('lodash');

exports.onCreateNode = ({ node, actions }) => {
  const { createNodeField } = actions;
  let slug;
  if (node.internal.type === 'MarkdownRemark') {
    if (
      Object.prototype.hasOwnProperty.call(node, 'frontmatter') &&
      Object.prototype.hasOwnProperty.call(node.frontmatter, 'slug')
    ) {
      slug = `/${_.kebabCase(node.frontmatter.slug)}`;
    }
    if (
      Object.prototype.hasOwnProperty.call(node, 'frontmatter') &&
      Object.prototype.hasOwnProperty.call(node.frontmatter, 'title')
    ) {
      slug = `/${_.kebabCase(node.frontmatter.title)}`;
    }
    createNodeField({ node, name: 'slug', value: slug });
  }
};

// graphql function returns a promise so we can use this little promise helper to have a nice result/error state
const wrapper = promise =>
  promise
    .then(result => ({ result, error: null }))
    .catch(error => ({ error, result: null }));

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  const postPage = require.resolve('./src/templates/post.js');

  const { error, result } = await wrapper(
    graphql(`
      {
        posts: allMarkdownRemark {
          edges {
            node {
              fields {
                slug
              }
            }
          }
        }
      }
    `)
  );

  if (!error) {
    const posts = result.data.posts.edges;

    posts.forEach(edge => {
      createPage({
        path: edge.node.fields.slug,
        component: postPage,
        context: {
          slug: edge.node.fields.slug,
        },
      });
    });

    return
  }

  console.log(error)
};
