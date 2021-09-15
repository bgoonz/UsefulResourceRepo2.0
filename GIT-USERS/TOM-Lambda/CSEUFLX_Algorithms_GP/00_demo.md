## GP

What Should you do if you were stuck while trying to format your Python output to use exactly 3 decimal places (using f-strings)

1. Attempt a solution. If it doesn't work **search and research** for fixes on your own. The following are some queries you could use while demonstrating:
   * Search for a module that allows us to use the exact value of PI
   * Recap how to format text with f-strings

```python
import math

radius = 3
area = math.pi * radius * radius
print(f'The area of the circle is {area}')
```

The above code should print...
```
The area of the circle is 28.274333882308138
```

This is close to what we want, but not formatted correctly. What can we do if we are unable to figure out how to complete this final step on our own?

2. Go to a forum such as Stack Overflow or the cohort's help channel in Slack.
   * Write an **introduction ot the problem**
   * Provide source code or specific inputs that allow others to **reproduce the problem**
   * **Proofread** your question so that it is easy to read and easy to answer.
3. Keep any eye on your post, **responding to feedback** promptly

Hopefully someone directs you to...
```python
print(f'The area of the circle is {area:.3f}')
```
```
The area of the circle is 28.274
```

OR even better...

```python
print(f'The area of the circle is {area:.3f} ft\u00b2')
```
```
The area of the circle is 28.274 ft²
```
