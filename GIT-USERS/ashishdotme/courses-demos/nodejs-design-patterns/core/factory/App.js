const IPhoneFactory = require("./IPhoneFactory");

const iphone11 = IPhoneFactory.create("IPhone11", "768");
iphone11.displayConfig();

const iphone11Pro = IPhoneFactory.create("IPhone11Pro", "768");
iphone11Pro.displayConfig();

const iphone11ProMax = IPhoneFactory.create("IPhone11ProMax", "768");
iphone11ProMax.displayConfig();
