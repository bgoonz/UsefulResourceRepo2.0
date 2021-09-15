const ImageKit = require("imagekit");

const imagekit = new ImageKit({
  imagekitId: process.env.IMAGEKIT_ID,
  apiKey: process.env.IMAGEKIT_API_KEY,
  apiSecret: process.env.IMAGEKIT_API_SECRET,
});

module.exports = imagekit;
