import { expect } from "chai";
import { validate } from "../src";
import { boolean } from "../src/checks/boolean";
import * as int from "../src/checks/int";
import * as env from "./support/env";

describe("integration", () => {
  describe("given env vars present", () => {
    const envVars = {
      OK1: "150",
      OK2: "true",
      OK3: "200",
      OK4: "false",
    };

    beforeEach(() => env.add(envVars));
    afterEach(() => env.del(envVars));

    describe("and a valid config definition", () => {
      let config;

      beforeEach(() => {
        config = {
          OK1: [process.env.OK1, int.min(100)],
          OK2: [process.env.OK2, boolean],
          nested: {
            OK3: [process.env.OK3, int.min(100)],
            OK4: [process.env.OK4, boolean],
          },
        };
      });

      it("returns a valid project config", () => {
        const actual = validate(config);
        const expected = {
          OK1: 150,
          OK2: true,
          nested: {
            OK3: 200,
            OK4: false,
          },
        };

        expect(actual).to.deep.equal(expected);
      });
    });
  });
});
