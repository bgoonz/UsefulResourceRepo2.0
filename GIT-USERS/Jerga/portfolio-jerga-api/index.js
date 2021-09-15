const express = require("express");
const server = express();
const bodyParser = require("body-parser");

async function runServer() {
  await require("./db").connect();

  server.use(bodyParser.json());
  server.use("/api/v1/portfolios", require("./routes/portfolios"));
  server.use("/api/v1/blogs", require("./routes/blogs"));

  server.get("/test", (req, res) => {
    res.json({ message: "Hello World" });
  });

  server.get("", (req, res) => {
    res.sendFile("index.html", { root: __dirname });
  });

  const PORT = parseInt(process.env.PORT, 10) || 3001;
  server.listen(PORT, (err) => {
    if (err) console.error(err);
    console.log("Server ready on port:", PORT);
  });
}

runServer();
