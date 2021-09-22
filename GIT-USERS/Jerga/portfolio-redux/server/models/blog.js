const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const slugify = require("slugify");

const STATUS = ["draft", "published"];

const blogSchema = new Schema({
  userId: { type: String },
  slug: { type: String, unique: true },
  title: { type: String, required: true },
  subTitle: { type: String, required: true },
  story: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  status: { type: String, default: "draft" },
  author: String,
  isSlugCreated: { type: Boolean },
});

module.exports = mongoose.model("Blog", blogSchema);
