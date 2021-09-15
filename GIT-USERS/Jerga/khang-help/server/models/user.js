const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt-nodejs");
const userSchema = new Schema({
  username: {
    type: String,
    min: [4, "Too short, min is 4 characters"],
    max: [32, "Too long, max is 32 characters"],
  },
  email: {
    type: String,
    min: [4, "Too short, min is 4 characters"],
    max: [32, "Too long, max is 32 characters"],
    unique: true,
    lowercase: true,
    required: "Email is required",
    // validate email format
    match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
  },
  password: {
    type: String,
    min: [4, "Too short, min is 4 characters"],
    max: [32, "Too long, max is 32 characters"],
    required: "Password is required",
  },
  stripeCustomerId: String,
  revenue: Number,
  // assign rental model in user
  rentals: [{ type: Schema.Types.ObjectId, ref: "Rental" }],
  bookings: [{ type: Schema.Types.ObjectId, ref: "Booking" }],
});

userSchema.methods.hasSamePassword = function (requestedPassword) {
  return bcrypt.compareSync(requestedPassword, this.password);
};

// have to use es5 here
userSchema.pre("save", function (next) {
  const user = this;

  bcrypt.genSalt(10, function (err, salt) {
    bcrypt.hash(user.password, salt, null, function (err, hash) {
      user.password = hash;
      next();
    });
  });
});

module.exports = mongoose.model("User", userSchema);
