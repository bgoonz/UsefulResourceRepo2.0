const _ = require('lodash');

const isDev = process.env.NODE_ENV === 'development';


module.exports = {
    plugins: [
        {
            module: require('sourcebit-source-filesystem'),
            options: {
                watch: isDev
            }
        },
        {
            module: require('sourcebit-target-next'),
            options: {
                liveUpdate: isDev,
                flattenAssetUrls: true,
                pages: [
                    { path: '/{__metadata.urlPath}', predicate: _.matchesProperty('__metadata.modelName', 'home') },
                    { path: '/{__metadata.urlPath}', predicate: _.matchesProperty('__metadata.modelName', 'advanced') },
                    { path: '/{__metadata.urlPath}', predicate: _.matchesProperty('__metadata.modelName', 'store') },
                    { path: '/{__metadata.urlPath}', predicate: _.matchesProperty('__metadata.modelName', 'category') },
                    { path: '/{__metadata.urlPath}', predicate: _.matchesProperty('__metadata.modelName', 'product') }
                ],
                commonProps: {
                    pages: { predicate: _.matchesProperty('__metadata.modelType', 'page') },
                    data: { single: true, predicate: _.matchesProperty('__metadata.id', 'sourcebit-source-filesystem:data') }
                }
            }
        }
    ]
};
