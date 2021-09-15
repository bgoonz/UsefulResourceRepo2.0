import { Selector } from "testcafe"; // first import testcafe selectors

fixture`Getting Started`.page`http://localhost:3010/`; // declare the fixture // specify the start page

//then create a test and place your code there
test("Homepage renders", async (t) => {
  await t
    .expect(Selector(".App-header").innerText)
    .contains("Welcome to React");
});
