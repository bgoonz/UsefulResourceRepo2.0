const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "Your cloud name",
  api_key: "your api key",
  api_secret: "your secret keu",
});

const cloudinaryUpload = (file) => cloudinary.uploader.upload(file);

app.post("/api/image-upload", singleUploadCtrl, async (req, res) => {
  try {
    if (!req.file) {
      throw new Error("Image is not presented!");
    }
    const file64 = formatBufferTo64(req.file);
    const uploadResult = await cloudinaryUpload(file64.content);

    return res.json({
      cloudinaryId: uploadResult.public_id,
      url: uploadResult.secure_url,
    });
  } catch (e) {
    return res.status(422).send({ message: e.message });
  }
});
