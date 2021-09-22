module.exports = {
  mode: "universal",
  /*
   ** Headers of the page
   */
  head: {
    title: "Portfolio - Matan Shaviro",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: process.env.npm_package_description || "",
      },
      {
        hid: "og:title",
        name: "og:title",
        content: "Explore My Portfolio | Matan Shaviro",
      },
      { hid: "og:locale", name: "og:locale", content: "en_EU" },
      {
        hid: "og:url",
        name: "og:url",
        content: process.env.BASE_URL || "http://localhost:3000",
      },
      { hid: "og:type", name: "og:type", content: "website" },
      {
        hid: "og:image",
        name: "og:image",
        content:
          "https://images.unsplash.com/photo-1552831388-6a0b3575b32a?ixlib=rb-1.2.1&auto=format&fit=crop&w=2089&q=80",
      },
      {
        hid: "og:description",
        name: "og:description",
        content:
          "My name is Matan Shaviro and I am a software engineer graduate (B.Sc)",
      },
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: "#fff" },
  /*
   ** Global CSS
   */
  css: ["@/assets/scss/main.scss", "@/assets/css/icons.css"],
  styleResources: {
    scss: ["@/assets/scss/variables.scss"],
  },
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    { src: "~/plugins/filters" },
    { src: "~/plugins/vuelidate" },
    { src: "~/plugins/integrations" },
    { src: "~/plugins/components" },
    { src: "~/plugins/tooltip" },
    { src: "~/plugins/youtube" },
    { src: "~/plugins/toasted", ssr: false },
    { src: "~/plugins/paginate", ssr: false },
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    "@nuxtjs/axios",
    "portal-vue/nuxt",
    "@nuxtjs/style-resources",
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {
    proxy: true,
    prefix: "/api/",
  },
  proxy: {
    "/api/": {
      target: process.env.API_URL || "http://localhost:3000",
      pathRewrite: { "^/api": "" },
    },
  },
  serverMiddleware: ["~/server/routes/index"],
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {},
  },
};
