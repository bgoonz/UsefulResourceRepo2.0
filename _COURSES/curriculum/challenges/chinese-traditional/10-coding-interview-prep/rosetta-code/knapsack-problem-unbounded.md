---
id: 5a23c84252665b21eecc7ed4
title: Knapsack problem/Unbounded
challengeType: 5
forumTopicId: 323655
dashedName: knapsack-problemunbounded
---

# --description--

A traveler gets diverted and has to make an unscheduled stop in what turns out to be Shangri-La. Opting to leave, he is allowed to take as much as he likes of the items available there, so long as it will fit in his knapsack, and he can carry it.

He knows that he can carry no more than a particular value of maximum weight in total; and that the capacity of his knapsack has a limited volume.

Looking just above the bar codes on the items he finds their weights and volumes. He digs out his recent copy of a financial paper and gets the value of each item.

He can only take whole units of any item, but there is much more of any item than he could ever carry.

# --instructions--

Write a function that takes an array of objects, maximum weight, and maximum volume as parameters. Each object has 4 attributes: name, value, weight, and volume. The function should return the maximum value of items the traveller can take with him.

# --hints--

`knapsackUnbounded([{ name:"panacea", value:3000, weight:0.3, volume:0.025 }, { name:"ichor", value:1800, weight:0.2, volume:0.015 }, { name:"gold", value:2500, weight:2, volume:0.002 }], 25, 0.25)` should return `54500`.

```js
assert.equal(
  knapsackUnbounded(
    [
      { name: "panacea", value: 3000, weight: 0.3, volume: 0.025 },
      { name: "ichor", value: 1800, weight: 0.2, volume: 0.015 },
      { name: "gold", value: 2500, weight: 2, volume: 0.002 },
    ],
    25,
    0.25
  ),
  54500
);
```

`knapsackUnbounded([{ name:"panacea", value:3000, weight:0.3, volume:0.025 }, { name:"ichor", value:1800, weight:0.2, volume:0.015 }, { name:"gold", value:2500, weight:2, volume:0.002 }], 55, 0.25)` should return `88400`.

```js
assert.equal(
  knapsackUnbounded(
    [
      { name: "panacea", value: 3000, weight: 0.3, volume: 0.025 },
      { name: "ichor", value: 1800, weight: 0.2, volume: 0.015 },
      { name: "gold", value: 2500, weight: 2, volume: 0.002 },
    ],
    55,
    0.25
  ),
  88400
);
```

`knapsackUnbounded([{ name:"panacea", value:3000, weight:0.3, volume:0.025 }, { name:"ichor", value:1800, weight:0.2, volume:0.015 }, { name:"gold", value:2500, weight:2, volume:0.002 }], 25, 0.15)` should return `42500`.

```js
assert.equal(
  knapsackUnbounded(
    [
      { name: "panacea", value: 3000, weight: 0.3, volume: 0.025 },
      { name: "ichor", value: 1800, weight: 0.2, volume: 0.015 },
      { name: "gold", value: 2500, weight: 2, volume: 0.002 },
    ],
    25,
    0.15
  ),
  42500
);
```

`knapsackUnbounded([{ name:"panacea", value:3000, weight:0.3, volume:0.025 }, { name:"ichor", value:1800, weight:0.2, volume:0.015 }, { name:"gold", value:2500, weight:2, volume:0.002 }], 35, 0.35)` should return `75300`.

```js
assert.equal(
  knapsackUnbounded(
    [
      { name: "panacea", value: 3000, weight: 0.3, volume: 0.025 },
      { name: "ichor", value: 1800, weight: 0.2, volume: 0.015 },
      { name: "gold", value: 2500, weight: 2, volume: 0.002 },
    ],
    35,
    0.35
  ),
  75300
);
```

`knapsackUnbounded([{ name:"panacea", value:3000, weight:0.3, volume:0.025 }, { name:"ichor", value:1800, weight:0.2, volume:0.015 }, { name:"gold", value:2500, weight:2, volume:0.002 }], 15, 0.25)` should return `43200`.

```js
assert.equal(
  knapsackUnbounded(
    [
      { name: "panacea", value: 3000, weight: 0.3, volume: 0.025 },
      { name: "ichor", value: 1800, weight: 0.2, volume: 0.015 },
      { name: "gold", value: 2500, weight: 2, volume: 0.002 },
    ],
    15,
    0.25
  ),
  43200
);
```

# --seed--

## --seed-contents--

```js
function knapsackUnbounded(items, maxweight, maxvolume) {}
```

# --solutions--

```js
function knapsackUnbounded(items, maxweight, maxvolume) {
  var n = items.length;
  var best_value = 0;
  var count = new Array(n);
  var best = new Array(n);
  function recurseKnapsack(i, value, weight, volume) {
    var j, m1, m2, m;
    if (i == n) {
      if (value > best_value) {
        best_value = value;
        for (j = 0; j < n; j++) {
          best[j] = count[j];
        }
      }
      return;
    }
    m1 = Math.floor(weight / items[i].weight);
    m2 = Math.floor(volume / items[i].volume);
    m = m1 < m2 ? m1 : m2;
    for (count[i] = m; count[i] >= 0; count[i]--) {
      recurseKnapsack(
        i + 1,
        value + count[i] * items[i].value,
        weight - count[i] * items[i].weight,
        volume - count[i] * items[i].volume
      );
    }
  }

  recurseKnapsack(0, 0, maxweight, maxvolume);
  return best_value;
}
```
