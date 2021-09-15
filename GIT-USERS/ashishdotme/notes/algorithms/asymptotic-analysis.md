[] A problem with complexity O(n) which takes 2^60 times will take 60 times in O(log n) complexity

| <-- Fast     |          |             |        |           | Slow -->    |
| ------------ | :------: | :---------: | :----: | :-------: | :---------- |
| **Name**     | Constant | Logarithmic | linear | Quadratic | exponential |
| **Notation** |   O(1)   |   O(logn)   |  O(n)  |  O(n^2)   | O(k^n)      |

```javascript
for(var i...){ // O(n)
	1+1; // O(1)
}
```

```javascript
/**
* Complexity = O(n^2) + O(2)
* We only care about worst case so we consider the worst time complexity only.
* i.e we take the highest order of the polynomial
* So the complexity is O(n^2)
*/
for(var i...){ // O(n)
	for(var j...){ // O(n)
		3+3; // O(1)
		5+6; // O(1)
	}
}
```
