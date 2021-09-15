const findKthFromLast = (head, n) => {
  if (!head) return head;
  if (!head.next && n > 0) return [];

  let p = head;
  let pk = head;

  //Move p k elements into the list
  for (let i = 0; i < n; i++) {
    p = p.next;
  }

  //Move both p and pk until p hits end of list
  while (p !== null) {
    p = p.next;
    pk = pk.next;
  }
  return pk;
};
