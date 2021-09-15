const express = require("express");
const routes = require("./routes");

// Create the Express app.
const app = express();

// Set the pug view engine.
app.set("view engine", "pug");

// Define routes.

app.get("/", (req, res) => {
  res.send("Hello from Express!");
});

app.get("/*xyz", (req, res) => {
  res.send("That's all I wrote.");
});

app.get("/capital-letters/:letters", (req, res) => {
  res.send(req.params.letters.toUpperCase());
});

app.use("/margot", routes);
app.use("/margeaux", routes);

app.all(/^\/[A-Za-z0-9\-_]*$/, (req, res) => {
  const randomNumber = Math.floor(Math.random() * 100);

  res.render("index", { method: req.method, path: req.path, randomNumber });
});

// Define a port and start listening for connections.

const port = 8081;

app.listen(port, () => console.log(`Listening on port ${port}...`));
