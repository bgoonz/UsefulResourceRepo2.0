const _ = require("lodash");
const mapDeep = require("./src/utils/map-deep");

const isDev = process.env.NODE_ENV === "development";

module.exports = {
  plugins: [
    {
      module: require("sourcebit-source-sanity"),
      options: {
        accessToken: process.env.SANITY_TOKEN,
        projectId: process.env.SANITY_PROJECT_ID,
        dataset: process.env.SANITY_DATASET || "production",
        isPreview: isDev,
        watch: isDev,
      },
    },
    // Following plugin is defined by single transform function that
    // transforms data to a format expected by react components
    function ({ data }) {
      return _.assign({}, data, {
        objects: mapDeep(data.objects, (value) => {
          const modelName = _.get(value, "__metadata.modelName");
          // replace the asset object with the value of its "url" field
          if (modelName === "__asset") {
            return _.get(value, "url");
          }
          // copy modelName to "_type" field
          if (modelName) {
            return _.assign({ _type: modelName }, value);
          }
          return value;
        }),
      });
    },
    {
      module: require("sourcebit-target-next"),
      options: {
        liveUpdate: isDev,
        pages: [
          { path: "/{slug}", predicate: _.matchesProperty("_type", "landing") },
          { path: "/{slug}", predicate: _.matchesProperty("_type", "page") },
          { path: "/{slug}", predicate: _.matchesProperty("_type", "blog") },
          {
            path: "/blog/{slug}",
            predicate: _.matchesProperty("_type", "post"),
          },
          {
            path: "/blog/category/{slug}",
            predicate: _.matchesProperty("_type", "blog_category"),
          },
        ],
        commonProps: {
          config: {
            single: true,
            predicate: _.matchesProperty("_type", "site_config"),
          },
          posts: { predicate: _.matchesProperty("_type", "post") },
        },
      },
    },
  ],
};
