const { getMessagesByDiscussionId, saveMessage } = require("./messagesRepo");

describe("saveMessage + getMessagesByDiscussionId", () =>
  it("foo", () => {
    saveMessage({ body: "one", discussionId: "aaa" });
    saveMessage({ body: "two", discussionId: "bbb" });
    saveMessage({ body: "three", discussionId: "aaa" });
    expect(getMessagesByDiscussionId("aaa")).toEqual([
      { body: "one", discussionId: "aaa" },
      { body: "three", discussionId: "aaa" },
    ]);
  }));
