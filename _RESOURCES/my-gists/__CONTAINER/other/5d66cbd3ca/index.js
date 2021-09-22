app.post("/api/image-upload", singleUploadCtrl, (req, res) => {
  try {
    if (!req.file) {
      throw new Error("Image is not presented!");
    }
    console.log(req.file);

    return res.json({ message: "Huraaaay" });
  } catch (e) {
    return res.status(422).send({ message: e.message });
  }
});
