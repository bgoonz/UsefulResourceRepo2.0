const express = require("express");
const app = express();
const bodyParser = require("body-parser");

const fs = require("fs");
const path = require("path");
const filePath = "../../store/initial_data.json";
const initialData = require(filePath);

app.use(bodyParser.json());

app.get("/posts", function (req, res) {
  return res.json(initialData.posts);
});

app.post("/posts", function (req, res) {
  const post = req.body;
  initialData.posts.push(post);

  fs.writeFile(
    path.join(__dirname, filePath),
    JSON.stringify(initialData, null, 2),
    function (err) {
      if (err) {
        return res.status(422).send(err);
      }

      return res.json("File Sucesfully updated");
    }
  );
});

app.patch("/posts/:id", function (req, res) {
  const id = req.params.id;
  const post = req.body;
  const index = initialData.posts.findIndex((p) => p._id === post._id);
  initialData.posts[index] = post;

  if (index !== -1) {
    fs.writeFile(
      path.join(__dirname, filePath),
      JSON.stringify(initialData, null, 2),
      function (err) {
        if (err) {
          return res.status(422).send(err);
        }

        return res.json("File Sucesfully Updated");
      }
    );
  } else {
    return res.status(422).send({ error: "Post cannot be updated!" });
  }
});

//
app.delete("/posts/:id", function (req, res) {
  const id = req.params.id;
  const index = initialData.posts.findIndex((p) => p._id === id);

  if (index !== -1) {
    initialData.posts.splice(index, 1);

    fs.writeFile(
      path.join(__dirname, filePath),
      JSON.stringify(initialData, null, 2),
      function (err) {
        if (err) {
          return res.status(422).send(err);
        }

        return res.json({ message: "File Sucesfully Updated" });
      }
    );
  } else {
    return res.status(422).send({ error: "Post cannot be updated!" });
  }
});

module.exports = {
  path: "/api",
  handler: app,
};
