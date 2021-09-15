# Python Array Module

## Python Arrays \| Python Array Module

Array is yet another interesting topic of python, which covers and requires a good knowledge of basics before actually applying it. But the article is of course, one more magic spell from fairy basket, so why would it be partial to any coder?

This article takes you from basic to advanced knowledge of Python array modules. So, let’s get started. 

#### What is Array Module in Python?

The array module defines an object type that can compactly represent an array of some basic values as characters, integers, floating-point numbers.

Arrays are sequence types and behave similarly as lists, except that the type of objects stored in them is constrained.  
The module defines the following type:

**class array.array\(typecode\[, initializer\]\):** A new array whose items are restricted by the typecode, and initialized from the optional initializer value, which must be a list, a bytes-like object, or iterable over elements of the appropriate type.

Here’s a list of such type codes-

<table>
  <thead>
    <tr>
      <th style="text-align:left"><b>Type Code</b>
      </th>
      <th style="text-align:left"><b>C Type</b>
      </th>
      <th style="text-align:left"><b>Python Type</b>
      </th>
      <th style="text-align:left"><b>Minimum size (bytes)</b>
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="text-align:left">b</td>
      <td style="text-align:left">signed char</td>
      <td style="text-align:left">int</td>
      <td style="text-align:left">1</td>
    </tr>
    <tr>
      <td style="text-align:left">B</td>
      <td style="text-align:left">unsigned char</td>
      <td style="text-align:left">int</td>
      <td style="text-align:left">1</td>
    </tr>
    <tr>
      <td style="text-align:left">u</td>
      <td style="text-align:left">Py_UNICODE</td>
      <td style="text-align:left">
        <p>Unicode character;</p>
        <p>deprecated since Python 3.3</p>
      </td>
      <td style="text-align:left">2</td>
    </tr>
    <tr>
      <td style="text-align:left">h</td>
      <td style="text-align:left">signed short</td>
      <td style="text-align:left">int</td>
      <td style="text-align:left">2</td>
    </tr>
    <tr>
      <td style="text-align:left">H</td>
      <td style="text-align:left">unsigned short</td>
      <td style="text-align:left">int</td>
      <td style="text-align:left">2</td>
    </tr>
    <tr>
      <td style="text-align:left">i</td>
      <td style="text-align:left">signed int</td>
      <td style="text-align:left">int</td>
      <td style="text-align:left">2</td>
    </tr>
    <tr>
      <td style="text-align:left">I</td>
      <td style="text-align:left">unsigned int</td>
      <td style="text-align:left">int</td>
      <td style="text-align:left">2</td>
    </tr>
    <tr>
      <td style="text-align:left">l</td>
      <td style="text-align:left">signed long</td>
      <td style="text-align:left">int</td>
      <td style="text-align:left">4</td>
    </tr>
    <tr>
      <td style="text-align:left">L</td>
      <td style="text-align:left">unsigned long</td>
      <td style="text-align:left">int</td>
      <td style="text-align:left">4</td>
    </tr>
    <tr>
      <td style="text-align:left">q</td>
      <td style="text-align:left">signed long long</td>
      <td style="text-align:left">int</td>
      <td style="text-align:left">8</td>
    </tr>
    <tr>
      <td style="text-align:left">Q</td>
      <td style="text-align:left">unsigned long long</td>
      <td style="text-align:left">int</td>
      <td style="text-align:left">8</td>
    </tr>
    <tr>
      <td style="text-align:left">f</td>
      <td style="text-align:left">float</td>
      <td style="text-align:left">float</td>
      <td style="text-align:left">4</td>
    </tr>
    <tr>
      <td style="text-align:left">d</td>
      <td style="text-align:left">double</td>
      <td style="text-align:left">float</td>
      <td style="text-align:left">8</td>
    </tr>
  </tbody>
</table>

#### How to Import Python Arrays?

**syntax**

&gt;&gt;&gt; import array

**Indexing an Array in Python**

&gt;&gt;&gt;array=\[5,9,5,9\]print\(array\[1\]\)

**Output**9

#### Python Array Class – Data Items

The class array has the following data items-

**1. Array.typecodes:** A string with all type codes.

**2. Array.typecode:** The typecode character used in creating the array.

**3. Array.itemsize:** The length of array 

&gt;&gt;&gt;arr.itemsize

**4. array.append\(x\):** Append new item with value x to the end of the array.

&gt;&gt;&gt;arr.append

**5. array.append\(x\):** Append new item with value x to the end of the array.

**6. array.pop\(\[i\]\):**removes the element  “i”which is parsed.

&gt;&gt;&gt;arr.pop

**7. array.remove\(x\):** Removes the first occurrence of x from the array.

&gt;&gt;&gt;arr.remove

**8. array.reverse\(\):** Reverses the order of the items in the array.

&gt;&gt;&gt;arr.reverse

**9. array.index\(x\):** Returns the smallest i such that i is the index of the first occurrence of x in the array.

&gt;&gt;&gt;arr.index

**10. array.insert\(i, x\):** Inserts a new item with value x in the array before position i.

&gt;&gt;&gt;arr.insert

**11. array.buffer\_info\(\)**

This returns a tuple that holds the address in memory and the length of elements in the buffer that holds the contents of the array in the runtime.

&gt;&gt;&gt; arr.buffer

**12. array.byteswap\(\)**

This performs an operation of bytes wap on an array in the runtime.

&gt;&gt;&gt; arr.byte

**13. array.count\(x\)**

 finds out how many 3s there are in our Python array in the runtime.

&gt;&gt;&gt; arr.count

**14. array.extend\(iterable\)**

This attaches the iterable to the end of the array in Python in the runtime.

&gt;&gt;&gt; arr.extend

**15. array.fromlist\(list\)**

This appends item from a list to the Python arrays in the runtime.

&gt;&gt;&gt; arr.fromlist

**16. array.fromunicode\(s\)**

This appends the Unicode string in the runtime

&gt;&gt;&gt; arr.unicode

**17. array.index\(x\)**

This returns the index for the first occurrence of x in the runtime.

&gt;&gt;&gt; arr.index

**18. array.tobytes\(\)**

returns a representation in bytes of the values of the array in the runtime

&gt;&gt;&gt; arr.tobytes\(\)

**19. array.tolist\(\)**

converts the array into a list in the runtime.

&gt;&gt;&gt; arr.tolist\(\)

 **20. array.tounicode\(\)**

converts an array to a Unicode string in the runtime. 

&gt;&gt;&gt; arr.tounicode

#### How does Array Work in Python?

The array is stored in contiguous memory locations, where the index is a sequence of numbers that represents the values stored at every particular index.

To access or refer to the value at a particular index in an array we make use of a set of square brackets \[ \],\(as in lists\) also we can use the for-in loop to iterate through the array. The array has indices and values.

**Array Module Example in python**import array as arra=arr.array\('I', \[10 , 20 ,50\] \)print\("Element at 0th index: " , a\[0\]\)print\("Element at 1st index: " , a\[1\]\)print\("Element at 2nd index: " , a\[2\]\)

**Output**

Element at 0th index: 10Element at 1st index: 20

Element at 2nd index: 50

#### Python Array Representation

Arrays can be declared in various ways and in different languages. The important points that should be considered are as follows:

* Index always starts with 0.
* We can access each element using its index.
* The length of the array defines the capacity to store the elements.

#### Python Array Operations

Some of the basic operations supported by an array are:

* **Traverse** – It prints all elements one by one.
* **Insertion** – It adds an element at a given index.
* **Deletion** – It deletes elements at the given index.
* **Search** – It searches the element using the given index or by the value.
* **Update** – It updates elements at the given index.

**Searching Element in Python Array Example:**  
from array import \*array\_techvidvan = array\(‘i’, \[0,1,2,3,4,5\]\)print \(array\_techvidvan.index\(3\)\)

**Output:**1

**Example of Traversing Array in Python**  
from array import \*array\_TechVidvan = \[0,1,2,3,4,5\]for x in array\_TechVidvan: print \(x\)

**Output:**

01

2

3

4

5

#### Creating Python Arrays

for creating an array of numeric values, the coder needs to import the array module in runtime.

**Example to Create Array in Python**import array as arrp = arr.array\('q', \[1,5\]\)print\(p\)

**Output:**array\(‘q’, \[1,5\]\)

#### Accessing Python Array Elements

**Example to access Python Array Elements:**import array as arrp = arr.array\('j', \[2, 80\]\)print\("First element of list:", p\[0\]\)print\("Second element of list:", p\[1\]\)

**Output:**First element of list: 2  
Second element of list: 80

#### Changing and Adding Elements in Python Array

Arrays are mutable therefore their elements can be changed in a similar way as lists in the code.

**Code**import array as arrnumb = arr.array\('k', \[1, 109\]\)numb\[0\] = 0print\(numb\)

**Output:**array\(‘k’, \[0,109\]\)

adding elements in array

**extend\(\)**: it appends iterable to the end of the array in any code.

**Code**numb.extend\(\[5\]\)print\(numb\)

**Output:**array\(‘i’, \[1,30,5\]\)

#### Removing Python Array Elements

**Code**import array as arrnumb = arr.array\('k', \[1, 2,3 \]\)del numb\[2\]print\(numb\)

**Output:**error

**Code**del numbprint\(numb\)

**Output:**Traceback \(most recent call last\):  
NameError: name ‘numb’ is not defined

#### Searching an element in an Array

**Code**import arrayarr = array.array\('k', \[1, 2\]\)print \("The new created array is : ", end =""\)for k in range \(0, 2\): print \(arr\[k\], end =" "\)

**Output:**  
1

#### Updating Elements in an Array

**Code**import arrayprint \("Array before", end =" "\)for k in range \(0,2\): print \(\[k\], end =" "\)

**Output:**Array before \[0\] \[1\] 

#### Looping Array Elements in Python

**Code**list=\[1,0\]for i in list: print\(i\)

**Output:**

10

#### Calculating Length of an Array in Python

**Code**l=\[1,0\]i = len\(l\)print\(i\)

**Output:**2

#### Slicing Arrays in Python

By using the slicing operator \(:\), it’s possible to access a range of elements present in the array in Python programming language. The following code snippet demonstrates using the slicing operator with an array :

**Code**number\_list = \[2, 4, 22, 25, 24, 52, 46,10\]for i in range\(1,5\): print\(i\)for j in range\(5,8\): print\(j\)

**Output:**

12

3

4

5

6

7

Arrays are mutable. Hence, their elements can be changed similarly as lists.The append\(\) method is used for adding one element to an array while extend\(\) method allows adding multiple elements. These new elements are added at the end of the array.

Although knowing how to deal with arrays isn’t a compulsory part of learning Python, being able to do so is surely an added advantage.Typically, the array module is generally  required for interfacing with C code. 

#### Python Lists Vs Arrays

**Code**a = \[1, 3.5, "TechVidvan"\]import array as arr\# Errora = arr.array\('d', \[1, 3.5, "TechVidvan"\]\)

**Output:**

Traceback \(most recent call last\):  File “&lt;string&gt;”, line 3, in &lt;module&gt;

TypeError: must be real number, not str

#### Summary

At the end of the article, we got an idea of how an array is similar to a list in many aspects, but surely there is a difference. The array is not very much recommended in Python as stated earlier but knowing it will add to your knowledge.

A good coder is someone who knows every aspect of code, and practice is a definite key. Try and check out array\(\) yourself. Happy Pythonning!

