const fetch = require("node-fetch");

const MOCKS = "true";

export const getOriginalData = ({ top = 100, convert = "eur" } = {}) => {
  if (MOCKS === "true")
    return Promise.resolve([
      { symbol: "BTC", price_eur: "573.137" },
      { symbol: "ETH", price_eur: "12.1844" },
      { symbol: "_", price_eur: "1" },
    ]);

  return fetch(
    `https://api.coinmarketcap.com/v1/ticker/?limit=${top}&convert=${convert}`
  ).then((resp) => resp.json());
};

export default async ({ top, convert, coins = ["ETH", "BTC"] } = {}) => {
  const data = await getOriginalData({ top, convert });
  const filtered = data.filter((e) => coins.includes(e.symbol));
  const filtered2 = filtered.map((e) => ({ [e.symbol]: e.price_eur }));
  const formatted = filtered2.reduce((acc, cur) => ({ ...acc, ...cur }));
  return formatted;
};
