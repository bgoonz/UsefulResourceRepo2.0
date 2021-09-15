const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const config = require("../config/database");

const FileSchema = new mongoose.Schema(
  {
    txt: {
      type: String,
      required: true,
    },
    file: {
      type: Object,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const File = (module.exports = mongoose.model("File", FileSchema));
