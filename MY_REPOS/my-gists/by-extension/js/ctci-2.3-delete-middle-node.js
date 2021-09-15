const removeElements = (head, val) => {
  if (head === null) return head;
  let current = head;
  while (current.next !== null && current.val === val) {
    current = current.next;
  }
  if (!current.next && current.val === val) return [];
  head = current;
  while (current.next !== null) {
    if (current.next.val === val) {
      current.next = current.next.next;
    } else {
      current = current.next;
    }
  }
  return head;
};
