import mongoose from "mongoose";

const schema = new mongoose.Schema({
  email: String,
  password: String,
});

export const User = mongoose.model("User", schema);
