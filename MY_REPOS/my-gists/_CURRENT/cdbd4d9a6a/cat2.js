let cat = {
  purr: function () {
    console.log("meow");
  },
  purrMore: function () {
    this.purr();
  },
};
global.setTimeout(cat.purrMore, 5000); // 5 seconds later: TypeError: this.purr is not a function
