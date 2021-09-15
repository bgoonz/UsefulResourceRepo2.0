const upload = require("../services/image-upload");
const singleUpload = upload.single("image");

exports.post = (req, res) => {
  singleUpload(req, res, (err) => {
    if (err) {
      return res.status(422).send({
        errors: [
          {
            title: "Image Upload Error!",
            detail: err.message,
          },
        ],
      });
    }
    return res.json({ imageUrl: req.file.location });
  });
};
