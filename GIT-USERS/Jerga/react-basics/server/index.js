const express = require("express");
const serveStatic = require("serve-static");
const path = require("path");
const bodyParser = require("body-parser");
const Resource = require("./db/models/resource");

const app = express();

app.use(serveStatic("build"));
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
  try {
    const resource = await Resource.findOne({ _id: id });
    return res.json(resource);
  } catch (e) {
    return res.status(422).send(e.message);
  }
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

app.get("*", (req, res) => {
  return res.sendFile(path.resolve("build", "index.html"));
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server is listening on port: ${PORT}`));
