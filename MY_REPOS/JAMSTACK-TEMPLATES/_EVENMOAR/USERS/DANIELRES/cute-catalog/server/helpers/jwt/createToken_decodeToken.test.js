const createToken = require("./createToken");
const decodeToken = require("./decodeToken");

describe("createToken() and decodeToken()", () => {
  it("creates and decodes a JWT token", async () => {
    const payload = { userId: 123 };
    const expiresIn = String(60); // 1 minute
    const now = Date.now();
    const secret = "shhhhh";

    const token = createToken({ payload, expiresIn, secret });
    const decoded = await decodeToken({ token, secret });

    expect(decoded.userId).toEqual(123);

    const issuedAt = decoded.iat * 1000;
    expect(now - issuedAt < 1000).toBeTruthy();
    expect(decoded.exp - decoded.iat).toEqual(60);
  });
});
