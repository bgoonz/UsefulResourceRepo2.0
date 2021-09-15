var X = function () {
    this.a = true;
};
X.prototype.a = true;
var x = new X;

delete x.a && x.a;