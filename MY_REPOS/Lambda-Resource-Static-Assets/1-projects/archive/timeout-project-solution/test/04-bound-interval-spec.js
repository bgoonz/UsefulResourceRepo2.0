const chai = require("chai");
const expect = chai.expect;
const spies = require("chai-spies");
chai.use(spies);

const boundInterval = require("../problems/04-bound-interval.js");

describe("boundInterval()", function () {
  afterEach(function () {
    chai.spy.restore(global);
  });

  it("should bind the callback to the given object", function () {
    chai.spy.on(global, "setInterval", () => null);
    const callback = chai.spy();
    const thisArg = chai.spy();
    const bindSpy = chai.spy.on(callback, "bind");
    boundInterval(callback, 1000, thisArg);
    expect(bindSpy).to.have.been.called.once.with.exactly(thisArg);
  });

  it("should set an interval with the bound callback and given delay", function () {
    const setIntervalSpy = chai.spy.on(global, "setInterval", () => null);
    const callback = chai.spy();
    const boundCallback = chai.spy();
    chai.spy.on(callback, "bind", () => boundCallback);
    boundInterval(callback, 1000);
    expect(setIntervalSpy).to.have.been.called.once.with.exactly(
      boundCallback,
      1000
    );
  });

  it("should return the Timeout object that is returned from setInterval", function () {
    const intervalReturnSpy = chai.spy();
    chai.spy.on(global, "setInterval", () => intervalReturnSpy);
    expect(boundInterval(() => null, 100)).to.equal(intervalReturnSpy);
  });
});
