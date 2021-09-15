## Singleton Design Pattern

- Singletons are objects that can only have a single instance, with a single point of access
- The module system in nodejs offers a rudimentary implementation of a singleton
- In modules, single instance of class is created and cached

## Example

```javascript
// CashRegister.js

let cash = 0;

const CashRegister = {
  credit(amount) {
    cash = cash + amount;
    return cash;
  },
  debit(amount) {
    if (amount <= cash) {
      cash = cash - amount;
      return true;
    } else {
      return false;
    }
  },
  total() {
    return cash;
  },
};

module.exports = CashRegister;
```

```javascript
// App.js

const cashRegister = require("./CashRegister");
const cashRegister2 = require("./CashRegister");

cashRegister.credit(10);
cashRegister2.credit(20);
cashRegister.debit(5);
console.log(cashRegister.total()); // answer is 25 as both object are using same instance
```
