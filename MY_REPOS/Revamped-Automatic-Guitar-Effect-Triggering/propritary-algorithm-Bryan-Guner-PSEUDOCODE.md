# Bryan Guner Audio Subsequence Matching Pseudocode:


>Let X = (x1,x2,...,xN) and Y = (y1,y2,...,yM) be midi sequences from the Pure Data Fiddle object, where M>>N(this means that Y is the database sequence).

Next, a local cost function c is assigned to each element of the DTW grid. At this point the algorithm must find a subsequence 

>Y(a∗ : b∗) := (ya∗,ya∗+1,...,yb∗) 

that minimizes the DTWdistance to our incoming signal over all possible subsequences of the recorded feature sequence.

Algorithmically speaking that is:

>(a* ,b* ):= argmin (DTW (X,Y(a:b) )

The indices a∗ and b∗ in addition to the least cost alignment possible between the incoming signal and the subsection Y (a∗ : b∗) of the stored performance can be computed by a modification of the standard DTW algorithm.

In order to select a path of least resistance p∗, naturally one would have to calculate every conceivable path through the grid. Unfortunately this requires computational complexity that grows exponentially in bounds N and M. This process can be optimized to an O(NM) complexity computation. In a broad sense, the concept is to penalize paths between the database and the query that match the query to indices near the beginning or end of the database as to avoid a one to one match between signals.

Algorithm: (Accumulated cost matrix and DTW-distance)

>Instantiate sequences: X(1:n) = (x1,...xn) and Y (1:m) = (y1,...ym)

Set

>D(n,m) = DTW(X(1:n),Y (1:m))

>D(n, m) is a N M matrix D called the accumulated cost matrix . A tuple (n, m) representing a matrix entry of the cost matrix C or of D will be referred to as a cell.

D satisfies the following:

>D(n,1) =Σ (from k=1 to n) c(xk,y0) " n ∈ [1 : N]

>D(1,m) = c(x0,ym) "m ∈ [1 : M]

>D(n,m) = argmin{D(n−1,m−1),D(n−1,m),D(n,m−1)}+c(xn,ym) " n ∈ [2 : N] and m ∈ [2 : N]

One can also define an extended accumulated cost matrix:

Setting:
```
D(n,0) = ∞ " n ∈ [0 : N]

D(0,m) := 0 " m ∈ [0 : M].

The index b∗ can be determined from D :

b∗ =argmin {D(N,b)}
```

*To determine the starting index of the subsequence a∗ and the optimal warping path between the stored and incoming signals*.

##### Input: Accumulated cost matrix D.

##### Output: Optimal warping path p∗.

#### The optimal path p∗ = (p1, . . . , pL) is computed in reverse order of the indices starting with pL = (N,b∗).
```
Suppose pl = (n, m) has been computed. In case (n, m) = (1, 1), one must have l to 1 and we are finished.

Else:

pl−1 =

"n = 1 : ( 1 , m − 1 )

"m=1 :(n−1,1)

else: argmin{D(n − 1, m − 1), D(n − 1, m), D(n, m − 1)}

a∗ is the maximal index such that pl = (a∗,1)
```
>All elements of the stored sequence Y left of ya∗ and right of yb∗ are excluded from consideration and do not incur additional costs.

#### The optimal warping path between X and Y (a∗ : b∗) is given by (pl,...,pL)


Figure 5: Database Subsequence Match against Incoming Sequence

 ![match](./images/../Final%20Report%20SP2_files/image010.gifSlide10.PNG)

D can be used to generate a list of subsequences of incoming signal that match the recorded trigger point.

> Create distance function :
```
∆ : [1 : M] → Real ∆(b) = D(N,b)
```
∆ assigns to each index b the minimal DTW distance ∆(b) attainable between the stored sequence and the subsequence of the incoming signal that ends on index b.
```
"b ∈ [1 : M], the DTW-minimizing a ∈ [1 : M] can be computed starting with pL = (N,b).
```
If ∆(b) is small $b ∈ [1 : M] and if a ∈ [1 : M] denotes the corresponding DTW-minimizing index, then the subsequence Y (a:b) matches the incoming section

Input: incoming signal X = (x1,...,xN), database sequence = (y1,...,yM),

cost threshold: τ

Output: Ranked list of matches between incoming signal and subsections of database that have a match to the input below the threshold τ

```
Algorithm: (Match list tracker)

1.)Ranked list must initially be empty

2.)Calculate D 

3.)Calculate distance function ∆ using ∆(b) for each subsequence of the database Y

4.)Select minimum b∗ of∆. 

5.)If ∆(b∗) > τ then a match has been detected.

6.)Calculate corresponding match-subsequence index a∗ ∈ [1 : M]

7.)add subsequence Y (a∗ : b∗ ) to ranked list

8.)Set ∆(b) = ∞ "b within a suitable neighborhood of b∗ 

9.)Continue by calculating the next minimizing index until input ends.

```
The rule ∆(b) = ∞ is intended to exclude an a region bounded by the nearest local maximums to b∗ from computation. This prevents a match list that contains many subsequences that differ by only a slight shift.

This approach is a feasible solution because rather than scanning the song for a trigger sequence it would create a database for every user defined section of a song. This would allow the system to track the live status of the performance in real time rather than waiting for the right input to gauge where in the performance the guitarist is. Because of the sectionally specific subsequence length matching, this approach would also yield more accurate matches as the section of music being analized would not be based on hardcoded window lengths. Most importantly this technique is built entirely on the framework of the algorithm we implemented and therefore would only require expansion of the code as opposed to a full out overhaul of the system.

Potential modifications to this platform include but are not limited to any control action as the result of the reading in of an audio sequence. For example, one could use the audio signal of virtually any instrument to control stage lighting, or advance a musical score for a symphony. It is also possible to design a physical hardware kill switch that temporarily suspends the program, allowing the musician to improvise and then jump back into the song without throwing off the system. If time permits, this system could even be expanded to include hardware effect pedals that are integrated seamlessly into the system or to control the volume level of different performers in relation both to each other and the current section of a song.
