const axios = require("axios");

const CurrencyConvertor = (fn) => {
  return async function (qty, price, base, to) {
    const result = await fn(qty, price);
    const currencyRate = await axios(
      `https://run.mocky.io/v3/306257ac-4b4c-44bd-a6e5-29edf519c14e`
    );
    return (
      currencyRate.data[`${to.toUpperCase()}_${base.toUpperCase()}`]["val"] *
      result
    );
  };
};

module.exports = CurrencyConvertor;
