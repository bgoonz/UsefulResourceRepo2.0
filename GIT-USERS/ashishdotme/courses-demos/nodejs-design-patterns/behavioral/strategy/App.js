const Payment = require("./Payment");
const Chase = require("./Chase");
const Citibank = require("./Citibank");

const payment = new Payment();

payment.pay(new Chase(200, "00233232"));
payment.pay(new Citibank(150, "00124124"));

payment.refund(new Chase(50, "00124124"));
