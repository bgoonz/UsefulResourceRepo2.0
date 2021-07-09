/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
// Iterative way
var reverseList = head => {
  if (head === null || head.next === null)  return head;
  let headNext = head.next;
  head.next = null;
  while (head !== null && headNext !== null) {
    // keep a reference of the headNext's next node
    const tmp = headNext.next;
    headNext.next = head;
    head = headNext;
    headNext = tmp;
  }

  return head;
};

// a more concise solution, prevHead eventually wll be the reversed list head
var reverseList = head => {
    let prevHead = null;
    while (head) {
        const headNext = head.next;
        head.next = prevHead;
        prevHead = head;
        head = headNext;
    }
    return prevHead;
};

// recursive way
var reverseList = head => {
  if (head === null || head.next === null)  return head;
  const headNext = head.next;
  head.next = null;
  const nextReversedListHead = reverseList(headNext);
  // now headNext is the last node of the reversed List on the right of head!!!
  headNext.next = head;

  return nextReversedListHead;
};
