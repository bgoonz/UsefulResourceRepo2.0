const EventEmitter = require("events");
const { expect } = require("chai");
const { getBodyFromRequest } = require("../get-body-from-request");
describe("The getBodyFromRequest function", () => {
  let fakeReq = null;

  beforeEach(() => {
    fakeReq = new EventEmitter();
  });

  it("returns an empty string for no body", (done) => {
    getBodyFromRequest(fakeReq).then((body) => {
      if (body === "") {
        done();
      } else {
        done(`expected "" got "${body}"`);
      }
    });
    fakeReq.emit("end");
  });

  it("returns the data read from the stream", (done) => {
    const part1 = "part 1";
    const part2 = "part 2";
    getBodyFromRequest(fakeReq).then((body) => {
      if (body === part1 + part2) {
        done();
      } else {
        done(`expected "" got "${body}"`);
      }
    });
    fakeReq.emit("data", part1);
    fakeReq.emit("data", part2);
    fakeReq.emit("end");
  });
});
