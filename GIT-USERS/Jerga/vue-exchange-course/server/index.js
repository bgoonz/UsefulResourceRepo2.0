const express = require("express");
const serveStatic = require("serve-static");
const path = require("path");

const app = express();
const appPath = path.join(__dirname, "..", "dist");

app.use(serveStatic(appPath));

app.get("*", (req, res) => {
  return res.sendFile(path.resolve(appPath, "index.html"));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
