const next = require("next");
const express = require("express");
const routes = require("../routes");

//service
const authService = require("./services/auth");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = routes.getRequestHandler(app);

const secretData = { title: "Secret" };

app
  .prepare()
  .then(() => {
    const server = express();

    server.get("/api/v1/secret", (req, res) => {
      return res.json(secretData);
    });

    server.get("*", (req, res) => {
      return handle;
    });

    server.use(function (err, req, res, next) {
      if (err.name === "UnauthorizedError") {
        res.status(401).send("invalid token...");
      }
    });

    server.use(handle).listen(3000, (err) => {
      if (err) throw err;
      console.log("> Ready on http://localhost:${port}");
    });
  })
  .catch((ex) => {
    console.error(ex.stack);
    process.exit(1);
  });

// const next = require("next");
// const http = require("http");
// const routes = require("../routes");

// const dev = process.env.NODE_ENV !== "production";
// const app = next({ dev });
// const handleNextRequests = app.getRequestHandler();

// app.prepare().then(() => {
//   const server = new http.Server((req, res) => {
//     // Add assetPrefix support based on the hostname
//     if (req.headers.host === "my-app.com") {
//       app.setAssetPrefix("http://localhost:3000");
//     } else {
//       app.setAssetPrefix("");
//     }
//     server.getConnections("api/v1/secret", (req, res) => {
//       return res.send("yilm");
//     });
//     handleNextRequests(req, res);
//   });

//   server.listen(port, err => {
//     if (err) {
//       throw err;
//     }
//     console.log(`> Ready on http://localhost:${port}`);
//   });
// });
