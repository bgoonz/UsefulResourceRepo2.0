#!/usr/bin/env node

const express = require("express");
const { simpleParser } = require("mailparser");
const { SMTPServer } = require("smtp-server");

const templates = require("./templates");

let mailbox = {};

const PORT = process.env.DEV_SMTP_PORT || 2500;
const API_PORT = process.env.DEV_SMTP_API_PORT || 2501;

const app = express();

const filterByTo = (to, mailbox) =>
  Object.entries(mailbox)
    .filter(([k, v]) => v.to.value.filter((v) => v.address === to).length > 0)
    .map(([k, v]) => ({ id: k, ...v }));

const smtp = new SMTPServer({
  disabledCommands: ["STARTTLS"],
  onAuth(auth, session, callback) {
    // if (auth.username !== "username" || auth.password !== "password")
    //   return callback(new Error("Invalid username or password"));
    callback(null, { user: "dummyUser" }); // using a dummy user to simulate auth success
  },
  logger: true,
  onData(stream, session, callback) {
    let result = "";
    stream.on("data", (chunk) => (result += chunk));
    stream.on("end", () => {
      simpleParser(result, {}, (err, parsed) => {
        mailbox[parsed.messageId] = parsed;
        callback();
      });
    });
  },
});

app.get("/", (req, res) => {
  const messages = Object.values(mailbox).reverse();
  res.send(templates.home({ messages }));
});

app.get("/to/:to", (req, res) => {
  console.log(JSON.stringify(mailbox, null, 2));
  const { to } = req.params;
  res.json(filterByTo(to, mailbox).reverse());
});

app.get("/:messageId", (req, res) => {
  res.json(mailbox[req.params.messageId]);
});

app.get("/:messageId/:field", (req, res) => {
  const { field, messageId } = req.params;
  res.send(mailbox[messageId][field]);
});

smtp.on("error", (err) => {
  console.error("Error %s", err.message);
});

smtp.listen(PORT);

app.listen(API_PORT, () => {
  console.log(`[SMTP-devServer] api listening on http://localhost:${API_PORT}`);
});
