# Resources:

- [holy grail](https://gist.github.com/bgoonz/df74dfa73bb5edd239ac738a14104eee)


# 1. Remove spaces from file and folder names and then remove numbers from files and folder names....

### Description: need to : `sudo apt install rename`


>Notes: Issue when renaming file without numbers collides with existing file name...


###### code:


```sh
find . -name "* *" -type d | rename 's/ /_/g'   
find . -name "* *" -type f | rename 's/ /_/g'
```
```sh

```sh
find $dir -type f | sed 's|\(.*/\)[^A-Z]*\([A-Z].*\)|mv \"&\" \"\1\2\"|' | sh

find $dir -type d | sed 's|\(.*/\)[^A-Z]*\([A-Z].*\)|mv \"&\" \"\1\2\"|' | sh

for i in *.html; do mv "$i" "${i%-*}.html"; done

for i in *.*; do mv "$i" "${i%-*}.${i##*.}"; done

---
### Description: combine the contents of every file in the contaning directory.


>Notes: this includes the contents of the file it's self...


###### code:


```js
//APPEND-DIR.js
const fs = require('fs');
let cat = requ