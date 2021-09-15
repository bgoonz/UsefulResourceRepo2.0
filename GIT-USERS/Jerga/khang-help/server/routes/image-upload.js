const express = require("express");
const router = express.Router();
const User = require("../controller/user-controller");
const ImageController = require("../controller/image-upload-controller");

router.post("/image-upload", User.authMiddleware, ImageController.post);

module.exports = router;
