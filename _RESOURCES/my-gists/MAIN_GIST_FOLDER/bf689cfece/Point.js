var Point = function (x, y) {    
    if (arguments.length === 1) {
        return new Point.fromString(x);
    }
    
    this.x = x;
    this.y = y;
};

Point.fromString = function (x) {
    this.x = 0;
    this.y = 0;
    x = this.parse(x);
    x.forEach(function (values) {
        if (typeof values === "object") {
            this.x += values.x;
            this.y += values.y;
        }
    }.bind(this));
};

Point.fromString.prototype =
Point.prototype = {
    parse: function (value) {
        return JSON.parse('[' + value + '0]');
    },
    valueOf: function () {
        return JSON.stringify(this) + ',';
    },
    toString: function () {
        return '{' + this.x + ',' + this.y + '}';
    }
};

console.log(new Point( new Point(10000, 20000) + new Point(30000, 50000) ).toString()); // {40000,70000}