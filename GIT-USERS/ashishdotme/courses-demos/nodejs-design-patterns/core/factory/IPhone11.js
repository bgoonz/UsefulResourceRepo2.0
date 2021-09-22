const Phone = require("./Phone");

class IPhone11 {
  constructor(serialNum) {
    return new Phone("IPhone 11", "A11 Bionic", "2 GB", serialNum);
  }
}

module.exports = IPhone11;
