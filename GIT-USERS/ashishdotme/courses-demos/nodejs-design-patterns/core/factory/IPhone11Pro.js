const Phone = require("./Phone");

class IPhone11Pro {
  constructor(serialNum) {
    return new Phone("IPhone 11 Pro", "A12 Bionic", "3 GB", serialNum);
  }
}

module.exports = IPhone11Pro;
