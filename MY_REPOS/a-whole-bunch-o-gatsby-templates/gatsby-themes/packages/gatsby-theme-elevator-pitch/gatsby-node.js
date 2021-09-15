const { createFilePath } = require(`gatsby-source-filesystem`);
const fs = require('fs');

const SLUG_SEPARATOR = '___';

exports.onPreBootstrap = ({ reporter }) => {
  const dirs = [
    'content',
    'content/elevator-pitch',
    'content/elevator-pitch/screens',
    'content/elevator-pitch/images',
  ];

  dirs.forEach(dir => {
    if (!fs.existsSync(dir)) {
      reporter.log(`creating the ${dir} directory`);
      fs.mkdirSync(dir);
    }
  });
};

let userCreatedOwnContent = false;

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;

  if (node.internal.type === `MarkdownRemark`) {
    const fileNode = getNode(node.parent);
    const filePath = createFilePath({ node, getNode });

    const source = fileNode.sourceInstanceName;

    const eligibleSources = [
      'elevator-pitch-screens',
      'elevator-pitch-demo-screens',
    ];

    if (eligibleSources.includes(source)) {
      if (source === 'elevator-pitch-screens') {
        userCreatedOwnContent = true;
      }

      if (userCreatedOwnContent && source === 'elevator-pitch-demo-screens') {
        return;
      }

      const separatorExists = ~filePath.indexOf(SLUG_SEPARATOR);

      let position = null;

      if (separatorExists) {
        const separatorPosition = filePath.indexOf(SLUG_SEPARATOR);
        position = filePath.substring(1, separatorPosition);
      }

      createNodeField({
        node,
        name: `position`,
        value: position,
      });
      createNodeField({
        node,
        name: `source`,
        value: source,
      });
    }
  }
};
