const CImage = require("./db/image");

app.post("/api/image-upload", singleUploadCtrl, async (req, res) => {
  try {
    if (!req.file) {
      throw new Error("Image is not presented!");
    }
    const file64 = formatBufferTo64(req.file);
    const uploadResult = await cloudinaryUpload(file64.content);

    // You can use here your own DB Solution
    const cImage = new CImage({
      cloudinaryId: uploadResult.public_id,
      url: uploadResult.secure_url,
    });
    await cImage.save();
    // ----------

    return res.json(cImage);
  } catch (e) {
    return res.status(422).send({ message: e.message });
  }
});
