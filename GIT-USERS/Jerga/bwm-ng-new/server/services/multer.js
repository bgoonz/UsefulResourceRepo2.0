const multer = require("multer");

// disc storage - to folder, saving them
// memory storage - in memory, in buffer

const ALLOWED_FORMAT = ["image/jpeg", "image/png", "image/jpg"];

const storage = multer.memoryStorage();
const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    if (ALLOWED_FORMAT.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Not supported file format!"), false);
    }
  },
});

module.exports = upload;
