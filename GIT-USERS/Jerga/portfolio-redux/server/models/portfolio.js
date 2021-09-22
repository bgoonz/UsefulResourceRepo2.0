const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const lenghtError = (limit) => `Too long, max is ${limit} characters`;

const portfolioSchema = new Schema({
  userId: { type: String },
  title: { type: String, required: true, maxlength: [256, lenghtError(256)] },
  company: String,
  location: String,
  position: {
    type: String,
    required: true,
    maxlength: [256, lenghtError(256)],
  },
  description: {
    type: String,
    required: true,
    maxlength: [1024, lenghtError(1024)],
  },
  startAt: { type: Date, required: true },
  endAt: { type: Date },
  image: String,
});

module.exports = mongoose.model("Portfolio", portfolioSchema);
