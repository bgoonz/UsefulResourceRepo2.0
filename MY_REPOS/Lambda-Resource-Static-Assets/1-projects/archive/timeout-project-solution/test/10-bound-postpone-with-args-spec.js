const chai = require("chai");
const expect = chai.expect;
const spies = require("chai-spies");
chai.use(spies);

const boundPostponeWithArgs = require("../problems/10-bound-postpone-with-args.js");

describe("boundPostponeWithArgs()", function () {
  afterEach(function () {
    chai.spy.restore(global);
  });

  it("should return a function", function () {
    expect(boundPostponeWithArgs(() => null, 1000, {})).to.be.a("function");
  });

  it("should return a function that executes the callback after the given delay when it is called", function (done) {
    const setTimeoutSpy = chai.spy.on(global, "setTimeout");
    const callbackSpy = chai.spy(() => {
      expect(setTimeoutSpy).to.have.been.called.once.with(300);
      expect(callbackSpy).to.have.been.called.once;
      done();
    });
    boundPostponeWithArgs(callbackSpy, 300, {})();
  });

  it("should return a function that executes the callback bound to the given object", function (done) {
    const setTimeoutSpy = chai.spy.on(global, "setTimeout");
    const thisArg = chai.spy();
    const callbackSpy = chai.spy();
    const bindSpy = chai.spy.on(callbackSpy, "bind", () => {
      const boundCallback = () => {
        expect(setTimeoutSpy).to.have.been.called.once.with.exactly(
          boundCallback,
          250
        );
        expect(bindSpy).to.have.been.called.once.with.exactly(thisArg);
        done();
      };
      return boundCallback;
    });
    boundPostponeWithArgs(callbackSpy, 250, thisArg)();
  });

  it("the returned function should pass any arguments to the callback when it is called", function (done) {
    const arg1 = chai.spy();
    const arg2 = chai.spy();
    const arg3 = chai.spy();
    const callbackSpy = chai.spy(() => {
      expect(callbackSpy).to.have.been.called.once.with.exactly(
        arg1,
        arg2,
        arg3
      );
      done();
    });
    boundPostponeWithArgs(callbackSpy, 250, {})(arg1, arg2, arg3);
  });
});
