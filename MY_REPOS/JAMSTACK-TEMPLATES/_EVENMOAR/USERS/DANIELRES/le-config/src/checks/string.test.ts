import { expect } from "chai";
import { LeConfigValidationError } from "../errors/LeConfigValidationError";
import { validate } from "../validate";
import * as string from "./string";

describe("string", () => {
  describe(".string", () => {
    describe("given valid strings", () => {
      const env = {
        OK1: "",
        OK2: "hello",
        OK3: "1",
        OK4: "true",
      };

      it("returns a valid project config", () => {
        const config = {
          OK1: [env.OK1, string.string],
          nested: {
            OK2: [env.OK2, string.string],
            nested2: {
              OK3: [env.OK3, string.string],
              OK4: [env.OK4, string.string],
            },
          },
        };

        const actual = validate(config);

        const expected = {
          OK1: "",
          nested: {
            OK2: "hello",
            nested2: {
              OK3: "1",
              OK4: "true",
            },
          },
        };

        expect(actual).to.eql(expected);
      });
    });

    describe("given valid + invalid + missing strings", () => {
      const env = {
        OK1: "",
        OK2: "hello",
        OK3: "1",
        OK4: "true",
        NOK1: undefined,
      };

      it("throws a LeConfigValidationError with summary + details", () => {
        const config = {
          OK1: [env.OK1, string.string],
          nested: {
            NOK1: [env.NOK1, string.string],
            OK2: [env.OK2, string.string],
            OK3: [env.OK3, string.string],
            OK4: [env.OK4, string.string],
          },
        };

        expect(() => validate(config)).to.throw(LeConfigValidationError);

        try {
          validate(config);
        } catch (e) {
          expect(e.name).to.eql(LeConfigValidationError.name);
          expect(e.message).to.eql("1 config validation error");
          expect(e.errors).to.eql([
            { key: "NOK1", error: "should be a string", actual: undefined },
          ]);
        }
      });
    });
  });

  describe(".min()", () => {
    describe("given valid length strings", () => {
      const env = {
        OK1: "",
        OK2: "foo",
      };

      it("returns a valid project config", () => {
        const config = {
          OK1: [env.OK1, string.min(0)],
          nested: {
            OK2: [env.OK2, string.min(3)],
          },
        };

        const actual = validate(config);

        const expected = {
          OK1: "",
          nested: {
            OK2: "foo",
          },
        };

        expect(actual).to.eql(expected);
      });
    });

    describe("given valid + invalid + missing strings", () => {
      const env = {
        OK: "loremipsum",
        NOK1: undefined,
        NOK2: "loremipsum",
      };

      it("throws a LeConfigValidationError with summary + details", () => {
        const config = {
          OK1: [env.OK, string.min(10)],
          nested: {
            NOK1: [env.NOK1, string.min(0)],
            NOK2: [env.NOK2, string.min(11)],
          },
        };

        expect(() => validate(config)).to.throw(LeConfigValidationError);

        try {
          validate(config);
        } catch (e) {
          expect(e.name).to.eql(LeConfigValidationError.name);
          expect(e.message).to.eql("2 config validation errors");
          expect(e.errors).to.eql([
            {
              key: "NOK1",
              error: "should be a string ≥ 0",
              actual: undefined,
            },
            {
              key: "NOK2",
              error: "should be a string ≥ 11",
              actual: "loremipsum",
            },
          ]);
        }
      });
    });
  });

  describe(".max()", () => {
    describe("given valid length strings", () => {
      const env = {
        OK: "loremipsum",
      };

      it("returns a valid project config", () => {
        const config = {
          OK: [env.OK, string.max(30)],
        };

        const actual = validate(config);

        const expected = {
          OK: "loremipsum",
        };

        expect(actual).to.eql(expected);
      });
    });

    describe("given valid + invalid + missing strings", () => {
      const env = {
        OK: "loremipsum",
        NOK1: undefined,
        NOK2: "loremipsum",
      };

      it("throws a LeConfigValidationError with summary + details", () => {
        const config = {
          OK1: [env.OK, string.max(30)],
          nested: {
            NOK1: [env.NOK1, string.max(10)],
            NOK2: [env.NOK2, string.max(5)],
          },
        };

        expect(() => validate(config)).to.throw(LeConfigValidationError);

        try {
          validate(config);
        } catch (e) {
          expect(e.name).to.eql(LeConfigValidationError.name);
          expect(e.message).to.eql("2 config validation errors");
          expect(e.errors).to.eql([
            {
              key: "NOK1",
              error: "should be a string ≤ 10",
              actual: undefined,
            },
            {
              key: "NOK2",
              error: "should be a string ≤ 5",
              actual: "loremipsum",
            },
          ]);
        }
      });
    });
  });
});
