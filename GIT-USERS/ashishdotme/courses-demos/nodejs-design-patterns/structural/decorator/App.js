const CurrencyConvertor = require("./CurrencyConvertor");

const Cost = (qty, price) => Promise.resolve(qty * price);
Cost(20, 5).then((res) => console.log(res));

// With convertor
const CostPlus = CurrencyConvertor(Cost);
CostPlus(20, 5, "INR", "USD").then((result) => console.log(result));
