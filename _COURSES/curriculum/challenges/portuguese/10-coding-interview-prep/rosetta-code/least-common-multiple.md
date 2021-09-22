---
id: 5a23c84252665b21eecc7edf
title: Least common multiple
challengeType: 5
forumTopicId: 302301
dashedName: least-common-multiple
---

# --description--

The least common multiple of 12 and 18 is 36, because 12 is a factor (12 × 3 = 36), and 18 is a factor (18 × 2 = 36), and there is no positive integer less than 36 that has both factors. As a special case, if either _m_ or _n_ is zero, then the least common multiple is zero. One way to calculate the least common multiple is to iterate all the multiples of _m_, until you find one that is also a multiple of _n_. If you already have _gcd_ for [greatest common divisor](<https://rosettacode.org/wiki/greatest common divisor>), then this formula calculates _lcm_. ( \\operatorname{lcm}(m, n) = \\frac{|m \\times n|}{\\operatorname{gcd}(m, n)} )

# --instructions--

Compute the least common multiple of an array of integers. Given _m_ and _n_, the least common multiple is the smallest positive integer that has both _m_ and _n_ as factors.

# --hints--

`LCM` should be a function.

```js
assert(typeof LCM == "function");
```

`LCM([2, 4, 8])` should return a number.

```js
assert(typeof LCM([2, 4, 8]) == "number");
```

`LCM([2, 4, 8])` should return `8`.

```js
assert.equal(LCM([2, 4, 8]), 8);
```

`LCM([4, 8, 12])` should return `24`.

```js
assert.equal(LCM([4, 8, 12]), 24);
```

`LCM([3, 4, 5, 12, 40])` should return `120`.

```js
assert.equal(LCM([3, 4, 5, 12, 40]), 120);
```

`LCM([11, 33, 90])` should return `990`.

```js
assert.equal(LCM([11, 33, 90]), 990);
```

`LCM([-50, 25, -45, -18, 90, 447])` should return `67050`.

```js
assert.equal(LCM([-50, 25, -45, -18, 90, 447]), 67050);
```

# --seed--

## --seed-contents--

```js
function LCM(A) {}
```

# --solutions--

```js
function LCM(A) {
  var n = A.length,
    a = Math.abs(A[0]);
  for (var i = 1; i < n; i++) {
    var b = Math.abs(A[i]),
      c = a;
    while (a && b) {
      a > b ? (a %= b) : (b %= a);
    }
    a = Math.abs(c * A[i]) / (a + b);
  }
  return a;
}
```
