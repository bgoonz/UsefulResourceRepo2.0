const multer = require("multer");
const multerS3 = require("multer-s3");
const aws = require("aws-sdk");

aws.config.update({
  // Your SECRET ACCESS KEY from AWS should go here,
  // Never share it!
  // Setup Env Variable, e.g: process.env.SECRET_ACCESS_KEY
  secretAccessKey: "ab7786ad6",
  // Not working key, Your ACCESS KEY ID from AWS should go here,
  // Never share it!
  // Setup Env Variable, e.g: process.env.ACCESS_KEY_ID
  accessKeyId: "ab7786ad6",
  region: "us-east-1", // region of your bucket
});

const s3 = new aws.S3();
