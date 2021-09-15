import { parseHost } from "./parseHost";

describe("parses a host string, returns object { subDomain, domain, port }", () => {
  it(`handles "localhost"`, () => {
    const actual = parseHost(`localhost`);
    const expected = { subdomain: null, domain: "localhost", port: null };
    expect(actual).toMatchObject(expected);
  });

  it(`handles "localhost:3000"`, () => {
    const actual = parseHost(`localhost:3000`);
    const expected = { subdomain: null, domain: "localhost", port: 3000 };
    expect(actual).toMatchObject(expected);
  });

  it(`handles "domain.com"`, () => {
    const actual = parseHost(`domain.com`);
    const expected = { subdomain: null, domain: "domain.com", port: null };
    expect(actual).toMatchObject(expected);
  });

  it(`handles "domain.com:3000"`, () => {
    const actual = parseHost(`domain.com:3000`);
    const expected = { subdomain: null, domain: "domain.com", port: 3000 };
    expect(actual).toMatchObject(expected);
  });

  it(`handles "sub.domain.com"`, () => {
    const actual = parseHost(`sub.domain.com`);
    const expected = { subdomain: "sub", domain: "domain.com", port: null };
    expect(actual).toMatchObject(expected);
  });

  it(`handles "sub.domain.com:3000"`, () => {
    const actual = parseHost(`sub.domain.com:3000`);
    const expected = { subdomain: "sub", domain: "domain.com", port: 3000 };
    expect(actual).toMatchObject(expected);
  });
});
