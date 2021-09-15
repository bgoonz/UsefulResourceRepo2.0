const IPhone11 = require("./IPhone11");
const IPhone11Pro = require("./IPhone11Pro");
const IPhone11ProMax = require("./IPhone11ProMax");

class IPhoneFactory {
  create(type, serialNumber) {
    switch (type) {
      case "IPhone11":
        return new IPhone11(serialNumber);
      case "IPhone11Pro":
        return new IPhone11Pro(serialNumber);
      case "IPhone11ProMax":
        return new IPhone11ProMax(serialNumber);
      default:
        return "Device not found";
    }
  }
}

module.exports = new IPhoneFactory(); // only one instance should be created
