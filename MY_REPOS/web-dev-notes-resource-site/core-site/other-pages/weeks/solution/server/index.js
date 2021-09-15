const bodyParser = require("body-parser");
const express = require("express");
const fs = require("fs").promises;
const path = require("path");
const querystring = require("querystring");

const usercode = path.resolve(__dirname, "..", "your-code");
const api = express();

api.use(bodyParser.json());
api.use("/api/entry", async (req, res) => {
  try {
    let destination = req.body.destination;
    const { url: absolutePath } = req;
    const relativePath = absolutePath.substr(1);
    const fromPath = querystring.unescape(path.resolve(browsed, relativePath));

    if (destination.startsWith("/")) {
      destination = destination.substring(1);
    }
    const toPath = path.resolve(browsed, destination, path.basename(fromPath));
    await fs.rename(fromPath, toPath);
    res.end();
  } catch (e) {
    console.error(e);
    res.statusCode = 500;
    return res.json(e);
  }
});

api.use("/api/file", async (req, res) => {
  const { url: absolutePath } = req;
  const relativePath = absolutePath.substr(1);
  const dirPath = querystring.unescape(path.resolve(browsed, relativePath));
  res.sendFile(dirPath);
});

api.use("/api/path", async (req, res) => {
  const { url: absolutePath } = req;
  const relativePath = absolutePath.substr(1);
  const dirPath = querystring.unescape(path.resolve(browsed, relativePath));
  try {
    const newEntries = [];
    const entries = await fs.readdir(dirPath, { withFileTypes: true });
    for (let entry of entries) {
      const o = {
        name: entry.name,
        type: entry.isDirectory()
          ? "directory"
          : entry.isFile()
          ? "file"
          : "other",
      };
      const stat = await fs.stat(path.join(dirPath, entry.name));
      const timeString = stat.mtime.toISOString();
      o.lastModifiedTime = timeString.substr(0, timeString.indexOf("T"));
      newEntries.push(o);
    }
    newEntries.sort((a, b) => {
      if (a.type === "directory" && b.type === "directory") {
        if (a.name < b.name) return -1;
        if (a.name > b.name) return 1;
        return 0;
      }
      if (a.type === "directory") return -1;
      if (b.type === "directory") return 1;
      if (a.name < b.name) return -1;
      if (a.name > b.name) return 1;
      return 0;
    });
    res.json(newEntries);
  } catch (error) {
    console.error(error);
    if (error.code === "ENOENT") {
      res.statusCode = 404;
      res.statusMessage = "Not Found";
      return res.json({ message: `${relativePath} Not Found` });
    }
    res.statusCode = 500;
    res.json({ message: error.message });
  }
});

api.use(express.static(usercode, { index: "browser.html" }));
api.use(async (req, res, next) => {
  if (req.url.startsWith("/icons/")) {
    const iconPath = path.resolve(usercode, req.url.substring(1));
    try {
      const access = await fs.access(iconPath);
      return res.sendFile(iconPath);
    } catch (e) {
      if (req.url.startsWith("/icons/file_")) {
        return res.sendFile(path.join(usercode, "icons", "default_file.svg"));
      } else if (
        req.url.startsWith("/icons/folder_") &&
        req.url.endsWith("opened.svg")
      ) {
        return res.sendFile(
          path.join(usercode, "icons", "default_folder_opened.svg")
        );
      } else if (req.url.startsWith("/icons/folder_")) {
        return res.sendFile(path.join(usercode, "icons", "default_folder.svg"));
      }
    }
  }
  next();
});
api.listen(3001, () => {
  console.log("Your browser.html and API served from http://localhost:3001");
});

const static = express();
const browsed = path.resolve(__dirname, "..", "directory-browsed");
static.set("view engine", "pug");
static.set("views", path.join(__dirname, "views"));
static.use(express.static(browsed, { index: false }));
static.use(async (req, res, next) => {
  const { url: absolutePath } = req;
  const relativePath = absolutePath.substr(1);
  const dirPath = querystring.unescape(path.resolve(browsed, relativePath));
  try {
    const entries = await fs.readdir(dirPath, { withFileTypes: true });
    const crumbs = relativePath
      .split("/")
      .filter((x) => x)
      .map((x) => querystring.unescape(x))
      .map((p, n, a) => {
        const crumbPath = [];
        for (let i = a.length - 1; i > n; i -= 1) {
          crumbPath.push("..");
        }
        return {
          relativePath: crumbPath.join("/"),
          name: p,
        };
      });
    res.render("template.pug", { crumbs, entries });
  } catch (error) {
    if (error.code === "ENOENT") {
      res.statusCode = 404;
      res.statusMessage = "Not Found";
      return res.render("error.pug", { error: `${relativePath} Not Found` });
    }
    res.statusCode = 500;
    res.render("error.pug", { error });
  }
});
static.listen(3000, () => {
  console.log("Browse the files statically at http://localhost:3000");
});
