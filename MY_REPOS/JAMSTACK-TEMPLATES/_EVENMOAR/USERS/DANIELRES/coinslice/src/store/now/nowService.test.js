import now, { getOriginalData } from "./nowService";

describe("getOriginalData()", () => {
  it("Fetches relevant data from coinmarketcap api", async () => {
    const originalData = await getOriginalData({});
    expect(originalData.map((e) => e.symbol)).toEqual(["BTC", "ETH", "_"]);
  });
});

describe("now()", () => {
  it("Returns values for selected coins only", async () => {
    const originalData = await getOriginalData({});
    const data = await now({ coins: ["ETH", "BTC"] });
    expect(originalData.length).toEqual(3);
    expect(Object.keys(data).length).toEqual(2);
  });

  it("Returns data properly formatted", async () => {
    const originalData = await getOriginalData({});
    const data = await now({ coins: ["ETH", "BTC"] });
    expect(data.BTC).toMatch(/\d+\.\d+/);
    expect(data.ETH).toMatch(/\d+\.\d+/);
  });
});
