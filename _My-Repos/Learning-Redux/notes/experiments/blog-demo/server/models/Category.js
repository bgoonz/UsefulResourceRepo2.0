import mongoose from "mongoose";

const Schema = mongoose.Schema;

const scehma = new Schema({
  name: {
    type: String,
  },
});

module.exports = mongoose.model("Category", scehma);
