import { PortfolioJergaPage } from "./app.po";

describe("portfolio-jerga App", () => {
  let page: PortfolioJergaPage;

  beforeEach(() => {
    page = new PortfolioJergaPage();
  });

  it("should display message saying app works", () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual("app works!");
  });
});
