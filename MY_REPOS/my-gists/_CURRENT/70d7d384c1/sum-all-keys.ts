type BST = {
  key: number;
  value: string;
  left: BST | false;
  right: BST | false;
} | false;

const BST0: BST = false;
const BST1: BST = {
  key: 1,
  value: "abc",
  left: false,
  right: false,
}
const BST4: BST = {
  key: 4,
  value: "dcj",
  left: {
    key: 7,
    value: "ruf",
    left: false,
    right: false,
  },
  right: false,
};
const BST3: BST = {
  key: 3,
  value: "ilk",
  left: BST1,
  right: BST4,
};
const BST42: BST = {
  key: 42,
  value: "ily",
  left: {
    key: 27,
    value: "wit",
    left: {
      key: 14,
      value: "olp",
      left: false,
      right: false,
    },
    right: false,
  },
  right: false,
}
const BST10: BST = {
  key: 10,
  value: "why",
  left: BST3,
  right: BST42,
}

const sumAllKeys = (bst: BST) => {
  if (!bst) return 0;

  return bst.key + sumAllKeys(bst.left) + sumAllKeys(bst.right);
}

assert(sumAllKeys(BST0), 0)
assert(sumAllKeys(BST1), 1)
assert(sumAllKeys(BST4), 11)
assert(sumAllKeys(BST3), 15)
assert(sumAllKeys(BST42), 83)

function assert(testValue: any, expected) {
  return console.info(testValue === expected
    ? 'Passed ✅'
    : `Failed ❌: expected ${expected} but got ${testValue}`);
}
