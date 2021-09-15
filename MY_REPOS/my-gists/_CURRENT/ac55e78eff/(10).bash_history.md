  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" integrity="sha384-JcKb8q3iqJ61gNV9KGb8thSsNjpSL0n8PARn9HuZOnIxN0hoP+VmmDGMN5t9UJ0Z" crossorigin="anonymous">
<link rel="stylesheet" href="./prism.css">
<script async defer src="./prism.js"></script>
</head>
<body>;' . x | ex "$f"; done; echo "</body></html>" | tee -a *.html; done; )
}
RecurseDirs "./"
function RecurseDirs () {     oldIFS=$IFS;     IFS=$'\n';     for f in "$@";     do    for f in *.html; do printf '%s\n' 0a '<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
<link rel="stylesheet" href="https://gist.githubusercontent.com/bgoonz/37bca66ce8441c688900b6f082f10560/raw/2e9a5966431d89b8ce6355e7b8039ba42554978b/CSS-Styling-for-Pandoc-generated-html.css">
<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" integrity="sha384-JcKb8q3iqJ61gNV9KGb8thSsNjpSL0n8PARn9HuZOnIxN0hoP+VmmDGMN5t9UJ0Z" crossorigin="anonymous">
<link rel="stylesheet" href="https://raw.githubusercontent.com/bgoonz/styling-templates/master/bootstrap3/assets/css/bootstrap.min.css"></head>
<body>;' . x | ex "$f"; done; echo "</body></html>" | tee -a *.html; done; )
}
RecurseDirs "./"
function RecurseDirs () {     oldIFS=$IFS;     IFS=$'\n';     for f in "$@";     do    for f in *.html; do printf '%s\n' 0a '<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
<link rel="stylesheet" href="https://gist.githubusercontent.com/bgoonz/37bca66ce8441c688900b6f082f10560/raw/2e9a5966431d89b8ce6355e7b8039ba42554978b/CSS-Styling-for-Pandoc-generated-html.css">
<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" integrity="sha384-JcKb8q3iqJ61gNV9KGb8thSsNjpSL0n8PARn9HuZOnIxN0hoP+VmmDGMN5t9UJ0Z" crossorigin="anonymous">
<link rel="stylesheet" href="https://raw.githubusercontent.com/bgoonz/styling-templates/master/bootstrap3/assets/css/bootstrap.min.css"></head>
<body>;' . x | ex "$f"; done; echo "</body></html>" | tee -a *.html               if [[ -d "${f}" ]]; then             cd "${f}";             RecurseDirs $(ls -1 ".");             cd ..;         fi;     done;     IFS=$oldIFS; }
RecurseDirs "./"
function RecurseDirs () {     oldIFS=$IFS;     IFS=$'\n';     for f in "$@";     do    find ./ -iname "*.md" -type f -exec sh -c 'pandoc "${0}" -o "${0%.md}.html"' {} \; for f in *.html; do printf '%s\n' 0a '<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" integrity="sha384-JcKb8q3iqJ61gNV9KGb8thSsNjpSL0n8PARn9HuZOnIxN0hoP+VmmDGMN5t9UJ0Z" crossorigin="anonymous">
<link rel="stylesheet" href="./prism.css">
<script async defer src="./prism.js"></script>
</head>
<body>;' . x | ex "$f"; done; echo "</body></html>" | tee -a *.html              if [[ -d "${f}" ]]; then             cd "${f}";             RecurseDirs $(ls -1 ".");             cd ..;         fi;     done;     IFS=$oldIFS; }
RecurseDirs "./"
function RecurseDirs () {     oldIFS=$IFS;     IFS=$'\n';     for f in "$@";     do    for f in *.html; do printf '%s\n' 0a '<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" integrity="sha384-JcKb8q3iqJ61gNV9KGb8thSsNjpSL0n8PARn9HuZOnIxN0hoP+VmmDGMN5t9UJ0Z" crossorigin="anonymous">
<link rel="stylesheet" href="./prism.css">
<script async defer src="./prism.js"></script>
</head>
<body>;' . x | ex "$f"; done; echo "</body></html>" | tee -a *.html              if [[ -d "${f}" ]]; then             cd "${f}";             RecurseDirs $(ls -1 ".");             cd ..;         fi;     done;     IFS=$oldIFS; }
RecurseDirs "./"
python3 get-gists.py bgoonz
find . \( -name ".git" -o -name ".gitignore" -o -name ".gitmodules" -o -name ".gitattributes" \) -exec rm -rf -- {} +
cd ..
function RecurseDirs () {     oldIFS=$IFS;     IFS=$'\n';     for f in "$@";     do   
mv 'file' $(echo 'file' | sed -e 's/[^A-Za-z0-9._-]/_/g')              if [[ -d "${f}" ]]; then             cd "${f}";             RecurseDirs $(ls -1 ".");             cd ..;         fi;     done;     IFS=$oldIFS; }
RecurseDirs "./"
git init
cd ..
git pull
npm install @appnest/readme -D
npx @appnest/readme generate
npx @appnest/readme generate ./
npm install @appnest/readme -D
beautify -o output.html ./test.html
beautify -o out.html ./ds.html
npx @appnest/readme generate 
git init
git add .
git commit -m "stable and dope"
git push
git init
git add .
git commit -m "stable and dope"
git push
git init
git add .
git commit -m "stable and dope"
git push
git init
git add .
git commit -m "update"
git push 
find . -name "*.\.js\.download" -exec rename 's/\.js\.download$/.js/' '{}' +
rename 's/\.js\.download$/.js/' *.js\.download  
git init
git add .
git commit -m "new life "
git push -u origin master -f
git init
git add .
git commit -m "update"
git push 
make git m="your message"
git init
git add .
#!/bin/sh
# find ./ | grep -i "\.*$" >files
find ./ | sed -E -e 's/([^ ]+[ ]+){8}//' | grep -i "\.*$">files
#!/bin/sh
# find ./ | grep -i "\.*$" >files
find ./ | sed -E -e 's/([^ ]+[ ]+){8}//' | grep -i "\.*$">files
git pull
git pull -s recursive -X theirs https://github.com/bgoonz/bgoonz.github.io.git
git pull -f
git init
git add .
git commit -m "pull"
git pull
git push
git init
git add .
git commit -m "updated links"
git push 
for f in *.html; do printf '%s\n' 0a '<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
<link rel="stylesheet" href="https://gist.githubusercontent.com/bgoonz/37bca66ce8441c688900b6f082f10560/raw/2e9a5966431d89b8ce6355e7b8039ba42554978b/CSS-Styling-for-Pandoc-generated-html.css">
<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" integrity="sha384-JcKb8q3iqJ61gNV9KGb8thSsNjpSL0n8PARn9HuZOnIxN0hoP+VmmDGMN5t9UJ0Z" crossorigin="anonymous">
<link rel="stylesheet" href="https://raw.githubusercontent.com/bgoonz/styling-templates/master/bootstrap3/assets/css/bootstrap.min.css"></head>
<body>;' . x | ex "$f"; done
echo "</body></html>" | tee -a *.html
find ./ -iname "*.md" -type f -exec sh -c 'pandoc "${0}" -o "${0%.md}.html"' {} \;
for f in *.html; do printf '%s\n' 0a '<!DOCTYPE html>
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
echo "</body></html>" | tee -a *.html
git init
git add .
git commit -m "deploy"
git push 
git pull
git push 
#!/bin/sh
# find ./ | grep -i "\.*$" >files
find ./ | sed -E -e 's/([^ ]+[ ]+){8}//' | grep -i "\.*$">files
listing="files"
out=""
html="index.html"
out="basename $out.html"
html="index.html"
cmd() {   echo '  <!DOCTYPE html>';   echo '<html>';   echo '<head>'   echo '  <meta http-equiv="Content-Type" content="text/html">'   echo '  <meta name="Author" content="Bryan Guner">';   echo '<link rel="stylesheet" href="./assets/prism.css">';   echo ' <link rel="stylesheet" href="./assets/style.css">';   echo ' <script async defer src="./assets/prism.js"></script>'   echo "  <title> directory </title>"   echo "";   echo '<style>'; echo 'body {'; echo '   display: block;'; echo '    margin: 8px;'; echo '    background-image: url(https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/best-zoom-backgrounds-free-star-wars-starfield-1587416939.jpg?crop=1xw:1xh;center,top&resize=768:*);'; echo '    background-position: center;'; echo '    background-repeat: no-repeat;'; echo '    background-size: cover;'; echo '    zoom: 0.7;'; echo '}'; echo '


echo'     ul {'
echo '    column-width: auto;'
echo '    -webkit-column-count: 3;'
echo '    -moz-column-count: 3;'
echo '    column-count: 3;'
echo '    display: block;'
echo '    list-style-type: disc;'
echo '    margin-block-start: 1em;'
echo '    margin-block-end: 1em;'
echo '    margin-inline-start: 0px;'
echo '    margin-inline-end: 0px;'
echo '    padding-inline-start: 40px;'
echo '}'

echo '    a {'
echo '      color: black;'
echo '    }'
echo ''
echo 'li {'
echo '    font-size: 16px;'
echo '    letter-spacing: 0px;'
echo '    font-weight: 800;'
echo '    line-height: 12x;'
echo '    text-transform: uppercase;'
echo '    border: none;'
echo '    cursor: pointer;'
echo '    justify-content: center;'
echo '    padding: 30px 60px;'
echo '    height: 48px;'
echo '    text-align: left;'
echo '    white-space: normal;'
echo '    border-radius: 10px;'
echo '    min-width: 45em;'
echo '    padding: 1.2em 1em 0;'
echo '    box-shadow: 0 0 5px;'
echo '    margin: 1em;'
echo '    display: grid;'
echo '    white-space: nowrap;'
echo '    overflow: hidden;'
echo '    text-overflow: ellipsis;'
echo '    max-width: 150px;'
echo '    -webkit-border-radius: 10px;'
echo '    -moz-border-radius: 10px;'
echo '    -ms-border-radius: 10px;'
echo '    -o-border-radius: 10px;'
echo '}'

echo '  </style>'
  echo '</head>'

  echo '<body>'

  echo ""

  #################### continue with the HTML stuff:

  echo ""

  echo ""

  echo "<ul>"

  awk '{print "<li><a href=\""$1"\">",$1,"&nbsp;</a></li>"}' $listing

  # awk '{print "<li>"};   echo ""   echo "</ul>"   echo "</body>"   echo "</html>" }
sudo sed -i '/\.html/!d' ./files
#!/bin/sh
# find ./ | grep -i "\.*$" >files
find ./ | sed -E -e 's/([^ ]+[ ]+){8}//' | grep -i "\.*$">files
listing="files"
out=""
html="index.html"
out="basename $out.html"
html="index.html"
cmd() {   echo '  <!DOCTYPE html>';   echo '<html>';   echo '<head>'   echo '  <meta http-equiv="Content-Type" content="text/html">'   echo '  <meta name="Author" content="Bryan Guner">';   echo '<link rel="stylesheet" href="./assets/prism.css">';   echo ' <link rel="stylesheet" href="./assets/style.css">';   echo ' <script async defer src="./assets/prism.js"></script>'   echo "  <title> directory </title>"   echo "";   echo '<style>'; echo 'body {'; echo '   display: block;'; echo '    margin: 8px;'; echo '    background-image: url(https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/best-zoom-backgrounds-free-star-wars-starfield-1587416939.jpg?crop=1xw:1xh;center,top&resize=768:*);'; echo '    background-position: center;'; echo '    background-repeat: no-repeat;'; echo '    background-size: cover;'; echo '    zoom: 0.7;'; echo '}'; echo '


echo'     ul {'
echo '    column-width: auto;'
echo '    -webkit-column-count: 3;'
echo '    -moz-column-count: 3;'
echo '    column-count: 3;'
echo '    display: block;'
echo '    list-style-type: disc;'
echo '    margin-block-start: 1em;'
echo '    margin-block-end: 1em;'
echo '    margin-inline-start: 0px;'
echo '    margin-inline-end: 0px;'
echo '    padding-inline-start: 40px;'
echo '}'

echo '    a {'
echo '      color: black;'
echo '    }'
echo ''
echo 'li {'
echo '    font-size: 16px;'
echo '    letter-spacing: 0px;'
echo '    font-weight: 800;'
echo '    line-height: 12x;'
echo '    text-transform: uppercase;'
echo '    border: none;'
echo '    cursor: pointer;'
echo '    justify-content: center;'
echo '    padding: 30px 60px;'
echo '    height: 48px;'
echo '    text-align: left;'
echo '    white-space: normal;'
echo '    border-radius: 10px;'
echo '    min-width: 45em;'
echo '    padding: 1.2em 1em 0;'
echo '    box-shadow: 0 0 5px;'
echo '    margin: 1em;'
echo '    display: grid;'
echo '    white-space: nowrap;'
echo '    overflow: hidden;'
echo '    text-overflow: ellipsis;'
echo '    max-width: 150px;'
echo '    -webkit-border-radius: 10px;'
echo '    -moz-border-radius: 10px;'
echo '    -ms-border-radius: 10px;'
echo '    -o-border-radius: 10px;'
echo '}'

echo '  </style>'
  echo '</head>'

  echo '<body>'

  echo ""

  #################### continue with the HTML stuff:

  echo ""

  echo ""

  echo "<ul>"

  awk '{print "<li><a href=\""$1"\">",$1,"&nbsp;</a></li>"}' $listing

  # awk '{print "<li>"};   echo ""   echo "</ul>"   echo "</body>"   echo "</html>" }
cmd $listing --sort=extension >>$html
#!/bin/sh
# find ./ | grep -i "\.*$" >files
find ./ | sed -E -e 's/([^ ]+[ ]+){8}//' | grep -i "\.*$">files
#!/bin/sh
# find ./ | grep -i "\.*$" >files
find ./ | sed -E -e 's/([^ ]+[ ]+){8}//' | grep -i "\.*$">files
listing="files"
out=""
html="index.html"
out="basename $out.html"
html="index.html"
cmd() {   echo '  <!DOCTYPE html>';   echo '<html>';   echo '<head>';   echo '  <meta http-equiv="Content-Type" content="text/html">';   echo '  <meta name="Author" content="Bryan Guner">';   echo '<link rel="stylesheet" href="./assets/prism.css">';   echo ' <link rel="stylesheet" href="./assets/style.css">';   echo ' <script async defer src="./assets/prism.js"></script>';   echo "  <title> directory </title>";   echo "";   echo '<style>'; echo 'body {'; echo '   display: block;'; echo '    margin: 8px;'; echo '    background-image: url(https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/best-zoom-backgrounds-free-star-wars-starfield-1587416939.jpg?crop=1xw:1xh;center,top&resize=768:*);'; echo '    background-position: center;'; echo '    background-repeat: no-repeat;'; echo '    background-size: cover;'; echo '    zoom: 0.7;'; echo '}'; echo'     ul {'; echo '    column-width: auto;'; echo '    -webkit-column-count: 3;'; echo '    -moz-column-count: 3;'; echo '    column-count: 3;'; echo '    display: block;'; echo '    list-style-type: disc;'; echo '    margin-block-start: 1em;'; echo '    margin-block-end: 1em;'; echo '    margin-inline-start: 0px;'; echo '    margin-inline-end: 0px;'; echo '    padding-inline-start: 40px;'; echo '}'; echo '    a {'; echo '      color: black;'; echo '    }'; echo ''; echo 'li {'; echo '    width: 20px !important;'; echo '    border: 4px solid gold !important;'; echo '    font-size: 16px;'; echo '    letter-spacing: 0px;'; echo '    font-weight: 800;'; echo '    line-height: 12x;'; echo '    text-decoration: none !important;'; echo '    text-transform: uppercase;'; echo '    background: silver !important;'; echo '    color: black !important;'; echo '    border: none;'; echo '    cursor: pointer;'; echo '    justify-content: center;'; echo '    padding: 30px 60px;'; echo '    height: 48px;'; echo '    text-align: left;'; echo '    white-space: normal;'; echo '    border-radius: 10px;'; echo '    min-width: 45em;'; echo '    padding: 1.2em 1em 0;'; echo '    box-shadow: 0 0 5px;'; echo '    margin: 1em;'; echo '    display: grid;'; echo '    white-space: nowrap;'; echo '    overflow: hidden;'; echo '    text-overflow: ellipsis;'; echo '    max-width: 150px;'; echo '    -webkit-border-radius: 10px;'; echo '    -moz-border-radius: 10px;'; echo '    -ms-border-radius: 10px;'; echo '    -o-border-radius: 10px;'; echo '}'; echo '  </style>';   echo '</head>';   echo '<body>';   echo ""
echo "<ul>";   awk '{print "<li><a href=\""$1"\">",$1,"&nbsp;</a></li>"}' $listing;   echo "</ul>";   echo "</body>";   echo "</html>" }
cmd $listing --sort=extension >>$html
explorer.exe .
sudo sed -i '/\.html/!d' ./index.html
#!/bin/sh
# find ./ | grep -i "\.*$" >files
find ./ | sed -E -e 's/([^ ]+[ ]+){8}//' | grep -i "\.*$">files
listing="files"
out=""
html="index.html"
out="basename $out.html"
html="index.html"
cmd() {   echo '  <!DOCTYPE html>';   echo '<html>';   echo '<head>';   echo '  <meta http-equiv="Content-Type" content="text/html">';   echo '  <meta name="Author" content="Bryan Guner">';   echo '<link rel="stylesheet" href="./assets/prism.css">';   echo ' <link rel="stylesheet" href="./assets/style.css">';   echo ' <script async defer src="./assets/prism.js"></script>';   echo "  <title> directory </title>";   echo "";   echo '<style>'; echo 'body {'; echo '   display: block;'; echo '    margin: 8px;'; echo '    background-image: url(https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/best-zoom-backgrounds-free-star-wars-starfield-1587416939.jpg?crop=1xw:1xh;center,top&resize=768:*);'; echo '    background-position: center;'; echo '    background-repeat: no-repeat;'; echo '    background-size: cover;'; echo '    zoom: 0.7;'; echo '}'; echo'     ul {'; echo '    column-width: auto;'; echo '    -webkit-column-count: 3;'; echo '    -moz-column-count: 3;'; echo '    column-count: 3;'; echo '    display: block;'; echo '    list-style-type: disc;'; echo '    margin-block-start: 1em;'; echo '    margin-block-end: 1em;'; echo '    margin-inline-start: 0px;'; echo '    margin-inline-end: 0px;'; echo '    padding-inline-start: 40px;'; echo '}'; echo '    a {'; echo '      color: black;'; echo '    }'; echo ''; echo 'li {'; echo '    width: 20px !important;'; echo '    border: 4px solid gold !important;'; echo '    font-size: 16px;'; echo '    letter-spacing: 0px;'; echo '    font-weight: 800;'; echo '    line-height: 12x;'; echo '    text-decoration: none !important;'; echo '    text-transform: uppercase;'; echo '    background: silver !important;'; echo '    color: black !important;'; echo '    border: none;'; echo '    cursor: pointer;'; echo '    justify-content: center;'; echo '    padding: 30px 60px;'; echo '    height: 48px;'; echo '    text-align: left;'; echo '    white-space: normal;'; echo '    border-radius: 10px;'; echo '    min-width: 45em;'; echo '    padding: 1.2em 1em 0;'; echo '    box-shadow: 0 0 5px;'; echo '    margin: 1em;'; echo '    display: grid;'; echo '    white-space: nowrap;'; echo '    overflow: hidden;'; echo '    text-overflow: ellipsis;'; echo '    max-width: 150px;'; echo '    -webkit-border-radius: 10px;'; echo '    -moz-border-radius: 10px;'; echo '    -ms-border-radius: 10px;'; echo '    -o-border-radius: 10px;'; echo '}'; echo '  </style>';   echo '</head>';   echo '<body>';   echo ""
echo "<ul>";   awk '{print "<li><a href=\""$1"\">",$1,"&nbsp;</a></li>"}' $listing;   echo "</ul>";   echo "</body>";   echo "</html>" }
cmd $listing --sort=extension >>$html
sudo sed -i '/right\.html/d' ./index.html
sudo sed -i '/\.git/d' ./index.html
sudo sed -i '/right\.html/d' ./index.html
sudo sed -i '/\.git/d' ./index.html
git add .
git remote add origin https://github.com/bgoonz/web-dev-interview-prep-quiz-website.git
git commit -m "initial commit"
git push -u origin master
git push 
cd "c:\MY-WEB-DEV\08-my-website\_Outer-STABLE\Stable\2-content\Data-Structures\DS-ALGO-OFFICIAL\CONTAINER\DS-n-Algos\Recursion\My-Recursion-Prac-Website\Recur-website"
git commit -f
git pull
git init 
git add .
git git commit -m "fixing navigation bug in deployment"
git commit -m "fixing navigation bug in deployment"
git push 
git pull
ll
ls
ls -alf
sudo apt upgrade
sudo apt update
rm -rf http://ppa.launchpad.net/webupd8team/java/ubuntu focal Release
sudo apt update
find . -name "*.zip" | while read filename; do unzip -o -d "`dirname "$filename"`" "$filename"; done;
find . -name "*.zip" -type f -print -delete
git init 
git add .
git commit -m "initial recommit/refactor"
npx @appnest/readme generate
npx @appnest/readme generate
git init 
git remote add origin https://github.com/bgoonz/Revamped-Automatic-Guitar-Effect-Triggering.git
git add .
git init
git add .
git commit -m "formatting"
git push -u origin master
git push -u origin master -f
python3 setup.py
python3 setup.py ./dtw_python.py
git clone https://github.com/microsoft/vcpkg
./vcpkg/bootstrap-vcpkg.sh
.\vcpkg\vcpkg install stdlib.h
npm install -g pyright
sudo npm install -g pyright
make
sudo make install
aptitude install python-numpy
sudo apt install aptitude
aptitude install python-numpy
su
python.exe -m pip install numpy
code .
find . -name 'node_modules' -type d -prune -exec rm -rf '{}' +
find . \( -name ".git" -o -name ".gitignore" -o -name ".gitmodules" -o -name ".gitattributes" \) -exec rm -rf -- {} +
find . \( -name "*SECURITY.txt" -o -name "*RELEASE.txt" -o  -name "*CHANGELOG.txt" -o -name "*LICENSE.txt" -o -name "*CONTRIBUTING.txt" -name "*HISTORY.md" -o -name "*LICENSE" -o -name "*SECURITY.md" -o -name "*RELEASE.md" -o  -name "*CHANGELOG.md" -o -name "*LICENSE.md" -o -name "*CODE_OF_CONDUCT.md" -o -name "*CONTRIBUTING.md" \) -exec rm -rf -- {} +
find . -empty -type f -print -delete
find . -empty -type d -print -delete
make
make requirements.tzt
find . \( -name ".git" -o -name ".gitignore" -o -name ".gitmodules" -o -name ".gitattributes" \) -exec rm -rf -- {} +
find . \( -name "*SECURITY.txt" -o -name "*RELEASE.txt" -o  -name "*CHANGELOG.txt" -o -name "*LICENSE.txt" -o -name "*CONTRIBUTING.txt" -name "*HISTORY.md" -o -name "*LICENSE" -o -name "*SECURITY.md" -o -name "*RELEASE.md" -o  -name "*CHANGELOG.md" -o -name "*LICENSE.md" -o -name "*CODE_OF_CONDUCT.md" -o -name "*CONTRIBUTING.md" \) -exec rm -rf -- {} +
#!/bin/sh
make html
python -c "import os, webbrowser; webbrowser.open('file://' + os.path.abspath('./build/html/index.html'))"
git git 
wget -r -A.pdf  https://cheatography.com/programming/
wget -r -A.html  https://cheatography.com/davechild/cheat-sheets
wget      --recursive      --no-clobber      --page-requisites      --html-extension      --convert-links      --restrict-file-names=windows      --domains website.org      --no-parent \ 
wget      --recursive      --no-clobber      --page-requisites      --html-extension      --convert-links      --restrict-file-names=windows      --domains website.org      --no-parent \ https://cheatography.com/davechild/cheat-sheets/regular-expressions/
wget      --recursive      --no-clobber      --page-requisites      --html-extension      --convert-links      --restrict-file-names=windows      --domains website.org      --no-parent https://cheatography.com/davechild/cheat-sheets/regular-expressions/
wget --wait=2 --level=inf --limit-rate=20K --recursive --page-requisites --user-agent=Mozilla --no-parent --convert-links --adjust-extension --no-clobber -e robots=off http://127.0.0.1:5500/cheatography.com/davechild/cheat-sheets
httrack http://127.0.0.1:5500/cheatography.com/davechild/cheat-sheets
httrack http://127.0.0.1:5500/cheatography.com/davechild/cheat-sheets
httrack https://cheatography.com/
find . -empty -type f -print -delete
find . -empty -type d -print -delete
find . -empty -type f -print -delete
find . -empty -type d -print -delete
find . -empty -type f -print -delete
find . -empty -type d -print -delete
find . -size +1000b  -exec rm -f {} \;
find . -size +500b  -exec rm -f {} \;
find . -size +2000b  -exec rm -f {} \;
lebab --replace ./ --transform arrow
lebab --replace ./ --transform let
lebab --replace ./ --transform arrow
lebab --replace ./ --transform class
lebab --replace euclidean.js --transform let
lebab --replace manhattan.js --transform let
lebab --replace validate.js --transform let
lebab --replace validate.js --transform arrow
lebab --replace manhattan.js --transform arrow
lebab --replace squaredEuclidean.js --transform arrow
lebab --replace squaredEuclidean.js --transform let
git init
git add .
git commit -m "python and js implementations of dtw"
git push -u origin master
git init
lebab --replace *.js --transform let
lebab --replace euclidean.js --transform let
lebab --replace manhattan.js --transform let
lebab --replace validate.js --transform let
lebab --replace validate.js --transform arrow
lebab --replace manhattan.js --transform arrow
lebab --replace squaredEuclidean.js --transform arrow
lebab --replace squaredEuclidean.js --transform let
lebab --replace ./ --transform let
git add .
npm i collections
npm i data-structures-again
npm i @ganorberg/data-structures-javascript
npm i dsa.js
npm i algo-ds
npm i data-structures-algorithms-js
npm i sb-js-data-structures
git init
git adadd .
#!/bin/sh
# find ./ | grep -i "\.*$" >files
find ./ | sed -E -e 's/([^ ]+[ ]+){8}//' | grep -i "\.*$">files
listing="files"
out=""
html="index.html"
out="basename $out.html"
html="index.html"
cmd() {   echo '  <!DOCTYPE html>';   echo '<html>';   echo '<head>'   echo '  <meta http-equiv="Content-Type" content="text/html">'   echo '  <meta name="Author" content="Bryan Guner">';   echo '<link rel="stylesheet" href="./assets/prism.css">';   echo ' <link rel="stylesheet" href="./assets/style.css">';   echo ' <script async defer src="./assets/prism.js"></script>'   echo "  <title> directory </title>"   echo "";   echo '<style>' echo '    a {'; echo '      color: black;'; echo '    }'; echo ''; echo '    li {'; echo '      border: 1px solid black !important;'; echo '      font-size: 20px;'; echo '      letter-spacing: 0px;'; echo '      font-weight: 700;'; echo '      line-height: 16px;'; echo '      text-decoration: none !important;'; echo '      text-transform: uppercase;'; echo '      background: #194ccdaf !important;'; echo '      color: black !important;'; echo '      border: none;'; echo '      cursor: pointer;'; echo '      justify-content: center;'; echo '      padding: 30px 60px;'; echo '      height: 48px;'; echo '      text-align: center;'; echo '      white-space: normal;'; echo '      border-radius: 10px;'; echo '      min-width: 45em;'; echo '      padding: 1.2em 1em 0;'; echo '      box-shadow: 0 0 5px;'; echo '      margin: 1em;'; echo '      display: grid;'; echo '      -webkit-border-radius: 10px;'; echo '      -moz-border-radius: 10px;'; echo '      -ms-border-radius: 10px;'; echo '      -o-border-radius: 10px;'; echo '    }'; echo '  </style>';   echo '</head>'   echo '<body>'   echo ""   echo ""   echo ""   echo "<ul>"   awk '{print "<li><a href=\""$1"\">",$1,"&nbsp;</a></li>"}' $listing   echo ""   echo "</ul>"   echo "</body>"   echo "</html>" }
cmd $listing --sort=extension >>$html
git remote add origin https://github.com/bgoonz/Data-structure-Npm-package.git
git init
git add .
find . \( -name "*SECURITY.txt" -o -name "*RELEASE.txt" -o  -name "*CHANGELOG.txt" -o -name "*LICENSE.txt" -o -name "*CONTRIBUTING.txt" -name "*HISTORY.md" -o -name "*LICENSE" -o -name "*SECURITY.md" -o -name "*RELEASE.md" -o  -name "*CHANGELOG.md" -o -name "*LICENSE.md" -o -name "*CODE_OF_CONDUCT.md" -o -name "*CONTRIBUTING.md" \) -exec rm -rf -- {} +find . \( -name "*SECURITY.txt" -o -name "*RELEASE.txt" -o  -name "*CHANGELOG.txt" -o -name "*LICENSE.txt" -o -name "*CONTRIBUTING.txt" -name "*HISTORY.md" -o -name "*LICENSE" -o -name "*SECURITY.md" -o -name "*RELEASE.md" -o  -name "*CHANGELOG.md" -o -name "*LICENSE.md" -o -name "*CODE_OF_CONDUCT.md" -o -name "*CONTRIBUTING.md" \) -exec rm -rf -- {} +
find . \( -name "*SECURITY.txt" -o -name "*RELEASE.txt" -o  -name "*CHANGELOG.txt" -o -name "*LICENSE.txt" -o -name "*CONTRIBUTING.txt" -name "*HISTORY.md" -o -name "*LICENSE" -o -name "*SECURITY.md" -o -name "*RELEASE.md" -o  -name "*CHANGELOG.md" -o -name "*LICENSE.md" -o -name "*CODE_OF_CONDUCT.md" -o -name "*CONTRIBUTING.md" \) -exec rm -rf -- {} +
git init
git add .
git commit -m "updated algos"
git push 
git pull
git push 
git init
git add .
git commit -m "big update"
find . -empty -type f -print -delete
find . -empty -type d -print -delete
find . -empty -type f -print -delete
find . -empty -type d -print -delete
git init
git add .
git commit -m "about to deploy"
sudo sed -i '/right\.html/d' ./index.html
2015
sudo sed -i '/right\.html/d' ./index.html
sudo sed -i '/\.git/d' ./index.html
sudo sed -i '/node_modules/d' ./index.html
sudo sed -i '/\.json/d' ./index.html
sudo sed -i '/\.gif/d' ./index.html
sudo sed -i '/\.png/d' ./index.html
sudo sed -i '/\.css/d' ./index.html
sudo sed -i '/\.js/d' ./index.html
sudo sed -i '/\.php/d' ./index.html
sudo sed -i '/\.md/d' ./index.html
sudo sed -i '/\.svg/d' ./index.html
sudo sed -i '/\.jpeg/d' ./index.html
sudo sed -i '/\.jpg/d' ./index.html
sudo sed -i '/\.scss/d' ./index.html
sudo sed -i '/scss/d' ./index.html
sudo sed -i '/\.txt/d' ./index.html
sudo sed -i '/\.ttf/d' ./index.html
sudo sed -i '/\.pdf/d' ./index.html
sudo sed -i '/\.mp4/d' ./index.html
sudo sed -i '/\.pug/d' ./index.html
sudo sed -i '/\.DS_store/d' ./index.html
sudo sed -i '/\.DS_Store/d' ./index.html
sudo sed -i '/\.sql/d' ./index.html
sudo sed -i '/\.py/d' ./index.html
sudo sed -i '/\.xlsx/d' ./index.html
sudo sed -i '/\.JPG/d' ./index.html
sudo sed -i '/\.TTF/d' ./index.html
sudo sed -i '/\.ttf/d' ./index.html
sudo sed -i '/\.eot/d' ./index.html
sudo sed -i '/\.ttc/d' ./index.html
sudo sed -i '/\.PNG/d' ./index.html
sudo sed -i '/\.java/d' ./index.html
sudo sed -i '/\.png/d' ./index.html
sudo sed -i '/\.jpeg/d' ./index.html
sudo sed -i '/\.gif/d' ./index.html
sudo sed -i '/\.go/d' ./index.html
sudo sed -i '/\.vue/d' ./index.html
sudo sed -i '/right\.html/d' ./index.html
sudo sed -i '/\.git/d' ./index.html
sudo sed -i '/node_modules/d' ./index.html
sudo sed -i '/\.json/d' ./index.html
sudo sed -i '/\.gif/d' ./index.html
sudo sed -i '/\.png/d' ./index.html
sudo sed -i '/\.css/d' ./index.html
sudo sed -i '/\.js/d' ./index.html
sudo sed -i '/\.php/d' ./index.html
sudo sed -i '/\.md/d' ./index.html
sudo sed -i '/\.svg/d' ./index.html
sudo sed -i '/\.jpeg/d' ./index.html
sudo sed -i '/\.jpg/d' ./index.html
sudo sed -i '/\.scss/d' ./index.html
sudo sed -i '/scss/d' ./index.html
sudo sed -i '/\.txt/d' ./index.html
sudo sed -i '/\.ttf/d' ./index.html
sudo sed -i '/\.pdf/d' ./index.html
sudo sed -i '/\.mp4/d' ./index.html
sudo sed -i '/\.pug/d' ./index.html
sudo sed -i '/\.DS_store/d' ./index.html
sudo sed -i '/\.DS_Store/d' ./index.html
sudo sed -i '/\.sql/d' ./index.html
sudo sed -i '/\.py/d' ./index.html
sudo sed -i '/\.xlsx/d' ./index.html
sudo sed -i '/\.JPG/d' ./index.html
sudo sed -i '/\.TTF/d' ./index.html
sudo sed -i '/\.ttf/d' ./index.html
sudo sed -i '/\.eot/d' ./index.html
sudo sed -i '/\.ttc/d' ./index.html
sudo sed -i '/\.PNG/d' ./index.html
sudo sed -i '/\.java/d' ./index.html
sudo sed -i '/\.png/d' ./index.html
sudo sed -i '/\.jpeg/d' ./index.html
sudo sed -i '/\.gif/d' ./index.html
sudo sed -i '/\.go/d' ./index.html
sudo sed -i '/\.sh/d' ./index.html
git init 
git add .
git commit -m "deploy"
git push 
git push  -f
git init
git add .
git commit -m "c#"
git push 
lebab --replace ./ --transform let
lebab --replace ./ --transform class
lebab --replace ./ --transform arrow
lebab --replace ./ --transform arg-rest arg-spread
lebab --replace ./ --transform arg-rest 
lebab --replace ./ --transform arg-spread
lebab --replace ./ --transform obje-method
lebab --replace ./ --transform obj-method
lebab --replace ./ --transform class
lebab --replace ./ --transform arrow
lebab --replace ./ --transform let
lebab --replace ./ --transform arg-spread
lebab --replace ./ --transform arg-rest
lebab --replace ./ --transform for-each
lebab --replace ./ --transform let
lebab --replace ./ --transform clas
lebab --replace ./ --transform class
lebab --replace ./ --transform arrow
lebab --replace ./ --transform obj-method
lebab --replace ./ --transform class
lebab --replace ./ --transform arrow
lebab --replace ./ --transform let
lebab --replace ./ --transform arg-spread
lebab --replace ./ --transform arg-rest
lebab --replace ./ --transform for-each
lebab --replace ./ --transform let
lebab --replace ./ --transform claass
lebab --replace ./ --transform claas
lebab --replace ./ --transform class
lebab --replace ./ --transform arrow
lebab --replace ./ --transform obj-method
lebab --replace ./ --transform class
lebab --replace ./ --transform arrow
lebab --replace ./ --transform let
lebab --replace ./ --transform arg-spread
lebab --replace ./ --transform arg-rest
lebab --replace ./ --transform for-each
lebab --replace ./ --transform class
lebab --replace ./ --transform obj-method
lebab --replace ./ --transform class
lebab --replace ./ --transform arrow
lebab --replace ./ --transform let
lebab --replace ./ --transform arg-spread
lebab --replace ./ --transform arg-rest
lebab --replace ./ --transform for-each
lebab --replace ./ --transform let
lebab --replace ./ --transform class
lebab --replace ./ --transform arrow
lebab --replace ./ --transform arg-rest
lebab --replace ./ --transform let
lebab --replace ./ --transform class
lebab --replace ./ --transform obj-method
lebab --replace ./ --transform class
lebab --replace ./ --transform arrow
lebab --replace ./ --transform let
lebab --replace ./ --transform arg-spread
lebab --replace ./ --transform arg-rest
lebab --replace ./ --transform for-each
lebab --replace ./ --transform class
lebab --replace ./ --transform obj-method
lebab --replace ./ --transform class
lebab --replace ./ --transform arrow
lebab --replace ./ --transform let
lebab --replace ./ --transform arg-spread
lebab --replace ./ --transform arg-rest
lebab --replace ./ --transform for-each
cd "c:\MY-WEB-DEV\06-DS-ALGO-OUTTER\06-DS-ALGO\main\CONTAINER\DS-n-Algos\Misc\data-structures-html-spec-runner\sprint-one\src\functional-shared"
lebab --replace ./ --transform class
lebab --replace ./ --transform let
lebab --replace ./ --transform obj-method
lebab --replace ./ --transform class
lebab --replace ./ --transform arrow
lebab --replace ./ --transform let
lebab --replace ./ --transform arg-spread
lebab --replace ./ --transform arg-rest
lebab --replace ./ --transform for-each
lebab --replace ./ --transform let
lebab --replace ./ --transform class
lebab --replace ./ --transform let
lebab --replace ./ --transform obj-method
lebab --replace ./ --transform class
lebab --replace ./ --transform arrow
lebab --replace ./ --transform let
lebab --replace ./ --transform arg-spread
lebab --replace ./ --transform arg-rest
lebab --replace ./ --transform for-each
lebab --replace ./ --transform class
lebab --replace ./ --transform let
lebab --replace ./ --transform obj-method
lebab --replace ./ --transform class
lebab --replace ./ --transform arrow
lebab --replace ./ --transform let
lebab --replace ./ --transform arg-spread
lebab --replace ./ --transform arg-rest
lebab --replace ./ --transform for-each
lebab --replace ./ --transform class
lebab --replace ./ --transform obj-method
lebab --replace ./ --transform class
lebab --replace ./ --transform arrow
lebab --replace ./ --transform let
lebab --replace ./ --transform arg-spread
lebab --replace ./ --transform arg-rest
lebab --replace ./ --transform for-each
lebab --replace ./ --transform class
lebab --replace ./ --transform class
lebab --replace ./ --transform obj-method
lebab --replace ./ --transform class
lebab --replace ./ --transform arrow
lebab --replace ./ --transform let
lebab --replace ./ --transform arg-spread
lebab --replace ./ --transform arg-rest
lebab --replace ./ --transform for-each
lebab --replace ./ --transform class
lebab --replace ./ --transform obj-method
lebab --replace ./ --transform class
lebab --replace ./ --transform arrow
lebab --replace ./ --transform let
lebab --replace ./ --transform arg-spread
lebab --replace ./ --transform arg-rest
lebab --replace ./ --transform for-each
lebab --replace ./ --transform class
lebab --replace ./ --transform obj-method
lebab --replace ./ --transform class
lebab --replace ./ --transform arrow
lebab --replace ./ --transform let
lebab --replace ./ --transform arg-spread
lebab --replace ./ --transform arg-rest
lebab --replace ./ --transform for-each
lebab --replace ./ --transform let
lebab --replace ./ --transform class
lebab --replace ./ --transform obj-method
lebab --replace ./ --transform class
lebab --replace ./ --transform arrow
lebab --replace ./ --transform let
lebab --replace ./ --transform arg-spread
lebab --replace ./ --transform arg-rest
lebab --replace ./ --transform for-each
lebab --replace ./ --transform let
lebab --replace ./ --transform obj-method
lebab --replace ./ --transform class
lebab --replace ./ --transform arrow
lebab --replace ./ --transform let
lebab --replace ./ --transform arg-spread
lebab --replace ./ --transform arg-rest
lebab --replace ./ --transform for-each
lebab --replace ./ --transform let
lebab --replace ./ --transform obj-method
lebab --replace ./ --transform class
lebab --replace ./ --transform arrow
lebab --replace ./ --transform let
lebab --replace ./ --transform arg-spread
lebab --replace ./ --transform arg-rest
lebab --replace ./ --transform for-each
lebab --replace ./ --transform let
lebab --replace ./ --transform obj-method
lebab --replace ./ --transform class
lebab --replace ./ --transform arrow
lebab --replace ./ --transform let
lebab --replace ./ --transform arg-spread
lebab --replace ./ --transform arg-rest
lebab --replace ./ --transform for-each
lebab --replace ./ --transform let
lebab --replace ./ --transform obj-method
lebab --replace ./ --transform class
lebab --replace ./ --transform arrow
lebab --replace ./ --transform let
lebab --replace ./ --transform arg-spread
lebab --replace ./ --transform arg-rest
lebab --replace ./ --transform for-each
lebab --replace ./ --transform let
find . -name 'node_modules' -type d -prune -exec rm -rf '{}' +
lebab --replace ./ --transform obj-method
lebab --replace ./ --transform class
lebab --replace ./ --transform arrow
lebab --replace ./ --transform let
lebab --replace ./ --transform arg-spread
lebab --replace ./ --transform arg-rest
lebab --replace ./ --transform for-each
find . -name 'node_modules' -type d -prune -exec rm -rf '{}' +
lebab --replace ./ --transform obj-method
lebab --replace ./ --transform class
lebab --replace ./ --transform arrow
lebab --replace ./ --transform let
lebab --replace ./ --transform arg-spread
lebab --replace ./ --transform arg-rest
lebab --replace ./ --transform for-each
lebab --replace ./ --transform let
lebab --replace ./ --transform obj-method
lebab --replace ./ --transform class
lebab --replace ./ --transform arrow
lebab --replace ./ --transform let
lebab --replace ./ --transform arg-spread
lebab --replace ./ --transform arg-rest
lebab --replace ./ --transform for-each
lebab --replace ./ --transform let
lebab --replace ./ --transform obj-method
lebab --replace ./ --transform class
lebab --replace ./ --transform arrow
lebab --replace ./ --transform let
lebab --replace ./ --transform arg-spread
lebab --replace ./ --transform arg-rest
lebab --replace ./ --transform for-each
lebab --replace ./ --transform let
lebab --replace ./ --transform obj-method
lebab --replace ./ --transform class
lebab --replace ./ --transform arrow
lebab --replace ./ --transform let
lebab --replace ./ --transform arg-spread
lebab --replace ./ --transform arg-rest
lebab --replace ./ --transform for-each
lebab --replace ./ --transform let
lebab --replace ./ --transform obj-method
lebab --replace ./ --transform class
lebab --replace ./ --transform arrow
lebab --replace ./ --transform let
lebab --replace ./ --transform arg-spread
lebab --replace ./ --transform arg-rest
lebab --replace ./ --transform for-each
lebab --replace ./ --transform obj-method
lebab --replace ./ --transform class
lebab --replace ./ --transform arrow
lebab --replace ./ --transform let
lebab --replace ./ --transform arg-spread
lebab --replace ./ --transform arg-rest
lebab --replace ./ --transform for-each
find . -empty -type f -print -delete
find . -empty -type d -print -delete
git init
git add .
git commit -m "refactored a few hundred files to use es6 i.i. let, arrow functions, class syntax, rest and spread, and for-each"
git push 
git pull
npm start
npm serve
git add .
git init
git add .
git commit -m "archive"
git push 
git push -u origin master
find . \( -name "*SECURITY.txt" -o -name "*RELEASE.txt" -o  -name "*CHANGELOG.txt" -o -name "*LICENSE.txt" -o -name "*CONTRIBUTING.txt" -name "*HISTORY.md" -o -name "*LICENSE" -o -name "*SECURITY.md" -o -name "*RELEASE.md" -o  -name "*CHANGELOG.md" -o -name "*LICENSE.md" -o -name "*CODE_OF_CONDUCT.md" -o -name "*CONTRIBUTING.md" \) -exec rm -rf -- {} +
git init
git add .
for f in * ; do    mv "$f" "$f.html"; done
httrack --ext-depth=2 https://codetogo.io/all/https://codetogo.io/all/
wget -r https://codetogo.io/all/
docker pull dirigiblelabs/dirigible-all:latest
docker run --name dirigible --rm -p 8080:8080 -p 8081:8081 dirigiblelabs/dirigible-all:latest
for f in * ; do    mv "$f" "$f.css"; done
for f in * ; do    mv "$f" "$f.css"
for f in * ; do    mv "$f" "$f.html"; done
git clone  https://github.com/eclipse/dirigible.git
git init
git add .
gc
git commit -m "initial commit"
git push "not operational yet"
git remote add origin https://github.com/bgoonz/embedable-repl-and-integrated-code-space-playground.git
git push -u origin master
git init
npm init -y
npm install monaco-editor@0.23.0
npm i codejar
npm install spck-embed
npm install editor.md
npm audit fix
git remote add origin https://github.com/bgoonz/embedable-repl-and-integrated-code-space-playground.git
git init
git add .
git commit -m "keep it simple stupid"
git rm -rf .git
rm -rf .git
git init
git remote add origin https://github.com/bgoonz/embedable-repl-and-integrated-code-space-playground.git
git add .
git commit -m "initial commit"
git push -u origin master -f
find ./ -iname "*.html" -type f -exec sh -c 'pandoc "${0}" -o "${0%.html}.md"' {} \;
git init
git init
git add .
find ./ -iname "*.html" -type f -exec sh -c 'pandoc "${0}" -o "${0%.html}.md"' {} \;
git init 
rm -rf .git
sudo sed -i '/{#0815 \.graf \.graf--h3 \.graf-after--pre /d' ./*.md
sudo sed -i '/{#86b8 \.graf \.graf--h3 \.graf-after--figure  /d' ./*.md
sudo sed -i '/{#86b8 \.graf \.graf--h3 \.graf-after--figure/d' ./*.md
sudo sed -i '/{#16a2 \.graf \.graf--h3 \.graf-after--pre/d' ./*.md
sudo sed -i '/{#3dd8 \.graf \.graf--h3 \.graf-after--figure name=/d' ./*.md
sudo sed -i '/{.section .section .section--body .section--last/d' ./*.md
sudo sed -i '/Exported from \[Medium\]/d' ./*.md
sudo sed -i '/Canonical/d' ./*.md
sudo sed -i '/{\.p-canonical}/d' ./*.md
sudo sed -i '/{#3585 \.graf \.graf--mixtapeEmbed \.graf-after--p /d' ./*.md
find . -type f -exec sed -i '/Added by HTTrack/d' ./*.html {} \; 
git init
git push 
git init
git add .
git init
git add .
git push -u origin master
git add .
git commit -m "initial commit"
git push -u origin master
find . -empty -type f -print -delete
find . -empty -type d -print -delete
find . \( -name ".git" -o -name ".gitignore" -o -name ".gitmodules" -o -name ".gitattributes" \) -exec rm -rf -- {} +
find . \( -name ".git" -o -name ".gitignore" -o -name ".gitmodules" -o -name ".gitattributes" \) -exec rm -rf -- {} +
find . \( -name ".git" -o -name ".gitignore" -o -name ".gitmodules" -o -name ".gitattributes" \) -exec rm -rf -- {} +
pandoc -s *.docx > output.md
pandoc  *.docx > output.md
pandoc -s *.docx -t markdown -o example35.md
git init
find . -size +75M -a -exec rm -f {} \;
find . -empty -type f -print -delete
git init
git add .
git init
git add .
git commit -m "for storage"
git push -u origin master
pandoc -s *.docx -t markdown -o example35.md
find . -type f -exec pandoc -s *.docx -t markdown -o example35.md {} \;
find . -type f -exec 'pandoc -s *.docx -t markdown -o example35.md' {} \;
find . -empty -type f -print -delete
find . -name "*.tif" -type 'f' -size -30k -delete
tree > blueprint.md
find . -empty -type d -print -delete
git init
git remote add origin https://github.com/bgoonz/All-Undergrad-Archive.git
#!/bin/sh
if [ ! -f "github-top" ]; then   curl -L -O https://github.com/lauripiispanen/most-active-github-users-counter/releases/download/v1.21/github-top.cgo_disabled;   mv github-top.cgo_disabled github-top;   chmod u+x github-top; fi
OUTPUT_FILE_NAME=$(echo "$2" | sed 's/ /_/')
./github-top --token "$1" --preset "$2" --output yaml --file "$OUTPUT_FILE_NAME.yml"
echo "page: $OUTPUT_FILE_NAME.html\ntitle: $3" | cat - "$OUTPUT_FILE_NAME.yml" > "_data/locations/$OUTPUT_FILE_NAME.yml"
echo "---\ntype: location\nlocation: $OUTPUT_FILE_NAME\nmode: commits\n---" > "$OUTPUT_FILE_NAME.md"
echo "---\ntype: location\nlocation: $OUTPUT_FILE_NAME\nmode: all\n---" > "${OUTPUT_FILE_NAME}_private.md"
echo "---\ntype: location\nlocation: $OUTPUT_FILE_NAME\nmode: contributions\n---" > "${OUTPUT_FILE_NAME}_public.md"
#!/bin/sh
if [ -z "$1" ]; then     exit 1; fi
git clone git://github.com/hoxu/gitstats.git
#!/bin/sh
if [ -z "$1" ]; then     exit 1; fi
bash build.sh
#!/bin/sh
if [ -z "$1" ]; then     exit 1; fi
code .
cd ..
cd MY-WEB-DEV
cd temp
git clone https://github.com/microsoft/vcpkg
ll
pwd
cd
ll
cd repos
git clone git://github.com/hoxu/gitstats.git
ll
rm -r gitstats
ll
rm gitstats
help
man
man man
sudo apt update
sudo sed -i -e 's|disco|eoan|g' /etc/apt/sources.list
sudo apt update
sudo apt update --allow-unauthenticated
cd /etc/apt/sources.list
cd /etc/apt/
deb [trusted=yes] https://dl.bintray.com/stripe/stripe-cli-deb
code .
sudo apt update
wget http://ppa.launchpad.net/webupd8team/java/ubuntu
sudo wget http://ppa.launchpad.net/webupd8team/java/ubuntu
sudo apt update
sudo wget  https://dl.bintray.com/stripe/stripe-cli-deb stable
sudo apt update
echo "deb http://your.repo.domain/repository/ $(lsb_release -c -s) universe" | sudo tee /etc/apt/sources.list.d/your-repo-name.list
sudo apt -o Acquire::AllowInsecureRepositories=true -o Acquire::AllowDowngradeToInsecureRepositories=true update
## if the 'apt update' above fails it is likely due to previously
## having the GPG key and repository on the system, you can clean
## out the old lists with `sudo rm /var/lib/apt/lists/your.repo.domain*`
apt-get -o APT::Get::AllowUnauthenticated=true install repo-keyring-pkgname
## If you ever run `sudo apt-key del your-repos-keyID`
## you may have to `sudo apt remove --purge repo-keyring-pkgname`
## Update should run without the GPG warnings now that the key is installed
apt-get update
apt-get install http://ppa.launchpad.net/webupd8team/java/ubuntu focal Release
sudo apt-get install http://ppa.launchpad.net/webupd8team/java/ubuntu focal Release
gpg --keyserver pgpkeys.mit.edu --recv-key KEY_IN_ERROR
gpg -a --export KEY_IN_ERROR | sudo apt-key add -
sudo add-apt-repository --remove ppa:PPA_Name/ppa
sudo add-apt-repository --remove ppa:PPA_Name/launchpad.net/webupd8team/java/ubuntu
sudo add-apt-repository ppa:xorg-edgers/ppa 
sudo apt-get install libgl1-mesa-glx
sudo apt-get install libgl1-mesa-dri
sudo apt-get install libgl1-mesa-dev
apt list --installed
sudo add-apt-repository --remove ppa:PPA_Name/java-common
dpkg --get-selections | grep -v deinstall
sudo add-apt-repository --remove ppa:PPA_Name/ca-certificates-java
sudo add-apt-repository --remove ppa:PPA_Name/libatk-wrapper-java-jni
dpkg --get-selections > list.txt
sudo dpkg --get-selections > list.txt
cd
dpkg --get-selections > list.txt
dpkg --clear-selections
sudo dpkg --set-selections < list.txt
sudo dpkg --clear-selections
sudo dpkg --set-selections < list.txt
sudo apt-get autoremove
sudo apt-get dselect-upgrade
dpkg-query -W -f='${PackageSpec} ${Status}\n' | grep installed |  sort -u | cut -f1 -d \ > installed-pkgs
dpkg -l | grep ^ii | sed 's_  _\t_g' | cut -f 2 > installed-pkgs
sudo apt update
sudo apt update --force
su
sudo apt-clone clone path-to/apt-clone-state-ubuntu-$(lsb_release -sr)-$(date +%F).tar.gz
sudo apt-clone clone ./apt-clone-state-ubuntu-$(lsb_release -sr)-$(date +%F).tar.gz
find . -depth -exec rmdir {} \;  
apt-mark showmanual
ll
cd
cd ..
..
cd MY-WEB-DEV
cd temp
.\vcpkg\bootstrap-vcpkg.bat
npm install
sudo apt-key adv --keyserver pgp.mit.edu --recv-keys 5C808C2B65558117
find . -empty -type f -print -delete
find . -empty -type d -print -delete
lebab --replace ./ --transform obj-method
lebab --replace ./ --transform class
lebab --replace ./ --transform arrow
lebab --replace ./ --transform let
lebab --replace ./ --transform arg-spread
lebab --replace ./ --transform arg-rest
lebab --replace ./ --transform for-each
python3      pipenv install --dev -r dev-requirements.txt && pipenv install -r requirements.txt
sudo apt purge python2.x-minimal
# Remove python2
sudo apt purge -y python2.7-minimal
sudo ln -s /usr/bin/python3 /usr/bin/python
sudo apt install -y python3-pip
sudo ln -s /usr/bin/pip3 /usr/bin/pip
python --version
. /bin/activate
find . -name "*.zip" | while read filename; do unzip -o -d "`dirname "$filename"`" "$filename"; done;
find . -name "*.zip" -type f -print -delete
find . \( -name ".git" -o -name ".gitignore" -o -name ".gitmodules" -o -name ".gitattributes" \) -exec rm -rf -- {} +
find . \( -name "*SECURITY.txt" -o -name "*RELEASE.txt" -o  -name "*CHANGELOG.txt" -o -name "*LICENSE.txt" -o -name "*CONTRIBUTING.txt" -name "*HISTORY.md" -o -name "*LICENSE" -o -name "*SECURITY.md" -o -name "*RELEASE.md" -o  -name "*CHANGELOG.md" -o -name "*LICENSE.md" -o -name "*CODE_OF_CONDUCT.md" -o -name "*CONTRIBUTING.md" \) -exec rm -rf -- {} +
node filerTests.js 
lebab --replace ./ --transform obj-method
lebab --replace ./ --transform class
lebab --replace ./ --transform arrow
lebab --replace ./ --transform let
lebab --replace ./ --transform arg-spread
lebab --replace ./ --transform arg-rest
lebab --replace ./ --transform for-each
lebab --replace ./ --transform obj-method
lebab --replace ./ --transform class
lebab --replace ./ --transform arrow
lebab --replace ./ --transform let
lebab --replace ./ --transform arg-spread
lebab --replace ./ --transform arg-rest
lebab --replace ./ --transform for-each
lebab --replace ./ --transform obj-method
lebab --replace ./ --transform class
lebab --replace ./ --transform arrow
lebab --replace ./ --transform let
lebab --replace ./ --transform arg-spread
lebab --replace ./ --transform arg-rest
lebab --replace ./ --transform for-each
find . \( -name "*SECURITY.txt" -o -name "*RELEASE.txt" -o  -name "*CHANGELOG.txt" -o -name "*LICENSE.txt" -o -name "*CONTRIBUTING.txt" -name "*HISTORY.md" -o -name "*LICENSE" -o -name "*SECURITY.md" -o -name "*RELEASE.md" -o  -name "*CHANGELOG.md" -o -name "*LICENSE.md" -o -name "*CODE_OF_CONDUCT.md" -o -name "*CONTRIBUTING.md" \) -exec rm -rf -- {} +
#!/bin/sh
if [ ! -f "github-top" ]; then   curl -L -O https://github.com/lauripiispanen/most-active-github-users-counter/releases/download/v1.21/github-top.cgo_disabled;   mv github-top.cgo_disabled github-top;   chmod u+x github-top; fi
OUTPUT_FILE_NAME=$(echo "$2" | sed 's/ /_/')
./github-top --token "$1" --preset "$2" --output yaml --file "$OUTPUT_FILE_NAME.yml"
echo "page: $OUTPUT_FILE_NAME.html\ntitle: $3" | cat - "$OUTPUT_FILE_NAME.yml" > "_data/locations/$OUTPUT_FILE_NAME.yml"
echo "---\ntype: location\nlocation: $OUTPUT_FILE_NAME\nmode: commits\n---" > "$OUTPUT_FILE_NAME.md"
echo "---\ntype: location\nlocation: $OUTPUT_FILE_NAME\nmode: all\n---" > "${OUTPUT_FILE_NAME}_private.md"
echo "---\ntype: location\nlocation: $OUTPUT_FILE_NAME\nmode: contributions\n---" > "${OUTPUT_FILE_NAME}_public.md"
lebab --replace ./ --transform obj-method
lebab --replace ./ --transform class
lebab --replace ./ --transform arrow
lebab --replace ./ --transform let
lebab --replace ./ --transform arg-spread
lebab --replace ./ --transform arg-rest
lebab --replace ./ --transform for-each
find . -name "*.zip" | while read filename; do unzip -o -d "`dirname "$filename"`" "$filename"; done;
find . -name "*.zip" -type f -print -delete
lebab --replace ./ --transform obj-method
lebab --replace ./ --transform class
lebab --replace ./ --transform arrow
lebab --replace ./ --transform let
lebab --replace ./ --transform arg-spread
lebab --replace ./ --transform arg-rest
lebab --replace ./ --transform for-each
lebab --replace ./ --transform obj-method
lebab --replace ./ --transform class
lebab --replace ./ --transform arrow
lebab --replace ./ --transform let
lebab --replace ./ --transform arg-spread
lebab --replace ./ --transform arg-rest
lebab --replace ./ --transform for-each
npm install locate-path
npm start
.\vcpkg\bootstrap-vcpkg.bat
./vcpkg/bootstrap-vcpkg.sh
./bootstrap-vcpkg.sh
cmake -B [build directory] -S . -DCMAKE_TOOLCHAIN_FILE=[path to vcpkg]/scripts/buildsystems/vcpkg.cmake
sudo apt install cmake
sudo apt-get install build-essential tar curl zip unzip
git clone https://github.com/microsoft/vcpkg
npm i --save lodash
git init
git add .
babel --plugins transform-ternary-to-if-else replace.js
sudo apt install babel
npm install babel
lebab --replace ./ --transform obj-method
lebab --replace ./ --transform obj-method
lebab --replace ./ --transform class
lebab --replace ./ --transform arrow
lebab --replace ./ --transform let
lebab --replace ./ --transform arg-spread
lebab --replace ./ --transform arg-rest
lebab --replace ./ --transform for-each
lebab --replace ./ --transform for-of
lebab --replace ./ --transform commonjs 
lebab --replace ./ --transform exponent
lebab --replace ./ --transform multi-var
lebab --replace ./ --transform template
lebab --replace ./ --transform default-param
lebab --replace ./ --transform  destruct-param 
lebab --replace ./ --transform includes
lebab --replace ./ --transform let
npm init
npm install loadash
npm i --save lodash
lebab --replace ./ --transform obj-method
lebab --replace ./ --transform class
lebab --replace ./ --transform arrow
lebab --replace ./ --transform let
lebab --replace ./ --transform arg-spread
lebab --replace ./ --transform arg-rest
lebab --replace ./ --transform for-each
node election.js
npm install underscore
npm i underscore
cat README.md* | codedown javascript > code.js
cat README.md | codedown javascript | node >code.js
cat README.md | codedown javascript | node 
cat README.md | codedown javascript 
codedown javascript README.md > out.js
cat README.md* | codedown javascript > code.js
lebab --replace ./ --transform obj-method
lebab --replace ./ --transform class
lebab --replace ./ --transform arrow
lebab --replace ./ --transform let
lebab --replace ./ --transform arg-spread
lebab --replace ./ --transform arg-rest
lebab --replace ./ --transform for-each
lebab --replace ./ --transform for-of
lebab --replace ./ --transform commonjs 
lebab --replace ./ --transform exponent
lebab --replace ./ --transform multi-var
lebab --replace ./ --transform template
lebab --replace ./ --transform default-param
lebab --replace ./ --transform  destruct-param 
lebab --replace ./ --transform includes
lebab --replace ./ --transform obj-method
lebab --replace ./ --transform class
lebab --replace ./ --transform arrow
lebab --replace ./ --transform let
lebab --replace ./ --transform arg-spread
lebab --replace ./ --transform arg-rest
lebab --replace ./ --transform for-each
lebab --replace ./ --transform for-of
lebab --replace ./ --transform commonjs 
lebab --replace ./ --transform exponent
lebab --replace ./ --transform multi-var
lebab --replace ./ --transform template
lebab --replace ./ --transform default-param
lebab --replace ./ --transform  destruct-param 
lebab --replace ./ --transform includes
node election.js
lebab --replace ./ --transform obj-method
lebab --replace ./ --transform class
lebab --replace ./ --transform arrow
lebab --replace ./ --transform let
lebab --replace ./ --transform arg-spread
lebab --replace ./ --transform arg-rest
lebab --replace ./ --transform for-each
lebab --replace ./ --transform obj-method
lebab --replace ./ --transform class
lebab --replace ./ --transform arrow
lebab --replace ./ --transform let
lebab --replace ./ --transform arg-spread
lebab --replace ./ --transform arg-rest
lebab --replace ./ --transform for-each
lebab --replace ./ --transform for-of
lebab --replace ./ --transform commonjs 
lebab --replace ./ --transform exponent
lebab --replace ./ --transform multi-var
lebab --replace ./ --transform template
lebab --replace ./ --transform default-param
lebab --replace ./ --transform  destruct-param 
lebab --replace ./ --transform includes
npm i babel-plugin-transform-ternary-to-if-else
lebab --replace ./ --transform obj-method
lebab --replace ./ --transform class
lebab --replace ./ --transform arrow
lebab --replace ./ --transform let
lebab --replace ./ --transform arg-spread
lebab --replace ./ --transform arg-rest
lebab --replace ./ --transform for-each
lebab --replace ./ --transform for-of
lebab --replace ./ --transform commonjs 
lebab --replace ./ --transform exponent
lebab --replace ./ --transform multi-var
lebab --replace ./ --transform template
lebab --replace ./ --transform default-param
lebab --replace ./ --transform  destruct-param 
lebab --replace ./ --transform includes
lebab --replace ./ --transform obj-method
lebab --replace ./ --transform class
lebab --replace ./ --transform arrow
lebab --replace ./ --transform let
lebab --replace ./ --transform arg-spread
lebab --replace ./ --transform arg-rest
lebab --replace ./ --transform for-each
lebab --replace ./ --transform for-of
lebab --replace ./ --transform commonjs 
lebab --replace ./ --transform exponent
lebab --replace ./ --transform multi-var
lebab --replace ./ --transform template
lebab --replace ./ --transform default-param
lebab --replace ./ --transform  destruct-param 
lebab --replace ./ --transform includes
git init
git add .
git commit -m "initial commit"
git remote add origin https://github.com/bgoonz/loadash-es6-refactor.git
git push -u origin master
git add .
git commit -m "initial commit"
git push -u origin master
npm init 
git init
git add .
git commit -m "package.json"
git push 
npm login
npm publish
node Runkit-ds-algo-dynamic.js
lebab --replace ./ --transform obj-method
lebab --replace ./ --transform class
lebab --replace ./ --transform arrow
lebab --replace ./ --transform let
lebab --replace ./ --transform arg-spread
lebab --replace ./ --transform arg-rest
lebab --replace ./ --transform for-each
python3 get-gists.py bgoonz
find . \( -name ".git" -o -name ".gitignore" -o -name ".gitmodules" -o -name ".gitattributes" \) -exec rm -rf -- {} +
git init
git add .
git commit -m "coderpad"
git push 
git pul
git pull
git push 
sed -n '/^```/,/^```/ p' < README.md
sed -n '/^```/,/^```/ p' < README.md >
sed -n '/^```/,/^```/ p' < README.md > README-code.js
find . -name "*.\.js\.download" -exec rename 's/\.js\.download$/.js/' '{}' +
rename 's/\.js\.download$/.js/' *.js\.download  
lebab --replace ./ --transform obj-method
lebab --replace ./ --transform class
lebab --replace ./ --transform arrow
lebab --replace ./ --transform let
lebab --replace ./ --transform arg-spread
lebab --replace ./ --transform arg-rest
lebab --replace ./ --transform for-each
lebab --replace ./ --transform for-of
lebab --replace ./ --transform commonjs 
lebab --replace ./ --transform exponent
lebab --replace ./ --transform multi-var
lebab --replace ./ --transform template
lebab --replace ./ --transform default-param
lebab --replace ./ --transform  destruct-param 
lebab --replace ./ --transform includes
lebab --replace ./ --transform let
lebab --replace ./ --transform obj-method
lebab --replace ./ --transform class
lebab --replace ./ --transform arrow
lebab --replace ./ --transform let
lebab --replace ./ --transform arg-spread
lebab --replace ./ --transform arg-rest
lebab --replace ./ --transform for-each
lebab --replace ./ --transform for-of
lebab --replace ./ --transform commonjs 
lebab --replace ./ --transform exponent
lebab --replace ./ --transform multi-var
lebab --replace ./ --transform template
lebab --replace ./ --transform default-param
lebab --replace ./ --transform  destruct-param 
lebab --replace ./ --transform includes
git init
git add .
git commit -m "update and cleanup"
git push 
git pull
git pull -s recursive -X theirs https://github.com/bgoonz/Medium_Articles.git
git pull -f
git pull -s recursive -X theirs https://github.com/bgoonz/Medium_Articles.git
git init
git add .
git pull
git commit -m "merge"
git pull
git push 
git init
git add .
git commit -m "merge"
git push 
git add .
git commit -m "merge"
git push 
git add .
git commit -m "merge"
git push 
#!/bin/sh
# find ./ | grep -i "\.*$" >files
find ./ | sed -E -e 's/([^ ]+[ ]+){8}//' | grep -i "\.*$">files
listing="files"
out=""
html="index.html"
out="basename $out.html"
html="index.html"
cmd() {   echo '  <!DOCTYPE html>';   echo '<html>';   echo '<head>'   echo '  <meta http-equiv="Content-Type" content="text/html">'   echo '  <meta name="Author" content="Bryan Guner">';   echo '<link rel="stylesheet" href="./assets/prism.css">';   echo ' <link rel="stylesheet" href="./assets/style.css">';   echo ' <script async defer src="./assets/prism.js"></script>'   echo "  <title> directory </title>"   echo "";   echo '<style>' echo '    a {'; echo '      color: black;'; echo '    }'; echo ''; echo '    li {'; echo '      border: 1px solid black !important;'; echo '      font-size: 20px;'; echo '      letter-spacing: 0px;'; echo '      font-weight: 700;'; echo '      line-height: 16px;'; echo '      text-decoration: none !important;'; echo '      text-transform: uppercase;'; echo '      background: #194ccdaf !important;'; echo '      color: black !important;'; echo '      border: none;'; echo '      cursor: pointer;'; echo '      justify-content: center;'; echo '      padding: 30px 60px;'; echo '      height: 48px;'; echo '      text-align: center;'; echo '      white-space: normal;'; echo '      border-radius: 10px;'; echo '      min-width: 45em;'; echo '      padding: 1.2em 1em 0;'; echo '      box-shadow: 0 0 5px;'; echo '      margin: 1em;'; echo '      display: grid;'; echo '      -webkit-border-radius: 10px;'; echo '      -moz-border-radius: 10px;'; echo '      -ms-border-radius: 10px;'; echo '      -o-border-radius: 10px;'; echo '    }'; echo '  </style>';   echo '</head>'   echo '<body>'   echo ""   echo ""   echo ""   echo "<ul>"   awk '{print "<li><a href=\""$1"\">",$1,"&nbsp;</a></li>"}' $listing   echo ""   echo "</ul>"   echo "</body>"   echo "</html>" }
cmd $listing --sort=extension >>$html
sudo sed -i '/\.html/!d' ./index.html
rename 's/\.js\.download$/.js/' *.js\.download  
#!/bin/sh
# find ./ | grep -i "\.*$" >files
find ./ | sed -E -e 's/([^ ]+[ ]+){8}//' | grep -i "\.*$">files
listing="files"
out=""
html="index.html"
out="basename $out.html"
html="index.html"
cmd() {   echo '  <!DOCTYPE html>';   echo '<html>';   echo '<head>'   echo '  <meta http-equiv="Content-Type" content="text/html">'   echo '  <meta name="Author" content="Bryan Guner">';   echo '<link rel="stylesheet" href="./assets/prism.css">';   echo ' <link rel="stylesheet" href="./assets/style.css">';   echo ' <script async defer src="./assets/prism.js"></script>'   echo "  <title> directory </title>"   echo "";   echo '<style>' echo '    a {'; echo '      color: black;'; echo '    }'; echo ''; echo '    li {'; echo '      border: 1px solid black !important;'; echo '      font-size: 20px;'; echo '      letter-spacing: 0px;'; echo '      font-weight: 700;'; echo '      line-height: 16px;'; echo '      text-decoration: none !important;'; echo '      text-transform: uppercase;'; echo '      background: #194ccdaf !important;'; echo '      color: black !important;'; echo '      border: none;'; echo '      cursor: pointer;'; echo '      justify-content: center;'; echo '      padding: 30px 60px;'; echo '      height: 48px;'; echo '      text-align: center;'; echo '      white-space: normal;'; echo '      border-radius: 10px;'; echo '      min-width: 45em;'; echo '      padding: 1.2em 1em 0;'; echo '      box-shadow: 0 0 5px;'; echo '      margin: 1em;'; echo '      display: grid;'; echo '      -webkit-border-radius: 10px;'; echo '      -moz-border-radius: 10px;'; echo '      -ms-border-radius: 10px;'; echo '      -o-border-radius: 10px;'; echo '    }'; echo '  </style>';   echo '</head>'   echo '<body>'   echo ""   echo ""   echo ""   echo "<ul>"   awk '{print "<li><a href=\""$1"\">",$1,"&nbsp;</a></li>"}' $listing   echo ""   echo "</ul>"   echo "</body>"   echo "</html>" }
cmd $listing --sort=extension >>$html
lebab --replace ./ --transform obj-method
git init
git add .
git init
git add .
git commit -m "folder structure
"
"
git init
git add .
git commit -m "formatted html"
git push 
tree -d >README.md
tree -d -L 5 >README.md
tree  -L 5 >README.md
git add .
git commit -m "readme"
git push 
git add .
git commit -m "readme"
git push 
git add .
git commit -m "readme"
git push 
find ./ -mindepth 2 -type f -exec mv -t ./ --backup=t '{}' +
find ./ -iname "*.md" -type f -exec sh -c 'pandoc "${0}" -o "${0%.md}.html"' {} \;
for f in *.html; do printf '%s\n' 0a '<!DOCTYPE html>
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
echo "</body></html>" | tee -a *.html
#!/bin/sh
# find ./ | grep -i "\.*$" >files
find ./ | sed -E -e 's/([^ ]+[ ]+){8}//' | grep -i "\.*$">files
listing="files"
out=""
html="index.html"
out="basename $out.html"
html="index.html"
cmd() {   echo '  <!DOCTYPE html>';   echo '<html>';   echo '<head>'   echo '  <meta http-equiv="Content-Type" content="text/html">'   echo '  <meta name="Author" content="Bryan Guner">';   echo '<link rel="stylesheet" href="./assets/prism.css">';   echo ' <link rel="stylesheet" href="./assets/style.css">';   echo ' <script async defer src="./assets/prism.js"></script>'   echo "  <title> directory </title>"   echo "";   echo '<style>' echo '    a {'; echo '      color: black;'; echo '    }'; echo ''; echo '    li {'; echo '      border: 1px solid black !important;'; echo '      font-size: 20px;'; echo '      letter-spacing: 0px;'; echo '      font-weight: 700;'; echo '      line-height: 16px;'; echo '      text-decoration: none !important;'; echo '      text-transform: uppercase;'; echo '      background: #194ccdaf !important;'; echo '      color: black !important;'; echo '      border: none;'; echo '      cursor: pointer;'; echo '      justify-content: center;'; echo '      padding: 30px 60px;'; echo '      height: 48px;'; echo '      text-align: center;'; echo '      white-space: normal;'; echo '      border-radius: 10px;'; echo '      min-width: 45em;'; echo '      padding: 1.2em 1em 0;'; echo '      box-shadow: 0 0 5px;'; echo '      margin: 1em;'; echo '      display: grid;'; echo '      -webkit-border-radius: 10px;'; echo '      -moz-border-radius: 10px;'; echo '      -ms-border-radius: 10px;'; echo '      -o-border-radius: 10px;'; echo '    }'; echo '  </style>';   echo '</head>'   echo '<body>'   echo ""   echo ""   echo ""   echo "<ul>"   awk '{print "<li><a href=\""$1"\">",$1,"&nbsp;</a></li>"}' $listing   echo ""   echo "</ul>"   echo "</body>"   echo "</html>" }
cmd $listing --sort=extension >>$html
sudo sed -i '/right\.html/d' ./index.html
find . -empty -type f -print -delete
find . -empty -type d -print -delete
find . -empty -type f -print -delete
find . -empty -type d -print -delete
find . -empty -type f -print -delete
find . -empty -type d -print -delete
for f in * ; do    mv "$f" "$f.md"; done
for f in * ; do    mv "$f" "$f.md"; done
find . -type f -exec mv '{}' '{}'.md \;
find . -empty -type f -print -delete
find . -empty -type d -print -delete
find ./ -iname "*.md" -type f -exec sh -c 'pandoc "${0}" -o "${0%.md}.html"' {} \;
find . -type f -exec mv '{}' '{}'.md \;
find . -empty -type f -print -delete
find . -empty -type d -print -delete
httrack https://apply.lambdaschool.com/courses/web/
httrack https://en.wikipedia.org/wiki/List_of_lists_of_lists
git clone "https://gerrit.wikimedia.org/r/labs/tools/VideoCutTool"   # clone front-end
cd ./VideoCutTool                                                    # move to front-end directory
npm install                                                          # install node dependencies
google-chrome http://localhost:3000         
git init
git add .
git commmit -m "initial commit"
git commit -m "initial commit"
git remote add origin https://github.com/bgoonz/BackgroundImages.git
git push -u origin master
npm i docsify-cli -g
sudo apt update
sudo apt upgrade
find . \( -name ".git" -o -name ".gitignore" -o -name ".gitmodules" -o -name ".gitattributes" \) -exec rm -rf -- {} +
find . \( -name "*SECURITY.txt" -o -name "*RELEASE.txt" -o  -name "*CHANGELOG.txt" -o -name "*LICENSE.txt" -o -name "*CONTRIBUTING.txt" -name "*HISTORY.md" -o -name "*LICENSE" -o -name "*SECURITY.md" -o -name "*RELEASE.md" -o  -name "*CHANGELOG.md" -o -name "*LICENSE.md" -o -name "*CODE_OF_CONDUCT.md" -o -name "*CONTRIBUTING.md" \) -exec rm -rf -- {} +
find . -name "*.zip" | while read filename; do unzip -o -d "`dirname "$filename"`" "$filename"; done;
find . -name "*.zip" -type f -print -delete
find . -size +75M -a -exec rm -f {} \;
git init
git add .
git
mke
make
git init
git remote add origin https://github.com/bgoonz/Lambda-Repo-Resources.git
git add .
git init
git add .
git init
git add .
git commit -m "initial commit"
git push -u origin master
npm install
npm i -g jest-cli
git remote prune origin
git gc
git fsck --full
git reflog expire --expire=0 --all
git update-ref -d 0d998c99b6d01e8aabca72b1934802acf90b8fc9
git gc --aggressive
git remote update --prune
git init
git add .
git commit -m "I love github but this repo is causing hair loss"
git push -u origin master
git pull
git init
git add .
git commit -m "ughhhhhhhhhh"
git pull
git push -u origin master -f
git rm --cached 2-content/awesome-resources/Cumulative-Resource-List-master
git init
git add .
git commit -m "fixing submodule deployment bug"
git init
git add .
git commit -m "please deploy"
git add .
git commit -m "deploy"
git init
git add .
git commit -m "please pease just work"
git push 
httrack https://flounder-flower-xpaw.squarespace.com/
git clone  https://github.com/bgoonz/ecommerce-interactive.git
wget --wait=2 --level=inf --limit-rate=20K --recursive --page-requisites --user-agent=Mozilla --no-parent --convert-links --adjust-extension --no-clobber -e robots=off https://flounder-flower-xpaw.squarespace.com/config/settings/domains/flounder-flower-xpaw.squarespace.com
find . -name "*.zip" | while read filename; do unzip -o -d "`dirname "$filename"`" "$filename"; done;
cd ..
find . -name "*.zip" | while read filename; do unzip -o -d "`dirname "$filename"`" "$filename"; done;
git init
git add .
git init
git add .
git pull
git add .
git commit -m "update"
git push -u origin master
git remote remove origin
ll
cd ecommerce-interactive
git init
git add .
git commit -m "content update"
git push -u origin master
git init
git add .
git commit -m "not initial commit"
git push 
sudo sed -i '/This is Squarespace/d' ./*.html
sudo sed -i '/\<\!\-\- flounder\-flower\-xpaw \-\-\>/d' ./*.html
sudo sed -i '/flounder\-flower\-xpaw/d' ./*.html
sudo sed -i '/Added by HTTrack/d' ./*.html
lebab --replace ./ --transform obj-method
lebab --replace ./ --transform class
lebab --replace ./ --transform arrow
lebab --replace ./ --transform let
lebab --replace ./ --transform arg-spread
lebab --replace ./ --transform arg-rest
lebab --replace ./ --transform for-each
lebab --replace ./ --transform for-of
lebab --replace ./ --transform commonjs 
lebab --replace ./ --transform exponent
lebab --replace ./ --transform multi-var
lebab --replace ./ --transform template
lebab --replace ./ --transform default-param
lebab --replace ./ --transform  destruct-param 
lebab --replace ./ --transform includes
pandoc *.html >/ALL.html
sudo pandoc *.html >/ALL.html
$ cat * > merged-file
$ cat *html > merged-file.html
cat *html > merged-file.html
cat *.html > merged-file.html
git init
git init
git add .
git commit -m "initial commit"
git push
git init
git add .
git commit -m "format"
npm install -g create-react-app
create-react-app hello-world
cd hello-world
npm run build
npm install netlify-cli -g
git init
git add .
git commit -m "react on netlify"
git remote add origin https://github.com/bgoonz/react-netlify-deploy.git
git push -u origin master
lebab --replace ./ --transform obj-method
lebab --replace ./ --transform class
lebab --replace ./ --transform arrow
lebab --replace ./ --transform let
lebab --replace ./ --transform arg-spread
lebab --replace ./ --transform arg-rest
lebab --replace ./ --transform for-each
lebab --replace ./ --transform for-of
lebab --replace ./ --transform commonjs 
lebab --replace ./ --transform exponent
lebab --replace ./ --transform multi-var
lebab --replace ./ --transform template
lebab --replace ./ --transform default-param
lebab --replace ./ --transform  destruct-param 
lebab --replace ./ --transform includes
npm i -g eslint
wget -r https://thepiratebay.org/search.php?q=user:tuts756
httrack https://thepiratebay.org/search.php?q=user:tuts756
sudo httrack --ext-depth=4 https://thepiratebay.org/search.php?q=user:tuts756
sudo httrack --ext-depth=4 https://product.directredirection.com/smartprice/indexDDD.php?p=919824&v=399#smartpricepower@gmail.comlhjonckbjkggopmliabjfmdfhcoinhgc
git init
git add .
git init
cd sandbox
lebab --replace ./ --transform obj-method
lebab --replace ./ --transform class
lebab --replace ./ --transform arrow
lebab --replace ./ --transform let
lebab --replace ./ --transform arg-spread
lebab --replace ./ --transform arg-rest
lebab --replace ./ --transform for-each
lebab --replace ./ --transform for-of
lebab --replace ./ --transform commonjs 
lebab --replace ./ --transform exponent
lebab --replace ./ --transform multi-var
lebab --replace ./ --transform template
lebab --replace ./ --transform default-param
lebab --replace ./ --transform  destruct-param 
lebab --replace ./ --transform includes
lebab --replace ./ --transform obj-method
lebab --replace ./ --transform class
lebab --replace ./ --transform arrow
lebab --replace ./ --transform obj-method
lebab --replace ./ --transform class
lebab --replace ./ --transform arrow
lebab --replace ./ --transform let
lebab --replace ./ --transform arg-spread
lebab --replace ./ --transform arg-rest
lebab --replace ./ --transform for-each
lebab --replace ./ --transform for-of
lebab --replace ./ --transform commonjs 
lebab --replace ./ --transform exponent
lebab --replace ./ --transform multi-var
lebab --replace ./ --transform template
lebab --replace ./ --transform default-param
lebab --replace ./ --transform  destruct-param 
lebab --replace ./ --transform includeslebab --replace ./ --transform obj-method
lebab --replace ./ --transform class
lebab --replace ./ --transform arrow
lebab --replace ./ --transform let
lebab --replace ./ --transform arg-spread
lebab --replace ./ --transform arg-rest
lebab --replace ./ --transform for-each
lebab --replace ./ --transform for-of
lebab --replace ./ --transform commonjs 
lebab --replace ./ --transform exponent
lebab --replace ./ --transform multi-var
lebab --replace ./ --transform template
lebab --replace ./ --transform default-param
lebab --replace ./ --transform  destruct-param 
lebab --replace ./ --transform includes
lebab --replace ./ --transform obj-method
lebab --replace ./ --transform class
lebab --replace ./ --transform arrow
lebab --replace ./ --transform let
lebab --replace ./ --transform arg-spread
lebab --replace ./ --transform arg-rest
lebab --replace ./ --transform for-each
lebab --replace ./ --transform for-of
lebab --replace ./ --transform commonjs 
lebab --replace ./ --transform exponent
lebab --replace ./ --transform multi-var
lebab --replace ./ --transform template
lebab --replace ./ --transform default-param
lebab --replace ./ --transform  destruct-param 
lebab --replace ./ --transform includeslebab --replace ./ --transform obj-method
lebab --replace ./ --transform class
lebab --replace ./ --transform arrow
lebab --replace ./ --transform let
lebab --replace ./ --transform arg-spread
lebab --replace ./ --transform arg-rest
lebab --replace ./ --transform for-each
lebab --replace ./ --transform for-of
lebab --replace ./ --transform commonjs 
lebab --replace ./ --transform exponent
lebab --replace ./ --transform multi-var
lebab --replace ./ --transform template
lebab --replace ./ --transform default-param
lebab --replace ./ --transform  destruct-param 
lebab --replace ./ --transform includes
eeslint file1.js file2.js
eslint file1.js file2.js
eslint index.js
eslint parse.js
npminstall eslint
sudo apt install eslint
unzip
find ./ -type f -name *.tar.gz -exec tar -xf {} \;
find . \( -name ".git" -o -name ".gitignore" -o -name ".gitmodules" -o -name ".gitattributes" \) -exec rm -rf -- {} +
cd ..
git init
git add .
git commit -m "right folder"
git push 
git pull
git push 
python3 get-gists.py bgoonz
find -name "* *" -type d | rename 's/ /_/g'    # do the directories first
find -name "* *" -type f | rename 's/ /_/g'
pandoc *.html>  ./OUTPUT.html
pandoc *.html>  ./OUTPUT.html
git init
pandoc *.html>  ./OUTPUT.html
git init
git add .
git pull
git checkoout
checkout
git checkout
git init
git add .
cd ..
cd Medium_Articles/
ll
git init
git add .
git git 
git commit -m "initial commit"
git push 
code .
wget --wait=2 --level=inf --limit-rate=20K --recursive --page-requisites --user-agent=Mozilla --no-parent --convert-links --adjust-extension --no-clobber -e robots=off https://soybean-tulip-em56.squarespace.com/
git init
wget --wait=2 --level=inf --limit-rate=20K --recursive --page-requisites --user-agent=Mozilla --no-parent --convert-links --adjust-extension --no-clobber -e robots=off https://bryans-spectacular-project-fae067.webflow.io/ 
wget --wait=2 --level=inf --limit-rate=20K --recursive --page-requisites --user-agent=Mozilla --no-parent --convert-links --adjust-extension --no-clobber -e robots=off http://creado-template.webflow.io/v1/works
wget --wait=2 --level=inf --limit-rate=20K --recursive --page-requisites --user-agent=Mozilla --no-parent --convert-links --adjust-extension --no-clobber -e robots=off https://soybean-tulip-em56.squarespace.com/
httrack https://bryans-spectacular-project-fae067.webflow.io/
httrack https://soybean-tulip-em56.squarespace.com/
httrack http://creado-template.webflow.io/v1/works
find -name "* *" -type d | rename 's/ /_/g'    # do the directories first
find -name "* *" -type f | rename 's/ /_/g'
git push 
git push  -u origin master
git push  -u origin master -f
git pull
find . -type f -exec rename 's/MASTER//g' {} +
find . -type f -exec rename 's/master//g' {} +
find . -type f -exec rename 's/MASTER//g' {} +
awk '{gsub(" ","",$0); print $0;}' *
awk '{gsub(regex, substitution_text, $field#); print $0;}' *
find -name "* *" -type d | rename 's/ /_/g'    # do the directories first
find -name "* *" -type f | rename 's/ /_/g'
find -name "* *" -type d | rename 's/ /_/g'    # do the directories first
find -name "* *" -type f | rename 's/ /_/g'
git add .
wget -r https://soybean-tulip-em56.squarespace.com/config/
find . -name "*.zip" | while read filename; do unzip -o -d "`dirname "$filename"`" "$filename"; done;
find . -name "*.zip" | while read filename; do unzip -o -d "`dirname "$filename"`" "$filename"; done;
find . ! -name '.*' ! -type d -exec rm -- {} +
find FOLDER -type f -delete
find . ! -type d -exec rm '{}' \;
npm install -g npm
git init
git add .
httrack --ext-depth=1 https://flounder-flower-xpaw.squarespace.com/
httrack --ext-depth=2 https://flounder-flower-xpaw.squarespace.com/
find . -name "*.zip" | while read filename; do unzip -o -d "`dirname "$filename"`" "$filename"; done;
find . -name "*.zip" -type f -print -delete
git init
git add .
git init
git add .
git commit -m "cleanup"
git push 
lebab --replace ./ --transform obj-method
lebab --replace ./ --transform class
lebab --replace ./ --transform arrow
lebab --replace ./ --transform let
lebab --replace ./ --transform arg-spread
lebab --replace ./ --transform arg-rest
lebab --replace ./ --transform for-each
lebab --replace ./ --transform for-of
lebab --replace ./ --transform commonjs 
lebab --replace ./ --transform exponent
lebab --replace ./ --transform multi-var
lebab --replace ./ --transform template
lebab --replace ./ --transform default-param
lebab --replace ./ --transform  destruct-param 
lebab --replace ./ --transform includes
find . -empty -type f -print -delete
find . -empty -type d -print -delete
find . -type f -exec sed -i '/Clone the project from/d' ./*.html {} \; 
git init
lebab --replace ./ --transform obj-method
lebab --replace ./ --transform class
lebab --replace ./ --transform arrow
lebab --replace ./ --transform let
lebab --replace ./ --transform arg-spread
lebab --replace ./ --transform arg-rest
lebab --replace ./ --transform for-each
lebab --replace ./ --transform for-of
lebab --replace ./ --transform commonjs 
lebab --replace ./ --transform exponent
lebab --replace ./ --transform multi-var
lebab --replace ./ --transform template
lebab --replace ./ --transform default-param
lebab --replace ./ --transform  destruct-param 
lebab --replace ./ --transform includes
find . \( -name "*SECURITY.txt" -o -name "*RELEASE.txt" -o  -name "*CHANGELOG.txt" -o -name "*LICENSE.txt" -o -name "*CONTRIBUTING.txt" -name "*HISTORY.md" -o -name "*LICENSE" -o -name "*SECURITY.md" -o -name "*RELEASE.md" -o  -name "*CHANGELOG.md" -o -name "*LICENSE.md" -o -name "*CODE_OF_CONDUCT.md" -o -name "*CONTRIBUTING.md" \) -exec rm -rf -- {} +
lebab --replace ./ --transform obj-method
lebab --replace ./ --transform class
lebab --replace ./ --transform arrow
lebab --replace ./ --transform let
lebab --replace ./ --transform arg-spread
lebab --replace ./ --transform arg-rest
lebab --replace ./ --transform for-each
lebab --replace ./ --transform for-of
lebab --replace ./ --transform commonjs 
lebab --replace ./ --transform exponent
lebab --replace ./ --transform multi-var
lebab --replace ./ --transform template
lebab --replace ./ --transform default-param
lebab --replace ./ --transform  destruct-param 
lebab --replace ./ --transform includes
git init 
git remote add origin https://github.com/bgoonz/norwex-split-testing.git
git add .
git commit -m "initial commit"
git push -u origin master
wget -r --no-parent https://soybean-tulip-em56.squarespace.com/
wget -4 https://soybean-tulip-em56.squarespace.com/
wget -r https://soybean-tulip-em56.squarespace.com/
wget --user=bryan.guner.dev@gmail.com -password=R6A3J5JX57M3O5HRAYNGKJ3Z2R2UUVIG -r https://soybean-tulip-em56.squarespace.com/
curl https://soybean-tulip-em56.squarespace.com/
wget -r -np -k https://soybean-tulip-em56.squarespace.com/
for file in $(curl -s https://soybean-tulip-em56.squarespace.com/ |
                  grep href |
                  sed 's/.*href="//' |
                  sed 's/".*//' |
                  grep '^[a-zA-Z].*'); do     curl -s -O https://soybean-tulip-em56.squarespace.com//$file; done
wget      --recursive      --no-clobber      --page-requisites      --html-extension      --convert-links      --restrict-file-names=windows      --domains website.org      --no-parent \ 
wget      --recursive      --no-clobber      --page-requisites      --html-extension      --convert-links      --restrict-file-names=windows      --domains website.org      --no-parent       https://soybean-tulip-em56.squarespace.com/config/pages
wget      --recursive      https://soybean-tulip-em56.squarespace.com/config/pages
wget -r -A.html https://soybean-tulip-em56.squarespace.com/config/pages
wget --wait=2 --level=inf --limit-rate=20K --recursive --page-requisites --user-agent=Mozilla --no-parent --convert-links --adjust-extension --no-clobber -e robots=off https://soybean-tulip-em56.squarespace.com/home
rm -r
rm -rd
rm -rf
cd ..
rm -rf
explorer.exe .
npm install -g modernizr
lebab --replace ./ --transform obj-method
lebab --replace ./ --transform class
lebab --replace ./ --transform arrow
lebab --replace ./ --transform let
lebab --replace ./ --transform arg-spread
lebab --replace ./ --transform arg-rest
lebab --replace ./ --transform for-each
lebab --replace ./ --transform for-of
lebab --replace ./ --transform commonjs 
lebab --replace ./ --transform exponent
lebab --replace ./ --transform multi-var
lebab --replace ./ --transform template
lebab --replace ./ --transform default-param
lebab --replace ./ --transform  destruct-param 
lebab --replace ./ --transform includes
find . -empty -type f -print -delete
find . -empty -type d -print -delete
find . \( -name ".git" -o -name ".gitignore" -o -name ".gitmodules" -o -name ".gitattributes" \) -exec rm -rf -- {} +
find . \( -name "*SECURITY.txt" -o -name "*RELEASE.txt" -o  -name "*CHANGELOG.txt" -o -name "*LICENSE.txt" -o -name "*CONTRIBUTING.txt" -name "*HISTORY.md" -o -name "*LICENSE" -o -name "*SECURITY.md" -o -name "*RELEASE.md" -o  -name "*CHANGELOG.md" -o -name "*LICENSE.md" -o -name "*CODE_OF_CONDUCT.md" -o -name "*CONTRIBUTING.md" \) -exec rm -rf -- {} +
python3 get-gists.py Colt
rm -rf *
find . \( -name ".git" -o -name ".gitignore" -o -name ".gitmodules" -o -name ".gitattributes" \) -exec rm -rf -- {} +
find . \( -name "*SECURITY.txt" -o -name "*RELEASE.txt" -o  -name "*CHANGELOG.txt" -o -name "*LICENSE.txt" -o -name "*CONTRIBUTING.txt" -name "*HISTORY.md" -o -name "*LICENSE" -o -name "*SECURITY.md" -o -name "*RELEASE.md" -o  -name "*CHANGELOG.md" -o -name "*LICENSE.md" -o -name "*CODE_OF_CONDUCT.md" -o -name "*CONTRIBUTING.md" \) -exec rm -rf -- {} +
find . -name "*.zip" | while read filename; do unzip -o -d "`dirname "$filename"`" "$filename"; done;
find . -name "*.zip" -type f -print -delete
find . -name "*.zip" | while read filename; do unzip -o -d "`dirname "$filename"`" "$filename"; done;
find . -name "*.zip" -type f -print -delete
find . \( -name ".git" -o -name ".gitignore" -o -name ".gitmodules" -o -name ".gitattributes" \) -exec rm -rf -- {} +
find . \( -name "*SECURITY.txt" -o -name "*RELEASE.txt" -o  -name "*CHANGELOG.txt" -o -name "*LICENSE.txt" -o -name "*CONTRIBUTING.txt" -name "*HISTORY.md" -o -name "*LICENSE" -o -name "*SECURITY.md" -o -name "*RELEASE.md" -o  -name "*CHANGELOG.md" -o -name "*LICENSE.md" -o -name "*CODE_OF_CONDUCT.md" -o -name "*CONTRIBUTING.md" \) -exec rm -rf -- {} +
npm install
npm run serve
npm run build
wget --wait=2 --level=inf --limit-rate=20K --recursive --page-requisites --user-agent=Mozilla --no-parent --convert-links --adjust-extension --no-clobber -e robots=off https://az-aurora.webflow.io/
find . -name "*.zip" | while read filename; do unzip -o -d "`dirname "$filename"`" "$filename"; done;
find . -name "*.zip" -type f -print -delete
wget --wait=2 --level=inf --limit-rate=20K --recursive --page-requisites --user-agent=Mozilla --no-parent --convert-links --adjust-extension --no-clobber -e robots=off https://brian-miller.webflow.io/
npm install recursive
npm-recursive-install
python3 get-gists.py joe-alves
python3 get-gists.py gardensgreen
python3 get-gists.py
python3 get-gists.py cynthiaspence7827
python3 get-gists.py alimirakim
python3 get-gists.py Erick-Bravo
python3 get-gists.py DerekInhoKim
python3 get-gists.py
python3 get-gists.py gootieno
python3 get-gists.py bartdorsey
python3 get-gists.py ericelliott
python3 get-gists.py noelbundick
python3 get-gists.py jhnns
python3 get_gists.py anders
python3 get-gists.py anders
find . \( -name ".git" -o -name ".gitignore" -o -name ".gitmodules" -o -name ".gitattributes" \) -exec rm -rf -- {} +
python3 get-gists.py E-Bo
npx @appnest/readme generate
rm-rf *
cd ..
rm -rf *
modernizr -c modernizr-config.json
git init
tree > README.md
git add .
git commit -m "initial commit"
git remote add origin https://github.com/bgoonz/mini-project-showcase.git
git push -u  origin master
git add .
git commit -m "initial commit"
git push -u  origin master
ls -R './' | awk '
/:$/&&f{s=$0;f=0}
/:$/&&!f{sub(/:$/,"");s=$0;f=1;next}
NF&&f{ print s"/"$0 }'>listing.md
find / -iname "*.htm" -o -iname "*.html" >listing.md
find . -name 'node_modules' -type d -prune -exec rm -rf '{}' +
setopt extendedglob nullglob
for pathname in /**/*(/e{'[[ -n $REPLY/(#i)*.htm(l#)(#q.) ]]'}); do     printf '%s:\n' $pathname;     ls -l $pathname; done
#!/bin/sh
# find ./ | grep -i "\.*$" >files
find ./ | sed -E -e 's/([^ ]+[ ]+){8}//' | grep -i "\.*$">files
listing="files"
out=""
html="index.html"
out="basename $out.html"
html="index.html"
cmd() {   echo '  <!DOCTYPE html>';   echo '<html>';   echo '<head>'   echo '  <meta http-equiv="Content-Type" content="text/html">'   echo '  <meta name="Author" content="Bryan Guner">';   echo '<link rel="stylesheet" href="./assets/prism.css">';   echo ' <link rel="stylesheet" href="./assets/style.css">';   echo ' <script async defer src="./assets/prism.js"></script>'   echo "  <title> directory </title>"   echo "";   echo '<style>' echo '    a {'; echo '      color: black;'; echo '    }'; echo ''; echo '    li {'; echo '      border: 1px solid black !important;'; echo '      font-size: 20px;'; echo '      letter-spacing: 0px;'; echo '      font-weight: 700;'; echo '      line-height: 16px;'; echo '      text-decoration: none !important;'; echo '      text-transform: uppercase;'; echo '      background: #194ccdaf !important;'; echo '      color: black !important;'; echo '      border: none;'; echo '      cursor: pointer;'; echo '      justify-content: center;'; echo '      padding: 30px 60px;'; echo '      height: 48px;'; echo '      text-align: center;'; echo '      white-space: normal;'; echo '      border-radius: 10px;'; echo '      min-width: 45em;'; echo '      padding: 1.2em 1em 0;'; echo '      box-shadow: 0 0 5px;'; echo '      margin: 1em;'; echo '      display: grid;'; echo '      -webkit-border-radius: 10px;'; echo '      -moz-border-radius: 10px;'; echo '      -ms-border-radius: 10px;'; echo '      -o-border-radius: 10px;'; echo '    }'; echo '  </style>';   echo '</head>'   echo '<body>'   echo ""   echo ""   echo ""   echo "<ul>"   awk '{print "<li><a href=\""$1"\">",$1,"&nbsp;</a></li>"}' $listing   echo ""   echo "</ul>"   echo "</body>"   echo "</html>" }
cmd $listing --sort=extension >>$html
sudo sed -i '/right\.html/d' ./index.html
sudo sed -i '/\.html/!d' ./index.html
git remote add origin https://github.com/bgoonz/Project-Showcase.git
git init
git add .
git init
git add .
git commit -m "initial commit"
git push -u origin master
find . -name 'node_modules' -type d -prune -exec rm -rf '{}' +
git add .
git commit -m "directory structure"
git push 
git add .
git commit -m "deleted broken project"
git push 
git init
git add .
git commit -m "refactored chess to have less repeating code"
lebab --replace ./ --transform obj-method
lebab --replace ./ --transform class
lebab --replace ./ --transform arrow
lebab --replace ./ --transform let
lebab --replace ./ --transform arg-spread
lebab --replace ./ --transform arg-rest
lebab --replace ./ --transform for-each
lebab --replace ./ --transform for-of
lebab --replace ./ --transform commonjs 
lebab --replace ./ --transform exponent
lebab --replace ./ --transform multi-var
lebab --replace ./ --transform template
lebab --replace ./ --transform default-param
lebab --replace ./ --transform  destruct-param 
lebab --replace ./ --transform includes
lebab --replace ./ --transform obj-method
lebab --replace ./ --transform class
lebab --replace ./ --transform arrow
lebab --replace ./ --transform let
lebab --replace ./ --transform arg-spread
lebab --replace ./ --transform arg-rest
lebab --replace ./ --transform for-each
lebab --replace ./ --transform for-of
lebab --replace ./ --transform commonjs 
lebab --replace ./ --transform exponent
lebab --replace ./ --transform multi-var
lebab --replace ./ --transform template
lebab --replace ./ --transform default-param
lebab --replace ./ --transform  destruct-param 
lebab --replace ./ --transform includes
git pull
lebab --replace ./ --transform let
lebab --replace ./ --transform arrow
lebab --replace ./ --transform class
lebab --replace ./ --transform let
lebab --replace ./ --transform multi-var
lebab --replace ./ --transform for-each
git init
git add .
git commit -m "refactored chess to be more compact"
git push 
git pull
lebab --replace ./ --transform obj-method
lebab --replace ./ --transform class
lebab --replace ./ --transform arrow
lebab --replace ./ --transform let
lebab --replace ./ --transform arg-spread
lebab --replace ./ --transform arg-rest
lebab --replace ./ --transform for-each
lebab --replace ./ --transform for-of
lebab --replace ./ --transform commonjs 
lebab --replace ./ --transform exponent
lebab --replace ./ --transform multi-var
lebab --replace ./ --transform template
lebab --replace ./ --transform default-param
lebab --replace ./ --transform  destruct-param 
lebab --replace ./ --transform includes
pyhton3 get-gists.py bgoonz
python3 get-gists.py bgoonz
python3 get-gists.py bgoonz
find . \( -name "*CHANGELOG.md" -o -name "*LICENSE.md" -o -name "*CONTRIBUTING.md" \) -exec rm -rf -- {} +
find . \( -name "*SECURITY.md" -o -name "*RELEASE.md" -o  -name "*CHANGELOG.md" -o -name "*LICENSE.md" -o -name "*CONTRIBUTING.md" \) -exec rm -rf -- {} +
find . \( -name "*CHANGELOG.md" -o -name "*LICENSE.md" -o -name "*CONTRIBUTING.md" \) -exec rm -rf -- {} +
find . \( -name ".git" -o -name ".gitignore" -o -name ".gitmodules" -o -name ".gitattributes" \) -exec rm -rf -- {} +
#!/bin/sh
# find ./ | grep -i "\.*$" >files
find ./ | sed -E -e 's/([^ ]+[ ]+){8}//' | grep -i "\.*$">files
listing="files"
out=""
html="index.html"
out="basename $out.html"
html="index.html"
cmd() {   echo '  <!DOCTYPE html>';   echo '<html>';   echo '<head>'   echo '  <meta http-equiv="Content-Type" content="text/html">'   echo '  <meta name="Author" content="Bryan Guner">';   echo '<link rel="stylesheet" href="./assets/prism.css">';   echo ' <link rel="stylesheet" href="./assets/style.css">';   echo ' <script async defer src="./assets/prism.js"></script>'   echo "  <title> directory </title>"   echo "";   echo '<style>' echo '    a {'; echo '      color: black;'; echo '    }'; echo ''; echo '    li {'; echo '      border: 1px solid black !important;'; echo '      font-size: 20px;'; echo '      letter-spacing: 0px;'; echo '      font-weight: 700;'; echo '      line-height: 16px;'; echo '      text-decoration: none !important;'; echo '      text-transform: uppercase;'; echo '      background: #194ccdaf !important;'; echo '      color: black !important;'; echo '      border: none;'; echo '      cursor: pointer;'; echo '      justify-content: center;'; echo '      padding: 30px 60px;'; echo '      height: 48px;'; echo '      text-align: center;'; echo '      white-space: normal;'; echo '      border-radius: 10px;'; echo '      min-width: 45em;'; echo '      padding: 1.2em 1em 0;'; echo '      box-shadow: 0 0 5px;'; echo '      margin: 1em;'; echo '      display: grid;'; echo '      -webkit-border-radius: 10px;'; echo '      -moz-border-radius: 10px;'; echo '      -ms-border-radius: 10px;'; echo '      -o-border-radius: 10px;'; echo '    }'; echo '  </style>';   echo '</head>'   echo '<body>'   echo ""   echo ""   echo ""   echo "<ul>"   awk '{print "<li><a href=\""$1"\">",$1,"&nbsp;</a></li>"}' $listing   echo ""   echo "</ul>"   echo "</body>"   echo "</html>" }
cmd $listing --sort=extension >>$html
#!/bin/sh
# find ./ | grep -i "\.*$" >files
find ./ | sed -E -e 's/([^ ]+[ ]+){8}//' | grep -i "\.*$">files
listing="files"
out=""
html="index.html"
out="basename $out.html"
html="index.html"
cmd() {   echo '  <!DOCTYPE html>';   echo '<html>';   echo '<head>'   echo '  <meta http-equiv="Content-Type" content="text/html">'   echo '  <meta name="Author" content="Bryan Guner">';   echo '<link rel="stylesheet" href="./assets/prism.css">';   echo ' <link rel="stylesheet" href="./assets/style.css">';   echo ' <script async defer src="./assets/prism.js"></script>'   echo "  <title> directory </title>"   echo "";   echo '<style>' echo '    a {'; echo '      color: black;'; echo '    }'; echo ''; echo '    li {'; echo '      border: 1px solid black !important;'; echo '      font-size: 20px;'; echo '      letter-spacing: 0px;'; echo '      font-weight: 700;'; echo '      line-height: 16px;'; echo '      text-decoration: none !important;'; echo '      text-transform: uppercase;'; echo '      background: #194ccdaf !important;'; echo '      color: black !important;'; echo '      border: none;'; echo '      cursor: pointer;'; echo '      justify-content: center;'; echo '      padding: 30px 60px;'; echo '      height: 48px;'; echo '      text-align: center;'; echo '      white-space: normal;'; echo '      border-radius: 10px;'; echo '      min-width: 45em;'; echo '      padding: 1.2em 1em 0;'; echo '      box-shadow: 0 0 5px;'; echo '      margin: 1em;'; echo '      display: grid;'; echo '      -webkit-border-radius: 10px;'; echo '      -moz-border-radius: 10px;'; echo '      -ms-border-radius: 10px;'; echo '      -o-border-radius: 10px;'; echo '    }'; echo '  </style>';   echo '</head>'   echo '<body>'   echo ""   echo ""   echo ""   echo "<ul>"   awk '{print "<li><a href=\""$1"\">",$1,"&nbsp;</a></li>"}' $listing   echo ""   echo "</ul>"   echo "</body>"   echo "</html>" }
cmd $listing --sort=extension >>$html
node appender.js
node appender.js
rename 's/\.js\.download$/.js/' *.js\.download  
npm init -y
rename 's/\.js\.download$/.js/' *.js\.download  
find . -type f -exec sed -i '/Blog at WordPress/d' ./* {} \;
find . -iname '*\.html' -type f -exec sed -i '/Blog at WordPress/d' ./* {} \;
sudo sed -i '/Blog at WordPress/d' ./index.html
sudo sed -i '/Blog at WordPress/d' ./*.html
function RecurseDirs () {     oldIFS=$IFS;     IFS=$'\n';     for f in "$@";     do   
sudo sed -i '/Blog at WordPress/d' ./*.html              if [[ -d "${f}" ]]; then             cd "${f}";             RecurseDirs $(ls -1 ".");             cd ..;         fi;     done;     IFS=$oldIFS; }
RecurseDirs "./"
find . -type f -exec sed -i '/Blog at WordPress/d' ./* {} \;
npm install webpack webpack-cli --save-dev
npx webpack
npm install --save lodash
git init
git add  .
git commit -m "update"
git push 
npm install
git init
git add .
git commit -m "update"
git push 
. /bin/activate
make
