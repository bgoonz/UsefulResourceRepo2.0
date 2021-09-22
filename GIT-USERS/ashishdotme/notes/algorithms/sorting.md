# Bubble Sort

It works by swapping the adjacent elements if they are in wrong order. It is the most inefficient sorting algorithm because of simple it is. It has the time complexity of O(n^2). Insertion sort is better than bubble sort because it has the same asymptotic complexity but only requires O(n) swaps whereas bubble sort require O(n2) swaps.

### Psuedocode

```
let n be the length of the array
for i from 0 to n-1
	for j from 0 to n-1-i  //The last element is already sorted after each pass
		if arr[j] > arr[j+1]
			swap(arr[j], arr[j+1])

let the array be [3,2,4,1]

i=0

	j=0 //[3,2,4,1]
		3>2
		swap(3,2) //[2,3,4,1]

	j=1 //[2,3,4,1]
		3>4

	j=2 //[2,3,4,1]
		4>1
		swap(4,1) //[2,3,1,4]

i=1

	j=0 //[2,3,1,4]
		2>3

	j=1 //[2,3,1,4]
		3>1
		swap(3,1) //[2,1,3,4]

i=2

	j=0 //[2,1,3,4]
		2>1
		swap(2,1) //[1,2,3,4]
```

### Diagram

![merge-sort](http://miftyisbored.com/wp-content/uploads/2015/01/bubble-sort-demo.jpg)

### Optimization

we use a flag to track if there is swapping taking place, if there is no swapping it means the array is already sorted so no need for more pass.

```
for i from 0 to n-1
	swapped = 0
	for j from 0 to n-1-i  //The last element is already sorted after each pass
		if arr[j] > arr[j+1]
			swap(arr[j], arr[j+1])
			swapped = 1

	if swapped == 0 // No elements are swapped so stop the loop
		break

```

# Insertion Sort

Insertion sort algorithm sorts an array by inserting an element from the unsorted part to correct position at sorted part.

# Selection Sort

Selection sort algorithm sorts an array by repeatedly finding the minimum element from unsorted part and putting it at the beginning.

### Psuedocode

```
let n be the length of the array
for i from 0 to n-1
	min = i
	for j from i+1 to n-1
		if arr[j] < arr[min]
			min = j
	temp = arr[i]
	arr[i] = arr[min]
	arr[min] = temp
```

```
let the array be [3,2,4,1]

i=0
	min = 0
		j=1 //[3,2,4,1]
			2 < 3
				min = 1

		j=2	//[3,2,4,1]
			4 < 2

		j=3 //[3,2,4,1]
			1 < 2
				min = 3
	swap(a[i], a[min]) //[1,2,4,3]

i=1
	min = 1
		j=2 //[1,2,4,3]
			4 < 2

		j=3 //[1,2,4,3]
			3 < 2

i=2
	min = 2
		j = 3 //[1,2,4,3]
			3 < 4

	swap(a[i], a[min]) //[1,2,3,4]








```
