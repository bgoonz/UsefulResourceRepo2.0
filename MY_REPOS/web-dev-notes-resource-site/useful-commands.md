




Log into postgres:
sudo -u postgres psql
-------------------------------------------------------------Symbolic Link--------------------------------------------
sudo ln -s ./mnt/c/MY-WEB-DEV
---------------------------------------------------------------------------------------------------------


cat w07_data-structures-and-algorithms.md* | codedown javascript > code.js


cat interview Questions.md* | codedown javascript > code.js

cat w08_getting-to-know-the-network.html* | codedown javascript > code.js

----------------------------------auto generate readme-----------------------------------------------------------------------


rename existing readme to blueprint.md


npx @appnest/readme generate

---------------------------------------------------------------------------------------------------------



Remove numbbers from file names

find $dir -type f | sed 's|\(.*/\)[^A-Z]*\([A-Z].*\)|mv \"&\" \"\1\2\"|' | sh

---------------------------------Export Medium as Markdown------------------------------------------------------------------------

mediumexporter https://medium.com/codex/fundamental-data-structures-in-javascript-8f9f709c15b4 >ds.md


---------------------------------------------------------------------------------------------------------


INSTEAD OF GIT PUSH _F :git reset --hard upstream/master




TRIM ALL(USE WITH CAUTION):
find . -depth -exec rmdir {} \;  
find . -empty -type f -print -delete
find . -empty -type d -print -delete

find . \( -name ".git" -o -name ".gitignore" -o -name ".gitmodules" -o -name ".gitattributes" \) -exec rm -rf -- {} +
find . \( -name "*SECURITY.txt" -o -name "*RELEASE.txt" -o  -name "*CHANGELOG.txt" -o -name "*LICENSE.txt" -o -name "*CONTRIBUTING.txt" -name "*HISTORY.md" -o -name "*LICENSE" -o -name "*SECURITY.md" -o -name "*RELEASE.md" -o  -name "*CHANGELOG.md" -o -name "*LICENSE.md" -o -name "*CODE_OF_CONDUCT.md" -o -name "*CONTRIBUTING.md" \) -exec rm -rf -- {} +


find . \( -name "*SECURITY.txt" -o -name "*RELEASE.txt" -o  -name "*CHANGELOG.txt" -o -name "*LICENSE.txt" -o -name "*CONTRIBUTING.txt" -name "*HISTORY.md" -o -name "*LICENSE" -o -name "*SECURITY.md" -o -name "*RELEASE.md" -o  -name "*CHANGELOG.md" -o -name "*LICENSE.md" -o -name "*CODE_OF_CONDUCT.md" -o -name "*CONTRIBUTING.md" \) -exec rm -rf -- {} +

---------------------------------------------------------------------------------------------------------


Flatten all sub folders into one folder contaning files.


find ./ -mindepth 2 -type f -exec mv -t ./ --backup=t '{}' +



------------------------
find . -type f -exec sed -i '/academy/d' ./*.html {} \; 


find . -type f -exec sed -i '/academy/d' ./*.md {} \; 


find . -type f -exec sed -i '/image004/d' ./*.html {} \;



find . -type f -exec sed -i '/:::/d' ./*.md {} \; 

find . -type f -exec sed -i '/Mirrored from/d' ./*.html {} \; 





find . -type f -exec sed -i '/toberemoved/d' ./*.html {} \; 
toberemoved
Mirrored from
---------------------------------------------------------------------------------------------------------

Replace spaces in filenames with underscores 

 for file in *; do mv "$file" `echo $file | tr ' ' '_'` ; done

----------------------------------------------------------------------------------------------------------
----------------------------------------------------------------------------------------------------------

----------------------------------------------------------------------------------------------------------
mv 'file' $(echo 'file' | sed -e 's/[^A-Za-z0-9._-]/_/g')


function RecurseDirs ()
{
    oldIFS=$IFS
    IFS=$'\n'
    for f in "$@"
    do
  
  # YOUR CODE HERE!

# find ./ -iname "*.md" -type f -exec sh -c 'pandoc "${0}" -o "${0%.md}.html"' {} \;


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
  
  
        if [[ -d "${f}" ]]; then
            cd "${f}"
            RecurseDirs $(ls -1 ".")
            cd ..
        fi
    done
    IFS=$oldIFS
}
RecurseDirs "./"



function RecurseDirs ()
{
    oldIFS=$IFS
    IFS=$'\n'
    for f in "$@"
    do
  
  # YOUR CODE HERE!
find . -type f -exec sed -n -e '/```javascript/,/```/p' *.html >out.js ./* {} \;
  
  
        if [[ -d "${f}" ]]; then
            cd "${f}"
            RecurseDirs $(ls -1 ".")
            cd ..
        fi
    done
    IFS=$oldIFS
}
RecurseDirs "./"

--------------------------------------------Sanatize--------------------------------------------------------------


function RecurseDirs ()
{
    oldIFS=$IFS
    IFS=$'\n'
    for f in "$@"
    do
  
  # YOUR CODE HERE!
mv 'file' $(echo 'file' | sed -e 's/[^A-Za-z0-9._-]/_/g')
  
  
        if [[ -d "${f}" ]]; then
            cd "${f}"
            RecurseDirs $(ls -1 ".")
            cd ..
        fi
    done
    IFS=$oldIFS
}
RecurseDirs "./"

----------------------------------------------------------------------------------------------------------


function RecurseDirs ()
{
    oldIFS=$IFS
    IFS=$'\n'
    for f in "$@"
    do
  
  # YOUR CODE HERE!

#!/bin/bash
(
IFS=$'\n'
for y in $(ls $1)
do
mv $1/`echo $y | sed 's/ /\\ /g'` $1/`echo "$y" | sed 's/ /_/g'`
done
)
  
  
        if [[ -d "${f}" ]]; then
            cd "${f}"
            RecurseDirs $(ls -1 ".")
            cd ..
        fi
    done
    IFS=$oldIFS
}
RecurseDirs "./"






function RecurseDirs ()
{
    oldIFS=$IFS
    IFS=$'\n'
    for f in "$@"
    do
  
  # YOUR CODE HERE!

#!/bin/bash
(
IFS=$'\n'
for y in $(ls $1)
do
mv $1/`echo $y | sed 's/ /\\ /g'` $1/`echo "$y" | sed 's/ /_/g'`
done
)
  
  
        if [[ -d "${f}" ]]; then
            cd "${f}"
            RecurseDirs $(ls -1 ".")
            cd ..
        fi
    done
    IFS=$oldIFS
}
RecurseDirs "./"












function RecurseDirs ()
{
    oldIFS=$IFS
    IFS=$'\n'
    for f in "$@"
    do
  
  # YOUR CODE HERE!
   for file in *; do mv "$file" `echo $file | tr '_' '.'` ; done
  
  
        if [[ -d "${f}" ]]; then
            cd "${f}"
            RecurseDirs $(ls -1 ".")
            cd ..
        fi
    done
    IFS=$oldIFS
}
RecurseDirs "./"


 for file in *; do mv "$file" `echo $file | tr ' ' '_'` ; done











function RecurseDirs ()
{
    oldIFS=$IFS
    IFS=$'\n'
    for f in "$@"
    do
  
  # YOUR CODE HERE!
   for file in *; do mv "$file" `echo $file | tr '_' '.'` ; done
  
  
        if [[ -d "${f}" ]]; then
            cd "${f}"
            RecurseDirs $(ls -1 ".")
            cd ..
        fi
    done
    IFS=$oldIFS
}
RecurseDirs "./"


 for file in *; do mv "$file" `echo $file | tr ' ' '_'` ; done


----------------------------------------------------------------------------------------------------------
----------------------------------------------------------------------------------------------------------
----------------------------------------------------------------------------------------------------------

4.)Recursive-unzip:()===>

find . -name "*.zip" | while read filename; do unzip -o -d "`dirname "$filename"`" "$filename"; done;








find . -name "*.zip" -type f -print -delete


find . -name "*.zip" | while read filename; do unzip -o -d "`dirname "$filename"`" "$filename"; done;


find . -name "*desktop.ini" -type f -print -delete


find . -name "*.zip" -type f -print -delete




find ./ -type f -name *.tar.gz -exec tar -xf {} \;




find . -name "*.gz" -type f -print -delete



find . -name "*.tgz" -type f -print -delete
---------------------------------------------------------------------------------------------------------

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

---------------------------------------------------------------------------------------------------------
VIM:


#Save file and quit


  <  :wq       >

---------------------------------------------------------------------------------------------------------








git remote remove origin

---------------------------------------------------------------------------------------------------------
Download website with wget:


wget --wait=2 --level=inf --limit-rate=20K --recursive --page-requisites --user-agent=Mozilla --no-parent --convert-links --adjust-extension --no-clobber -e robots=off

---------------------------------------------------------------------------------------------------------

App-Academy-Notes-master



find . -name "*.xml" -type f -print

find . -name 'node_modules' -type d -prune -exec rm -rf '{}' +
find . -name 'node_modules' -type d -prune -exec rm -rf '{}' +
find . -name '.vscode' -type d -prune -exec rm -rf '{}' +
---------------------------------------------------------------------------------------------------------
youtube-dl https://www.youtube.com/user/Mihirishere/videos




youtube-dl https://www.youtube.com/user/norwex/videos
---------------------------------------------------------------------------------------------------------


Remove duplicate lines from a text file
You can use this shell command:

COPY
uniq -u input.txt output.txt

---------------------------------------------------------------------------------------------------------

httrack --ext-depth=2


httrack --ext-depth=2 https://kathyguner.norwex.biz/

httrack https://kathyguner.norwex.biz/


httrack --ext-depth=3 https://www.textfixer.com/html/convert-url-to-html-link.php

httrack http://jellydemos.com/html/muziq/muziq-hardrock/index-multipages.html -O "./temp" %e5

httrack --ext-depth=4 http://jellydemos.com/html/muziq/muziq-hardrock/index-multipages.html

httrack --ext-depth=4 https://www.vickielasher.com/
---------------------------------------------------------------------------------------------------------
grab all links from website
lynx -dump https://distrokid.com/hyperfollow/mihirbeg/getting-there | awk '/http/{print $2}' > links2.txt

lynx -dump https://geeksforgeeks.org/top-10-useful-github-repos-that-every-developer-should-follow | awk '/http/{print $2}' > links.md



lynx -dump https://html.com/blog/100-web-development-cheat-sheets | awk '/http/{print $2}' > links.md




wget -qO- www.instagram.com/mihirbeg/ |
grep -Eoi '<a [^>]+>' | 
grep -Eo 'href="[^\"]+"' | 
grep -Eo '(http|https)://[^/"]+'>output.md
---------------------------------------------------------------------------------------------------------

Install node modules recursevly (npm i -g recursive-install):


npm-recursive-install

---------------------------------------------------------------------------------------------------------



.*(?<=<script)(.*)(?=<\/script>).*
.*\./\.git.*
.*node_modules.*

find . -name "*.zip" -type f -print
find . -name "*.zip" -type f -print -delete
---------------------------------------------------------------------------------------------------------
REMOVE DUPLICATE LINES:

uniq -u input.txt output.txt


uniq -u resources.html output.html

uniq -u testOut.html TESTOUT.html
---------------------------------------------------------------------------------------------------------
2.)find and delete all empty directories()===>

find . -empty -type d -print -delete
---------------------------------------------------------------------------------------------------------
3.)Find and delete all empty files()===>

find . -empty -type f -print -delete


add extension to every file in folder

for f in * ; do 
  mv "$f" "$f.html"
done


find . -type f -exec mv '{}' '{}'.html \;

for f in * ; do 
  mv "$f" "$f.css"
done
---------------------------------------------------------------------------------------------------------
delete lines contaning specific string:

sed -i '/normalizerEmpty/d' ./js-in-one-page.html

sed -i '/\.git/d' ./index.html
2

find . -type f -a \( -name "*.html" -o -name "*.js" -o -name "*.css" -o -name "*.md" \) -a -exec sed -i  '/BADSTRING/d' '{}' +
sed -i '//d' ./*.html




find . -type f -a \( -name "*.html" -o -name "*.js" -o -name "*.css" -o -name "*.md" -o -name "*.php" \) -a -exec sed -i  '/MIT/d' '{}' +




find . -type f -a \( -name "*.html"  -o -name "*.md" \) -a -exec sed -i  '/[Source]/d' '{}' +
---------------------------------------------------------------------------------------------------------

Remove lines of file contaning a string


sudo sed -i '/\.git/d' ./index.html
sudo sed -i '/assets/d' ./index.html
---------------------------------------------------------------------------------------------------------
To find a pattern and remove the line containing the pattern below command can be used

find . -name "*" -type f | xargs sed -i -e '/Mirrored from/d'



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





find . -name "*" -type f | xargs sed -i -e '/Mirrored from/d'
---------------------------------------------------------------------------------------------------------
print out the path of every file recursivley


ls -R './' | awk '
/:$/&&f{s=$0;f=0}
/:$/&&!f{sub(/:$/,"");s=$0;f=1;next}
NF&&f{ print s"/"$0 }'>listing.md

---------------------------------------------------------------------------------------------------------


---------------------------------------------------------------------------------------------------------

sed -n -e '/<script>/,/<\/script>/p' getting-there.html >out.js





sed -n -e '/<script>/,/<\/script>/p' *.html >out.js



find . -type f -exec sed -n -e '/<script>/,/<\/script>/p' *.html >out.js ./* {} \;


sed -n -e '/<script>/,/<\/script>/p' *.html >out.js


sed -n -e '/<script>/,/<\/script>/p' *.html >out.js





find . -type f -exec sed -n -e '/<code class="sourceCode javascript">/,/<\/code>/p' *.html >out.html ./* {} \;




find . -type f -exec sed -n -e '/```js/,/```/p' *.html >out.js ./* {} \;


sed -i 's/<script>//g' out.js
sed -i 's/<\/script>//g' out.js

.*\./<script*
(?<=<script)(.*)(?=<\/script>)
---------------------------------------------------------------------------------------------------------



sudo sed -i '/\.git/d' ./index.html

sudo sed -i '/ <div id="footer-logo"><a href="http:\/\/www\.atlassian\.com\/">Atlassian<\/a><\/div>/d' ./*.html

sudo sed -i '/ <a href="http:\/\/www\.atlassian\.com\/">Atlassian<\/a>/d' ./*.html





sudo sed -i '/ Document generated by Confluence on/d' ./*.html
---------------------------------------------------------------------------------------------------------



Resursivley delete node modules

find . -name 'node_modules' -type d -prune -exec rm -rf '{}' +

find . -name '\.vscode' -type d -prune -exec rm -rf '{}' +
---------------------------------------------------------------------------------------------------------
5.)  Remember Git Credentials:

                git config --global credential.helper store


---------------------------------------------------------------------------------------------------------
find . \( -name ".git" -o -name ".gitignore" -o -name ".gitmodules" -o -name ".gitattributes" \) -exec rm -rf -- {} +
---------------------------------------------------------------------------------------------------------

find . \( -name "*CHANGELOG.md" -o -name "*LICENSE.md" -o -name "*CONTRIBUTING.md" \) -exec rm -rf -- {} +
find . \( -name "*SECURITY.md" -o -name "*RELEASE.md" -o  -name "*CHANGELOG.md" -o -name "*LICENSE.md" -o -name "*CONTRIBUTING.md" \) -exec rm -rf -- {} +
find . \( -name "*SECURITY.txt" -o -name "*RELEASE.txt" -o  -name "*CHANGELOG.txt" -o -name "*LICENSE.txt" -o -name "*CONTRIBUTING.txt" -name "*HISTORY.md" -o -name "*LICENSE" -o -name "*SECURITY.md" -o -name "*RELEASE.md" -o  -name "*CHANGELOG.md" -o -name "*LICENSE.md" -o -name "*CODE_OF_CONDUCT.md" -o -name "*CONTRIBUTING.md" \) -exec rm -rf -- {} +

---------------------------------------------------------------------------------------------------------
git filter-branch --index-filter 'git rm -r --cached --ignore-unmatch assets/_website-components/0-DOJO/widgets-master/output/info/stats.json' HEAD

git filter-branch --index-filter 'git rm -r --cached --ignore-unmatch assets/_00-4-all-time/_0-Random-Repo/zipped.zip' HEAD

git filter-branch --index-filter 'git rm -r --cached --ignore-unmatch assets/_Resource-Hub-Mark_II/azagent/vstsagent.tar.gz' HEAD


git filter-branch --index-filter 'git rm -r --cached --ignore-unmatch assets/_Resource-Hub-Mark_II/azagent/vstsagent.tar.gz' HEAD


git filter-branch --index-filter 'git rm -r --cached --ignore-unmatch assets/_index.html' HEAD



git filter-branch --index-filter 'git rm -r --cached --ignore-unmatch assets/_PDFS/Head_First_Csharp.pdf' HEAD



git filter-branch --index-filter 'git rm -r --cached --ignore-unmatch git filter-branch --index-filter 'git rm -r
--cached --ignore-unmatch assets/_index.html' HEAD' HEAD




git filter-branch --index-filter 'git rm -r --cached --ignore-unmatch assets/_index.html' HEAD

---------------------------------------------------------------------------------------------------------
nano
When you're done, hit CTRL+O to save and CTRL+X to exit Nano. You'll just need to restart the SSH server with one of the following commands.

$ systemctl restart sshd
$ service sshd restart

---------------------------------------------------------------------------------------------------------
Recursivley Create numbered folders:
n=1;
max=50;
while [ "$n" -le "$max" ]; do
  mkdir "s$n"
  n=`expr "$n" + 1`;
done





---------------------------------------------------------------------------------------------------------
Command Line: Rename all files in current directory to a certain file extension:
forfiles /S /M * /C "cmd /c rename @file @fname.js"
forfiles /S /M * /C "cmd /c rename @file @fname.html"


---------------------------------------------------------------------------------------------------------
The following command would rename all *.txt files to *.doc.

$ rename 's/\.txt$/.doc/' *.txt

$ rename 's/\.example$/.sql/' *.example
rename 's/\.js\.download$/.js/' *.js\.download  



find . -name "*.htm" -exec rename 's/\.htm$/.html/' '{}' +


find . -name "*.\.js\.download" -exec rename 's/\.js\.download$/.js/' '{}' +

echo "</body></html>" | tee -a *.html
  

rename 's/\.html\.tmp$/.html/' *.html\.tmp
---------------------------------------------------------------------------------------------------------
find ./ -iname "*.md" -type f -exec sh -c 'pandoc "${0}" -o "${0%.md}.html"' {} \;

------------------------------------From html >md below---------------------------------------------------------------------


find ./ -iname "*.html" -type f -exec sh -c 'pandoc "${0}" -o "${0%.html}.md"' {} \;
---------------------------------------------------------------------------------------------------------
---------------------------------------------------------------------------------------------------------
Recursivley list every single file in the working directory... 1 per line:

ls -R ./ | awk '
/:$/&&f{s=$0;f=0}
/:$/&&!f{sub(/:$/,"");s=$0;f=1;next}
NF&&f{ print s"/"$0 }'


write-to-txt-file

ls -R ./ | awk '
/:$/&&f{s=$0;f=0}
/:$/&&!f{sub(/:$/,"");s=$0;f=1;next}
NF&&f{ print s"/"$0 }'

--------for only html-files------------------------------------------------------------------------------

find ./ | grep -i "\.html*$"
---------------------------------------------------------------------------------------------------------
---------------------------------------------------------------------------------------------------------

---------------------------------------------------------------------------------------------------------
forfiles /S /M *.File /C "cmd /c rename @file @fname.js"

---------------------------------------------------------------------------------------------------------
Recreate folder structure with only specific file types



find . -type f -name '*.html' | cpio -p -d -v './../../../'


find . -type f -name '*.md' | cpio -p -d -v './..'

find . -type f -name '*.png' | cpio -p -d -v './_ext'

find . -name '*.README.md' | cpio -pdm './extension-readme'

find . -name '*.md' | cpio -pdm './../Markdown'


find . -name '*.git' | cpio -pdm './GIT-FOLDERS'
---------------------------------------------------------------------------------------------------------

7.) ()===>

---------------------------------------------------------------------------------------------------------
8.)  Command Prompt: code --list-extensions
for /F "tokens=*" %A in (extensions.list) do code --install-extension %A
---------------------------------------------------------------------------------------------------------
9.)Create a soft link in the home dir
ln -s /mnt/c/0-a-A-October
---------------------------------------------------------------------------------------------------------
10.)
sudo apt update
sudo apt upgrade
git config --global user.name  bryan
git config --global user.email bryan.guner@gmail.com
sudo apt update
sudo apt install build-essential
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.2/install.sh | bash
. ./.bashrc
nvm install --lts
sudo apt install unzip
npm install -g mocha
npm audit fix -F
npm audit fix -f
npm install -g mocha
sudo apt update
sudo apt upgrade
sudo apt install python3
-----------------------------------------------------------------------------------------------------------
Command Line vscode
code --list-extensions
code --disable-extension <ext-name>



sudo groupadd docker
sudo usermod -aG docker $USER
newgrp docker

dockerd

-----------------------------------------------------------------------------------------------------------


killall node



-----------------------------------------------------------------------------------------------------------



sudo service postgresql stop
sudo service postgresql start
sudo service postgresql restart




----------------------------------------
sed -e '/.git/ { 
 $!N
 d
 }'index.html





wget \
     --recursive \ # Download the whole site.
     --page-requisites \ # Get all assets/elements (CSS/JS/images).
     --adjust-extension \ # Save files with .html on the end.
     --span-hosts \ # Include necessary assets from offsite as well.
     --convert-links \ # Update links to still work in the static version.
     --restrict-file-names=windows \ # Modify filenames to work in Windows as well.
     --domains yoursite.com \ # Do not follow links outside this domain.
     --no-parent \ # Don't follow links outside the directory you pass in.
         https://www.instagram.com/mihirbeg/?hl=en


wget \
     --recursive \
     --no-clobber \
     --page-requisites \
     --html-extension \
     --convert-links \
     --restrict-file-names=windows \
     --domains website.org \
     --no-parent \
         www.website.org/tutorials/html/




wget \
     --recursive \
     --no-clobber \
     --page-requisites \
     --html-extension \
     --convert-links \
     --restrict-file-names=windows \
     --domains website.org \
     --no-parent \
https://ankiweb.net/decks/
-----------------------------------------------------------------------------------------------------------





pandoc *.md> -o ./OUTPUT.md


pandoc *.html>  ./OUTPUT.html




Copy file structure without the files:

rsync -a -f"+ */" -f"- *" './'/ './../'/


rsync -a -f"+ */" -f"- *" source/ destination/

-----------------------------------------------------------------------------------------------------------

Remove Script tags and their content:


find ./ -iname "*.html" -type f -exec sh -c 'sed "/<script/,/<\/script>/d" *.html' {} \; >testOut.html

-----------------------------------------------------------------------------------------------------------




cat *.html > node-mod-readme.html




-----------------------------------------------------------------------------------------------------------
Powershell remove numbers and dashes from file names:


Dir | Rename-Item –NewName { $_.name –replace " ","_" }

Dir | Rename-Item –NewName { $_.name –replace "1","" }

Dir | Rename-Item –NewName { $_.name –replace "2","" }

Dir | Rename-Item –NewName { $_.name –replace "3","" }

Dir | Rename-Item –NewName { $_.name –replace "4","" }

Dir | Rename-Item –NewName { $_.name –replace "5","" }

Dir | Rename-Item –NewName { $_.name –replace "6","" }

Dir | Rename-Item –NewName { $_.name –replace "7","" }

Dir | Rename-Item –NewName { $_.name –replace "8","" }

Dir | Rename-Item –NewName { $_.name –replace "9","" }

Dir | Rename-Item –NewName { $_.name –replace "9","" }

Dir | Rename-Item –NewName { $_.name –replace "-","" }

Dir | Rename-Item –NewName { $_.name –replace "0","" }



-----------------------------------------------------------------------------------------------------------




#!/bin/sh

# find ./ | grep -i "\.*$" >files
find ./ | sed -E -e 's/([^ ]+[ ]+){8}//' | grep -i "\.*$">files
listing="files"

out=""

html="index.html"
out="basename $out.html"
html="index.html"
cmd() {

  echo '  <!DOCTYPE html>'
  echo '<html>'
  echo '<head>'

  echo '  <meta http-equiv="Content-Type" content="text/html">'

  echo '  <meta name="Author" content="Bryan Guner">'
  echo '<link rel="stylesheet" href="./assets/prism.css">'
  echo ' <link rel="stylesheet" href="./assets/style.css">'
  echo ' <script async defer src="./assets/prism.js"></script>'

  echo "  <title> directory </title>"

  echo ""
  echo '<style>'


echo '    a {'
echo '      color: black;'
echo '    }'
echo ''
echo '    li {'
echo '      border: 1px solid black !important;'
echo '      font-size: 20px;'
echo '      letter-spacing: 0px;'
echo '      font-weight: 700;'
echo '      line-height: 16px;'
echo '      text-decoration: none !important;'
echo '      text-transform: uppercase;'
echo '      background: #194ccdaf !important;'
echo '      color: black !important;'
echo '      border: none;'
echo '      cursor: pointer;'
echo '      justify-content: center;'
echo '      padding: 30px 60px;'
echo '      height: 48px;'
echo '      text-align: center;'
echo '      white-space: normal;'
echo '      border-radius: 10px;'
echo '      min-width: 45em;'
echo '      padding: 1.2em 1em 0;'
echo '      box-shadow: 0 0 5px;'
echo '      margin: 1em;'
echo '      display: grid;'
echo '      -webkit-border-radius: 10px;'
echo '      -moz-border-radius: 10px;'
echo '      -ms-border-radius: 10px;'
echo '      -o-border-radius: 10px;'
echo '    }'
echo '  </style>'
  echo '</head>'

  echo '<body>'

  echo ""

  #################### continue with the HTML stuff:

  echo ""

  echo ""

  echo "<ul>"

  awk '{print "<li><a href=\""$1"\">",$1,"&nbsp;</a></li>"}' $listing

  # awk '{print "<li>"};

  #   {print " <a href=\""$1"\">",$1,"</a></li>&nbsp;"}' \ $listing

  echo ""

  echo "</ul>"

  echo "</body>"

  echo "</html>"

}

cmd $listing --sort=extension >>$html


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
-----------------------------------------------------------------------------------------------------------

  <pre><code>
  #!/bin/bash 

 
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
  
</code></pre>

-----------------------------------------------------------------------------------------------------------


print a dummy text file in each folder


for x in "./"/*/; do
  (cd "$x"
   files=(*)
   printf '%s\n' "${files[@]}" > deleteme.txt
  )
done

-----------------------------------------------------------------------------------------------------------


download all links of given file type

wget -r -A.pdf https://overapi.com/git






-----------------------------------------------------------------------------------------------------------
for file in *.
do



sudo sed -i '/Copyright/d' ./*.html

done


sudo sed -i '/Support/d' ./*.html
sudo sed -i '/MIT/d' ./*.html
sudo sed -i '/License/d' ./*.html
sudo sed -i '/Contributors/d' ./*.html
sudo sed -i '/Copyright/d' ./*.html
sudo sed -i '/copyright/d' ./*.html
sudo sed -i '/Copyright &copy; /d' ./*.html





sudo sed -i '/\.json/d' ./index.html






sudo sed -i '/\.gif/d' ./index.html





sudo sed -i '/\.png/d' ./index.html





sudo sed -i '/\.css/d' ./index.html




sudo sed -i '/\.js/d' ./index.html


sudo sed -i '/\.php/d' ./index.html


sudo sed -i '/\.md/d' ./index.html

---------------------------------------------------------------------------------------------------------

Remove any lines not contaning string text or blah

sudo sed -i '/\.html/!d' scrap.md


sudo sed -i '/\.html/!d' index.html




sudo sed -i '/CODE-MIRROR/d' ./resources.html





sudo sed -i '/\.html/d' ./index.html

sudo sed -i '/Exported from/d' ./*.html
---------------------------------------------------------------------------------------------------------
Delete Files Over certain Size:

find . -size +75M -a -print -a -exec rm -f {} \;


find . -size +75M -a -exec rm -f {} \;

--------------------------------Recursivly pull and accept incomming merge changes-------------------------------------------------------------------------



git pull -s recursive -X theirs url
---------------------------------------------------------------------------------------------------------
Add text to the first line of every file of a certain extension in a given folder.


for f in *.txt; do printf '%s\n' 0a 'TEXT YOU WISH TO APPEND TO BEGINNING OF EVERY FILE' . x | ex "$f"; done




for f in *.html; do printf '%s\n' 0a '<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>;' . x | ex "$f"; done


https://raw.githubusercontent.com/bgoonz/styling-templates/master/bootstrap3/assets/css/bootstrap.min.css



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
------------------------------------------------------How to add to end of file:------------------------------------------------------


echo "</body></html>" | tee -a *.html



---------------------------------------------------------------------------------------------------------
for f in *.html; do printf '%s\n' 0a '<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>;' . x | ex "$f"; done

echo "</body></html>" | tee -a *.html

---------------------------------------------------------------------------------------------------------

Recursive NPM install:

Usage
$ npm-recursive-install









---------------------------------------------------------------------------------------------------------


for filename in *mesibo*; do echo mv \"$filename\" \"${filename//mesibo/zumzi}\"; done > rename.md







for filename in *mesibo*; do mv "$filename" "${filename//mesibo/zumzi}"; done





for d in */ ; do
    echo "$d"
done

---------------------------------------------------------------------------------------------------------

<form action="https://liveformhq.com/form/bfba7c80-a2f6-41a6-9c61-b2ad3d8e48c5" method="POST" accept-charset="utf-8">
  <input type="hidden" name="_utf8" value="✓">

  <!--
    NOTE: This is an optional field, if your form has a field named '_redirect',
    The user will be redirected to this page after the submission is saved
  -->
  <input type="hidden" value="https://liveformhq.com/thank_you" name="_redirect" />

  <label for="name">Name</label>
  <input type="text" id="name" name="name"> <br />

  <label for="email">Email</label>
  <input type="text" id="email" name="email"> <br />

  <button type="submit">Submit</button>
</form>

---------------------------------------------------------------------------------------------------------

Input Output error


wsl.exe --shutdown          then         Get-Service LxssManager | Restart-Service




---------------------------------------------------------------------------------------------------------

Replace the string source with target in all files in the current directory and all sub-directories:

find . -type f -exec rename 's/source/target/' {} \;
Replace the string source with target in all directories in the current directory and all sub-directories:

find . -type d -exec rename 's/source/target/' {} \;

find . -type f -exec rename 's/\_/-/' {} \;

find . -type f -exec rename 's/\_gif//' {} \;



find . -type f -exec rename 's/\_jpg//' {} \;

find . -type f -exec rename 's/\.svg//' {} \;



find . -type f -exec rename 's/\~/\-/' {} \;

---------------------------------------------------------------------------------------------------------

I use this one-liner to remove invalid characters in subtitle files:

for f in *.srt; do nf=$(echo "$f" |sed -e 's/[^A-Za-z0-9.-]/./g;s/\.\.\././g;s/\.\././g'); test "$f" != "$nf" && mv "$f" "$nf" && echo "$nf"; done
Only process *.srt files( * could be used in place of *.srt to process every file)
Removes all other characters except for letters A-Za-z, numbers 0-9, periods ".", and dash's "-"
Removes possible double or triple periods
Checks to see if the file name needs changing
If true, it renames the file with the mv command, then outputs the changes it made with the echo command
It works to normalize directory names of movies:


for f in */; do nf=$(echo "$f" |sed -e 's/[^A-Za-z0-9.]/./g' -e 's/\.\.\././g' -e 's/\.\././g' -e 's/\.*$//'); test "$f" != "$nf" && mv "$f" "$nf" && echo "$nf"; done


---------------------------------------------------------------------------------------------------------


To remove any number of trailing spaces from file names you can use rename (prename) :

rename  's/ *$//' *




---------------------------------------------------------------------------------------------------------

This shell script sanitizes a directory recursively, to make files portable between Linux/Windows and FAT/NTFS/exFAT. It removes control characters, /:*?"<>\| and some reserved Windows names like COM0.

sanitize() {
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

sanitize_dir './'


sanitize_dir '/path/to/somewhere'





---------------------------------------------------OR------------------------------------------------------------





#!/bin/bash

function sanitize_file_name {
    echo -n $1 | perl -pe 's/[\?\[\]\/\\=<>:;,''"&\$#*()|~`!{}%+]//g;' -pe 's/[\r\n\t -]+/-/g;'
}

filename="Wh00t? it's a -- re@lly-weird {file&name} (with + Plus and__1% #of# [\$qRots\$!]).mov"

cleaned=$(sanitize_file_name "$filename")

echo original : "$filename"
echo sanitised: "$cleaned"










---------------------------------------------------------------------------------------------------------------
Center-Line



    <hr>
    <center>
      <img
        src="https://cloud.netlifyusercontent.com/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/23b9b236-746e-409c-8e86-30b4385e3b72/hr1-raypham.gif"
        alt="hr-line" width="781" height="22">
      <p class="text spotlight">Documentation</p>
    </center>
    <hr>



---------------------------------------------------------------------------------------------------------------






































const findUp = require('find-up');
findUp('test.html').then(filepath => {
  console.log(filepath);
  
});










---------------------------------------------------------------------------------------------------------------


Extract TGZ




for file in `ls -1`; do
       sudo tar -xvf "${file}" ; done






function extract () { 
  if [ -f $1 ] ; then 
    case $1 in 
      *.tar.bz2)   tar xvjf $1    ;; 
      *.tar.gz)    tar xvzf $1    ;; 
      *.tar.xz)    tar Jxvf $1    ;; 
      *.bz2)       bunzip2 $1     ;; 
      *.rar)       rar x $1       ;; 
      *.gz)        gunzip $1      ;; 
      *.tar)       tar xvf $1     ;; 
      *.tbz2)      tar xvjf $1    ;; 
      *.tgz)       tar xvzf $1    ;; 
      *.zip)       unzip -d `echo $1 | sed 's/\(.*\)\.zip/\1/'` $1;; 
      *.Z)         uncompress $1  ;; 
      *.7z)        7z x $1        ;; 
      *)           echo "don't know how to extract '$1'" ;; 
    esac 
  else 
    echo "'$1' is not a valid file!" 
  fi 
} 






find ./ -type f -name "*.tgz" -exec sudo tar -xvf "${file}" 


---------------------------------------------------------------------------------------------------------------


Recursivley remove files by name:


find . -name hts-log.txt -type f -exec rm -rf {} \;
find . -name cookies.txt -type f -exec rm -rf {} \;

find . -name fade.gif -type f -exec rm -rf {} \;







Recursivley remove folders by name.



find . -type f -exec sed -i '/academy/d' ./* {} \;

find . -type f -exec sed -i '/Exported from /d' ./* {} \;


find . -type f -exec sed -i '/define/d' ./* {} \;
---------------------------------------------------------------------------------------------------------------



