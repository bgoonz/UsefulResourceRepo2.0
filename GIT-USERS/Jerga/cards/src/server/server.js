import express from "express";
import http from "http";
import { isDevelopment } from "./settings";

//-------------
//Setup
const app = express();
const server = new http.Server(app);

// --------------
// Configuration
app.set("view engine", "pug");
app.use(express.static("public"));

const useExternalStyles = !isDevelopment;
const scriptRoot = isDevelopment ? "http://localhost:8080/build" : "/build";

app.get("*", (req, res) => {
  res.render("index", {
    useExternalStyles,
    scriptRoot,
  });
});

// --------------
// Startup
const port = process.env.PORT || 3000;

server.listen(port, () => {
  console.log(`Started http server on port ${port}`);
});
