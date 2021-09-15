import { expect } from "chai";
import { LeConfigValidationError } from "../errors/LeConfigValidationError";
import { validate } from "../validate";
import { boolean } from "./boolean";

describe("boolean", () => {
  describe(".boolean", () => {
    describe(`given any of: true, false, "true", "false" `, () => {
      const env = {
        OK1: "true",
        OK2: "false",
        OK3: true,
        OK4: false,
      };

      it("returns a valid project config", () => {
        const config = {
          OK1: [env.OK1, boolean],
          nested: {
            OK2: [env.OK2, boolean],
            OK3: [env.OK3, boolean],
            OK4: [env.OK4, boolean],
          },
        };

        expect(() => validate(config)).not.to.throw();

        const actual = validate(config);
        const expected = {
          OK1: true,
          nested: {
            OK2: false,
            OK3: true,
            OK4: false,
          },
        };

        expect(actual).to.eql(expected);
      });
    });

    describe("given valid + invalid + missing booleans", () => {
      const env = {
        OK1: "true",
        OK2: "false",
        NOK1: undefined as any,
        NOK2: "1",
        NOK3: 1,
        NOK4: "t",
        NOK5: "f",
      };

      it("throws a LeConfigValidationError with summary + details", () => {
        const config = {
          OK1: [env.OK1, boolean],
          NOK1: [env.NOK1, boolean],
          NOK2: [env.NOK2, boolean],
          nested: {
            OK2: [env.OK2, boolean],
            NOK3: [env.NOK3, boolean],
            NOK4: [env.NOK4, boolean],
            NOK5: [env.NOK5, boolean],
          },
        };

        expect(() => validate(config)).to.throw(LeConfigValidationError);

        try {
          validate(config);
        } catch (e) {
          expect(e.name).to.eql(LeConfigValidationError.name);
          expect(e.message).to.eql("5 config validation errors");
          expect(e.errors).to.eql([
            { key: "NOK1", error: "should be a boolean", actual: undefined },
            { key: "NOK2", error: "should be a boolean", actual: "1" },
            { key: "NOK3", error: "should be a boolean", actual: 1 },
            { key: "NOK4", error: "should be a boolean", actual: "t" },
            { key: "NOK5", error: "should be a boolean", actual: "f" },
          ]);
        }
      });
    });
  });
});
