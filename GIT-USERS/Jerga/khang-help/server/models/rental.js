const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const rentalSchema = new Schema({
  // max is how many character can be stored in the db
  // takes 2 arguments first is validation, second is the error
  title: {
    type: String,
    required: true,
    max: [128, "Too long, max is 128 characters"],
  },

  // in the UI it will convert to the lowercase to the db
  city: { type: String, required: true, lowercase: true },
  street: {
    type: String,
    required: true,
    min: [4, "Too short, min is 4 characters"],
  },
  category: { type: String, required: true, lowercase: true },
  image: { type: String, required: true },
  bedrooms: Number,
  shared: Boolean,
  description: { type: String, required: true },
  dailyRate: Number,
  createdAt: { type: Date, default: Date.now() },
  // just 1 user so it's an object here
  user: { type: Schema.Types.ObjectId, ref: "User" },
  bookings: [{ type: Schema.Types.ObjectId, ref: "Booking" }],
});

module.exports = mongoose.model("Rental", rentalSchema);
