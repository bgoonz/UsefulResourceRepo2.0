const express = require("express");

const getImageUploadEndpointAndSignature = require("../../helpers/imagekit/getImageUploadEndpointAndSignature");

const router = express.Router();

const Product = require("../../models/Product");
const ServerError = require("../../ServerError");

router.post("/products", async (req, res, next) => {
  try {
    await Product.query().insert(req.body);
    res.json({ success: true });
  } catch (e) {
    next(ServerError(422, "Could not create product", e));
  }
});

router.put("/products/:id", async (req, res, next) => {
  try {
    await Product.query().patch(req.body).where("id", req.params.id);
    res.json({ success: true });
  } catch (e) {
    next(ServerError(422, "Could not update product", e));
  }
});

router.get("/images/uploads/endpoint", (req, res, next) => {
  try {
    const { filename } = req.query;
    const folder = "/cute-catalog";
    res.json(getImageUploadEndpointAndSignature({ filename, folder }));
  } catch (e) {
    next(ServerError(500, "Could not resolve image upload token", e));
  }
});

module.exports = router;
