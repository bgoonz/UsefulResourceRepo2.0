const partition = (head, x) => {
  if (head === null) return head;
  let beforeStart = null,
    beforeEnd = null,
    afterStart = null,
    afterEnd = null;

  while (head) {
    let next = head.next;
    head.next = null;
    if (head.val < x) {
      if (!beforeStart) {
        beforeStart = head;
        beforeEnd = beforeStart;
      } else {
        beforeEnd.next = head;
        beforeEnd = head;
      }
    } else {
      if (!afterStart) {
        afterStart = head;
        afterEnd = afterStart;
      } else {
        afterEnd.next = head;
        afterEnd = head;
      }
    }
    head = next;
  }

  if (!beforeStart) {
    return afterStart;
  }

  beforeEnd.next = afterStart;
  return beforeStart;
};
