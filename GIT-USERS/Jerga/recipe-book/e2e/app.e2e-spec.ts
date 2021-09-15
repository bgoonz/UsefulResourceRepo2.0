import { RecipeBookPage } from "./app.po";

describe("recipe-book App", function () {
  let page: RecipeBookPage;

  beforeEach(() => {
    page = new RecipeBookPage();
  });

  it("should display message saying app works", () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual("rb works!");
  });
});
