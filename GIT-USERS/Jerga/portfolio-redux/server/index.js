const express = require("express");
const next = require("next");
const config = require("./config");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");

const routes = require("../routes");

const robotsOptions = {
  root: path.join(__dirname, "../static"),
  headers: {
    "Content-Type": "text/plain;charset=UTF-8",
  },
};

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
// const handle = app.getRequestHandler()

const handle = routes.getRequestHandler(app);

// ROUTES
const portfolioRoutes = require("./routes/portfolio");
const blogRoutes = require("./routes/blog");

// CONNECT TO DB
mongoose.connect(config.DB_URI, { useNewUrlParser: true }).then(() => {
  if (!dev) {
    // const fakeDb = new FakeDb();
    // fakeDb.seedDb();
  }
});

app
  .prepare()
  .then(() => {
    const server = express();

    server.get("/jerga_cv.pdf", (req, res) =>
      res.status(200).sendFile("jerga_cv.pdf", robotsOptions)
    );

    server.get("/robots.txt", (req, res) =>
      res.status(200).sendFile("robots.txt", robotsOptions)
    );

    // MIDDLEWARES
    server.use(bodyParser.json());
    server.use("/api/v1/portfolios", portfolioRoutes);
    server.use("/api/v1/blogs", blogRoutes);

    server.get("*", (req, res) => {
      return handle(req, res);
    });

    const PORT = process.env.PORT || 3000;

    server.use(handle).listen(PORT, (err) => {
      if (err) throw err;
      console.log(`> Ready on http://localhost:${PORT}`);
    });
  })
  .catch((ex) => {
    console.error(ex.stack);
    process.exit(1);
  });
