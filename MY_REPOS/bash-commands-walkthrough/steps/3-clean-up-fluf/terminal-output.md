
```
pwd
/mnt/c/Users/bryan/Downloads/bash-commands/steps/3-clean-up-fluf/DS-ALGO-OFFICIAL-master
```
```

|01:32:46|bryan@LAPTOP-9LGJ3JGS:[DS-ALGO-OFFICIAL-master] DS-ALGO-OFFICIAL-master_exitstatus:0[╗___________o>

-empty -|01:32:50|bryan@LAPTOP-9LGJ3JGS:[DS-ALGO-OFFICIAL-master] DS-ALGO-OFFICIAL-master_exitstatus:0[╗___________o>

find . -empty -type f -print -delete
```
```

./CONTENT/DS-n-Algos/File-System/file-utilities/node_modules/line-reader/test/data/empty_file.txt
./CONTENT/DS-n-Algos/_Extra-Practice/free-code-camp/nodejs/http-collect.js
./CONTENT/Resources/Comments/node_modules/mime/.npmignore
./markdown/tree2.md
./node_modules/loadashes6/lodash/README.md
./node_modules/loadashes6/lodash/release.md
./node_modules/web-dev-utils/Markdown-Templates/Markdown-Templates-master/filled-out-readme.md
|01:33:16|bryan@LAPTOP-9LGJ3JGS:[DS-ALGO-OFFICIAL-master] DS-ALGO-OFFICIAL-master_exitstatus:0[╗___________o>
```

```

ind . -empty -type d -print -delete
```

```

|01:33:16|bryan@LAPTOP-9LGJ3JGS:[DS-ALGO-OFFICIAL-master] DS-ALGO-OFFICIAL-master_exitstatus:0[╗___________o>

find . -empty -type d -print -delete
./.git/branches
./.git/objects/info
./.git/refs/tags
|01:33:31|bryan@LAPTOP-9LGJ3JGS:[DS-ALGO-OFFICIAL-master] DS-ALGO-OFFICIAL-master_exitstatus:0[╗___________o>

```
```

find . \( -name ".git" -o -name ".gitignore" -o -name ".gitmodules" -o -name ".gitattributes" \) -exec rm -rf -- {} +


find . \( -name "*SECURITY.txt" -o -name "*RELEASE.txt" -o  -name "*CHANGELOG.txt" -o -name "*LICENSE.txt" -o -name "*CONTRIBUTING.txt" -name "*HISTORY.md" -o -name "*LICENSE" -o -name "*SECURITY.md" -o -name "*RELEASE.md" -o  -name "*CHANGELOG.md" -o -name "*LICENSE.md" -o -name "*CODE_OF_CONDUCT.md" -o -name "*CONTRIBUTING.md" \) -exec rm -rf -- {} +


```
```


find . \( -name ".git" -o -name ".gitignore" -o -name ".gitmodules" -o -name ".gitattributes" \) -exec rm -rf -- {} +
|01:33:42|bryan@LAPTOP-9LGJ3JGS:[DS-ALGO-OFFICIAL-master] DS-ALGO-OFFICIAL-master_exitstatus:0[╗___________o>

find . \( -name "*SECURITY.txt" -o -name "*RELEASE.txt" -o  -name "*CHANGELOG.txt" -o -name "*LICENSE.txt" -o -name "*CONTRIBUTING.txt" -name "*HISTORY.md" -o -name "*LICENSE" -o -name "*SECURITY.md" -o -name "*RELEASE.md" -o  -name "*CHANGELOG.md" -o -name "*LICENSE.md" -o -name "*CODE_OF_CONDUCT.md" -o -name "*CONTRIBUTING.md" \) -exec rm -rf -- {} +

 -name '|01:34:05|bryan@LAPTOP-9LGJ3JGS:[DS-ALGO-OFFICIAL-master] DS-ALGO-OFFICIAL-master_exitstatus:0[╗___________o>

```
