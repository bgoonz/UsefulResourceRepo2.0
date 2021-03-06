/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
var __asyncValues =
  (this && this.__asyncValues) ||
  function (o) {
    if (!Symbol.asyncIterator)
      throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator],
      i;
    return m
      ? m.call(o)
      : ((o =
          typeof __values === "function" ? __values(o) : o[Symbol.iterator]()),
        (i = {}),
        verb("next"),
        verb("throw"),
        verb("return"),
        (i[Symbol.asyncIterator] = function () {
          return this;
        }),
        i);
    function verb(n) {
      i[n] =
        o[n] &&
        function (v) {
          return new Promise(function (resolve, reject) {
            (v = o[n](v)), settle(resolve, reject, v.done, v.value);
          });
        };
    }
    function settle(resolve, reject, d, v) {
      Promise.resolve(v).then(function (v) {
        resolve({ value: v, done: d });
      }, reject);
    }
  };
import { directive, NodePart } from "../lit-html.js";
/**
 * A directive that renders the items of an async iterable[1], appending new
 * values after previous values, similar to the built-in support for iterables.
 *
 * Async iterables are objects with a [Symbol.asyncIterator] method, which
 * returns an iterator who's `next()` method returns a Promise. When a new
 * value is available, the Promise resolves and the value is appended to the
 * Part controlled by the directive. If another value other than this
 * directive has been set on the Part, the iterable will no longer be listened
 * to and new values won't be written to the Part.
 *
 * [1]: https://github.com/tc39/proposal-async-iteration
 *
 * @param value An async iterable
 * @param mapper An optional function that maps from (value, index) to another
 *     value. Useful for generating templates for each item in the iterable.
 */
export const asyncAppend = (value, mapper) =>
  directive(async (part) => {
    var e_1, _a;
    // If we've already set up this particular iterable, we don't need
    // to do anything.
    if (value === part._previousValue) {
      return;
    }
    part._previousValue = value;
    // We keep track of item Parts across iterations, so that we can
    // share marker nodes between consecutive Parts.
    let itemPart;
    let i = 0;
    try {
      for (
        var value_1 = __asyncValues(value), value_1_1;
        (value_1_1 = await value_1.next()), !value_1_1.done;

      ) {
        let v = value_1_1.value;
        // When we get the first value, clear the part. This lets the previous
        // value display until we can replace it.
        if (i === 0) {
          part.clear();
        }
        // Check to make sure that value is the still the current value of
        // the part, and if not bail because a new value owns this part
        if (part._previousValue !== value) {
          break;
        }
        // As a convenience, because functional-programming-style
        // transforms of iterables and async iterables requires a library,
        // we accept a mapper function. This is especially convenient for
        // rendering a template for each item.
        if (mapper !== undefined) {
          v = mapper(v, i);
        }
        // Like with sync iterables, each item induces a Part, so we need
        // to keep track of start and end nodes for the Part.
        // Note: Because these Parts are not updatable like with a sync
        // iterable (if we render a new value, we always clear), it may
        // be possible to optimize away the Parts and just re-use the
        // Part.setValue() logic.
        let itemStartNode = part.startNode;
        // Check to see if we have a previous item and Part
        if (itemPart !== undefined) {
          // Create a new node to separate the previous and next Parts
          itemStartNode = document.createTextNode("");
          // itemPart is currently the Part for the previous item. Set
          // it's endNode to the node we'll use for the next Part's
          // startNode.
          itemPart.endNode = itemStartNode;
          part.endNode.parentNode.insertBefore(itemStartNode, part.endNode);
        }
        itemPart = new NodePart(part.instance, itemStartNode, part.endNode);
        itemPart.setValue(v);
        i++;
      }
    } catch (e_1_1) {
      e_1 = { error: e_1_1 };
    } finally {
      try {
        if (value_1_1 && !value_1_1.done && (_a = value_1.return))
          await _a.call(value_1);
      } finally {
        if (e_1) throw e_1.error;
      }
    }
  });
//# sourceMappingURL=async-append.js.map
