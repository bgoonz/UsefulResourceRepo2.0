const fileDb = require("./base-model");
module.exports = fileDb.register("resources", {
  descriptors: {
    title: String,
    description: String,
    link: String,
    type: String,
  },
});
