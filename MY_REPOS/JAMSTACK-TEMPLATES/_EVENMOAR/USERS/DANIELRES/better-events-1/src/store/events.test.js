import { eventsReducer, initialState, types } from "./events";

describe("eventsReducer", () => {
  it("appends received event to store on EVENT_SUCCESS", () => {
    expect(
      eventsReducer(initialState, {
        type: types.EVENT_SUCCESS,
        eventCode: "jkl",
        event: { name: "Event 1" },
      })
    ).toEqual({
      entries: { jkl: { name: "Event 1" } },
    });
  });
});
