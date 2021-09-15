import bodyParser from "body-parser";
import express from "express";

import path from "path";

import { addMember } from "./commands/addMember";
import {
  findLogItemById,
  findMemberBySlug,
  getLogItems,
  getMembers,
} from "./queries/queries";
import randomMemberFactory from "./factories/randomMemberFactory";

const app = express();
const PORT = 3001;
const { ASSETS_MODE } = process.env;

app.use(bodyParser.json());

app.get("/api/log", async (req, res, next) => {
  try {
    res.json(await getLogItems());
  } catch (error) {
    console.error(error);
  }
});

app.get("/api/log/:id", async (req, res, next) => {
  try {
    const item = await findLogItemById(req.params.id);
    res.json(item);
  } catch (error) {
    console.error(error);
  }
});

app.get("/api/members", async (req, res, next) => {
  try {
    res.json(await getMembers());
  } catch (error) {
    console.error(error);
  }
});

app.post("/api/members", async (req, res, next) => {
  try {
    await addMember(req.body);
    res.status(201);
    res.json(req.body);
  } catch (error) {
    console.error(error);
  }
});

app.get("/api/members/:slug", async (req, res, next) => {
  try {
    const member = await findMemberBySlug(req.params.slug);
    res.json(member);
  } catch (error) {
    console.error(error);
  }
});

if (ASSETS_MODE === "static") {
  // Serve static assets
  app.use(express.static(path.resolve(__dirname, ".", "build")));

  // Always return the main index.html, so react-router render the route in the client
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, ".", "build", "index.html"));
  });
}

console.log("running server on port " + PORT);
export default app.listen(PORT);
