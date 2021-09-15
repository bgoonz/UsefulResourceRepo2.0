# Extra-Array





{% tabs %}
{% tab title="recur-bin-search.py" %}
```python
# given array a and need to find value x
# left and right correspond to initial indices of array a bounding the search
# segment of array a above and below, respectively
def binary_search_recursive(a, x, left=0, right=(len(a)-1)):
    #"""Recursive Binary Search algorithm implemented using list indexing"""
    index = (left+right)//2
    if a[index] == x:
        return index
    elif x > (a[right]) or x < a[left]:  # first case where x is not in the list!
        return -1
    elif left == right:  # case where search is complete and no value x not found
        return -1
    elif left == right-1:  # case where there are only two numbers left, check both!
        left = right
        return binary_search_recursive(a, x, left, right)
    elif a[index] < x:
        left = index
        return binary_search_recursive(a, x, left, right)
    elif a[index] > x:
        right = index
        return binary_search_recursive(a, x, left, right)

```
{% endtab %}

{% tab title="Second Tab" %}

{% endtab %}

{% tab title="Array Change" %}
```python
def arrayChange(inputArray):
    count = 0
    for i in range(1, len(inputArray)):
        if inputArray[i - 1] >= inputArray[i]:
            difference = inputArray[i - 1] - inputArray[i]
            inputArray[i] += difference + 1
            count += difference + 1
    return count

```
{% endtab %}

{% tab title="Array Union" %}
```python
#Time complexity O(M*N)
#Space Complexity O(M+N)
#Method 1
class Solution:    
    #Function to return the count of number of elements in union of two arrays.
    def doUnion(self,a,n,b,m):
        c=a+b
        c.sort()

        d=[]
        for i in c:
            if i not in d:
                d.append(i)
            else:
                pass

        return len(d)


if __name__=='__main__':
    t=int(input())
    for _ in range(t):
        n,m=[int(x) for x in input().strip().split()]

        a=[int(x) for x in input().strip().split()]
        b=[int(x) for x in input().strip().split()]
        ob=Solution()

        print(ob.doUnion(a,n,b,m))



#Time complexity  O(M)+O(N)+O(Mlog(M)+Nlog(N))
#Space Complexity O(n+m)
#Method 2



class Solution:    
    #Function to return the count of number of elements in union of two arrays.
    def doUnion(self,a,n,b,m):
        c=a+b
        c.sort() #O(Mlog(M))+O(Nlog(N))
        sample_dict={}

        for i in c: #O(M)+O(N)
            if i in sample_dict.keys():
                sample_dict[i]+=1
            else:
                sample_dict[i]=1

        return len([int(x) for x in sample_dict.values()])


if __name__=='__main__':
    t=int(input())
    for _ in range(t):
        n,m=[int(x) for x in input().strip().split()]

        a=[int(x) for x in input().strip().split()]
        b=[int(x) for x in input().strip().split()]
        ob=Solution()

        print(ob.doUnion(a,n,b,m))
```
{% endtab %}

{% tab title="Rotate" %}
```python
#rotation of an element by one step
def left_rotation(arr,d,n):
    for i in range(d):
        rotate_by_one_step(arr,n)



def rotate_by_one_step(arr,n):
    temp = arr[0]
    for i in range(n-1):
        arr[i] = arr[i+1]
    arr[n-1]=temp


def print_array(arr,n):
    for i in range(n):
        print(arr[i])

arr=[1,2,3,4,5]

left_rotation(arr,2,5)

print_array(arr,5)
```
{% endtab %}
{% endtabs %}



```python
class Array(object):
    def __init__(self, size, defaultValue = None):
        self.size = size
        if(defaultValue == None):
            self.items = list()
            for i in range(size):
                self.items.append(defaultValue)
        else:
            self.items = list()

            if(len(defaultValue) == size or len(defaultValue) < size):
                for j in range(len(defaultValue)):
                    if(defaultValue[j]):
                        self.items.append(defaultValue[j])
                for i in range(len(defaultValue), size):
                    self.items.append(None)
            else:
                print('Elements are more than the size specified')

    def myLen(self):
        length = 0
        for i in self.items:
            if i == None:
                continue
            else:
                length += 1
        return length

    def insertFirst(self, element):
        if (self.myLen() < self.size):
            for i in range(self.myLen(), 0, -1):
                self.items[i] = self.items[i - 1]
            self.items[0] = element
        else:
            print('Element index out of range')

    def insertAtIndex(self, index, element):
        if (self.myLen() < self.size):
            for i in range(self.myLen(), index, -1):
                self.items[i] = self.items[i - 1]
            self.items[index] = element
        else:
            print('Element index out of range')

    def insertAfterIndex(self, index, element):
        if (self.myLen() < self.size):
            for i in range(self.myLen(), index + 1, -1):
                self.items[i] = self.items[i - 1]
            self.items[index + 1] = element
        else:
            print('Element index out of range')

    def insertBeforeIndex(self, index, element):
        if (self.myLen() < self.size):
            for i in range(self.myLen(), index - 1, -1):
                self.items[i] = self.items[i - 1]
            self.items[index - 1] = element
        else:
            print('Element index out of range')

    def delete(self, element):
        if element in self.items:
            Index = self.items.index(element)
            self.items[Index] = None
        else:
            print('This element is not in the Array!')

    def search(self, element):
        if element in self.items:
            position = 0
            for i in range(self.myLen()):
                if(self.items[i] == element):
                    break
                else:
                    position += 1

            print('Element {} found at position {}'.format(element, position))
        else:
            print('This element is not in the Array!')

if __name__ == '__main__':
    myArray = Array(5, [1])
    print(myArray.items, myArray.myLen())      
    myArray.insertFirst(3)
    print(myArray.items, myArray.myLen())       
    myArray.insertAfterIndex(1,4)
    print(myArray.items, myArray.myLen())     
    myArray.insertBeforeIndex(3,5)
    print(myArray.items, myArray.myLen())       
    myArray.delete(5)
    print(myArray.items, myArray.myLen())       
    myArray.search(4)                          
```

### 

### Create Array Class

Now, first, let’s create a custom class named Array which implements all the above functionalities in it.

So now let’s define a constructor using init method in Python which accepts 2 arguments along with the self-object that is the size and the default value for Array elements.

Here, size is defined which is the static size of the array and the default value means the value assigned to elements while creating a new array.

Now what we need is that if the size is only initialized then we must initialize all elements to default Value that is None.

Otherwise, if both parameters are initialized, then initialize the list with these values the user passed as an argument.

If the length of the default value list is less than size, then initialize other elements to “None”.

If the length of the list passed is greater than size user passed then simply return the program with the error message “Elements are more than the size specified”.

```python
class Array(object):
    def __init__(self, size, defaultValue = None):
        self.size = size
        if(defaultValue == None):
            self.items = list()
            for i in range(size):
                self.items.append(defaultValue)
        else:
            self.items = list()

            if(len(defaultValue) == size or len(defaultValue) < size):
                for j in range(len(defaultValue)):
                    if(defaultValue[j]):
                        self.items.append(defaultValue[j])
                for i in range(len(defaultValue), size):
                    self.items.append(None)
            else:
                print('Elements are more than the size specified')
```





#### Define Length of Array Function

This function is used to return the length of the Array that means the elements we initialized excluding None values from it.

```text
    def myLen(self):
        length = 0
        for i in self.items:
            if i == None:
                continue
            else:
                length += 1
        return length
```

#### Define Insert First Array Function

This function is used to insert or add the element to the beginning of the array.

```text
    def insertFirst(self, element):
        if (self.myLen() < self.size):
            for i in range(self.myLen(), 0, -1):
                self.items[i] = self.items[i - 1]
            self.items[0] = element
        else:
            print('Element index out of range')
```

#### Define Insert At Index Function

This function is used to insert or add an element at a particular index or position which the user passed along with the element to insert.

```text
    def insertAtIndex(self, index, element):
        if (self.myLen() < self.size):
            for i in range(self.myLen(), index, -1):
                self.items[i] = self.items[i - 1]
            self.items[index] = element
        else:
            print('Element index out of range')
```

#### Define Insert After Index Function

This function is used to insert or add an element after a particular index or position which the user passed along with the element to insert.

```text
    def insertAfterIndex(self, index, element):
        if (self.myLen() < self.size):
            for i in range(self.myLen(), index + 1, -1):
                self.items[i] = self.items[i - 1]
            self.items[index + 1] = element
        else:
            print('Element index out of range')
```

#### Define Insert Before Index Function

This function is used to insert or add an element before a particular index or position which the user passed along with the element to insert.

```text
    def insertBeforeIndex(self, index, element):
        if (self.myLen() < self.size):
            for i in range(self.myLen(), index - 1, -1):
                self.items[i] = self.items[i - 1]
            self.items[index - 1] = element
        else:
            print('Element index out of range')
```

#### Define Delete Function

This function is used to remove or delete a particular element from our array or if not present then simply print the error that the element is not found in this array.

```text
    def delete(self, element):
        if element in self.items:
            Index = self.items.index(element)
            self.items[Index] = None
        else:
            print('This element is not in the Array!')
```

#### Define Search Function

This function is used to search or find the element which is passed by the user to return the index or position.

```text
    def search(self, element):
        if element in self.items:
            position = 0
            for i in range(self.myLen()):
                if(self.items[i] == element):
                    break
                else:
                    position += 1

            print('Element {} found at position {}'.format(element, position))
        else:
            print('This element is not in the Array!')
```

#### Define Main Condition

Now, we have implemented all the functions of our custom Array class.

So, now what we need is to check whether the functionality of these methods are working or not.

For that, create an instance of the Array Class and initialize it with array size and the values it needs to insert at the beginning.

Then, just use the object to call all the functions one by one.

```text
if __name__ == '__main__':
    myArray = Array(5, [1])
    print(myArray.items, myArray.myLen())      
    myArray.insertFirst(3)
    print(myArray.items, myArray.myLen())       
    myArray.insertAfterIndex(1,4)
    print(myArray.items, myArray.myLen())     
    myArray.insertBeforeIndex(3,5)
    print(myArray.items, myArray.myLen())       
    myArray.delete(5)
    print(myArray.items, myArray.myLen())       
    myArray.search(4)   
```



