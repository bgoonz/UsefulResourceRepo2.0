# Merge Sort

This project contains a skeleton for you to implement Merge Sort. In the
file **lib/merge_sort.js**, you should implement the Merge Sort.

The algorithm can be summarized as the following:

1. if there is only one element in the list, it is already sorted. return that
   array.
2. otherwise, divide the list recursively into two halves until it can no more
   be divided.
3. merge the smaller lists into new list in sorted order.

This is a description of how the Merge Sort works (and is also in the code
file).

```
procedure mergesort( a as array )
   if ( n == 1 ) return a

   /* Split the array into two */
   var l1 as array = a[0] ... a[n/2]
   var l2 as array = a[n/2+1] ... a[n]

   l1 = mergesort( l1 )
   l2 = mergesort( l2 )

   return merge( l1, l2 )
end procedure

procedure merge( a as array, b as array )
   var result as array
   while ( a and b have elements )
      if ( a[0] > b[0] )
         add b[0] to the end of result
         remove b[0] from b
      else
         add a[0] to the end of result
         remove a[0] from a
      end if
   end while

   while ( a has elements )
      add a[0] to the end of result
      remove a[0] from a
   end while

   while ( b has elements )
      add b[0] to the end of result
      remove b[0] from b
   end while

   return result
end procedure
```

* Clone the project from
  https://github.com/appacademy-starters/algorithms-merge-sort-starter.
* `cd` into the project folder
* `npm install` to install dependencies in the project root directory
* `npm test` to run the specs
* You can view the test cases in `/test/test.js`. Your job is to write code in
  the `/lib/merge_sort.js` that implements the Merge Sort.
