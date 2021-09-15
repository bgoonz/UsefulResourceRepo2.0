const mongoose = require("mongoose"),
  Schema = mongoose.Schema;

const HeroesSchema = new Schema({
  name: {
    type: String,
    required: true,
  },

  relationships: [
    {
      name: {
        type: String,
      },
      relationship: {
        type: String,
      },
    },
  ],
});

module.exports = mongoose.model("Heroes", HeroesSchema);
