const express = require("express");
const serveStatic = require("serve-static");
const path = require("path");

const app = express();

app.use(serveStatic("build"));

app.get("*", (req, res) => {
  return res.sendFile(path.resolve("build", "index.html"));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
