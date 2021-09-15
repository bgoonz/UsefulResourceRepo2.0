var mongoose = require("mongoose");

var campGroundShema = new mongoose.Schema({
  name: String,
  image: String,
  description: String,
  date: String,
  price: Number,
  rank: Number,
  nRank: [Number],
  author: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    username: String,
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
});

module.exports = mongoose.model("Campground", campGroundShema);
