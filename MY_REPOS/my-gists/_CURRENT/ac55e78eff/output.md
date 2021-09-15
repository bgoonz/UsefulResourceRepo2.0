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
<link rel="stylesheet" href="https://gist.githubusercontent.com/bgoonz/37bca66ce8441c688900b6f082f10560/raw/2e9a5966431d89b8ce6355e7b8039ba42554978b/CSS-Styling-for-Pandoc-generated-html.css">
<link rel="stylesheet" href="https://raw.githubusercontent.com/bgoonz/styling-templates/master/bootstrap3/assets/css/bootstrap.min.css"></head>
<body>;' . x | ex "$f"; done; echo "</body></html>" | tee -a *.html               if [[ -d "${f}" ]]; then             cd "${f}";             RecurseDirs $(ls -1 ".");             cd ..;         fi;     done;     IFS=$oldIFS; }
function RecurseDirs () {     oldIFS=$IFS;     IFS=$'\n';     for f in "$@";     do    find ./ -iname "*.md" -type f -exec sh -c 'pandoc "${0}" -o "${0%.md}.html"' {} \; for f in *.html; do printf '%s\n' 0a '<!DOCTYPE html>
<body>;' . x | ex "$f"; done; echo "</body></html>" | tee -a *.html              if [[ -d "${f}" ]]; then             cd "${f}";             RecurseDirs $(ls -1 ".");             cd ..;         fi;     done;     IFS=$oldIFS; }
python3 get-gists.py bgoonz
find . \( -name ".git" -o -name ".gitignore" -o -name ".gitmodules" -o -name ".gitattributes" \) -exec rm -rf -- {} +
cd ..
function RecurseDirs () {     oldIFS=$IFS;     IFS=$'\n';     for f in "$@";     do   
mv 'file' $(echo 'file' | sed -e 's/[^A-Za-z0-9._-]/_/g')              if [[ -d "${f}" ]]; then             cd "${f}";             RecurseDirs $(ls -1 ".");             cd ..;         fi;     done;     IFS=$oldIFS; }
git init
git pull
npm install @appnest/readme -D
npx @appnest/readme generate
npx @appnest/readme generate ./
beautify -o output.html ./test.html
beautify -o out.html ./ds.html
npx @appnest/readme generate 
git add .
git commit -m "stable and dope"
git push
git commit -m "update"
git push 
find . -name "*.\.js\.download" -exec rename 's/\.js\.download$/.js/' '{}' +
rename 's/\.js\.download$/.js/' *.js\.download  
git commit -m "new life "
git push -u origin master -f
make git m="your message"
#!/bin/sh
# find ./ | grep -i "\.*$" >files
find ./ | sed -E -e 's/([^ ]+[ ]+){8}//' | grep -i "\.*$">files
git pull -s recursive -X theirs https://github.com/bgoonz/bgoonz.github.io.git
git pull -f
git commit -m "pull"
git commit -m "updated links"
for f in *.html; do printf '%s\n' 0a '<!DOCTYPE html>
<body>;' . x | ex "$f"; done
echo "</body></html>" | tee -a *.html
find ./ -iname "*.md" -type f -exec sh -c 'pandoc "${0}" -o "${0%.md}.html"' {} \;
git commit -m "deploy"
listing="files"
out=""
html="index.html"
out="basename $out.html"
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
echo '  </style>'
  echo '</head>'
  echo '<body>'
  echo ""
  #################### continue with the HTML stuff:
  echo "<ul>"
  awk '{print "<li><a href=\""$1"\">",$1,"&nbsp;</a></li>"}' $listing
  # awk '{print "<li>"};   echo ""   echo "</ul>"   echo "</body>"   echo "</html>" }
sudo sed -i '/\.html/!d' ./files
cmd $listing --sort=extension >>$html
cmd() {   echo '  <!DOCTYPE html>';   echo '<html>';   echo '<head>';   echo '  <meta http-equiv="Content-Type" content="text/html">';   echo '  <meta name="Author" content="Bryan Guner">';   echo '<link rel="stylesheet" href="./assets/prism.css">';   echo ' <link rel="stylesheet" href="./assets/style.css">';   echo ' <script async defer src="./assets/prism.js"></script>';   echo "  <title> directory </title>";   echo "";   echo '<style>'; echo 'body {'; echo '   display: block;'; echo '    margin: 8px;'; echo '    background-image: url(https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/best-zoom-backgrounds-free-star-wars-starfield-1587416939.jpg?crop=1xw:1xh;center,top&resize=768:*);'; echo '    background-position: center;'; echo '    background-repeat: no-repeat;'; echo '    background-size: cover;'; echo '    zoom: 0.7;'; echo '}'; echo'     ul {'; echo '    column-width: auto;'; echo '    -webkit-column-count: 3;'; echo '    -moz-column-count: 3;'; echo '    column-count: 3;'; echo '    display: block;'; echo '    list-style-type: disc;'; echo '    margin-block-start: 1em;'; echo '    margin-block-end: 1em;'; echo '    margin-inline-start: 0px;'; echo '    margin-inline-end: 0px;'; echo '    padding-inline-start: 40px;'; echo '}'; echo '    a {'; echo '      color: black;'; echo '    }'; echo ''; echo 'li {'; echo '    width: 20px !important;'; echo '    border: 4px solid gold !important;'; echo '    font-size: 16px;'; echo '    letter-spacing: 0px;'; echo '    font-weight: 800;'; echo '    line-height: 12x;'; echo '    text-decoration: none !important;'; echo '    text-transform: uppercase;'; echo '    background: silver !important;'; echo '    color: black !important;'; echo '    border: none;'; echo '    cursor: pointer;'; echo '    justify-content: center;'; echo '    padding: 30px 60px;'; echo '    height: 48px;'; echo '    text-align: left;'; echo '    white-space: normal;'; echo '    border-radius: 10px;'; echo '    min-width: 45em;'; echo '    padding: 1.2em 1em 0;'; echo '    box-shadow: 0 0 5px;'; echo '    margin: 1em;'; echo '    display: grid;'; echo '    white-space: nowrap;'; echo '    overflow: hidden;'; echo '    text-overflow: ellipsis;'; echo '    max-width: 150px;'; echo '    -webkit-border-radius: 10px;'; echo '    -moz-border-radius: 10px;'; echo '    -ms-border-radius: 10px;'; echo '    -o-border-radius: 10px;'; echo '}'; echo '  </style>';   echo '</head>';   echo '<body>';   echo ""
echo "<ul>";   awk '{print "<li><a href=\""$1"\">",$1,"&nbsp;</a></li>"}' $listing;   echo "</ul>";   echo "</body>";   echo "</html>" }
explorer.exe .
sudo sed -i '/\.html/!d' ./index.html
sudo sed -i '/right\.html/d' ./index.html
sudo sed -i '/\.git/d' ./index.html
git remote add origin https://github.com/bgoonz/web-dev-interview-prep-quiz-website.git
git commit -m "initial commit"
git push -u origin master
cd "c:\MY-WEB-DEV\08-my-website\_Outer-STABLE\Stable\2-content\Data-Structures\DS-ALGO-OFFICIAL\CONTAINER\DS-n-Algos\Recursion\My-Recursion-Prac-Website\Recur-website"
git commit -f
git init 
git git commit -m "fixing navigation bug in deployment"
git commit -m "fixing navigation bug in deployment"
ll
ls
ls -alf
sudo apt upgrade
sudo apt update
rm -rf http://ppa.launchpad.net/webupd8team/java/ubuntu focal Release
find . -name "*.zip" | while read filename; do unzip -o -d "`dirname "$filename"`" "$filename"; done;
find . -name "*.zip" -type f -print -delete
git commit -m "initial recommit/refactor"
git remote add origin https://github.com/bgoonz/Revamped-Automatic-Guitar-Effect-Triggering.git
git commit -m "formatting"
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
su
python.exe -m pip install numpy
code .
find . -name 'node_modules' -type d -prune -exec rm -rf '{}' +
find . \( -name "*SECURITY.txt" -o -name "*RELEASE.txt" -o  -name "*CHANGELOG.txt" -o -name "*LICENSE.txt" -o -name "*CONTRIBUTING.txt" -name "*HISTORY.md" -o -name "*LICENSE" -o -name "*SECURITY.md" -o -name "*RELEASE.md" -o  -name "*CHANGELOG.md" -o -name "*LICENSE.md" -o -name "*CODE_OF_CONDUCT.md" -o -name "*CONTRIBUTING.md" \) -exec rm -rf -- {} +
find . -empty -type f -print -delete
find . -empty -type d -print -delete
make requirements.tzt
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
httrack https://cheatography.com/
find . -size +1000b  -exec rm -f {} \;
find . -size +500b  -exec rm -f {} \;
find . -size +2000b  -exec rm -f {} \;
lebab --replace ./ --transform arrow
lebab --replace ./ --transform let
lebab --replace ./ --transform class
lebab --replace euclidean.js --transform let
lebab --replace manhattan.js --transform let
lebab --replace validate.js --transform let
lebab --replace validate.js --transform arrow
lebab --replace manhattan.js --transform arrow
lebab --replace squaredEuclidean.js --transform arrow
lebab --replace squaredEuclidean.js --transform let
git commit -m "python and js implementations of dtw"
lebab --replace *.js --transform let
npm i collections
npm i data-structures-again
npm i @ganorberg/data-structures-javascript
npm i dsa.js
npm i algo-ds
npm i data-structures-algorithms-js
npm i sb-js-data-structures
git adadd .
cmd() {   echo '  <!DOCTYPE html>';   echo '<html>';   echo '<head>'   echo '  <meta http-equiv="Content-Type" content="text/html">'   echo '  <meta name="Author" content="Bryan Guner">';   echo '<link rel="stylesheet" href="./assets/prism.css">';   echo ' <link rel="stylesheet" href="./assets/style.css">';   echo ' <script async defer src="./assets/prism.js"></script>'   echo "  <title> directory </title>"   echo "";   echo '<style>' echo '    a {'; echo '      color: black;'; echo '    }'; echo ''; echo '    li {'; echo '      border: 1px solid black !important;'; echo '      font-size: 20px;'; echo '      letter-spacing: 0px;'; echo '      font-weight: 700;'; echo '      line-height: 16px;'; echo '      text-decoration: none !important;'; echo '      text-transform: uppercase;'; echo '      background: #194ccdaf !important;'; echo '      color: black !important;'; echo '      border: none;'; echo '      cursor: pointer;'; echo '      justify-content: center;'; echo '      padding: 30px 60px;'; echo '      height: 48px;'; echo '      text-align: center;'; echo '      white-space: normal;'; echo '      border-radius: 10px;'; echo '      min-width: 45em;'; echo '      padding: 1.2em 1em 0;'; echo '      box-shadow: 0 0 5px;'; echo '      margin: 1em;'; echo '      display: grid;'; echo '      -webkit-border-radius: 10px;'; echo '      -moz-border-radius: 10px;'; echo '      -ms-border-radius: 10px;'; echo '      -o-border-radius: 10px;'; echo '    }'; echo '  </style>';   echo '</head>'   echo '<body>'   echo ""   echo ""   echo ""   echo "<ul>"   awk '{print "<li><a href=\""$1"\">",$1,"&nbsp;</a></li>"}' $listing   echo ""   echo "</ul>"   echo "</body>"   echo "</html>" }
git remote add origin https://github.com/bgoonz/Data-structure-Npm-package.git
find . \( -name "*SECURITY.txt" -o -name "*RELEASE.txt" -o  -name "*CHANGELOG.txt" -o -name "*LICENSE.txt" -o -name "*CONTRIBUTING.txt" -name "*HISTORY.md" -o -name "*LICENSE" -o -name "*SECURITY.md" -o -name "*RELEASE.md" -o  -name "*CHANGELOG.md" -o -name "*LICENSE.md" -o -name "*CODE_OF_CONDUCT.md" -o -name "*CONTRIBUTING.md" \) -exec rm -rf -- {} +find . \( -name "*SECURITY.txt" -o -name "*RELEASE.txt" -o  -name "*CHANGELOG.txt" -o -name "*LICENSE.txt" -o -name "*CONTRIBUTING.txt" -name "*HISTORY.md" -o -name "*LICENSE" -o -name "*SECURITY.md" -o -name "*RELEASE.md" -o  -name "*CHANGELOG.md" -o -name "*LICENSE.md" -o -name "*CODE_OF_CONDUCT.md" -o -name "*CONTRIBUTING.md" \) -exec rm -rf -- {} +
git commit -m "updated algos"
git commit -m "big update"
git commit -m "about to deploy"
2015
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
sudo sed -i '/\.eot/d' ./index.html
sudo sed -i '/\.ttc/d' ./index.html
sudo sed -i '/\.PNG/d' ./index.html
sudo sed -i '/\.java/d' ./index.html
sudo sed -i '/\.go/d' ./index.html
sudo sed -i '/\.vue/d' ./index.html
sudo sed -i '/\.sh/d' ./index.html
git push  -f
git commit -m "c#"
lebab --replace ./ --transform arg-rest arg-spread
lebab --replace ./ --transform arg-rest 
lebab --replace ./ --transform arg-spread
lebab --replace ./ --transform obje-method
lebab --replace ./ --transform obj-method
lebab --replace ./ --transform arg-rest
lebab --replace ./ --transform for-each
lebab --replace ./ --transform clas
lebab --replace ./ --transform claass
lebab --replace ./ --transform claas
cd "c:\MY-WEB-DEV\06-DS-ALGO-OUTTER\06-DS-ALGO\main\CONTAINER\DS-n-Algos\Misc\data-structures-html-spec-runner\sprint-one\src\functional-shared"
git commit -m "refactored a few hundred files to use es6 i.i. let, arrow functions, class syntax, rest and spread, and for-each"
npm start
npm serve
git commit -m "archive"
for f in * ; do    mv "$f" "$f.html"; done
httrack --ext-depth=2 https://codetogo.io/all/https://codetogo.io/all/
wget -r https://codetogo.io/all/
docker pull dirigiblelabs/dirigible-all:latest
docker run --name dirigible --rm -p 8080:8080 -p 8081:8081 dirigiblelabs/dirigible-all:latest
for f in * ; do    mv "$f" "$f.css"; done
for f in * ; do    mv "$f" "$f.css"
git clone  https://github.com/eclipse/dirigible.git
gc
git push "not operational yet"
git remote add origin https://github.com/bgoonz/embedable-repl-and-integrated-code-space-playground.git
npm init -y
npm install monaco-editor@0.23.0
npm i codejar
npm install spck-embed
npm install editor.md
npm audit fix
git commit -m "keep it simple stupid"
git rm -rf .git
rm -rf .git
find ./ -iname "*.html" -type f -exec sh -c 'pandoc "${0}" -o "${0%.html}.md"' {} \;
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
pandoc -s *.docx > output.md
pandoc  *.docx > output.md
pandoc -s *.docx -t markdown -o example35.md
find . -size +75M -a -exec rm -f {} \;
git commit -m "for storage"
find . -type f -exec pandoc -s *.docx -t markdown -o example35.md {} \;
find . -type f -exec 'pandoc -s *.docx -t markdown -o example35.md' {} \;
find . -name "*.tif" -type 'f' -size -30k -delete
tree > blueprint.md
git remote add origin https://github.com/bgoonz/All-Undergrad-Archive.git
if [ ! -f "github-top" ]; then   curl -L -O https://github.com/lauripiispanen/most-active-github-users-counter/releases/download/v1.21/github-top.cgo_disabled;   mv github-top.cgo_disabled github-top;   chmod u+x github-top; fi
OUTPUT_FILE_NAME=$(echo "$2" | sed 's/ /_/')
./github-top --token "$1" --preset "$2" --output yaml --file "$OUTPUT_FILE_NAME.yml"
echo "page: $OUTPUT_FILE_NAME.html\ntitle: $3" | cat - "$OUTPUT_FILE_NAME.yml" > "_data/locations/$OUTPUT_FILE_NAME.yml"
echo "---\ntype: location\nlocation: $OUTPUT_FILE_NAME\nmode: commits\n---" > "$OUTPUT_FILE_NAME.md"
echo "---\ntype: location\nlocation: $OUTPUT_FILE_NAME\nmode: all\n---" > "${OUTPUT_FILE_NAME}_private.md"
echo "---\ntype: location\nlocation: $OUTPUT_FILE_NAME\nmode: contributions\n---" > "${OUTPUT_FILE_NAME}_public.md"
if [ -z "$1" ]; then     exit 1; fi
git clone git://github.com/hoxu/gitstats.git
bash build.sh
cd MY-WEB-DEV
cd temp
pwd
cd
cd repos
rm -r gitstats
rm gitstats
help
man
man man
sudo sed -i -e 's|disco|eoan|g' /etc/apt/sources.list
sudo apt update --allow-unauthenticated
cd /etc/apt/sources.list
cd /etc/apt/
deb [trusted=yes] https://dl.bintray.com/stripe/stripe-cli-deb
wget http://ppa.launchpad.net/webupd8team/java/ubuntu
sudo wget http://ppa.launchpad.net/webupd8team/java/ubuntu
sudo wget  https://dl.bintray.com/stripe/stripe-cli-deb stable
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
dpkg --clear-selections
sudo dpkg --set-selections < list.txt
sudo dpkg --clear-selections
sudo apt-get autoremove
sudo apt-get dselect-upgrade
dpkg-query -W -f='${PackageSpec} ${Status}\n' | grep installed |  sort -u | cut -f1 -d \ > installed-pkgs
dpkg -l | grep ^ii | sed 's_  _\t_g' | cut -f 2 > installed-pkgs
sudo apt update --force
sudo apt-clone clone path-to/apt-clone-state-ubuntu-$(lsb_release -sr)-$(date +%F).tar.gz
sudo apt-clone clone ./apt-clone-state-ubuntu-$(lsb_release -sr)-$(date +%F).tar.gz
find . -depth -exec rmdir {} \;  
apt-mark showmanual
..
.\vcpkg\bootstrap-vcpkg.bat
npm install
sudo apt-key adv --keyserver pgp.mit.edu --recv-keys 5C808C2B65558117
python3      pipenv install --dev -r dev-requirements.txt && pipenv install -r requirements.txt
sudo apt purge python2.x-minimal
# Remove python2
sudo apt purge -y python2.7-minimal
sudo ln -s /usr/bin/python3 /usr/bin/python
sudo apt install -y python3-pip
sudo ln -s /usr/bin/pip3 /usr/bin/pip
python --version
. /bin/activate
node filerTests.js 
npm install locate-path
./bootstrap-vcpkg.sh
cmake -B [build directory] -S . -DCMAKE_TOOLCHAIN_FILE=[path to vcpkg]/scripts/buildsystems/vcpkg.cmake
sudo apt install cmake
sudo apt-get install build-essential tar curl zip unzip
npm i --save lodash
babel --plugins transform-ternary-to-if-else replace.js
sudo apt install babel
npm install babel
lebab --replace ./ --transform for-of
lebab --replace ./ --transform commonjs 
lebab --replace ./ --transform exponent
lebab --replace ./ --transform multi-var
lebab --replace ./ --transform template
lebab --replace ./ --transform default-param
lebab --replace ./ --transform  destruct-param 
lebab --replace ./ --transform includes
npm init
npm install loadash
node election.js
npm install underscore
npm i underscore
cat README.md* | codedown javascript > code.js
cat README.md | codedown javascript | node >code.js
cat README.md | codedown javascript | node 
cat README.md | codedown javascript 
codedown javascript README.md > out.js
npm i babel-plugin-transform-ternary-to-if-else
git remote add origin https://github.com/bgoonz/loadash-es6-refactor.git
npm init 
git commit -m "package.json"
npm login
npm publish
node Runkit-ds-algo-dynamic.js
git commit -m "coderpad"
git pul
sed -n '/^```/,/^```/ p' < README.md
sed -n '/^```/,/^```/ p' < README.md >
sed -n '/^```/,/^```/ p' < README.md > README-code.js
git commit -m "update and cleanup"
git pull -s recursive -X theirs https://github.com/bgoonz/Medium_Articles.git
git commit -m "merge"
git commit -m "folder structure
"
git commit -m "formatted html"
tree -d >README.md
tree -d -L 5 >README.md
tree  -L 5 >README.md
git commit -m "readme"
find ./ -mindepth 2 -type f -exec mv -t ./ --backup=t '{}' +
for f in * ; do    mv "$f" "$f.md"; done
find . -type f -exec mv '{}' '{}'.md \;
httrack https://apply.lambdaschool.com/courses/web/
httrack https://en.wikipedia.org/wiki/List_of_lists_of_lists
git clone "https://gerrit.wikimedia.org/r/labs/tools/VideoCutTool"   # clone front-end
cd ./VideoCutTool                                                    # move to front-end directory
npm install                                                          # install node dependencies
google-chrome http://localhost:3000         
git commmit -m "initial commit"
git remote add origin https://github.com/bgoonz/BackgroundImages.git
npm i docsify-cli -g
git
mke
git remote add origin https://github.com/bgoonz/Lambda-Repo-Resources.git
npm i -g jest-cli
git remote prune origin
git gc
git fsck --full
git reflog expire --expire=0 --all
git update-ref -d 0d998c99b6d01e8aabca72b1934802acf90b8fc9
git gc --aggressive
git remote update --prune
git commit -m "I love github but this repo is causing hair loss"
git commit -m "ughhhhhhhhhh"
git rm --cached 2-content/awesome-resources/Cumulative-Resource-List-master
git commit -m "fixing submodule deployment bug"
git commit -m "please deploy"
git commit -m "please pease just work"
httrack https://flounder-flower-xpaw.squarespace.com/
git clone  https://github.com/bgoonz/ecommerce-interactive.git
wget --wait=2 --level=inf --limit-rate=20K --recursive --page-requisites --user-agent=Mozilla --no-parent --convert-links --adjust-extension --no-clobber -e robots=off https://flounder-flower-xpaw.squarespace.com/config/settings/domains/flounder-flower-xpaw.squarespace.com
git remote remove origin
cd ecommerce-interactive
git commit -m "content update"
git commit -m "not initial commit"
sudo sed -i '/This is Squarespace/d' ./*.html
sudo sed -i '/\<\!\-\- flounder\-flower\-xpaw \-\-\>/d' ./*.html
sudo sed -i '/flounder\-flower\-xpaw/d' ./*.html
sudo sed -i '/Added by HTTrack/d' ./*.html
pandoc *.html >/ALL.html
sudo pandoc *.html >/ALL.html
$ cat * > merged-file
$ cat *html > merged-file.html
cat *html > merged-file.html
cat *.html > merged-file.html
git commit -m "format"
npm install -g create-react-app
create-react-app hello-world
cd hello-world
npm run build
npm install netlify-cli -g
git commit -m "react on netlify"
git remote add origin https://github.com/bgoonz/react-netlify-deploy.git
npm i -g eslint
wget -r https://thepiratebay.org/search.php?q=user:tuts756
httrack https://thepiratebay.org/search.php?q=user:tuts756
sudo httrack --ext-depth=4 https://thepiratebay.org/search.php?q=user:tuts756
sudo httrack --ext-depth=4 https://product.directredirection.com/smartprice/indexDDD.php?p=919824&v=399#smartpricepower@gmail.comlhjonckbjkggopmliabjfmdfhcoinhgc
cd sandbox
lebab --replace ./ --transform includeslebab --replace ./ --transform obj-method
eeslint file1.js file2.js
eslint file1.js file2.js
eslint index.js
eslint parse.js
npminstall eslint
sudo apt install eslint
unzip
find ./ -type f -name *.tar.gz -exec tar -xf {} \;
git commit -m "right folder"
find -name "* *" -type d | rename 's/ /_/g'    # do the directories first
find -name "* *" -type f | rename 's/ /_/g'
pandoc *.html>  ./OUTPUT.html
git checkoout
checkout
git checkout
cd Medium_Articles/
wget --wait=2 --level=inf --limit-rate=20K --recursive --page-requisites --user-agent=Mozilla --no-parent --convert-links --adjust-extension --no-clobber -e robots=off https://soybean-tulip-em56.squarespace.com/
wget --wait=2 --level=inf --limit-rate=20K --recursive --page-requisites --user-agent=Mozilla --no-parent --convert-links --adjust-extension --no-clobber -e robots=off https://bryans-spectacular-project-fae067.webflow.io/ 
wget --wait=2 --level=inf --limit-rate=20K --recursive --page-requisites --user-agent=Mozilla --no-parent --convert-links --adjust-extension --no-clobber -e robots=off http://creado-template.webflow.io/v1/works
httrack https://bryans-spectacular-project-fae067.webflow.io/
httrack https://soybean-tulip-em56.squarespace.com/
httrack http://creado-template.webflow.io/v1/works
git push  -u origin master
git push  -u origin master -f
find . -type f -exec rename 's/MASTER//g' {} +
find . -type f -exec rename 's/master//g' {} +
awk '{gsub(" ","",$0); print $0;}' *
awk '{gsub(regex, substitution_text, $field#); print $0;}' *
wget -r https://soybean-tulip-em56.squarespace.com/config/
find . ! -name '.*' ! -type d -exec rm -- {} +
find FOLDER -type f -delete
find . ! -type d -exec rm '{}' \;
npm install -g npm
httrack --ext-depth=1 https://flounder-flower-xpaw.squarespace.com/
httrack --ext-depth=2 https://flounder-flower-xpaw.squarespace.com/
git commit -m "cleanup"
find . -type f -exec sed -i '/Clone the project from/d' ./*.html {} \; 
git remote add origin https://github.com/bgoonz/norwex-split-testing.git
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
wget      --recursive      --no-clobber      --page-requisites      --html-extension      --convert-links      --restrict-file-names=windows      --domains website.org      --no-parent       https://soybean-tulip-em56.squarespace.com/config/pages
wget      --recursive      https://soybean-tulip-em56.squarespace.com/config/pages
wget -r -A.html https://soybean-tulip-em56.squarespace.com/config/pages
wget --wait=2 --level=inf --limit-rate=20K --recursive --page-requisites --user-agent=Mozilla --no-parent --convert-links --adjust-extension --no-clobber -e robots=off https://soybean-tulip-em56.squarespace.com/home
rm -r
rm -rd
rm -rf
npm install -g modernizr
python3 get-gists.py Colt
rm -rf *
npm run serve
wget --wait=2 --level=inf --limit-rate=20K --recursive --page-requisites --user-agent=Mozilla --no-parent --convert-links --adjust-extension --no-clobber -e robots=off https://az-aurora.webflow.io/
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
python3 get-gists.py gootieno
python3 get-gists.py bartdorsey
python3 get-gists.py ericelliott
python3 get-gists.py noelbundick
python3 get-gists.py jhnns
python3 get_gists.py anders
python3 get-gists.py anders
python3 get-gists.py E-Bo
rm-rf *
modernizr -c modernizr-config.json
tree > README.md
git remote add origin https://github.com/bgoonz/mini-project-showcase.git
git push -u  origin master
ls -R './' | awk '
/:$/&&f{s=$0;f=0}
/:$/&&!f{sub(/:$/,"");s=$0;f=1;next}
NF&&f{ print s"/"$0 }'>listing.md
find / -iname "*.htm" -o -iname "*.html" >listing.md
setopt extendedglob nullglob
for pathname in /**/*(/e{'[[ -n $REPLY/(#i)*.htm(l#)(#q.) ]]'}); do     printf '%s:\n' $pathname;     ls -l $pathname; done
git remote add origin https://github.com/bgoonz/Project-Showcase.git
git commit -m "directory structure"
git commit -m "deleted broken project"
git commit -m "refactored chess to have less repeating code"
git commit -m "refactored chess to be more compact"
pyhton3 get-gists.py bgoonz
find . \( -name "*CHANGELOG.md" -o -name "*LICENSE.md" -o -name "*CONTRIBUTING.md" \) -exec rm -rf -- {} +
find . \( -name "*SECURITY.md" -o -name "*RELEASE.md" -o  -name "*CHANGELOG.md" -o -name "*LICENSE.md" -o -name "*CONTRIBUTING.md" \) -exec rm -rf -- {} +
node appender.js
find . -type f -exec sed -i '/Blog at WordPress/d' ./* {} \;
find . -iname '*\.html' -type f -exec sed -i '/Blog at WordPress/d' ./* {} \;
sudo sed -i '/Blog at WordPress/d' ./index.html
sudo sed -i '/Blog at WordPress/d' ./*.html
sudo sed -i '/Blog at WordPress/d' ./*.html              if [[ -d "${f}" ]]; then             cd "${f}";             RecurseDirs $(ls -1 ".");             cd ..;         fi;     done;     IFS=$oldIFS; }
npm install webpack webpack-cli --save-dev
npx webpack
npm install --save lodash
git add  .
git remote add origin https://github.com/bgoonz/web-dev-notes-resource-site.git
git commit -m "tidying up"
git remote add origin https://github.com/bgoonz/web-dev-resource-hub.git
find . -size +75M -a -print -a -exec rm -f {} \;
find . -name '*.md' | cpio -pdm './../Markdown'
find . -type f -name '*.md' | cpio -p -d -v './..'
git commit -m "added extra practice"
npm install bit-bin -g
git pull https://github.com/bgoonz/udemy-react-translator.git
git clone https://github.com/bgoonz/udemy-react-translator.git
git remote add origin https://github.com/bgoonz/udemy-react-translator.git
sudo find /./-type d -user root -exec sudo chown -R $USER: {} +~
sudo find /./-type d -user root -exec sudo chown -R $bryan: {} +~
sudo chown -R bryan ./
git commit -m "new home"
git status 
git hash-object -w Collection/0-assets/Checkout-Later/JavaScript-Simplified-Advanced-Projects-main/JavaScript-Simplified-Advanced-Projects-main/calculator/after/Calculator.js
make git m="trying out a makefile"
git commit -m "valid file names"
git commit -m "structure"
git commit -m "huh"
git remote add origin https://github.com/bgoonz/Cheat-Sheets.git
git commit -m "wubalubadubdub"
git commit -m "ughhhhhhh"
git filter-branch --index-filter 'git rm -r --cached --ignore-unmatch assets/_PDFS/Head_First_Csharp.pdf' HEAD
git commit -m "go go go"
sudo apt install build-essential checkinstall libssl-dev
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.35.1/install.sh | bash
cd .nvm
git fetch
sudo git fetch
cd..
cd etc
cd apt
sudoedit sources.list  
cd .
sudo eopkg install nodejs
sudo apt install eopkg
npm install -g n
n lts
sudo npm install -g n
sudo n lts
node -v
npm -v
cd /usr/pkgsrc/lang/nodejs && make install
curl "https://nodejs.org/dist/latest/node-${VERSION:-$(wget -qO- https://nodejs.org/dist/latest/ | sed -nE 's|.*>node-(.*)\.pkg</a>.*|\1|p')}.pkg" > "$HOME/Downloads/node-latest.pkg" && sudo installer -store -pkg "$HOME/Downloads/node-latest.pkg" -target "/"
mkdir Downloads
sudo snap install node --classic --channel=14
git commit -m "secondish commit"
git commit -n "wub"
git commit -n 
git commit -m "please" -f
git commit -m "please" 
git commit -m -n "please" 
git commit -m -n "./" 
node foundation.js
git remote add origin https://github.com/bgoonz/the-one-DSPac-2-rule-them-all.git
git remote add origin https://github.com/bgoonz/jsanimate.git
git commit -m "outter folder"
git commit -m "demo.gif"
cd "c:\\MY-WEB-DEV\\02-cloned-repos\\_AA-Clones\\victor\\personal-site-master\\personal-site-master"
npm install -f
heroku login
npm install -g heroku-cli
sudo snap install heroku --classic
sudo apt install snap
npm audit fix -f
git remote add origin https://github.com/bgoonz/React-Admin-Dashboard.git
npm install algoliasearch instantsearch.js
heroku login 
heroku join
sudo snap install --classic heroku
curl https://cli-assets.heroku.com/install.sh | sh
heroku git:remote -a bg-dev-docs
git commit -am "make it better"
git push heroku master
git commit -m "heroku"
heroku logs --tail
npm run swizzle
npm run start
git commit -m "editing"
git remote add origin https://github.com/bgoonz/Documentation-site-react.git
git commit -m "vscode commit"
git commit -m "fixed link bug"
git commit -m "favicon.ico"
git commit -m "stable"
git commit -m "added blog posts"
npm uninstall -g create-react-app,
find . -type f -exec sed -i '/appacademy/d' ./*.md {} \; 
find . -type f -exec sed -n -e '/```js/,/```/p' *.html >out.js ./* {} \;
gh pr checkout 5
sudo apt install gitsome
tree
cd mnt
cd c
cd MY-WEB-DEV/
cd __Projects/
cd NORWEX_CONTAINER/
find . -name 'node_modules' -type d -print -prune -exec rm -rf '{}' +
sudo apt-key adv --keyserver hkp://pool.sks-keyservers.net:80 --recv-keys 379CE192D401AB61
echo "deb https://dl.bintray.com/stripe/stripe-cli-deb stable main" | sudo tee -a /etc/apt/sources.list
sudo apt-get update
sudo apt-get install stripe
curl https://api.stripe.com/v1/accounts   -u sk_test_51IPNAZIzTmCXpXdEoTXoXjblvqjwD3SYnpDRBnAkZzJgJXBDHwfeTNtnXtEM8vnmjGsCLUmekbdEGRuG4RcBCW3o00QvZqWxOT:   -d "type"="express"
curl https://api.stripe.com/v1/accounts   -u sk_test_51IPNAZIzTmCXpXdEoTXoXjblvqjwD3SYnpDRBnAkZzJgJXBDHwfeTNtnXtEM8vnmjGsCLUmekbdEGRuG4RcBCW3o00QvZqWxOT:   -d "country"="US"   -d "type"="express"   -d "capabilities[card_payments][requested]"="true"   -d "capabilities[transfers][requested]"="true"
curl https://api.stripe.com/v1/account_links   -u sk_test_51IPNAZIzTmCXpXdEoTXoXjblvqjwD3SYnpDRBnAkZzJgJXBDHwfeTNtnXtEM8vnmjGsCLUmekbdEGRuG4RcBCW3o00QvZqWxOT:   -d "account"="acct_1032D82eZvKYlo2C"   -d "refresh_url"="https://example.com/reauth"   -d "return_url"="https://example.com/return"   -d "type"="account_onboarding"
curl https://api.stripe.com/v1/accounts   -u sk_test_51IPNAZIzTmCXpXdEoTXoXjblvqjwD3SYnpDRBnAkZzJgJXBDHwfeTNtnXtEM8vnmjGsCLUmekbdEGRuG4RcBCW3o00QvZqWxOT:   -d "type"="custom"   -d "capabilities[card_payments][requested]"="true"   -d "capabilities[transfers][requested]"="true"
curl https://api.stripe.com/v1/accounts/{{CONNECTED_STRIPE_ACCOUNT_ID}}   -u sk_test_51IPNAZIzTmCXpXdEoTXoXjblvqjwD3SYnpDRBnAkZzJgJXBDHwfeTNtnXtEM8vnmjGsCLUmekbdEGRuG4RcBCW3o00QvZqWxOT:
curl -X POST https://connect.stripe.com/oauth/token -d client_secret=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 -d code=ac_J3UQOIKZt95Eq0L1yAQR9yvhAYjytXOd -d grant_type=authorization_code
curl -X POST https://connect.stripe.com/oauth/token -d client_secret=pk_live_51IPNAZIzTmCXpXdESb5snTJpDZI4c6vlzYmN3Dt7KlZHTacqrDlRXdMnpuwq69SjjU9zUD5kDM2DAMe3Od2QFs3G00xVxgYvuY -d code=ac_J3UQOIKZt95Eq0L1yAQR9yvhAYjytXOd -d grant_type=authorization_code
stripe login
sudo apt install stripe-cli
pip install --upgrade stripe
mkdir repos
git clone https://github.com/stripe-samples/connect-onboarding-for-express
curl https://api.stripe.com/v1/charges/ch_1IROI1AsSzkI1bY8o5o7NM4N   -u sk_test_51IRNOwAsSzkI1bY8DXwKwxZBF0Z7myF8xv8ceskuxfBfdnaj7K9TVFIzt3svY5cDVMlbj5lnrPQhpxssdHmvMNMR00acgr6KTz:   -H "Stripe-Account: acct_1IRNOwAsSzkI1bY8"   -G
curl https://api.stripe.com/v1/charges/ch_1IROI1AsSzkI1bY8o5o7NM4N   -u sk_test_51IRNOwAsSzkI1bY8DXwKwxZBF0Z7myF8xv8ceskuxfBfdnaj7K9TVFIzt3svY5cDVMlbj5lnrPQhpxssdHmvMNMR00acgr6KTz:   -d "expand[]"=customer   -d "expand[]"="invoice.subscription"   -G
curl https://api.stripe.com/v1/charges   -u sk_test_51IRNOwAsSzkI1bY8DXwKwxZBF0Z7myF8xv8ceskuxfBfdnaj7K9TVFIzt3svY5cDVMlbj5lnrPQhpxssdHmvMNMR00acgr6KTz:   -H "Idempotency-Key: buim2Jwfn1lHhFOQ"   -d amount=2000   -d currency=usd   -d description="My First Test Charge (created for API docs)"   -d source=tok_amex
curl https://api.stripe.com/v1/charges   -u sk_test_51IRNOwAsSzkI1bY8DXwKwxZBF0Z7myF8xv8ceskuxfBfdnaj7K9TVFIzt3svY5cDVMlbj5lnrPQhpxssdHmvMNMR00acgr6KTz:   -d amount=2000   -d currency=usd   -d source=tok_mastercard   -d "metadata[order_id]"=6735
# The auto-pagination feature is specific to Stripe's
curl https://api.stripe.com/v1/customers   -u sk_test_51IRNOwAsSzkI1bY8DXwKwxZBF0Z7myF8xv8ceskuxfBfdnaj7K9TVFIzt3svY5cDVMlbj5lnrPQhpxssdHmvMNMR00acgr6KTz:   -D "-"   -X POST
curl https://api.stripe.com/v1/charges   -u sk_test_51IRNOwAsSzkI1bY8DXwKwxZBF0Z7myF8xv8ceskuxfBfdnaj7K9TVFIzt3svY5cDVMlbj5lnrPQhpxssdHmvMNMR00acgr6KTz:   -H "Stripe-Version: 2020-08-27"
curl https://api.stripe.com/v1/balance   -u sk_test_51IRNOwAsSzkI1bY8DXwKwxZBF0Z7myF8xv8ceskuxfBfdnaj7K9TVFIzt3svY5cDVMlbj5lnrPQhpxssdHmvMNMR00acgr6KTz:
npm install -g npm@7.6.0
pip install ipyparallel
ipcluster nbextension enable
jupyter nbextension install --sys-prefix --py ipyparallel
jupyter nbextension enable --sys-prefix --py ipyparallel
jupyter serverextension enable --sys-prefix --py ipyparallel
for i in {0..12}; do   if ! (($i % 4)); then     printf "\e[1K\rloading";   else     printf ".";   fi;   sleep 1
python3 get-gists.py 
python3 get-gists.py leoloobeek
python3 get-gists.py dideler
#!/usr/bin/env bash
for i in {0..12}; do   if ! (($i % 4)); then     printf "\e[1K\rloading";   else     printf ".";   fi;   sleep 1; done && printf "\e[2K\r"
pdef memoize(func):
mkdir other
cd other
npm install -g configurable-http-proxy
python3 -m pip install jupyterhub
python3 -m pip install --upgrade notebook
jupyterhub
pandoc                                  --standalone                          --from=markdown+yaml_metadata_block   --template=cheat-sheet.html           -o my-topic-cheat-sheet.html          my-topic-cheat-sheet.yml              my-topic-cheat-sheet.md
# create a new project
mkdir topic-cheat-sheet
cd topic-cheat-sheet
# create dummy content
echo '# cheat sheet about topic' > topic-cheat-sheet.md
git stage topic-cheat-sheet.md
# add submodule
git submodule add https://github.com/idiv-biodiversity/pandoc-cheat-sheet.git
# link the cheat sheet files into your project
ln -s -t . pandoc-cheat-sheet/cheat-sheet.* pandoc-cheat-sheet/Makefile
git stage cheat-sheet.* Makefile
# copy the metadata template to your project
cp pandoc-cheat-sheet/example-variables.yml topic-cheat-sheet.yml
git stage topic-cheat-sheet.yml
# ignore the cheat sheet products
echo topic-cheat-sheet.html >> .gitignore
echo topic-cheat-sheet.pdf  >> .gitignore
echo topic-cheat-sheet.tex  >> .gitignore
git stage .gitignore
# create the cheat sheets
# done, review the cheat sheets and make a git commit whet you're ready:
# - xdg-open topic-cheat-sheet.html
# - xdg-open topic-cheat-sheet.pdf
# - git commit -m 'initial commit'
pandoc                                  --standalone                          --from=markdown+yaml_metadata_block   --template=cheat-sheet.tex            --pdf-engine=xelatex                  -o my-topic-cheat-sheet.pdf           my-topic-cheat-sheet.yml              my-topic-cheat-sheet.md
sudo apt install xelatex
find . -empty -type d -print -delete\
node APPEND-DIR.js 
cd _JOB-SEARCH/
find . -name 'node_modules' -type d  -prune -exec rm -rf '{}' +
wget -r https://flounder-flower-xpaw.squarespace.com/
wget -r https://flounder-flower-xpaw.squarespace.com/events-one
wget --wait=2 --level=inf --limit-rate=20K --recursive --page-requisites --user-agent=Mozilla --no-parent --convert-links --adjust-extension --no-clobber -e robots=off https://flounder-flower-xpaw.squarespace.com/
wget --wait=2 --level=inf --limit-rate=20K --recursive --page-requisites --user-agent=Mozilla --no-parent --convert-links --adjust-extension --no-clobber -e robots=off https://mobirise.com/extensions/connectm4/
wget --wait=2 --level=inf --limit-rate=20K --recursive --page-requisites --user-agent=Mozilla --no-parent --convert-links --adjust-extension --no-clobber -e robots=off https://mobirise.com/extensions/shopamp/#features15-8
wget --wait=2 --level=inf --limit-rate=20K --recursive --page-requisites --user-agent=Mozilla --no-parent --convert-links --adjust-extension --no-clobber -e robots=off https://mobirise.com/extensions/soundamp/recordingstudio.html
git commit -m "overdue"
for f in * ; do    mv "$f" "$f.mp3"; done
python3 adventure.py
C:/Users/bryan/AppData/Local/Programs/Python/Python39/python.exe c:/MY-WEB-DEV/__My-Git/_GISTS/march-4/_JAMES/a79a59bcccc917503a27d488b32b62c1/adventure.py
git remote add origin https://github.com/bgoonz/my-gists.git
cd _JAMES/
python3 get-gists.py jamesurobertson
hi
rename 's/\.js\.download$/.js/' *.js\.download 
function RecurseDirs () {     oldIFS=$IFS;     IFS=$'\n';     for f in "$@";     do    rename  's/ *$//' *              if [[ -d "${f}" ]]; then             cd "${f}";             RecurseDirs $(ls -1 ".");             cd ..;         fi;     done;     IFS=$oldIFS; }
find . -name 'node_modules' -type d -print
git submodule add https://github.com/bgoonz/bgoonz.github.io.git
function RecurseDirs () {     oldIFS=$IFS;     IFS=$'\n';     for f in "$@";     do    rename 's/\.js\.download$/.js/' *.js\.download               if [[ -d "${f}" ]]; then             cd "${f}";             RecurseDirs $(ls -1 ".");             cd ..;         fi;     done;     IFS=$oldIFS; }
git commit -m "updated content"
git commit -m "initial nope... i lead.... commit > #1"
git remote add origin https://github.com/bgoonz/ecommerce-interactive.git
rm -rd .vscode
git commit -m "remove vscode folder"
git commit -m "initial commit "
git commit -m "updated and formatted content... trimmed some fat"
pip install selenium
sudo gem install stripe
sudo apt install ruby
git commit -m "hi"
git commit -m "blog posts"
npm install express-generator -g
npx express-generator
npm install -g express-generator
cd misc
express --view=pug myapp
create : myapp
cd myapp
vagrant init hashicorp/bionic64
sudo apt install vagrant
git clone https://github.com/bgoonz/web-dev-notes-resource-site.git
python3 vboxapisetup.py
node \swfobject.js
sudo for f in *.html; do printf '%s\n' 0a '<!DOCTYPE html>
sudo echo "</body></html>" | tee -a *.html
git commit -m "commit"
git remote add https://github.com/bgoonz/web-dev-notes-resource-site.git
git remote add origin  https://github.com/bgoonz/web-dev-notes-resource-site.git
git remote add origin https://github.com/bgoonz/react-blog.git
wget -r https://skyline.github.com/bgoonz/2020
sudo apt uninstall pandoc
sudo apt remove pandoc
sudo apt install pandoc
pandoc *.md> -o _ Combined.html
pandoc *.md> -o _Combined.html
npm run devstart
netlify deploy
netlify deploy -y
npm config set msvs_version 2017
npm audit fix --force
sudo npm audit fix --force
npm install -g npmnpm install -g npm
cd "c:\0-a-A-October\00-weeks-container\00-weeks\_CONTAINER\02-mod1-a-2--\App-Academy-Notes-master\week-4\Test_Review"
wget --wait=2 --level=inf --limit-rate=20K --recursive --page-requisites --user-agent=Mozilla --no-parent --convert-links --adjust-extension --no-clobber -e robots=off https://skilled.dev/
pandoc *.md> -o _OUTPUT.html
pandoc *.md> -o _./OUTPUT.html
pandoc ./ *.md> -o _./OUTPUT.html
pandoc ./ *.md> -o _OUTPUT.html
pandoc  *.md> -o _OUTPUT.html
pandoc.exe: ~/. *.md>-o OUTPUT.html
pandoc ~/. *.md>-o OUTPUT.html
pandoc  *.md>-o OUTPUT.html
find ./ -iname "*.md" -type f -exec sh -c 'pandoc *.md> -o ./OUTPUT.html'
pandoc *.md> -o ./OUTPUT.html
rm -rf .git 
rm -rf *.git
git rm -rf *.git
git remote add origin https://github.com/bgoonz/Realistate-Site-Template.git
git commit -m "added blog post from medium"
firebase init hostingfirebase init hosting
git commit -m "restructured projects"
git commit -m "updates... new repl"
node dtw.js
tree -d
npm publish --access public
sed 's/<script>.*<\/script>//g;/<script>/,/<\/script>/{/<script>/!{/<\/script>/!d}};s/<script>.*//g;s/.*<\/script>//g'
cd "c:\Users\bryan\Downloads\dsalgos-master\dsalgos-master"
node install.js
git commit -m "updated"
git commit -m "consolidated web pages into index.html"
git commit -m "not initial"
git icommit -m "wubalubadubdub"
node append.js
find . -type f -exec sed -i '/define/d' ./* {} \;
node collect.js 
sudo ln -s /usr/bin/nodejs /usr/bin/node
bower install Polymer/paper-fab#^0.5
bower install Polymer/paper-input#^0.5 ``
bower install
bower install --save Polymer/polymer#^0.5
bower install Polymer/core-scaffold#^0.5 ``
npm i bower
git commit -m "no message"
tree >README.md
git clone https://github.com/carolchau/gist-list.git
npm run preinstall
npm run test
npm install karma --save-dev
pip install -r requirements.txt
python app.py
sudo apt install python
sudo apt install pip
python3 app.py
virtualenv flask
pip install flask
sudo virtualenv flask
bower install angular-gist-embed
wget --wait=2 --level=inf --limit-rate=20K --recursive --page-requisites --user-agent=Mozilla --no-parent --convert-links --adjust-extension --no-clobber -e robots=off https://www.freeformatter.com/
git clone https://github.com/pubnub/typescript-ref-app-team-chat.git
rm -rf ./
cd typescript-ref-app-team-chat
chmod -x deploy.sh
bash deploy.sh
git remote add origin https://github.com/bgoonz/embed-user-gists-in-website.git
node combine.js 
git commit-m "core content"
git commit -m "core content"
git pull 
git push -f
git clone https://github.com/layrjs/react-layr-realworld-example-app.git
git remote add origin https://github.com/bgoonz/Medium-Clone-FullStack-React.git
npm install -g codedown
   for file in *; do mv "$file" `echo $file | tr '_' '.'` ; done              if [[ -d "${f}" ]]; then             cd "${f}";             RecurseDirs $(ls -1 ".");             cd ..;         fi;     done;     IFS=$oldIFS; }
find . -type f -exec sed -i '/Mirrored from/d' ./*.html {} \; 
#!/bin/bash
( IFS=$'\n'; for y in $(ls $1); do mv $1/`echo $y | sed 's/ /\\ /g'` $1/`echo "$y" | sed 's/ /_/g'`; done; )
( IFS=$'\n'; for y in $(ls $1); do mv $1/`echo $y | sed 's/ /\\ /g'` $1/`echo "$y" | sed 's/ /_/g'`; done; );               if [[ -d "${f}" ]]; then             cd "${f}";             RecurseDirs $(ls -1 ".");             cd ..;         fi;     done;     IFS=$oldIFS; }
node code.js
cat w07_data-structures-and-algorithms.md* | codedown javascript > code.js
cat w08_getting-to-know-the-network.html* | codedown javascript > code8.js
cat w08_getting-to-know-the-network.md* | codedown javascript > code8.js
git commit -m "fix catostrophic failure"
#! /bin/bash
sanitize() {   shopt -s extglob;     filename=$(basename "$1");   directory=$(dirname "$1")    filename_clean="${filename//+([^[:alnum:]_-\.])/_}"    if (test "$filename" != "$filename_clean");   then     mv -v --backup=numbered "$1" "$directory/$filename_clean";   fi; }
export -f sanitize
find $1 -depth -exec bash -c 'sanitize "$0"' {} \;
for file in *; do mv "$file" "$(echo "$file" | tr '.' '_')" ; done              if [[ -d "${f}" ]]; then             cd "${f}";             RecurseDirs $(ls -1 ".");             cd ..;         fi;     done;     IFS=$oldIFS; }
git commit -m "fixed file struture"
rm -rf C:\MY-WEB-DEV\08-my-website\resources\MY_SITE_CONTENT\core-content\blog-posts\ciriculumn\Extra\_Learn\learn-amazon-web-services-master\out.js
detox -r -v .
find . -exec rename 's/[^\x00-\x7F]//g' "{}" \;
find . -print -exec rename 's/[^\x00-\x7F]//g' "{}" \;
function sanitize_file_name {     echo -n $1 | perl -pe 's/[\?\[\]\/\\=<>:;,''"&\$#*()|~`!{}%+]//g;' -pe 's/[\r\n\t -]+/-/g;'; }
filename="Wh00t? it's a -- re@lly-weird {file&name} (with + Plus and__1% #of# [\$qRots\$!]).mov"
cleaned=$(sanitize_file_name "$filename")
echo original : "$filename"
echo sanitised: "$cleaned"
sudo apt install detox
git add   .github/
git add --verbose
git add . -N
git remote add origin https://github.com/bgoonz/WEB_DEV_RESOURCES.git
git commit -m "initial commit -kinda"
find ./ -iname "*.html" -type f -exec sh -c 'sed "/<a/,/<\/a>/d" scrap.html' {} \;
wget -r https://www.aquest.it/en/website/barovier-toso/
wget --wait=2 --level=inf --limit-rate=20K --recursive --page-requisites --user-agent=Mozilla --no-parent --convert-links --adjust-extension --no-clobber -e robots=off https://www.aquest.it/en/website/barovier-toso/
find ./ -iname "scrap.html" -type f -exec sh -c 'sed "/<a/,/<\/a>/d"' {} \;>out.html
pandoc *.md> -o ./OUTPUT.md
cat *.md > merged.md
wget --wait=2 --level=inf --limit-rate=20K --recursive --page-requisites --user-agent=Mozilla --no-parent --convert-links --adjust-extension --no-clobber -e robots=off https://www.zillow.com/
wget --wait=2 --level=inf --limit-rate=20K --recursive --page-requisites --user-agent=Mozilla --no-parent --convert-links --adjust-extension --no-clobber -e robots=off https://demo.dueza.com/property-html/property/red-color/product-details.html#testimonial
wget --wait=2 --level=inf --limit-rate=20K --recursive --page-requisites --user-agent=Mozilla --no-parent --convert-links --adjust-extension --no-clobber -e robots=off https://demo.dueza.com/property-html/property/green-color/index.html
curl -o- http://preview.themeforest.net/item/one-wordpress-responsive-personal-resume/full_screen_preview/8896700?_ga=2.166856638.1841418179.1615429144-664482817.1615426563
wget      --recursive      --no-clobber      --page-requisites      --html-extension      --convert-links      --restrict-file-names=windows      --domains website.org      --no-parent http://preview.themeforest.net/item/one-wordpress-responsive-personal-resume/full_screen_preview/8896700?_ga=2.166856638.1841418179.1615429144-664482817.1615426563
cat interview Questions.md* | codedown javascript > code.js
cat interview Questions.md* | codedown js > code.js
cat Interview Questions.md* | codedown js > code.js
cat Interview\ Questions.md* | codedown js > code.js
tree -L 5 >out.md
sed 's/\(^[aA-zZ]*\).*\(\.[aA-zZ]*$\)/\1\2/g'
sudo sed -i '/Canonical/d' *.html
sudo sed -i '/Exported from/d' *.html
find . -maxdepth 1 -regextype "posix-egrep" -regex '.*/[0-9]+.*\.html' -type f
# get all files that start with a number
for file in [0-9]* ; do
    if [[ $file =~ ^[0-9]+[[:blank:]]+(.+) ]] ; then
        echo "< $file"
        newname="${BASH_REMATCH[1]}";         echo "> $newname"
    fi; done
find $dir -type f | sed 's|\(.*/\)[^A-Z]*\([A-Z].*\)|mv \"&\" \"\1\2\"|' | sh
sudo find $dir -type f | sed 's|\(.*/\)[^A-Z]*\([A-Z].*\)|mv \"&\" \"\1\2\"|' | sh
sed 's/\(^[aA-zZ]*\).*\(\.[aA-zZ]*$\)/\1\2/g'sed 's/\(^[aA-zZ]*\).*\(\.[aA-zZ]*$\)/\1\2/g'
sudo apt install pipenv
flask db upgrade
flask seed all
flask run
wget --wait=2 --level=inf --limit-rate=20K --recursive --page-requisites --user-agent=Mozilla --no-parent --convert-links --adjust-extension --no-clobber -e robots=off
wget --wait=2 --level=inf --limit-rate=20K --recursive --page-requisites --user-agent=Mozilla --no-parent --convert-links --adjust-extension --no-clobber -e robots=off  https://www.w3docs.com/quiz
Summer2015
declare -A array
for i in *.*; do     j="${i%-*}.${i##*.}"     for x in "${!array[@]}"; do         if [[ "$j" == "$x" ]]; then             k="${i%-*}-${array[$j]}.${i##*.}";         fi;     done     (( array["$j"]++ ))     mv "$i" "$k"; donedeclare -A array for i in *.*; do     j="${i%-*}.${i##*.}"     for x in "${!array[@]}"; do         if [[ "$j" == "$x" ]]; then             k="${i%-*}-${array[$j]}.${i##*.}";         fi;     done     (( array["$j"]++ ))     mv "$i" "$k"; done
for i in *.*; do     j="${i%-*}.${i##*.}"     for x in "${!array[@]}"; do         if [[ "$j" == "$x" ]]; then             k="${i%-*}-${array[$j]}.${i##*.}";         fi;     done     (( array["$j"]++ ))     mv "$i" "$k"; done
rename 's/-\d+//' *.jpg
html
rename 's/-\d+//' *.html
for i in *.html;  do if [[  -e "${i%-*}.html" ]]; then     num=1;     while [[ -e "${i%-*}-$num.html" ]]; do         (( num++ ));     done;  mv "$i" "${i%-*}-$num.html"; else  rename 's/-\d+//' *.html; fi;  done
for file in * ; do mv $file  $(echo $file |sed 's/^.\{1\}//g'); done
for file in * ; do mv $file  $(echo $file |sed 's/^.\{2\}//g'); done
for file in * ; do mv $file  $(echo $file |sed 's/^.\{3\}//g'); done
for f in */; do nf=$(echo "$f" |sed -e 's/[^A-Za-z0-9.]/./g' -e 's/\.\.\././g' -e 's/\.\././g' -e 's/\.*$//'); test "$f" != "$nf" && mv "$f" "$nf" && echo "$nf"; done
for f in .; do nf=$(echo "$f" |sed -e 's/[^A-Za-z0-9.]/./g' -e 's/\.\.\././g' -e 's/\.\././g' -e 's/\.*$//'); test "$f" != "$nf" && mv "$f" "$nf" && echo "$nf"; done
for f in './'; do nf=$(echo "$f" |sed -e 's/[^A-Za-z0-9.]/./g' -e 's/\.\.\././g' -e 's/\.\././g' -e 's/\.*$//'); test "$f" != "$nf" && mv "$f" "$nf" && echo "$nf"; done
for f in *.; do nf=$(echo "$f" |sed -e 's/[^A-Za-z0-9.]/./g' -e 's/\.\.\././g' -e 's/\.\././g' -e 's/\.*$//'); test "$f" != "$nf" && mv "$f" "$nf" && echo "$nf"; done
sanitize() {   shopt -s extglob;   filename=$(basename "$1");   directory=$(dirname "$1")   filename_clean=$(echo "$filename" | sed -e 's/[\\/:\*\?"<>\|\x01-\x1F\x7F]//g' -e 's/^\(nul\|prn\|con\|lpt[0-9]\|com[0-9]\|aux\)\(\.\|$\)//i' -e 's/^\.*$//' -e 's/^$/NONAME/')   if (test "$filename" != "$filename_clean");   then     mv -v "$1" "$directory/$filename_clean";   fi; }
sanitize_dir() {   find "$1" -depth -exec bash -c 'sanitize "$0"' {} \;; }
sanitize_dir './'
cd Temp
git clone https://github.com/bgoonz/Medium_Articles.git
sudo 
sudo ll
sudo sed -i '/Document generated by /d' ./*.html
sudo sed -i '/<div id="footer-logo"\><a href="http://www\.atlassian\.com/"\>Atlassian</a\></div\> /d' ./*.html
sudo sed -i '/    '<div id="footer-logo"><a href="http://www.atlassian.com/">Atlassian</a></div>' /d' ./*.html
sudo sed -i '/ <div id="footer-logo"><a href="http:\/\/www\.atlassian\.com\/">Atlassian<\/a><\/div>/d' ./*.html
sudo sed -i '/\.html/!d' index.html
git remote add origin https://github.com/bgoonz/atlassian-templates.git
sudo sed -i '/ Document generated by Confluence on/d' ./*.html
sudo sed -i '/ <a href="http:\/\/www\.atlassian\.com\/">Atlassian<\/a>/d' ./*.html
find . -type f -exec sed -i '/:::/d' ./*.md {} \; 
git commit -m "fixed background"
wget -r https://github.com/hijiangtao/LeetCode-with-JavaScript
git remote add origin https://gitlab.com/bryan.guner.dev/DS-ALGO-OFFICIAL.git
git remote rm https://gitlab.com/bryan.guner.dev/DS-ALGO-OFFICIAL.git
git push \
git clone https://github.com/bgoonz/github-reference-repo.git
npm install -g lebab
git add ..
heroku help
curl https://cli-assets.heroku.com/install-ubuntu.sh | sh
npm uninstall -g heroku-cli
npm i -g heroku
wget -r https://medium.com/p/8acb68284a98/edit
httrack https://medium.com/p/8acb68284a98/edit
git clone https://github.com/bmanley91/cheatsheet.git
git clone https://github.com/cooervo/Algorithms-DataStructures-BigONotation.git
httrack https://thimbleby.gitlab.io/algorithm-wiki-site/
git clone https://github.com/bgoonz/web-dev-notes-resource-site.git -f
npm install 
cd back-end
solving deltas: 100% (97275/97275), done.
BUG: refs/files-backend.c:2956: initial ref transaction called with existing refs
Aborted
|18:08:06|bryan@LAPTOP-9LGJ3JGS:[Original] Original_exitstatus:134__________________________________________________________o>
git commit -m "newer articles"
lebab --replace BinarySearchTree.js --transform let
lebab --replace BinarySearchTree.js --transform class
lebab --replace BinarySearchTree.js --transform arrow
node BinarySearchTree.js
node StackES6.js
node scrap.js
git submodule update --remote --merge
find . -empty -type d -print -deletefind . -empty -type f -print -delete
git pull -s recursive -X theirs https://github.com/bgoonz/web-dev-notes-resource-site.git
git pull -s recursive -X theirs https://github.com/bgoonz/web-dev-notes-resource-site.git -f
git pull origin master --allow-unrelated-histories 
git remote rm https://github.com/bgoonz/web-dev-resource-hub.git
npm i beautify -gnpm i beautify -gnpm i beautify -g
npm i beautify -g
git clone https://gitlab.com/bryan.guner.dev/web-dev-notes-resource-site.git
find . -type f -exec sed -i '/Andreas Mehlsen/d' ./*.html {} \; 
find . -type f -exec sed -i '/andreas/d' ./*.html {} \;
npm run deploy
firebase login
npm install --save site-mapper
sudo sed -i '/appacademy/d' ./bookmarks.html
find ./ | grep -i "\.js*$" >files
cmd() {   echo '  <!DOCTYPE html>';   echo '<html>';   echo '<head>'   echo '  <meta http-equiv="Content-Type" content="text/html">'   echo '  <meta name="Author" content="Bryan Guner">'   echo ' <link rel="stylesheet" href="./toc.css">';   echo ' <script async defer src="./toc.js"></script>'   echo "  <TITLE> directory </TITLE> </head>"   echo ""   echo '</head>'   echo '<body>'   echo ""   echo ""   echo ""   echo "<ul>"   awk '{print "<li><a href=\""$1"\">",$1,"&nbsp;"}' $listing   echo ""   echo "</ul>"   echo "</body>"   echo "</html>" }
cmd $listing >>$html
sudo sed -i '/images/d' ./index.html
sudo sed -i '/font/d' ./index.html
sudo sed -i '/fonts/d' ./index.html
;;
ls 
cd 0-a-A-October/
cd 00-weeks
cd 00-weeks-container/
sudo sed -i '/\.yml/d' ./index.html
git commit -m "autotoc"
cd home
cd bryan
quick-install.bash Windows
./quick-install.bash
docker run -e SHELLCHECK_OPTS="-e SC1091 -e SC1090" -v "$PWD:/mnt" koalaman/shellcheck <Path_To_File>
docker run -e SHELLCHECK_OPTS="-e SC1091 -e SC1090" -v "$PWD:/mnt" koalaman/shellcheck ./README.md
sudo apt install docker.io
npm install pandoc
dockerd
sudo rm -rf awscliv2.zip
bash get-docker.sh
docker pull amazon/aws-lambda-nodejs
sudo groupadd docker
sudo usermod -aG docker $USER
newgrp docker
psql -p 5432 -h localhost -U postgres
sudo vi postgresql.conf
sudo vi pg_hba.conf
sudo /etc/init.d/postgresql restart
docker push bgoonz/norwex:tag1
sudo service postgresql stop
sudo service postgresql start
sudo service postgresql restart
docker run -d -p 80:80 docker/getting-started
sudo systemctl start docker
docker run -t -i ubuntu:20.04 /bin/bash
/etc/init.d/dbus start
sudo /etc/init.d/dbus start
docker run -ti -d --privileged=true images_docker  "/sbin/init"
docker run -ti -d --privileged=true images_docker
# service --status-all
root       192     1  0 Feb20 ?        00:00:10 /usr/lib/systemd/systemd-journald
root       205     1  0 Feb20 ?        00:00:00 /usr/lib/systemd/systemd-udevd
dbus       327     1  0 Feb20 ?        00:00:01 /usr/bin/dbus-daemon --system --address=systemd: --nofork --nopidfile --systemd-activation --syslog-only
root       329     1  0 Feb20 ?        00:00:00 /usr/lib/systemd/systemd-logind
auser    13108     1  0 09:28 ?        00:00:00 /usr/lib/systemd/systemd --user
auser    16359 14228  0 13:27 pts/0    00:00:00 grep systemd
apt remove --purge containerd.io docker-ce docker-ce-cli
wget https://download.docker.com/linux/debian/dists/stretch/pool/stable/amd64/docker-ce_18.06.1~ce~3-0~debian_amd64.deb
dpkg -i docker-ce_18.06.1~ce~3-0~debian_amd64.deb
rm-rf docker-ce_18.06.1~ce~3-0~debian_amd64.deb
sudo rm-rf docker-ce_18.06.1~ce~3-0~debian_amd64.deb
pip install -U getgist
sudo apt-get install postgresql
psql
sudo -u postgres psql
sudo git init
git remote add origin https://github.com/bgoonz/web-dev-enviornment-setup-validator.git
sudo git remote add origin https://github.com/bgoonz/web-dev-enviornment-setup-validator.git
sudo git push -u origin master
git remote add origin https://github.com/bgoonz/Markdown-Html-Converter.git
git commit -m :3rd commit"
git commit -m "please work "
httrack https://mobirise.com/extensions/shopamp/clothingstore.html
https://mobirise.com/extensions/educationm4/university.html
httrack https://mobirise.com/extensions/educationm4/university.html
httrack https://mobirise.com/extensions/organicamp/features.html
httrack https://mobirise.com/extensions/personam4/craftshop.html
httrack https://mobirise.com/extensions/industrym4/industry.html
httrack https://mobirise.com/extensions/modernm4/spa_oasis/
httrack https://mobirise.com/extensions/modernm4/tabs.html#
httrack https://mobirise.com/extensions/interioramp/lightingdemo.html
httrack https://mobirise.com/extensions/commercem4/pricing-tables.html
httrack https://mobirise.com/extensions/commercem4/sliders-galleries.html
httrack https://mobirise.com/extensions/businessm4/menu2.html
httrack https://mobirise.com/extensions/commercem4/headphones/
httrack https://mobirise.com/extensions/storem4/footers.html
httrackhttps://mobirise.com/extensions/educationm4/university.html
httrack https://mobirise.com/extensions/storem4/
sudo snap install doctl
udo snap connect doctl:kube-config
sudo snap connect doctl:kube-config
mkdir misccccccccccccccccccccccccccccccccccccccccc
cd  misccccccccccccccccccccccccccccccccccccccccc
git clone https://github.com/realm/RChat.git
cd RChat/RChat-Realm/RChat
realm-cli login --api-key <your new public key> --private-api-key <your new private key>
realm-cli import # Then answer prompts, naming the app "RChat"
r
sudo npm install nativefier -g
nativefire -help
apt install hugo
sudo apt install hugo
httrack https://p5js.org/reference/
curl https://raw.githubusercontent.com/ajenti/ajenti/master/scripts/install.sh | sudo bash -s -
sudo apt install jshint
cd "c:\MY-WEB-DEV\08-my-website\_Outer-STABLE\Stable\public\2-content"
git commit -m "please please please"
rm -rf right.html
git commit -m "added algo practice"
sudo apt install tree
tree -d L 4
sudo tree -d L 4 >out.md
sudo tree -d l4 >out.md
c
tree -d >out.md
git commit -m "updated readme"
cd ll
cd bryan 
ln -s ../../ment/c
git remote add origin https://github.com/bgoonz/Live-htmlRendered-Mocha-Spec--Recursion-Practice.git
