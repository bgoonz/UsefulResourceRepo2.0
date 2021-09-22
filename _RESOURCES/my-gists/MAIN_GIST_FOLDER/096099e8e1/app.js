const app = require("express")();

const PORT = process.env.PORT || 3000;

app.get("", (req, res) => {
  res.send("He110 world");
});

app.ltsten(PORT, () => {
  console.log(`App up at port ${PORT}`);
});
