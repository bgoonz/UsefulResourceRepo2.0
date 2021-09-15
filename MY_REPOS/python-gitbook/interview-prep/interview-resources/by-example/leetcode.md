# Algo-Prep

{% tabs %}
{% tab title="LeetCode" %}
```python
```py
# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, x):
#         self.val = x
#         self.next = None

class Solution:
    def addTwoNumbers(self, l1: ListNode, l2: ListNode) -> ListNode:
        c = 0
        res = []
        while(l1 or l2):
            s = 0 + c
            if l1:
                s += int(l1.val)
                l1 = l1.next
            if l2:
                s += int(l2.val)
                l2 = l2.next
            print(s) 
            
            resa = s % 10            
            res.append(resa)
            c = s // 10
            
        if(c!=0):
            res.append(c)
            
        l3 = ListNode(0)
        head = l3
        for i in range(0, len(res)):
            lt = res[i]
            l3.next = ListNode(lt)
            l3 = l3.next
        return head.nextclass Solution:
    def findContentChildren(self, g: List[int], s: List[int]) -> int:
        g = sorted(g)
        s = sorted(s)
        content = 0
        while s and g:
            if s[-1] >= g[-1]:
                s.pop()
                content += 1
            g.pop()
        return content# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, x):
#         self.val = x
#         self.left = None
#         self.right = None

class Solution:
    def convertBST(self, root: TreeNode) -> TreeNode:
        self.ans = 0
        def add(node):
            if not node:
                return
            add(node.right)
            self.ans += node.val
            node.val = self.ans
            add(node.left)
        add(root)
        return root## Recursive Solution
# ------------------------------------------

# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, x):
#         self.val = x
#         self.left = None
#         self.right = None

class Solution:
    def inorderTraversal(self, root: TreeNode) -> List[int]:
        io = []
        
        if(root==None):
            return []
        
        def inorder(x):
            if(x.left!=None):
                inorder(x.left)
            io.append(int(x.val))
            if(x.right!=None):
                inorder(x.right)
                
        inorder(root)
        return io

# ------------------------------------------

## Iterative Solution using Stack
# ------------------------------------------

# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, x):
#         self.val = x
#         self.left = None
#         self.right = None

class Solution:
    def inorderTraversal(self, root: TreeNode) -> List[int]:
        
        if(root==None):
            return []
        stack = []
        io = []
        c = root
        
        while(c!=None or len(stack)!=0):
            while(c!=None):
                stack.append(c)
                c = c.left
            c = stack.pop()
            io.append(c.val)
            c = c.right
        return io
                
            # Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, x):
#         self.val = x
#         self.left = None
#         self.right = None
# ------------------------------------------

## Recursive Solution

class Solution:
    def postorderTraversal(self, root: TreeNode) -> List[int]:
        if (root==None):
            return []
        po = []
        def postorder(x):
            if not x:
                return
            postorder(x.left)
            postorder(x.right)
            po.append(x.val)
        postorder(root)
        return po
# ------------------------------------------

# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, x):
#         self.val = x
#         self.left = None
#         self.right = None
# ------------------------------------------

## Recursive Solution

class Solution:                
    def preorderTraversal(self, root: TreeNode) -> List[int]:
        if(root==None):
            return []
        po = []
        def preorder(x):
            if x:
                po.append(x.val)
                preorder(x.left)
                preorder(x.right)

        preorder(root)
        return po

# ------------------------------------------

## Iterative Solution

class Solution:                
    def preorderTraversal(self, root: TreeNode) -> List[int]:
        if(root==None):
            return []
        stack = []
        po = []
        c = root
        
        while(c!=None or len(stack)!=0):
            while(c!=None):
                stack.append(c)
                po.append(c.val)
                c = c.left                
            c = stack.pop()
            c = c.right
        return po
            class Solution:
    def backspaceCompare(self, S: str, T: str) -> bool:
        def deleteBackSpace(X):
            stack = []
            for i in X:
                if not i=='#':
                    stack.append(i)
                elif(len(stack)==0):
                    continue
                else:
                    stack.pop()
            return stack
        return deleteBackSpace(S)==deleteBackSpace(T)# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, x):
#         self.val = x
#         self.left = None
#         self.right = None

class Solution:
    def balanceBST(self, root: TreeNode) -> TreeNode:
        result = []
        
        def inorder(node):
            if node:
                if node.left!=None:
                    inorder(node.left)
                result.append(int(node.val))
                if node.right!=None:
                    inorder(node.right)
                    
        def constructBalancedTree(arr):
            if not arr:
                return None
            mid = len(arr)//2
            root = TreeNode(arr[mid])
            root.left = constructBalancedTree(arr[:mid])
            root.right = constructBalancedTree(arr[mid+1:])
            return root
        
        inorder(root)
        # result = [int(x.val) for x in result]
        return constructBalancedTree(result)class Solution:
    def maxProfit(self, prices: List[int]) -> int:
        profit = 0
        for i in range(0, len(prices)-1):
            if(prices[i+1] > prices[i]):
                profit += prices[i+1] - prices[i]
        return profitimport math
class Solution:
    def rangeBitwiseAnd(self, m: int, n: int) -> int:
        ans = m
        if not m==0:
            x = math.log2(m)
            x = int(x)+1
            x = 2**x
        else:
            return 0
        if(n>=x):
            return 0
        for i in range(m+1, n+1):
            ans = ans & i   
        return ansfrom collections import Counter
class Solution:
    def count(self, d1, d2):
        s = 0
        for i in 'abcdefghijklmnopqrstuvwxyz':
            s += d1[i] - d2[i]
            if s < 0:
                return False
        return True
    
    def checkIfCanBreak(self, s1: str, s2: str) -> bool:
        d1 = Counter(s1)
        d2 = Counter(s2)
        return self.count(d1, d2) | self.count(d2, d1)class Solution:
    def maxArea(self, height: List[int]) -> int:
        i = 0
        j = len(height)-1
        maxarea = 0
        while(i!=j):
            a = (j-i)*(min(height[i], height[j]))
            if(a>maxarea):
                maxarea = a
            if(height[i]>height[j]):
                j -= 1
            else:
                i += 1
        return maxareaclass Solution:
    def containsDuplicate(self, nums: List[int]) -> bool:
        return not len(nums) == len(set(nums))class Solution:
    def findMaxLength(self, nums: List[int]) -> int:
        dic = { 0:-1 }
        ps = 0
        max_length = 0
        for idx, number in enumerate(nums):
            if number:
                ps += 1
            else:
                ps -= 1
            if ps in dic:
                max_length = max(max_length, idx-dic[ps])
            else:
                dic[ps] = idx
        return max_length# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, x):
#         self.val = x
#         self.left = None
#         self.right = None

class Solution:
    def countNodes(self, root: TreeNode) -> int:
        if not root:
            return 0
        self.c = 0
        def count(node):
            if node:
                if node.left:
                    count(node.left)
                if node.right:
                    count(node.right)
                self.c += 1
            return self.c
        
        count(root)
        return self.cclass Solution:
    def countBits(self, num: int) -> List[int]:
        ans = [0]
        offset = 1
        for i in range(1, num+1):
            if(offset*2 == i):
                offset = i
            ans.append(ans[i-offset]+1)
        return ansclass Solution:
    def countElements(self, arr: List[int]) -> int:
        s = set()
        s = set(arr)
        c = 0
        for i in range(len(arr)):
            if(arr[i]+1 in s):
                c += 1
        return cfrom collections import deque
class Solution:
    def canFinish(self, numCourses, prerequisites) -> bool:
        adjList = [[] for _ in range(numCourses)]
        inDegree = [0 for _ in range(numCourses)]
        queue = deque()
        visited = 0
        for i in range(len(prerequisites)):
            adjList[prerequisites[i][0]].append(prerequisites[i][1])
        for i in range(numCourses):
            for j in adjList[i]:
                inDegree[j] += 1
        for i in range(len(inDegree)):
            if inDegree[i] == 0:
                queue.append(i)
        while queue:
            el = queue.popleft()
            for i in adjList[el]:
                inDegree[i] -= 1
                if inDegree[i] == 0:
                    queue.append(i)
            visited += 1
        if visited == numCourses:
            return True
        else:
            return Falseclass Solution:
    def minDeletionSize(self, A: List[str]) -> int:
        s = 0
        for col in zip(*A):
            if any(col[i] > col[i+1] for i in range(len(col)-1)):
                s += 1
        return sclass Solution:
    def deleteNode(self, root, key):
        if not root:
            return
        if key > root.val:
            root.right = self.deleteNode(root.right, key)
        elif key < root.val:
            root.left = self.deleteNode(root.left, key)
        else:
            if not root.left:
                return root.right
            else:
                temp = root.left
                while temp.right:
                    temp = temp.right
                root.val = temp.val
                root.left = self.deleteNode(root.left, temp.val)
        return root# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, x):
#         self.val = x
#         self.next = None

class Solution:
    def deleteNode(self, node):
        node.val = node.next.val
        node.next = node.next.nextclass MyCircularDeque:

    def __init__(self, k: int):
        """
        Initialize your data structure here. Set the size of the deque to be k.
        """
        self.maxsize = k
        self.size = 0
        self.decq = [0]*k
        self.front = self.rear = -1

    def insertFront(self, value: int) -> bool:
        """
        Adds an item at the front of Deque. Return true if the operation is successful.
        """
        if self.size == self.maxsize:
            return False
        else:
            if self.front == -1:
                self.front = self.rear = 0
            else:
                self.front = (self.front-1)%self.maxsize
            self.decq[self.front] = value
            self.size += 1
            return True

    def insertLast(self, value: int) -> bool:
        """
        Adds an item at the rear of Deque. Return true if the operation is successful.
        """
        if self.size == self.maxsize:
            return False
        else:
            if self.rear == -1:
                self.front = self.rear = 0
            else:
                self.rear = (self.rear+1)%self.maxsize
            self.decq[self.rear] = value
            self.size += 1
            return True

    def deleteFront(self) -> bool:
        """
        Deletes an item from the front of Deque. Return true if the operation is successful.
        """
        if self.size == 0:
            return False
        else:
            if self.front == self.rear:
                self.front = self.rear = -1
            else:
                self.decq[self.front] = 0
                self.front = (self.front+1)%self.maxsize
            self.size -= 1
            return True                

    def deleteLast(self) -> bool:
        """
        Deletes an item from the rear of Deque. Return true if the operation is successful.
        """
        if self.size == 0:
            return False
        else:
            if self.front == self.rear:
                self.front = self.rear = -1
            else:
                self.decq[self.rear] = 0
                self.rear = (self.rear-1)%self.maxsize
            self.size -= 1
            return True       

    def getFront(self) -> int:
        """
        Get the front item from the deque.
        """
        return self.decq[self.front] if self.size != 0 else -1

    def getRear(self) -> int:
        """
        Get the last item from the deque.
        """
        return self.decq[self.rear] if self.size != 0 else -1

    def isEmpty(self) -> bool:
        """
        Checks whether the circular deque is empty or not.
        """
        return self.size == 0

    def isFull(self) -> bool:
        """
        Checks whether the circular deque is full or not.
        """
        return self.size == self.maxsize

# ------------------------------------------

# Your MyCircularDeque object will be instantiated and called as such:
# obj = MyCircularDeque(k)
# param_1 = obj.insertFront(value)
# param_2 = obj.insertLast(value)
# param_3 = obj.deleteFront()
# param_4 = obj.deleteLast()
# param_5 = obj.getFront()
# param_6 = obj.getRear()
# param_7 = obj.isEmpty()
# param_8 = obj.isFull()
# ------------------------------------------

# Another Optimized Solution
class MyCircularDeque:

    def __init__(self, k: int):
        """
        Initialize your data structure here. Set the size of the deque to be k.
        """
        self.decq = []
        self.maxsize = k

    def insertFront(self, value: int) -> bool:
        """
        Adds an item at the front of Deque. Return true if the operation is successful.
        """
        if len(self.decq) < self.maxsize:
            self.decq.append(value)
            return True

    def insertLast(self, value: int) -> bool:
        """
        Adds an item at the rear of Deque. Return true if the operation is successful.
        """
        if len(self.decq) < self.maxsize:
            self.decq.insert(0, value)
            return True

    def deleteFront(self) -> bool:
        """
        Deletes an item from the front of Deque. Return true if the operation is successful.
        """
        if self.decq:
            self.decq.pop()
            return True

    def deleteLast(self) -> bool:
        """
        Deletes an item from the rear of Deque. Return true if the operation is successful.
        """
        if self.decq:
            del self.decq[0]
            return True

    def getFront(self) -> int:
        """
        Get the front item from the deque.
        """
        return self.decq[-1] if self.decq else -1

    def getRear(self) -> int:
        """
        Get the last item from the deque.
        """
        return self.decq[0] if self.decq else -1

    def isEmpty(self) -> bool:
        """
        Checks whether the circular deque is empty or not.
        """
        return len(self.decq)==0

    def isFull(self) -> bool:
        """
        Checks whether the circular deque is full or not.
        """
        return len(self.decq)==self.maxsize

# ------------------------------------------

# Your MyCircularDeque object will be instantiated and called as such:
# obj = MyCircularDeque(k)
# param_1 = obj.insertFront(value)
# param_2 = obj.insertLast(value)
# param_3 = obj.deleteFront()
# param_4 = obj.deleteLast()
# param_5 = obj.getFront()
# param_6 = obj.getRear()
# param_7 = obj.isEmpty()
# param_8 = obj.isFull()class MyCircularQueue:

    def __init__(self, k: int):
        self.size = 0
        self.maxsize = k
        self.cq = [0]*k   
        self.front = self.rear = -1

    def enQueue(self, value: int) -> bool:
        if self.size == self.maxsize:
            return False
        else:
            if self.rear == -1:
                self.rear = self.front = 0
            else:
                self.rear = (self.rear+1)%self.maxsize
            self.cq[self.rear] = value
            self.size += 1
            return True
        
    def deQueue(self) -> bool:
        if self.size == 0:
            return False
        if self.front == self.rear:
            self.front = self.rear = -1
        else:
            self.front = (self.front+1)%self.maxsize
        self.size -= 1
        return True

    def Front(self) -> int:
        return self.cq[self.front] if self.size!=0 else -1

    def Rear(self) -> int:
        return self.cq[self.rear] if self.size!=0 else -1

    def isEmpty(self) -> bool:
        return self.size == 0        

    def isFull(self) -> bool:
        return self.size == self.maxsize

# ------------------------------------------

# Your MyCircularQueue object will be instantiated and called as such:
# obj = MyCircularQueue(k)
# param_1 = obj.enQueue(value)
# param_2 = obj.deQueue()
# param_3 = obj.Front()
# param_4 = obj.Rear()
# param_5 = obj.isEmpty()
# param_6 = obj.isFull()# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, x):
#         self.val = x
#         self.left = None
#         self.right = None

class Solution:
    def diameterOfBinaryTree(self, root: TreeNode) -> int:
        
        self.depth = 1
        def findDepth(first):
            if not first:
                return 0
            ld = findDepth(first.left)
            rd = findDepth(first.right)
            self.depth = max(self.depth, ld+rd+1)
            return max(ld,rd) + 1
        
        findDepth(root)
        return self.depth - 1class Solution:
    def trailingZeroes(self, n: int) -> int:
        count = 0
        m = 5
        while (n/m >= 1):
            count += int(n/m)
            m *= 5
        return count        # Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def findBottomLeftValue(self, root: TreeNode) -> int:
        queue = deque([root])
        visited = set()
        while queue:
            size = len(queue)
            leftmost = math.inf
            for i in range(size):
                node = queue.popleft()
                if leftmost == math.inf:
                    leftmost = node.val
                if node.left:
                    queue.append(node.left)
                if node.right:
                    queue.append(node.right)
            if not queue:
                return leftmost
        return 0# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, x):
#         self.val = x
#         self.left = None
#         self.right = None

class Solution:
    def findDuplicateSubtrees(self, root: TreeNode) -> List[TreeNode]:
        tree = collections.defaultdict()
        tree.default_factory = tree.__len__
        c = collections.Counter()
        anslist = []
        def find(node):
            if node:
                tid = tree[node.val, find(node.left), find(node.right)]
                c[tid] += 1
                if c[tid] == 2:
                    anslist.append(node)
                return tid
        
        find(root)
        return anslistfrom collections import Counter
class Solution:
    def firstUniqChar(self, s: str) -> int:
        c = Counter(s)
        for i in range(len(s)):
            if c[s[i]] == 1:
                return i
        return -1class Solution:
    def fizzBuzz(self, n: int) -> List[str]:
        res = []
        for i in range(1, n+1):
            if i % 3 == 0 and i % 5 == 0:
                res.append("FizzBuzz")
            elif i % 3 == 0:
                res.append("Fizz")
            elif i % 5 == 0:
                res.append("Buzz")
            else:
                res.append(str(i))
        return resimport collections
class Solution:
    def groupAnagrams(self, strs: List[str]) -> List[List[str]]:
        word = collections.defaultdict(list)
        for s in strs:
            word[tuple(sorted(s))].append(s)
        return word.values()class MyQueue:

    def __init__(self):
        """
        Initialize your data structure here.
        """
        self.s1 = []
        self.s2 = []

    def push(self, x: int) -> None:
        """
        Push element x to the back of queue.
        """
        self.s1.append(x)

    def pop(self) -> int:
        """
        Removes the element from in front of queue and returns that element.
        """
        while len(self.s1) > 1:
            self.s2.append(self.s1.pop())
        temp = self.s1.pop()
        while len(self.s2):
            self.s1.append(self.s2.pop())
        return temp

    def peek(self) -> int:
        """
        Get the front element.
        """
        return self.s1[0]

    def empty(self) -> bool:
        """
        Returns whether the queue is empty.
        """
        return False if len(self.s1) else True

# ------------------------------------------

# Your MyQueue object will be instantiated and called as such:
# obj = MyQueue()
# obj.push(x)
# param_2 = obj.pop()
# param_3 = obj.peek()
# param_4 = obj.empty()## Implementation Using queue.Queue()
## Faster than 67%

from queue import Queue
class MyStack:

    def __init__(self):
        """
        Initialize your data structure here.
        """
        self.q1 = Queue(maxsize=0)
        self.q2 = Queue(maxsize=0)

    def push(self, x: int) -> None:
        """
        Push element x onto stack.
        """
        self.q1.put(x)

    def pop(self) -> int:
        """
        Removes the element on top of the stack and returns that element.
        """
        while(self.q1.qsize()>1):
            self.q2.put(self.q1.get())
        temp = self.q1.get()
        while(self.q2.qsize()>0):
            self.q1.put(self.q2.get())
        return temp

    def top(self) -> int:
        """
        Get the top element.
        """
        while(self.q1.qsize()>1):
            self.q2.put(self.q1.get())
        temp = self.q1.get()
        while(self.q2.qsize()>0):
            self.q1.put(self.q2.get())
        self.q1.put(temp)
        return temp

    def empty(self) -> bool:
        """
        Returns whether the stack is empty.
        """
        return self.q1.empty()
# ------------------------------------------

## Implementation using Deque
## Faster than 100%

from collections import deque
class MyStack:

    def __init__(self):
        """
        Initialize your data structure here.
        """
        self.q = deque()

    def push(self, x: int) -> None:
        """
        Push element x onto stack.
        """
        self.q.append(x)

    def pop(self) -> int:
        """
        Removes the element on top of the stack and returns that element.
        """
        return self.q.pop()

    def top(self) -> int:
        """
        Get the top element.
        """
        temp = self.q.pop()
        self.q.append(temp)
        return temp

    def empty(self) -> bool:
        """
        Returns whether the stack is empty.
        """
        return False if len(self.q) else True
# ------------------------------------------

# Your MyStack object will be instantiated and called as such:
# obj = MyStack()
# obj.push(x)
# param_2 = obj.pop()
# param_3 = obj.top()
# param_4 = obj.empty()class CustomStack:

    def __init__(self, maxSize: int):
        self.stack = []
        self.maxSize = maxSize

    def push(self, x: int) -> None:
        if(len(self.stack) < self.maxSize):
            self.stack.append(x)

    def pop(self) -> int:
        if(len(self.stack)!=0):
            return self.stack.pop()
        else:
            return -1    

    def increment(self, k: int, val: int) -> None:
        for i in range(min(k, len(self.stack))):
            self.stack[i] += val        

# ------------------------------------------

# Your CustomStack object will be instantiated and called as such:
# obj = CustomStack(maxSize)
# obj.push(x)
# param_2 = obj.pop()
# obj.increment(k,val)import math
class Solution:
    def integerReplacement(self, n: int) -> int:
        s = 0
        while(n!=1):
            if(n%2==0):
                n //= 2
                s += 1
                continue
            if(n==3):
                return s+2
            else:
                if(math.ceil(math.log2(n-1))==math.floor(math.log2(n-1))):
                    n -= 1
                elif((math.ceil(math.log2(n+1))==math.floor(math.log2(n+1))) or ((n+1)%4==0)):
                    n += 1
                else:
                    n -= 1
                s += 1
        return sclass Solution:
    def intToRoman(self, num: int) -> str:
        dic = { 1000:'M', 900:'CM', 500:'D', 400:'CD', 100:'C', 90:'XC', 50:'L', 40:'XL', 10:'X', 9:'IX', 5:'V', 4:'IV', 1:'I' }
        ans = ''
        for i in dic:
            while num>=i:
                ans += dic[i]
                num -= i
        return ansclass Solution:
    def intersect(self, nums1: List[int], nums2: List[int]) -> List[int]:
        if len(nums1) > len(nums2):
            i = 0
            while i < len(nums2):
                if nums2[i] in set(nums1):
                    nums1.remove(nums2[i])
                    i += 1 
                else:
                    nums2.remove(nums2[i])
            return nums2
        else:
            i = 0
            while i < len(nums1):
                if nums1[i] in set(nums2):
                    nums2.remove(nums1[i])
                    i += 1 
                else:
                    nums1.remove(nums1[i])
            return nums1
# ------------------------------------------

# Alternate Approach

from collections import Counter
class Solution:
    def intersect(self, nums1: List[int], nums2: List[int]) -> List[int]:
        return list((Counter(nums1)&Counter(nums2)).elements())# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def invertTree(self, root: TreeNode) -> TreeNode:
        def invert(node):
            if node.left:
                invert(node.left)
            if node.right:
                invert(node.right)
            temp = node.left
            node.left = node.right
            node.right = temp
        if root:
            invert(root)
        return rootclass Solution: 
    def isSubsequence(self, s: str, t: str) -> bool:
        if len(s) == 0:
            return True
        if len(t) == 0:
            return False
        sp = 0 
        for tc in t:
            if s[sp] == tc:
                sp += 1
                if sp == len(s):
                    return True 
        return Falseclass Solution:
    def lastStoneWeight(self, stones: List[int]) -> int:
        while(len(stones)!=1 and len(stones)!=0):
            stones = sorted(stones)
            t = abs(stones[-1]-stones[-2])
            if(t!=0):
                stones.pop()
                stones[-1] = t
            else:
                stones.pop()
                stones.pop()
        if(stones):
            return stones[0]
        return 0class Solution:
    def lemonadeChange(self, bills: List[int]) -> bool:
        denom = {
            5: 0,
            10: 0,
            20: 0
        }
        for i in range(len(bills)):
            denom[bills[i]] += 1
            if bills[i] > 5:
                bal = bills[i] - 5
                if bal % 5 == 0 and bal % 10 != 0:
                    if denom[5] > 0:
                        denom[5] -= 1
                        bal -= 5
                        if bal == 0:
                            continue
                if bal % 10 == 0 and bal % 20 != 0:
                    if denom[10] > 0:
                        denom[10] -= 1
                        bal -= 10
                        if bal == 0:
                            continue                
                if denom[5] > 1:
                    denom[5] -= 2
                    bal -= 10
                    if bal == 0:
                        continue
                if bal > 0:
                    return False
        return Trueclass Solution:
    def longestCommonPrefix(self, strs: List[str]) -> str:
        x = 0
        for i in zip(*strs):
            r = all(a == i[0] for a in i)
            if r:
                x += 1
            else:
                break
        return strs[0][0:x] if x else ''class Solution:
    def largestSumAfterKNegations(self, A: List[int], K: int) -> int:
        A = sorted(A)
        for i in range(len(A)):
            if A[i] < 0:
                A[i] = -A[i]
                K -= 1
            elif A[i] >= 0:
                if K % 2 == 0:
                    break
                else:
                    A[A.index(min(A))] = -A[A.index(min(A))]
                    break
            if K == 0:
                break
        return sum(A)          # Definition for singly-linked list.
# class ListNode:
#     def __init__(self, x):
#         self.val = x
#         self.next = None

class Solution:
    def mergeTwoLists(self, l1: ListNode, l2: ListNode) -> ListNode:
        dummy = l3 = ListNode(0)
        while l1 and l2:
            if l1.val > l2.val:
                l3.next = ListNode(l2.val)
                l3 = l3.next
                l2 = l2.next
            else:
                l3.next = ListNode(l1.val)
                l3 = l3.next
                l1 = l1.next
        while l1:
            l3.next = ListNode(l1.val)
            l3 = l3.next
            l1 = l1.next
        while l2:
            l3.next = ListNode(l2.val)
            l3 = l3.next
            l2 = l2.next
        return dummy.next
# ------------------------------------------

# Slightly More Optimized
# ------------------------------------------

# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next
class Solution:
    def mergeTwoLists(self, l1: ListNode, l2: ListNode) -> ListNode:
        head = l3 = ListNode()
        while l1 and l2:
            if l1.val < l2.val:
                l3.next = ListNode(l1.val)
                l1 = l1.next
                l3 = l3.next
            else:
                l3.next = ListNode(l2.val)
                l2 = l2.next
                l3 = l3.next
        l3.next = l1 or l2
        return head.next# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, x):
#         self.val = x
#         self.next = None

class Solution:
    def middleNode(self, head: ListNode) -> ListNode:
        A = [head]
        while A[-1].next:
            A.append(A[-1].next)
        return A[len(A)//2]
# ------------------------------------------

# Solution using Slow and Fast Pointers

class Solution:
    def middleNode(self, head: ListNode) -> ListNode:
        slowPointer = head
        fastPointer = head
        
        while(fastPointer and fastPointer.next):
            
            slowPointer = slowPointer.next
            fastPointer = fastPointer.next.next
            
        return slowPointer        import math
class MinStack:

    def __init__(self):
        """
        initialize your data structure here.
        """
        self.stack = []
        self.min = math.inf

    def push(self, x: int) -> None:
        self.x = x
        self.stack.append(x)
        if(x < self.min):
            self.min = x               
            
    def pop(self) -> None:
        t = self.stack.pop()
        if(t==self.min and len(self.stack)):
            self.min = min(self.stack)   
        elif(t==self.min and not len(self.stack)):
            self.min = math.inf

    def top(self) -> int:
        return self.stack[-1]        

    def getMin(self) -> int:
        return self.min     
# ------------------------------------------

# Your MinStack object will be instantiated and called as such:
# obj = MinStack()
# obj.push(x)
# obj.pop()
# param_3 = obj.top()
# param_4 = obj.getMin()class Solution:
    def minSubsequence(self, nums: List[int]) -> List[int]:
        nums = sorted(nums)[::-1]
        x = sum(nums)
        s = 0
        if len(nums) == 1:
            return nums
        for i in range(len(nums)+1):
            s += nums[i]
            if s > x-s:
                return nums[0:i+1]class Solution:
    def isMonotonic(self, A: List[int]) -> bool:
        inc = True
        dec = True
        for i in range(0, len(A)-1):
            if(A[i] > A[i+1]):
                inc = False
            if(A[i] < A[i+1]):
                dec = False
        return inc or dec
            class Solution:
    def moveZeroes(self, nums: List[int]) -> None:
        """
        Do not return anything, modify nums in-place instead.
        """
        t = nums.count(0)
        nzpos = 0
        if(t==0):
            return nums
        for i in range(0, len(nums)):
            if(nums[i]!=0):
                nums[nzpos] = nums[i]
                nzpos = nzpos+1
        for i in range(len(nums)-t, len(nums)):
            nums[i] = 0             from collections import deque
class Solution:
    def numIslands(self, grid) -> int:
        if not grid:
            return 0
        r = len(grid)
        c = len(grid[0])
        queue = deque()
        islands = 0
        for i in range(r):
            for j in range(c):
                if grid[i][j] == '1':
                    islands += 1
                    grid[i][j] = '0'
                    queue.append([i, j])
                    while queue:
                        el = queue.popleft()
                        rs = el[0]
                        cs = el[1]
                        if rs - 1 >= 0 and grid[rs-1][cs] == '1':
                            queue.append([rs-1, cs])
                            grid[rs-1][cs] = '0'
                        if rs + 1 < r and grid[rs+1][cs] == '1':
                            queue.append([rs+1, cs])
                            grid[rs+1][cs] = '0'
                        if cs - 1 >= 0 and grid[rs][cs-1] == '1':
                            queue.append([rs, cs-1])
                            grid[rs][cs-1] = '0'
                        if cs + 1 < c and grid[rs][cs+1] == '1':
                            queue.append([rs, cs+1])
                            grid[rs][cs+1] = '0'
        return islandsclass RecentCounter:
    def __init__(self):
        self.q = collections.deque()
    def ping(self, t: int) -> int:
        self.q.append(t)
        while self.q[0] < t-3000:
            self.q.popleft()
        return len(self.q)class Solution:
    def hammingWeight(self, n: int) -> int:
        return (bin(n).count('1'))# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next
class Solution1:
    def isPalindrome(self, head: ListNode) -> bool:
        temp = head
        stack = []
        l = 0
        while temp:
            l += 1
            temp = temp.next
        temp = head
        for i in range(0, l//2):
            stack.append(temp.val)
            temp = temp.next
        if l % 2 != 0:
            temp = temp.next
        for i in range(0, l//2):
            if temp.val == stack.pop():
                continue
            return False
        return True
# ------------------------------------------

# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next
class Solution2:
    def isPalindrome(self, head: ListNode) -> bool:
        el = []
        while head:
            el.append(head.val)
            head = head.next
        for i in range(0, len(el)//2):
            if not el[i] == el[-i-1]:
                return False
        return Trueclass Solution:
    def isPalindrome(self, x: int) -> bool:
        a = []
        x = str(x)
        x = list(x)
        a = x[::-1]
        if (str(a)==str(x)):
            return True
        else:
            return False"""
This first solution uses the interval splitting method
This is achieved by using a dp table.
Time Complexity: O(n^1.5)
"""
class Solution1:
    def numSquares(self, n) -> int:
        if n <= 3:
            return n
        dp = [0 for _ in range(n+1)]
        dp[1], dp[2], dp[3] = 1, 2, 3
        for i in range(4, len(dp)):
            dp[i] = i
            j = 1
            while j*j <= i:
                dp[i] = min(dp[i], 1 + dp[i - j*j])
                j += 1
        return dp[-1]

"""
Lagrange's 4 square and 3 square theorem

Theorem: Every natural number can be represented as the sum of 4 integer squares.
N = a^2 + b^2 + c^2 + d^2

Theorem: A natural number can be represented as sum of 3 squares of integers.
N = a^2 + b^2 + c^2

if and only if the N is not of the form,

N = 4^a (8b + 7) -- (1)

LOGIC: 
- if N is a perfect square, return 1
- if N is of form (1),
    - keep dividing by 4
    - divide by 8
        - if rem == 7:
            return 4
- check if N can be split into two perfect squares. If yes, return 2
- if all fails, return 3
"""

class Solution:
    def numSquares(self, n: int) -> int:
        if ceil(sqrt(n)) == floor(sqrt(n)):
            return 1
        
        while n % 4 == 0:
            n /= 4
        if n % 8 == 7:
            return 4
        
        j = 1
        while j*j <= n:
            if ceil(sqrt(n - j*j)) == floor(sqrt(n - j*j)):
                return 2
            j += 1
        
        else:
            return 3class Solution:
    def stringShift(self, s: str, shift: List[List[int]]) -> str:
        amount = 0
        for i in range(len(shift)):
            if(shift[i][0]==0):
                amount += (-1)*shift[i][1]
            else:
                amount += 1*shift[i][1]
        print(amount)
        if amount == 0:
            return s
        elif amount < 0:
            return s[(abs(amount)%len(s)):] + s[0:(abs(amount)%len(s))]
        else:
            return s[len(s)-(amount%len(s)):] + s[0:len(s)-(amount%len(s))]class Solution:
    def plusOne(self, digits: List[int]) -> List[int]:
        carry = 0
        for i in range(len(digits)-1, -1, -1):
            if digits[i] != 9:
                digits[i] += 1
                break
            else:
                digits[i] = 0
                if i == 0:
                    digits.insert(0, 1)
        return digitsclass Solution:
    def isPowerOfThree(self, n: int) -> bool:
        if n < 1:
            return False
        if n == 1:
            return True
        if sum(list(map(int, str(n)))) % 3 != 0:
            return False
        else:
            while n > 1:
                if n % 3 == 0:
                    n /= 3
                else:
                    return False
        if n != 1:
            return False
        else:
            return True
# ------------------------------------------

# Alternate Approach
class Solution:
    def isPowerOfThree(self, n: int) -> bool:
        if n < 1:
            return False
        else:
            return 1162261467 % n == 0# Classic Solution
class Solution:
    def isPowerOfTwo(self, n: int) -> bool:
        if n == 1:
            return True
        if n == 0:
            return False
        while n % 2 == 0:
            n = n / 2
        if n == 1:
            return True
        else:
            return False
# ------------------------------------------

# Solution Using Bit Manipulation
class Solution:
    def isPowerOfTwo(self, n: int) -> bool:
        return n > 0 and bin(n).count('1') == 1class Solution:
    def reconstructQueue(self, people: List[List[int]]) -> List[List[int]]:
        people.sort(key = lambda x: (-x[0], x[1]))
        rec = []
        for p in people:
            rec.insert(p[1], p)
        return recfrom random import choices
class Solution:

    def __init__(self, w: List[int]):
        self.w = w

    def pickIndex(self) -> int:
        return choices(range(len(self.w)), self.w)[0]
# ------------------------------------------

# Your Solution object will be instantiated and called as such:
# obj = Solution(w)
# param_1 = obj.pickIndex()class Solution:
    def removeDuplicates(self, nums: List[int]) -> int:
        p = 0
        while p < len(nums)-1:
            if nums[p] == nums[p+1]:
                nums.pop(p+1)
                continue
            p += 1
        return len(nums)# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, x):
#         self.val = x
#         self.next = None

class Solution:
    def removeElements(self, head: ListNode, val: int) -> ListNode:
        pointer = ListNode(0)
        pointer.next = head
        
        tempnode = pointer
        while tempnode.next != None:
            if tempnode.next.val == val:
                tempnode.next = tempnode.next.next
            else:
                tempnode = tempnode.next
        return pointer.next# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, x):
#         self.val = x
#         self.next = None

class Solution:
    def removeNthFromEnd(self, head: ListNode, n: int) -> ListNode:
        tail = head
        length = 1
        while tail.next:
            length += 1
            tail = tail.next
        if(length==1):
            return None
        if(length==n):
            return head.next
        tempnode = head
        for _ in range(0, length-n-1):
            tempnode = tempnode.next
        tempnode.next = tempnode.next.next
        return head
# ------------------------------------------

# One Pass
# ------------------------------------------

# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next
class Solution:
    def removeNthFromEnd(self, head: ListNode, n: int) -> ListNode:
        dummy = fast = slow = ListNode()
        dummy.next = head
        if not head.next:
            return None 
        for _ in range(n+1):
            fast = fast.next
        while fast:
            fast = fast.next
            slow = slow.next
        slow.next = slow.next.next
        return dummy.nextclass Solution:
    def reorganizeString(self, S: str) -> str:
        l = len(S)
        A = []
        for k, v in sorted((S.count(x), x) for x in set(S)):
            if k > (l+1) / 2 : 
                return ""
            A.extend(k * v)
        # print(A)
        ans = [None] * l
        ans[::2], ans[1::2] = A[(l//2) : ], A[: (l//2)]
        return ''.join(ans)class Solution:
    def findRepeatedDnaSequences(self, s: str) -> List[str]:
        dic = {}
        ans = []
        for i in range(0, len(s)-9):
            if s[i:i+10] not in dic:
                dic[s[i:i+10]] = 1
            else:
                dic[s[i:i+10]] += 1
        for k, v in dic.items():
            if v>1:
                ans.append(k)
        return ansclass Solution:
    def reverseBits(self, n: int) -> int:
        s = str(bin(n))
        s = s[2:]
        s = '0'*(32-len(s)) + s
        s = int(s[::-1], 2)
        return sclass Solution:
    def reverse(self, x: int) -> int:
        x = str(x)
        if (x[0] == '-'):
            a = x[1:2147483648:1]
            a = a[::-1]
            if (int(a)>2147483648):
                return 0
            return int("-"+a)
        else:
            a = x[::-1]
            if (int(a)>2147483647):
                return 0
            return int(a)# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, x):
#         self.val = x
#         self.next = None

class Solution:
    def reverseList(self, head: ListNode) -> ListNode:
        temp = head
        prev = None
        
        while(temp!=None):
            next = temp.next
            temp.next = prev
            prev = temp
            temp = next            
        return prevclass Solution:
    def reverseString(self, s: List[str]) -> None:
        """
        Do not return anything, modify s in-place instead.
        """
        head = 0
        temp = ''
        tail = len(s) - 1
        while head < tail:
            temp = s[head]
            s[head] = s[tail]
            s[tail] = temp
            head += 1
            tail -= 1class Solution:
    def reverseParentheses(self, s: str) -> str:
        stack = []
        s = list(s)
        for i in range(len(s)):
            if s[i] == '(':
                stack.append(i)
                continue
            if s[i] == ')':
                idx = stack.pop()
                s[idx+1 : i] = s[idx+1 : i][::-1]
        ans = ""
        for i in s:
            if i=="(" or i==")":
                continue
            ans += i
        return ansclass Solution:
    def romanToInt(self, s: str) -> int:
        ans = 0
        prev = ''
        for i in range(len(s)):
            if(s[i]=='M'):
                if(prev=='C'):
                    ans += 800
                    prev = 'M'
                    continue
                ans += 1000
                prev = 'M'
                continue
            if(s[i]=='D'):
                if(prev=='C'):
                    ans += 300
                    prev = 'D'
                    continue
                ans += 500
                prev = 'D'
                continue
            if(s[i]=='C'):
                if(prev=='X'):
                    ans += 80
                    prev = 'C'
                    continue
                ans += 100
                prev = 'C'
                continue
            if(s[i]=='L'):
                if(prev=='X'):
                    ans += 30
                    prev = 'L'
                    continue
                ans += 50
                prev = 'L'
                continue
            if(s[i]=='X'):
                if(prev=='I'):
                    ans += 8
                    prev = 'X'
                    continue
                ans += 10
                prev = 'X'
                continue
            if(s[i]=='V'):
                if(prev=='I'):
                    ans += 3
                    prev = 'V'
                    continue
                ans += 5
                prev = 'V'
                continue
            if(s[i]=='I'):                                   
                ans += 1
                prev = 'I'
        return ansclass Solution:
    def rotate(self, nums: List[int], k: int) -> None:
        """
        Do not return anything, modify nums in-place instead.
        """
        x = len(nums)
        A = [0]*x
        for i in range(0, x):
            A[(i+k)%x] = nums[i]
        for i in range(0, x):
            nums[i] = A[i]class Solution:
    def rotate(self, matrix: List[List[int]]) -> None:
        """
        Do not return anything, modify matrix in-place instead.
        """
        n = len(matrix)
        for x in zip(*matrix):
            matrix.pop(0)
            matrix.append(x[::-1])# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, x):
#         self.val = x
#         self.next = None

class Solution:
    def rotateRight(self, head: ListNode, k: int) -> ListNode:
        if not head:
            return None
        if not k==0:        
            tail = head
            length = 1

            while(tail.next):
                length += 1
                tail = tail.next

            k = k % length

            tail.next = head

            tempnode = head

            for _ in range(0, length-k-1):
                tempnode = tempnode.next
            a = tempnode.next
            tempnode.next = None
            return a
        return headclass Solution:
    def searchInsert(self, nums: List[int], target: int) -> int:
        def binary(nums, low, high, target):
            if low <= high:
                mid = low + (high - low) // 2
                if nums[mid] == target:
                    return mid
                elif nums[mid] > target:
                    return binary(nums, low, mid-1, target)
                else:
                    return binary(nums, mid+1, high, target)
            else:
                return high+1
        return binary(nums, 0, len(nums)-1, target)
# ------------------------------------------

# Iterative Binary Search 

class Solution:
    def searchInsert(self, nums: List[int], target: int) -> int:
        low = 0
        high = len(nums) - 1
        while low <= high:
            mid = (low + high) // 2
            if nums[mid] == target:
                return mid
            elif nums[mid] > target:
                high = mid - 1
            else:
                low = mid + 1
        else:
            return high + 1class Solution:

    def __init__(self, nums: List[int]):
        self.nums = nums
        shuf = self.nums.copy()
        self.shuf = shuf

    def reset(self) -> List[int]:
        """
        Resets the array to its original configuration and return it.
        """
        self.shuf = self.nums.copy()
        return self.shuf

    def shuffle(self) -> List[int]:
        """
        Returns a random shuffling of the array.
        """
        x = len(self.nums)
        for i in range(x):
            j = random.randrange(i, x)
            self.shuf[i], self.shuf[j] = self.shuf[j], self.shuf[i]
        return self.shuf
# ------------------------------------------

# Your Solution object will be instantiated and called as such:
# obj = Solution(nums)
# param_1 = obj.reset()
# param_2 = obj.shuffle()# from collections import deque

class Solution:
    def simplifyPath(self, path: str) -> str:
        if(len(path)==0 or path==None or path==''):
            return '/'
        
        p = path.split('/')
        stack = []
        for item in p:
            if (item=='..'):
                if(stack):
                    stack.pop()
                continue
            if item=='.' or len(item)==0:
                pass
            else:
                stack.append(item)
        return '/'+'/'.join(stack)
    
                class Solution:
    def singleNumber(self, nums: List[int]) -> int:
        return int(((sum(set(nums))*3) - sum(nums))/2)class Solution:
    def singleNumber(self, nums: List[int]) -> List[int]:
        ans = []
        for i in set(nums):
            if nums.count(i)==1:
                ans.append(i)
                if(len(ans)==2):
                    return ans
        return ansfrom collections import Counter
class Solution:
    def sortColors(self, nums: List[int]) -> None:
        """
        Do not return anything, modify nums in-place instead.
        """
        n = Counter(nums)
        nums.clear()
        for v in range(3):
            for i in range(n[v]):
                nums.append(v)class Solution:
    def balancedStringSplit(self, s: str) -> int:
        c = 0
        rc = 0
        lc = 0
        for i in range(len(s)):
            if s[i] == 'R':
                rc += 1
            if s[i] == 'L':
                lc += 1
            if rc == lc:
                c += 1
                rc = 0
                lc = 0
        return cclass Solution:
    def myAtoi(self, str: str) -> int:
        if len(str)==0:
            return 0
        str = list(str.strip())
        if len(str)==0:
            return 0
        if(str[0]=='-'):
            s = -1
        else:
            s = 1
        if str[0] in ['-', '+']:
            del str[0]
        i = 0
        exp = 0
        while(i < len(str) and str[i].isdigit()):
            exp = exp*10 + ord(str[i]) - ord('0')
            i += 1
        return max(-2**31, min(exp*s, 2**31-1))class Solution:
    def leastInterval(self, tasks: List[str], n: int) -> int:
        tasksDict = collections.Counter(tasks)
        heap = []
        c = 0
        for k, v in tasksDict.items():
            heappush(heap, (-v,k))
        while heap:
            i = 0
            stack = []
            while i<=n:
                if len(heap)>0:
                    index, task = heappop(heap)
                    if index!=-1:
                        stack.append((index+1, task))
                c += 1
                if len(heap)==0 and len(stack)==0:
                    break
                i += 1
            for i in stack:
                heappush(heap, i)
        return c## Naive Solution that runs in O(n^2)
## Traverses the array, and finds the maximum left or right element.
## rainwater that can be stored in the column =  min(left, right) - height[i]
class NaiveSolution:
    def trap(self, height) -> int:
        res = 0
        n = len(height)
        for i in range(1, n-1):
            left = height[i]
            for j in range(i):
                left = max(left, height[j])
            right = height[i]
            for j in range(i+1, n):
                right = max(right, height[j])
            res += min(left, right) - height[i]
        return res
# ------------------------------------------

## Optimized solution that runs in O(N)
## Stores the left and right maximum values in two dp arrays.
## Space Complexity - O(N)

class Solution:
    def trap(self, height: List[int]) -> int:
        if height == []:
            return 0
        n = len(height)
        res = 0
        left = [0 for _ in range(n)]
        right = [0 for _ in range(n)]
        left[0] = height[0]
        right[n-1] = height[n-1]
        for i in range(1, n):
            left[i] = max(left[i-1], height[i])
        for i in range(n-2, -1, -1):
            right[i] = max(right[i+1], height[i])
        for i in range(n):
            res += min(left[i], right[i]) - height[i]
        return res    class Solution:
    def minimumTotal(self, triangle: List[List[int]]) -> int:
        dp = [0 for _ in range(len(triangle)+1)]
        for r in triangle[::-1]:
            for i in range(len(r)):
                dp[i] = r[i] + min(dp[i], dp[i+1])      
        return dp[0]class Solution:
    def twoCitySchedCost(self, costs: List[List[int]]) -> int:
        costs = sorted(costs, key = lambda x: x[0] - x[1])
        return sum(i[0] for i in costs[0:len(costs)//2]) + sum(j[1] for j in costs[len(costs)//2:len(costs)])class Solution:
    def uniquePathsWithObstacles(self, obstacleGrid: List[List[int]]) -> int:
        m = len(obstacleGrid)
        n = len(obstacleGrid[0])

        if obstacleGrid[0][0] == 1:
            return 0
        
        obstacleGrid[0][0] = 1
        for i in range(1, m):
            obstacleGrid[i][0] = int(obstacleGrid[i][0] == 0 and obstacleGrid[i-1][0] == 1)
        for i in range(1, n):
            obstacleGrid[0][i] = int(obstacleGrid[0][i] == 0 and obstacleGrid[0][i-1] == 1)
        
        for i in range(1, m):
            for j in range(1, n):
                if obstacleGrid[i][j] == 0:                    
                    obstacleGrid[i][j] = obstacleGrid[i-1][j] + obstacleGrid[i][j-1]
                else:
                    obstacleGrid[i][j] = 0
                    
        return obstacleGrid[-1][-1]            from collections import Counter
class Solution:
    def isAnagram(self, s: str, t: str) -> bool:
        return Counter(s) == Counter(t)class Solution:
    def isPalindrome(self, s: str) -> bool:
        s = ''.join(a for a in s if a.isalnum()).lower()
        return s == s[::-1]class Solution:
    def checkValidString(self, s: str) -> bool:
        lb = 0
        rb = 0
        for i in s:
            if(i=='(' or i=='*'):
                lb += 1
            else:
                lb -= 1
            if lb < 0:
                return False
        if(lb==0):
            return True
        
        for i in range(len(s)-1, -1, -1):
            if(s[i]==')' or s[i]=='*'):
                rb += 1
            else:
                rb -= 1
            if rb < 0:
                return False
        return Trueclass Solution(object):
    def robotSim(self, commands, obstacles):
        dx = [0, 1, 0, -1]
        dy = [1, 0, -1, 0]
        x = y = di = 0
        obstacleSet = set(map(tuple, obstacles))
        ans = 0

        for cmd in commands:
            if cmd == -2:  #left
                di = (di - 1) % 4
            elif cmd == -1:  #right
                di = (di + 1) % 4
            else:
                for k in range(cmd):
                    if (x+dx[di], y+dy[di]) not in obstacleSet:
                        x += dx[di]
                        y += dy[di]
                        ans = max(ans, x*x + y*y)

# ------------------------------------------


# Solution for https://leetcode.com/problems/two-sum/
# Language : Python3
# ------------------------------------------

# O(n^2) Solution
class Solution:
    def twoSum(self, nums, target):
        for i in range(len(nums)):
            for j in range(i+1,len(nums)):
                if(nums[i]+nums[j]==target):
                    return i, j


# O(n) Solution
class Solution:
    def twoSum(self, nums: List[int], target: int) -> List[int]:
        dict = { v:k for k, v in enumerate(nums) }
        for i in range(len(nums)):
            if target - nums[i] in dict and nums.index(target - nums[i]) != i:
                return i, nums.index(target-nums[i])
# ------------------------------------------# ------------------------------------------# ------------------------------------------# ------------------------------------------# ------------------------------------------# ------------------------------------------# ------------------------------------------# ------------------------------------------# ------------------------------------------# ------------------------------------------# ------------------------------------------# ------------------------------------------# ------------------------------------------# ------------------------------------------# ------------------------------------------# ------------------------------------------# ------------------------------------------# ------------------------------------------# ------------------------------------------# ------------------------------------------# ------------------------------------------# ------------------------------------------# ------------------------------------------# ------------------------------------------# -------------------------------------------
```

```
{% endtab %}

{% tab title="Second Tab" %}

{% endtab %}
{% endtabs %}

