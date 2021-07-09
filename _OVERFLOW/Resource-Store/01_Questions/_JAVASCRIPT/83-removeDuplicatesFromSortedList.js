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
const deleteDuplicates = head => {
  const origHead = head;
  while (head !== null && head.next !== null) {
    if (head.next.val === head.val) {
      const headNextNext = head.next.next;
      head.next = headNextNext;
    } else {
      head = head.next;
    }
  }

  return origHead;
};
