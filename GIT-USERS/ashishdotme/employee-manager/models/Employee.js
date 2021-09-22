const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create schema
const EmployeeSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  mobile: {
    type: String,
  },
  email: {
    type: String,
  },
});

module.exports = Post = mongoose.model("employee", EmployeeSchema);
