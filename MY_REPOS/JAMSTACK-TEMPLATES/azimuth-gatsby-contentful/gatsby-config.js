module.exports = {
    pathPrefix: '/',
    siteMetadata: {},
    flags: {
        DEV_SSR: false
    },
    plugins: [
        'gatsby-plugin-react-helmet',
        'gatsby-plugin-sass',
        'gatsby-plugin-sharp',
        'gatsby-plugin-image',
        {
            resolve: 'gatsby-source-contentful',
            options: {
                spaceId: process.env.CONTENTFUL_SPACE_ID,
                environment: process.env.CONTENTFUL_ENVIRONMENT || 'master',
                accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
                host: process.env.CONTENTFUL_PREVIEW ? 'preview.contentful.com' : 'cdn.contentful.com',
                useNameForId: false
            }
        }
    ]
};
