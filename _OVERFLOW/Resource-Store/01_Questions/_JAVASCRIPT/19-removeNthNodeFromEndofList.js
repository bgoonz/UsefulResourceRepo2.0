/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * key: Two pointers, the distance of two pointer is n, when the second
 * pointer reaches to the end, the first pointer node is the node to be
 * deleted. Be careful when the second pointer reaches the end, first pointer
 * has not moved, then just return the second node as the new head.
 *
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 */
const removeNthFromEnd = (head, n) => {
    let fHead = head;
    let sHead = head;
    let distance = 0;
    while (distance < n) {
        sHead = sHead.next;
        distance++;
    }
    if (!sHead) return fHead.next;
    while (sHead.next) {
        fHead = fHead.next;
        sHead = sHead.next;
    }
    fHead.next = fHead.next.next;
    return head;
};
