module.exports = [
  {
    plugin: require("../node_modules/gatsby-plugin-mdx/gatsby-browser.js"),
    options: {
      plugins: [],
      extensions: [".mdx"],
      defaultLayouts: {},
      gatsbyRemarkPlugins: [],
      lessBabel: false,
      remarkPlugins: [],
      rehypePlugins: [],
      mediaTypes: ["text/markdown", "text/x-markdown"],
      root: "/opt/build/repo",
    },
  },
  {
    plugin: require("../node_modules/gatsby-plugin-theme-ui/gatsby-browser.js"),
    options: {
      plugins: [],
    },
  },
  {
    plugin: require("../node_modules/gatsby-plugin-google-analytics/gatsby-browser.js"),
    options: {
      plugins: [],
      head: false,
      anonymize: false,
      respectDNT: false,
      exclude: [],
      pageTransitionDelay: 0,
    },
  },
  {
    plugin: require("../node_modules/gatsby-plugin-manifest/gatsby-browser.js"),
    options: {
      plugins: [],
      name: "Cara - @lekoarts/gatsby-theme-cara",
      short_name: "Cara",
      description:
        "My web development portfolio created with gatsby and react.",
      start_url: "/",
      background_color: "#141821",
      theme_color: "#f6ad55",
      display: "standalone",
      icons: [
        {
          src: "/apple-touch-icon-180x180.png",
          sizes: "192x192",
          type: "image/png",
        },
        {
          src: "/apple-touch-icon-152x152.png",
          sizes: "512x512",
          type: "image/png",
        },
      ],
      legacy: true,
      theme_color_in_head: true,
      cache_busting_mode: "query",
      crossOrigin: "anonymous",
      include_favicon: true,
      cacheDigest: null,
    },
  },
  {
    plugin: require("../node_modules/gatsby-plugin-offline/gatsby-browser.js"),
    options: {
      plugins: [],
    },
  },
];
