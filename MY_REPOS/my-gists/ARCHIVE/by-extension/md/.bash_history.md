sudo apt install udo
sudo pacman -Syu
Copycopy code to clipboard
npm install -g gatsby-cli
npm install -g npm-reinstall
ll
reinstall
npm install -g gatsby-cli
dpkg --get-selections > selections
sudo dpkg --clear-selections
dpkg --get-selections > selections
sudo dpkg --clear-selections
sudo dpkg --set-selections < selections
sudo apt-get --reinstall dselect-upgrade
for i in $(cat list.log); do apt-get install --reinstall "$i"; done
#!/bin/bash
#
# Script to pre-populate apt-get proxy for faster later downloads.
# It uses apt-get and wget to pull all the specified packages.
#
# Make sure only root can run our script
if [[ $EUID -ne 0 ]]; then    echo "You're not root, are you?" 1>&2;    exit 1; fi
git init
npm install -g npm-reinstall
sudo sed -i '/127/d' ./scrap.md
cd "c:\NEW_BOOTCAMP\Lambda\CIRRICULUMN\WEEKS\6-about"
sudo sed -i '/127/d' ./scrap.md
git checkout
git status
git init
git add .
git commit -m "transaction/refs bug fixed"
git push 
sudo sed -i '/src="data:image/d' ./Brit HemmingCodePen.html
sudo sed -i '/src="data:image/d' ./BritHemmingCodePen.html
s
rename 's/\.js\.download$/.js/' *.js\.download  
git checkout
git checkout -b filehistory-preserve
git init
code .
cd ..
code .
sudo apt update
url -s https://packages.gitlab.com/install/repositories/gitlab/gitlab-ce/script.deb.sh | sudo bash
curl -s https://packages.gitlab.com/install/repositories/gitlab/gitlab-ce/script.deb.sh | sudo bash
#!/bin/bash
#
# Script to pre-populate apt-get proxy for faster later downloads.
# It uses apt-get and wget to pull all the specified packages.
#
# Make sure only root can run our script
if [[ $EUID -ne 0 ]]; then    echo "You're not root, are you?" 1>&2;    exit 1; fi
nvm install N/A
nvm ls-remote
PKGLIST=$(dpkg --get-selections | grep -v deinstall| cut -f1)
sudo apt install
sudo apt update
/etc/apt$ cat apt.conf
sudo vim /etc/resolv.conf
ll
sudo apt update
Acquire::http::proxy "http://username:password@company.net:port/";
Acquire::https::proxy "https://username:password@company.net:port/";
Acquire::ftp::proxy "ftp://username:password@company.net:port/";
Acquire::socks::proxy "socks://username:password@company.net:port/";
cd /etc/apt/sources.list
cd ..
/etc/apt$ cat apt.conf
Acquire::http::proxy "http://<proxy>";
Acquire::https::proxy "https://<proxy>";
Acquire::ftp::proxy "ftp://<proxy>";
Acquire::socks::proxy "socks:<proxy>";
cd etc
cd apt
code .
cd ..
code .
su
ll
dpkg --get-selections | grep -v deinstall | awk '{print $1}' > list.log
awk '$1=$1' ORS=' ' list.log > newlist.log
apt-get install --reinstall $(cat newlist.log)
su 
cat apt.conf
cat apt.conf
touch apt.conf
sudo touch apt.conf
Acquire::http::proxy "http://<proxy>";
Acquire::https::proxy "https://<proxy>";
Acquire::ftp::proxy "ftp://<proxy>";
Acquire::socks::proxy "socks:<proxy>";
wget -SO /dev/null http://in.archive.ubuntu.com/ubuntu/dists/xenial/InRelease
wget -SO /dev/null http://archive.ubuntu.com/ubuntu/dists/xenial/InRelease
sudo rm -f stripe-cli-deb
ll
deb https://http.kali.org/kali kali-rolling main non-free contrib
cat apt.conf
Acquire::http::proxy "http://<proxy>";
Acquire::https::proxy "https://<proxy>";
Acquire::ftp::proxy "ftp://<proxy>";
Acquire::socks::proxy "socks:<proxy>";
cat apt.conf Acquire::http::proxy "http://<proxy>";
sudoedit sources.list  
sudo mkdir ~/.trash
man apt-secure
man apt-get
ll
code .
sudo code .
gatsby new project-name https://github.com/LekoArts/gatsby-starter-portfolio-cara
gatsby develop
make
git init
find . -size +75M -a -print -a -exec rm -f {} \;
git pull
git init
git add .
find . -size +75M -a -print -a -exec rm -f {} \;
find . -size +75M -a -print -a -exec rm -f {} \;
find . -size +75M -a -print -a -exec rm -f {} \;
find . -size +75M -a -print -a -exec rm -f {} \;
find . -size +75M -a -print -a -exec rm -f {} \;
git init
git add .
git commit -m "develop"
git remote add origin https://github.com/bgoonz/bg-portfolio2.0.git
git init
git add .
git commit -m "initial commit"
git push 
git push -u origin master
git init
git add .
npm run build
git init
git add .
npm run serve
npm install
gatsby develop
git clone https://github.com/bgoonz/Git-for-Web-Development-Project.git
git init
git add .
git commit -m "update"
git remote add origin https://github.com/bgoonz/Git-for-Web-Development-Project.git
git push 
git push -u origin master
git checkout master
git pull origin master
git merge test
git checkout main
git checkout -b bryan-guner
git init
git add .
git push -u origin bryan-guner
git init
git add .
git commit -m "initial recommit"
git remote add origin https://github.com/bgoonz/Git-for-Web-Development-Project.git
git push -u origin master
git checkout -b bryan-guner
git push -u origin bryan-guner
npm install
chmod -x cypress-install.sh
bash cypress-install.sh
bash cypress-install.sh --fix-missing
sudo apt-get update
npm install
npm run start
npm install
make
git pull
git push 
git checkout -b master
git checkout master
find $dir -type f | sed 's|\(.*/\)[^A-Z]*\([A-Z].*\)|mv \"&\" \"\1\2\"|' | sh
find . -maxdepth 1 -regextype "posix-egrep" -regex '.*/[0-9]+.*\.mp3' -type f
find . -maxdepth 1 -regextype "posix-egrep" -regex '.*/[0-9]+.*\*' -type f
find . -maxdepth 1 -regextype "posix-egrep" -regex '.*/[0-9]+.*\' -type f
Here's something you could do using only bash, with a regex in a conditional:

#! /bin/bash

# get all files that start with a number
for file in [0-9]* ; do
    # only process start start with a number
    # followed by one or more space characters
    if [[ $file =~ ^[0-9]+[[:blank:]]+(.+) ]] ; then
        # display original file name
        echo "< $file"
        # grab the rest of the filename from
        # the regex capture group
        newname="${BASH_REMATCH[1]}"
        echo "> $newname"
        # uncomment to move
        # mv "$file" "$newname"
    fi
done

"
#! /bin/bash
# get all files that start with a number
for file in [0-9]* ; do
    if [[ $file =~ ^[0-9]+[[:blank:]]+(.+) ]] ; then
        echo "< $file"
        newname="${BASH_REMATCH[1]}";         echo "> $newname"
    fi; done
#!/bin/rexx
'rxqueue /clear'
'ls | rxqueue'
do while queued()>0
end
find $dir -type f | sed 's|\(.*/\)[^A-Z]*\([A-Z].*\)|mv \"&\" \"\1\2\"|' | sh
git checkout -b bryan guner
git checkout -b bryanguner
git push 
git push -u bryanguner
git clone https://github.com/BrityHemming/HTML-CSS-Responsive-Practice.git
find . -name "*.zip" | while read filename; do unzip -o -d "`dirname "$filename"`" "$filename"; done;
find . -name "*.zip" -type f -print -delete
make
git pull
git push 
git checkout master
git push -u origin master
git pull
git pull -u origin master
git cloen https://github.com/bgoonz/User-Interface-II.git
git clone https://github.com/bgoonz/User-Interface-II.git
git init
git add .
git commit -m "personal blog to mix w lambda assignment"
git add .
git commit -m "final update"
git push 
find . -name "*.zip" | while read filename; do unzip -o -d "`dirname "$filename"`" "$filename"; done;
find . -name "*.zip" -type f -print -delete
find . -size +75M -a -print -a -exec rm -f {} \;
git init
git add .
git commit -m "i have no idea where i lost my original project"
git remote add origin https://github.com/bgoonz/User-Interface-II.git
git init 
git add .
git commit -m "finally i found it... that was stressful"
git push 
git push -u origin master
git checkout -b bryan-guner-d2
git push -u bryan-guner-d2
git push -u origin bryan-guner-d2
git pull
node test.js
git init
git checkout -b bryan-guner
npm install
npm run test:watch
git clone https://github.com/bgoonz/Introduction-to-JavaScript.git
git checkout -b bryan-guner
make
make 
find $dir -type f | sed 's|\(.*/\)[^A-Z]*\([A-Z].*\)|mv \"&\" \"\1\2\"|' | sh
rename 's/\.js\.download$/.js/' *.js\.download  
node index.js
node personal-testing.js 
git commit -allow-empty -m "Create a CodeGrade submission" && git push
git commit --allow-empty -m "Create a CodeGrade submission" && git push
cd ..
cd cd c
lll
ll
cd mnt
cd c
cd NEW_BOOTCAMP/
ll
cd Lambda/
cd CIRRICULUMN/
cd Curr
cd Current
cd Current-Projects-Folder
npm run test
npx browserslist@latest --update-db
git init
git add .
git commit -m "inished"
git push -u origin bryan-guner
git init
git add .
git commit -m "refactor"
git push -u origin bryan-guner
node index.js
node index.
node index.js
make
git init
git add .
git  commit -m "javascript content update"
git init
git add .
git commit -m "javascript"
git push 
git push -u origin master
git pull
git pull https://github.com/bgoonz/Lambda.git master
git push -u origin master
git pull https://github.com/bgoonz/Lambda.git master
git checkout -b update-backup 
git push -u update-backup
git push -u origin update-backup
git commit --allow-empty -m "Create a CodeGrade submission" && git push
npm install
npm run test
npm run test:watch
git checkout -b bryan-guner
git init
git add .
git commit -m "submission"
git push -u origin bryan-guner
git pulll
git pull 
git pull -u origin master
git pull https://github.com/bgoonz/Lambda.git master
git push https://github.com/bgoonz/Lambda.git master
git pull -s recursive -X ours https://github.com/bgoonz/Lambda.git
git init
git add .
find . \( -name ".git" -o -name ".gitignore" -o -name ".gitmodules" -o -name ".gitattributes" \) -exec rm -rf -- {} +
make
git pull
git push
make
git pull
git checkout master
git init
git add .
│   │       ├│   │       ├
git add .
git commit -m "clock update"
make
git push 
git init
git add .
find . -name "*.zip" | while read filename; do unzip -o -d "`dirname "$filename"`" "$filename"; done;
find . -name "*.zip" -type f -print -delete
node testing2.js 
node testing2.js
node testing2.js >out.md
node testing.js
node testing.js
git init
git add .
git init
git add .
fiftyone quickstart
find . \( -name ".git" -o -name ".gitignore" -o -name ".gitmodules" -o -name ".gitattributes" \) -exec rm -rf -- {} +
make
git push -f
git push -u origin master -f
pip install 51
pip install fiftyone
git push -u origin master -f
git init
git add .
git commit -m "update to deploy"
git push 
make
find . -name "*.zip" | while read filename; do unzip -o -d "`dirname "$filename"`" "$filename"; done;
find . \( -name ".git" -o -name ".gitignore" -o -name ".gitmodules" -o -name ".gitattributes" \) -exec rm -rf -- {} +
find . \( -name "*SECURITY.txt" -o -name "*RELEASE.txt" -o  -name "*CHANGELOG.txt" -o -name "*LICENSE.txt" -o -name "*CONTRIBUTING.txt" -name "*HISTORY.md" -o -name "*LICENSE" -o -name "*SECURITY.md" -o -name "*RELEASE.md" -o  -name "*CHANGELOG.md" -o -name "*LICENSE.md" -o -name "*CODE_OF_CONDUCT.md" -o -name "*CONTRIBUTING.md" \) -exec rm -rf -- {} +
find . -name "*.zip" -type f -print -delete
git submodule add https://github.com/bgoonz/Links-Shortcut-Site.git
git submodule add https://github.com/bgoonz/Links-Shortcut-Site.git -f
git init
git add .
git commit -m "submodule bug fix try number 2 and general code formatting"
find . -name "*.zip" -type f -print -delete
tree -d >output.md
tree -d -L 5 >output.md
git init 
git add .
tree -d -L 5 >output.md
git init
git add .
git push
node breakout.js
npm install
git init
git add .
git commit -m "stretch problems complete"
git checkout -b bryan-guner
git push -u origin bryan-guner
find . -name "*.zip" | while read filename; do unzip -o -d "`dirname "$filename"`" "$filename"; done;
find . -name "*.zip" -type f -print -delete
find . \( -name ".git" -o -name ".gitignore" -o -name ".gitmodules" -o -name ".gitattributes" \) -exec rm -rf -- {} +
find . \( -name "*SECURITY.txt" -o -name "*RELEASE.txt" -o  -name "*CHANGELOG.txt" -o -name "*LICENSE.txt" -o -name "*CONTRIBUTING.txt" -name "*HISTORY.md" -o -name "*LICENSE" -o -name "*SECURITY.md" -o -name "*RELEASE.md" -o  -name "*CHANGELOG.md" -o -name "*LICENSE.md" -o -name "*CODE_OF_CONDUCT.md" -o -name "*CONTRIBUTING.md" \) -exec rm -rf -- {} +
pip3 install algorithms
npx create-react-app
npx  create-react-app my-react-app
make
git commit -m "all day update"
git push 
git pull
git init
git add .
make
npx lambda-react app-name
git clone https://github.com/bgoonz/Lambda.git
sudo git clone  https://github.com/bgoonz/Lambda.git
ll
git init
sudosu gi git init
sudo git init
git add .
git checkout bryan-guner
git init
git add .
git init
sudo git init
sudo git add .
git init
git remote add origin https://github.com/bgoonz/animated-landing.git
git add .
git commit -m "initial commit"
git push -u origin master
sudo git push -u origin master
git filter-branch --index-filter 'git rm -r --cached --ignore-unmatch2-resources/_Past-Projects/LambdaSchool-master/m4/41c1/middleware/middleware
git filter-branch --index-filter 'git rm -r --cached --ignore-unmatch2-resources/_Past-Projects/LambdaSchool-master/m4/41c1/middleware/middleware' HEAD
git add .
git filter-branch --index-filter 'git rm -r --cached --ignore-unmatch2-resources/_Past-Projects/LambdaSchool-master/m4/41c1/middleware/middleware' HEAD
git rm -cached 2-resources/_Past-Projects/LambdaSchool-master/m4/41c1/middleware/middleware
git rm --cached 2-resources/_Past-Projects/LambdaSchool-master/m4/41c1/middleware/middleware
git add .
git commit -m "updates and fixes leading up to auto toc"
git push 
git fsck
git rm --cached 2-resources/_Past-Projects/LambdaSchool-master/m4/41c1/middleware/middleware
git fsck
sudo git init
git add .
git init
git add .
git commit - "git deploy issues"
git commit -m "git deploy issues"
git push 
git pull
git push -u origin master
git push -u origin master -f
git init
git add .
make
git push 
git pull
git push -u origin master
git rm --cached 2-resources/_Past-Projects/LambdaSchool-master/m4/41b1/noderouting/noderouting
git push 
git init
git add .
git commit -m "git rm cache submodule"
git push 
git filter-branch --index-filter 'git rm -r --cached --ignore-unmatch assets/_2-resources/_Past-Projects/LambdaSchool-master/m4/41b1/noderouting/noderouting' HEAD
git init
git add .
git commit -m "git rm cache submodule"
git prune
git push  
git pull
git commit -m "go"
git add  css/main-style.css
git add index.html
git commit -m "go"
git push 
git push -f
git filter-branch --index-filter 'git rm -r --cached --ignore-unmatch assets/_1-projects/d2/Git-for-Web-Development-Project-main/Git-for-Web-Development-Project-main/Git-for-Web-Development-Project' HEAD
git rm -r --cached 1-projects/d2/Git-for-Web-Development-Project-main/Git-for-Web-Development-Project-main/Git-for-Web-Development-Project
git rm -r --cached 1-projects/d2/Git-for-Web-Development-Project-main/Git-for-Web-Development-Project-main
git rm  --cached 1-projects/d2/Git-for-Web-Development-Project-main/Git-for-Web-Development-Project-main
git rm --cached 2-resources/_Past-Projects/LambdaSchool-master/m4/42a1/dbintro/dbintro
git init
git add .
git commit -m "update"
git push 
git push  -f
node sandbox.js 
git init
git add .
git commit -m "up to task 5
"
git push 
git push -u origin bryan-guner
node sandbox.js 
git iit
git init
git add .
git commit -m "update"
git push -u origin bryan-guner
git init
git add .
git commit -m "initial commit"
git checkout -b bryan-guner
npm install
npm run test:watch
curl https://bootstrap.pypa.io/get-pip.py -o get-pip.py
code .
python3 get-gists.py ourmaninamsterdam
sudo apt install python3
sudo apt upgrade python3
sudo apt install pip3
curl https://bootstrap.pypa.io/get-pip.py -o get-pip.py
sudo apt install pip3
python3 get-gists.py ourmaninamsterdam
git rm 
git rm 2-resources/_Past-Projects/LambdaSchool-master/m4/42a1/migrations/migrations
git rm 2-resources/_Past-Projects/LambdaSchool-master/m4/42a1/migrations/migrations -f
git rm 2-resources/_Past-Projects/LambdaSchool-master/m4/42a1/migrations -f
git rm -r 2-resources/_Past-Projects/LambdaSchool-master/m4/42a1/migrations -f
explorer.exe .
code .
sudo apt update
sudo apt upgrade
git checkout -b bg
cd ..
git checkout -b bg
git push -u origin bg
rm -rf *
sudo rm -rf *
cd ..
sudo rm -rf *
python3 get-pip.py
sudo python3 get-pip.py
code .
make
git submodule update -f --init
make
git init
node hello_fetch.js 
python3 get-gists.py bgoonz
find . \( -name ".git" -o -name ".gitignore" -o -name ".gitmodules" -o -name ".gitattributes" \) -exec rm -rf -- {} +
find . \( -name ".git" -o -name ".gitignore" -o -name ".gitmodules" -o -name ".gitattributes" \) -exec rm -rf -- {}
find . \( -name ".git" -o -name ".gitignore" -o -name ".gitmodules" -o -name ".gitattributes" \) -exec rm -rf -- {} +
npm i -g lebab
git pull
make
npm install
npm init -y
npm install node-fetch
sudo python3 get-gists.py ourmaninamsterdam
python3 get-gists.py k8scat
find . \( -name ".git" -o -name ".gitignore" -o -name ".gitmodules" -o -name ".gitattributes" \) -exec rm -rf -- {} +
node gistfile1.js 
npm install netlify-cli -g
cat * > ../merged-file.md
npm install -g codedown
cat *.html | codedown javascript > code.js
npm install codedown
cat *.html | codedown javascript > code.js
cat *.md | codedown javascript > code.js
npm install
npm audit fix -f
sudo npm install -f 
make
git init
git add .
git init
git add .
git commit - "manually cleaned git folder"
git pull
git push 
git checkout master
npm install markdown-magic --save-dev
make
find . -empty -type f -print -delete
find . -empty -type d -print -delete
find $dir -type f | sed 's|\(.*/\)[^A-Z]*\([A-Z].*\)|mv \"&\" \"\1\2\"|' | sh
rename  's/ *$//' *
sudo apt install rename
rename  's/ *$//' *
find . -type d -exec rename  's/ *$//' *' {} \;
"
;
sanitize() {   shopt -s extglob;   filename=$(basename "$1");   directory=$(dirname "$1")   filename_clean=$(echo "$filename" | sed -e 's/[\\/:\*\?"<>\|\x01-\x1F\x7F]//g' -e 's/^\(nul\|prn\|con\|lpt[0-9]\|com[0-9]\|aux\)\(\.\|$\)//i' -e 's/^\.*$//' -e 's/^$/NONAME/')   if (test "$filename" != "$filename_clean");   then     mv -v "$1" "$directory/$filename_clean";   fi; }
export -f sanitize
sanitize_dir() {   find "$1" -depth -exec bash -c 'sanitize "$0"' {} \;; }
sanitize_dir './'
python3 get-gists.py bgoonz
sudo npm install -f 
sudo apt install npm
python3 get-gists.py DavidWells 
python3 get-gists.py DavidWells
git init
git add .
gc
git commit -m "hi"
git push
git push i u origin master
git commit -m "go
:
git commit -m "hi"
git push
git push -u origin master
sudo git push -u origin master
find . -empty -type f -print -delete
find . -empty -type d -print -delete
git git init
git init
git add .
git commit -m "initial commit in new home repo"
git add .
git commit -m "initial commit in new home repo"
git push -u origin master
git push -u origin master -f
find . -size +75M -a -print -a -exec rm -f {} \;
find . \( -name ".git" -o -name ".gitignore" -o -name ".gitmodules" -o -name ".gitattributes" \) -exec rm -rf -- {} +
find . \( -name ".git" -o -name ".gitignore" -o -name ".gitmodules" -o -name ".gitattributes" \) -exec rm -rf -- {} +
find . \( -name ".git" -o -name ".gitignore" -o -name ".gitmodules" -o -name ".gitattributes" \) -exec rm -rf -- {} +
git remote add origin https://github.com/bgoonz/lambda-redeploy.git
npm install netlify-lambda
git init
git init
git add .
git init
git add .
git commit -m "update and backup directory"
git push 
git init 
git add .
git pull
git pull -u origin master
git pull https://github.com/bgoonz/my-gists.git master
git init
git add .
git commit -m "wubalubadubdub"
git push -u origin master
git remote add origin https://github.com/bgoonz/my-gists.git
git push -u origin master
sudo apt install python3
python3 get-gists.py bgoonz
find . \( -name ".git" -o -name ".gitignore" -o -name ".gitmodules" -o -name ".gitattributes" \) -exec rm -rf -- {} +
git init
git add .
git commit -m "initil commit"
git pull
sudo git pull
git commit -m "update"
git add .
git init
git init
npm init -y 
npm install -g http-server
npm install  http-server
git submodule add https://github.com/00-joe-js/metronome.git
git remote add origin https://github.com/bgoonz/Standalone-Metranome.git
git commit -m "initial commit"
git push 
git push -u origin master
git init
git add .
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
sudo sed -i '/\.git/d' ./index.html
sudo sed -i '/\.html/!d' ./index.html
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
sudo sed -i '/:::/d' ./*.mc
sudo sed -i '/Blog at WordPress/d' ./index.html
find . -type f -exec sed -i '/Blog at WordPress/d' ./* {} \;
git init
git add .
git commit -m "deploy"
git push 
git add .
git commit -m "deploy"
git push 
git init
git add .
git commit -m "initial commit"
git push 
git pull
git push 
git add .
git commit -m "initial commit"
git push 
git add .
git commit -m "documentation refactor & bug fixes as well as partially completed README"
git push 
git pull
git push 
git add .
git commit -m "documentation refactor & bug fixes as well as partially completed README"
git push 
git pull
git push 
git add .
git commit -m "documentation refactor & bug fixes as well as partially completed README"
tree -L 4
git add .
git commit -m "documentation refactor & bug fixes as well as partially completed README"
git push 
tree -L 4
.
├── Cowbell-1.wav
├── README.md
├── UU0PoDIx7v.gif
├── _config.yml
├── alt-implementation-number3
│   ├── index.css
│   ├── index.html
│   └── index.js
├── backup
git pull
git push 
git config --system core.longpaths true
sudo git config --system core.longpaths true
git lfs install
sudo git lfs install
rename 's/\.js\.download$/.js/' *.js\.download  
node w3d1.js 
node w3
node w3d1.js 
node newFile.js 
node w3d1.js 
node newFile.js 
git remote add https://github.com/bgoonz/Lambda.git
git remote add origin  https://github.com/bgoonz/Lambda.git
find . \( -name ".git" -o -name ".gitignore" -o -name ".gitmodules" -o -name ".gitattributes" \) -exec rm -rf -- {} +
find . -name "*.zip" | while read filename; do unzip -o -d "`dirname "$filename"`" "$filename"; done;
find . -name "*.zip" -type f -print -delete
git remote remove origin
git init
git remote add origin https://github.com/RelativeTech/Lambda.git
git pull
git pull https://github.com/bgoonz/Lambda.git master
git pull -s recursive -X ours https://github.com/bgoonz/Lambda.git
git push 
git push -u origin master
git init
git add .
git pull 
git pull https://github.com/bgoonz/Lambda.git master
git pull -s recursive -X theirs url
git pull -s recursive -X ours https://github.com/bgoonz/Lambda.git
git add .
git commit -m "fixing git deploy issues"
git push -u origin master
git push -u origin master -f
find . -name "*.zip" | while read filename; do unzip -o -d "`dirname "$filename"`" "$filename"; done;
find . -name "*.zip" -type f -print -delete
python3 gist.py jonschlinkert
python3 gist.py rauchg
python3 gist.py colossus9
pyhon3 gist.py ashtom
python3 gist.py ashtom
python3 gist.py Rich-Harris
python3 gist.py sevilayha
python3 gist.py dmalan
python3 gist.py hzoo
python3 gist.py bradtraversy
python3 gist.py getify
python3 gist.py 4
python3 gist.py coderabbi
python3 gist.py nat
python3 gist.py dend
python3 gist.poy ] 
python3 gist.py tj
python3 gist.py fabpot 
python3 gist.py yegor256
python3 gist.py orta
python3 gist.py jwiegley 
python3 gist.py ericelliott
cat *.markdown | codedown javascript > code.js
git reset
ll
cd Lambda
git reset 
sudo git reset 
ll
cd Lambda/
;;
ll
git reset
git checkout *
git init
git add .
git pull
git init
git add .
cat *.md | codedown javascript > code.js 
cat *.markdown | codedown javascript > code.js
npm install linebyline
npm install .
npm test
npm install -g codedown
python3 gist.py STRML
python3 gist.py dcramer
python3 gist.py jskeet
python3 gist.py Gokulakrishnan
python3 gist.py gokulkrishh
python3 gist.py ScottPhillips
python3 gist.py getify
pythoon3 gist.py BrityHemming
python3 gist.py BrityHemming
python3 gist.py Wilhelm Klopp
pythoon3 gist.py wilhelmklopp
python3 gist.py wilhelmklopp
find . \( -name ".git" -o -name ".gitignore" -o -name ".gitmodules" -o -name ".gitattributes" \) -exec rm -rf -- {} +
rename 's/\.js\.download$/.js/' *.js\.download  
git pull
git init
git add .
git commit -m "update to pull"
git pull
make 
jest --verbose --watchAll
node quiz.js 
git checkout -b  bryan-guner
git init
git add .
git commit -m "hi"
git push -u origin bryan-guner
git checkout bryan-guner
git checkout -b bryan guner
git checkout -b bryan-guner
git init
git add .
git commit -m "submission"
git push 
git push -u origin bryan-guner
npm run test:watch
npm install
npm run test:watch
git checkout -b bryan-guner
git checkout -b  bryan-guner
npm run test:watch
git checkout -b bryan-guner
git init
git add .
git commit -m "first commit"
git push -u origin bryan-guner
git add .
git commit -m "short answer questions"
git push -u origin bryan-guner
npm run test:watch
git add .
git commit -m "up to volume"
git push -u origin bryan-guner
npm run test:watch
npm install
git add .
git commit -m "summation"
git push -u origin bryan-guner
git commit -m "up to callbacks"
git add .
git commit -m "up to callbacks"
git push -u origin bryan-guner
node sandbox.js 
npm run test:watch
git init
git add .
git commit -m "all passing"
git push -u origin bryan-guner
cd __tests__/
node index.test.js 
find . -size +75M -a -print -a -exec rm -f {} \;
find . -size +75M -a -print -a -exec rm -f {} \;
find . -size +75M -a -print -a -exec rm -f {} \;
find . -size +75M -a -print -a -exec rm -f {} \;
find . -size +75M -a -print -a -exec rm -f {} \;
find . -size +75M -a -print -a -exec rm -f {} \;
git init
find . -size +75M -a -print -a -exec rm -f {} \;
rename 's/\.js\.download$/.js/' *.js\.download  
find . -size +75M -a -print -a -exec rm -f {} \;
find . -name "*.zip" | while read filename; do unzip -o -d "`dirname "$filename"`" "$filename"; done;
find . -name "*.zip" -type f -print -deletefind . -name "*.zip" | while read filename; do unzip -o -d "`dirname "$filename"`" "$filename"; done;
find . -name "*.zip" -type f -print -delete
git pull
git pull -f
git pull
find . -name "*.zip" | while read filename; do unzip -o -d "`dirname "$filename"`" "$filename"; done;
find . -name "*.zip" -type f -print -delete
git init
git add .
git commit -m "update code camp content"
git add ./7-assets/_SNIPPETS
sudo apt install rsync
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
find . -name 'node_modules' -type d -prune -exec rm -rf '{}' +
find . -type f -exec rename 's/MASTER//g' {} +
find . -type d -exec rename 's/MASTER//g' {} +
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
git add .
python3 gist.py albinekb
python3 gist.py 
python3 gist.py  gaearon
python3 gist.py NHQ
python3 gist.py spencermountain
python3 gist.py ____________________________________o>
python3 gist.py cwilso
python3 gist.py bakarih
python3 gist.py maxboeck
python3 gist.py joemccann
find . \( -name ".git" -o -name ".gitignore" -o -name ".gitmodules" -o -name ".gitattributes" \) -exec rm -rf -- {} +
find . -empty -type f -print -delete
python3 gist.py chrispederick
python3 gist.py jafrog
python3 gist.py paulirish
find . \( -name ".git" -o -name ".gitignore" -o -name ".gitmodules" -o -name ".gitattributes" \) -exec rm -rf -- {} +
python3 python3 gist.py 
python3 gist.py maxboeck
python3 gist.py andreasbm
python3 gist.py juliejonak
python3 gist.py cooervo
python3 gist.py greglobinski
find . \( -name ".git" -o -name ".gitignore" -o -name ".gitmodules" -o -name ".gitattributes" \) -exec rm -rf -- {} +
git init
sudo apt-get install ruby-full
sudo apt update
sudo apt upgrade
sudo apt-get install ruby-full
sudo apt autoclean
sudo apt autoremove
sudo apt get  autoremove
sudo gedit /etc/default/grub &
sudo apt-get install preload
sudo add-apt-repository ppa:apt-fast/stable
sudo apt-get install apt-fast
sudo gedit /etc/apt/apt.conf.d/00aptitude
sudo add-apt-repository ppa:linrunner/tlp
sudo apt-get install tlp tlp-rdw
sudo apt-get install indicator-cpufreq
sudo apt-get install preload
sudo apt-get install apt-fast
sudo add-apt-repository ppa:linrunner/tlp
sudo apt-get update
sudo apt-get install tlp tlp=rdw
sudo apt-get install tlp tlp-rdw
sudo tlp start
sudo apt-get clean
sudo apt-get autoremove
du -sh ~/.cache/thumbnails
sudo apt-get install compizconfig-settings-manager
sudo gedit /etc/default/grub
sudo add-apt-repository ppa:linrunner/tlp
sudo apt-get install tlp tlp-rdw
sudo tlp start
sudo add-apt-repository ppa:ubuntuhandbook1/apps
sudo apt-get install laptop-mode-tools
gksu lmt-config-gui
sudo add-apt-repository ppa:apt-fast/stable
sudo apt-get install apt-fast
sudo apt-get clean
gksudo leafpad /etc/sysctl.conf
sudo update-grub2
sudo sysctl vm.swappiness=10
gksu gedit /etc/sysctl.conf
vm.swappiness=10
git pull
git push -u origin master -f
make
git pull
git push -u origin master -f
sudo snap install ruby --classic
sudo apt install snap
sudo snap install ruby --classic
sudo snap install ruby 
udo snap switch ruby --channel=2.3/stable
sudo apt install udo
udo snap switch ruby --channel=2.3/stable
ll
code .
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
lebab --replace ./ --transform obj-method
lebab --replace ./ --transform class
lebab --replace ./ --transform arrow
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
lebab --replace ./ --transform class
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
var path = require('path');
var fs = require('fs');
var _0777 = parseInt('0777', 8);
module.exports = mkdirP.mkdirp = mkdirP.mkdirP = mkdirP;
function mkdirP (p, opts, f, made) {
}
mkdirP.sync = function sync (p, opts, made) {
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
lebab --replace ./ --transform obj-method
lebab --replace ./ --transform class
lebab --replace ./ --transform arrow
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
lebab --replace ./ --transform let
git remote add origin https://github.com/bgoonz/meditation-app.git
git remote add origin https://github.com/bgoonz/meditation-app.gitgit remote add origin https://github.com/bgoonz/meditation-app.gitgit remote add origin https://github.com/bgoonz/meditation-app.gitgit remote add origin https://github.com/bgoonz/meditation-app.git
git remote add origin https://github.com/bgoonz/meditation-app.git
git push -u origin master -f
git add .
git commit -m "update"
"update"
git commit -m "update"
git remote add origin https://github.com/bgoonz.meditation-app.git
git commit -m "update"
git push -u origin master
tree 
git init
git add .
git commit -m "improved readme"
git push 
git pull
git push -f
git checkout -b backup
git init
git add .
git commit -m "backup"
git push -u backup
git push -u origin backup
find . \( -name ".git" -o -name ".gitignore" -o -name ".gitmodules" -o -name ".gitattributes" \) -exec rm -rf -- {} +
python3 gist.py  ahejlsberg
karlhorkykarlhorky
python3 gist.py  ahejlsberg
python3 gist.py benurb
python3 gist.py sagold
python3 gist.py frankenjoe
python3 gist.py pichfl
python3 gist.py  jamescryer
python3 gist.py isaacs
python3 gist.py knicklabs
python3 gist.py  nathansmith
python3 gist.py karlhorky
python3 gist.py jordanmccullough
python3 gist.py alexlawrence
python3 gist.py eemeli
python3 gist.py Chalarangelo
python3 gist.py nathansmith
python3 gist.py hudsonsmith
python3 gist.py dideler
python3 gist.py jhnns
python3 gist.py  nn
python3 gist.py flootr
python3 gist.py jbjonesjr
python3 gist.py azproduction
git init
make
python3 gist.py fejes713
python3 gist.py trevortwining
python3 gist.py sindresorhussindresorhus
python3 gist.py ry
python3 gist.py 
LeaVerou
python3 gist.py Trinityyi
python3 gist.py sdras
python3 gist.py flxwu
python3 gist.py izs
python3 gist.py evocateur
python3 gist.py fejes713
python3 gist.py forivall
npm install -g npm@7.10.0
sudo npm install -g npm@7.10.0
npm install
npm install mocha -g
npm install -g npm@7.10.0
sudo npm install -g npm@7.10.0
sudo apt update
code .
