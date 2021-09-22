app.post("/api/image-upload", (req, res) => {
  try {
    if (!req.file) {
      throw new Error("Image is not presented!");
    }

    return res.json({ message: "Huraaaay" });
  } catch (e) {
    return res.status(422).send({ message: e.message });
  }
});
