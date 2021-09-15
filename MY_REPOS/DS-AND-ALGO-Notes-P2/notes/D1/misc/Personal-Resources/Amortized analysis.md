# Amortized analysis 





In [computer science](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/wiki/Computer_science "Computer science"), **amortized analysis** is a method for [analyzing](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/wiki/Analysis_of_algorithms "Analysis of algorithms") a given algorithm's [complexity](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/wiki/Computational_complexity_theory "Computational complexity theory"), or how much of a resource, especially time or memory, it takes to [execute](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/wiki/Execution_(computing) "Execution (computing)"). The motivation for amortized analysis is that looking at the worst-case run time _per operation_, rather than _per algorithm_, can be too pessimistic.[\[1\]](#cite_note-CMU-1)

While certain operations for a given algorithm may have a significant cost in resources, other operations may not be as costly. The amortized analysis considers both the costly and less costly operations together over the whole series of operations of the algorithm. This may include accounting for different types of input, length of the input, and other factors that affect its performance.[\[2\]](#cite_note-fiebrink-2)

History

---------------------------------------------------------------------------------------------------------------------------------------------------------

Amortized analysis initially emerged from a method called aggregate analysis, which is now subsumed by amortized analysis. The technique was first formally introduced by [Robert Tarjan](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/wiki/Robert_Tarjan "Robert Tarjan") in his 1985 paper _Amortized Computational Complexity_,[\[3\]](#cite_note-3) which addressed the need for a more useful form of analysis than the common probabilistic methods used. Amortization was initially used for very specific types of algorithms, particularly those involving [binary trees](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/wiki/Binary_tree "Binary tree") and [union](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/wiki/Union_(computer_science) "Union (computer science)") operations. However, it is now ubiquitous and comes into play when analyzing many other algorithms as well.[\[2\]](#cite_note-fiebrink-2)

Method
-------------------------------------------------------------------------------------------------------------------------------------------------------

Amortized analysis requires knowledge of which series of operations are possible. This is most commonly the case with [data structures](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/wiki/Data_structure "Data structure"), which have [state](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/wiki/State_(computer_science) "State (computer science)") that persists between operations. The basic idea is that a worst-case operation can alter the state in such a way that the worst case cannot occur again for a long time, thus "amortizing" its cost.

There are generally three methods for performing amortized analysis: the aggregate method, the [accounting method](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/wiki/Accounting_method "Accounting method"), and the [potential method](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/wiki/Potential_method "Potential method"). All of these give correct answers; the choice of which to use depends on which is most convenient for a particular situation.[\[4\]](#cite_note-Lecture_20-4)

*   Aggregate analysis determines the upper bound _T_(_n_) on the total cost of a sequence of _n_ operations, then calculates the amortized cost to be _T_(_n_) / _n_.[\[4\]](#cite_note-Lecture_20-4)
*   The [accounting method](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/wiki/Accounting_method "Accounting method") is a form of aggregate analysis which assigns to each operation an _amortized cost_ which may differ from its actual cost. Early operations have an amortized cost higher than their actual cost, which accumulates a saved "credit" that pays for later operations having an amortized cost lower than their actual cost. Because the credit begins at zero, the actual cost of a sequence of operations equals the amortized cost minus the accumulated credit. Because the credit is required to be non-negative, the amortized cost is an upper bound on the actual cost. Usually, many short-running operations accumulate such credit in small increments, while rare long-running operations decrease it drastically.[\[4\]](#cite_note-Lecture_20-4)
*   The [potential method](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/wiki/Potential_method "Potential method") is a form of the accounting method where the saved credit is computed as a function (the "potential") of the state of the data structure. The amortized cost is the immediate cost plus the change in potential.[\[4\]](#cite_note-Lecture_20-4)

Examples\[[edit](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/w/index.php?title=Amortized_analysis&action=edit&section=3 "Edit section: Examples")\]
-----------------------------------------------------------------------------------------------------------------------------------------------------------

### Dynamic array\[[edit](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/w/index.php?title=Amortized_analysis&action=edit&section=4 "Edit section: Dynamic array")\]

[![](chrome-extension://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/AmortizedPush.png/270px-AmortizedPush.png)](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/wiki/File:AmortizedPush.png)

Amortized analysis of the push operation for a dynamic array

Consider a [dynamic array](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/wiki/Dynamic_array "Dynamic array") that grows in size as more elements are added to it, such as `ArrayList` in Java or `std::vector` in C++. If we started out with a dynamic array of size 4, we could push 4 elements onto it, and each operation would take [constant time](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/wiki/Constant_time "Constant time"). Yet pushing a fifth element onto that array would take longer as the array would have to create a new array of double the current size (8), copy the old elements onto the new array, and then add the new element. The next three push operations would similarly take constant time, and then the subsequent addition would require another slow doubling of the array size.

In general if we consider an arbitrary number of pushes _n_ + 1 to an array of size _n_, we notice that push operations take constant time except for the last one which takes [![\Theta (n)](https://wikimedia.org/api/rest_v1/media/math/render/svg/a6351206e27071559aa4472579095994f650d76b)](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/wiki/Big_O_notation "Big O notation") time to perform the size doubling operation. Since there were _n_ + 1 operations total we can take the average of this and find that pushing elements onto the dynamic array takes: ![{\displaystyle {\tfrac {n\Theta (1)+\Theta (n)}{n+1}}=\Theta (1)}](https://wikimedia.org/api/rest_v1/media/math/render/svg/0de3585f10f893e93e02356cf5dbc6a384a23b0f), constant time.[\[4\]](#cite_note-Lecture_20-4)

### Queue\[[edit](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/w/index.php?title=Amortized_analysis&action=edit&section=5 "Edit section: Queue")\]

Shown is a Ruby implementation of a [Queue](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/wiki/Queue_(abstract_data_type) "Queue (abstract data type)"), a [FIFO data structure](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/wiki/FIFO_(computing_and_electronics) "FIFO (computing and electronics)"):

class Queue
  def initialize
    @input \= \[\]
    @output \= \[\]
  end

  def enqueue(element)
    @input << element
  end

  def dequeue
    if @output.empty?
      while @input.any?
        @output << @input.pop
      end
    end

    @output.pop
  end
end

The enqueue operation just pushes an element onto the input array; this operation does not depend on the lengths of either input or output and therefore runs in constant time.

However the dequeue operation is more complicated. If the output array already has some elements in it, then dequeue runs in constant time; otherwise, dequeue takes ![O(n)](https://wikimedia.org/api/rest_v1/media/math/render/svg/34109fe397fdcff370079185bfdb65826cb5565a) time to add all the elements onto the output array from the input array, where _n_ is the current length of the input array. After copying _n_ elements from input, we can perform _n_ dequeue operations, each taking constant time, before the output array is empty again. Thus, we can perform a sequence of _n_ dequeue operations in only ![O(n)](https://wikimedia.org/api/rest_v1/media/math/render/svg/34109fe397fdcff370079185bfdb65826cb5565a) time, which implies that the amortized time of each dequeue operation is ![O(1)](https://wikimedia.org/api/rest_v1/media/math/render/svg/e66384bc40452c5452f33563fe0e27e803b0cc21).[\[5\]](#cite_note-Grossman-5)

Alternatively, we can charge the cost of copying any item from the input array to the output array to the earlier enqueue operation for that item. This charging scheme doubles the amortized time for enqueue but reduces the amortized time for dequeue to ![O(1)](https://wikimedia.org/api/rest_v1/media/math/render/svg/e66384bc40452c5452f33563fe0e27e803b0cc21).

