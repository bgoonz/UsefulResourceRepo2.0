import { expect } from "chai";
import { validate } from "../src";
import * as int from "../src/checks/int";
import { LeConfigValidationError } from "../src/errors/LeConfigValidationError";

describe("errors", () => {
  describe("given valid + invalid + missing vars", () => {
    const env = {
      OK1: "150",
      OK2: "200",
      NOK1: "1",
      NOK2: undefined,
    };

    it("throws a LeConfigValidationError with summary + details", () => {
      const config = {
        OK1: [env.OK1, int.int],
        NOK1: [env.NOK1, int.min(100)],
        nested: {
          OK2: [env.OK2, int.min(100)],
          NOK2: [env.NOK2, int.int],
        },
      };

      expect(() => validate(config)).to.throw(LeConfigValidationError);

      try {
        validate(config);
      } catch (e) {
        expect(e.name).to.eql(LeConfigValidationError.name);
        expect(e.message).to.eql("2 config validation errors");
        expect(e.errors).to.eql([
          { key: "NOK1", error: "should be an integer ≥ 100", actual: "1" },
          { key: "NOK2", error: "should be an integer", actual: undefined },
        ]);
      }
    });
  });

  describe("inflections", () => {
    const env = {
      NOK: undefined,
    };

    describe("given only 1 error", () => {
      it("outputs the message in singular form", () => {
        const config = {
          NOK: [env.NOK, int.int],
        };

        expect(() => validate(config)).to.throw(LeConfigValidationError);

        try {
          validate(config);
        } catch (e) {
          expect(e.name).to.eql(LeConfigValidationError.name);
          expect(e.message).to.eql("1 config validation error");
        }
      });
    });
  });
});
