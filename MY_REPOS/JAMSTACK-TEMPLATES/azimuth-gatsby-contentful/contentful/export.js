#!/usr/bin/env node

const contentfulExport = require('contentful-export');

const managementToken = process.env.CONTENTFUL_MANAGEMENT_TOKEN || process.argv[2];
const spaceId = process.env.CONTENTFUL_SPACE_ID || process.argv[3];

if (!managementToken || !spaceId) {
    console.error(
        'Contentful management token or space ID were not provided.\n\nUsage:\n./export.js <managementToken> <spaceId>\n'
    );
    process.exit(1);
}

const options = {
    spaceId: spaceId,
    managementToken: managementToken,
    exportDir: __dirname,
    contentFile: 'export.json',
    downloadAssets: true
};

contentfulExport(options)
    .then((result) => {
        console.log('Your space data:', result);
    })
    .catch((error) => {
        console.log('Error exporting content:', error);
    });
