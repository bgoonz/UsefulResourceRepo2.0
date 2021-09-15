import { format, parse } from ".";

describe("Content-Range", () => {
  describe("#format", () => {
    it("handles satisfiable ranges", () => {
      expect(
        format({
          unit: "bytes",
          start: 0,
          end: 20,
          size: 30,
        })
      ).toBe("bytes 0-20/30");

      expect(
        format({
          unit: "bytes",
          start: 0,
          end: 0,
          size: 1,
        })
      ).toBe("bytes 0-0/1");

      expect(
        format({
          unit: "bytes",
          start: 20,
          end: 50,
          size: 400,
        })
      ).toBe("bytes 20-50/400");

      expect(
        format({
          unit: "bytes",
          start: 20,
          end: 30,
          size: 100,
        })
      ).toBe("bytes 20-30/100");
    });

    it("handles range without size", () => {
      expect(
        format({
          unit: "bytes",
          start: 0,
          end: 20,
        })
      ).toBe("bytes 0-20/*");

      expect(
        format({
          unit: "bytes",
          start: 0,
          end: 20,
          size: null,
        })
      ).toBe("bytes 0-20/*");

      expect(
        format({
          unit: "bytes",
          start: 0,
          end: 20,
          size: 0,
        })
      ).toBe("bytes 0-20/0");
    });

    it("handles unsatisfiable range", () => {
      expect(
        format({
          unit: "bytes",
          size: 20,
        })
      ).toBe("bytes */20");
    });

    it("returns null for invalid cases", () => {
      expect(
        format({
          unit: "bytes",
        })
      ).toBe(null);

      expect(
        format({
          unit: "bytes",
          start: 2,
        })
      ).toBe(null);

      expect(
        format({
          unit: "bytes",
          end: 2,
        })
      ).toBe(null);
    });
  });

  describe("#parse", () => {
    it("handles satisfiable range", () => {
      expect(parse("bytes 0-20/30")).toEqual({
        unit: "bytes",
        start: 0,
        end: 20,
        size: 30,
      });
    });

    it("handles range without size", () => {
      expect(parse("bytes 10-20/*")).toEqual({
        unit: "bytes",
        start: 10,
        end: 20,
        size: null,
      });
    });

    it("handles unsatisfiable range", () => {
      expect(parse("bytes */30")).toEqual({
        unit: "bytes",
        start: null,
        end: null,
        size: 30,
      });
    });

    it("returns null for invalid cases", () => {
      expect(parse("invalid")).toEqual(null);
      expect(parse("bytes */*")).toEqual(null);
    });
  });
});
