var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var UserSchema = new mongoose.Schema({
  username: String,
  password: String,
  role: String,
  rankedCamps: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Campground",
    },
  ],
  createdCamps: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Campground",
    },
  ],
});

UserSchema.plugin(passportLocalMongoose); // to login ,register....

module.exports = mongoose.model("User", UserSchema);
