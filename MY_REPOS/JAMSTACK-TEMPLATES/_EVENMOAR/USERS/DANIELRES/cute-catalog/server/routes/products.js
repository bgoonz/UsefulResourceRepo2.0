const express = require("express");
const router = express.Router();

const Product = require("../models/Product");

router.get("/", async (req, res) => {
  const products = await Product.query().orderBy("created_at", "desc");

  res.json({ products });
});

module.exports = router;
