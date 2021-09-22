const express = require("express");
const router = express.Router();

const auth = require("../services/auth-service");
const BlogCtrl = require("../controllers/blog");

router.get("", BlogCtrl.getBlogs);

router.get("/me", auth.checkJwt, auth.checkSuperAdmin, BlogCtrl.getUserBlogs);

router.get("/:slug", BlogCtrl.getBlogBySlug);

router.get(
  "/me/:id",
  auth.checkJwt,
  auth.checkSuperAdmin,
  BlogCtrl.getBlogById
);

router.post("/new", auth.checkJwt, auth.checkSuperAdmin, BlogCtrl.saveBlog);

router.patch("/:id", auth.checkJwt, auth.checkSuperAdmin, BlogCtrl.updateBlog);

router.delete("/:id", auth.checkJwt, auth.checkSuperAdmin, BlogCtrl.deleteBlog);

module.exports = router;
