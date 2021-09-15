# List Example

{% tabs %}
{% tab title="First Tab" %}
```python
class Node:
    def __init__(self, data):
        self.data = data
        self.next = None
        self.prev = None

class DoubleLinkedList:
    def __init__(self):
        self.length = 0
        self.head = None
        self.tail = None

    def prependNode(self, data):
        newNode = Node(data)
        if self.length == 0:
            self.head = newNode
            self.tail = newNode
            newNode.next = newNode
            newNode.prev = newNode
        else:
            newNode.next = self.head
            newNode.prev = self.head.prev
            self.head.prev.next = newNode
            self.head.next.prev = newNode

            self.head = newNode

        self.length += 1

    def appendNode(self, data):
        newNode = Node(data)
        if self.length == 0:
            self.head = newNode
            self.tail = newNode
            newNode.next = newNode
            newNode.prev = newNode
        else:
            curNode = self.head
            while curNode.next != self.head:
                curNode = curNode.next

            newNode.next = self.head
            newNode.prev = curNode
            curNode.next = newNode
            self.tail = newNode

        self.length += 1

    def printList(self):
        # BUG: Only printing last Node
        if self.length == 0:
            return False
        curNode = self.head
        while curNode.next != self.head:
            print(curNode.data)
            curNode = curNode.next


dLL = DoubleLinkedList()

dLL.prependNode(1)
dLL.prependNode(2)
dLL.prependNode(3)
dLL.prependNode(4)

dLL.printList()


```
{% endtab %}

{% tab title="Doubly-circular-linked-list.py" %}
```python
class Node:
    def __init__(self, data):
        self.data = data
        self.next = None
        self.prev = None

class DoubleLinkedList:
    def __init__(self):
        self.length = 0
        self.head = None
        self.tail = None

    def prependNode(self, data):
        newNode = Node(data)
        if self.length == 0:
            self.head = newNode
            self.tail = newNode
            newNode.next = newNode
            newNode.prev = newNode
        else:
            newNode.next = self.head
            newNode.prev = self.head.prev
            self.head.prev.next = newNode
            self.head.next.prev = newNode

            self.head = newNode

        self.length += 1

    def appendNode(self, data):
        newNode = Node(data)
        if self.length == 0:
            self.head = newNode
            self.tail = newNode
            newNode.next = newNode
            newNode.prev = newNode
        else:
            curNode = self.head
            while curNode.next != self.head:
                curNode = curNode.next

            newNode.next = self.head
            newNode.prev = curNode
            curNode.next = newNode
            self.tail = newNode

        self.length += 1

    def printList(self):
        # BUG: Only printing last Node
        if self.length == 0:
            return False
        curNode = self.head
        while curNode.next != self.head:
            print(curNode.data)
            curNode = curNode.next


dLL = DoubleLinkedList()

dLL.prependNode(1)
dLL.prependNode(2)
dLL.prependNode(3)
dLL.prependNode(4)

dLL.printList()

```
{% endtab %}

{% tab title="Another-single-ll.py" %}
```python
class Node:
    def __init__(self, data):
        self.data = data
        self.next = None

class SingleLinkedList:
    def __init__(self):
        self.length = 0
        self.head = None

    def prependNode(self, data):
        newNode = Node(data)
        newNode.next = self.head
        self.head = newNode
        self.length += 1

    def appendNode(self, data):
        newNode = Node(data)

        if self.length == 0:
            self.head = newNode
            self.length += 1
            return
        else:
            curNode = self.head

            while curNode.next != None:
                curNode = curNode.next

            curNode.next = newNode
            self.length += 1

    def deleteNode(self, data):
        if self.length == 0:
            return false
        curNode = self.head
        if curNode.data == data:
            self.head = self.head.next
            curNode = None
            return True
        curNode = self.head
        while curNode.next != None:
            if curNode.next.data == data:
                deleteNode = curNode.next
                curNode.next = curNode.next.next
                deleteNode.next = None
                self.length -= 1
                return True
            else:
                curNode = curNode.next
        return False

    def deleteAllNodes(self, data):
        if(self.length == 0):
            return
        curNode = self.head
        while self.head.data == data:
            self.head = self.head.next
            curNode.next = null
            curNode = self.head
            self.length -= 1
            if curNode == None:
                return

        while curNode.next != None:
            if curNode.next.data == data:
                deleteNode = curNode.next
                curNode.next = curNode.next.next
                deleteNode.next = None
                self.length -= 1
            else:
                curNode = curNode.next

        return deleted


    def isEmpty(self):
        return True if self.length == 0 else False

    def findNode(self, data):
        curNode = self.head

        while curNode.data != data:
            if curNode.next == None:
                return False
            else:
                curNode = curNode.next

        return curNode

    def getNextNode(self, node):
        if(isinstance(node, Node)):
            return node.next;
        return False

    def printList(self):
        curNode = self.head
        while curNode != None:
            print(curNode.data)
            curNode = curNode.next

sLL = SingleLinkedList()
# sLL.appendNode(1)
# sLL.appendNode(2)
# sLL.prependNode(3)
# sLL.appendNode(4)

# sLL.deleteNode(2)
#
# sLL.printList()

# print('List Length: {}'.format(sLL.length))
# print([ m for m in dir(sLL) if not m.startswith('__')])

```
{% endtab %}
{% endtabs %}



