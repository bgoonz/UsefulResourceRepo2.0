var x = {
   x: 5,
   toString: function () {
       this.x -= 2;
       return this.x;
   }
};

x > 2 && x < 2