const cashRegister = require("./CashRegister");
const cashRegister2 = require("./CashRegister");

cashRegister.credit(10);
cashRegister2.credit(20);
cashRegister.debit(5);
console.log(cashRegister.total());
