const cloudinary = require("cloudinary").v2;
require("dotenv").config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
});

function uploadImage(path) {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(
      path,
      { width: 400, height: 300, crop: "fill" },
      (err, res) => {
        if (err) reject(err);
        resolve(res);
      }
    );
  });
}

module.exports = { uploadImage };
