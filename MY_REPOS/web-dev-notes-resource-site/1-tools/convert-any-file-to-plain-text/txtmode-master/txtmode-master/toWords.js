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
    Object.assign(self, { toWords });
  } catch (e) {
    module.exports = toWords;
  }

  function toWords(b64s) {
    b64s = b64s.replace(/=/g, "");
    const result = [];
    const bigrams = b64s
      .split("")
      .reduce(
        (bgs, c, i) => (
          i % 2 ? bgs.push((bgs.pop() || "") + c) : bgs.push(c), bgs
        ),
        []
      );
    for (const bigram of bigrams) {
      const code = b64o.atoi(bigram);
      const word = words.glyphs[code];
      result.push(word);
    }
    return result.join(" ");
  }
}
