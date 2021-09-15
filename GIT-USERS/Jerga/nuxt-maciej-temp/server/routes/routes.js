const fs = require("fs");
const path = require("path");
const express = require("express");
const app = express();

const filePath = `../../store/initial_data.json`;
const initialData = require(filePath);

app.get("/", (req, res) => {
  return res.json(initialData.posts);
});

app.post("/", (req, res) => {
  const post = req.body;
  initialData.posts.push(post);

  fs.writeFile(
    path.join(__dirname, filePath),
    JSON.stringify(initialData, null, 2),
    (err) => {
      if (err) {
        return res.status(422).send(err);
      }
      return res.json({
        status: "Success",
        message: "File succesfully updated!",
      });
    }
  );
});

app.patch("/:id", (req, res) => {
  const id = req.params.id;
  const post = req.body;
  const index = initialData.posts.findIndex((p) => p._id === id);
  if (index !== -1) {
    initialData.posts[index] = post;
    fs.writeFile(
      path.join(__dirname, filePath),
      JSON.stringify(initialData, null, 2),
      (err) => {
        if (err) {
          return res.status(422).send(err);
        }
        return res.json({
          status: "Success",
          message: "Post succesfully updated!",
        });
      }
    );
  } else {
    return res.status(422).send({ error: "Post could not be uptated!" });
  }
});

app.delete("/:id", (req, res) => {
  const id = req.params.id;
  // const post = req.body;
  const index = initialData.posts.findIndex((p) => p._id === id);
  if (index !== -1) {
    initialData.posts.splice(index, 1);
    fs.writeFile(
      path.join(__dirname, filePath),
      JSON.stringify(initialData, null, 2),
      (err) => {
        if (err) {
          return res.status(422).send(err);
        }
        return res.json({
          status: "Success",
          message: "Post succesfully deleted!",
        });
      }
    );
  } else {
    return res.status(422).send({ error: "Post could not be deleted!" });
  }
});

module.exports = {
  path: "/api/posts",
  handler: app,
};
