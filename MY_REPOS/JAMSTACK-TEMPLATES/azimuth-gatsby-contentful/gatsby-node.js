const path = require('path');
const _ = require('lodash');

/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

exports.createPages = ({ graphql, actions }) => {
    const { createPage } = actions;
    const pageFields = `
    edges {
      node {
        contentful_id
        sys {
          contentType {
            sys {
              id
            }
          }
        }
        title {
          title
        }
        slug
      }
    }`;
    return graphql(`
    {
      allContentfulLanding {
        ${pageFields}
      }
      allContentfulPage {
        ${pageFields}
      }
      allContentfulPost {
        ${pageFields}
      }
    }
    `).then((result) => {
        if (result.errors) {
            return Promise.reject(result.errors);
        }

        const pageNodes = _.concat(
            _.map(result.data.allContentfulLanding.edges, ({ node }) => node),
            _.map(result.data.allContentfulPage.edges, ({ node }) => node),
            _.map(result.data.allContentfulPost.edges, ({ node }) => node)
        );

        pageNodes.forEach((node) => {
            const template = node.sys.contentType.sys.id;
            const contentfulId = node.contentful_id;
            const component = path.resolve(`./src/templates/${template}.js`);
            const slug = node.slug;

            // if slug is not defined, don't create a page
            if (!slug) {
                console.error(
                    `Error: page of type "${template}" and contentful id "${contentfulId}" does not have a "slug" field, page will not be created`
                );
                return;
            }

            const pagePath = template === 'post' ? `blog/${_.trim(slug, '/')}` : slug;

            const page = {
                path: pagePath,
                component: component,
                context: {
                    contentfulId: contentfulId
                }
            };

            createPage(page);
        });
    });
};
