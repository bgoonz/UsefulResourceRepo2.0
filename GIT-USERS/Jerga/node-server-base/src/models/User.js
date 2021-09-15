import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema({
  facebookId: String,
  name: String,
  email: String,
});

mongoose.model("users", userSchema);
