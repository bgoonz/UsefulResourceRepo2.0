const { expect } = require("chai");
const { getValueFromBody } = require("../get-value-from-body");
describe("The getValueFromBody function", () => {
  it("returns an empty string for an empty body", () => {
    const body = "";
    const key = "key1";
    const result = getValueFromBody(body, key);
    expect(result).to.be.equal("");
  });

  it("returns an empty string for a body without the key", () => {
    const body = "key2=value2";
    const key = "key1";
    const result = getValueFromBody(body, key);
    expect(result).to.be.equal("");
  });

  it("returns the value of the key in a simple body", () => {
    const body = "key1=value1";
    const key = "key1";
    const result = getValueFromBody(body, key);
    expect(result).to.be.equal("value1");
  });

  it("returns the value of the key in a complex body", () => {
    const body = "key8=value8&key42=value24&key7=value7";
    const key = "key42";
    const result = getValueFromBody(body, key);
    expect(result).to.be.equal("value24");
  });

  it("decodes the return value of URL encoding", () => {
    const body = "key8=value8&key42=value%2024&key7=value7";
    const key = "key42";
    const result = getValueFromBody(body, key);
    expect(result).to.be.equal("value 24");
  });
});
