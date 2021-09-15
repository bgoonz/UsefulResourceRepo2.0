"use strict";
{
  let b64o, words;
  try {
    b64o = require("./b64order.js");
    words = require("./words.js");
  } catch (e) {
    b64o = self.b64order;
    words = self.words;
  }

  try {
    Object.assign(self, { fromWords });
  } catch (e) {
    module.exports = fromWords;
  }

  function fromWords(glyph_str) {
    const glyphs = glyph_str.split(" ").filter((glyph) => glyph.trim().length);
    const codes = glyphs.map((glyph) => words.codes[glyph]);
    const bigrams = codes.map((code) => b64o.itoa(code));
    const result = bigrams.join("");
    return result;
  }
}
