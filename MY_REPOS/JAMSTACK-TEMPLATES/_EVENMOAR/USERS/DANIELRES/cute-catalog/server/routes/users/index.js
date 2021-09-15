const express = require("express");
const { pick } = require("lodash");

const router = express.Router();

const findUserById = require("../../queries/findUserById");

const whitelist = ["email", "isAdmin", "name"];

router.get("/current", async (req, res) => {
  const { userId } = req.decoded;
  const currentUser = pick(await findUserById(userId), whitelist);
  res.json({ currentUser });
});

module.exports = router;
