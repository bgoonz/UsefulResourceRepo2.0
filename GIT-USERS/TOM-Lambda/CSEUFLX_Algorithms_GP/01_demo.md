Let's come up with a plan for the following problem...
```
We'll say that a positive int divides itself if every digit in the number divides into the number evenly. So for example 128 divides itself since 1, 2, and 8 all divide into 128 evenly. 

And we'll say that 0 does not divide into anything evenly, so no number with a 0 digit divides itself. 

Write a function to determine if a number divides itself.

[source - https://codingbat.com/prob/p165941]
```




**Understand**  
ask questions such as...  
* Do we need to handle non-numeric input?
* How should we handle decimal values?
* What should this function return?

```python
def divides_self(num):
  # TODO

print(divides_self(128)) # → true
print(divides_self(12)) # → true
print(divides_self(120)) # → false
```



**Plan**  
A good rule of thumb is to keep breaking down tasks until they easily translate to a programming construct like a loop, conditoinal statement, or assignment operation.

Each of the statements in the sample plan below corresponds to something we can do in Python.
```
PLAN
  Loop through digits in the number
    - Use % to get the rightmost digit
    - Use / to discard the rightmost digit
    - Return false if dividing by a digit leads to a remainder 
    OR if we are trying to divide by 0
  
  Return true if the loop exits (all numbers divided evenly)
```