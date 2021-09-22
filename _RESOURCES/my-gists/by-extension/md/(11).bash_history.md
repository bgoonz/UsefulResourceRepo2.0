<script async defer src="./prism.js"></script>
</head>
<body>;' . x | ex "$f"; done
echo "</body></html>" | tee -a *.html
git remote add origin https://github.com/bgoonz/web-dev-notes-resource-site.git
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
git init
git add .
git commit -m "tidying up"
git push 
git pull
git remote remove origin
git remote add origin https://github.com/bgoonz/web-dev-resource-hub.git
git push -u origin master
find . -size +75M -a -print -a -exec rm -f {} \;
git init
git add .
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
find . -name '*.md' | cpio -pdm './../Markdown'
find . -type f -name '*.md' | cpio -p -d -v './..'
find . \( -name "*SECURITY.txt" -o -name "*RELEASE.txt" -o  -name "*CHANGELOG.txt" -o -name "*LICENSE.txt" -o -name "*CONTRIBUTING.txt" -name "*HISTORY.md" -o -name "*LICENSE" -o -name "*SECURITY.md" -o -name "*RELEASE.md" -o  -name "*CHANGELOG.md" -o -name "*LICENSE.md" -o -name "*CODE_OF_CONDUCT.md" -o -name "*CONTRIBUTING.md" \) -exec rm -rf -- {} +
git init 
git add .
git commit -m "added extra practice"
git push 
npm install bit-bin -g
npm install
git pull https://github.com/bgoonz/udemy-react-translator.git
git clone https://github.com/bgoonz/udemy-react-translator.git
git init
git remote add origin https://github.com/bgoonz/udemy-react-translator.git
git pull
git pull -f
git add .
git commit -m "initial commit"
git push -u origin master
git pull
git add .
git commit -m "pull"
git push 
git pull
find . -name "*.zip" | while read filename; do unzip -o -d "`dirname "$filename"`" "$filename"; done;
find . -name "*.zip" | while read filename; do unzip -o -d "`dirname "$filename"`" "$filename"; done;
find . -name "*.zip" | while read filename; do unzip -o -d "`dirname "$filename"`" "$filename"; done;
find . -name "*.zip" | while read filename; do unzip -o -d "`dirname "$filename"`" "$filename"; done;
find . -name "*.zip" | while read filename; do unzip -o -d "`dirname "$filename"`" "$filename"; done;
cd ..
ll
cd ..
sudo find /./-type d -user root -exec sudo chown -R $USER: {} +~
sudo find /./-type d -user root -exec sudo chown -R $bryan: {} +~
sudo chown -R bryan ./
ll
cd ..
git init
git add .
git commit -m "new home"
git status 
git init
git remote add origin https://github.com/bgoonz/web-dev-resource-hub.git
make git m="your message"
git add .
git hash-object -w Collection/0-assets/Checkout-Later/JavaScript-Simplified-Advanced-Projects-main/JavaScript-Simplified-Advanced-Projects-main/calculator/after/Calculator.js
make git m="trying out a makefile"
npm install bit-bin -g
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
find . -empty -type f -print -delete
find . -empty -type d -print -delete
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
find . -empty -type d -print -delete
git init
git add .
git commit -m "valid file names"
git push
git push -u origin master -f
find . -size +75M -a -print -a -exec rm -f {} \;
find . -size +75M -a -print -a -exec rm -f {} \;
git init
git add .
find . -empty -type f -print -delete
git add .
git commit -m "structure"
git push 
git add .
git commit -m "huh"
git push 
git add .
git commit -m "huh"
git push 
git add .
git commit -m "huh"
git push 
git remote add origin https://github.com/bgoonz/Cheat-Sheets.git
git init
git add .
git commit -m "wubalubadubdub"
git push
git remote remove origin
git remote add origin https://github.com/bgoonz/Cheat-Sheets.git
git add .
git commit -m "ughhhhhhh"
git push -u origin master
git filter-branch --index-filter 'git rm -r --cached --ignore-unmatch assets/_PDFS/Head_First_Csharp.pdf' HEAD
git init
git add .
git commit -m "ughhhhhhh"
git push -u origin master
git init
git add .
git commit -m "go go go"
git push 
git push -u origin master
git push -u origin master -f
npm install -g create-react-app
sudo apt update
sudo apt install build-essential checkinstall libssl-dev
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.35.1/install.sh | bash
cd .nvm
git fetch
sudo git fetch
cd ..
code .
cd..
cd ..
cd etc
cd apt
sudoedit sources.list  
ll
cd .
cd ..
cd
sudo eopkg install nodejs
sudo apt install eopkg
npm install -g n
n lts
sudo npm install -g n
sudo n lts
node -v
npm -v
cd ..
cd /usr/pkgsrc/lang/nodejs && make install
curl "https://nodejs.org/dist/latest/node-${VERSION:-$(wget -qO- https://nodejs.org/dist/latest/ | sed -nE 's|.*>node-(.*)\.pkg</a>.*|\1|p')}.pkg" > "$HOME/Downloads/node-latest.pkg" && sudo installer -store -pkg "$HOME/Downloads/node-latest.pkg" -target "/"
mkdir Downloads
curl "https://nodejs.org/dist/latest/node-${VERSION:-$(wget -qO- https://nodejs.org/dist/latest/ | sed -nE 's|.*>node-(.*)\.pkg</a>.*|\1|p')}.pkg" > "$HOME/Downloads/node-latest.pkg" && sudo installer -store -pkg "$HOME/Downloads/node-latest.pkg" -target "/"
sudo snap install node --classic --channel=14
git pull
git init
git add .
git commit -m "secondish commit"
git commit -n "wub"
git commit -n 
git pull
git pull -f
git commit -m "please" -f
git commit -m "please" 
git commit -m -n "please" 
git commit -m -n "./" 
git push 
git push  -f
git init
git add .
git commit -m "please" 
npm install
git add .
git commit -m "please" 
node foundation.js
git init
git add .
git commit -m "initial commit"
git remote add origin https://github.com/bgoonz/the-one-DSPac-2-rule-them-all.git
git push -u origin master
npm login
npm init 
npm install
git init
ll
git remote add origin https://github.com/bgoonz/jsanimate.git
git init
git add .
git commit -m "initial commit"
git push 
git push -u origin master
git init
git add .
git commit -m "outter folder"
git push 
git add .
git commit -m "demo.gif"
git push 
git pull
cd "c:\\MY-WEB-DEV\\02-cloned-repos\\_AA-Clones\\victor\\personal-site-master\\personal-site-master"
npm install
npm init -y
npm install -f
heroku login
npm install -g heroku-cli
heroku login
sudo snap install heroku --classic
sudo apt install snap
sudo snap install heroku --classic
npm install
npm install -f
npm audit fix -f
git init
git add .
git commit -m "initial commit"
git remote add origin https://github.com/bgoonz/React-Admin-Dashboard.git
git push -u origin master
npm install algoliasearch instantsearch.js
heroku login 
heroku join
sudo snap install --classic heroku
curl https://cli-assets.heroku.com/install.sh | sh
heroku login 
heroku git:remote -a bg-dev-docs
git add .
git commit -am "make it better"
git push heroku master
git init
git add .
git commit -m "heroku"
git push heroku master
git push 
heroku logs --tail
npm run build
npm run serve
npm run swizzle
npm run start
npm run start
git init
git add .
git commit -m "editing"
git push 
git push -u origin master
npm start
git init
git add .
git remote add origin https://github.com/bgoonz/Documentation-site-react.git
git commit -m "vscode commit"
npm install
git init
git add .
git commit -m "fixed link bug"
git push 
git add .
git commit -m "favicon.ico"
git push 
git init
git add .
git commit -m "stable"
git push 
git init
git add .
git commit -m "stable"
git add .
git commit -m "stable"
git push 
git init
git add .
git commit -m "added blog posts"
git push 
git add .
git commit -m "added blog posts"
git push 
git add .
git commit -m "added blog posts"
git push 
npm uninstall -g create-react-app,
find . -type f -exec sed -i '/appacademy/d' ./*.md {} \; 
find . -type f -exec sed -n -e '/```js/,/```/p' *.html >out.js ./* {} \;
npm start
npm start
gh pr checkout 5
sudo apt install gitsome
gh pr checkout 5
tree
tree
npm install
npm start
npm run start
npm run build
npm install
npm install -f
cd ..
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
curl -X POST https://connect.stripe.com/oauth/token -d client_secret=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 -d code=ac_J3UQOIKZt95Eq0L1yAQR9yvhAYjytXOd -d grant_type=authorization_code
stripe login
sudo apt install stripe-cli
pip install --upgrade stripe
ll
mkdir repos
cd repos
git clone https://github.com/stripe-samples/connect-onboarding-for-express
curl https://api.stripe.com/v1/charges/ch_1IROI1AsSzkI1bY8o5o7NM4N   -u sk_test_51IRNOwAsSzkI1bY8DXwKwxZBF0Z7myF8xv8ceskuxfBfdnaj7K9TVFIzt3svY5cDVMlbj5lnrPQhpxssdHmvMNMR00acgr6KTz:   -H "Stripe-Account: acct_1IRNOwAsSzkI1bY8"   -G
curl https://api.stripe.com/v1/charges/ch_1IROI1AsSzkI1bY8o5o7NM4N   -u sk_test_51IRNOwAsSzkI1bY8DXwKwxZBF0Z7myF8xv8ceskuxfBfdnaj7K9TVFIzt3svY5cDVMlbj5lnrPQhpxssdHmvMNMR00acgr6KTz:   -d "expand[]"=customer   -d "expand[]"="invoice.subscription"   -G
curl https://api.stripe.com/v1/charges   -u sk_test_51IRNOwAsSzkI1bY8DXwKwxZBF0Z7myF8xv8ceskuxfBfdnaj7K9TVFIzt3svY5cDVMlbj5lnrPQhpxssdHmvMNMR00acgr6KTz:   -H "Idempotency-Key: buim2Jwfn1lHhFOQ"   -d amount=2000   -d currency=usd   -d description="My First Test Charge (created for API docs)"   -d source=tok_amex
curl https://api.stripe.com/v1/charges   -u sk_test_51IRNOwAsSzkI1bY8DXwKwxZBF0Z7myF8xv8ceskuxfBfdnaj7K9TVFIzt3svY5cDVMlbj5lnrPQhpxssdHmvMNMR00acgr6KTz:   -d amount=2000   -d currency=usd   -d source=tok_mastercard   -d "metadata[order_id]"=6735
# The auto-pagination feature is specific to Stripe's
curl https://api.stripe.com/v1/customers   -u sk_test_51IRNOwAsSzkI1bY8DXwKwxZBF0Z7myF8xv8ceskuxfBfdnaj7K9TVFIzt3svY5cDVMlbj5lnrPQhpxssdHmvMNMR00acgr6KTz:   -D "-"   -X POST
curl https://api.stripe.com/v1/charges   -u sk_test_51IRNOwAsSzkI1bY8DXwKwxZBF0Z7myF8xv8ceskuxfBfdnaj7K9TVFIzt3svY5cDVMlbj5lnrPQhpxssdHmvMNMR00acgr6KTz:   -H "Stripe-Version: 2020-08-27"
curl https://api.stripe.com/v1/balance   -u sk_test_51IRNOwAsSzkI1bY8DXwKwxZBF0Z7myF8xv8ceskuxfBfdnaj7K9TVFIzt3svY5cDVMlbj5lnrPQhpxssdHmvMNMR00acgr6KTz:
npm install
npm start
npm install -g npm@7.6.0
npm audit fix
npm install
npm start
pip install ipyparallel
ipcluster nbextension enable
jupyter nbextension install --sys-prefix --py ipyparallel
jupyter nbextension enable --sys-prefix --py ipyparallel
jupyter serverextension enable --sys-prefix --py ipyparallel
su
ll
code .
cd ..
ll
python3 get-gists.py bgoonz
npm install
npm init
for i in {0..12}; do   if ! (($i % 4)); then     printf "\e[1K\rloading";   else     printf ".";   fi;   sleep 1
cd ..
python3 get-gists.py 
python3 get-gists.py leoloobeek
python3 get-gists.py dideler
find . -empty -type f -print -delete
find . -empty -type d -print -delete
find . -empty -type f -print -delete
find . -empty -type d -print -delete
#!/usr/bin/env bash
for i in {0..12}; do   if ! (($i % 4)); then     printf "\e[1K\rloading";   else     printf ".";   fi;   sleep 1; done && printf "\e[2K\r"
pdef memoize(func):
mkdir other
cd other
npm install -g configurable-http-proxy
python3 -m pip install jupyterhub
python3 -m pip install --upgrade notebook
jupyterhub
su
pandoc                                  --standalone                          --from=markdown+yaml_metadata_block   --template=cheat-sheet.html           -o my-topic-cheat-sheet.html          my-topic-cheat-sheet.yml              my-topic-cheat-sheet.md
pandoc                                  --standalone                          --from=markdown+yaml_metadata_block   --template=cheat-sheet.html           -o my-topic-cheat-sheet.html          my-topic-cheat-sheet.yml              my-topic-cheat-sheet.md
# create a new project
mkdir topic-cheat-sheet
cd topic-cheat-sheet
git init
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
make
# done, review the cheat sheets and make a git commit whet you're ready:
# - xdg-open topic-cheat-sheet.html
# - xdg-open topic-cheat-sheet.pdf
# - git commit -m 'initial commit'
# create a new project
mkdir topic-cheat-sheet
cd topic-cheat-sheet
git init
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
make
# done, review the cheat sheets and make a git commit whet you're ready:
# - xdg-open topic-cheat-sheet.html
# - xdg-open topic-cheat-sheet.pdf
# - git commit -m 'initial commit'
pandoc                                  --standalone                          --from=markdown+yaml_metadata_block   --template=cheat-sheet.html           -o my-topic-cheat-sheet.html          my-topic-cheat-sheet.yml              my-topic-cheat-sheet.md
pandoc                                  --standalone                          --from=markdown+yaml_metadata_block   --template=cheat-sheet.tex            --pdf-engine=xelatex                  -o my-topic-cheat-sheet.pdf           my-topic-cheat-sheet.yml              my-topic-cheat-sheet.md
pandoc                                  --standalone                          --from=markdown+yaml_metadata_block   --template=cheat-sheet.tex            --pdf-engine=xelatex                  -o my-topic-cheat-sheet.pdf           my-topic-cheat-sheet.yml              my-topic-cheat-sheet.md
pandoc                                  --standalone                          --from=markdown+yaml_metadata_block   --template=cheat-sheet.tex            --pdf-engine=xelatex                  -o my-topic-cheat-sheet.pdf           my-topic-cheat-sheet.yml              my-topic-cheat-sheet.md
sudo apt install xelatex
pandoc                                  --standalone                          --from=markdown+yaml_metadata_block   --template=cheat-sheet.html           -o my-topic-cheat-sheet.html          my-topic-cheat-sheet.yml              my-topic-cheat-sheet.md
pandoc                                  --standalone                          --from=markdown+yaml_metadata_block   --template=cheat-sheet.html           -o my-topic-cheat-sheet.html          my-topic-cheat-sheet.yml              my-topic-cheat-sheet.md
pandoc                                  --standalone                          --from=markdown+yaml_metadata_block   --template=cheat-sheet.tex            --pdf-engine=xelatex                  -o my-topic-cheat-sheet.pdf           my-topic-cheat-sheet.yml              my-topic-cheat-sheet.md
pandoc                                  --standalone                          --from=markdown+yaml_metadata_block   --template=cheat-sheet.tex            --pdf-engine=xelatex                  -o my-topic-cheat-sheet.pdf           my-topic-cheat-sheet.yml              my-topic-cheat-sheet.md
find . -empty -type f -print -delete
find . -empty -type d -print -delete\
find . -empty -type f -print -delete
find . -empty -type d -print -delete
node APPEND-DIR.js 
code .
cd .
cd ..
cd mnt
cd c
cd MY-WEB-DEV
cd _JOB-SEARCH/
find . -name 'node_modules' -type d -print -prune -exec rm -rf '{}' +
find . -name 'node_modules' -type d  -prune -exec rm -rf '{}' +
wget -r https://flounder-flower-xpaw.squarespace.com/
wget -r https://flounder-flower-xpaw.squarespace.com/events-one
wget --wait=2 --level=inf --limit-rate=20K --recursive --page-requisites --user-agent=Mozilla --no-parent --convert-links --adjust-extension --no-clobber -e robots=off https://flounder-flower-xpaw.squarespace.com/
wget --wait=2 --level=inf --limit-rate=20K --recursive --page-requisites --user-agent=Mozilla --no-parent --convert-links --adjust-extension --no-clobber -e robots=off https://mobirise.com/extensions/connectm4/
find . -empty -type f -print -delete
find . -empty -type d -print -delete
find . -empty -type f -print -delete
find . -empty -type d -print -delete
wget --wait=2 --level=inf --limit-rate=20K --recursive --page-requisites --user-agent=Mozilla --no-parent --convert-links --adjust-extension --no-clobber -e robots=off https://mobirise.com/extensions/shopamp/#features15-8
git init
git add .
git init
git add .
wget --wait=2 --level=inf --limit-rate=20K --recursive --page-requisites --user-agent=Mozilla --no-parent --convert-links --adjust-extension --no-clobber -e robots=off https://mobirise.com/extensions/soundamp/recordingstudio.html
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
git commit -m "overdue"
git push
git init
git add .
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
find . -name "*.zip" | while read filename; do unzip -o -d "`dirname "$filename"`" "$filename"; done;
find . -name "*.zip" -type f -print -delete
find . \( -name ".git" -o -name ".gitignore" -o -name ".gitmodules" -o -name ".gitattributes" \) -exec rm -rf -- {} +
find . \( -name "*SECURITY.txt" -o -name "*RELEASE.txt" -o  -name "*CHANGELOG.txt" -o -name "*LICENSE.txt" -o -name "*CONTRIBUTING.txt" -name "*HISTORY.md" -o -name "*LICENSE" -o -name "*SECURITY.md" -o -name "*RELEASE.md" -o  -name "*CHANGELOG.md" -o -name "*LICENSE.md" -o -name "*CODE_OF_CONDUCT.md" -o -name "*CONTRIBUTING.md" \) -exec rm -rf -- {} +
find ./ -mindepth 2 -type f -exec mv -t ./ --backup=t '{}' +
for f in * ; do    mv "$f" "$f.html"; done
for f in * ; do    mv "$f" "$f.mp3"; done
python3 adventure.py
python3 get-gists.py bgoonz
C:/Users/bryan/AppData/Local/Programs/Python/Python39/python.exe c:/MY-WEB-DEV/__My-Git/_GISTS/march-4/_JAMES/a79a59bcccc917503a27d488b32b62c1/adventure.py
git init
git add .
git remote add origin https://github.com/bgoonz/my-gists.git
git commit -m "initial commit"
git push -u origin master
git init
find . -empty -type f -print -delete
find . -empty -type d -print -delete
find . -empty -type f -print -delete
find . -empty -type d -print -delete
find . -empty -type f -print -delete
find . -empty -type d -print -delete
cd _JAMES/
python3 get-gists.py jamesurobertson
hi
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
rename 's/\.js\.download$/.js/' *.js\.download 
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
function RecurseDirs () {     oldIFS=$IFS;     IFS=$'\n';     for f in "$@";     do    rename  's/ *$//' *              if [[ -d "${f}" ]]; then             cd "${f}";             RecurseDirs $(ls -1 ".");             cd ..;         fi;     done;     IFS=$oldIFS; }
RecurseDirs "./"
find . -empty -type f -print -delete
find . -empty -type d -print -delete
find . \( -name ".git" -o -name ".gitignore" -o -name ".gitmodules" -o -name ".gitattributes" \) -exec rm -rf -- {} +
find . -empty -type d -print -delete
find . -empty -type f -print -delete
rename 's/\.js\.download$/.js/' *.js\.download 
rename 's/\.js\.download$/.js/' *.js\.download 
rename 's/\.js\.download$/.js/' *.js\.download 
rename 's/\.js\.download$/.js/' *.js\.download 
rename 's/\.js\.download$/.js/' *.js\.download 
rename 's/\.js\.download$/.js/' *.js\.download 
find . -name 'node_modules' -type d -print
find . -empty -type f -print -delete
find . -empty -type d -print -delete
find . -name 'node_modules' -type d -print
find . -empty -type f -print -delete
git init
git add .
git commit -m "update"
git push 
git init
git add .
find . -name 'node_modules' -type d -prune -exec rm -rf '{}' +
git init 
git add .
git submodule add https://github.com/bgoonz/bgoonz.github.io.git
function RecurseDirs () {     oldIFS=$IFS;     IFS=$'\n';     for f in "$@";     do    rename 's/\.js\.download$/.js/' *.js\.download               if [[ -d "${f}" ]]; then             cd "${f}";             RecurseDirs $(ls -1 ".");             cd ..;         fi;     done;     IFS=$oldIFS; }
RecurseDirs "./"
ll
cd ..
python3 get-gists.py bgoonz
find . -empty -type f -print -delete
find . -empty -type d -print -delete
find . \( -name ".git" -o -name ".gitignore" -o -name ".gitmodules" -o -name ".gitattributes" \) -exec rm -rf -- {} +
find . \( -name "*SECURITY.txt" -o -name "*RELEASE.txt" -o  -name "*CHANGELOG.txt" -o -name "*LICENSE.txt" -o -name "*CONTRIBUTING.txt" -name "*HISTORY.md" -o -name "*LICENSE" -o -name "*SECURITY.md" -o -name "*RELEASE.md" -o  -name "*CHANGELOG.md" -o -name "*LICENSE.md" -o -name "*CODE_OF_CONDUCT.md" -o -name "*CONTRIBUTING.md" \) -exec rm -rf -- {} +
find . -empty -type f -print -delete
find . -empty -type d -print -delete
find . \( -name ".git" -o -name ".gitignore" -o -name ".gitmodules" -o -name ".gitattributes" \) -exec rm -rf -- {} +
find . \( -name "*SECURITY.txt" -o -name "*RELEASE.txt" -o  -name "*CHANGELOG.txt" -o -name "*LICENSE.txt" -o -name "*CONTRIBUTING.txt" -name "*HISTORY.md" -o -name "*LICENSE" -o -name "*SECURITY.md" -o -name "*RELEASE.md" -o  -name "*CHANGELOG.md" -o -name "*LICENSE.md" -o -name "*CODE_OF_CONDUCT.md" -o -name "*CONTRIBUTING.md" \) -exec rm -rf -- {} +
cd ..
git init
git add .
git commit -m "updated content"
git commit -m "initial nope... i lead.... commit > #1"
git push 
git init
git add .
git commit -m "initial commit"
git push 
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
git remote add origin https://github.com/bgoonz/ecommerce-interactive.git
rm -rd .vscode
git init
git add .
git commit -m "remove vscode folder"
git push 
git push -u origin master
rm -rf .git
git init
git add .
git commit -m "initial commit "
git remote add origin https://github.com/bgoonz/ecommerce-interactive.git
git push -u origin master
git push -u origin master -f
git commit -m "updated and formatted content... trimmed some fat"
pip install selenium
sudo gem install stripe
sudo apt install ruby
sudo gem install stripe
git init
git add .
git init
git add .
git commit -m "hi"
git push 
git commit -m "hi"
git add .
git commit -m "hi"
git push 
git add .
git commit -m "hi"
git push 
git init
git add .
git commit -m "blog posts"
git push
find . -depth -exec rmdir {} \;  
npm install express-generator -g
npx express-generator
ll
npm install -g express-generator
code .
cd misc
ll
cd sandbox
npx express-generator
code .
express --view=pug myapp
npm install
npm audit fix -f
create : myapp
cd myapp
npm install
vagrant init hashicorp/bionic64
sudo apt install vagrant
git clone https://github.com/bgoonz/web-dev-notes-resource-site.git
find . -name "*.zip" | while read filename; do unzip -o -d "`dirname "$filename"`" "$filename"; done;
python3 vboxapisetup.py
node \swfobject.js
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
sudo for f in *.html; do printf '%s\n' 0a '<!DOCTYPE html>
<html lang="en">
<head>
<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" integrity="sha384-JcKb8q3iqJ61gNV9KGb8thSsNjpSL0n8PARn9HuZOnIxN0hoP+VmmDGMN5t9UJ0Z" crossorigin="anonymous">
<link rel="stylesheet" href="./prism.css">
<script async defer src="./prism.js"></script>
</head>
<body>;' . x | ex "$f"; done
echo "</body></html>" | tee -a *.html
sudo echo "</body></html>" | tee -a *.html
git clone https://github.com/bgoonz/web-dev-notes-resource-site.git
git init
git add .
git init
git add .
git commit -m "commit"
git push 
git remote add https://github.com/bgoonz/web-dev-notes-resource-site.git
git remote add origin  https://github.com/bgoonz/web-dev-notes-resource-site.git
git push -u origin master

npm install
git remote add origin https://github.com/bgoonz/react-blog.git
git init
git remote add origin https://github.com/bgoonz/react-blog.git
git add .
rm -rf .git
find . -name "*.zip" | while read filename; do unzip -o -d "`dirname "$filename"`" "$filename"; done;
ll
wget -r https://skyline.github.com/bgoonz/2020
sudo apt uninstall pandoc
sudo apt remove pandoc
sudo apt install pandoc
pandoc *.md> -o _ Combined.html
sudo apt install pandoc
pandoc *.md> -o _Combined.html
su
npm install
npm run devstart
npm install netlify-cli -g
netlify deploy
netlify deploy -y
netlify deploy
netlify deploy -y
npm config set msvs_version 2017
npm install
npm install
npm audit fix --force
sudo npm audit fix --force
npm install -g npmnpm install -g npm
npm install -g npm
ll
cd "c:\0-a-A-October\00-weeks-container\00-weeks\_CONTAINER\02-mod1-a-2--\App-Academy-Notes-master\week-4\Test_Review"
explorer.exe .
wget --wait=2 --level=inf --limit-rate=20K --recursive --page-requisites --user-agent=Mozilla --no-parent --convert-links --adjust-extension --no-clobber -e robots=off https://skilled.dev/
pandoc *.md> -o _OUTPUT.html
pandoc *.md> -o _./OUTPUT.html
pandoc ./ *.md> -o _./OUTPUT.html
pandoc ./ *.md> -o _OUTPUT.html
pandoc  *.md> -o _OUTPUT.html
pandoc *.md> -o _OUTPUT.html
pandoc *.md> -o _OUTPUT.html
pandoc.exe: ~/. *.md>-o OUTPUT.html
pandoc ~/. *.md>-o OUTPUT.html
pandoc  *.md>-o OUTPUT.html
find ./ -iname "*.md" -type f -exec sh -c 'pandoc *.md> -o ./OUTPUT.html'
pandoc *.md> -o ./OUTPUT.html
git clone https://github.com/bgoonz/web-dev-notes-resource-site.git
rm -rf .git 
rm -rf *.git
git rm -rf *.git
git init
git remote add origin https://github.com/bgoonz/Realistate-Site-Template.git
git add .
git commit -m "initial commit"
git push -u origin master
find . -empty -type f -print -delete
find . -empty -type d -print -delete
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
find . -empty -type d -print -delete
find . -name "*.zip" | while read filename; do unzip -o -d "`dirname "$filename"`" "$filename"; done;
find . -name "*.zip" -type f -print -delete
git init 
git add .
git commit -m "added blog post from medium"
git add .
git commit -m "initial commit"
git push 
firebase init hostingfirebase init hosting
git init 
git add .
git init
git add .
git commit -m "restructured projects"
git push 
git add .
git pull
cd ..
git pull
git init
git add .
git commit -m "updates... new repl"
git push 
node dtw.js
git pull
tree -d
git add .
git init
git add .
npm init
npm publish
npm publish --access public
git add .
git init
npm install
npm login
sed 's/<script>.*<\/script>//g;/<script>/,/<\/script>/{/<script>/!{/<\/script>/!d}};s/<script>.*//g;s/.*<\/script>//g'
cd "c:\Users\bryan\Downloads\dsalgos-master\dsalgos-master"
node install.js
npm install
git init
git init
git add .
git commit -m "updated"
git push 
git add .
git commit -m "updated"
git push 
git init
git add .
git commit -m "consolidated web pages into index.html"
git push 
git add .
ll
git init
git add .
pandoc *.html>  ./OUTPUT.html
git init 
git add .
git init
git init
git add .
git commit -m "not initial"
git push 
git add .
git commit -m "not initial"
git push 
git add .
git commit -m "not initial"
git push 
git init
git add .
git icommit -m "wubalubadubdub"
git commit -m "wubalubadubdub"
git push 
git pull
git push 
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
tree -d >README.md
git init
git add .
git commit -m "initial commit "
git push 
git pull
git push 
git init
git add .
git commit -m "no message"
git push 
python3 get-gists.py bgoonz
find . \( -name ".git" -o -name ".gitignore" -o -name ".gitmodules" -o -name ".gitattributes" \) -exec rm -rf -- {} +
tree >README.md
npm install
git clone https://github.com/carolchau/gist-list.git
npm run preinstall
npm run test
npm install karma --save-dev
pip install -r requirements.txt
python app.py
sudo apt install python
python app.py
python app.py
sudo apt install pip
pip install -r requirements.txt
python3 app.py
python app.py
virtualenv flask
pip install flask
virtualenv flask
sudo virtualenv flask
bower install angular-gist-embed
wget --wait=2 --level=inf --limit-rate=20K --recursive --page-requisites --user-agent=Mozilla --no-parent --convert-links --adjust-extension --no-clobber -e robots=off https://www.freeformatter.com/
git clone https://github.com/pubnub/typescript-ref-app-team-chat.git
rm -rf ./
rm -rf .git
git clone https://github.com/pubnub/typescript-ref-app-team-chat.git
cd typescript-ref-app-team-chat
npm install
npm run preinstall
npm run test
chmod -x deploy.sh
bash deploy.sh
git init
git remote add origin https://github.com/bgoonz/embed-user-gists-in-website.git
git add .
git commit -m "initial commit"
git push -u origin master
bash deploy.sh
node combine.js 
git init
git add .
git init 
git add .
git init
git add .
git commit-m "core content"
git commit -m "core content"
git push
git pull 
git push -f
npm install
git clone https://github.com/layrjs/react-layr-realworld-example-app.git
git init
git remote add origin https://github.com/bgoonz/Medium-Clone-FullStack-React.git
git add .
git commit -m "initial commit"
git push -u origin master
npm install -g codedown
function RecurseDirs () {     oldIFS=$IFS;     IFS=$'\n';     for f in "$@";     do   
   for file in *; do mv "$file" `echo $file | tr '_' '.'` ; done              if [[ -d "${f}" ]]; then             cd "${f}";             RecurseDirs $(ls -1 ".");             cd ..;         fi;     done;     IFS=$oldIFS; }
RecurseDirs "./"
function RecurseDirs () {     oldIFS=$IFS;     IFS=$'\n';     for f in "$@";     do   
   for file in *; do mv "$file" `echo $file | tr '_' '.'` ; done              if [[ -d "${f}" ]]; then             cd "${f}";             RecurseDirs $(ls -1 ".");             cd ..;         fi;     done;     IFS=$oldIFS; }
RecurseDirs "./"
find . -type f -exec sed -i '/Mirrored from/d' ./*.html {} \; 
#!/bin/bash
( IFS=$'\n'; for y in $(ls $1); do mv $1/`echo $y | sed 's/ /\\ /g'` $1/`echo "$y" | sed 's/ /_/g'`; done; )
function RecurseDirs () {     oldIFS=$IFS;     IFS=$'\n';     for f in "$@";     do   
( IFS=$'\n'; for y in $(ls $1); do mv $1/`echo $y | sed 's/ /\\ /g'` $1/`echo "$y" | sed 's/ /_/g'`; done; );               if [[ -d "${f}" ]]; then             cd "${f}";             RecurseDirs $(ls -1 ".");             cd ..;         fi;     done;     IFS=$oldIFS; }
RecurseDirs "./"
function RecurseDirs () {     oldIFS=$IFS;     IFS=$'\n';     for f in "$@";     do   
   for file in *; do mv "$file" `echo $file | tr '_' '.'` ; done              if [[ -d "${f}" ]]; then             cd "${f}";             RecurseDirs $(ls -1 ".");             cd ..;         fi;     done;     IFS=$oldIFS; }
RecurseDirs "./"
node code.js
ll
cat w07_data-structures-and-algorithms.md* | codedown javascript > code.js
cat w08_getting-to-know-the-network.html* | codedown javascript > code8.js
cat w08_getting-to-know-the-network.md* | codedown javascript > code8.js
git commit -m "fix catostrophic failure"
git push 
git push -u origin master
git push -u origin master -f
git init
git add .
git commit -m "update"
git push 
#! /bin/bash
sanitize() {   shopt -s extglob;     filename=$(basename "$1");   directory=$(dirname "$1")    filename_clean="${filename//+([^[:alnum:]_-\.])/_}"    if (test "$filename" != "$filename_clean");   then     mv -v --backup=numbered "$1" "$directory/$filename_clean";   fi; }
export -f sanitize
find $1 -depth -exec bash -c 'sanitize "$0"' {} \;
function RecurseDirs () {     oldIFS=$IFS;     IFS=$'\n';     for f in "$@";     do   
for file in *; do mv "$file" "$(echo "$file" | tr '.' '_')" ; done              if [[ -d "${f}" ]]; then             cd "${f}";             RecurseDirs $(ls -1 ".");             cd ..;         fi;     done;     IFS=$oldIFS; }
RecurseDirs "./"
function RecurseDirs () {     oldIFS=$IFS;     IFS=$'\n';     for f in "$@";     do   
   for file in *; do mv "$file" `echo $file | tr '_' '.'` ; done              if [[ -d "${f}" ]]; then             cd "${f}";             RecurseDirs $(ls -1 ".");             cd ..;         fi;     done;     IFS=$oldIFS; }
RecurseDirs "./"
git init
git add .
git commit -m "fixed file struture"
git push 
git push 
git push -f
rm -rf C:\MY-WEB-DEV\08-my-website\resources\MY_SITE_CONTENT\core-content\blog-posts\ciriculumn\Extra\_Learn\learn-amazon-web-services-master\out.js
git push 
git add .
find . -size +75M -a -print -a -exec rm -f {} \;
git init
git add .
detox -r -v .
find . -exec rename 's/[^\x00-\x7F]//g' "{}" \;
find . -print -exec rename 's/[^\x00-\x7F]//g' "{}" \;
#!/bin/bash
function sanitize_file_name {     echo -n $1 | perl -pe 's/[\?\[\]\/\\=<>:;,''"&\$#*()|~`!{}%+]//g;' -pe 's/[\r\n\t -]+/-/g;'; }
filename="Wh00t? it's a -- re@lly-weird {file&name} (with + Plus and__1% #of# [\$qRots\$!]).mov"
cleaned=$(sanitize_file_name "$filename")
echo original : "$filename"
echo sanitised: "$cleaned"
sudo apt install detox
detox -r -v .
git pull
git init
git remote add origin https://github.com/bgoonz/web-dev-resource-hub.git
git pull
git push -u origin master -f
git remote add origin https://github.com/bgoonz/web-dev-resource-hub.git
git push -u origin master -f
git commit -m "initial commit"
git add   .github/
git add .
git commit -m "initial commit"
git push -u origin master -f
git init
git add .
git add --verbose
git add . -N
git remote add origin https://github.com/bgoonz/WEB_DEV_RESOURCES.git
git add .
git commit -m "initial commit -kinda"
find ./ -iname "*.html" -type f -exec sh -c 'sed "/<a/,/<\/a>/d" scrap.html' {} \;
wget -r https://www.aquest.it/en/website/barovier-toso/
wget --wait=2 --level=inf --limit-rate=20K --recursive --page-requisites --user-agent=Mozilla --no-parent --convert-links --adjust-extension --no-clobber -e robots=off https://www.aquest.it/en/website/barovier-toso/
find . -name "*.\.js\.download" -exec rename 's/\.js\.download$/.js/' '{}' +
git push
git push -u origin master
find ./ -iname "scrap.html" -type f -exec sh -c 'sed "/<a/,/<\/a>/d"' {} \;>out.html
pandoc *.md> -o ./OUTPUT.md
pandoc *.md> -o ./OUTPUT.html
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
git init
tree -L 5 >out.md
sed 's/\(^[aA-zZ]*\).*\(\.[aA-zZ]*$\)/\1\2/g'
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
sudo sed -i '/Canonical/d' *.html
sudo sed -i '/Exported from/d' *.html
find . -maxdepth 1 -regextype "posix-egrep" -regex '.*/[0-9]+.*\.html' -type f
#! /bin/bash
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
. /bin/activate
flask db upgrade
flask seed all
flask run
wget --wait=2 --level=inf --limit-rate=20K --recursive --page-requisites --user-agent=Mozilla --no-parent --convert-links --adjust-extension --no-clobber -e robots=off
wget --wait=2 --level=inf --limit-rate=20K --recursive --page-requisites --user-agent=Mozilla --no-parent --convert-links --adjust-extension --no-clobber -e robots=off  https://www.w3docs.com/quiz
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
Summer2015
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
declare -A array
for i in *.*; do     j="${i%-*}.${i##*.}"     for x in "${!array[@]}"; do         if [[ "$j" == "$x" ]]; then             k="${i%-*}-${array[$j]}.${i##*.}";         fi;     done     (( array["$j"]++ ))     mv "$i" "$k"; donedeclare -A array for i in *.*; do     j="${i%-*}.${i##*.}"     for x in "${!array[@]}"; do         if [[ "$j" == "$x" ]]; then             k="${i%-*}-${array[$j]}.${i##*.}";         fi;     done     (( array["$j"]++ ))     mv "$i" "$k"; done
declare -A array
for i in *.*; do     j="${i%-*}.${i##*.}"     for x in "${!array[@]}"; do         if [[ "$j" == "$x" ]]; then             k="${i%-*}-${array[$j]}.${i##*.}";         fi;     done     (( array["$j"]++ ))     mv "$i" "$k"; done
rename 's/-\d+//' *.jpg
html
rename 's/-\d+//' *.html
for i in *.html;  do if [[  -e "${i%-*}.html" ]]; then     num=1;     while [[ -e "${i%-*}-$num.html" ]]; do         (( num++ ));     done;  mv "$i" "${i%-*}-$num.html"; else  rename 's/-\d+//' *.html; fi;  done
for file in * ; do mv $file  $(echo $file |sed 's/^.\{1\}//g'); done
for file in * ; do mv $file  $(echo $file |sed 's/^.\{2\}//g'); done
for file in * ; do mv $file  $(echo $file |sed 's/^.\{3\}//g'); done
git init
for f in */; do nf=$(echo "$f" |sed -e 's/[^A-Za-z0-9.]/./g' -e 's/\.\.\././g' -e 's/\.\././g' -e 's/\.*$//'); test "$f" != "$nf" && mv "$f" "$nf" && echo "$nf"; done
for f in .; do nf=$(echo "$f" |sed -e 's/[^A-Za-z0-9.]/./g' -e 's/\.\.\././g' -e 's/\.\././g' -e 's/\.*$//'); test "$f" != "$nf" && mv "$f" "$nf" && echo "$nf"; done
for f in './'; do nf=$(echo "$f" |sed -e 's/[^A-Za-z0-9.]/./g' -e 's/\.\.\././g' -e 's/\.\././g' -e 's/\.*$//'); test "$f" != "$nf" && mv "$f" "$nf" && echo "$nf"; done
for f in *.; do nf=$(echo "$f" |sed -e 's/[^A-Za-z0-9.]/./g' -e 's/\.\.\././g' -e 's/\.\././g' -e 's/\.*$//'); test "$f" != "$nf" && mv "$f" "$nf" && echo "$nf"; done
sanitize() {   shopt -s extglob;   filename=$(basename "$1");   directory=$(dirname "$1")   filename_clean=$(echo "$filename" | sed -e 's/[\\/:\*\?"<>\|\x01-\x1F\x7F]//g' -e 's/^\(nul\|prn\|con\|lpt[0-9]\|com[0-9]\|aux\)\(\.\|$\)//i' -e 's/^\.*$//' -e 's/^$/NONAME/')   if (test "$filename" != "$filename_clean");   then     mv -v "$1" "$directory/$filename_clean";   fi; }
export -f sanitize
sanitize_dir() {   find "$1" -depth -exec bash -c 'sanitize "$0"' {} \;; }
sanitize_dir './'
#!/bin/bash
function sanitize_file_name {     echo -n $1 | perl -pe 's/[\?\[\]\/\\=<>:;,''"&\$#*()|~`!{}%+]//g;' -pe 's/[\r\n\t -]+/-/g;'; }
filename="Wh00t? it's a -- re@lly-weird {file&name} (with + Plus and__1% #of# [\$qRots\$!]).mov"
cleaned=$(sanitize_file_name "$filename")
echo original : "$filename"
echo sanitised: "$cleaned"
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
ll
cd Temp
git clone https://github.com/bgoonz/Medium_Articles.git
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
sudo 
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
sudo ll
ll
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
sudo sed -i '/Document generated by /d' ./*.html
sudo sed -i '/<div id="footer-logo"\><a href="http://www\.atlassian\.com/"\>Atlassian</a\></div\> /d' ./*.html
sudo sed -i '/    '<div id="footer-logo"><a href="http://www.atlassian.com/">Atlassian</a></div>' /d' ./*.html
sudo sed -i '/ <div id="footer-logo"><a href="http:\/\/www\.atlassian\.com\/">Atlassian<\/a><\/div>/d' ./*.html
sudo sed -i '/\.html/!d' index.html
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
git init
git add .
git remote add origin https://github.com/bgoonz/atlassian-templates.git
git commit -m "initial commit"
git push -u origin master
sudo sed -i '/ <div id="footer-logo"><a href="http:\/\/www\.atlassian\.com\/">Atlassian<\/a><\/div>/d' ./*.html
sudo sed -i '/ Document generated by Confluence on/d' ./*.html
sudo sed -i '/ <a href="http:\/\/www\.atlassian\.com\/">Atlassian<\/a>/d' ./*.html
find . -type f -exec sed -i '/:::/d' ./*.md {} \; 
find ./ -iname "*.html" -type f -exec sh -c 'pandoc "${0}" -o "${0%.html}.md"' {} \;
sudo sed -i '/ <div id="footer-logo"><a href="http:\/\/www\.atlassian\.com\/">Atlassian<\/a><\/div>/d' ./*.html
git init
git add .
git init
git add .
git commit -m "fixed background"
git pull
git push -u origin master
wget -r https://github.com/hijiangtao/LeetCode-with-JavaScript
git init
git add .
git init
git add .
git commit -m "not initial commit"
git push 
git remote add origin https://gitlab.com/bryan.guner.dev/DS-ALGO-OFFICIAL.git
git push -u origin master
git remote rm https://gitlab.com/bryan.guner.dev/DS-ALGO-OFFICIAL.git
git push \
git push 
git push -u origin master
git init
git add .
git commit -m "update"
git push 
git clone https://github.com/bgoonz/github-reference-repo.git
git init
npm install -g lebab
git pull
heroku login 
heroku join
git init
git add ..
git init
git add .
git commit -m "update"
git add .
git commit -m "update"
git push
heroku login 
heroku help
curl https://cli-assets.heroku.com/install.sh | sh
heroku login 
curl https://cli-assets.heroku.com/install.sh | sh
curl https://cli-assets.heroku.com/install-ubuntu.sh | sh
sudo apt update
sudo apt upgrade
npm uninstall -g heroku-cli
npm i -g heroku
wget -r https://medium.com/p/8acb68284a98/edit
httrack https://medium.com/p/8acb68284a98/edit
git clone https://github.com/bmanley91/cheatsheet.git
git clone https://github.com/cooervo/Algorithms-DataStructures-BigONotation.git
httrack https://thimbleby.gitlab.io/algorithm-wiki-site/
httrack https://thimbleby.gitlab.io/algorithm-wiki-site/
find ./ -iname "*.html" -type f -exec sh -c 'pandoc "${0}" -o "${0%.html}.md"' {} \;
git clone https://github.com/bgoonz/web-dev-notes-resource-site.git -f
git clone https://github.com/bgoonz/web-dev-notes-resource-site.git
npm install 
cd ..
cd back-end
npm install
git init
git add .
solving deltas: 100% (97275/97275), done.
BUG: refs/files-backend.c:2956: initial ref transaction called with existing refs
Aborted
|18:08:06|bryan@LAPTOP-9LGJ3JGS:[Original] Original_exitstatus:134__________________________________________________________o>
git add .
git commit -m "initial commit"
git add .
git init
git add .
git commit -m "newer articles"
git push 
lebab --replace BinarySearchTree.js --transform let
lebab --replace BinarySearchTree.js --transform class
lebab --replace BinarySearchTree.js --transform arrow
lebab --replace BinarySearchTree.js --transform let
lebab --replace BinarySearchTree.js --transform arrow
lebab --replace BinarySearchTree.js --transform class
node BinarySearchTree.js
node StackES6.js
node scrap.js
git submodule update --remote --merge
find . -size +75M -a -exec rm -f {} \;
git init
find . -size +75M -a -print -a -exec rm -f {} \;
find . -empty -type f -print -delete
find . -empty -type d -print -deletefind . -empty -type f -print -delete
find . -empty -type d -print -delete
git pull -s recursive -X theirs https://github.com/bgoonz/web-dev-notes-resource-site.git
git pull -s recursive -X theirs https://github.com/bgoonz/web-dev-notes-resource-site.git -f
git pull origin master --allow-unrelated-histories 
function RecurseDirs () {     oldIFS=$IFS;     IFS=$'\n';     for f in "$@";     do   
mv 'file' $(echo 'file' | sed -e 's/[^A-Za-z0-9._-]/_/g')              if [[ -d "${f}" ]]; then             cd "${f}";             RecurseDirs $(ls -1 ".");             cd ..;         fi;     done;     IFS=$oldIFS; }
RecurseDirs "./"
git remote rm https://github.com/bgoonz/web-dev-resource-hub.git
git init
git add .
npm i beautify -gnpm i beautify -gnpm i beautify -g
npm i beautify -g
git clone https://gitlab.com/bryan.guner.dev/web-dev-notes-resource-site.git
beautify -o output.html ./test.html
npm install
find . -type f -exec sed -i '/Andreas Mehlsen/d' ./*.html {} \; 
find . -type f -exec sed -i '/andreas/d' ./*.html {} \;
npm audit fix
npm install
npm run serve
npm run deploy
firebase login
find . -empty -type f -print -delete
find . -empty -type d -print -delete
find . -empty -type f -print -delete
npm install --save site-mapper
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
find . -empty -type d -print -delete
git remote add origin https://github.com/bgoonz/web-dev-notes-resource-site.git
find . -empty -type f -print -delete
git init
git add .
git init
git add .
git init
git add .
find . -empty -type f -print -delete
find . -empty -type d -print -delete
find . -name "*.zip" | while read filename; do unzip -o -d "`dirname "$filename"`" "$filename"; done;
find . \( -name "*SECURITY.txt" -o -name "*RELEASE.txt" -o  -name "*CHANGELOG.txt" -o -name "*LICENSE.txt" -o -name "*CONTRIBUTING.txt" -name "*HISTORY.md" -o -name "*LICENSE" -o -name "*SECURITY.md" -o -name "*RELEASE.md" -o  -name "*CHANGELOG.md" -o -name "*LICENSE.md" -o -name "*CODE_OF_CONDUCT.md" -o -name "*CONTRIBUTING.md" \) -exec rm -rf -- {} +
find . -empty -type f -print -delete
find . -empty -type d -print -delete
find . -name "*.zip" -type f -print -delete
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
