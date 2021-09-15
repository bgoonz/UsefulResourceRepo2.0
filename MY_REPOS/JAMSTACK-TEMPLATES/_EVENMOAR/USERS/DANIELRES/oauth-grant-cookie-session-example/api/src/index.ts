import express, { Express } from "express";
import config from "./config";
import middlewares from "./middlewares";
import Layout from "./templates/Layout";
import SessionInfo from "./templates/SessionInfo";

const { PORT } = config;

const app: Express = express();

app.use(...middlewares);

app.get("/", (req, res) => {
  res.send(Layout("Home", `Hello world!`, req.session));
});

app.get("/login", (req, res) => {
  res.send(
    Layout(
      "Login",
      `<a href="/connect/google">Continue with Google</a>`,
      req.session
    )
  );
});

app.get("/logout", (req, res) => {
  req.session = null;
  res.redirect("/");
});

app.get("/profile", (req, res) => {
  res.send(Layout("Profile", SessionInfo(req.session), req.session));
});

app.listen(PORT, () => {
  console.log(`Server ready on http://localhost:${PORT}`);
});
