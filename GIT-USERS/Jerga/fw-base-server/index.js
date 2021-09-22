const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const Resource = require("./db/models/resource");

app.use(bodyParser.json());

app.get("/api/test", (req, res) => {
  res.json({ message: "Hello World!" });
});

app.get("/api/resources", async (req, res) => {
  const resources = await Resource.getAll();
  return res.json(resources);
});

app.get("/api/resources/s/:searched", async (req, res) => {
  const { searched } = req.params;

  if (!searched) {
    const resources = await Resource.getAll();
    return res.json(resources);
  }

  const resources = await Resource.search({ title: searched.toLowerCase() });
  return res.json(resources);
});

app.get("/api/resources/:id", async (req, res) => {
  const { id } = req.params;
  const resource = await Resource.findOne({ _id: id });
  return res.json(resource);
});

app.post("/api/resources", async (req, res) => {
  const { body } = req;
  const newResource = new Resource(body);
  await newResource.save();
  return res.json(newResource);
});

app.patch("/api/resources/:id", async (req, res) => {
  const { body } = req;
  const { id } = req.params;
  try {
    const updatedResource = await Resource.findOneAndUpdate(id, body);
    return res.json(updatedResource);
  } catch (e) {
    return res.status(422).send(e.message);
  }
});

app.delete("/api/resources/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const resource = await Resource.findOne({ _id: id });
    await resource.remove();
    return res.json({ _id: resource._id });
  } catch (e) {
    return res.status(422).send(e.message);
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`> Connected to ${PORT}`));
