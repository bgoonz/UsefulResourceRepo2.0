//求最大公约数
function gcd(p, q) {
    if (q == 0) return p;
    var r = p % q;
    return gcd(q, r);
}

var q = gcd(21, 15);
console.log(q);