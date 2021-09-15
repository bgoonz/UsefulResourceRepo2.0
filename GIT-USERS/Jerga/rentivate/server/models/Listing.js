// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;
//
// const listingSchema = new Schema({
//   title: { type: String, required: true, max: [120, 'Title too long. Maximum 120 characters.'] },
//   description: { type: String, required: true },
//   state: { type: String, required: true },
//   address: { type: String, required: true },
//   category: { type: String, required: true },
//   condition: { type: String, required: true },
//   rate: { type: Number, required: true },
//   method: { type: String, required: true },
//   image: { type: String, required: true },
//   createdAt: { type: Date }
// });
//
// module.exports = mongoose.model('Listing', listingSchema)

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const rentalSchema = new Schema({
  title: {
    type: String,
    required: true,
    max: [128, "Too long, max is 128 characters"],
  },
  // city: { type: String, required: true, lowercase: true },
  state: { type: String, required: true, lowercase: true },
  // street: { type: String, required: true, min: [4, 'Too short, min is 4 characters']},
  address: {
    type: String,
    required: true,
    min: [4, "Too short, min is 4 characters"],
  },
  category: { type: String, required: true, lowercase: true },
  condition: { type: String, required: true },
  image: { type: String, required: true },
  // bedrooms: Number,
  // shared: Boolean,
  description: { type: String, required: true },
  rate: Number,
  createdAt: { type: Date, default: Date.now },
  user: { type: Schema.Types.ObjectId, ref: "User" },
  bookings: [{ type: Schema.Types.ObjectId, ref: "Booking" }],
});

module.exports = mongoose.model("Rental", rentalSchema);
