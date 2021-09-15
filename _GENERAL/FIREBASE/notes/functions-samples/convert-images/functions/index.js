"use strict";

const functions = require("firebase-functions");
const admin = require("firebase-admin");
const mkdirp = require("mkdirp");
const spawn = require("child-process-promise").spawn;
const path = require("path");
const os = require("os");
const fs = require("fs");

admin.initializeApp();

// File extension for the created JPEG files.
const JPEG_EXTENSION = ".jpg";

/**
 * When an image is uploaded in the Storage bucket it is converted to JPEG automatically using
 * ImageMagick.
 */
exports.imageToJPG = functions.storage.object().onFinalize(async (object) => {
  const filePath = object.name;
  const baseFileName = path.basename(filePath, path.extname(filePath));
  const fileDir = path.dirname(filePath);
  const JPEGFilePath = path.normalize(
    path.format({ dir: fileDir, name: baseFileName, ext: JPEG_EXTENSION })
  );
  const tempLocalFile = path.join(os.tmpdir(), filePath);
  const tempLocalDir = path.dirname(tempLocalFile);
  const tempLocalJPEGFile = path.join(os.tmpdir(), JPEGFilePath);

  // Exit if this is triggered on a file that is not an image.
  if (!object.contentType.startsWith("image/")) {
    functions.logger.log("This is not an image.");
    return null;
  }

  // Exit if the image is already a JPEG.
  if (object.contentType.startsWith("image/jpeg")) {
    functions.logger.log("Already a JPEG.");
    return null;
  }

  const bucket = admin.storage().bucket(object.bucket);
  // Create the temp directory where the storage file will be downloaded.
  await mkdirp(tempLocalDir);
  // Download file from bucket.
  await bucket.file(filePath).download({ destination: tempLocalFile });
  functions.logger.log("The file has been downloaded to", tempLocalFile);
  // Convert the image to JPEG using ImageMagick.
  await spawn("convert", [tempLocalFile, tempLocalJPEGFile]);
  functions.logger.log("JPEG image created at", tempLocalJPEGFile);
  // Uploading the JPEG image.
  await bucket.upload(tempLocalJPEGFile, { destination: JPEGFilePath });
  functions.logger.log("JPEG image uploaded to Storage at", JPEGFilePath);
  // Once the image has been converted delete the local files to free up disk space.
  fs.unlinkSync(tempLocalJPEGFile);
  fs.unlinkSync(tempLocalFile);
  return null;
});
