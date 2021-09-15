import axios from "axios";
import CurrencyConvertor from "../CurrencyConvertor";

const CurrencyConverter = (base, to) => {
  return function (target, name, descriptor) {
    try {
      const fn = descriptor.value; // original function
      descriptor.value = async (...args) => {
        // define the decorator
        const result = await fn.call(this, ...args);
        const currencyRate = await axios(
          `https://run.mocky.io/v3/306257ac-4b4c-44bd-a6e5-29edf519c14e`
        );
        return (
          (await currencyRate.data[`${to.toUpperCase()}_${base.toUpperCase()}`][
            "val"
          ]) * result
        );
      };

      return descriptor;
    } catch (error) {
      console.log(error);
    }
  };
};

export default CurrencyConverter;
