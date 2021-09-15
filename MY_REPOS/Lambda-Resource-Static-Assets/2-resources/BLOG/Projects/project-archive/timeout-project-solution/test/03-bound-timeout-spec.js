const chai = require("chai");
const expect = chai.expect;
const spies = require("chai-spies");
chai.use(spies);

const boundTimeout = require("../problems/03-bound-timeout.js");

describe("boundTimeout()", function() {
  afterEach(function() {
    chai.spy.restore(global);
  });

  it("it should bind the callback to the given object", function() {
    const callback = chai.spy();
    const thisArg = chai.spy();
    const bindSpy = chai.spy.on(callback, "bind");
    boundTimeout(callback, 1000, thisArg);
    expect(bindSpy).to.have.been.called.once.with.exactly(thisArg);
  });

  it("it should set a timeout with the bound callback and given delay", function() {
    const callback = chai.spy();
    const boundCallback = chai.spy();
    chai.spy.on(callback, "bind", () => boundCallback);
    const setTimeoutSpy = chai.spy.on(global, "setTimeout");
    boundTimeout(callback, 1000);
    expect(setTimeoutSpy).to.have.been.called.once.with.exactly(
      boundCallback,
      1000
    );
  });
});
