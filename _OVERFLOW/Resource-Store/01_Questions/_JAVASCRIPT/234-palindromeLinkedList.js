/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * Key: find the middle of the list first
 * reverse the second half and then compare it with first half
 * @param {ListNode} head
 * @return {boolean}
 */
const isPalindrome = head => {
    if (!head || !head.next) return true;
    let fastHead = head;
    let slowHead = head;
    while (fastHead.next && fastHead.next.next) {
        slowHead = slowHead.next;
        fastHead = fastHead.next.next;
    }

    // reverse the scond half
    let center = slowHead.next;
    let centerNext = center.next;
    slowHead.next = null;
    center.next = null;
    while (centerNext) {
        const tmp = centerNext.next;
        centerNext.next = center;
        center = centerNext;
        centerNext = tmp;
    }

    while (head && center) {
        if (head.val !== center.val) return false;
        head = head.next;
        center = center.next;
    }

    return true;
};
