import { messagesReducer, types } from "./messages";

describe("messagesReducer", () => {
  it("appends received message to store on RECEIVE_MESSAGE", () => {
    expect(
      messagesReducer([{ body: "msg1", discussionId: "abc" }], {
        type: types.RECEIVE_MESSAGE,
        message: { discussionId: "def", body: "msg2" },
      })
    ).toEqual([
      { discussionId: "abc", body: "msg1" },
      { discussionId: "def", body: "msg2" },
    ]);

    expect(
      messagesReducer(
        [
          { discussionId: "abc", body: "msg1" },
          { discussionId: "def", body: "msg2" },
        ],
        {
          type: types.RECEIVE_MESSAGE,
          message: { discussionId: "def", body: "msg3" },
        }
      )
    ).toEqual([
      { discussionId: "abc", body: "msg1" },
      { discussionId: "def", body: "msg2" },
      { discussionId: "def", body: "msg3" },
    ]);
  });
});
