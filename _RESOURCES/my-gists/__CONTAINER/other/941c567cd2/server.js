const express = require("express");
const next = require("next");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const keys = require("./config/keys");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const logger = require("./log");

const routes = require("../routes");
const handle = routes.getRequestHandler(app);

// Model
// const Person = require('./models/person');

// Servives
const authServices = require("./services/auth");

// Routing
const blogPostingRoutes = require("./routes/blogPosting");

const secretData = [
  {
    title: "a",
    description: "A",
  },
  {
    title: "b",
    description: "B",
  },
];

mongoose.connect(keys.DATABASE_URL, { useNewUrlParser: true }).then(
  () => {
    logger.info("Connected to DB.");
  },
  (err) => {
    logger.error("Something wrong when connect to DB. " + err);
  }
);

app
  .prepare()
  .then(() => {
    const server = express();

    // parse the body
    server.use(
      bodyParser.urlencoded({
        extended: true,
      })
    );

    // parse application/json
    server.use(bodyParser.json());

    server.get("/api/v1/secret", authServices.checkJwt, (req, res) => {
      return res.json(secretData);
    });

    server.get(
      "/api/v1/onlySiteOwner",
      authServices.checkJwt,
      authServices.checkRole("siteOwner"),
      (req, res) => {
        return res.json(secretData);
      }
    );

    // handling everything else with Next.js
    const version = "v1";

    // main route
    server.use(`/api/${version}/blogPostings`, blogPostingRoutes);

    server.get("*", (req, res) => {
      console.log("------- serving all the requests ------- ");
      return handle(req, res);
    });

    server.use((err, req, res, next) => {
      if (err.name === "UnauthorizedError") {
        res.status(401).send({ title: "Invalid token..." });
      } else if (err.output != null && err.output.statusCode != null) {
        return res.status(err.output.statusCode).send(err.output.payload);
      } else {
        return res.status(500).send("Something wrong. " + err);
      }
    });

    const PORT = process.env.PORT || 3000;

    server.use(handle).listen(PORT, (err) => {
      if (err) throw err;
      console.log("> Ready on port " + PORT);
    });
  })
  .catch((ex) => {
    console.error(ex.stack);
    process.exit(1);
  });
