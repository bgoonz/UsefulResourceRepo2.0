const crypto = require("crypto");

const { IMAGEKIT_API_KEY, IMAGEKIT_API_SECRET, IMAGEKIT_ID } = process.env;
const IMAGEKIT_API_URL =
  "https://upload.imagekit.io/rest/api/image/" + IMAGEKIT_ID;

const calculateSignature = (options) => {
  const message = [
    {
      key: "filename",
      value: options.filename,
    },
    {
      key: "timestamp",
      value: options.timestamp,
    },
    {
      key: "apiKey",
      value: options.apiKey,
    },
  ].sort((a, b) => a.key > b.key);

  const messageStr = message.map((i) => `${i.key}=${i.value}`).join("&");

  return crypto
    .createHmac("sha1", options.apiSecret)
    .update(messageStr)
    .digest("hex");
};

const getImageUploadEndpointAndSignature = (options) => {
  const merged = {
    apiKey: IMAGEKIT_API_KEY,
    apiSecret: IMAGEKIT_API_SECRET,
    folder: options.folder || "/uploads",
    imagekitId: IMAGEKIT_ID,
    useSecure: false,
    useSubdomain: false,
    useUniqueFilename: false,
    ...options,
    timestamp: parseInt(Date.now() / 1000, 10),
  };

  return {
    apiKey: merged.apiKey,
    endpoint: IMAGEKIT_API_URL,
    signature: calculateSignature(merged),
  };
};

module.exports = getImageUploadEndpointAndSignature;
