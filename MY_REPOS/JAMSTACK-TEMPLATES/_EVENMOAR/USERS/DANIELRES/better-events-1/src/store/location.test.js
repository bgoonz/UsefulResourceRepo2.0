import { setupAll } from "./location.test.support";

const { store, history } = setupAll("/first");
const { push, replace } = history;

const getLocation = () => store.getState().location;

describe("Home page route", () => {
  it('Supports "/"', () => {
    push("/");
    expect(getLocation().type).toEqual("HOMEPAGE");
    expect(getLocation().pathname).toEqual("/");
  });
});

describe("Event page route", () => {
  it('Supports "/:eventCode"', () => {
    push("/foo");
    expect(getLocation().type).toEqual("EVENTPAGE");
    expect(getLocation().pathname).toEqual("/foo");
  });
});
