const addTwoLists = (l1, l2) => {
  let n1 = 0,
    n2 = 0,
    count = 0;
  while (l1 !== null) {
    n1 += l1.val * Math.pow(10, count);
    l1 = l1.next;
    count++;
  }
  count = 0;
  while (l2 !== null) {
    n2 += l2.val * Math.pow(10, count);
    l2 = l2.next;
    count++;
  }
  return n1 + n2;
};
