---
id: 5a23c84252665b21eecc8046
title: Symmetric difference
challengeType: 5
forumTopicId: 16086
dashedName: symmetric-difference
---

# --description--

Given two [set](https://rosettacode.org/wiki/set)s _A_ and _B_, compute $(A \\setminus B) \\cup (B \\setminus A).$ That is, enumerate the items that are in _A_ or _B_ but not both. This set is called the [symmetric difference](<https://en.wikipedia.org/wiki/Symmetric difference>) of _A_ and _B_. In other words: $(A \\cup B) \\setminus (A \\cap B)$ (the set of items that are in at least one of _A_ or _B_ minus the set of items that are in both _A_ and _B_).

# --instructions--

Write a function that takes two arrays as parameters and returns the symmetric difference. Sort the resultant array before returning it.

# --hints--

`symmetricDifference` should be a function.

```js
assert(typeof symmetricDifference == "function");
```

`symmetricDifference(["John", "Bob", "Mary", "Serena"], ["Jim", "Mary", "John", "Bob"])` should return an array.

```js
assert(
  Array.isArray(
    symmetricDifference(
      ["John", "Bob", "Mary", "Serena"],
      ["Jim", "Mary", "John", "Bob"]
    )
  )
);
```

`symmetricDifference(["John", "Bob", "Mary", "Serena"], ["Jim", "Mary", "John", "Bob"])` should return `["Jim", "Serena"]`.

```js
assert.deepEqual(
  symmetricDifference(
    ["John", "Bob", "Mary", "Serena"],
    ["Jim", "Mary", "John", "Bob"]
  ),
  ["Jim", "Serena"]
);
```

`symmetricDifference([1, 2, 3], [3, 4])` should return `[1, 2, 4]`.

```js
assert.deepEqual(symmetricDifference([1, 2, 3], [3, 4]), [1, 2, 4]);
```

`symmetricDifference([1, 2, 3, 4, 5], [3, 4, 8, 7])` should return `[1, 2, 5, 7, 8]`.

```js
assert.deepEqual(
  symmetricDifference([1, 2, 3, 4, 5], [3, 4, 8, 7]),
  [1, 2, 5, 7, 8]
);
```

`symmetricDifference([1, 2, 3, 4, 5, 6, 7, 8], [1, 3, 5, 6, 7, 8, 9])` should return `[2, 4, 9]`.

```js
assert.deepEqual(
  symmetricDifference([1, 2, 3, 4, 5, 6, 7, 8], [1, 3, 5, 6, 7, 8, 9]),
  [2, 4, 9]
);
```

`symmetricDifference([1, 2, 4, 7, 9], [2, 3, 7, 8, 9])` should return `[1, 3, 4, 8]`.

```js
assert.deepEqual(
  symmetricDifference([1, 2, 4, 7, 9], [2, 3, 7, 8, 9]),
  [1, 3, 4, 8]
);
```

# --seed--

## --seed-contents--

```js
function symmetricDifference(A, B) {}
```

# --solutions--

```js
function symmetricDifference(A, B) {
  function relative_complement(A, B) {
    return A.filter(function (elem) {
      return B.indexOf(elem) == -1;
    });
  }

  function unique(ary) {
    var u = ary.concat().sort();
    for (var i = 1; i < u.length; ) {
      if (u[i - 1] === u[i]) u.splice(i, 1);
      else i++;
    }
    return u;
  }

  return unique(
    relative_complement(A, B).concat(relative_complement(B, A))
  ).sort();
}
```
