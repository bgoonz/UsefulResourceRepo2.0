const MobilePhone = require("./MobilePhone");
const Laptop = require("./Laptop");
const Catalog = require("./Catalog");

// Phones
const iPhoneXS = new MobilePhone("Apple iPhone XR", "White", 89000);
const onePlus = new MobilePhone("OnePlus 6t", "Midnight Black", 46000);
const galaxyM20 = new MobilePhone("Samsung Galaxy M20", "Ocean Blue", 12000);

// Phone Catalog
const phones = new Catalog("** Mobile Phones **");
phones.add(iPhoneXS).add(onePlus).add(galaxyM20);

// Laptops
const macbookPro = new Laptop("Apple", "Macbook Pro 13", 150000);
const dellInspiron = new Laptop("Dell", "Inspiron 5370", 63000);

// Laptop Catalog
const laptops = new Catalog("** Laptops **");
laptops.add(macbookPro).add(dellInspiron);

// Shopping Catalog
const primeProducts = new Catalog("*** Prime Products 2019 ***");
primeProducts.add(phones).add(laptops);

primeProducts.getDetails();
