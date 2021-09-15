const express = require("express");
const router = express.Router();
const asyncHandler = require("../utils/asyncHandler");
const mongoose = require("mongoose");
const LanguageModels = require("../models/LanguageModels");
const supportedLanguages = require("../supportedLanguages");

mongoose.connect(process.env.REMOTE_DB_URL, {
  useUnifiedTopology: true,
});

//redirect generic queries to English results
router.get("/", (req, res) => {
  return res.redirect("/en");
});

router.get("/:id(\\d+)", (req, res) => {
  const id = parseInt(req.params.id);
  return res.redirect(`/en/${id}`);
});

router.get(
  "/:lang",
  asyncHandler(async (req, res) => {
    const lang = req.params.lang;
    try {
      const langIdx = supportedLanguages.indexOf(lang);
      if (langIdx < 0) throw new Error("Language not supported");

      const questions = await LanguageModels[langIdx].find({});
      questions.sort((a, b) => a.id - b.id);
      res.send({ questions });
    } catch (err) {
      console.error(err);
      res.status(404).send({
        error: `Language identifier '${lang}' is not supported.`,
        status: 404,
      });
    }
  })
);
router.get(
  "/:lang/:id(\\d+)",
  asyncHandler(async (req, res) => {
    const lang = req.params.lang;
    const id = parseInt(req.params.id);
    try {
      const langIdx = supportedLanguages.indexOf(lang);
      if (langIdx < 0)
        return res.status(404).send({
          error: `Language identifier '${lang}' is not supported.`,
          status: 404,
        });

      const question = await LanguageModels[langIdx].findOne({ id });

      if (question) return res.send({ question });
      else {
        return res.status(404).send({
          error: `The requested resource ID ${id} could not be found.`,
          status: 404,
        });
      }
    } catch (err) {
      console.error(err);
      res
        .status(500)
        .send({ error: "An unexpected server error occurred.", status: 500 });
    }
  })
);

module.exports = router;
