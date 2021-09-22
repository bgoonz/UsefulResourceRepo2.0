With `/^[a-zA-Z]/` you only check the first character:

-   `^`: Assert position at the beginning of the string
-   `[a-zA-Z]`: Match a single character present in the list below:
    -   `a-z`: A character in the range between "a" and "z"
    -   `A-Z`: A character in the range between "A" and "Z"

If you want to check if all characters are letters, use this instead:

```
/^[a-zA-Z]+$/.test(str);

```

-   `^`: Assert position at the beginning of the string
-   `[a-zA-Z]`: Match a single character present in the list below:
    -   `+`: Between one and unlimited times, as many as possible, giving back as needed (greedy)
    -   `a-z`: A character in the range between "a" and "z"
    -   `A-Z`: A character in the range between "A" and "Z"
-   `$`: Assert position at the end of the string (or before the line break at the end of the string, if any)

Or, using the case-insensitive flag `i`, you could simplify it to

```
/^[a-z]+$/i.test(str);

```

Or, since you only want to `test`, and not `match`, you could check for the opposite, and negate it:

```
!/[^a-z]/i.test(str);
```