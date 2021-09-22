### Life Saving Bash Scripts Part 2

#### I am not saying they're in any way special compared with other bash scripts... but when I consider that you can never recover time spent... the value of these commands in my life quickly becomes incalculable!

![](https://cdn-images-1.medium.com/max/864/0*aWKygEnTVdHuulB4.gif)

### 1.) Sanitize Directory:
```shsh
sanitize() {\
  shopt -s extglob;

filename=$(basename "$1")\
  directory=$(dirname "$1")

filename_clean=$(echo "$filename" | sed -e 's/[\\/:\*\?"<>\|\x01-\x1F\x7F]//g' -e 's/^\(nul\|prn\|con\|lpt[0-9]\|com[0-9]\|aux\)\(\.\|$\)//i' -e 's/^\.*$//' -e 's/^$/NONAME/')

if (test "$filename" != "$filename_clean")\
  then\
    mv -v "$1" "$directory/$filename_clean"\
  fi\
}

export -f sanitize

sanitize_dir() {\
  find "$1" -depth -exec bash -c 'sanitize "$0"' {} \;\
}

sanitize_dir '/path/to/somewhere'
```sh
### 2.)Recursively Delete Node Modules:
```sh
find . -name 'node_modules' -type d -prune -exec rm -rf '{}' +
```
### 3.)Remove trailing whitespace from filenames:
```
rename  's/ *$//' *
```
### 4.)Remove string from file name:
```
for filename in *badString*; do mv "$filename" "${filename//badstring/replaceString}"; done
```sh
### 5.)Remove whitespace from filenames:
```sh
for file in *; do mv "$file" `echo $file | tr ' ' '_'` ; done
```

### 6.) Remove `<script>` tags from html and the content in-between them.


```sh
sed -n -e '/<script>/,/<\/script>/p' example.html >out.js
```
### 7.) Remove Invalid characters from file:
```sh
for f in */; do nf=$(echo "$f" |sed -e 's/[^A-Za-z0-9.]/./g' -e 's/\.\.\././g' -e 's/\.\././g' -e 's/\.*$//'); test "$f" != "$nf" && mv "$f" "$nf" && echo "$nf"; done
```
### 8.) Remember Git Credentials For Future Login:
```sh
git config --global credential.helper store
```
### 9.)Recursive npm install:
```sh
npm i -g recursive-install

npm-recursive-install
```
### 10.)Generate Numbered Folders:
```sh
n=1;\
max=50;\
while [ "$n" -le "$max" ]; do\
  mkdir "s$n"\
  n=`expr "$n" + 1`;\
done
```
### 11.) Traverse Directories recursivley and delete files who's name match a specified string:
```sh
find . -type f -exec sed -i '/badFolder/d' ./* {} \;
```
### 12.) recursivley remove empty files:
```sh
find . -empty -type f -print -delete
```
### 13.)recursively remove empty folders
```sh
find . -empty -type d -print -delete
```
### 14.) Remove a string from files of a certain extension or group of extensions:

```sh
find . -type f -a \( -name "*.html" -o -name "*.js" -o -name "*.css" -o -name "*.md" \) -a -exec sed -i  '/BADSTRING/d' '{}' +
```

### 15.) Recursivley remove from all html files any lines contaning the string "badText"

```sh
find . -type f -exec sed -i '/badText/d' ./*.html {} \;
```

### 16.) List the path of all html files in directory... (or any other file extension):

```sh
find ./ | grep -i "\.html*$"ls -R './' | awk '/:$/&&f{s=$0;f=0}/:$/&&!f{sub(/:$/,"");s=$0;f=1;next}NF&&f{ print s"/"$0 }'>listing.md
```

### 17.) Delete files over 75MB (to avoid tripping github LFS rules).

```sh
find . -size +75M -a -print -a -exec rm -f {} \;
```

### 18.) Populate each folder with a dummy deleteme.txt file recursively:

```sh
for x in "./"/*/; do  (cd "$x"   files=(*)   printf '%s\n' "${files[@]}" > deleteme.txt  )done
```

# PANDOC

### 19.) Convert from Markdown==⇒ HTML
```sh
find ./ -iname "*.md" -type f -exec sh -c 'pandoc --- standalone "${0}" -o "${0%.md}.html"' {} \;
```
### 20.) Convert from HTML ==⇒ Markdown
```sh
find ./ -iname "*.html" -type f -exec sh -c 'pandoc --- wrap=none --- from html --- to markdown_strict "${0}" -o "${0%.html}.md"' {} \;
```
