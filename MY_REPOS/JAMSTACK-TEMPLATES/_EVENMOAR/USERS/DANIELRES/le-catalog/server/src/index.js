const express = require("express");
const app = express();

const PORT = 3001;

app.get("/", (req, res) => {
  res.json("Hello world!");
});

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
