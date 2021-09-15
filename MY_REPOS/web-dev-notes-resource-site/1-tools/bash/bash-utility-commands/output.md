for f in \*.txt; do printf '%s\n' 0a 'TEXT YOU WISH TO APPEND TO BEGINNING OF EVERY FILE' . x | ex "$f"; donewget -r -A.pdf https://overapi.com/gitwget --wait=2 --level=inf --limit-rate=20K --recursive --page-requisites --user-agent=Mozilla --no-parent --convert-links --adjust-extension --no-clobber -e robots=off <url>

## OR--------------------------------------------------------------------------------

sudo apt install httrack
httrack --ext-depth=2 <url>

find . -name cookies.txt -type f -exec rm -rf {} \;find . -type f -exec sed -i '/badFolder/d' ./\* {} \;npm i -g recursive-install

npm-recursive-installsed -n -e '/<script>/,/<\/script>/p' example.html >out.jsfind . -name 'node_modules' -type d -prune -exec rm -rf '{}' +sanitize() {
shopt -s extglob;

filename=$(basename "$1")
  directory=$(dirname "$1")

filename_clean=$(echo "$filename" | sed -e 's/[\\/:\*\?"<>\|\x01-\x1F\x7F]//g' -e 's/^\(nul\|prn\|con\|lpt[0-9]\|com[0-9]\|aux\)\(\.\|$\)//i' -e 's/^\.*$//' -e 's/^$/NONAME/')

if (test "$filename" != "$filename_clean")
then
mv -v "$1" "$directory/$filename_clean"
fi
}

export -f sanitize

sanitize_dir() {
find "$1" -depth -exec bash -c 'sanitize "$0"' {} \;
}

sanitize_dir '/path/to/somewhere'for f in _ ; do
mv "$f" "$f.html"
doneecho "</body></html>" | tee -a _.html #!/bin/bash

link="#insert url here#"
#links were a set of strings with just the index of the video as the variable

num=3  
#first video was numbered 3 - weird.

ext=".mp4"

while [ $num -le 66 ]
do
wget $link$num$ext -P ~/Downloads/ 
      num=$(($num+1))
done
sudo apt install rename

rename 's/\.txt$/.doc/' \*.txt

# Recursive:

find . -name "_.\.js\.download" -exec rename 's/\.js\.download$/.js/' '{}' +find . -name '_.md' | cpio -pdm './../Markdown'sudo apt install rsync

rsync -a -f"+ _/" -f"- _" source/ destination/#install unzip:
sudo apt install unzip

# recursivley unzip all zip files into a folder by the same name:

find . -name "\*.zip" | while read filename; do unzip -o -d "`dirname "$filename"`" "$filename"; done;

# recursivley delete .zip files when done:

find . -name "_.zip" -type f -print -deletecat _.html > example.htmlsudo apt install pandoc

pandoc \*.md> -o \_example.htmlsudo apt install pandoc

find ./ -iname "\*.html" -type f -exec sh -c 'pandoc "${0}" -o "${0%.html}.md"' {} \;sudo apt install pandoc

find ./ -iname "\*.md" -type f -exec sh -c 'pandoc "${0}" -o "${0%.md}.html"' {} \;

for f in \*.html; do printf '%s\n' 0a '<!DOCTYPE html>

<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>

<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" integrity="sha384-JcKb8q3iqJ61gNV9KGb8thSsNjpSL0n8PARn9HuZOnIxN0hoP+VmmDGMN5t9UJ0Z" crossorigin="anonymous">
<link rel="stylesheet" href="./prism.css">
<script async defer src="./prism.js"></script>
</head>
<body>;' . x | ex "$f"; done
echo "</body></html>" | tee -a *.htmlfor x in "./"/*/; do
  (cd "$x"
   files=(*)
   printf '%s\n' "${files[@]}" > deleteme.txt
  )
donefind . -size +75M -a -print -a -exec rm -f {} \;find . \( -name ".git" -o -name ".gitignore" -o -name ".gitmodules" -o -name ".gitattributes" \) -exec rm -rf -- {} +
# check what you are about to delete before deleting:

find . -name "\*.zip" -type f -print

#Delete:

find . -name "\*.zip" -type f -print -delete#!/bin/sh

# find ./ | grep -i "\.\*$" >files

find ./ | sed -E -e 's/([^ ]+[ ]+){8}//' | grep -i "\.\*$">files
listing="files"

out=""

html="index.html"
out="basename $out.html"
html="index.html"
cmd() {

echo ' <!DOCTYPE html>'
echo '<html>'
echo '<head>'

echo ' <meta http-equiv="Content-Type" content="text/html">'

echo ' <meta name="Author" content="Bryan Guner">'
echo '<link rel="stylesheet" href="./assets/prism.css">'
echo ' <link rel="stylesheet" href="./assets/style.css">'
echo ' <script async defer src="./assets/prism.js"></script>'

echo " <title> directory </title>"

echo ""
echo '<style>'

echo ' a {'
echo ' color: black;'
echo ' }'
echo ''
echo ' li {'
echo ' border: 1px solid black !important;'
echo ' font-size: 20px;'
echo ' letter-spacing: 0px;'
echo ' font-weight: 700;'
echo ' line-height: 16px;'
echo ' text-decoration: none !important;'
echo ' text-transform: uppercase;'
echo ' background: #194ccdaf !important;'
echo ' color: black !important;'
echo ' border: none;'
echo ' cursor: pointer;'
echo ' justify-content: center;'
echo ' padding: 30px 60px;'
echo ' height: 48px;'
echo ' text-align: center;'
echo ' white-space: normal;'
echo ' border-radius: 10px;'
echo ' min-width: 45em;'
echo ' padding: 1.2em 1em 0;'
echo ' box-shadow: 0 0 5px;'
echo ' margin: 1em;'
echo ' display: grid;'
echo ' -webkit-border-radius: 10px;'
echo ' -moz-border-radius: 10px;'
echo ' -ms-border-radius: 10px;'
echo ' -o-border-radius: 10px;'
echo ' }'
echo ' </style>'
echo '</head>'

echo '<body>'

echo ""

#################### continue with the HTML stuff:

echo ""

echo ""

echo "<ul>"

awk '{print "<li><a href=\""$1"\">",$1,"&nbsp;</a></li>"}' $listing

# awk '{print "<li>"};

# {print " <a href=\""$1"\">",$1,"</a></li>&nbsp;"}' \ $listing

echo ""

echo "</ul>"

echo "</body>"

echo "</html>"

}

cmd $listing --sort=extension >>$html

lynx -dump https://distrokid.com/hyperfollow/mihirbeg/getting-there | awk '/http/{print $2}' > links2.txt

## OR--------------------------------------------------------------------------------

wget -qO- www.instagram.com/mihirbeg/ |
grep -Eoi '<a [^>]+>' |
grep -Eo 'href="[^\"]+"' |
grep -Eo '(http|https)://[^/"]+'>output.mdgit filter-branch --index-filter 'git rm -r --cached --ignore-unmatch assets/\_website-components/0-DOJO/widgets-master/output/info/stats.json' HEAD
find ./ | grep -i "\.html*$"for f in *.txt; do printf '%s\n' 0a 'TEXT YOU WISH TO APPEND TO BEGINNING OF EVERY FILE' . x | ex "$f"; donewget -r -A.pdf https://overapi.com/gitwget --wait=2 --level=inf --limit-rate=20K --recursive --page-requisites --user-agent=Mozilla --no-parent --convert-links --adjust-extension --no-clobber -e robots=off <url>

## OR--------------------------------------------------------------------------------

sudo apt install httrack
httrack --ext-depth=2 <url>

find . -name cookies.txt -type f -exec rm -rf {} \;find . -type f -exec sed -i '/badFolder/d' ./\* {} \;npm i -g recursive-install

npm-recursive-installsed -n -e '/<script>/,/<\/script>/p' example.html >out.jsfind . -name 'node_modules' -type d -prune -exec rm -rf '{}' +sanitize() {
shopt -s extglob;

filename=$(basename "$1")
  directory=$(dirname "$1")

filename_clean=$(echo "$filename" | sed -e 's/[\\/:\*\?"<>\|\x01-\x1F\x7F]//g' -e 's/^\(nul\|prn\|con\|lpt[0-9]\|com[0-9]\|aux\)\(\.\|$\)//i' -e 's/^\.*$//' -e 's/^$/NONAME/')

if (test "$filename" != "$filename_clean")
then
mv -v "$1" "$directory/$filename_clean"
fi
}

export -f sanitize

sanitize_dir() {
find "$1" -depth -exec bash -c 'sanitize "$0"' {} \;
}

sanitize_dir '/path/to/somewhere'for f in _ ; do
mv "$f" "$f.html"
doneecho "</body></html>" | tee -a _.html #!/bin/bash

link="#insert url here#"
#links were a set of strings with just the index of the video as the variable

num=3  
#first video was numbered 3 - weird.

ext=".mp4"

while [ $num -le 66 ]
do
wget $link$num$ext -P ~/Downloads/ 
      num=$(($num+1))
done
sudo apt install rename

rename 's/\.txt$/.doc/' \*.txt

# Recursive:

find . -name "_.\.js\.download" -exec rename 's/\.js\.download$/.js/' '{}' +find . -name '_.md' | cpio -pdm './../Markdown'sudo apt install rsync

rsync -a -f"+ _/" -f"- _" source/ destination/#install unzip:
sudo apt install unzip

# recursivley unzip all zip files into a folder by the same name:

find . -name "\*.zip" | while read filename; do unzip -o -d "`dirname "$filename"`" "$filename"; done;

# recursivley delete .zip files when done:

find . -name "_.zip" -type f -print -deletecat _.html > example.htmlsudo apt install pandoc

pandoc \*.md> -o \_example.htmlsudo apt install pandoc

find ./ -iname "\*.html" -type f -exec sh -c 'pandoc "${0}" -o "${0%.html}.md"' {} \;sudo apt install pandoc

find ./ -iname "\*.md" -type f -exec sh -c 'pandoc "${0}" -o "${0%.md}.html"' {} \;

for f in \*.html; do printf '%s\n' 0a '<!DOCTYPE html>

<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>

<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" integrity="sha384-JcKb8q3iqJ61gNV9KGb8thSsNjpSL0n8PARn9HuZOnIxN0hoP+VmmDGMN5t9UJ0Z" crossorigin="anonymous">
<link rel="stylesheet" href="./prism.css">
<script async defer src="./prism.js"></script>
</head>
<body>;' . x | ex "$f"; done
echo "</body></html>" | tee -a *.htmlfor x in "./"/*/; do
  (cd "$x"
   files=(*)
   printf '%s\n' "${files[@]}" > deleteme.txt
  )
donefind . -size +75M -a -print -a -exec rm -f {} \;find . \( -name ".git" -o -name ".gitignore" -o -name ".gitmodules" -o -name ".gitattributes" \) -exec rm -rf -- {} +
# check what you are about to delete before deleting:

find . -name "\*.zip" -type f -print

#Delete:

find . -name "\*.zip" -type f -print -delete#!/bin/sh

# find ./ | grep -i "\.\*$" >files

find ./ | sed -E -e 's/([^ ]+[ ]+){8}//' | grep -i "\.\*$">files
listing="files"

out=""

html="index.html"
out="basename $out.html"
html="index.html"
cmd() {

echo ' <!DOCTYPE html>'
echo '<html>'
echo '<head>'

echo ' <meta http-equiv="Content-Type" content="text/html">'

echo ' <meta name="Author" content="Bryan Guner">'
echo '<link rel="stylesheet" href="./assets/prism.css">'
echo ' <link rel="stylesheet" href="./assets/style.css">'
echo ' <script async defer src="./assets/prism.js"></script>'

echo " <title> directory </title>"

echo ""
echo '<style>'

echo ' a {'
echo ' color: black;'
echo ' }'
echo ''
echo ' li {'
echo ' border: 1px solid black !important;'
echo ' font-size: 20px;'
echo ' letter-spacing: 0px;'
echo ' font-weight: 700;'
echo ' line-height: 16px;'
echo ' text-decoration: none !important;'
echo ' text-transform: uppercase;'
echo ' background: #194ccdaf !important;'
echo ' color: black !important;'
echo ' border: none;'
echo ' cursor: pointer;'
echo ' justify-content: center;'
echo ' padding: 30px 60px;'
echo ' height: 48px;'
echo ' text-align: center;'
echo ' white-space: normal;'
echo ' border-radius: 10px;'
echo ' min-width: 45em;'
echo ' padding: 1.2em 1em 0;'
echo ' box-shadow: 0 0 5px;'
echo ' margin: 1em;'
echo ' display: grid;'
echo ' -webkit-border-radius: 10px;'
echo ' -moz-border-radius: 10px;'
echo ' -ms-border-radius: 10px;'
echo ' -o-border-radius: 10px;'
echo ' }'
echo ' </style>'
echo '</head>'

echo '<body>'

echo ""

#################### continue with the HTML stuff:

echo ""

echo ""

echo "<ul>"

awk '{print "<li><a href=\""$1"\">",$1,"&nbsp;</a></li>"}' $listing

# awk '{print "<li>"};

# {print " <a href=\""$1"\">",$1,"</a></li>&nbsp;"}' \ $listing

echo ""

echo "</ul>"

echo "</body>"

echo "</html>"

}

cmd $listing --sort=extension >>$html

lynx -dump https://distrokid.com/hyperfollow/mihirbeg/getting-there | awk '/http/{print $2}' > links2.txt

## OR--------------------------------------------------------------------------------

wget -qO- www.instagram.com/mihirbeg/ |
grep -Eoi '<a [^>]+>' |
grep -Eo 'href="[^\"]+"' |
grep -Eo '(http|https)://[^/"]+'>output.mdgit filter-branch --index-filter 'git rm -r --cached --ignore-unmatch assets/\_website-components/0-DOJO/widgets-master/output/info/stats.json' HEAD
find ./ | grep -i "\.html*$"for f in *.txt; do printf '%s\n' 0a 'TEXT YOU WISH TO APPEND TO BEGINNING OF EVERY FILE' . x | ex "$f"; donewget -r -A.pdf https://overapi.com/gitwget --wait=2 --level=inf --limit-rate=20K --recursive --page-requisites --user-agent=Mozilla --no-parent --convert-links --adjust-extension --no-clobber -e robots=off <url>

## OR--------------------------------------------------------------------------------

sudo apt install httrack
httrack --ext-depth=2 <url>

find . -name cookies.txt -type f -exec rm -rf {} \;find . -type f -exec sed -i '/badFolder/d' ./\* {} \;npm i -g recursive-install

npm-recursive-installsed -n -e '/<script>/,/<\/script>/p' example.html >out.jsfind . -name 'node_modules' -type d -prune -exec rm -rf '{}' +sanitize() {
shopt -s extglob;

filename=$(basename "$1")
  directory=$(dirname "$1")

filename_clean=$(echo "$filename" | sed -e 's/[\\/:\*\?"<>\|\x01-\x1F\x7F]//g' -e 's/^\(nul\|prn\|con\|lpt[0-9]\|com[0-9]\|aux\)\(\.\|$\)//i' -e 's/^\.*$//' -e 's/^$/NONAME/')

if (test "$filename" != "$filename_clean")
then
mv -v "$1" "$directory/$filename_clean"
fi
}

export -f sanitize

sanitize_dir() {
find "$1" -depth -exec bash -c 'sanitize "$0"' {} \;
}

sanitize_dir '/path/to/somewhere'for f in _ ; do
mv "$f" "$f.html"
doneecho "</body></html>" | tee -a _.html #!/bin/bash

link="#insert url here#"
#links were a set of strings with just the index of the video as the variable

num=3  
#first video was numbered 3 - weird.

ext=".mp4"

while [ $num -le 66 ]
do
wget $link$num$ext -P ~/Downloads/ 
      num=$(($num+1))
done
sudo apt install rename

rename 's/\.txt$/.doc/' \*.txt

# Recursive:

find . -name "_.\.js\.download" -exec rename 's/\.js\.download$/.js/' '{}' +find . -name '_.md' | cpio -pdm './../Markdown'sudo apt install rsync

rsync -a -f"+ _/" -f"- _" source/ destination/#install unzip:
sudo apt install unzip

# recursivley unzip all zip files into a folder by the same name:

find . -name "\*.zip" | while read filename; do unzip -o -d "`dirname "$filename"`" "$filename"; done;

# recursivley delete .zip files when done:

find . -name "_.zip" -type f -print -deletecat _.html > example.htmlsudo apt install pandoc

pandoc \*.md> -o \_example.htmlsudo apt install pandoc

find ./ -iname "\*.html" -type f -exec sh -c 'pandoc "${0}" -o "${0%.html}.md"' {} \;sudo apt install pandoc

find ./ -iname "\*.md" -type f -exec sh -c 'pandoc "${0}" -o "${0%.md}.html"' {} \;

for f in \*.html; do printf '%s\n' 0a '<!DOCTYPE html>

<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>

<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" integrity="sha384-JcKb8q3iqJ61gNV9KGb8thSsNjpSL0n8PARn9HuZOnIxN0hoP+VmmDGMN5t9UJ0Z" crossorigin="anonymous">
<link rel="stylesheet" href="./prism.css">
<script async defer src="./prism.js"></script>
</head>
<body>;' . x | ex "$f"; done
echo "</body></html>" | tee -a *.htmlfor x in "./"/*/; do
  (cd "$x"
   files=(*)
   printf '%s\n' "${files[@]}" > deleteme.txt
  )
donefind . -size +75M -a -print -a -exec rm -f {} \;find . \( -name ".git" -o -name ".gitignore" -o -name ".gitmodules" -o -name ".gitattributes" \) -exec rm -rf -- {} +
# check what you are about to delete before deleting:

find . -name "\*.zip" -type f -print

#Delete:

find . -name "\*.zip" -type f -print -delete#!/bin/sh

# find ./ | grep -i "\.\*$" >files

find ./ | sed -E -e 's/([^ ]+[ ]+){8}//' | grep -i "\.\*$">files
listing="files"

out=""

html="index.html"
out="basename $out.html"
html="index.html"
cmd() {

echo ' <!DOCTYPE html>'
echo '<html>'
echo '<head>'

echo ' <meta http-equiv="Content-Type" content="text/html">'

echo ' <meta name="Author" content="Bryan Guner">'
echo '<link rel="stylesheet" href="./assets/prism.css">'
echo ' <link rel="stylesheet" href="./assets/style.css">'
echo ' <script async defer src="./assets/prism.js"></script>'

echo " <title> directory </title>"

echo ""
echo '<style>'

echo ' a {'
echo ' color: black;'
echo ' }'
echo ''
echo ' li {'
echo ' border: 1px solid black !important;'
echo ' font-size: 20px;'
echo ' letter-spacing: 0px;'
echo ' font-weight: 700;'
echo ' line-height: 16px;'
echo ' text-decoration: none !important;'
echo ' text-transform: uppercase;'
echo ' background: #194ccdaf !important;'
echo ' color: black !important;'
echo ' border: none;'
echo ' cursor: pointer;'
echo ' justify-content: center;'
echo ' padding: 30px 60px;'
echo ' height: 48px;'
echo ' text-align: center;'
echo ' white-space: normal;'
echo ' border-radius: 10px;'
echo ' min-width: 45em;'
echo ' padding: 1.2em 1em 0;'
echo ' box-shadow: 0 0 5px;'
echo ' margin: 1em;'
echo ' display: grid;'
echo ' -webkit-border-radius: 10px;'
echo ' -moz-border-radius: 10px;'
echo ' -ms-border-radius: 10px;'
echo ' -o-border-radius: 10px;'
echo ' }'
echo ' </style>'
echo '</head>'

echo '<body>'

echo ""

#################### continue with the HTML stuff:

echo ""

echo ""

echo "<ul>"

awk '{print "<li><a href=\""$1"\">",$1,"&nbsp;</a></li>"}' $listing

# awk '{print "<li>"};

# {print " <a href=\""$1"\">",$1,"</a></li>&nbsp;"}' \ $listing

echo ""

echo "</ul>"

echo "</body>"

echo "</html>"

}

cmd $listing --sort=extension >>$html

lynx -dump https://distrokid.com/hyperfollow/mihirbeg/getting-there | awk '/http/{print $2}' > links2.txt

## OR--------------------------------------------------------------------------------

wget -qO- www.instagram.com/mihirbeg/ |
grep -Eoi '<a [^>]+>' |
grep -Eo 'href="[^\"]+"' |
grep -Eo '(http|https)://[^/"]+'>output.mdgit filter-branch --index-filter 'git rm -r --cached --ignore-unmatch assets/\_website-components/0-DOJO/widgets-master/output/info/stats.json' HEAD
find ./ | grep -i "\.html*$"for f in *.txt; do printf '%s\n' 0a 'TEXT YOU WISH TO APPEND TO BEGINNING OF EVERY FILE' . x | ex "$f"; donewget -r -A.pdf https://overapi.com/gitwget --wait=2 --level=inf --limit-rate=20K --recursive --page-requisites --user-agent=Mozilla --no-parent --convert-links --adjust-extension --no-clobber -e robots=off <url>

## OR--------------------------------------------------------------------------------

sudo apt install httrack
httrack --ext-depth=2 <url>

find . -name cookies.txt -type f -exec rm -rf {} \;find . -type f -exec sed -i '/badFolder/d' ./\* {} \;npm i -g recursive-install

npm-recursive-installsed -n -e '/<script>/,/<\/script>/p' example.html >out.jsfind . -name 'node_modules' -type d -prune -exec rm -rf '{}' +sanitize() {
shopt -s extglob;

filename=$(basename "$1")
  directory=$(dirname "$1")

filename_clean=$(echo "$filename" | sed -e 's/[\\/:\*\?"<>\|\x01-\x1F\x7F]//g' -e 's/^\(nul\|prn\|con\|lpt[0-9]\|com[0-9]\|aux\)\(\.\|$\)//i' -e 's/^\.*$//' -e 's/^$/NONAME/')

if (test "$filename" != "$filename_clean")
then
mv -v "$1" "$directory/$filename_clean"
fi
}

export -f sanitize

sanitize_dir() {
find "$1" -depth -exec bash -c 'sanitize "$0"' {} \;
}

sanitize_dir '/path/to/somewhere'for f in _ ; do
mv "$f" "$f.html"
doneecho "</body></html>" | tee -a _.html #!/bin/bash

link="#insert url here#"
#links were a set of strings with just the index of the video as the variable

num=3  
#first video was numbered 3 - weird.

ext=".mp4"

while [ $num -le 66 ]
do
wget $link$num$ext -P ~/Downloads/ 
      num=$(($num+1))
done
sudo apt install rename

rename 's/\.txt$/.doc/' \*.txt

# Recursive:

find . -name "_.\.js\.download" -exec rename 's/\.js\.download$/.js/' '{}' +find . -name '_.md' | cpio -pdm './../Markdown'sudo apt install rsync

rsync -a -f"+ _/" -f"- _" source/ destination/#install unzip:
sudo apt install unzip

# recursivley unzip all zip files into a folder by the same name:

find . -name "\*.zip" | while read filename; do unzip -o -d "`dirname "$filename"`" "$filename"; done;

# recursivley delete .zip files when done:

find . -name "_.zip" -type f -print -deletecat _.html > example.htmlsudo apt install pandoc

pandoc \*.md> -o \_example.htmlsudo apt install pandoc

find ./ -iname "\*.html" -type f -exec sh -c 'pandoc "${0}" -o "${0%.html}.md"' {} \;sudo apt install pandoc

find ./ -iname "\*.md" -type f -exec sh -c 'pandoc "${0}" -o "${0%.md}.html"' {} \;

for f in \*.html; do printf '%s\n' 0a '<!DOCTYPE html>

<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>

<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" integrity="sha384-JcKb8q3iqJ61gNV9KGb8thSsNjpSL0n8PARn9HuZOnIxN0hoP+VmmDGMN5t9UJ0Z" crossorigin="anonymous">
<link rel="stylesheet" href="./prism.css">
<script async defer src="./prism.js"></script>
</head>
<body>;' . x | ex "$f"; done
echo "</body></html>" | tee -a *.htmlfor x in "./"/*/; do
  (cd "$x"
   files=(*)
   printf '%s\n' "${files[@]}" > deleteme.txt
  )
donefind . -size +75M -a -print -a -exec rm -f {} \;find . \( -name ".git" -o -name ".gitignore" -o -name ".gitmodules" -o -name ".gitattributes" \) -exec rm -rf -- {} +
# check what you are about to delete before deleting:

find . -name "\*.zip" -type f -print

#Delete:

find . -name "\*.zip" -type f -print -delete#!/bin/sh

# find ./ | grep -i "\.\*$" >files

find ./ | sed -E -e 's/([^ ]+[ ]+){8}//' | grep -i "\.\*$">files
listing="files"

out=""

html="index.html"
out="basename $out.html"
html="index.html"
cmd() {

echo ' <!DOCTYPE html>'
echo '<html>'
echo '<head>'

echo ' <meta http-equiv="Content-Type" content="text/html">'

echo ' <meta name="Author" content="Bryan Guner">'
echo '<link rel="stylesheet" href="./assets/prism.css">'
echo ' <link rel="stylesheet" href="./assets/style.css">'
echo ' <script async defer src="./assets/prism.js"></script>'

echo " <title> directory </title>"

echo ""
echo '<style>'

echo ' a {'
echo ' color: black;'
echo ' }'
echo ''
echo ' li {'
echo ' border: 1px solid black !important;'
echo ' font-size: 20px;'
echo ' letter-spacing: 0px;'
echo ' font-weight: 700;'
echo ' line-height: 16px;'
echo ' text-decoration: none !important;'
echo ' text-transform: uppercase;'
echo ' background: #194ccdaf !important;'
echo ' color: black !important;'
echo ' border: none;'
echo ' cursor: pointer;'
echo ' justify-content: center;'
echo ' padding: 30px 60px;'
echo ' height: 48px;'
echo ' text-align: center;'
echo ' white-space: normal;'
echo ' border-radius: 10px;'
echo ' min-width: 45em;'
echo ' padding: 1.2em 1em 0;'
echo ' box-shadow: 0 0 5px;'
echo ' margin: 1em;'
echo ' display: grid;'
echo ' -webkit-border-radius: 10px;'
echo ' -moz-border-radius: 10px;'
echo ' -ms-border-radius: 10px;'
echo ' -o-border-radius: 10px;'
echo ' }'
echo ' </style>'
echo '</head>'

echo '<body>'

echo ""

#################### continue with the HTML stuff:

echo ""

echo ""

echo "<ul>"

awk '{print "<li><a href=\""$1"\">",$1,"&nbsp;</a></li>"}' $listing

# awk '{print "<li>"};

# {print " <a href=\""$1"\">",$1,"</a></li>&nbsp;"}' \ $listing

echo ""

echo "</ul>"

echo "</body>"

echo "</html>"

}

cmd $listing --sort=extension >>$html

lynx -dump https://distrokid.com/hyperfollow/mihirbeg/getting-there | awk '/http/{print $2}' > links2.txt

## OR--------------------------------------------------------------------------------

wget -qO- www.instagram.com/mihirbeg/ |
grep -Eoi '<a [^>]+>' |
grep -Eo 'href="[^\"]+"' |
grep -Eo '(http|https)://[^/"]+'>output.mdgit filter-branch --index-filter 'git rm -r --cached --ignore-unmatch assets/\_website-components/0-DOJO/widgets-master/output/info/stats.json' HEAD
find ./ | grep -i "\.html\*$"{
"name": "bash-utility-commands",
"version": "1.0.0",
"lockfileVersion": 1,
"requires": true,
"dependencies": {
"bluebird": {
"version": "3.7.2",
"resolved": "https://registry.npmjs.org/bluebird/-/bluebird-3.7.2.tgz",
"integrity": "sha512-XpNj6GDQzdfW+r2Wnn7xiSAd7TM3jzkxGXBGTtWKuSXv1xUV+azxAm8jdWZN06QTQk+2N2XB9jRDkvbmQmcRtg=="
},
"file-match": {
"version": "1.0.2",
"resolved": "https://registry.npmjs.org/file-match/-/file-match-1.0.2.tgz",
"integrity": "sha1-ycrSZdLIrfOoFHWw30dYWQafrvc=",
"requires": {
"utils-extend": "^1.0.6"
}
},
"file-system": {
"version": "2.2.2",
"resolved": "https://registry.npmjs.org/file-system/-/file-system-2.2.2.tgz",
"integrity": "sha1-fWWDPjojR9zZVqgTxncVPtPt2Yc=",
"requires": {
"file-match": "^1.0.1",
"utils-extend": "^1.0.4"
}
},
"utils-extend": {
"version": "1.0.8",
"resolved": "https://registry.npmjs.org/utils-extend/-/utils-extend-1.0.8.tgz",
"integrity": "sha1-zP17ZFQPjpDuIe7Fd2nQZRyril8="
}
}
}
{
"name": "bash-utility-commands",
"version": "1.0.0",
"description": "write-all-commands-to-file",
"main": "write-directory-2-file.js",
"scripts": {
"test": "npm start"
},
"author": "Bryan Guner",
"license": "MIT",
"dependencies": {
"bluebird": "^3.7.2",
"file-system": "^2.2.2"
}
}

ls -R './' | awk '
/:$/&&f{s=$0;f=0}
/:$/&&!f{sub(/:$/,"");s=$0;f=1;next}
NF&&f{ print s"/"$0 }'>listing.mdfind . -type f -exec sed -i '/badText/d' ./\*.html {} \;

# Recursivley remove from all html files any lines contaning the string "badText"#install unzip:

sudo apt install unzip

# recursivley unzip all zip files into a folder by the same name:

find . -name "\*.zip" | while read filename; do unzip -o -d "`dirname "$filename"`" "$filename"; done;

# recursivley delete .zip files when done:

find . -name "\*.zip" -type f -print -deleten=1;
max=50;
while [ "$n" -le "$max" ]; do
mkdir "s$n"
  n=`expr "$n" + 1`;
done git config --global credential.helper storesudo apt install uniq

uniq -u input.txt output.txt
for f in _/; do nf=$(echo "$f" |sed -e 's/[^a-za-z0-9.]/./g' -e 's/\.\.\././g' -e 's/\.\././g' -e 's/\._$//'); test "$f" != "$nf" && mv "$f" "$nf" && echo "$nf"; donesed -i '/target-string/d' ./js-in-one-page.html

# examples:

sed -i '/\.git/d' ./index.html

# Recursive

find . -type f -a \( -name "_.html" -o -name "_.js" -o -name "_.css" -o -name "_.md" \) -a -exec sed -i '/BADSTRING/d' '{}' +

find . -name "*" -type f | xargs sed -i -e '/Mirrored from/d'for filename in *badString*; do mv "$filename" "${filename//badstring/replaceString}"; donerename 's/ *$//' \*# recursivley remove empty files
find . -empty -type f -print -delete

# recursivley remove empty folders

find . -empty -type d -print -delete

# recursively remove .git folder, .gitignore file and .gitmodules file and .gitattributes file

find . \( -name ".git" -o -name ".gitignore" -o -name ".gitmodules" -o -name ".gitattributes" \) -exec rm -rf -- {} +

# Recursivley remove security, release, changelog, License & contributing files

find . \( -name "*SECURITY.txt" -o -name "*RELEASE.txt" -o -name "*CHANGELOG.txt" -o -name "*LICENSE.txt" -o -name "*CONTRIBUTING.txt" -name "*HISTORY.md" -o -name "*LICENSE" -o -name "*SECURITY.md" -o -name "*RELEASE.md" -o -name "*CHANGELOG.md" -o -name "*LICENSE.md" -o -name "*CODE_OF_CONDUCT.md" -o -name "\*CONTRIBUTING.md" \) -exec rm -rf -- {} +

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>

<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>bash-utility-commands</title>
    <meta name="generator" content="HTML Tidy for Linux (vers 25 March 2009), see www.w3.org" />
    <meta http-equiv="Content-Type" content="text/html; charset=us-ascii" />
    <title>Stable</title>
    <!-- Optional theme -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap-theme.min.css"
        integrity="sha384-rHyoN1iRsVXV4nD0JutlnGaslCJuC7uwjduW9SVrLvRYooPp2bWYgmgJQIXwl/Sp" crossorigin="anonymous"
        type="text/css" />
    <!-- Latest compiled and minified JavaScript -->
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"
        integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" crossorigin="anonymous"
        type="text/javascript"></script>
    <style type="text/css">
        /*<![CDATA[*/
        /* Basic */
        @-ms-viewport {
            width: device-width;
        }
        body {
            -ms-overflow-style: scrollbar;
		zoom:0.45;
        }
        @media screen and (max-width: 480px) {
            html,
            body {
                min-width: 320px;
            }
        }
        html {
            box-sizing: border-box;
        }
        *,
        *:before,
        *:after {
            box-sizing: inherit;
        }
        body {
            background-color: whitesmoke;
        }
        body.is-preload *,
        body.is-preload *:before,
        body.is-preload *:after {
            -moz-animation: none !important;
            -webkit-animation: none !important;
            -ms-animation: none !important;
            animation: none !important;
            -moz-transition: none !important;
            -webkit-transition: none !important;
            -ms-transition: none !important;
            transition: none !important;
        }
        /* Type */
        html {
            font-size: 13pt;
        }
        @media screen and (max-width: 1680px) {
            html {
                font-size: 10pt;
            }
        }
        @media screen and (max-width: 1280px) {
            html {
                font-size: 11pt;
            }
        }
        @media screen and (max-width: 360px) {
            html {
                font-size: 10pt;
            }
        }
        body {
            color: #212931;
        }
        body,
        input,
        select,
        textarea {
            font-family: "Merriweather", Georgia, serif;
            font-weight: 300;
            font-size: 1rem;
            line-height: 2.375;
        }
        a {
            -moz-transition: color 0.2s ease-in-out, background-color 0.2s ease-in-out, border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
            -webkit-transition: color 0.2s ease-in-out, background-color 0.2s ease-in-out, border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
            -ms-transition: color 0.2s ease-in-out, background-color 0.2s ease-in-out, border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
            transition: color 0.2s ease-in-out, background-color 0.2s ease-in-out, border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
            border-bottom: dotted 1px;
            text-decoration: none;
        }
        a:hover {
            border-bottom-color: transparent;
        }
        @charset "UTF-8";
        @import url(https://fonts.googleapis.com/css?family=Open+Sans:300,400,700);
        HTML {
            font-size: medium;
            font-family: Garamond
        }
        BODY {
            background: black font-family: 'Open Sans', sans-serif;
            font-weight: 300;
            line-height: 1em;
            color: #A7A1AE;
            background-color: #1F2739;
        }
        h1 {
            font-size: 3em;
            font-weight: 300;
            line-height: 1em;
            text-align: left;
            color: #4DC3FA;
        }
        p {
            color: grey;
        }
        A {
            text-decoration: none color:black;
        }
        A:hover {
            color: red;
            background: whitesmoke;
            border-radius: 8px;
            padding-left: 3px;
            padding-right: 3px;
        }
        TABLE.fancy {
            background: #fffefe;
            border-left: 3px solid;
            border-collapse: collapse;
            margin: 25px 0;
            font-size: 0.8em;
            font-family: sans-serif;
            min-width: 350px;
            box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
            border-top: 1px solid;
            border-bottom: 0px solid;
            border-color: #FFF;
            overflow-y: scroll;
            width: 80%;
            display: table;
            padding: 0 0 8em 0;
        }
        TABLE.fancy TD {
            border-right: 1px solid;
            border-bottom: 1px solid;
            border-color: #FFF;
            text-align: left;
            padding-right: 2%px;
            padding-bottom: 2%;
            padding-top: 2%;
            padding-left: 2%;
            border: 4px solid gold !important;
            font-size: 16px;
            letter-spacing: 1px;
            font-weight: 570;
            line-height: 12px;
            text-decoration: none !important;
            text-transform: uppercase;
            background: #07122daf !important;
            color: black !important;
            cursor: pointer;
            justify-content: center;
            padding: 30px 50px;
            height: 55px;
            text-align: center;
            white-space: normal;
            border-radius: 10px;
            min-width: 10em;
            padding: .9em .9em 0;
            box-shadow: 0 0 5px;
            margin: 1em;
            -webkit-border-radius: 10px;
            -moz-border-radius: 10px;
            -ms-border-radius: 10px;
            -o-border-radius: 20px;
        }
        TABLE.fancy tr:nth-child(odd) {
            background-color: #323C50;
        }
        TABLE.fancy tr:nth-child(even) {
            background-color: #2C3446;
        }
        TABLE.fancy th {
            background-color: #1F2739;
        }
        TABLE.fancy td,
        TABLE.fancy th {
            padding-bottom: 2%;
            padding-top: 2%;
            padding-left: 2%;
        }
        TABLE.fancy tr:hover {
            background-color: #464A52;
            -webkit-box-shadow: 0 6px 6px -6px #0E1119;
            -moz-box-shadow: 0 6px 6px -6px #0E1119;
            box-shadow: 0 6px 6px -6px #0E1119;
        }
        TABLE.fancy td:hover {
            background-color: #FFF842;
            color: #403E10;
            font-weight: bold;
            box-shadow: #7F7C21 -1px 1px, #7F7C21 -2px 2px, #7F7C21 -3px 3px, #7F7C21 -4px 4px, #7F7C21 -5px 5px, #7F7C21 -6px 6px;
            transform: translate3d(6px, -6px, 0);
            transition-delay: 0s;
            transition-duration: 0.4s;
            transition-property: all;
            transition-timing-function: line;
        }
        @media (max-width: 800px) {
            TABLE.fancy td:nth-child(4),
            TABLE.fancy th:nth-child(4) {
                display: none;
            }
        }
        TABLE.fancy TD.no-right {
            border-right: 0px
        }
        TABLE.fancy TD.right {
            text-align: left
        }
        TABLE.fancy TD.left {
            text-align: center
        }
        TABLE.fancy a {
            color: yellow;
        }
        TABLE.fancy TH {
            border-right: 1px solid;
            border-bottom: 1px solid;
            text-align: left;
            background: black;
            color: #FFF;
            border-color: #FFF;
            font-weight: bold;
            padding: 12px 15px;
        }
        .anchor {
            font-weight: bold;
            border-top: 0px solid;
            text-align: left;
            border-bottom: 1px solid;
            background: black;
            color: #FFF
        }
        .dark-blue {
            font-weight: bold;
            border-top: 0px solid;
            text-align: left;
            border-bottom: 1px solid;
            background: black;
            color: #FFF
        }
        .no-top-border {
            border-top: 0px
        }
        .centered {
            margin: auto
        }
        .rZ {
            text-align: right
        }
        .row2 {
            background: #D3D3E1
        }
        /*]]>*/
    </style>
</head>

<body>

<table border="0" cellspacing="0" cellpadding="3" summary="file table" class="fancy centered">
<tr><td colspan="10" class="dark-blue" style="text-align: center"><b>Folders</b></td></tr>
<tr><td class="left"><a href="../right.html" target="rframe">&lt;parent&gt;</a></td><td class="left">&nbsp;<a href="node_modules/right.html" target="rframe">node_modules</a></td></tr>
</table>
<br>

<table border="0" cellspacing="0" cellpadding="3" summary="file table" class="fancy centered">
<tr><th><b>File</b></th><th><b>File</b></th><th><b>File</b></th><th><b>File</b></th><th><b>File</b></th><th><b>File</b></th></tr>
<tr><td class="left"><a href="right.html">right.html</a>&nbsp;</td><td class="left"><a href="batch-download-videos.sh">batch-download-videos.sh</a>&nbsp;</td><td class="left"><a href="convert-markdown-2-html.sh">convert-markdown-2-html.sh</a>&nbsp;</td><td class="left"><a href="generate-directory-index.html-from-files-in-working-directory.sh">generate-directory-index.html-from-files-in-working-directory.sh</a>&nbsp;</td><td class="left"><a href="Recursively-remove-files-byname.sh">Recursively-remove-files-byname.sh</a>&nbsp;</td><td class="left"><a href="remove-lines-contaning-string.sh">remove-lines-contaning-string.sh</a>&nbsp;</td></tr>
<tr class="row2"><td class="left"><a href="write-directory-2-file.js">write-directory-2-file.js</a>&nbsp;</td><td class="left"><a href="change-file-extensions.sh">change-file-extensions.sh</a>&nbsp;</td><td class="left"><a href="create-dummy-text-file-4-every-subfolder.sh">create-dummy-text-file-4-every-subfolder.sh</a>&nbsp;</td><td class="left"><a href="get-links-from-webpage.sh">get-links-from-webpage.sh</a>&nbsp;</td><td class="left"><a href="Recursively-remove-folders-byname.sh">Recursively-remove-folders-byname.sh</a>&nbsp;</td><td class="left"><a href="Remove-script-tags-from-html.sh">Remove-script-tags-from-html.sh</a>&nbsp;</td></tr>
<tr><td class="left"><a href="package-lock.json">package-lock.json</a>&nbsp;</td><td class="left"><a href="clone-folder-structure-populate-with-specific-file-type.sh">clone-folder-structure-populate-with-specific-file-type.sh</a>&nbsp;</td><td class="left"><a href="delete-files-bigger-than.sh">delete-files-bigger-than.sh</a>&nbsp;</td><td class="left"><a href="git-filter-branch.sh">git-filter-branch.sh</a>&nbsp;</td><td class="left"><a href="recursivley-create-numbered-folders.sh">recursivley-create-numbered-folders.sh</a>&nbsp;</td><td class="left"><a href="remove-string-from-file-names.sh">remove-string-from-file-names.sh</a>&nbsp;</td></tr>
<tr class="row2"><td class="left"><a href="package.json">package.json</a>&nbsp;</td><td class="left"><a href="clone-folder-structure-without-files.sh">clone-folder-structure-without-files.sh</a>&nbsp;</td><td class="left"><a href="delete-git-files.sh">delete-git-files.sh</a>&nbsp;</td><td class="left"><a href="list-html-files.sh">list-html-files.sh</a>&nbsp;</td><td class="left"><a href="Recusrive-npm-install.sh">Recusrive-npm-install.sh</a>&nbsp;</td><td class="left"><a href="remove-trailing-whitespace-from-file-names.sh">remove-trailing-whitespace-from-file-names.sh</a>&nbsp;</td></tr>
<tr><td class="left"><a href="combined.md">combined.md</a>&nbsp;</td><td class="left"><a href="concatinate-all-html-files.sh">concatinate-all-html-files.sh</a>&nbsp;</td><td class="left"><a href="delete-zip.sh">delete-zip.sh</a>&nbsp;</td><td class="left"><a href="print-file-paths-recursive.sh">print-file-paths-recursive.sh</a>&nbsp;</td><td class="left"><a href="remember-git-credentials.sh">remember-git-credentials.sh</a>&nbsp;</td><td class="left"><a href="remove-unnecessary-files-folders.sh">remove-unnecessary-files-folders.sh</a>&nbsp;</td></tr>
<tr class="row2"><td class="left"><a href="add-extension-to-files-in-folder.sh">add-extension-to-files-in-folder.sh</a>&nbsp;</td><td class="left"><a href="concatinate-markdown-files-to-single-html.sh">concatinate-markdown-files-to-single-html.sh</a>&nbsp;</td><td class="left"><a href="Download-all-weblinks-of-certain-file-type.sh">Download-all-weblinks-of-certain-file-type.sh</a>&nbsp;</td><td class="left"><a href="recursive-remove-lines-contaning-string.sh">recursive-remove-lines-contaning-string.sh</a>&nbsp;</td><td class="left"><a href="remove-duplicate-lines.sh">remove-duplicate-lines.sh</a>&nbsp;</td><td class="left"><a href="Resursivleydeletenodemodules.sh">Resursivleydeletenodemodules.sh</a>&nbsp;</td></tr>
<tr><td class="left"><a href="add-text-2-end-of-file.sh">add-text-2-end-of-file.sh</a>&nbsp;</td><td class="left"><a href="convert-html-2-md.sh">convert-html-2-md.sh</a>&nbsp;</td><td class="left"><a href="Download-website.sh">Download-website.sh</a>&nbsp;</td><td class="left"><a href="recursive-unzip.sh">recursive-unzip.sh</a>&nbsp;</td><td class="left"><a href="remove-invalid-characters-from-file-names.sh">remove-invalid-characters-from-file-names.sh</a>&nbsp;</td><td class="left"><a href="Sanatize-directory.sh">Sanatize-directory.sh</a>&nbsp;</td></tr>
<tr class="row2"><td class="left"><a href="Addtexttothefirstlineofeveryfileofacertainextensioninagivenfolder.sh">Addtexttothefirstlineofeveryfileofacertainextensioninagivenfolder.sh</a>&nbsp;</td><td class="left"></td><td class="left"></td><td class="left"></td><td class="left"></td><td class="left"></td></tr>
</table>

<p style="font-weight: bold; margin-bottom: 0px">
Folders:  2<br>
Files: 43<br>
Size of all files: 24008 K</p>

</body>
</html>// const Promise = require('bluebird')
// const fs = Promise.promisifyAll(require('fs'))
// const path = require('path')
// 
// function catDir (directory, destination)  {
//   return fs.readdirAsync(directory)
//     .map(file => fs.readFileAsync(path.join(directory, file), 'utf8'))
//     .then(contents => fs.writeFileAsync(destination, contents.join('\n')))
// }
// 
// 
// catDir('./','./result.md')
const fs=require('fs');
let cat= require( 'child_process' ).execSync( 'cat *' ).toString( 'UTF-8' )
fs.writeFile( 'output.md', cat, ( err ) => {

// In case of a error throw err.
if ( err ) throw err;
} );
{
"name": "bash-utility-commands",
"version": "1.0.0",
"lockfileVersion": 1,
"requires": true,
"dependencies": {
"bluebird": {
"version": "3.7.2",
"resolved": "https://registry.npmjs.org/bluebird/-/bluebird-3.7.2.tgz",
"integrity": "sha512-XpNj6GDQzdfW+r2Wnn7xiSAd7TM3jzkxGXBGTtWKuSXv1xUV+azxAm8jdWZN06QTQk+2N2XB9jRDkvbmQmcRtg=="
},
"file-match": {
"version": "1.0.2",
"resolved": "https://registry.npmjs.org/file-match/-/file-match-1.0.2.tgz",
"integrity": "sha1-ycrSZdLIrfOoFHWw30dYWQafrvc=",
"requires": {
"utils-extend": "^1.0.6"
}
},
"file-system": {
"version": "2.2.2",
"resolved": "https://registry.npmjs.org/file-system/-/file-system-2.2.2.tgz",
"integrity": "sha1-fWWDPjojR9zZVqgTxncVPtPt2Yc=",
"requires": {
"file-match": "^1.0.1",
"utils-extend": "^1.0.4"
}
},
"utils-extend": {
"version": "1.0.8",
"resolved": "https://registry.npmjs.org/utils-extend/-/utils-extend-1.0.8.tgz",
"integrity": "sha1-zP17ZFQPjpDuIe7Fd2nQZRyril8="
}
}
}
{
"name": "bash-utility-commands",
"version": "1.0.0",
"description": "write-all-commands-to-file",
"main": "write-directory-2-file.js",
"scripts": {
"test": "npm start"
},
"author": "Bryan Guner",
"license": "MIT",
"dependencies": {
"bluebird": "^3.7.2",
"file-system": "^2.2.2"
}
}

ls -R './' | awk '
/:$/&&f{s=$0;f=0}
/:$/&&!f{sub(/:$/,"");s=$0;f=1;next}
NF&&f{ print s"/"$0 }'>listing.mdfind . -type f -exec sed -i '/badText/d' ./\*.html {} \;

# Recursivley remove from all html files any lines contaning the string "badText"#install unzip:

sudo apt install unzip

# recursivley unzip all zip files into a folder by the same name:

find . -name "\*.zip" | while read filename; do unzip -o -d "`dirname "$filename"`" "$filename"; done;

# recursivley delete .zip files when done:

find . -name "\*.zip" -type f -print -deleten=1;
max=50;
while [ "$n" -le "$max" ]; do
mkdir "s$n"
  n=`expr "$n" + 1`;
done git config --global credential.helper storesudo apt install uniq

uniq -u input.txt output.txt
for f in _/; do nf=$(echo "$f" |sed -e 's/[^a-za-z0-9.]/./g' -e 's/\.\.\././g' -e 's/\.\././g' -e 's/\._$//'); test "$f" != "$nf" && mv "$f" "$nf" && echo "$nf"; donesed -i '/target-string/d' ./js-in-one-page.html

# examples:

sed -i '/\.git/d' ./index.html

# Recursive

find . -type f -a \( -name "_.html" -o -name "_.js" -o -name "_.css" -o -name "_.md" \) -a -exec sed -i '/BADSTRING/d' '{}' +

find . -name "*" -type f | xargs sed -i -e '/Mirrored from/d'for filename in *badString*; do mv "$filename" "${filename//badstring/replaceString}"; donerename 's/ *$//' \*# recursivley remove empty files
find . -empty -type f -print -delete

# recursivley remove empty folders

find . -empty -type d -print -delete

# recursively remove .git folder, .gitignore file and .gitmodules file and .gitattributes file

find . \( -name ".git" -o -name ".gitignore" -o -name ".gitmodules" -o -name ".gitattributes" \) -exec rm -rf -- {} +

# Recursivley remove security, release, changelog, License & contributing files

find . \( -name "*SECURITY.txt" -o -name "*RELEASE.txt" -o -name "*CHANGELOG.txt" -o -name "*LICENSE.txt" -o -name "*CONTRIBUTING.txt" -name "*HISTORY.md" -o -name "*LICENSE" -o -name "*SECURITY.md" -o -name "*RELEASE.md" -o -name "*CHANGELOG.md" -o -name "*LICENSE.md" -o -name "*CODE_OF_CONDUCT.md" -o -name "\*CONTRIBUTING.md" \) -exec rm -rf -- {} +

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>

<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>bash-utility-commands</title>
    <meta name="generator" content="HTML Tidy for Linux (vers 25 March 2009), see www.w3.org" />
    <meta http-equiv="Content-Type" content="text/html; charset=us-ascii" />
    <title>Stable</title>
    <!-- Optional theme -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap-theme.min.css"
        integrity="sha384-rHyoN1iRsVXV4nD0JutlnGaslCJuC7uwjduW9SVrLvRYooPp2bWYgmgJQIXwl/Sp" crossorigin="anonymous"
        type="text/css" />
    <!-- Latest compiled and minified JavaScript -->
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"
        integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" crossorigin="anonymous"
        type="text/javascript"></script>
    <style type="text/css">
        /*<![CDATA[*/
        /* Basic */
        @-ms-viewport {
            width: device-width;
        }
        body {
            -ms-overflow-style: scrollbar;
		zoom:0.45;
        }
        @media screen and (max-width: 480px) {
            html,
            body {
                min-width: 320px;
            }
        }
        html {
            box-sizing: border-box;
        }
        *,
        *:before,
        *:after {
            box-sizing: inherit;
        }
        body {
            background-color: whitesmoke;
        }
        body.is-preload *,
        body.is-preload *:before,
        body.is-preload *:after {
            -moz-animation: none !important;
            -webkit-animation: none !important;
            -ms-animation: none !important;
            animation: none !important;
            -moz-transition: none !important;
            -webkit-transition: none !important;
            -ms-transition: none !important;
            transition: none !important;
        }
        /* Type */
        html {
            font-size: 13pt;
        }
        @media screen and (max-width: 1680px) {
            html {
                font-size: 10pt;
            }
        }
        @media screen and (max-width: 1280px) {
            html {
                font-size: 11pt;
            }
        }
        @media screen and (max-width: 360px) {
            html {
                font-size: 10pt;
            }
        }
        body {
            color: #212931;
        }
        body,
        input,
        select,
        textarea {
            font-family: "Merriweather", Georgia, serif;
            font-weight: 300;
            font-size: 1rem;
            line-height: 2.375;
        }
        a {
            -moz-transition: color 0.2s ease-in-out, background-color 0.2s ease-in-out, border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
            -webkit-transition: color 0.2s ease-in-out, background-color 0.2s ease-in-out, border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
            -ms-transition: color 0.2s ease-in-out, background-color 0.2s ease-in-out, border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
            transition: color 0.2s ease-in-out, background-color 0.2s ease-in-out, border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
            border-bottom: dotted 1px;
            text-decoration: none;
        }
        a:hover {
            border-bottom-color: transparent;
        }
        @charset "UTF-8";
        @import url(https://fonts.googleapis.com/css?family=Open+Sans:300,400,700);
        HTML {
            font-size: medium;
            font-family: Garamond
        }
        BODY {
            background: black font-family: 'Open Sans', sans-serif;
            font-weight: 300;
            line-height: 1em;
            color: #A7A1AE;
            background-color: #1F2739;
        }
        h1 {
            font-size: 3em;
            font-weight: 300;
            line-height: 1em;
            text-align: left;
            color: #4DC3FA;
        }
        p {
            color: grey;
        }
        A {
            text-decoration: none color:black;
        }
        A:hover {
            color: red;
            background: whitesmoke;
            border-radius: 8px;
            padding-left: 3px;
            padding-right: 3px;
        }
        TABLE.fancy {
            background: #fffefe;
            border-left: 3px solid;
            border-collapse: collapse;
            margin: 25px 0;
            font-size: 0.8em;
            font-family: sans-serif;
            min-width: 350px;
            box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
            border-top: 1px solid;
            border-bottom: 0px solid;
            border-color: #FFF;
            overflow-y: scroll;
            width: 80%;
            display: table;
            padding: 0 0 8em 0;
        }
        TABLE.fancy TD {
            border-right: 1px solid;
            border-bottom: 1px solid;
            border-color: #FFF;
            text-align: left;
            padding-right: 2%px;
            padding-bottom: 2%;
            padding-top: 2%;
            padding-left: 2%;
            border: 4px solid gold !important;
            font-size: 16px;
            letter-spacing: 1px;
            font-weight: 570;
            line-height: 12px;
            text-decoration: none !important;
            text-transform: uppercase;
            background: #07122daf !important;
            color: black !important;
            cursor: pointer;
            justify-content: center;
            padding: 30px 50px;
            height: 55px;
            text-align: center;
            white-space: normal;
            border-radius: 10px;
            min-width: 10em;
            padding: .9em .9em 0;
            box-shadow: 0 0 5px;
            margin: 1em;
            -webkit-border-radius: 10px;
            -moz-border-radius: 10px;
            -ms-border-radius: 10px;
            -o-border-radius: 20px;
        }
        TABLE.fancy tr:nth-child(odd) {
            background-color: #323C50;
        }
        TABLE.fancy tr:nth-child(even) {
            background-color: #2C3446;
        }
        TABLE.fancy th {
            background-color: #1F2739;
        }
        TABLE.fancy td,
        TABLE.fancy th {
            padding-bottom: 2%;
            padding-top: 2%;
            padding-left: 2%;
        }
        TABLE.fancy tr:hover {
            background-color: #464A52;
            -webkit-box-shadow: 0 6px 6px -6px #0E1119;
            -moz-box-shadow: 0 6px 6px -6px #0E1119;
            box-shadow: 0 6px 6px -6px #0E1119;
        }
        TABLE.fancy td:hover {
            background-color: #FFF842;
            color: #403E10;
            font-weight: bold;
            box-shadow: #7F7C21 -1px 1px, #7F7C21 -2px 2px, #7F7C21 -3px 3px, #7F7C21 -4px 4px, #7F7C21 -5px 5px, #7F7C21 -6px 6px;
            transform: translate3d(6px, -6px, 0);
            transition-delay: 0s;
            transition-duration: 0.4s;
            transition-property: all;
            transition-timing-function: line;
        }
        @media (max-width: 800px) {
            TABLE.fancy td:nth-child(4),
            TABLE.fancy th:nth-child(4) {
                display: none;
            }
        }
        TABLE.fancy TD.no-right {
            border-right: 0px
        }
        TABLE.fancy TD.right {
            text-align: left
        }
        TABLE.fancy TD.left {
            text-align: center
        }
        TABLE.fancy a {
            color: yellow;
        }
        TABLE.fancy TH {
            border-right: 1px solid;
            border-bottom: 1px solid;
            text-align: left;
            background: black;
            color: #FFF;
            border-color: #FFF;
            font-weight: bold;
            padding: 12px 15px;
        }
        .anchor {
            font-weight: bold;
            border-top: 0px solid;
            text-align: left;
            border-bottom: 1px solid;
            background: black;
            color: #FFF
        }
        .dark-blue {
            font-weight: bold;
            border-top: 0px solid;
            text-align: left;
            border-bottom: 1px solid;
            background: black;
            color: #FFF
        }
        .no-top-border {
            border-top: 0px
        }
        .centered {
            margin: auto
        }
        .rZ {
            text-align: right
        }
        .row2 {
            background: #D3D3E1
        }
        /*]]>*/
    </style>
</head>

<body>

<table border="0" cellspacing="0" cellpadding="3" summary="file table" class="fancy centered">
<tr><td colspan="10" class="dark-blue" style="text-align: center"><b>Folders</b></td></tr>
<tr><td class="left"><a href="../right.html" target="rframe">&lt;parent&gt;</a></td><td class="left">&nbsp;<a href="node_modules/right.html" target="rframe">node_modules</a></td></tr>
</table>
<br>

<table border="0" cellspacing="0" cellpadding="3" summary="file table" class="fancy centered">
<tr><th><b>File</b></th><th><b>File</b></th><th><b>File</b></th><th><b>File</b></th><th><b>File</b></th><th><b>File</b></th></tr>
<tr><td class="left"><a href="right.html">right.html</a>&nbsp;</td><td class="left"><a href="batch-download-videos.sh">batch-download-videos.sh</a>&nbsp;</td><td class="left"><a href="convert-markdown-2-html.sh">convert-markdown-2-html.sh</a>&nbsp;</td><td class="left"><a href="generate-directory-index.html-from-files-in-working-directory.sh">generate-directory-index.html-from-files-in-working-directory.sh</a>&nbsp;</td><td class="left"><a href="Recursively-remove-files-byname.sh">Recursively-remove-files-byname.sh</a>&nbsp;</td><td class="left"><a href="remove-lines-contaning-string.sh">remove-lines-contaning-string.sh</a>&nbsp;</td></tr>
<tr class="row2"><td class="left"><a href="write-directory-2-file.js">write-directory-2-file.js</a>&nbsp;</td><td class="left"><a href="change-file-extensions.sh">change-file-extensions.sh</a>&nbsp;</td><td class="left"><a href="create-dummy-text-file-4-every-subfolder.sh">create-dummy-text-file-4-every-subfolder.sh</a>&nbsp;</td><td class="left"><a href="get-links-from-webpage.sh">get-links-from-webpage.sh</a>&nbsp;</td><td class="left"><a href="Recursively-remove-folders-byname.sh">Recursively-remove-folders-byname.sh</a>&nbsp;</td><td class="left"><a href="Remove-script-tags-from-html.sh">Remove-script-tags-from-html.sh</a>&nbsp;</td></tr>
<tr><td class="left"><a href="package-lock.json">package-lock.json</a>&nbsp;</td><td class="left"><a href="clone-folder-structure-populate-with-specific-file-type.sh">clone-folder-structure-populate-with-specific-file-type.sh</a>&nbsp;</td><td class="left"><a href="delete-files-bigger-than.sh">delete-files-bigger-than.sh</a>&nbsp;</td><td class="left"><a href="git-filter-branch.sh">git-filter-branch.sh</a>&nbsp;</td><td class="left"><a href="recursivley-create-numbered-folders.sh">recursivley-create-numbered-folders.sh</a>&nbsp;</td><td class="left"><a href="remove-string-from-file-names.sh">remove-string-from-file-names.sh</a>&nbsp;</td></tr>
<tr class="row2"><td class="left"><a href="package.json">package.json</a>&nbsp;</td><td class="left"><a href="clone-folder-structure-without-files.sh">clone-folder-structure-without-files.sh</a>&nbsp;</td><td class="left"><a href="delete-git-files.sh">delete-git-files.sh</a>&nbsp;</td><td class="left"><a href="list-html-files.sh">list-html-files.sh</a>&nbsp;</td><td class="left"><a href="Recusrive-npm-install.sh">Recusrive-npm-install.sh</a>&nbsp;</td><td class="left"><a href="remove-trailing-whitespace-from-file-names.sh">remove-trailing-whitespace-from-file-names.sh</a>&nbsp;</td></tr>
<tr><td class="left"><a href="combined.md">combined.md</a>&nbsp;</td><td class="left"><a href="concatinate-all-html-files.sh">concatinate-all-html-files.sh</a>&nbsp;</td><td class="left"><a href="delete-zip.sh">delete-zip.sh</a>&nbsp;</td><td class="left"><a href="print-file-paths-recursive.sh">print-file-paths-recursive.sh</a>&nbsp;</td><td class="left"><a href="remember-git-credentials.sh">remember-git-credentials.sh</a>&nbsp;</td><td class="left"><a href="remove-unnecessary-files-folders.sh">remove-unnecessary-files-folders.sh</a>&nbsp;</td></tr>
<tr class="row2"><td class="left"><a href="add-extension-to-files-in-folder.sh">add-extension-to-files-in-folder.sh</a>&nbsp;</td><td class="left"><a href="concatinate-markdown-files-to-single-html.sh">concatinate-markdown-files-to-single-html.sh</a>&nbsp;</td><td class="left"><a href="Download-all-weblinks-of-certain-file-type.sh">Download-all-weblinks-of-certain-file-type.sh</a>&nbsp;</td><td class="left"><a href="recursive-remove-lines-contaning-string.sh">recursive-remove-lines-contaning-string.sh</a>&nbsp;</td><td class="left"><a href="remove-duplicate-lines.sh">remove-duplicate-lines.sh</a>&nbsp;</td><td class="left"><a href="Resursivleydeletenodemodules.sh">Resursivleydeletenodemodules.sh</a>&nbsp;</td></tr>
<tr><td class="left"><a href="add-text-2-end-of-file.sh">add-text-2-end-of-file.sh</a>&nbsp;</td><td class="left"><a href="convert-html-2-md.sh">convert-html-2-md.sh</a>&nbsp;</td><td class="left"><a href="Download-website.sh">Download-website.sh</a>&nbsp;</td><td class="left"><a href="recursive-unzip.sh">recursive-unzip.sh</a>&nbsp;</td><td class="left"><a href="remove-invalid-characters-from-file-names.sh">remove-invalid-characters-from-file-names.sh</a>&nbsp;</td><td class="left"><a href="Sanatize-directory.sh">Sanatize-directory.sh</a>&nbsp;</td></tr>
<tr class="row2"><td class="left"><a href="Addtexttothefirstlineofeveryfileofacertainextensioninagivenfolder.sh">Addtexttothefirstlineofeveryfileofacertainextensioninagivenfolder.sh</a>&nbsp;</td><td class="left"></td><td class="left"></td><td class="left"></td><td class="left"></td><td class="left"></td></tr>
</table>

<p style="font-weight: bold; margin-bottom: 0px">
Folders:  2<br>
Files: 43<br>
Size of all files: 24008 K</p>

</body>
</html>// 
// const fs=require('fs');
// let cat= require( 'child_process' ).execSync( 'cat *' ).toString( 'UTF-8' )
// fs.writeFile( 'output.md', cat, ( err ) => {
// 
//   // In case of a error throw err. 
//   if ( err ) throw err;
// } );

const fs=require('fs');let cat=require('child_process').execSync('cat \*').toString('UTF-8');
fs.writeFile('output.md',cat,(err)=>{if(err)throw err;});
{
"name": "bash-utility-commands",
"version": "1.0.0",
"lockfileVersion": 1,
"requires": true,
"dependencies": {
"bluebird": {
"version": "3.7.2",
"resolved": "https://registry.npmjs.org/bluebird/-/bluebird-3.7.2.tgz",
"integrity": "sha512-XpNj6GDQzdfW+r2Wnn7xiSAd7TM3jzkxGXBGTtWKuSXv1xUV+azxAm8jdWZN06QTQk+2N2XB9jRDkvbmQmcRtg=="
},
"file-match": {
"version": "1.0.2",
"resolved": "https://registry.npmjs.org/file-match/-/file-match-1.0.2.tgz",
"integrity": "sha1-ycrSZdLIrfOoFHWw30dYWQafrvc=",
"requires": {
"utils-extend": "^1.0.6"
}
},
"file-system": {
"version": "2.2.2",
"resolved": "https://registry.npmjs.org/file-system/-/file-system-2.2.2.tgz",
"integrity": "sha1-fWWDPjojR9zZVqgTxncVPtPt2Yc=",
"requires": {
"file-match": "^1.0.1",
"utils-extend": "^1.0.4"
}
},
"utils-extend": {
"version": "1.0.8",
"resolved": "https://registry.npmjs.org/utils-extend/-/utils-extend-1.0.8.tgz",
"integrity": "sha1-zP17ZFQPjpDuIe7Fd2nQZRyril8="
}
}
}
{
"name": "bash-utility-commands",
"version": "1.0.0",
"description": "write-all-commands-to-file",
"main": "write-directory-2-file.js",
"scripts": {
"test": "npm start"
},
"author": "Bryan Guner",
"license": "MIT",
"dependencies": {
"bluebird": "^3.7.2",
"file-system": "^2.2.2"
}
}

ls -R './' | awk '
/:$/&&f{s=$0;f=0}
/:$/&&!f{sub(/:$/,"");s=$0;f=1;next}
NF&&f{ print s"/"$0 }'>listing.mdfind . -type f -exec sed -i '/badText/d' ./\*.html {} \;

# Recursivley remove from all html files any lines contaning the string "badText"#install unzip:

sudo apt install unzip

# recursivley unzip all zip files into a folder by the same name:

find . -name "\*.zip" | while read filename; do unzip -o -d "`dirname "$filename"`" "$filename"; done;

# recursivley delete .zip files when done:

find . -name "\*.zip" -type f -print -deleten=1;
max=50;
while [ "$n" -le "$max" ]; do
mkdir "s$n"
  n=`expr "$n" + 1`;
done git config --global credential.helper storesudo apt install uniq

uniq -u input.txt output.txt
for f in _/; do nf=$(echo "$f" |sed -e 's/[^a-za-z0-9.]/./g' -e 's/\.\.\././g' -e 's/\.\././g' -e 's/\._$//'); test "$f" != "$nf" && mv "$f" "$nf" && echo "$nf"; donesed -i '/target-string/d' ./js-in-one-page.html

# examples:

sed -i '/\.git/d' ./index.html

# Recursive

find . -type f -a \( -name "_.html" -o -name "_.js" -o -name "_.css" -o -name "_.md" \) -a -exec sed -i '/BADSTRING/d' '{}' +

find . -name "*" -type f | xargs sed -i -e '/Mirrored from/d'for filename in *badString*; do mv "$filename" "${filename//badstring/replaceString}"; donerename 's/ *$//' \*# recursivley remove empty files
find . -empty -type f -print -delete

# recursivley remove empty folders

find . -empty -type d -print -delete

# recursively remove .git folder, .gitignore file and .gitmodules file and .gitattributes file

find . \( -name ".git" -o -name ".gitignore" -o -name ".gitmodules" -o -name ".gitattributes" \) -exec rm -rf -- {} +

# Recursivley remove security, release, changelog, License & contributing files

find . \( -name "*SECURITY.txt" -o -name "*RELEASE.txt" -o -name "*CHANGELOG.txt" -o -name "*LICENSE.txt" -o -name "*CONTRIBUTING.txt" -name "*HISTORY.md" -o -name "*LICENSE" -o -name "*SECURITY.md" -o -name "*RELEASE.md" -o -name "*CHANGELOG.md" -o -name "*LICENSE.md" -o -name "*CODE_OF_CONDUCT.md" -o -name "\*CONTRIBUTING.md" \) -exec rm -rf -- {} +

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>

<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>bash-utility-commands</title>
    <meta name="generator" content="HTML Tidy for Linux (vers 25 March 2009), see www.w3.org" />
    <meta http-equiv="Content-Type" content="text/html; charset=us-ascii" />
    <title>Stable</title>
    <!-- Optional theme -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap-theme.min.css"
        integrity="sha384-rHyoN1iRsVXV4nD0JutlnGaslCJuC7uwjduW9SVrLvRYooPp2bWYgmgJQIXwl/Sp" crossorigin="anonymous"
        type="text/css" />
    <!-- Latest compiled and minified JavaScript -->
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"
        integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" crossorigin="anonymous"
        type="text/javascript"></script>
    <style type="text/css">
        /*<![CDATA[*/
        /* Basic */
        @-ms-viewport {
            width: device-width;
        }
        body {
            -ms-overflow-style: scrollbar;
		zoom:0.45;
        }
        @media screen and (max-width: 480px) {
            html,
            body {
                min-width: 320px;
            }
        }
        html {
            box-sizing: border-box;
        }
        *,
        *:before,
        *:after {
            box-sizing: inherit;
        }
        body {
            background-color: whitesmoke;
        }
        body.is-preload *,
        body.is-preload *:before,
        body.is-preload *:after {
            -moz-animation: none !important;
            -webkit-animation: none !important;
            -ms-animation: none !important;
            animation: none !important;
            -moz-transition: none !important;
            -webkit-transition: none !important;
            -ms-transition: none !important;
            transition: none !important;
        }
        /* Type */
        html {
            font-size: 13pt;
        }
        @media screen and (max-width: 1680px) {
            html {
                font-size: 10pt;
            }
        }
        @media screen and (max-width: 1280px) {
            html {
                font-size: 11pt;
            }
        }
        @media screen and (max-width: 360px) {
            html {
                font-size: 10pt;
            }
        }
        body {
            color: #212931;
        }
        body,
        input,
        select,
        textarea {
            font-family: "Merriweather", Georgia, serif;
            font-weight: 300;
            font-size: 1rem;
            line-height: 2.375;
        }
        a {
            -moz-transition: color 0.2s ease-in-out, background-color 0.2s ease-in-out, border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
            -webkit-transition: color 0.2s ease-in-out, background-color 0.2s ease-in-out, border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
            -ms-transition: color 0.2s ease-in-out, background-color 0.2s ease-in-out, border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
            transition: color 0.2s ease-in-out, background-color 0.2s ease-in-out, border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
            border-bottom: dotted 1px;
            text-decoration: none;
        }
        a:hover {
            border-bottom-color: transparent;
        }
        @charset "UTF-8";
        @import url(https://fonts.googleapis.com/css?family=Open+Sans:300,400,700);
        HTML {
            font-size: medium;
            font-family: Garamond
        }
        BODY {
            background: black font-family: 'Open Sans', sans-serif;
            font-weight: 300;
            line-height: 1em;
            color: #A7A1AE;
            background-color: #1F2739;
        }
        h1 {
            font-size: 3em;
            font-weight: 300;
            line-height: 1em;
            text-align: left;
            color: #4DC3FA;
        }
        p {
            color: grey;
        }
        A {
            text-decoration: none color:black;
        }
        A:hover {
            color: red;
            background: whitesmoke;
            border-radius: 8px;
            padding-left: 3px;
            padding-right: 3px;
        }
        TABLE.fancy {
            background: #fffefe;
            border-left: 3px solid;
            border-collapse: collapse;
            margin: 25px 0;
            font-size: 0.8em;
            font-family: sans-serif;
            min-width: 350px;
            box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
            border-top: 1px solid;
            border-bottom: 0px solid;
            border-color: #FFF;
            overflow-y: scroll;
            width: 80%;
            display: table;
            padding: 0 0 8em 0;
        }
        TABLE.fancy TD {
            border-right: 1px solid;
            border-bottom: 1px solid;
            border-color: #FFF;
            text-align: left;
            padding-right: 2%px;
            padding-bottom: 2%;
            padding-top: 2%;
            padding-left: 2%;
            border: 4px solid gold !important;
            font-size: 16px;
            letter-spacing: 1px;
            font-weight: 570;
            line-height: 12px;
            text-decoration: none !important;
            text-transform: uppercase;
            background: #07122daf !important;
            color: black !important;
            cursor: pointer;
            justify-content: center;
            padding: 30px 50px;
            height: 55px;
            text-align: center;
            white-space: normal;
            border-radius: 10px;
            min-width: 10em;
            padding: .9em .9em 0;
            box-shadow: 0 0 5px;
            margin: 1em;
            -webkit-border-radius: 10px;
            -moz-border-radius: 10px;
            -ms-border-radius: 10px;
            -o-border-radius: 20px;
        }
        TABLE.fancy tr:nth-child(odd) {
            background-color: #323C50;
        }
        TABLE.fancy tr:nth-child(even) {
            background-color: #2C3446;
        }
        TABLE.fancy th {
            background-color: #1F2739;
        }
        TABLE.fancy td,
        TABLE.fancy th {
            padding-bottom: 2%;
            padding-top: 2%;
            padding-left: 2%;
        }
        TABLE.fancy tr:hover {
            background-color: #464A52;
            -webkit-box-shadow: 0 6px 6px -6px #0E1119;
            -moz-box-shadow: 0 6px 6px -6px #0E1119;
            box-shadow: 0 6px 6px -6px #0E1119;
        }
        TABLE.fancy td:hover {
            background-color: #FFF842;
            color: #403E10;
            font-weight: bold;
            box-shadow: #7F7C21 -1px 1px, #7F7C21 -2px 2px, #7F7C21 -3px 3px, #7F7C21 -4px 4px, #7F7C21 -5px 5px, #7F7C21 -6px 6px;
            transform: translate3d(6px, -6px, 0);
            transition-delay: 0s;
            transition-duration: 0.4s;
            transition-property: all;
            transition-timing-function: line;
        }
        @media (max-width: 800px) {
            TABLE.fancy td:nth-child(4),
            TABLE.fancy th:nth-child(4) {
                display: none;
            }
        }
        TABLE.fancy TD.no-right {
            border-right: 0px
        }
        TABLE.fancy TD.right {
            text-align: left
        }
        TABLE.fancy TD.left {
            text-align: center
        }
        TABLE.fancy a {
            color: yellow;
        }
        TABLE.fancy TH {
            border-right: 1px solid;
            border-bottom: 1px solid;
            text-align: left;
            background: black;
            color: #FFF;
            border-color: #FFF;
            font-weight: bold;
            padding: 12px 15px;
        }
        .anchor {
            font-weight: bold;
            border-top: 0px solid;
            text-align: left;
            border-bottom: 1px solid;
            background: black;
            color: #FFF
        }
        .dark-blue {
            font-weight: bold;
            border-top: 0px solid;
            text-align: left;
            border-bottom: 1px solid;
            background: black;
            color: #FFF
        }
        .no-top-border {
            border-top: 0px
        }
        .centered {
            margin: auto
        }
        .rZ {
            text-align: right
        }
        .row2 {
            background: #D3D3E1
        }
        /*]]>*/
    </style>
</head>

<body>

<table border="0" cellspacing="0" cellpadding="3" summary="file table" class="fancy centered">
<tr><td colspan="10" class="dark-blue" style="text-align: center"><b>Folders</b></td></tr>
<tr><td class="left"><a href="../right.html" target="rframe">&lt;parent&gt;</a></td><td class="left">&nbsp;<a href="node_modules/right.html" target="rframe">node_modules</a></td></tr>
</table>
<br>

<table border="0" cellspacing="0" cellpadding="3" summary="file table" class="fancy centered">
<tr><th><b>File</b></th><th><b>File</b></th><th><b>File</b></th><th><b>File</b></th><th><b>File</b></th><th><b>File</b></th></tr>
<tr><td class="left"><a href="right.html">right.html</a>&nbsp;</td><td class="left"><a href="batch-download-videos.sh">batch-download-videos.sh</a>&nbsp;</td><td class="left"><a href="convert-markdown-2-html.sh">convert-markdown-2-html.sh</a>&nbsp;</td><td class="left"><a href="generate-directory-index.html-from-files-in-working-directory.sh">generate-directory-index.html-from-files-in-working-directory.sh</a>&nbsp;</td><td class="left"><a href="Recursively-remove-files-byname.sh">Recursively-remove-files-byname.sh</a>&nbsp;</td><td class="left"><a href="remove-lines-contaning-string.sh">remove-lines-contaning-string.sh</a>&nbsp;</td></tr>
<tr class="row2"><td class="left"><a href="write-directory-2-file.js">write-directory-2-file.js</a>&nbsp;</td><td class="left"><a href="change-file-extensions.sh">change-file-extensions.sh</a>&nbsp;</td><td class="left"><a href="create-dummy-text-file-4-every-subfolder.sh">create-dummy-text-file-4-every-subfolder.sh</a>&nbsp;</td><td class="left"><a href="get-links-from-webpage.sh">get-links-from-webpage.sh</a>&nbsp;</td><td class="left"><a href="Recursively-remove-folders-byname.sh">Recursively-remove-folders-byname.sh</a>&nbsp;</td><td class="left"><a href="Remove-script-tags-from-html.sh">Remove-script-tags-from-html.sh</a>&nbsp;</td></tr>
<tr><td class="left"><a href="package-lock.json">package-lock.json</a>&nbsp;</td><td class="left"><a href="clone-folder-structure-populate-with-specific-file-type.sh">clone-folder-structure-populate-with-specific-file-type.sh</a>&nbsp;</td><td class="left"><a href="delete-files-bigger-than.sh">delete-files-bigger-than.sh</a>&nbsp;</td><td class="left"><a href="git-filter-branch.sh">git-filter-branch.sh</a>&nbsp;</td><td class="left"><a href="recursivley-create-numbered-folders.sh">recursivley-create-numbered-folders.sh</a>&nbsp;</td><td class="left"><a href="remove-string-from-file-names.sh">remove-string-from-file-names.sh</a>&nbsp;</td></tr>
<tr class="row2"><td class="left"><a href="package.json">package.json</a>&nbsp;</td><td class="left"><a href="clone-folder-structure-without-files.sh">clone-folder-structure-without-files.sh</a>&nbsp;</td><td class="left"><a href="delete-git-files.sh">delete-git-files.sh</a>&nbsp;</td><td class="left"><a href="list-html-files.sh">list-html-files.sh</a>&nbsp;</td><td class="left"><a href="Recusrive-npm-install.sh">Recusrive-npm-install.sh</a>&nbsp;</td><td class="left"><a href="remove-trailing-whitespace-from-file-names.sh">remove-trailing-whitespace-from-file-names.sh</a>&nbsp;</td></tr>
<tr><td class="left"><a href="combined.md">combined.md</a>&nbsp;</td><td class="left"><a href="concatinate-all-html-files.sh">concatinate-all-html-files.sh</a>&nbsp;</td><td class="left"><a href="delete-zip.sh">delete-zip.sh</a>&nbsp;</td><td class="left"><a href="print-file-paths-recursive.sh">print-file-paths-recursive.sh</a>&nbsp;</td><td class="left"><a href="remember-git-credentials.sh">remember-git-credentials.sh</a>&nbsp;</td><td class="left"><a href="remove-unnecessary-files-folders.sh">remove-unnecessary-files-folders.sh</a>&nbsp;</td></tr>
<tr class="row2"><td class="left"><a href="add-extension-to-files-in-folder.sh">add-extension-to-files-in-folder.sh</a>&nbsp;</td><td class="left"><a href="concatinate-markdown-files-to-single-html.sh">concatinate-markdown-files-to-single-html.sh</a>&nbsp;</td><td class="left"><a href="Download-all-weblinks-of-certain-file-type.sh">Download-all-weblinks-of-certain-file-type.sh</a>&nbsp;</td><td class="left"><a href="recursive-remove-lines-contaning-string.sh">recursive-remove-lines-contaning-string.sh</a>&nbsp;</td><td class="left"><a href="remove-duplicate-lines.sh">remove-duplicate-lines.sh</a>&nbsp;</td><td class="left"><a href="Resursivleydeletenodemodules.sh">Resursivleydeletenodemodules.sh</a>&nbsp;</td></tr>
<tr><td class="left"><a href="add-text-2-end-of-file.sh">add-text-2-end-of-file.sh</a>&nbsp;</td><td class="left"><a href="convert-html-2-md.sh">convert-html-2-md.sh</a>&nbsp;</td><td class="left"><a href="Download-website.sh">Download-website.sh</a>&nbsp;</td><td class="left"><a href="recursive-unzip.sh">recursive-unzip.sh</a>&nbsp;</td><td class="left"><a href="remove-invalid-characters-from-file-names.sh">remove-invalid-characters-from-file-names.sh</a>&nbsp;</td><td class="left"><a href="Sanatize-directory.sh">Sanatize-directory.sh</a>&nbsp;</td></tr>
<tr class="row2"><td class="left"><a href="Addtexttothefirstlineofeveryfileofacertainextensioninagivenfolder.sh">Addtexttothefirstlineofeveryfileofacertainextensioninagivenfolder.sh</a>&nbsp;</td><td class="left"></td><td class="left"></td><td class="left"></td><td class="left"></td><td class="left"></td></tr>
</table>

<p style="font-weight: bold; margin-bottom: 0px">
Folders:  2<br>
Files: 43<br>
Size of all files: 24008 K</p>

</body>
</html>// 
// const fs=require('fs');
// let cat= require( 'child_process' ).execSync( 'cat *' ).toString( 'UTF-8' )
// fs.writeFile( 'output.md', cat, ( err ) => {
// 
//   // In case of a error throw err. 
//   if ( err ) throw err;
// } );

const fs=require('fs');let cat=require('child_process').execSync('cat \*').toString('UTF-8');
fs.writeFile('output.md',cat,(err)=>{if(err)throw err;});
{
"name": "bash-utility-commands",
"version": "1.0.0",
"lockfileVersion": 1,
"requires": true,
"dependencies": {
"bluebird": {
"version": "3.7.2",
"resolved": "https://registry.npmjs.org/bluebird/-/bluebird-3.7.2.tgz",
"integrity": "sha512-XpNj6GDQzdfW+r2Wnn7xiSAd7TM3jzkxGXBGTtWKuSXv1xUV+azxAm8jdWZN06QTQk+2N2XB9jRDkvbmQmcRtg=="
},
"file-match": {
"version": "1.0.2",
"resolved": "https://registry.npmjs.org/file-match/-/file-match-1.0.2.tgz",
"integrity": "sha1-ycrSZdLIrfOoFHWw30dYWQafrvc=",
"requires": {
"utils-extend": "^1.0.6"
}
},
"file-system": {
"version": "2.2.2",
"resolved": "https://registry.npmjs.org/file-system/-/file-system-2.2.2.tgz",
"integrity": "sha1-fWWDPjojR9zZVqgTxncVPtPt2Yc=",
"requires": {
"file-match": "^1.0.1",
"utils-extend": "^1.0.4"
}
},
"utils-extend": {
"version": "1.0.8",
"resolved": "https://registry.npmjs.org/utils-extend/-/utils-extend-1.0.8.tgz",
"integrity": "sha1-zP17ZFQPjpDuIe7Fd2nQZRyril8="
}
}
}
{
"name": "bash-utility-commands",
"version": "1.0.0",
"description": "write-all-commands-to-file",
"main": "write-directory-2-file.js",
"scripts": {
"test": "npm start"
},
"author": "Bryan Guner",
"license": "MIT",
"dependencies": {
"bluebird": "^3.7.2",
"file-system": "^2.2.2"
}
}

ls -R './' | awk '
/:$/&&f{s=$0;f=0}
/:$/&&!f{sub(/:$/,"");s=$0;f=1;next}
NF&&f{ print s"/"$0 }'>listing.mdfind . -type f -exec sed -i '/badText/d' ./\*.html {} \;

# Recursivley remove from all html files any lines contaning the string "badText"#install unzip:

sudo apt install unzip

# recursivley unzip all zip files into a folder by the same name:

find . -name "\*.zip" | while read filename; do unzip -o -d "`dirname "$filename"`" "$filename"; done;

# recursivley delete .zip files when done:

find . -name "\*.zip" -type f -print -deleten=1;
max=50;
while [ "$n" -le "$max" ]; do
mkdir "s$n"
  n=`expr "$n" + 1`;
done git config --global credential.helper storesudo apt install uniq

uniq -u input.txt output.txt
for f in _/; do nf=$(echo "$f" |sed -e 's/[^a-za-z0-9.]/./g' -e 's/\.\.\././g' -e 's/\.\././g' -e 's/\._$//'); test "$f" != "$nf" && mv "$f" "$nf" && echo "$nf"; donesed -i '/target-string/d' ./js-in-one-page.html

# examples:

sed -i '/\.git/d' ./index.html

# Recursive

find . -type f -a \( -name "_.html" -o -name "_.js" -o -name "_.css" -o -name "_.md" \) -a -exec sed -i '/BADSTRING/d' '{}' +

find . -name "*" -type f | xargs sed -i -e '/Mirrored from/d'for filename in *badString*; do mv "$filename" "${filename//badstring/replaceString}"; donerename 's/ *$//' \*# recursivley remove empty files
find . -empty -type f -print -delete

# recursivley remove empty folders

find . -empty -type d -print -delete

# recursively remove .git folder, .gitignore file and .gitmodules file and .gitattributes file

find . \( -name ".git" -o -name ".gitignore" -o -name ".gitmodules" -o -name ".gitattributes" \) -exec rm -rf -- {} +

# Recursivley remove security, release, changelog, License & contributing files

find . \( -name "*SECURITY.txt" -o -name "*RELEASE.txt" -o -name "*CHANGELOG.txt" -o -name "*LICENSE.txt" -o -name "*CONTRIBUTING.txt" -name "*HISTORY.md" -o -name "*LICENSE" -o -name "*SECURITY.md" -o -name "*RELEASE.md" -o -name "*CHANGELOG.md" -o -name "*LICENSE.md" -o -name "*CODE_OF_CONDUCT.md" -o -name "\*CONTRIBUTING.md" \) -exec rm -rf -- {} +

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>

<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>bash-utility-commands</title>
    <meta name="generator" content="HTML Tidy for Linux (vers 25 March 2009), see www.w3.org" />
    <meta http-equiv="Content-Type" content="text/html; charset=us-ascii" />
    <title>Stable</title>
    <!-- Optional theme -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap-theme.min.css"
        integrity="sha384-rHyoN1iRsVXV4nD0JutlnGaslCJuC7uwjduW9SVrLvRYooPp2bWYgmgJQIXwl/Sp" crossorigin="anonymous"
        type="text/css" />
    <!-- Latest compiled and minified JavaScript -->
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"
        integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" crossorigin="anonymous"
        type="text/javascript"></script>
    <style type="text/css">
        /*<![CDATA[*/
        /* Basic */
        @-ms-viewport {
            width: device-width;
        }
        body {
            -ms-overflow-style: scrollbar;
		zoom:0.45;
        }
        @media screen and (max-width: 480px) {
            html,
            body {
                min-width: 320px;
            }
        }
        html {
            box-sizing: border-box;
        }
        *,
        *:before,
        *:after {
            box-sizing: inherit;
        }
        body {
            background-color: whitesmoke;
        }
        body.is-preload *,
        body.is-preload *:before,
        body.is-preload *:after {
            -moz-animation: none !important;
            -webkit-animation: none !important;
            -ms-animation: none !important;
            animation: none !important;
            -moz-transition: none !important;
            -webkit-transition: none !important;
            -ms-transition: none !important;
            transition: none !important;
        }
        /* Type */
        html {
            font-size: 13pt;
        }
        @media screen and (max-width: 1680px) {
            html {
                font-size: 10pt;
            }
        }
        @media screen and (max-width: 1280px) {
            html {
                font-size: 11pt;
            }
        }
        @media screen and (max-width: 360px) {
            html {
                font-size: 10pt;
            }
        }
        body {
            color: #212931;
        }
        body,
        input,
        select,
        textarea {
            font-family: "Merriweather", Georgia, serif;
            font-weight: 300;
            font-size: 1rem;
            line-height: 2.375;
        }
        a {
            -moz-transition: color 0.2s ease-in-out, background-color 0.2s ease-in-out, border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
            -webkit-transition: color 0.2s ease-in-out, background-color 0.2s ease-in-out, border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
            -ms-transition: color 0.2s ease-in-out, background-color 0.2s ease-in-out, border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
            transition: color 0.2s ease-in-out, background-color 0.2s ease-in-out, border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
            border-bottom: dotted 1px;
            text-decoration: none;
        }
        a:hover {
            border-bottom-color: transparent;
        }
        @charset "UTF-8";
        @import url(https://fonts.googleapis.com/css?family=Open+Sans:300,400,700);
        HTML {
            font-size: medium;
            font-family: Garamond
        }
        BODY {
            background: black font-family: 'Open Sans', sans-serif;
            font-weight: 300;
            line-height: 1em;
            color: #A7A1AE;
            background-color: #1F2739;
        }
        h1 {
            font-size: 3em;
            font-weight: 300;
            line-height: 1em;
            text-align: left;
            color: #4DC3FA;
        }
        p {
            color: grey;
        }
        A {
            text-decoration: none color:black;
        }
        A:hover {
            color: red;
            background: whitesmoke;
            border-radius: 8px;
            padding-left: 3px;
            padding-right: 3px;
        }
        TABLE.fancy {
            background: #fffefe;
            border-left: 3px solid;
            border-collapse: collapse;
            margin: 25px 0;
            font-size: 0.8em;
            font-family: sans-serif;
            min-width: 350px;
            box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
            border-top: 1px solid;
            border-bottom: 0px solid;
            border-color: #FFF;
            overflow-y: scroll;
            width: 80%;
            display: table;
            padding: 0 0 8em 0;
        }
        TABLE.fancy TD {
            border-right: 1px solid;
            border-bottom: 1px solid;
            border-color: #FFF;
            text-align: left;
            padding-right: 2%px;
            padding-bottom: 2%;
            padding-top: 2%;
            padding-left: 2%;
            border: 4px solid gold !important;
            font-size: 16px;
            letter-spacing: 1px;
            font-weight: 570;
            line-height: 12px;
            text-decoration: none !important;
            text-transform: uppercase;
            background: #07122daf !important;
            color: black !important;
            cursor: pointer;
            justify-content: center;
            padding: 30px 50px;
            height: 55px;
            text-align: center;
            white-space: normal;
            border-radius: 10px;
            min-width: 10em;
            padding: .9em .9em 0;
            box-shadow: 0 0 5px;
            margin: 1em;
            -webkit-border-radius: 10px;
            -moz-border-radius: 10px;
            -ms-border-radius: 10px;
            -o-border-radius: 20px;
        }
        TABLE.fancy tr:nth-child(odd) {
            background-color: #323C50;
        }
        TABLE.fancy tr:nth-child(even) {
            background-color: #2C3446;
        }
        TABLE.fancy th {
            background-color: #1F2739;
        }
        TABLE.fancy td,
        TABLE.fancy th {
            padding-bottom: 2%;
            padding-top: 2%;
            padding-left: 2%;
        }
        TABLE.fancy tr:hover {
            background-color: #464A52;
            -webkit-box-shadow: 0 6px 6px -6px #0E1119;
            -moz-box-shadow: 0 6px 6px -6px #0E1119;
            box-shadow: 0 6px 6px -6px #0E1119;
        }
        TABLE.fancy td:hover {
            background-color: #FFF842;
            color: #403E10;
            font-weight: bold;
            box-shadow: #7F7C21 -1px 1px, #7F7C21 -2px 2px, #7F7C21 -3px 3px, #7F7C21 -4px 4px, #7F7C21 -5px 5px, #7F7C21 -6px 6px;
            transform: translate3d(6px, -6px, 0);
            transition-delay: 0s;
            transition-duration: 0.4s;
            transition-property: all;
            transition-timing-function: line;
        }
        @media (max-width: 800px) {
            TABLE.fancy td:nth-child(4),
            TABLE.fancy th:nth-child(4) {
                display: none;
            }
        }
        TABLE.fancy TD.no-right {
            border-right: 0px
        }
        TABLE.fancy TD.right {
            text-align: left
        }
        TABLE.fancy TD.left {
            text-align: center
        }
        TABLE.fancy a {
            color: yellow;
        }
        TABLE.fancy TH {
            border-right: 1px solid;
            border-bottom: 1px solid;
            text-align: left;
            background: black;
            color: #FFF;
            border-color: #FFF;
            font-weight: bold;
            padding: 12px 15px;
        }
        .anchor {
            font-weight: bold;
            border-top: 0px solid;
            text-align: left;
            border-bottom: 1px solid;
            background: black;
            color: #FFF
        }
        .dark-blue {
            font-weight: bold;
            border-top: 0px solid;
            text-align: left;
            border-bottom: 1px solid;
            background: black;
            color: #FFF
        }
        .no-top-border {
            border-top: 0px
        }
        .centered {
            margin: auto
        }
        .rZ {
            text-align: right
        }
        .row2 {
            background: #D3D3E1
        }
        /*]]>*/
    </style>
</head>

<body>

<table border="0" cellspacing="0" cellpadding="3" summary="file table" class="fancy centered">
<tr><td colspan="10" class="dark-blue" style="text-align: center"><b>Folders</b></td></tr>
<tr><td class="left"><a href="../right.html" target="rframe">&lt;parent&gt;</a></td><td class="left">&nbsp;<a href="node_modules/right.html" target="rframe">node_modules</a></td></tr>
</table>
<br>

<table border="0" cellspacing="0" cellpadding="3" summary="file table" class="fancy centered">
<tr><th><b>File</b></th><th><b>File</b></th><th><b>File</b></th><th><b>File</b></th><th><b>File</b></th><th><b>File</b></th></tr>
<tr><td class="left"><a href="right.html">right.html</a>&nbsp;</td><td class="left"><a href="batch-download-videos.sh">batch-download-videos.sh</a>&nbsp;</td><td class="left"><a href="convert-markdown-2-html.sh">convert-markdown-2-html.sh</a>&nbsp;</td><td class="left"><a href="generate-directory-index.html-from-files-in-working-directory.sh">generate-directory-index.html-from-files-in-working-directory.sh</a>&nbsp;</td><td class="left"><a href="Recursively-remove-files-byname.sh">Recursively-remove-files-byname.sh</a>&nbsp;</td><td class="left"><a href="remove-lines-contaning-string.sh">remove-lines-contaning-string.sh</a>&nbsp;</td></tr>
<tr class="row2"><td class="left"><a href="write-directory-2-file.js">write-directory-2-file.js</a>&nbsp;</td><td class="left"><a href="change-file-extensions.sh">change-file-extensions.sh</a>&nbsp;</td><td class="left"><a href="create-dummy-text-file-4-every-subfolder.sh">create-dummy-text-file-4-every-subfolder.sh</a>&nbsp;</td><td class="left"><a href="get-links-from-webpage.sh">get-links-from-webpage.sh</a>&nbsp;</td><td class="left"><a href="Recursively-remove-folders-byname.sh">Recursively-remove-folders-byname.sh</a>&nbsp;</td><td class="left"><a href="Remove-script-tags-from-html.sh">Remove-script-tags-from-html.sh</a>&nbsp;</td></tr>
<tr><td class="left"><a href="package-lock.json">package-lock.json</a>&nbsp;</td><td class="left"><a href="clone-folder-structure-populate-with-specific-file-type.sh">clone-folder-structure-populate-with-specific-file-type.sh</a>&nbsp;</td><td class="left"><a href="delete-files-bigger-than.sh">delete-files-bigger-than.sh</a>&nbsp;</td><td class="left"><a href="git-filter-branch.sh">git-filter-branch.sh</a>&nbsp;</td><td class="left"><a href="recursivley-create-numbered-folders.sh">recursivley-create-numbered-folders.sh</a>&nbsp;</td><td class="left"><a href="remove-string-from-file-names.sh">remove-string-from-file-names.sh</a>&nbsp;</td></tr>
<tr class="row2"><td class="left"><a href="package.json">package.json</a>&nbsp;</td><td class="left"><a href="clone-folder-structure-without-files.sh">clone-folder-structure-without-files.sh</a>&nbsp;</td><td class="left"><a href="delete-git-files.sh">delete-git-files.sh</a>&nbsp;</td><td class="left"><a href="list-html-files.sh">list-html-files.sh</a>&nbsp;</td><td class="left"><a href="Recusrive-npm-install.sh">Recusrive-npm-install.sh</a>&nbsp;</td><td class="left"><a href="remove-trailing-whitespace-from-file-names.sh">remove-trailing-whitespace-from-file-names.sh</a>&nbsp;</td></tr>
<tr><td class="left"><a href="combined.md">combined.md</a>&nbsp;</td><td class="left"><a href="concatinate-all-html-files.sh">concatinate-all-html-files.sh</a>&nbsp;</td><td class="left"><a href="delete-zip.sh">delete-zip.sh</a>&nbsp;</td><td class="left"><a href="print-file-paths-recursive.sh">print-file-paths-recursive.sh</a>&nbsp;</td><td class="left"><a href="remember-git-credentials.sh">remember-git-credentials.sh</a>&nbsp;</td><td class="left"><a href="remove-unnecessary-files-folders.sh">remove-unnecessary-files-folders.sh</a>&nbsp;</td></tr>
<tr class="row2"><td class="left"><a href="add-extension-to-files-in-folder.sh">add-extension-to-files-in-folder.sh</a>&nbsp;</td><td class="left"><a href="concatinate-markdown-files-to-single-html.sh">concatinate-markdown-files-to-single-html.sh</a>&nbsp;</td><td class="left"><a href="Download-all-weblinks-of-certain-file-type.sh">Download-all-weblinks-of-certain-file-type.sh</a>&nbsp;</td><td class="left"><a href="recursive-remove-lines-contaning-string.sh">recursive-remove-lines-contaning-string.sh</a>&nbsp;</td><td class="left"><a href="remove-duplicate-lines.sh">remove-duplicate-lines.sh</a>&nbsp;</td><td class="left"><a href="Resursivleydeletenodemodules.sh">Resursivleydeletenodemodules.sh</a>&nbsp;</td></tr>
<tr><td class="left"><a href="add-text-2-end-of-file.sh">add-text-2-end-of-file.sh</a>&nbsp;</td><td class="left"><a href="convert-html-2-md.sh">convert-html-2-md.sh</a>&nbsp;</td><td class="left"><a href="Download-website.sh">Download-website.sh</a>&nbsp;</td><td class="left"><a href="recursive-unzip.sh">recursive-unzip.sh</a>&nbsp;</td><td class="left"><a href="remove-invalid-characters-from-file-names.sh">remove-invalid-characters-from-file-names.sh</a>&nbsp;</td><td class="left"><a href="Sanatize-directory.sh">Sanatize-directory.sh</a>&nbsp;</td></tr>
<tr class="row2"><td class="left"><a href="Addtexttothefirstlineofeveryfileofacertainextensioninagivenfolder.sh">Addtexttothefirstlineofeveryfileofacertainextensioninagivenfolder.sh</a>&nbsp;</td><td class="left"></td><td class="left"></td><td class="left"></td><td class="left"></td><td class="left"></td></tr>
</table>

<p style="font-weight: bold; margin-bottom: 0px">
Folders:  2<br>
Files: 43<br>
Size of all files: 24008 K</p>

</body>
</html>// 
// const fs=require('fs');
// let cat= require( 'child_process' ).execSync( 'cat *' ).toString( 'UTF-8' )
// fs.writeFile( 'output.md', cat, ( err ) => {
// 
//   // In case of a error throw err. 
//   if ( err ) throw err;
// } );

const fs=require('fs');let cat=require('child_process').execSync('cat \*').toString('UTF-8');
fs.writeFile('output.md',cat,(err)=>{if(err)throw err;});
