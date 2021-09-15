const routes = require("next-routes");

module.exports = routes()
  .add("blogListing", "/blogs", "blogListing")
  .add("myBlogs", "/blogs/me", "myBlogs")
  .add("blogCreate", "/blogs/new", "blogCreate")
  .add("blogDetail", "/blogs/:slug", "blogDetail")
  .add("blogEdit", "/blogs/:id/edit", "blogCreate")
  .add("bio")
  .add("user", "/user/:id", "profile")
  .add("portfolioCreate", "/portfolio/new", "portfolioCreate")
  .add("portfolioDetail", "/portfolio/:id", "portfolioDetail");
