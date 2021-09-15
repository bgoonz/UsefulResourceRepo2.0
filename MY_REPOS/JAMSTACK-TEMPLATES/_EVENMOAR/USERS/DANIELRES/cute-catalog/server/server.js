require("./helpers/env/init");
require("./db/init");

const cookieParser = require("cookie-parser");
const express = require("express");
const helmet = require("helmet");
const logger = require("morgan");
const path = require("path");

const ensureAdmin = require("./middleware/ensureAdmin");
const maybeForceHttps = require("./middleware/maybeForceHttps");
const verifyToken = require("./middleware/verifyToken");

const app = express();
app.use(cookieParser());
app.use(helmet());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(maybeForceHttps);

app.use(express.static(path.join(__dirname, "..", "build/")));

app.use("/api/login", require("./routes/login"));
app.use("/api/logout", require("./routes/logout"));
app.use("/api/products", require("./routes/products"));
app.use("/api/users", verifyToken, require("./routes/users"));

app.use("/api/admin", verifyToken, ensureAdmin, require("./routes/admin"));

// eslint-disable-next-line no-unused-vars
app.use((error, req, res, next) => {
  res
    .status(error.code || res.statusCode || 500)
    .json({ error: error.message });
});

if (process.env.SERVE_STATIC_FRONTEND === "true")
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "..", "build", "index.html"));
  });

module.exports = app;
