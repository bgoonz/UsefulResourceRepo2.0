import { expect } from "chai";
import { LeConfigValidationError } from "../errors/LeConfigValidationError";
import { validate } from "../validate";
import * as int from "./int";

describe("int", () => {
  describe(".int", () => {
    describe("given valid + invalid + missing ints", () => {
      const env = {
        OK1: "150",
        OK2: "200",
        OK3: "-1",
        NOK1: "1",
        NOK2: undefined,
        NOK3: "0.5",
        NOK4: "hello",
        NOK5: "4/4",
      };

      it("throws a LeConfigValidationError with summary + details", () => {
        const config = {
          OK1: [env.OK1, int.int],
          NOK1: [env.NOK1, int.min(100)],
          nested: {
            OK2: [env.OK2, int.min(100)],
            OK3: [env.OK3, int.int],
            NOK1: [env.NOK1, int.int],
            NOK2: [env.NOK2, int.int],
            NOK3: [env.NOK3, int.int],
            NOK4: [env.NOK4, int.int],
            NOK5: [env.NOK5, int.int],
          },
        };

        expect(() => validate(config)).to.throw(LeConfigValidationError);

        try {
          validate(config);
        } catch (e) {
          expect(e.name).to.eql(LeConfigValidationError.name);
          expect(e.message).to.eql("5 config validation errors");
          expect(e.errors).to.eql([
            { key: "NOK1", error: "should be an integer ≥ 100", actual: "1" },
            { key: "NOK2", error: "should be an integer", actual: undefined },
            { key: "NOK3", error: "should be an integer", actual: "0.5" },
            { key: "NOK4", error: "should be an integer", actual: "hello" },
            { key: "NOK5", error: "should be an integer", actual: "4/4" },
          ]);
        }
      });
    });
  });

  describe(".within(min, max)", () => {
    describe("given valid + invalid + missing vars", () => {
      const env = {
        OK1: "1",
        OK2: "10",
        NOK1: "0",
        NOK2: "11",
        NOK3: undefined,
      };

      it("throws a LeConfigValidationError with summary + details", () => {
        const config = {
          OK1: [env.OK1, int.within(1, 10)],
          OK2: [env.OK2, int.within(1, 10)],
          NOK1: [env.NOK1, int.within(1, 10)],
          NOK2: [env.NOK2, int.within(1, 10)],
          NOK3: [env.NOK3, int.within(1, 10)],
        };

        expect(() => validate(config)).to.throw(LeConfigValidationError);

        try {
          validate(config);
        } catch (e) {
          expect(e.name).to.eql(LeConfigValidationError.name);
          expect(e.message).to.eql("3 config validation errors");
          expect(e.errors).to.eql([
            {
              actual: "0",
              error: "should be an integer within 1 and 10",
              key: "NOK1",
            },
            {
              key: "NOK2",
              error: "should be an integer within 1 and 10",
              actual: "11",
            },
            {
              key: "NOK3",
              error: "should be an integer within 1 and 10",
              actual: undefined,
            },
          ]);
        }
      });
    });
  });

  describe(".port()", () => {
    describe("given valid + invalid + missing vars", () => {
      const env = {
        OK1: "3000",
        OK2: "64000",
        NOK1: "0",
        NOK2: "1000",
        NOK3: undefined,
      };

      it("throws a LeConfigValidationError with summary + details", () => {
        const config = {
          OK1: [env.OK1, int.port()],
          OK2: [env.OK2, int.port()],
          NOK1: [env.NOK1, int.port()],
          NOK2: [env.NOK2, int.port()],
          NOK3: [env.NOK3, int.port()],
        };

        expect(() => validate(config)).to.throw(LeConfigValidationError);

        try {
          validate(config);
        } catch (e) {
          expect(e.message).to.eql("3 config validation errors");
          expect(e.errors).to.eql([
            {
              actual: "0",
              error: "should be an integer within 1025 and 65534",
              key: "NOK1",
            },
            {
              key: "NOK2",
              error: "should be an integer within 1025 and 65534",
              actual: "1000",
            },
            {
              key: "NOK3",
              error: "should be an integer within 1025 and 65534",
              actual: undefined,
            },
          ]);
        }
      });
    });
  });
});
