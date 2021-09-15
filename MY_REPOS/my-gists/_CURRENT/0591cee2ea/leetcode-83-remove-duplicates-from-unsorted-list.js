const removeDuplicates = (head) => {
  let current = head;
  let numList = {};
  numList[current.val] = 1;
  while (current != null && current.next != null) {
    if (numList[current.next.val]) {
      current.next = current.next.next;
    } else {
      current = current.next;
      numList[current.val] = 1;
    }
  }
  return head;
};
