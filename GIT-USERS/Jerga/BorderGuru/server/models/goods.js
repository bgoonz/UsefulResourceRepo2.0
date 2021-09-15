var mongoose = require("mongoose");

var goodsSchema = new mongoose.Schema({
  companyName: String,
  customerAdress: String,
  item: String,
  clicks: Number,
});

module.exports = mongoose.model("Goods", goodsSchema);
