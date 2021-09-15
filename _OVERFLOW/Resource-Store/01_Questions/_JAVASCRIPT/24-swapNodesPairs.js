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
var swapPairs = head => {
    if (!head || !head.next) return head;
    let p = head;
    let pNext = head.next;
    const newHead = pNext;
    while (pNext) {
        p.next = pNext.next;
        pNext.next = p;
        const nextPairHead = p;
        p = p.next;
        if (p) {
            pNext = p.next;
            if (pNext) nextPairHead.next = pNext;
            else nextPairHead.next = p;
        } else {
            pNext = null;
        }
    }

    return newHead;
};

// re write
var swapPairs = head => {
    if (!head || !head.next) return head;
    let p = head;
    let pPrev = head;
    const newHead = head.next;
    while (p) {
        const pNext = p.next;
        if (pNext) {
            pPrev.next = pNext;
            p.next = pNext.next;
            pNext.next = p;
            pPrev = p;
            p = p.next;
        } else {
            break;
        }
    }

    return newHead;
};

// recursion version, clean Code
var swapPairs = head => {
    if (!head || !head.next) return head;
    const p = head;
    const pNext = p.next;
    p.next = swapPairs(pNext.next);
    pNext.next = p;
    return pNext;
};
