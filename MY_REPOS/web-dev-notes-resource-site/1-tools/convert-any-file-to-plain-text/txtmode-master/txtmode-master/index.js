"use strict";
{
  const exp = require("express");
  const app = exp();
  const port = process.env.PORT || 8080;
  app.use("/", exp.static("./"));
  const server = app.listen(
    port,
    () => `Server up at @{new Date()} on port ${port}`
  );
}
