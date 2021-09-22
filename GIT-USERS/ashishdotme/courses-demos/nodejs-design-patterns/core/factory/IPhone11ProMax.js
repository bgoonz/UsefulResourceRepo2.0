const Phone = require("./Phone");

class IPhone11ProMax {
  constructor(serialNum) {
    return new Phone("IPhone 11 Pro Max", "A13 Bionic", "4 GB", serialNum);
  }
}

module.exports = IPhone11ProMax;
