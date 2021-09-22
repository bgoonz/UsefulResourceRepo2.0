let cat = {
  purr: function () {
    console.log("meow");
  },
  purrMore: function () {
    this.purr();
  },
};
let sayMeow = cat.purrMore;
console.log(sayMeow()); // TypeError
let boundCat = sayMeow.bind(cat);
boundCat(); // prints "meow"