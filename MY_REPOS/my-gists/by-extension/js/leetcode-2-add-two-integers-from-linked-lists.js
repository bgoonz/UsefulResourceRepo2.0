const addTwoNumbers = (l1, l2) => {
  if (l1 === null && l2 === null) {
    return null;
  }
  if (l1 === null) return l2;
  if (l2 === null) return l1;

  let n1,
    n2,
    n,
    carry = 0;
  let l = new ListNode(); //our result
  let pl = l; //pointer to run through l

  while (l1 || l2) {
    n1 = l1 === null ? 0 : l1.val;
    n2 = l2 === null ? 0 : l2.val;
    n = n1 + n2 + carry;
    carry = n >= 10 ? 1 : 0;
    n = n % 10;
    pl.val = n;
    //we need to make sure that it's only added if it's not yet the end
    if ((l1 && l1.next) || (l2 && l2.next)) {
      pl.next = new ListNode();
      pl = pl.next;
    }
    if (l1 !== null) l1 = l1.next;
    if (l2 !== null) l2 = l2.next;
  }

  if (carry > 0) pl.next = new ListNode(carry);

  return l;
};
