import mongoose from "mongoose";

const Schema = mongoose.Schema;

const scehma = new Schema({
  message: {
    type: String,
    required: "message is required",
  },
  postId: {
    type: String,
    required: "name is required",
  },
});

module.exports = mongoose.model("Comment", scehma);
