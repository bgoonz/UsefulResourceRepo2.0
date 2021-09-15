import getNextItem from "./getNextItem";

const items = {
  1: {
    id: 1,
    title: "one",
  },
  2: {
    id: 2,
    title: "two",
  },
  3: {
    id: 3,
    title: "three",
  },
};

describe("getNextItem", () => {
  it("returns the next item in a circular way", () => {
    expect(getNextItem({ items, currId: 1 })).toEqual({
      id: 2,
      title: "two",
    });

    expect(getNextItem({ items, currId: 2 })).toEqual({
      id: 3,
      title: "three",
    });

    expect(getNextItem({ items, currId: 3 })).toEqual({
      id: 1,
      title: "one",
    });
  });
});
