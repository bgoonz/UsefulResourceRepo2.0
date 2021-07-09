import bodyParser from "body-parser";
import api from "./api";

export default (app) => {
  app.use(bodyParser.json());

  app.get("/api/category/list", async (req, res) => {
    const models = await api.category.list();
    res.json(models);
  });

  app.get("/api/post/list", async (req, res) => {
    const models = await api.post.list();
    res.json(models);
  });

  app.get("/api/post/list/:categoryId", async (req, res) => {
    const categoryId = req.params.categoryId;
    const models = await api.post.list(categoryId);
    res.json(models);
  });

  app.post("/api/post/save", async (req, res) => {
    await api.post.save(req.body);
    res.json({ success: true });
  });

  app.post("/api/post/vote/:postId", async (req, res) => {
    await api.post.vote(req.body.postId);
    res.json({ success: true });
  });

  app.post("/api/post/delete", async (req, res) => {
    await api.post.delete(req.body._id);
    res.json({ success: true });
  });

  app.get("/api/comment/list/:postId", async (req, res) => {
    const postId = req.params.postId;
    const models = await api.comment.list(postId);
    res.json(models);
  });

  app.post("/api/comment/save", async (req, res) => {
    await api.comment.save(req.body);
    res.json({ success: true });
  });

  app.post("/api/comment/delete", async (req, res) => {
    await api.comment.delete(req.body._id);
    res.json({ success: true });
  });

  // MISC:
  app.get("/api/category/regenerate", async (req, res) => {
    await api.category.regenerate();
    res.json({ success: true });
  });
};
