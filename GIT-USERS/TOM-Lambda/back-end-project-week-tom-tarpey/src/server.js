const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const mainRoutes = require("./api/mainRoutes");
require("dotenv").config();

// instantiate the express server
const server = express();

// use directives
server.use(express.json());
server.use(cors());
server.use(morgan("dev"));

// use routes
server.use("/api", mainRoutes);

const port = process.env.PORT || 8800;
const instance = server.listen(port, () =>
  console.log(`\n=== Server running on port: ${instance.address().port} ===\n`)
);
