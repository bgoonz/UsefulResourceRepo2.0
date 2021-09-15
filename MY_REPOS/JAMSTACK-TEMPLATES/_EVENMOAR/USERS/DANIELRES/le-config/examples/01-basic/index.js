import express from "express";
import config from "./config";

const { PORT } = config;

const app = express();

app.get("/", (req, res) => res.send("Hello world!"));

app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
});
