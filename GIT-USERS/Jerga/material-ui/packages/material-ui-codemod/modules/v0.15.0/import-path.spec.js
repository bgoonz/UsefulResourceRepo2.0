/* eslint-env mocha */

import fs from "fs";
import path from "path";
import { assert } from "chai";
import jscodeshift from "jscodeshift";
import transform from "./import-path";

function trim(str) {
  return str.replace(/^\s+|\s+$/, "");
}

function read(fileName) {
  return fs.readFileSync(path.join(__dirname, fileName), "utf8").toString();
}

describe("material-ui-codemod", () => {
  describe("v0.15.0", () => {
    describe("import-path", () => {
      it("convert path as needed", () => {
        const actual = transform(
          {
            source: read("./import-path.spec/actual.js"),
          },
          {
            jscodeshift: jscodeshift,
          }
        );

        const expected = read("./import-path.spec/expected.js");

        assert.strictEqual(
          trim(actual),
          trim(expected),
          "The transformed version should be correct"
        );
      });
    });
  });
});
