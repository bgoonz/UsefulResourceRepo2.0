app.get("/api/images", async (req, res) => {
  const images = await CImage.getAll();
  return res.json(images);
});
