def reverseList(head):
    prev, curr = None, head
    while curr:
        prev, curr.next, curr = curr, prev, curr.next
    return prev

def main():
    reverseList(head)

main()