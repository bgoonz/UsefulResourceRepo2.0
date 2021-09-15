const path = require("path");
const DatauriParser = require("datauri/parser");
const parser = new DatauriParser();

const formatBufferTo64 = (file) =>
  parser.format(path.extname(file.originalname).toString(), file.buffer);

app.post("/api/image-upload", singleUploadCtrl, (req, res) => {
  try {
    if (!req.file) {
      throw new Error("Image is not presented!");
    }
    const file64 = formatBufferTo64(req.file);

    return res.json({ message: "Hurraaay" });
  } catch (e) {
    return res.status(422).send({ message: e.message });
  }
});
