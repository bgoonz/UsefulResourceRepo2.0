/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * Key: set a prev pointer to track the previous node
 * if the first node has the value val, delete it first,
 * then move head to next head.
 *
 * @param {ListNode} head
 * @param {number} val
 * @return {ListNode}
 */
const removeElements = (head, val) => {
    if (!head) return null;
    while (head && head.val === val) head = head.next;
    const headCopy = head;
    let prev = head;
    while (head) {
        head = head.next;
        if (head && head.val === val) prev.next = head.next;
        else prev = head;
    }

    return headCopy;
};
