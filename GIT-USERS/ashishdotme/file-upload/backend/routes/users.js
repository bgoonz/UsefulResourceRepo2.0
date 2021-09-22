const express = require("express");
const router = express.Router();
const passport = require("passport");
const jwt = require("jsonwebtoken");
const config = require("../config/database");

const User = require("../models/user");
const File = require("../models/file");
const mongojs = require("mongojs");
const ObjectId = require("mongoose").Types.ObjectId;
const mongoose = require("mongoose");
// const fs = require('fs');

let Grid = require("gridfs-stream");
let conn = mongoose.connection;
Grid.mongo = mongoose.mongo;
let gfs;

conn.on("connected", () => {
  gfs = Grid(conn.db);
});

router.post("/register", (req, res, next) => {
  let newUser = new User({
    name: req.body.name,
    email: req.body.email,
    username: req.body.username,
    password: req.body.password,
    timezone: req.body.timezone,
  });

  User.addUser(newUser, (err, user) => {
    if (err) {
      res.json({
        success: false,
        msg: "Failed to register user",
      });
    } else {
      res.json({
        success: true,
        msg: "User registered",
      });
    }
  });
});

router.post("/authenticate", (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  User.getUserByEmail(email, (err, user) => {
    if (err) throw err;
    if (!user) {
      return res.json({
        success: false,
        msg: "User not found",
      });
    }

    User.comparePassword(password, user.password, (err, isMatch) => {
      if (err) throw err;
      if (isMatch) {
        const token = jwt.sign(
          {
            data: user,
          },
          config.secret,
          {
            expiresIn: 604800,
          }
        );

        res.json({
          success: true,
          token: "Bearer " + token,
          user: {
            id: user._id,
            name: user.name,
            username: user.username,
            email: user.email,
            timezone: user.timezone,
          },
        });
      } else {
        return res.json({
          success: false,
          msg: "Wrong password",
        });
      }
    });
  });
});

router.post("/img", (req, res) => {
  const txt = req.body.txt;
  const part = req.files.file;
  let writeStream = gfs.createWriteStream({
    filename: "img_" + part.name,
    mode: "w",
    content_type: part.mimetype,
  });

  writeStream.on("close", (file) => {
    if (!file) {
      res.status(400).send("No file received");
    }
    let newFile = new File({
      txt: txt,
      file: file,
    });
    newFile.save((err) => {
      if (err) {
        return res.json({
          success: false,
          msg: err,
        });
      } else {
        res.json({
          success: true,
          msg: "Successfully added new file.",
          newFile,
        });
      }
    });
  });
  writeStream.write(part.data, () => {
    writeStream.end();
  });
});

module.exports = router;
