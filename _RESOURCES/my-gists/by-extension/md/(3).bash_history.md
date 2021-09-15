git push 
git add .
git commit -m "naming convention established"
git push 
git add .
git commit -m "naming convention established"
git push 
git add .
git init
git add .
git remote add origin https://github.com/bgoonz/mesibo-messenger.git
git add .
git commit -m "initial commit"
git push 
git push -u origin master
git add .
git commit -m "initial commit"
git push -u origin master
git add .
git commit -m "index linking"
git push 
git add .
git commit -m "index linking"
git push 
#!/bin/sh
# find ./ | grep -i "\.*$" >files
find ./ | sed -E -e 's/([^ ]+[ ]+){8}//' | grep -i "\.*$">files
listing="files"
out=""
html="index.html"
out="basename $out.html"
html="index.html"
cmd() {   echo '  <!DOCTYPE html>';   echo '<html>';   echo '<head>'   echo '  <meta http-equiv="Content-Type" content="text/html">'   echo '  <meta name="Author" content="Bryan Guner">';   echo '<link rel="stylesheet" href="./assets/prism.css">';   echo ' <link rel="stylesheet" href="./assets/style.css">';   echo ' <script async defer src="./assets/prism.js"></script>'   echo "  <title> directory </title>"   echo "";   echo '<style>'; echo '    a {'; echo '      color: black;'; echo '    }'; echo ''; echo '    li {'; echo '      border: 1px solid black !important;'; echo '      font-size: 20px;'; echo '      letter-spacing: 0px;'; echo '      font-weight: 700;'; echo '      line-height: 16px;'; echo '      text-decoration: none !important;'; echo '      text-transform: uppercase;'; echo '      background: #194ccdaf !important;'; echo '      color: black !important;'; echo '      border: none;'; echo '      cursor: pointer;'; echo '      justify-content: center;'; echo '      padding: 30px 60px;'; echo '      height: 48px;'; echo '      text-align: center;'; echo '      white-space: normal;'; echo '      border-radius: 10px;'; echo '      min-width: 45em;'; echo '      padding: 1.2em 1em 0;'; echo '      box-shadow: 0 0 5px;'; echo '      margin: 1em;'; echo '      display: grid;'; echo '      -webkit-border-radius: 10px;'; echo '      -moz-border-radius: 10px;'; echo '      -ms-border-radius: 10px;'; echo '      -o-border-radius: 10px;'; echo '    }'; echo '  </style>';   echo '</head>'   echo '<body>'   echo ""   echo ""   echo ""   echo "<ul>"   awk '{print "<li><a href=\""$1"\">",$1,"&nbsp;</a></li>"}' $listing   echo ""   echo "</ul>"   echo "</body>"   echo "</html>" }
cmd $listing --sort=extension >>$html
sudo sed -i '/\.git/d' ./index.html
sudo sed -i '/images/d' ./index.html
sudo sed -i '/font/d' ./index.html
sudo sed -i '/fonts/d' ./index.html
sudo sed -i '/\.TTF/d' ./index.html
sudo sed -i '/\.git/d' ./index.html
sudo sed -i '/\.js/d' ./index.html
sudo sed -i '/\.php/d' ./index.html
sudo sed -i '/\.css/d' ./index.html
git add .
find . \( -name ".git" -o -name ".gitignore" -o -name ".gitmodules" -o -name ".gitattributes" \) -exec rm -rf -- {} +
find . \( -name "*SECURITY.txt" -o -name "*RELEASE.txt" -o  -name "*CHANGELOG.txt" -o -name "*LICENSE.txt" -o -name "*CONTRIBUTING.txt" -name "*HISTORY.md" -o -name "*LICENSE" -o -name "*SECURITY.md" -o -name "*RELEASE.md" -o  -name "*CHANGELOG.md" -o -name "*LICENSE.md" -o -name "*CODE_OF_CONDUCT.md" -o -name "*CONTRIBUTING.md" \) -exec rm -rf -- {} +
git init
git add .
git remote add origin https://github.com/bgoonz/mesibo-messenger.git
git commit -m "another one"
git push -u origin master
git push -u origin master -f
find . -name "*.zip" | while read filename; do unzip -o -d "`dirname "$filename"`" "$filename"; done;
find . -name "*.zip" -type f -print -delete
find . -name "*.zip" | while read filename; do unzip -o -d "`dirname "$filename"`" "$filename"; done;
find . -name "*.zip" -type f -print -delete
find . -name "*.zip" | while read filename; do unzip -o -d "`dirname "$filename"`" "$filename"; done;
find . -name "*.zip" -type f -print -delete
git clone https://github.com/mesibo/conferencing
find . -type f -a \( -name "*.html" -o -name "*.js" -o -name "*.css" -o -name "*.md" \) -a -exec sed -i  '/Copyright/d' '{}' +
find . -type f -a \( -name "*.html" -o -name "*.js" -o -name "*.css" -o -name "*.md" \) -a -exec sed -i  '/MIT/d' '{}' +
find . -type f -a \( -name "*.html" -o -name "*.js" -o -name "*.css" -o -name "*.md" \) -a -exec sed -i  '/License/d' '{}' +
find . -type f -a \( -name "*.html" -o -name "*.js" -o -name "*.css" -o -name "*.md" \) -a -exec sed -i  '/author/d' '{}' +
find . -type f -a \( -name "*.html" -o -name "*.js" -o -name "*.css" -o -name "*.md" -o -name "*.php" \) -a -exec sed -i  '/author/d' '{}' +
find . -type f -a \( -name "*.html" -o -name "*.js" -o -name "*.css" -o -name "*.md" -o -name "*.php" \) -a -exec sed -i  '/MIT/ '{}' +
find . -type f -a \( -name "*.html" -o -name "*.js" -o -name "*.css" -o -name "*.md" -o -name "*.php" \) -a -exec sed -i  '/MIT/d '{}' +
find . -type f -a \( -name "*.html" -o -name "*.js" -o -name "*.css" -o -name "*.md" -o -name "*.php" \) -a -exec sed -i  '/MIT/d' '{}' +
find . -name '*mesibo' -type f -exec bash -c 'mv "$1" "${1/\/mesibo/chatApp/}"' -- {} \;
find . -name '*mesibo' -type d -exec bash -c 'mv "$1" "${1/\/mesibo/chatApp/}"' -- {} \;
find . -type f -name '*.md' | cpio -p -d -v './..'
for file in *.html; do   sed -i '
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>' "$file" &&   echo '</body></html>' >> "$file"; done
find . -type f -name '*.md' | cpio -p -d -v './..'
for file in *.html; do   sed -i `
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>` "$file" &&   echo '</body></html>' >> "$file"; done
for f in *.html; do printf '%s\n' 0a '<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>;' . x | ex "$f"; done
for f in *.html; do printf '%s\n' $a '</body></html>;' . x | ex "$f"; done
for f in *.html; do printf '%s\n' $a '</body></html>' . x | ex "$f"; done
for f in *.html; do printf '%s\n' $a '</body></html>;' . x | ex "$f"; done
sudo for f in *.html; do printf '%s\n' $a '</body></html>;' . x | ex "$f"; done
for f in *.html; do printf '%s\n' $a '.
</body></html>
.
;' . x | ex "$f"; done
echo "</body></html>" | tee -a *.html
find . -type f -name '*.html' | cpio -p -d -v './../'
find . -type f -name '*.md' | cpio -p -d -v './..'\
find ./ -iname "*.md" -type f -exec sh -c 'pandoc "${0}" -o "${0%.md}.html"' {} \;
git init
git add .
git remote add origin https://github.com/bgoonz/mesibo-messenger.git
git commit -m "re initial commit lol"
git push -u origin master
git push -u origin master -f
for filename in *mesibo*; do echo mv \"$filename\" \"${filename//mesibo/zumzi}\"; done > rename.md
for filename in *mesibo*; do mv "$filename" "${filename//mesibo/zumzi}"; done
find . -type f -a \( -name "*.html" -o -name "*.js" -o -name "*.css" -o -name "*.md" -o -name "*.php" \) -a
-exec sed -i  '/MIT/d' '{}' +
find . -type f -a \( -name "*.html" -o -name "*.js" -o -name "*.css" -o -name "*.md" -o -name "*.php" \) -a -exec sed -i  '/MIT/d' '{}' +
find . -type f -a \( -name "*.html" -o -name "*.js" -o -name "*.css" -o -name "*.md" -o -name "*.php" \) -a -exec sed -i  '/Copyright/d' '{}' +
find . -type f -a \( -name "*.html" -o -name "*.js" -o -name "*.css" -o -name "*.md" -o -name "*.php" \) -a -exec sed -i  '/License/d' '{}' +
code .
git add .
git commit -m "re initial commit lol"
git push -u origin master -f
#!/bin/sh
# find ./ | grep -i "\.*$" >files
find ./ | sed -E -e 's/([^ ]+[ ]+){8}//' | grep -i "\.*$">files
listing="files"
out=""
html="index.html"
out="basename $out.html"
html="index.html"
cmd() {   echo '  <!DOCTYPE html>';   echo '<html>';   echo '<head>'   echo '  <meta http-equiv="Content-Type" content="text/html">'   echo '  <meta name="Author" content="Bryan Guner">';   echo '<link rel="stylesheet" href="./assets/prism.css">';   echo ' <link rel="stylesheet" href="./assets/style.css">';   echo ' <script async defer src="./assets/prism.js"></script>'   echo "  <title> directory </title>"   echo "";   echo '<style>'; echo '    a {'; echo '      color: black;'; echo '    }'; echo ''; echo '    li {'; echo '      border: 1px solid black !important;'; echo '      font-size: 20px;'; echo '      letter-spacing: 0px;'; echo '      font-weight: 700;'; echo '      line-height: 16px;'; echo '      text-decoration: none !important;'; echo '      text-transform: uppercase;'; echo '      background: #194ccdaf !important;'; echo '      color: black !important;'; echo '      border: none;'; echo '      cursor: pointer;'; echo '      justify-content: center;'; echo '      padding: 30px 60px;'; echo '      height: 48px;'; echo '      text-align: center;'; echo '      white-space: normal;'; echo '      border-radius: 10px;'; echo '      min-width: 45em;'; echo '      padding: 1.2em 1em 0;'; echo '      box-shadow: 0 0 5px;'; echo '      margin: 1em;'; echo '      display: grid;'; echo '      -webkit-border-radius: 10px;'; echo '      -moz-border-radius: 10px;'; echo '      -ms-border-radius: 10px;'; echo '      -o-border-radius: 10px;'; echo '    }'; echo '  </style>';   echo '</head>'   echo '<body>'   echo ""   echo ""   echo ""   echo "<ul>"   awk '{print "<li><a href=\""$1"\">",$1,"&nbsp;</a></li>"}' $listing   echo ""   echo "</ul>"   echo "</body>"   echo "</html>" }
cmd $listing --sort=extension >>$html
sudo sed -i '/\.git/d' ./index.html
sudo sed -i '/\.php/d' ./index.html
sudo sed -i '/\.png/d' ./index.html
sudo sed -i '/\.js/d' ./index.html
sudo sed -i '/\.images/d' ./index.html
sudo sed -i '/\.image/d' ./index.html
sudo sed -i '/\.css/d' ./index.html
sudo sed -i '/\.jpg/d' ./index.html
sudo sed -i '/\.md/d' ./index.html
for filename in *mesibo*; do mv "$filename" "${filename//mesibo/zumzi}"; done
for filename in *mesibo*; do mv "$filename" "${filename//mesibo/zumzi}"; done
git add .
git commit -m "cleanup"
git push 
sudo sed -i '/\.git/d' ./index.html
sudo sed -i '/images/d' ./index.html
sudo sed -i '/font/d' ./index.html
sudo sed -i '/fonts/d' ./index.html
sudo sed -i '/\.TTF/d' ./index.html
sudo sed -i '/mesibo/d' ./index.html
sudo sed -i '/\.php/d' ./index.html
sudo sed -i '/\.js/d' ./index.html
sudo sed -i '/\.css/d' ./index.html
sudo sed -i '/image/d' ./index.html

git add .
git commit -m "update"
git push 
git add .
git commit -m "update"
cd ..
git add .
git commit -m "update"
git push 
git add .
git commit -m "http bug fix"
git push 
git add .
git commit -m "http bug fix"
git push 
for filename in *mesibo*; do mv "$filename" "${filename//mesibo/zumzi}"; done
find . -type f -a \( -name "*.html" -o -name "*.js" -o -name "*.css" -o -name "*.md" -o -name "*.php" \) -a
-exec sed -i  '/MIT/d' '{}' +
find . -type f -a \( -name "*.html" -o -name "*.js" -o -name "*.css" -o -name "*.md" -o -name "*.php" \) -a -exec sed -i  '/MIT/d' '{}' +
find . -type f -a \( -name "*.html" -o -name "*.js" -o -name "*.css" -o -name "*.md" -o -name "*.php" \) -a -exec sed -i  '/License/d' '{}' +
find . -type f -a \( -name "*.html" -o -name "*.js" -o -name "*.css" -o -name "*.md" -o -name "*.php" \) -a -exec sed -i  '/Copyright/d' '{}' +
find . -type f -a \( -name "*.html" -o -name "*.js" -o -name "*.css" -o -name "*.md" -o -name "*.php" \) -a -exec sed -i  '/author/d' '{}' +
rename 's/\.js\.download$/.js/' *.js\.download  
npm install clipboard --save
find . -name "*.zip" | while read filename; do unzip -o -d "`dirname "$filename"`" "$filename"; done;
prettier --print-width 80 --no-semi --single-quote --trailing-comma es5 --write src/**/*.js
prettier --single-quote --trailing-comma all --write docs package.json "{app,__{tests,mocks}__}/**/*.js"
malta ./article/Coding An HTML 5 Layout From Scratch — Smashing Magazine.html
\"brace_style\": \"collapse\"]
malta ./article/Coding An HTML 5 Layout From Scratch — Smashing Magazine.html
\"brace_style\": \"collapse\"]
malta ./article/Coding An HTML 5 Layout From Scratch — Smashing Magazine.html
malta ./article/Coding An HTML 5 Layout From Scratch — Smashing Magazine.html -plugins=malta-beautify[\"space_after_anon_function\": false,\"brace_style\": \"collapse\"]
npm install malta -g
malta ./article/Coding An HTML 5 Layout From Scratch — Smashing Magazine.html -plugins=malta-beautify[\"space_after_anon_function\": false,\"brace_style\": \"collapse\"]
npm init -y
npm i malta-beautify
npm install malta
node malta.js
malta ./article/layout.html -plugins=malta-beautify[\"space_after_anon_function\": false,\"brace_style\": \"collapse\"]
malta ./article/layout.html -plugins=malta-beautify
prettier --print-width 80 --no-semi --single-quote --trailing-comma es5 --write src/**/*.js
npm install -g prettier
prettier --print-width 80 --no-semi --single-quote --trailing-comma es5 --write src/**/*.js
git add .
git init
git add .
git remote add origin https://github.com/bgoonz/bash-config-backup.git
git commit -m "initial commit"
git push -u origin master
git add .
git commit -m "initial commit"
git push -u origin master
git add .
git commit -m "fixed readme readibility"
git push -u origin master
git add .
git commit -m "fixed readme readibility"
git push -u origin master
git add .
sudo git add .
find . -name "*.tgz" -type f -print -delete
find . -name "*.zip" | while read filename; do unzip -o -d "`dirname "$filename"`" "$filename"; done;
git add .
git commit -m "long overdue update"
git push 
#!/bin/sh
# find ./ | grep -i "\.*$" >files
find ./ | sed -E -e 's/([^ ]+[ ]+){8}//' | grep -i "\.*$">files
listing="files"
out=""
html="index.html"
out="basename $out.html"
html="index.html"
cmd() {   echo '  <!DOCTYPE html>';   echo '<html>';   echo '<head>'   echo '  <meta http-equiv="Content-Type" content="text/html">'   echo '  <meta name="Author" content="Bryan Guner">';   echo '<link rel="stylesheet" href="./assets/prism.css">';   echo ' <link rel="stylesheet" href="./assets/style.css">';   echo ' <script async defer src="./assets/prism.js"></script>'   echo "  <title> directory </title>"   echo "";   echo '<style>'; echo '    a {'; echo '      color: black;'; echo '    }'; echo ''; echo '    li {'; echo '      border: 1px solid black !important;'; echo '      font-size: 20px;'; echo '      letter-spacing: 0px;'; echo '      font-weight: 700;'; echo '      line-height: 16px;'; echo '      text-decoration: none !important;'; echo '      text-transform: uppercase;'; echo '      background: #194ccdaf !important;'; echo '      color: black !important;'; echo '      border: none;'; echo '      cursor: pointer;'; echo '      justify-content: center;'; echo '      padding: 30px 60px;'; echo '      height: 48px;'; echo '      text-align: center;'; echo '      white-space: normal;'; echo '      border-radius: 10px;'; echo '      min-width: 45em;'; echo '      padding: 1.2em 1em 0;'; echo '      box-shadow: 0 0 5px;'; echo '      margin: 1em;'; echo '      display: grid;'; echo '      -webkit-border-radius: 10px;'; echo '      -moz-border-radius: 10px;'; echo '      -ms-border-radius: 10px;'; echo '      -o-border-radius: 10px;'; echo '    }'; echo '  </style>';   echo '</head>'   echo '<body>'   echo ""   echo ""   echo ""   echo "<ul>"   awk '{print "<li><a href=\""$1"\">",$1,"&nbsp;</a></li>"}' $listing   echo ""   echo "</ul>"   echo "</body>"   echo "</html>" }
cmd $listing --sort=extension >>$html
tree -d -L 4
tree -d -L 4 > README.md
find . -empty -type f -print -delete
find . -empty -type d -print -delete
git add ,
git add .
git commit -m "update"
wget      --recursive      --no-clobber      --page-requisites      --html-extension      --convert-links      --restrict-file-names=windows      --domains website.org      --no-parent         https://tableizer.journalistopia.com/
wget -r https://tableizer.journalistopia.com/
httrack --ext-depth=4 https://tableizer.journalistopia.com/
httrack --ext-depth=4 https://codebeautify.org/tableizer
npm install
rename 's/\.js\.download$/.js/' *.js\.download  
npm run start
find . -name "*.zip" | while read filename; do unzip -o -d "`dirname "$filename"`" "$filename"; done;
find . -name "*.zip" -type f -print -delete
find . -name "*.zip" | while read filename; do unzip -o -d "`dirname "$filename"`" "$filename"; done;
npm install
git add .
git commit -m "stuff got messed up"
git push 
npm install
node index.js resolutions.xlsx
node index.js resolutions.xlsx
node index.js resolutions
rename 's/\.js\.download$/.js/' *.js\.download  
rename 's/\.js\.download$/.js/' *.js\.download  
sudo sed -i '/\.git/d' ./index.html
sudo sed -i '/images/d' ./index.html
sudo sed -i '/font/d' ./index.html
sudo sed -i '/fonts/d' ./index.html
sudo sed -i '/\.TTF/d' ./index.html
sudo sed -i '/\.git/d' ./index.html
sudo sed -i '/\.js/d' ./index.html
sudo sed -i '/\.php/d' ./index.html
sudo sed -i '/\.css/d' ./index.html
sudo sed -i '/\.html/d' ./index.html
sudo sed -i '/\.html/!d' ./index.html
#!/bin/sh
# find ./ | grep -i "\.*$" >files
find ./ | sed -E -e 's/([^ ]+[ ]+){8}//' | grep -i "\.*$">files
listing="files"
out=""
html="index.html"
out="basename $out.html"
html="index.html"
cmd() {   echo '  <!DOCTYPE html>';   echo '<html>';   echo '<head>'   echo '  <meta http-equiv="Content-Type" content="text/html">'   echo '  <meta name="Author" content="Bryan Guner">';   echo '<link rel="stylesheet" href="./assets/prism.css">';   echo ' <link rel="stylesheet" href="./assets/style.css">';   echo ' <script async defer src="./assets/prism.js"></script>'   echo "  <title> directory </title>"   echo "";   echo '<style>'; echo '    a {'; echo '      color: black;'; echo '    }'; echo ''; echo '    li {'; echo '      border: 1px solid black !important;'; echo '      font-size: 20px;'; echo '      letter-spacing: 0px;'; echo '      font-weight: 700;'; echo '      line-height: 16px;'; echo '      text-decoration: none !important;'; echo '      text-transform: uppercase;'; echo '      background: #194ccdaf !important;'; echo '      color: black !important;'; echo '      border: none;'; echo '      cursor: pointer;'; echo '      justify-content: center;'; echo '      padding: 30px 60px;'; echo '      height: 48px;'; echo '      text-align: center;'; echo '      white-space: normal;'; echo '      border-radius: 10px;'; echo '      min-width: 45em;'; echo '      padding: 1.2em 1em 0;'; echo '      box-shadow: 0 0 5px;'; echo '      margin: 1em;'; echo '      display: grid;'; echo '      -webkit-border-radius: 10px;'; echo '      -moz-border-radius: 10px;'; echo '      -ms-border-radius: 10px;'; echo '      -o-border-radius: 10px;'; echo '    }'; echo '  </style>';   echo '</head>'   echo '<body>'   echo ""   echo ""   echo ""   echo "<ul>"   awk '{print "<li><a href=\""$1"\">",$1,"&nbsp;</a></li>"}' $listing   echo ""   echo "</ul>"   echo "</body>"   echo "</html>" }
cmd $listing --sort=extension >>$html
#!/bin/sh
# find ./ | grep -i "\.*$" >files
find ./ | sed -E -e 's/([^ ]+[ ]+){8}//' | grep -i "\.*$">files
listing="files"
out=""
html="index.html"
out="basename $out.html"
html="index.html"
cmd() {   echo '  <!DOCTYPE html>';   echo '<html>';   echo '<head>'   echo '  <meta http-equiv="Content-Type" content="text/html">'   echo '  <meta name="Author" content="Bryan Guner">';   echo '<link rel="stylesheet" href="./assets/prism.css">';   echo ' <link rel="stylesheet" href="./assets/style.css">';   echo ' <script async defer src="./assets/prism.js"></script>'   echo "  <title> directory </title>"   echo "";   echo '<style>'; echo '    a {'; echo '      color: black;'; echo '    }'; echo ''; echo '    li {'; echo '      border: 1px solid black !important;'; echo '      font-size: 20px;'; echo '      letter-spacing: 0px;'; echo '      font-weight: 700;'; echo '      line-height: 16px;'; echo '      text-decoration: none !important;'; echo '      text-transform: uppercase;'; echo '      background: #194ccdaf !important;'; echo '      color: black !important;'; echo '      border: none;'; echo '      cursor: pointer;'; echo '      justify-content: center;'; echo '      padding: 30px 60px;'; echo '      height: 48px;'; echo '      text-align: center;'; echo '      white-space: normal;'; echo '      border-radius: 10px;'; echo '      min-width: 45em;'; echo '      padding: 1.2em 1em 0;'; echo '      box-shadow: 0 0 5px;'; echo '      margin: 1em;'; echo '      display: grid;'; echo '      -webkit-border-radius: 10px;'; echo '      -moz-border-radius: 10px;'; echo '      -ms-border-radius: 10px;'; echo '      -o-border-radius: 10px;'; echo '    }'; echo '  </style>';   echo '</head>'   echo '<body>'   echo ""   echo ""   echo ""   echo "<ul>"   awk '{print "<li><a href=\""$1"\">",$1,"&nbsp;</a></li>"}' $listing   echo ""   echo "</ul>"   echo "</body>"   echo "</html>" }
cmd $listing --sort=extension >>$html
sudo sed -i '/\.html/d' ./index.html
sudo sed -i '/\.html/!d' ./index.html
find ./ -iname "*.md" -type f -exec sh -c 'pandoc "${0}" -o "${0%.md}.html"' {} \;
#!/bin/sh
# find ./ | grep -i "\.*$" >files
find ./ | sed -E -e 's/([^ ]+[ ]+){8}//' | grep -i "\.*$">files
listing="files"
out=""
html="index.html"
out="basename $out.html"
html="index.html"
cmd() {   echo '  <!DOCTYPE html>';   echo '<html>';   echo '<head>'   echo '  <meta http-equiv="Content-Type" content="text/html">'   echo '  <meta name="Author" content="Bryan Guner">';   echo '<link rel="stylesheet" href="./assets/prism.css">';   echo ' <link rel="stylesheet" href="./assets/style.css">';   echo ' <script async defer src="./assets/prism.js"></script>'   echo "  <title> directory </title>"   echo "";   echo '<style>'; echo '    a {'; echo '      color: black;'; echo '    }'; echo ''; echo '    li {'; echo '      border: 1px solid black !important;'; echo '      font-size: 20px;'; echo '      letter-spacing: 0px;'; echo '      font-weight: 700;'; echo '      line-height: 16px;'; echo '      text-decoration: none !important;'; echo '      text-transform: uppercase;'; echo '      background: #194ccdaf !important;'; echo '      color: black !important;'; echo '      border: none;'; echo '      cursor: pointer;'; echo '      justify-content: center;'; echo '      padding: 30px 60px;'; echo '      height: 48px;'; echo '      text-align: center;'; echo '      white-space: normal;'; echo '      border-radius: 10px;'; echo '      min-width: 45em;'; echo '      padding: 1.2em 1em 0;'; echo '      box-shadow: 0 0 5px;'; echo '      margin: 1em;'; echo '      display: grid;'; echo '      -webkit-border-radius: 10px;'; echo '      -moz-border-radius: 10px;'; echo '      -ms-border-radius: 10px;'; echo '      -o-border-radius: 10px;'; echo '    }'; echo '  </style>';   echo '</head>'   echo '<body>'   echo ""   echo ""   echo ""   echo "<ul>"   awk '{print "<li><a href=\""$1"\">",$1,"&nbsp;</a></li>"}' $listing   echo ""   echo "</ul>"   echo "</body>"   echo "</html>" }
cmd $listing --sort=extension >>$html
sudo sed -i '/\.html/!d' ./index.html
git add .
node index.js Trouble Shooting Log.xlsx
node index.js troubleShooting.xlsx
find . -name "*.zip" | while read filename; do unzip -o -d "`dirname "$filename"`" "$filename"; done;
node index.js SampleData.xlsx
git init
git add .
git remote add origin https://github.com/bgoonz/excel2html-table.git
git commit -m "initial commit"
git push -u origin master
git add .
git commit -m "initial commit"
git push 
tree -d -L 2
tree -L 2
#!/bin/sh
# find ./ | grep -i "\.*$" >files
find ./ | sed -E -e 's/([^ ]+[ ]+){8}//' | grep -i "\.*$">files
listing="files"
out=""
html="index.html"
out="basename $out.html"
html="index.html"
cmd() {   echo '  <!DOCTYPE html>';   echo '<html>';   echo '<head>'   echo '  <meta http-equiv="Content-Type" content="text/html">'   echo '  <meta name="Author" content="Bryan Guner">';   echo '<link rel="stylesheet" href="./assets/prism.css">';   echo ' <link rel="stylesheet" href="./assets/style.css">';   echo ' <script async defer src="./assets/prism.js"></script>'   echo "  <title> directory </title>"   echo "";   echo '<style>'; echo '    a {'; echo '      color: black;'; echo '    }'; echo ''; echo '    li {'; echo '      border: 1px solid black !important;'; echo '      font-size: 20px;'; echo '      letter-spacing: 0px;'; echo '      font-weight: 700;'; echo '      line-height: 16px;'; echo '      text-decoration: none !important;'; echo '      text-transform: uppercase;'; echo '      background: #194ccdaf !important;'; echo '      color: black !important;'; echo '      border: none;'; echo '      cursor: pointer;'; echo '      justify-content: center;'; echo '      padding: 30px 60px;'; echo '      height: 48px;'; echo '      text-align: center;'; echo '      white-space: normal;'; echo '      border-radius: 10px;'; echo '      min-width: 45em;'; echo '      padding: 1.2em 1em 0;'; echo '      box-shadow: 0 0 5px;'; echo '      margin: 1em;'; echo '      display: grid;'; echo '      -webkit-border-radius: 10px;'; echo '      -moz-border-radius: 10px;'; echo '      -ms-border-radius: 10px;'; echo '      -o-border-radius: 10px;'; echo '    }'; echo '  </style>';   echo '</head>'   echo '<body>'   echo ""   echo ""   echo ""   echo "<ul>"   awk '{print "<li><a href=\""$1"\">",$1,"&nbsp;</a></li>"}' $listing   echo ""   echo "</ul>"   echo "</body>"   echo "</html>" }
cmd $listing --sort=extension >>$html
git init
git add .
git push 
git add .
git commit -m "commit 1"
git push -u origin master
find './' \( -name "*SECURITY.txt" -o -name "*RELEASE.txt" -o  -name "*CHANGELOG.txt" -o -name "*LICENSE.txt" -o -name "*CONTRIBUTING.txt" -name "*HISTORY.md" -o -name "*LICENSE" -o -name "*license" -o -name "*License" -o -name "*SECURITY.md" -o -name "*RELEASE.md" -o  -name "*CHANGELOG.md" -o -name "*LICENSE.md" -o -name "*CODE_OF_CONDUCT.md" -o -name "*CONTRIBUTING.md" \) -exec rm -rf -- {} +
git remote add origin https://github.com/bgoonz/Express-basic-server-template.git
find . \( -name "*SECURITY.txt" -o -name "*RELEASE.txt" -o  -name "*CHANGELOG.txt" -o -name "*LICENSE.txt" -o -name "*CONTRIBUTING.txt" -name "*HISTORY.md" -o -name "*LICENSE" -o -name "*SECURITY.md" -o -name "*RELEASE.md" -o  -name "*CHANGELOG.md" -o -name "*LICENSE.md" -o -name "*CODE_OF_CONDUCT.md" -o -name "*CONTRIBUTING.md" \) -exec rm -rf -- {} +
find . \( -name "*SECURITY.txt" -o -name "*RELEASE.txt" -o  -name "*CHANGELOG.txt" -o  -name "*License" -o -name "*LICENSE.txt" -o -name "*CONTRIBUTING.txt" -name "*HISTORY.md" -o -name "*LICENSE" -o -name "*SECURITY.md" -o -name "*RELEASE.md" -o  -name "*CHANGELOG.md" -o -name "*LICENSE.md" -o -name "*CODE_OF_CONDUCT.md" -o -name "*CONTRIBUTING.md" \) -exec rm -rf -- {} +
find . \( -name "*SECURITY.txt" -o -name "*RELEASE.txt" -o  -name "*CHANGELOG.txt" -o -name "*LICENSE.txt" -o -name "*CONTRIBUTING.txt" -name "*HISTORY.md" -o -name "*LICENSE" -o -name "*license" -o -name "*License" -o -name "*SECURITY.md" -o -name "*RELEASE.md" -o  -name "*CHANGELOG.md" -o -name "*LICENSE.md" -o -name "*CODE_OF_CONDUCT.md" -o -name "*CONTRIBUTING.md" \) -exec rm -rf -- {} +
find './' \( -name "*SECURITY.txt" -o -name "*RELEASE.txt" -o  -name "*CHANGELOG.txt" -o -name "*LICENSE.txt" -o -name "*CONTRIBUTING.txt" -name "*HISTORY.md" -o -name "*LICENSE" -o -name "*license" -o -name "*License" -o -name "*SECURITY.md" -o -name "*RELEASE.md" -o  -name "*CHANGELOG.md" -o -name "*LICENSE.md" -o -name "*CODE_OF_CONDUCT.md" -o -name "*CONTRIBUTING.md" \) -exec rm -rf -- {} +
git commit -m "initial commit"
git push -u origin master
git add .
git commit -m "initial commit"
git push -u origin master
find . -name "*.zip" | while read filename; do unzip -o -d "`dirname "$filename"`" "$filename"; done;
find . -name "*.zip" -type f -print -delete
find . -empty -type f -print -delete
find . -empty -type d -print -delete
wget -r https://html-cleaner.com/
wget -r -A https://divtable.com/generator/
wget -r -A https://divtable.com/
wget -r -A https://divtable.com
wget -r https://divtable.com/generator/
git add .
httrack --ext-depth=4 https://nannalagerman.com/
find . -type f -exec mv '{}' '{}'.html \;
wget -r https://nannalagerman.com/
wget -r -A https://nannalagerman.com/
wget -r -A js https://nannalagerman.com/
find . -empty -type f -print -delete
find . -empty -type d -print -delete
find . \( -name ".git" -o -name ".gitignore" -o -name ".gitmodules" -o -name ".gitattributes" \) -exec rm -rf -- {} +
find . \( -name "*SECURITY.txt" -o -name "*RELEASE.txt" -o  -name "*CHANGELOG.txt" -o -name "*LICENSE.txt" -o -name "*CONTRIBUTING.txt" -name "*HISTORY.md" -o -name "*LICENSE" -o -name "*SECURITY.md" -o -name "*RELEASE.md" -o  -name "*CHANGELOG.md" -o -name "*LICENSE.md" -o -name "*CODE_OF_CONDUCT.md" -o -name "*CONTRIBUTING.md" \) -exec rm -rf -- {} +
find . -empty -type f -print -delete
find . -empty -type d -print -delete
find . \( -name ".git" -o -name ".gitignore" -o -name ".gitmodules" -o -name ".gitattributes" \) -exec rm -rf -- {} +
find . \( -name "*SECURITY.txt" -o -name "*RELEASE.txt" -o  -name "*CHANGELOG.txt" -o -name "*LICENSE.txt" -o -name "*CONTRIBUTING.txt" -name "*HISTORY.md" -o -name "*LICENSE" -o -name "*SECURITY.md" -o -name "*RELEASE.md" -o  -name "*CHANGELOG.md" -o -name "*LICENSE.md" -o -name "*CODE_OF_CONDUCT.md" -o -name "*CONTRIBUTING.md" \) -exec rm -rf -- {} +
git add .
chmod -x script.sh
find . -type d -exec ./script.sh '{}'\;

# find ./ | grep -i "\.*$" >files
find ./ | sed -E -e 's/([^ ]+[ ]+){8}//' | grep -i "\.*$">files
listing="files"
out=""
html="index.html"
out="basename $out.html"
html="index.html"
cmd() {   echo '  <!DOCTYPE html>';   echo '<html>';   echo '<head>'   echo '  <meta http-equiv="Content-Type" content="text/html">'   echo '  <meta name="Author" content="Bryan Guner">';   echo '<link rel="stylesheet" href="./assets/prism.css">';   echo ' <link rel="stylesheet" href="./assets/style.css">';   echo ' <script async defer src="./assets/prism.js"></script>'   echo "  <title> directory </title>"   echo "";   echo '<style>'; echo '    a {'; echo '      color: black;'; echo '    }'; echo ''; echo '    li {'; echo '      border: 1px solid black !important;'; echo '      font-size: 20px;'; echo '      letter-spacing: 0px;'; echo '      font-weight: 700;'; echo '      line-height: 16px;'; echo '      text-decoration: none !important;'; echo '      text-transform: uppercase;'; echo '      background: #194ccdaf !important;'; echo '      color: black !important;'; echo '      border: none;'; echo '      cursor: pointer;'; echo '      justify-content: center;'; echo '      padding: 30px 60px;'; echo '      height: 48px;'; echo '      text-align: center;'; echo '      white-space: normal;'; echo '      border-radius: 10px;'; echo '      min-width: 45em;'; echo '      padding: 1.2em 1em 0;'; echo '      box-shadow: 0 0 5px;'; echo '      margin: 1em;'; echo '      display: grid;'; echo '      -webkit-border-radius: 10px;'; echo '      -moz-border-radius: 10px;'; echo '      -ms-border-radius: 10px;'; echo '      -o-border-radius: 10px;'; echo '    }'; echo '  </style>';   echo '</head>'   echo '<body>'   echo ""   echo ""   echo ""   echo "<ul>"   awk '{print "<li><a href=\""$1"\">",$1,"&nbsp;</a></li>"}' $listing   echo ""   echo "</ul>"   echo "</body>"   echo "</html>" }
cmd $listing --sort=extension >>$html
" \;
find some/dir -type f -execdir pwd && #!/bin/sh
find ./ | sed -E -e 's/([^ ]+[ ]+){8}//' | grep -i "\.*$">files
listing="files"
out=""
html="index.html"
out="basename $out.html"
html="index.html"
cmd() {   echo '  <!DOCTYPE html>';   echo '<html>';   echo '<head>'   echo '  <meta http-equiv="Content-Type" content="text/html">'   echo '  <meta name="Author" content="Bryan Guner">';   echo '<link rel="stylesheet" href="./assets/prism.css">';   echo ' <link rel="stylesheet" href="./assets/style.css">';   echo ' <script async defer src="./assets/prism.js"></script>'   echo "  <title> directory </title>"   echo "";   echo '<style>'; echo '    a {'; echo '      color: black;'; echo '    }'; echo ''; echo '    li {'; echo '      border: 1px solid black !important;'; echo '      font-size: 20px;'; echo '      letter-spacing: 0px;'; echo '      font-weight: 700;'; echo '      line-height: 16px;'; echo '      text-decoration: none !important;'; echo '      text-transform: uppercase;'; echo '      background: #194ccdaf !important;'; echo '      color: black !important;'; echo '      border: none;'; echo '      cursor: pointer;'; echo '      justify-content: center;'; echo '      padding: 30px 60px;'; echo '      height: 48px;'; echo '      text-align: center;'; echo '      white-space: normal;'; echo '      border-radius: 10px;'; echo '      min-width: 45em;'; echo '      padding: 1.2em 1em 0;'; echo '      box-shadow: 0 0 5px;'; echo '      margin: 1em;'; echo '      display: grid;'; echo '      -webkit-border-radius: 10px;'; echo '      -moz-border-radius: 10px;'; echo '      -ms-border-radius: 10px;'; echo '      -o-border-radius: 10px;'; echo '    }'; echo '  </style>';   echo '</head>'   echo '<body>'   echo ""   echo ""   echo ""   echo "<ul>"   awk '{print "<li><a href=\""$1"\">",$1,"&nbsp;</a></li>"}' $listing   echo ""   echo "</ul>"   echo "</body>"   echo "</html>" }
cmd $listing --sort=extension >>$html
find some/dir -type f -execdir pwd && (
find ./ | sed -E -e 's/([^ ]+[ ]+){8}//' | grep -i "\.*$">files; listing="files" out="" html="index.html"; out="basename $out.html"; html="index.html"; cmd() {   echo '  <!DOCTYPE html>';   echo '<html>';   echo '<head>'   echo '  <meta http-equiv="Content-Type" content="text/html">'   echo '  <meta name="Author" content="Bryan Guner">';   echo '<link rel="stylesheet" href="./assets/prism.css">';   echo ' <link rel="stylesheet" href="./assets/style.css">';   echo ' <script async defer src="./assets/prism.js"></script>'   echo "  <title> directory </title>"   echo "";   echo '<style>'; echo '    a {'; echo '      color: black;'; echo '    }'; echo ''; echo '    li {'; echo '      border: 1px solid black !important;'; echo '      font-size: 20px;'; echo '      letter-spacing: 0px;'; echo '      font-weight: 700;'; echo '      line-height: 16px;'; echo '      text-decoration: none !important;'; echo '      text-transform: uppercase;'; echo '      background: #194ccdaf !important;'; echo '      color: black !important;'; echo '      border: none;'; echo '      cursor: pointer;'; echo '      justify-content: center;'; echo '      padding: 30px 60px;'; echo '      height: 48px;'; echo '      text-align: center;'; echo '      white-space: normal;'; echo '      border-radius: 10px;'; echo '      min-width: 45em;'; echo '      padding: 1.2em 1em 0;'; echo '      box-shadow: 0 0 5px;'; echo '      margin: 1em;'; echo '      display: grid;'; echo '      -webkit-border-radius: 10px;'; echo '      -moz-border-radius: 10px;'; echo '      -ms-border-radius: 10px;'; echo '      -o-border-radius: 10px;'; echo '    }'; echo '  </style>';   echo '</head>'   echo '<body>'   echo ""   echo ""   echo ""   echo "<ul>"   awk '{print "<li><a href=\""$1"\">",$1,"&nbsp;</a></li>"}' $listing   echo ""   echo "</ul>"   echo "</body>"   echo "</html>" } cmd $listing --sort=extension >>$html) {} \;
find some/dir -type f -execdir pwd && '(
#!/bin/sh

# find ./ | grep -i "\.*$" >files
find ./ | sed -E -e 's/([^ ]+[ ]+){8}//' | grep -i "\.*$">files
listing="files"
out=""
html="index.html"
out="basename $out.html"
html="index.html"
cmd() {   echo '  <!DOCTYPE html>';   echo '<html>';   echo '<head>'   echo '  <meta http-equiv="Content-Type" content="text/html">'   echo '  <meta name="Author" content="Bryan Guner">';   echo '<link rel="stylesheet" href="./assets/prism.css">';   echo ' <link rel="stylesheet" href="./assets/style.css">';   echo ' <script async defer src="./assets/prism.js"></script>'   echo "  <title> directory </title>"   echo "";   echo '<style>'; echo '    a {'; echo '      color: black;'; echo '    }'; echo ''; echo '    li {'; echo '      border: 1px solid black !important;'; echo '      font-size: 20px;'; echo '      letter-spacing: 0px;'; echo '      font-weight: 700;'; echo '      line-height: 16px;'; echo '      text-decoration: none !important;'; echo '      text-transform: uppercase;'; echo '      background: #194ccdaf !important;'; echo '      color: black !important;'; echo '      border: none;'; echo '      cursor: pointer;'; echo '      justify-content: center;'; echo '      padding: 30px 60px;'; echo '      height: 48px;'; echo '      text-align: center;'; echo '      white-space: normal;'; echo '      border-radius: 10px;'; echo '      min-width: 45em;'; echo '      padding: 1.2em 1em 0;'; echo '      box-shadow: 0 0 5px;'; echo '      margin: 1em;'; echo '      display: grid;'; echo '      -webkit-border-radius: 10px;'; echo '      -moz-border-radius: 10px;'; echo '      -ms-border-radius: 10px;'; echo '      -o-border-radius: 10px;'; echo '    }'; echo '  </style>';   echo '</head>'   echo '<body>'   echo ""   echo ""   echo ""   echo "<ul>"   awk '{print "<li><a href=\""$1"\">",$1,"&nbsp;</a></li>"}' $listing   echo ""   echo "</ul>"   echo "</body>"   echo "</html>" }
cmd $listing --sort=extension >>$html) '{} \;
find some/dir -type f -execdir pwd && {
find ./ | sed -E -e 's/([^ ]+[ ]+){8}//' | grep -i "\.*$">files; listing="files" out="" html="index.html"; out="basename $out.html"; html="index.html"; cmd() {   echo '  <!DOCTYPE html>';   echo '<html>';   echo '<head>'   echo '  <meta http-equiv="Content-Type" content="text/html">'   echo '  <meta name="Author" content="Bryan Guner">';   echo '<link rel="stylesheet" href="./assets/prism.css">';   echo ' <link rel="stylesheet" href="./assets/style.css">';   echo ' <script async defer src="./assets/prism.js"></script>'   echo "  <title> directory </title>"   echo "";   echo '<style>'; echo '    a {'; echo '      color: black;'; echo '    }'; echo ''; echo '    li {'; echo '      border: 1px solid black !important;'; echo '      font-size: 20px;'; echo '      letter-spacing: 0px;'; echo '      font-weight: 700;'; echo '      line-height: 16px;'; echo '      text-decoration: none !important;'; echo '      text-transform: uppercase;'; echo '      background: #194ccdaf !important;'; echo '      color: black !important;'; echo '      border: none;'; echo '      cursor: pointer;'; echo '      justify-content: center;'; echo '      padding: 30px 60px;'; echo '      height: 48px;'; echo '      text-align: center;'; echo '      white-space: normal;'; echo '      border-radius: 10px;'; echo '      min-width: 45em;'; echo '      padding: 1.2em 1em 0;'; echo '      box-shadow: 0 0 5px;'; echo '      margin: 1em;'; echo '      display: grid;'; echo '      -webkit-border-radius: 10px;'; echo '      -moz-border-radius: 10px;'; echo '      -ms-border-radius: 10px;'; echo '      -o-border-radius: 10px;'; echo '    }'; echo '  </style>';   echo '</head>'   echo '<body>'   echo ""   echo ""   echo ""   echo "<ul>"   awk '{print "<li><a href=\""$1"\">",$1,"&nbsp;</a></li>"}' $listing   echo ""   echo "</ul>"   echo "</body>"   echo "</html>" } cmd $listing --sort=extension >>$html};  {} \; ;
find some/dir -type f -execdir pwd && cmd(){
find ./ | sed -E -e 's/([^ ]+[ ]+){8}//' | grep -i "\.*$">files; listing="files" out="" html="index.html"; out="basename $out.html"; html="index.html"; cmd() {   echo '  <!DOCTYPE html>';   echo '<html>';   echo '<head>'   echo '  <meta http-equiv="Content-Type" content="text/html">'   echo '  <meta name="Author" content="Bryan Guner">';   echo '<link rel="stylesheet" href="./assets/prism.css">';   echo ' <link rel="stylesheet" href="./assets/style.css">';   echo ' <script async defer src="./assets/prism.js"></script>'   echo "  <title> directory </title>"   echo "";   echo '<style>'; echo '    a {'; echo '      color: black;'; echo '    }'; echo ''; echo '    li {'; echo '      border: 1px solid black !important;'; echo '      font-size: 20px;'; echo '      letter-spacing: 0px;'; echo '      font-weight: 700;'; echo '      line-height: 16px;'; echo '      text-decoration: none !important;'; echo '      text-transform: uppercase;'; echo '      background: #194ccdaf !important;'; echo '      color: black !important;'; echo '      border: none;'; echo '      cursor: pointer;'; echo '      justify-content: center;'; echo '      padding: 30px 60px;'; echo '      height: 48px;'; echo '      text-align: center;'; echo '      white-space: normal;'; echo '      border-radius: 10px;'; echo '      min-width: 45em;'; echo '      padding: 1.2em 1em 0;'; echo '      box-shadow: 0 0 5px;'; echo '      margin: 1em;'; echo '      display: grid;'; echo '      -webkit-border-radius: 10px;'; echo '      -moz-border-radius: 10px;'; echo '      -ms-border-radius: 10px;'; echo '      -o-border-radius: 10px;'; echo '    }'; echo '  </style>';   echo '</head>'   echo '<body>'   echo ""   echo ""   echo ""   echo "<ul>"   awk '{print "<li><a href=\""$1"\">",$1,"&nbsp;</a></li>"}' $listing   echo ""   echo "</ul>"   echo "</body>"   echo "</html>" }cmd $listing --sort=extension >>$html}{} \;; ;
find some/dir -type f -execdir pwd && cmd(){
find ./ | sed -E -e 's/([^ ]+[ ]+){8}//' | grep -i "\.*$">files; listing="files" out="" html="index.html"; out="basename $out.html"; html="index.html"; cmd() {   echo '  <!DOCTYPE html>';   echo '<html>';   echo '<head>'   echo '  <meta http-equiv="Content-Type" content="text/html">'   echo '  <meta name="Author" content="Bryan Guner">';   echo '<link rel="stylesheet" href="./assets/prism.css">';   echo ' <link rel="stylesheet" href="./assets/style.css">';   echo ' <script async defer src="./assets/prism.js"></script>'   echo "  <title> directory </title>"   echo "";   echo '<style>'; echo '    a {'; echo '      color: black;'; echo '    }'; echo ''; echo '    li {'; echo '      border: 1px solid black !important;'; echo '      font-size: 20px;'; echo '      letter-spacing: 0px;'; echo '      font-weight: 700;'; echo '      line-height: 16px;'; echo '      text-decoration: none !important;'; echo '      text-transform: uppercase;'; echo '      background: #194ccdaf !important;'; echo '      color: black !important;'; echo '      border: none;'; echo '      cursor: pointer;'; echo '      justify-content: center;'; echo '      padding: 30px 60px;'; echo '      height: 48px;'; echo '      text-align: center;'; echo '      white-space: normal;'; echo '      border-radius: 10px;'; echo '      min-width: 45em;'; echo '      padding: 1.2em 1em 0;'; echo '      box-shadow: 0 0 5px;'; echo '      margin: 1em;'; echo '      display: grid;'; echo '      -webkit-border-radius: 10px;'; echo '      -moz-border-radius: 10px;'; echo '      -ms-border-radius: 10px;'; echo '      -o-border-radius: 10px;'; echo '    }'; echo '  </style>';   echo '</head>'   echo '<body>'   echo ""   echo ""   echo ""   echo "<ul>"   awk '{print "<li><a href=\""$1"\">",$1,"&nbsp;</a></li>"}' $listing   echo ""   echo "</ul>"   echo "</body>"   echo "</html>" }cmd $listing --sort=extension >>$html;}{} \;; ;
#!/bin/sh
find some/dir -type f -execdir pwd && {
find ./ | sed -E -e 's/([^ ]+[ ]+){8}//' | grep -i "\.*$">files; listing="files"; out=""; html="index.html"; out="basename $out.html"; html="index.html"; cmd() {   echo '  <!DOCTYPE html>';   echo '<html>';   echo '<head>'   echo '  <meta http-equiv="Content-Type" content="text/html">'   echo '  <meta name="Author" content="Bryan Guner">';   echo '<link rel="stylesheet" href="./assets/prism.css">';   echo ' <link rel="stylesheet" href="./assets/style.css">';   echo ' <script async defer src="./assets/prism.js"></script>'   echo "  <title> directory </title>"   echo "";   echo '<style>'; echo '    a {'; echo '      color: black;'; echo '    }'; echo ''; echo '    li {'; echo '      border: 1px solid black !important;'; echo '      font-size: 20px;'; echo '      letter-spacing: 0px;'; echo '      font-weight: 700;'; echo '      line-height: 16px;'; echo '      text-decoration: none !important;'; echo '      text-transform: uppercase;'; echo '      background: #194ccdaf !important;'; echo '      color: black !important;'; echo '      border: none;'; echo '      cursor: pointer;'; echo '      justify-content: center;'; echo '      padding: 30px 60px;'; echo '      height: 48px;'; echo '      text-align: center;'; echo '      white-space: normal;'; echo '      border-radius: 10px;'; echo '      min-width: 45em;'; echo '      padding: 1.2em 1em 0;'; echo '      box-shadow: 0 0 5px;'; echo '      margin: 1em;'; echo '      display: grid;'; echo '      -webkit-border-radius: 10px;'; echo '      -moz-border-radius: 10px;'; echo '      -ms-border-radius: 10px;'; echo '      -o-border-radius: 10px;'; echo '    }'; echo '  </style>';   echo '</head>'   echo '<body>'   echo ""   echo ""   echo ""   echo "<ul>"   awk '{print "<li><a href=\""$1"\">",$1,"&nbsp;</a></li>"}' $listing   echo ""   echo "</ul>"   echo "</body>"   echo "</html>" }cmd $listing --sort=extension >>$html;}{} \;; ;
#!/bin/sh
find some/dir -type f -execdir pwd && '{


# find ./ | grep -i "\.*$" >files
find ./ | sed -E -e 's/([^ ]+[ ]+){8}//' | grep -i "\.*$">files;
listing="files";
out="";
html="index.html";
out="basename $out.html";
html="index.html";
cmd() {   echo '  <!DOCTYPE html>';   echo '<html>';   echo '<head>'   echo '  <meta http-equiv="Content-Type" content="text/html">'   echo '  <meta name="Author" content="Bryan Guner">';   echo '<link rel="stylesheet" href="./assets/prism.css">';   echo ' <link rel="stylesheet" href="./assets/style.css">';   echo ' <script async defer src="./assets/prism.js"></script>'   echo "  <title> directory </title>"   echo "";   echo '<style>'; echo '    a {'; echo '      color: black;'; echo '    }'; echo ''; echo '    li {'; echo '      border: 1px solid black !important;'; echo '      font-size: 20px;'; echo '      letter-spacing: 0px;'; echo '      font-weight: 700;'; echo '      line-height: 16px;'; echo '      text-decoration: none !important;'; echo '      text-transform: uppercase;'; echo '      background: #194ccdaf !important;'; echo '      color: black !important;'; echo '      border: none;'; echo '      cursor: pointer;'; echo '      justify-content: center;'; echo '      padding: 30px 60px;'; echo '      height: 48px;'; echo '      text-align: center;'; echo '      white-space: normal;'; echo '      border-radius: 10px;'; echo '      min-width: 45em;'; echo '      padding: 1.2em 1em 0;'; echo '      box-shadow: 0 0 5px;'; echo '      margin: 1em;'; echo '      display: grid;'; echo '      -webkit-border-radius: 10px;'; echo '      -moz-border-radius: 10px;'; echo '      -ms-border-radius: 10px;'; echo '      -o-border-radius: 10px;'; echo '    }'; echo '  </style>';   echo '</head>'   echo '<body>'   echo ""   echo ""   echo ""   echo "<ul>"   awk '{print "<li><a href=\""$1"\">",$1,"&nbsp;</a></li>"}' $listing   echo ""   echo "</ul>"   echo "</body>"   echo "</html>" }cmd $listing --sort=extension >>$html;}'{} \;
;
for f in */; do nf=$(echo "$f" |sed -e 's/[^A-Za-z0-9.]/./g' -e 's/\.\.\././g' -e 's/\.\././g' -e 's/\.*$//'); test "$f" != "$nf" && mv "$f" "$nf" && echo "$nf"; done
for f in */; do nf=$(echo "$f" |sed -e 's/[^A-Za-z0-9.]//g' -e 's/\.\.\././g' -e 's/\.\././g' -e 's/\.*$//'); test "$f" != "$nf" && mv "$f" "$nf" && echo "$nf"; done
for f in */; do nf=$(echo "$f" |sed -e 's/[^A-Za-z0-9.]/''/g' -e 's/\.\.\././g' -e 's/\.\././g' -e 's/\.*$//'); test "$f" != "$nf" && mv "$f" "$nf" && echo "$nf"; done
for f in */; do nf=$(echo "$f" |sed -e 's/[^A-Za-z0-9.]/'-'/g' -e 's/\.\.\././g' -e 's/\.\././g' -e 's/\.*$//'); test "$f" != "$nf" && mv "$f" "$nf" && echo "$nf"; done
for f in *; do nf=$(echo "$f" |sed -e 's/[^A-Za-z0-9.-]/./g;s/\.\.\././g;s/\.\././g'); test "$f" != "$nf" && mv "$f" "$nf" && echo "$nf"; done
find . -depth -exec rmdir {} \;  
find . -empty -type f -print -delete
find . -empty -type d -print -delete
find . \( -name ".git" -o -name ".gitignore" -o -name ".gitmodules" -o -name ".gitattributes" \) -exec rm -rf -- {} +
find . -type d -exec ./script.sh {} \;
find / -maxdepth 2 -type d -exec ./script.sh {} \;
find . -maxdepth 2 -type d -exec ./script.sh {} \;
git init 
git add .
git remote add origin https://github.com/bgoonz/animated-resume.git
git commit -m "initial commit"
git push -u origin master
sudo sed -i '/\.git/d' ./index.html
sudo sed -i '/images/d' ./index.html
sudo sed -i '/font/d' ./index.html
sudo sed -i '/fonts/d' ./index.html
sudo sed -i '/\.TTF/d' ./index.html
sudo sed -i '/\.git/d' ./index.html
sudo sed -i '/\.js/d' ./index.html
sudo sed -i '/\.php/d' ./index.html
sudo sed -i '/\.css/d' ./index.html
sudo sed -i '/\.git/d' ./index.html
sudo sed -i '/images/d' ./index.html
sudo sed -i '/font/d' ./index.html
sudo sed -i '/fonts/d' ./index.html
sudo sed -i '/\.TTF/d' ./index.html
sudo sed -i '/\.git/d' ./index.html
sudo sed -i '/\.js/d' ./index.html
sudo sed -i '/\.php/d' ./index.html
sudo sed -i '/\.git/d' ./index.html
sudo sed -i '/images/d' ./index.html
sudo sed -i '/font/d' ./index.html
sudo sed -i '/fonts/d' ./index.html
sudo sed -i '/\.TTF/d' ./index.html
sudo sed -i '/\.git/d' ./index.html
sudo sed -i '/\.js/d' ./index.html
sudo sed -i '/\.php/d' ./index.html
sudo sed -i '/\.git/d' ./index.html
sudo sed -i '/images/d' ./index.html
sudo sed -i '/font/d' ./index.html
sudo sed -i '/fonts/d' ./index.html
sudo sed -i '/\.TTF/d' ./index.html
sudo sed -i '/\.git/d' ./index.html
sudo sed -i '/\.js/d' ./index.html
sudo sed -i '/\.php/d' ./index.html
sudo sed -i '/\.git/d' ./index.html
sudo sed -i '/images/d' ./index.html
sudo sed -i '/font/d' ./index.html
sudo sed -i '/fonts/d' ./index.html
sudo sed -i '/\.TTF/d' ./index.html
sudo sed -i '/\.git/d' ./index.html
sudo sed -i '/\.js/d' ./index.html
sudo sed -i '/\.php/d' ./index.html
#!/bin/sh
# find ./ | grep -i "\.*$" >files
find ./ | sed -E -e 's/([^ ]+[ ]+){8}//' | grep -i "\.*$">files
listing="files"
out=""
html="index.html"
out="basename $out.html"
html="index.html"
cmd() {   echo '  <!DOCTYPE html>';   echo '<html>';   echo '<head>'   echo '  <meta http-equiv="Content-Type" content="text/html">'   echo '  <meta name="Author" content="Bryan Guner">';   echo '<link rel="stylesheet" href="./assets/prism.css">';   echo ' <link rel="stylesheet" href="./assets/style.css">';   echo ' <script async defer src="./assets/prism.js"></script>'   echo "  <title> directory </title>"   echo "";   echo '<style>'; echo '    a {'; echo '      color: black;'; echo '    }'; echo ''; echo '    li {'; echo '      border: 1px solid black !important;'; echo '      font-size: 20px;'; echo '      letter-spacing: 0px;'; echo '      font-weight: 700;'; echo '      line-height: 16px;'; echo '      text-decoration: none !important;'; echo '      text-transform: uppercase;'; echo '      background: #194ccdaf !important;'; echo '      color: black !important;'; echo '      border: none;'; echo '      cursor: pointer;'; echo '      justify-content: center;'; echo '      padding: 30px 60px;'; echo '      height: 48px;'; echo '      text-align: center;'; echo '      white-space: normal;'; echo '      border-radius: 10px;'; echo '      min-width: 45em;'; echo '      padding: 1.2em 1em 0;'; echo '      box-shadow: 0 0 5px;'; echo '      margin: 1em;'; echo '      display: grid;'; echo '      -webkit-border-radius: 10px;'; echo '      -moz-border-radius: 10px;'; echo '      -ms-border-radius: 10px;'; echo '      -o-border-radius: 10px;'; echo '    }'; echo '  </style>';   echo '</head>'   echo '<body>'   echo ""   echo ""   echo ""   echo "<ul>"   awk '{print "<li><a href=\""$1"\">",$1,"&nbsp;</a></li>"}' $listing   echo ""   echo "</ul>"   echo "</body>"   echo "</html>" }
cmd $listing --sort=extension >>$html
sudo sed -i '/\.git/d' ./index.html
#!/bin/sh
# find ./ | grep -i "\.*$" >files
find ./ | sed -E -e 's/([^ ]+[ ]+){8}//' | grep -i "\.*$">files
listing="files"
out=""
html="index.html"
out="basename $out.html"
html="index.html"
cmd() {   echo '  <!DOCTYPE html>';   echo '<html>';   echo '<head>'   echo '  <meta http-equiv="Content-Type" content="text/html">'   echo '  <meta name="Author" content="Bryan Guner">';   echo '<link rel="stylesheet" href="./assets/prism.css">';   echo ' <link rel="stylesheet" href="./assets/style.css">';   echo ' <script async defer src="./assets/prism.js"></script>'   echo "  <title> directory </title>"   echo "";   echo '<style>'; echo '    a {'; echo '      color: black;'; echo '    }'; echo ''; echo '    li {'; echo '      border: 1px solid black !important;'; echo '      font-size: 20px;'; echo '      letter-spacing: 0px;'; echo '      font-weight: 700;'; echo '      line-height: 16px;'; echo '      text-decoration: none !important;'; echo '      text-transform: uppercase;'; echo '      background: #194ccdaf !important;'; echo '      color: black !important;'; echo '      border: none;'; echo '      cursor: pointer;'; echo '      justify-content: center;'; echo '      padding: 30px 60px;'; echo '      height: 48px;'; echo '      text-align: center;'; echo '      white-space: normal;'; echo '      border-radius: 10px;'; echo '      min-width: 45em;'; echo '      padding: 1.2em 1em 0;'; echo '      box-shadow: 0 0 5px;'; echo '      margin: 1em;'; echo '      display: grid;'; echo '      -webkit-border-radius: 10px;'; echo '      -moz-border-radius: 10px;'; echo '      -ms-border-radius: 10px;'; echo '      -o-border-radius: 10px;'; echo '    }'; echo '  </style>';   echo '</head>'   echo '<body>'   echo ""   echo ""   echo ""   echo "<ul>"   awk '{print "<li><a href=\""$1"\">",$1,"&nbsp;</a></li>"}' $listing   echo ""   echo "</ul>"   echo "</body>"   echo "</html>" }
cmd $listing --sort=extension >>$html
#!/bin/sh
# find ./ | grep -i "\.*$" >files
find ./ | sed -E -e 's/([^ ]+[ ]+){8}//' | grep -i "\.*$">files
listing="files"
out=""
html="index.html"
out="basename $out.html"
html="index.html"
cmd() {   echo '  <!DOCTYPE html>';   echo '<html>';   echo '<head>'   echo '  <meta http-equiv="Content-Type" content="text/html">'   echo '  <meta name="Author" content="Bryan Guner">';   echo '<link rel="stylesheet" href="./assets/prism.css">';   echo ' <link rel="stylesheet" href="./assets/style.css">';   echo ' <script async defer src="./assets/prism.js"></script>'   echo "  <title> directory </title>"   echo "";   echo '<style>'; echo '    a {'; echo '      color: black;'; echo '    }'; echo ''; echo '    li {'; echo '      border: 1px solid black !important;'; echo '      font-size: 20px;'; echo '      letter-spacing: 0px;'; echo '      font-weight: 700;'; echo '      line-height: 16px;'; echo '      text-decoration: none !important;'; echo '      text-transform: uppercase;'; echo '      background: #194ccdaf !important;'; echo '      color: black !important;'; echo '      border: none;'; echo '      cursor: pointer;'; echo '      justify-content: center;'; echo '      padding: 30px 60px;'; echo '      height: 48px;'; echo '      text-align: center;'; echo '      white-space: normal;'; echo '      border-radius: 10px;'; echo '      min-width: 45em;'; echo '      padding: 1.2em 1em 0;'; echo '      box-shadow: 0 0 5px;'; echo '      margin: 1em;'; echo '      display: grid;'; echo '      -webkit-border-radius: 10px;'; echo '      -moz-border-radius: 10px;'; echo '      -ms-border-radius: 10px;'; echo '      -o-border-radius: 10px;'; echo '    }'; echo '  </style>';   echo '</head>'   echo '<body>'   echo ""   echo ""   echo ""   echo "<ul>"   awk '{print "<li><a href=\""$1"\">",$1,"&nbsp;</a></li>"}' $listing   echo ""   echo "</ul>"   echo "</body>"   echo "</html>" }
cmd $listing --sort=extension >>$html
#!/bin/sh
# find ./ | grep -i "\.*$" >files
find ./ | sed -E -e 's/([^ ]+[ ]+){8}//' | grep -i "\.*$">files
listing="files"
out=""
html="index.html"
out="basename $out.html"
html="index.html"
cmd() {   echo '  <!DOCTYPE html>';   echo '<html>';   echo '<head>'   echo '  <meta http-equiv="Content-Type" content="text/html">'   echo '  <meta name="Author" content="Bryan Guner">';   echo '<link rel="stylesheet" href="./assets/prism.css">';   echo ' <link rel="stylesheet" href="./assets/style.css">';   echo ' <script async defer src="./assets/prism.js"></script>'   echo "  <title> directory </title>"   echo "";   echo '<style>'; echo '    a {'; echo '      color: black;'; echo '    }'; echo ''; echo '    li {'; echo '      border: 1px solid black !important;'; echo '      font-size: 20px;'; echo '      letter-spacing: 0px;'; echo '      font-weight: 700;'; echo '      line-height: 16px;'; echo '      text-decoration: none !important;'; echo '      text-transform: uppercase;'; echo '      background: #194ccdaf !important;'; echo '      color: black !important;'; echo '      border: none;'; echo '      cursor: pointer;'; echo '      justify-content: center;'; echo '      padding: 30px 60px;'; echo '      height: 48px;'; echo '      text-align: center;'; echo '      white-space: normal;'; echo '      border-radius: 10px;'; echo '      min-width: 45em;'; echo '      padding: 1.2em 1em 0;'; echo '      box-shadow: 0 0 5px;'; echo '      margin: 1em;'; echo '      display: grid;'; echo '      -webkit-border-radius: 10px;'; echo '      -moz-border-radius: 10px;'; echo '      -ms-border-radius: 10px;'; echo '      -o-border-radius: 10px;'; echo '    }'; echo '  </style>';   echo '</head>'   echo '<body>'   echo ""   echo ""   echo ""   echo "<ul>"   awk '{print "<li><a href=\""$1"\">",$1,"&nbsp;</a></li>"}' $listing   echo ""   echo "</ul>"   echo "</body>"   echo "</html>" }
cmd $listing --sort=extension >>$html
sudo sed -i '/\.git/d' ./index.html
sudo sed -i '/images/d' ./index.html
sudo sed -i '/font/d' ./index.html
sudo sed -i '/fonts/d' ./index.html
sudo sed -i '/\.TTF/d' ./index.html
sudo sed -i '/\.git/d' ./index.html
sudo sed -i '/\.js/d' ./index.html
sudo sed -i '/\.php/d' ./index.html
sudo sed -i '/\.css/d' ./index.html
#!/bin/sh
# find ./ | grep -i "\.*$" >files
find ./ | sed -E -e 's/([^ ]+[ ]+){8}//' | grep -i "\.*$">files
listing="files"
out=""
html="index.html"
out="basename $out.html"
html="index.html"
cmd() {   echo '  <!DOCTYPE html>';   echo '<html>';   echo '<head>'   echo '  <meta http-equiv="Content-Type" content="text/html">'   echo '  <meta name="Author" content="Bryan Guner">';   echo '<link rel="stylesheet" href="./assets/prism.css">';   echo ' <link rel="stylesheet" href="./assets/style.css">';   echo ' <script async defer src="./assets/prism.js"></script>'   echo "  <title> directory </title>"   echo "";   echo '<style>'; echo '    a {'; echo '      color: black;'; echo '    }'; echo ''; echo '    li {'; echo '      border: 1px solid black !important;'; echo '      font-size: 20px;'; echo '      letter-spacing: 0px;'; echo '      font-weight: 700;'; echo '      line-height: 16px;'; echo '      text-decoration: none !important;'; echo '      text-transform: uppercase;'; echo '      background: #194ccdaf !important;'; echo '      color: black !important;'; echo '      border: none;'; echo '      cursor: pointer;'; echo '      justify-content: center;'; echo '      padding: 30px 60px;'; echo '      height: 48px;'; echo '      text-align: center;'; echo '      white-space: normal;'; echo '      border-radius: 10px;'; echo '      min-width: 45em;'; echo '      padding: 1.2em 1em 0;'; echo '      box-shadow: 0 0 5px;'; echo '      margin: 1em;'; echo '      display: grid;'; echo '      -webkit-border-radius: 10px;'; echo '      -moz-border-radius: 10px;'; echo '      -ms-border-radius: 10px;'; echo '      -o-border-radius: 10px;'; echo '    }'; echo '  </style>';   echo '</head>'   echo '<body>'   echo ""   echo ""   echo ""   echo "<ul>"   awk '{print "<li><a href=\""$1"\">",$1,"&nbsp;</a></li>"}' $listing   echo ""   echo "</ul>"   echo "</body>"   echo "</html>" }
cmd $listing --sort=extension >>$html
sudo sed -i '/\.git/d' ./index.html
sudo sed -i '/images/d' ./index.html
sudo sed -i '/font/d' ./index.html
sudo sed -i '/fonts/d' ./index.html
sudo sed -i '/\.TTF/d' ./index.html
sudo sed -i '/\.git/d' ./index.html
sudo sed -i '/\.js/d' ./index.html
sudo sed -i '/\.php/d' ./index.html
sudo sed -i '/\.css/d' ./index.html
#!/bin/sh
# find ./ | grep -i "\.*$" >files
find ./ | sed -E -e 's/([^ ]+[ ]+){8}//' | grep -i "\.*$">files
listing="files"
out=""
html="index.html"
out="basename $out.html"
html="index.html"
cmd() {   echo '  <!DOCTYPE html>';   echo '<html>';   echo '<head>'   echo '  <meta http-equiv="Content-Type" content="text/html">'   echo '  <meta name="Author" content="Bryan Guner">';   echo '<link rel="stylesheet" href="./assets/prism.css">';   echo ' <link rel="stylesheet" href="./assets/style.css">';   echo ' <script async defer src="./assets/prism.js"></script>'   echo "  <title> directory </title>"   echo "";   echo '<style>'; echo '    a {'; echo '      color: black;'; echo '    }'; echo ''; echo '    li {'; echo '      border: 1px solid black !important;'; echo '      font-size: 20px;'; echo '      letter-spacing: 0px;'; echo '      font-weight: 700;'; echo '      line-height: 16px;'; echo '      text-decoration: none !important;'; echo '      text-transform: uppercase;'; echo '      background: #194ccdaf !important;'; echo '      color: black !important;'; echo '      border: none;'; echo '      cursor: pointer;'; echo '      justify-content: center;'; echo '      padding: 30px 60px;'; echo '      height: 48px;'; echo '      text-align: center;'; echo '      white-space: normal;'; echo '      border-radius: 10px;'; echo '      min-width: 45em;'; echo '      padding: 1.2em 1em 0;'; echo '      box-shadow: 0 0 5px;'; echo '      margin: 1em;'; echo '      display: grid;'; echo '      -webkit-border-radius: 10px;'; echo '      -moz-border-radius: 10px;'; echo '      -ms-border-radius: 10px;'; echo '      -o-border-radius: 10px;'; echo '    }'; echo '  </style>';   echo '</head>'   echo '<body>'   echo ""   echo ""   echo ""   echo "<ul>"   awk '{print "<li><a href=\""$1"\">",$1,"&nbsp;</a></li>"}' $listing   echo ""   echo "</ul>"   echo "</body>"   echo "</html>" }
cmd $listing --sort=extension >>$html
#!/bin/sh
# find ./ | grep -i "\.*$" >files
find ./ | sed -E -e 's/([^ ]+[ ]+){8}//' | grep -i "\.*$">files
listing="files"
out=""
html="index.html"
out="basename $out.html"
html="index.html"
cmd() {   echo '  <!DOCTYPE html>';   echo '<html>';   echo '<head>'   echo '  <meta http-equiv="Content-Type" content="text/html">'   echo '  <meta name="Author" content="Bryan Guner">';   echo '<link rel="stylesheet" href="./assets/prism.css">';   echo ' <link rel="stylesheet" href="./assets/style.css">';   echo ' <script async defer src="./assets/prism.js"></script>'   echo "  <title> directory </title>"   echo "";   echo '<style>'; echo '    a {'; echo '      color: black;'; echo '    }'; echo ''; echo '    li {'; echo '      border: 1px solid black !important;'; echo '      font-size: 20px;'; echo '      letter-spacing: 0px;'; echo '      font-weight: 700;'; echo '      line-height: 16px;'; echo '      text-decoration: none !important;'; echo '      text-transform: uppercase;'; echo '      background: #194ccdaf !important;'; echo '      color: black !important;'; echo '      border: none;'; echo '      cursor: pointer;'; echo '      justify-content: center;'; echo '      padding: 30px 60px;'; echo '      height: 48px;'; echo '      text-align: center;'; echo '      white-space: normal;'; echo '      border-radius: 10px;'; echo '      min-width: 45em;'; echo '      padding: 1.2em 1em 0;'; echo '      box-shadow: 0 0 5px;'; echo '      margin: 1em;'; echo '      display: grid;'; echo '      -webkit-border-radius: 10px;'; echo '      -moz-border-radius: 10px;'; echo '      -ms-border-radius: 10px;'; echo '      -o-border-radius: 10px;'; echo '    }'; echo '  </style>';   echo '</head>'   echo '<body>'   echo ""   echo ""   echo ""   echo "<ul>"   awk '{print "<li><a href=\""$1"\">",$1,"&nbsp;</a></li>"}' $listing   echo ""   echo "</ul>"   echo "</body>"   echo "</html>" }
cmd $listing --sort=extension >>$html
#!/bin/sh
# find ./ | grep -i "\.*$" >files
find ./ | sed -E -e 's/([^ ]+[ ]+){8}//' | grep -i "\.*$">files
listing="files"
out=""
html="index.html"
out="basename $out.html"
html="index.html"
cmd() {   echo '  <!DOCTYPE html>';   echo '<html>';   echo '<head>'   echo '  <meta http-equiv="Content-Type" content="text/html">'   echo '  <meta name="Author" content="Bryan Guner">';   echo '<link rel="stylesheet" href="./assets/prism.css">';   echo ' <link rel="stylesheet" href="./assets/style.css">';   echo ' <script async defer src="./assets/prism.js"></script>'   echo "  <title> directory </title>"   echo "";   echo '<style>'; echo '    a {'; echo '      color: black;'; echo '    }'; echo ''; echo '    li {'; echo '      border: 1px solid black !important;'; echo '      font-size: 20px;'; echo '      letter-spacing: 0px;'; echo '      font-weight: 700;'; echo '      line-height: 16px;'; echo '      text-decoration: none !important;'; echo '      text-transform: uppercase;'; echo '      background: #194ccdaf !important;'; echo '      color: black !important;'; echo '      border: none;'; echo '      cursor: pointer;'; echo '      justify-content: center;'; echo '      padding: 30px 60px;'; echo '      height: 48px;'; echo '      text-align: center;'; echo '      white-space: normal;'; echo '      border-radius: 10px;'; echo '      min-width: 45em;'; echo '      padding: 1.2em 1em 0;'; echo '      box-shadow: 0 0 5px;'; echo '      margin: 1em;'; echo '      display: grid;'; echo '      -webkit-border-radius: 10px;'; echo '      -moz-border-radius: 10px;'; echo '      -ms-border-radius: 10px;'; echo '      -o-border-radius: 10px;'; echo '    }'; echo '  </style>';   echo '</head>'   echo '<body>'   echo ""   echo ""   echo ""   echo "<ul>"   awk '{print "<li><a href=\""$1"\">",$1,"&nbsp;</a></li>"}' $listing   echo ""   echo "</ul>"   echo "</body>"   echo "</html>" }
cmd $listing --sort=extension >>$html
#!/bin/sh
# find ./ | grep -i "\.*$" >files
find ./ | sed -E -e 's/([^ ]+[ ]+){8}//' | grep -i "\.*$">files
listing="files"
out=""
html="index.html"
out="basename $out.html"
html="index.html"
cmd() {   echo '  <!DOCTYPE html>';   echo '<html>';   echo '<head>'   echo '  <meta http-equiv="Content-Type" content="text/html">'   echo '  <meta name="Author" content="Bryan Guner">';   echo '<link rel="stylesheet" href="./assets/prism.css">';   echo ' <link rel="stylesheet" href="./assets/style.css">';   echo ' <script async defer src="./assets/prism.js"></script>'   echo "  <title> directory </title>"   echo "";   echo '<style>'; echo '    a {'; echo '      color: black;'; echo '    }'; echo ''; echo '    li {'; echo '      border: 1px solid black !important;'; echo '      font-size: 20px;'; echo '      letter-spacing: 0px;'; echo '      font-weight: 700;'; echo '      line-height: 16px;'; echo '      text-decoration: none !important;'; echo '      text-transform: uppercase;'; echo '      background: #194ccdaf !important;'; echo '      color: black !important;'; echo '      border: none;'; echo '      cursor: pointer;'; echo '      justify-content: center;'; echo '      padding: 30px 60px;'; echo '      height: 48px;'; echo '      text-align: center;'; echo '      white-space: normal;'; echo '      border-radius: 10px;'; echo '      min-width: 45em;'; echo '      padding: 1.2em 1em 0;'; echo '      box-shadow: 0 0 5px;'; echo '      margin: 1em;'; echo '      display: grid;'; echo '      -webkit-border-radius: 10px;'; echo '      -moz-border-radius: 10px;'; echo '      -ms-border-radius: 10px;'; echo '      -o-border-radius: 10px;'; echo '    }'; echo '  </style>';   echo '</head>'   echo '<body>'   echo ""   echo ""   echo ""   echo "<ul>"   awk '{print "<li><a href=\""$1"\">",$1,"&nbsp;</a></li>"}' $listing   echo ""   echo "</ul>"   echo "</body>"   echo "</html>" }
cmd $listing --sort=extension >>$html
#!/bin/sh
# find ./ | grep -i "\.*$" >files
find ./ | sed -E -e 's/([^ ]+[ ]+){8}//' | grep -i "\.*$">files
listing="files"
out=""
html="index.html"
out="basename $out.html"
html="index.html"
cmd() {   echo '  <!DOCTYPE html>';   echo '<html>';   echo '<head>'   echo '  <meta http-equiv="Content-Type" content="text/html">'   echo '  <meta name="Author" content="Bryan Guner">';   echo '<link rel="stylesheet" href="./assets/prism.css">';   echo ' <link rel="stylesheet" href="./assets/style.css">';   echo ' <script async defer src="./assets/prism.js"></script>'   echo "  <title> directory </title>"   echo "";   echo '<style>'; echo '    a {'; echo '      color: black;'; echo '    }'; echo ''; echo '    li {'; echo '      border: 1px solid black !important;'; echo '      font-size: 20px;'; echo '      letter-spacing: 0px;'; echo '      font-weight: 700;'; echo '      line-height: 16px;'; echo '      text-decoration: none !important;'; echo '      text-transform: uppercase;'; echo '      background: #194ccdaf !important;'; echo '      color: black !important;'; echo '      border: none;'; echo '      cursor: pointer;'; echo '      justify-content: center;'; echo '      padding: 30px 60px;'; echo '      height: 48px;'; echo '      text-align: center;'; echo '      white-space: normal;'; echo '      border-radius: 10px;'; echo '      min-width: 45em;'; echo '      padding: 1.2em 1em 0;'; echo '      box-shadow: 0 0 5px;'; echo '      margin: 1em;'; echo '      display: grid;'; echo '      -webkit-border-radius: 10px;'; echo '      -moz-border-radius: 10px;'; echo '      -ms-border-radius: 10px;'; echo '      -o-border-radius: 10px;'; echo '    }'; echo '  </style>';   echo '</head>'   echo '<body>'   echo ""   echo ""   echo ""   echo "<ul>"   awk '{print "<li><a href=\""$1"\">",$1,"&nbsp;</a></li>"}' $listing   echo ""   echo "</ul>"   echo "</body>"   echo "</html>" }
cmd $listing --sort=extension >>$html
function recursive_for_loop {      for f in *;  do          if [ -d $f  -a ! -h $f ];           then            cd -- "$f";         echo "</body></html>" | tee -a *.html;  recursive_for_loop;             cd ..;          fi;       done;   };
recursive_for_loop
find ./* -type d | xargs -I {} echo "</body></html>" | tee -a *.html 
find ./* -type d | xargs -I {} echo "</body></html>" | tee -a *.html {}
find ./* -type d | xargs -I {} echo "</body></html>" | tee -a *.html 
find ./* -type d | xargs -I {} echo "</body></html>" | tee -a *.html {}
function recursive_for_loop {      for f in ./;  do          if [ -d $f  -a ! -h $f ];           then            cd -- "$f";      find ./ -type d -execdir echo "</body></html>" | tee -a *.html {} \;;  recursive_for_loop;             cd ..;          fi;       done;   };
recursive_for_loop
function recursive_for_loop {      for f in ./;  do          if [ -d $f  -a ! -h $f ];           then            cd -- "$f";      find ./ -type d -exec echo "</body></html>" | tee -a *.html {} \;;  recursive_for_loop;             cd ..;          fi;       done;   };
recursive_for_loop
find ./ -type d -execdir echo "</body></html>" | tee -a *.html {} \;
function recursive_for_loop {      for f in ./;  do          if [ -d $f  -a ! -h $f ];           then            cd -- "$f";         echo "</body></html>" | tee -a *.html;  recursive_for_loop;             cd ..;          fi;       done;   };
recursive_for_loop
find ./ -type d -execdir echo "</body></html>" | tee -a *.html {} \;
find ./* -type d -execdir echo "</body></html>" | tee -a *.html {} \;
function recursive_for_loop {      for f in *;  do          if [ -d $f  -a ! -h $f ];           then            cd -- "$f";         echo "</body></html>" | tee -a *.html;  recursive_for_loop;             cd ..;          fi;       done;   };
recursive_for_loop
function recursive_for_loop {      for f in *;  do          if [ -d $f  -a ! -h $f ];           then            cd -- "$f";         echo "</body></html>" | tee -a *.html;  recursive_for_loop;             cd ..;          fi;       done;   };
recursive_for_loop
for f in *.html; do printf '%s\n' 0a '<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>' . x | ex "$f"; done
for d in *; do     ( cd "$d" && for f in *.html; do printf '%s\n' 0a '<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>' . x | ex "$f"; done); done
find . -name '*.html' -execdir echo "</body></html>" | tee -a *.html {} \;
find ./ -iname "*.html" -type f -exec sh echo "</body></html>" | tee -a *.html {} \;
find ./ -iname "*.html" -type f -exec sh echo "</body></html>"  {} \;
find ./ -iname "*.html" -type f -exec sh printf "</body></html>"  {} \;
find ./ -iname "*.html" -type f -exec  printf "</body></html>"  {} \;
find ./ -iname "*.html" -type f -exec  echo "</body></html>"  {} \;
for d in './'; do     ( cd "$d" && for f in *.html; do printf '%s\n' 0a '<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>' . x | ex "$f"; done); done
for d in .; do <html lang="en">
<head>
</head>
<body>' . x | ex "$f"; done)
done
;
for d in ./; do <html lang="en">
<head>
</head>
<body>' . x | ex "$f"; done)
done

for d in ./*; do <html lang="en">
<head>
</head>
<body>' . x | ex "$f"; done)
done
for d in ./*; done
for d in ./*; done;
set +H
for d in ./*; do    ( cd "$d" && find ./ -iname "*.html" -type f -exec  echo "</body></html>"  {} \; <!DOCTYPE html><html lang="en"><head>  <meta charset="UTF-8">  <meta name="viewport" content="width=device-width, initial-scale=1.0">  <title>Document</title></head><body>' . x | ex "$f"; done)
done
for d in ./*; do    ( cd "$d" && find ./ -iname "*.html" -type f -exec  'echo "</body></html>'"  {} \; <!DOCTYPE html><html lang="en"><head>  <meta charset="UTF-8">  <meta name="viewport" content="width=device-width, initial-scale=1.0">  <title>Document</title></head><body>' . x | ex "$f"; done)
done
;
for d in ./*
do    ( cd "$d" && find ./ -iname "*.html" -type f -exec  'echo "</body></html>'"  {} \; <!DOCTYPE html><html lang="en"><head>  <meta charset="UTF-8">  <meta name="viewport" content="width=device-width, initial-scale=1.0">  <title>Document</title></head><body>' . x | ex "$f"; done)
for d in ./*; do    ( cd "$d" && find ./ -iname "*.html" -type f -exec  'echo "</body></html>'"  {} \; <!DOCTYPE html><html lang="en"><head>  <meta charset="UTF-8">  <meta name="viewport" content="width=device-width, initial-scale=1.0">  <title>Document</title></head><body>' . x | ex "$f"; done)
done
echo "</body></html>" | tee -a *.html
for f in *.html; do printf '%s\n' 0a '<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>' . x | ex "$f"; done
echo "</body></html>" | tee -a *.html
echo "</body></html>" | tee -a *.html
find ./* -type d -exec (echo "</body></html>" | tee -a *.html) {} \;
find ./* -type d -exec 'echo "</body></html>" | tee -a *.html' {} \;
for f in *.txt; do printf '%s\n' 0a '<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>' . x | ex "$f"; done
for f in *.html; do printf '%s\n' 0a '<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>' . x | ex "$f"; done
cd ..
git add .
git add .
shopt -s globstar
for f in *.html; do printf '%s\n' 0a '<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>;' . x | ex "$f"; done
done
for f in *.html; do printf '%s\n' 0a '<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>;' . x | ex "$f"; done
for f in *.html; do printf '%s\n' 0a '<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>;' . x | ex "$f"; done
shopt -s globstar
for f in *.html; do printf '%s\n' 0a '<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>;' . x | ex "$f"; done
shopt -s globstar
for f in *.html; do printf '%s\n' 0a '<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>;' . x | ex "$f"; done
done
shopt -s globstar
for f in *.html; do printf '%s\n' 0a '<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>;' . x | ex "$f"; done
done
find . -name '*.html' -exec sh -c '
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>;' . x | ex "$f"; done
' _ {} +

<html lang="en">
<head>
</head>
<body>;' . x | ex "$f"; done)' _ {} +
find . -name '*.html' -exec sh -c (for f in *.html; do printf '%s\n' 0a '<!DOCTYPE html>
<html lang="en">
<head>
</head>
<body>;' . x | ex "$f"; done) _ {} +
find . -name '*.html' -exec sh -c (for f in *.html; do printf '%s\n' 0a '<!DOCTYPE html><html lang="en"><head>  <meta charset="UTF-8">  <meta name="viewport" content="width=device-width, initial-scale=1.0">  <title>Document</title></head><body>;' . x | ex "$f"; done) _ {} +
find . -name '*.html' -exec sh -c 'for f in *.html; do printf '%s\n' 0a '<DOCTYPE html\><html lang="en"\><head\>  <meta charset="UTF-8"\>  <meta name="viewport" content="width=device-width, initial-scale=1.0"\>  <title\>Document</title\></head\><body\>;' . x | ex "$f"; done'  {} \;
function recursive_for_loop {      for f in *;  do          if [ -d $f  -a ! -h $f ];           then           for f in *.html; do printf '%s\n' 0a '<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>;' . x | ex "$f"; done;         fi;       done;   };
recursive_for_loop
function recursive_for_loop {      for f in *;  do          if [ -d $f  -a ! -h $f ];           then         echo "</body></html>" | tee -a *.html         fi;       done;   };
recursive_for_loop
function recursive_for_loop {      for f in *;  do          if [ -d $f  -a ! -h $f ];           then            cd -- "$f";         echo "</body></html>" | tee -a *.html;  recursive_for_loop;             cd ..;          fi;       done;   };
recursive_for_loop
#!/bin/sh
# find ./ | grep -i "\.*$" >files
find ./ | sed -E -e 's/([^ ]+[ ]+){8}//' | grep -i "\.*$">files
listing="files"
out=""
html="index.html"
out="basename $out.html"
html="index.html"
cmd() {   echo '  <!DOCTYPE html>';   echo '<html>';   echo '<head>'   echo '  <meta http-equiv="Content-Type" content="text/html">'   echo '  <meta name="Author" content="Bryan Guner">';   echo '<link rel="stylesheet" href="./assets/prism.css">';   echo ' <link rel="stylesheet" href="./assets/style.css">';   echo ' <script async defer src="./assets/prism.js"></script>'   echo "  <title> directory </title>"   echo "";   echo '<style>'; echo '    a {'; echo '      color: black;'; echo '    }'; echo ''; echo '    li {'; echo '      border: 1px solid black !important;'; echo '      font-size: 20px;'; echo '      letter-spacing: 0px;'; echo '      font-weight: 700;'; echo '      line-height: 16px;'; echo '      text-decoration: none !important;'; echo '      text-transform: uppercase;'; echo '      background: #194ccdaf !important;'; echo '      color: black !important;'; echo '      border: none;'; echo '      cursor: pointer;'; echo '      justify-content: center;'; echo '      padding: 30px 60px;'; echo '      height: 48px;'; echo '      text-align: center;'; echo '      white-space: normal;'; echo '      border-radius: 10px;'; echo '      min-width: 45em;'; echo '      padding: 1.2em 1em 0;'; echo '      box-shadow: 0 0 5px;'; echo '      margin: 1em;'; echo '      display: grid;'; echo '      -webkit-border-radius: 10px;'; echo '      -moz-border-radius: 10px;'; echo '      -ms-border-radius: 10px;'; echo '      -o-border-radius: 10px;'; echo '    }'; echo '  </style>';   echo '</head>'   echo '<body>'   echo ""   echo ""   echo ""   echo "<ul>"   awk '{print "<li><a href=\""$1"\">",$1,"&nbsp;</a></li>"}' $listing   echo ""   echo "</ul>"   echo "</body>"   echo "</html>" }
cmd $listing --sort=extension >>$html
sanitize() {   shopt -s extglob;   filename=$(basename "$1");   directory=$(dirname "$1")   filename_clean=$(echo "$filename" | sed -e 's/[\\/:\*\?"<>\|\x01-\x1F\x7F]//g' -e 's/^\(nul\|prn\|con\|lpt[0-9]\|com[0-9]\|aux\)\(\.\|$\)//i' -e 's/^\.*$//' -e 's/^$/NONAME/')   if (test "$filename" != "$filename_clean");   then     mv -v "$1" "$directory/$filename_clean";   fi; }
export -f sanitize
sanitize_dir() {   find "$1" -depth -exec bash -c 'sanitize "$0"' {} \;; }
sanitize_dir './testy/'
sanitize() {   shopt -s extglob;   filename=$(basename "$1");   directory=$(dirname "$1")   filename_clean=$(echo "$filename" | sed -e 's/[\\/:\*\?"<>\|\x01-\x1F\x7F]//g' -e 's/^\(nul\|prn\|con\|lpt[0-9]\|com[0-9]\|aux\)\(\.\|$\)//i' -e 's/^\.*$//' -e 's/^$/NONAME/')   if (test "$filename" != "$filename_clean");   then     mv -v "$1" "$directory/$filename_clean";   fi; }
export -f sanitize
sanitize_dir() {   find "$1" -depth -exec bash -c 'sanitize "$0"' {} \;; }
git init
git add .
git commit -m "i hope i didn't break anything"
git push -u origin master
git add .
git commit -m "i hope i didn't break anything"
git pudh 
git push
git remote add origin https://github.com/bgoonz/blog-research.git
find . -empty -type f -print -delete
find . -empty -type d -print -delete
find . \( -name ".git" -o -name ".gitignore" -o -name ".gitmodules" -o -name ".gitattributes" \) -exec rm -rf -- {} +
find . \( -name "*SECURITY.txt" -o -name "*RELEASE.txt" -o  -name "*CHANGELOG.txt" -o -name "*LICENSE.txt" -o -name "*CONTRIBUTING.txt" -name "*HISTORY.md" -o -name "*LICENSE" -o -name "*SECURITY.md" -o -name "*RELEASE.md" -o  -name "*CHANGELOG.md" -o -name "*LICENSE.md" -o -name "*CODE_OF_CONDUCT.md" -o -name "*CONTRIBUTING.md" \) -exec rm -rf -- {} +
git remote add origin https://github.com/bgoonz/blog-research.git
find ./ -iname "*.md" -type f -exec sh -c 'pandoc "${0}" -o "${0%.md}.html"' {} \;
for f in *.html; do printf '%s\n' 0a '<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>;' . x | ex "$f"; done
echo "</body></html>" | tee -a *.html
sudo service postgresql stop
sudo service postgresql restart
sudo -u postgres psql
git add .
git remote add origin https://github.com/bgoonz/blog-research.git
git add .
git commit -m "almost a week since last commit"
git push 
git checkout master
git remote add origin https://github.com/bgoonz/blog-research.git
Install-Package React.AspNet
#!/bin/sh
# find ./ | grep -i "\.*$" >files
find ./ | sed -E -e 's/([^ ]+[ ]+){8}//' | grep -i "\.*$">files
listing="files"
out=""
html="index.html"
out="basename $out.html"
html="index.html"
cmd() {   echo '  <!DOCTYPE html>';   echo '<html>';   echo '<head>'   echo '  <meta http-equiv="Content-Type" content="text/html">'   echo '  <meta name="Author" content="Bryan Guner">';   echo '<link rel="stylesheet" href="./assets/prism.css">';   echo ' <link rel="stylesheet" href="./assets/style.css">';   echo ' <script async defer src="./assets/prism.js"></script>'   echo "  <title> directory </title>"   echo "";   echo '<style>'; echo '    a {'; echo '      color: black;'; echo '    }'; echo ''; echo '    li {'; echo '      border: 1px solid black !important;'; echo '      font-size: 20px;'; echo '      letter-spacing: 0px;'; echo '      font-weight: 700;'; echo '      line-height: 16px;'; echo '      text-decoration: none !important;'; echo '      text-transform: uppercase;'; echo '      background: #194ccdaf !important;'; echo '      color: black !important;'; echo '      border: none;'; echo '      cursor: pointer;'; echo '      justify-content: center;'; echo '      padding: 30px 60px;'; echo '      height: 48px;'; echo '      text-align: center;'; echo '      white-space: normal;'; echo '      border-radius: 10px;'; echo '      min-width: 45em;'; echo '      padding: 1.2em 1em 0;'; echo '      box-shadow: 0 0 5px;'; echo '      margin: 1em;'; echo '      display: grid;'; echo '      -webkit-border-radius: 10px;'; echo '      -moz-border-radius: 10px;'; echo '      -ms-border-radius: 10px;'; echo '      -o-border-radius: 10px;'; echo '    }'; echo '  </style>';   echo '</head>'   echo '<body>'   echo ""   echo ""   echo ""   echo "<ul>"   awk '{print "<li><a href=\""$1"\">",$1,"&nbsp;</a></li>"}' $listing   echo ""   echo "</ul>"   echo "</body>"   echo "</html>" }
cmd $listing --sort=extension >>$html
rm -f file
rm -f files
find ./ -iname "*.md" -type f -exec sh -c 'pandoc "${0}" -o "${0%.md}.html"' {} \;
for f in *.html; do printf '%s\n' 0a '<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>;' . x | ex "$f"; done
echo "</body></html>" | tee -a *.html
find . -name "*.zip" | while read filename; do unzip -o -d "`dirname "$filename"`" "$filename"; done;
find . -name "*.zip" -type f -print -delete
wget -r http://127.0.0.1:56239/browser/#
sudo wget -r http://127.0.0.1:56239/browser/#
find . \( -name "*SECURITY.txt" -o -name "*RELEASE.txt" -o  -name "*CHANGELOG.txt" -o -name "*LICENSE.txt" -o -name "*CONTRIBUTING.txt" -name "*HISTORY.md" -o -name "*LICENSE" -o -name "*SECURITY.md" -o -name "*RELEASE.md" -o  -name "*CHANGELOG.md" -o -name "*LICENSE.md" -o -name "*CODE_OF_CONDUCT.md" -o -name "*CONTRIBUTING.md" \) -exec rm -rf -- {} +
sudo apt install postgresql-client-common
bash init_db.sh
CREATE DATABASE bryan WITH PASSWORD 'password';
find . \( -name ".git" -o -name ".gitignore" -o -name ".gitmodules" -o -name ".gitattributes" \) -exec rm -rf -- {} +
chmod -x init_db.sh
bash init_db.sh
psql
sudo sed -i '/Copyright/d' ./*.html
sudo sed -i '/MIT/d' ./*.html
sudo sed -i '/License/d' ./*.html
sudo sed -i '/Contributors/d' ./*.html
sudo sed -i '/Copyright/d' ./*.html
sudo sed -i '/copyright/d' ./*.html
sudo sed -i '/Copyright &copy; /d' ./*.html
find . \( -name "*SECURITY.txt" -o -name "*RELEASE.txt" -o  -name "*CHANGELOG.txt" -o -name "*LICENSE.txt" -o -name "*CONTRIBUTING.txt" -name "*HISTORY.md" -o -name "*LICENSE" -o -name "*SECURITY.md" -o -name "*RELEASE.md" -o  -name "*CHANGELOG.md" -o -name "*LICENSE.md" -o -name "*CODE_OF_CONDUCT.md" -o -name "*CONTRIBUTING.md" \) -exec rm -rf -- {} +
git add .
git checkout master
git add .
git commit -m "merge conflict"
git add .\
git add .
git commit -m "fixed syntax highlighting and auto toc bugs"
git push 
git commit -m "merging back into master w optimized pictures"
git add 1-tools/excel-2-html-table/doccumentation/cheerio.html
git add  1-tools/excel-2-html-table/doccumentation/xlsx.html
git add   1-tools/excel-2-html-table/index.html
git add  1-tools/node-npm/npm.broofa.com/vendor/d3.v5.js
git add  core-site/other-pages/blog-posts/Student-Profiles/Bryan Guner_LinkedIn.html
git rm  core-site/other-pages/blog-posts/Student-Profiles/Bryan Guner_LinkedIn.html
git add .
git commit -m "merging back into master w optimized pictures"
git add .
git push -u origin master
git add .
git commit -m "please"
git push -u origin master
git push https://github.com/bgoonz/web-dev-notes-resource-site.git master
git pull
git commit -m "improvments"
git commit -m "project update"
git push -u origin master
git remote add origin https://github.com/bgoonz/blog-research.git
git add .
git commit -m "hmmm"
git add .vscode/settings.json
git add .vscode/settings.json -f
git commit -m "vscode json"
git push -u origin master
git push-u https://github.com/bgoonz/blog-research.git master
git push -u https://github.com/bgoonz/blog-research.git master
git push  https://github.com/bgoonz/blog-research.git master
git checkout master
git add .
git commit -m "back to basics"
git push -u origin master
npm install --save react-fluid-animation
npm install
npm install fluid-animation
npm install --save react-fluid-animation
npm install
git add .
git commit -m "merge hell"
git push 
git checkout master
docker push bgoonz/web-dev-resource-site:tagname
git init
git add .
git remote add origin https://github.com/bgoonz/styling-templates.git
git commit -m "inital commit"
git push -u origin master
tree > out.md
git add .
git commit -m "readme"
git push 
git pull
git push 
git add .
git commit -m "<hr>"
git push 
git add .
git commit -m "<hr>"
git push 
#!/bin/sh
# find ./ | grep -i "\.*$" >files
find ./ | sed -E -e 's/([^ ]+[ ]+){8}//' | grep -i "\.*$">files
listing="files"
out=""
html="index.html"
out="basename $out.html"
html="index.html"
cmd() {   echo '  <!DOCTYPE html>';   echo '<html>';   echo '<head>'   echo '  <meta http-equiv="Content-Type" content="text/html">'   echo '  <meta name="Author" content="Bryan Guner">';   echo '<link rel="stylesheet" href="./assets/prism.css">';   echo ' <link rel="stylesheet" href="./assets/style.css">';   echo ' <script async defer src="./assets/prism.js"></script>'   echo "  <title> directory </title>"   echo "";   echo '<style>'; echo '    a {'; echo '      color: black;'; echo '    }'; echo ''; echo '    li {'; echo '      border: 1px solid black !important;'; echo '      font-size: 20px;'; echo '      letter-spacing: 0px;'; echo '      font-weight: 700;'; echo '      line-height: 16px;'; echo '      text-decoration: none !important;'; echo '      text-transform: uppercase;'; echo '      background: #194ccdaf !important;'; echo '      color: black !important;'; echo '      border: none;'; echo '      cursor: pointer;'; echo '      justify-content: center;'; echo '      padding: 30px 60px;'; echo '      height: 48px;'; echo '      text-align: center;'; echo '      white-space: normal;'; echo '      border-radius: 10px;'; echo '      min-width: 45em;'; echo '      padding: 1.2em 1em 0;'; echo '      box-shadow: 0 0 5px;'; echo '      margin: 1em;'; echo '      display: grid;'; echo '      -webkit-border-radius: 10px;'; echo '      -moz-border-radius: 10px;'; echo '      -ms-border-radius: 10px;'; echo '      -o-border-radius: 10px;'; echo '    }'; echo '  </style>';   echo '</head>'   echo '<body>'   echo ""   echo ""   echo ""   echo "<ul>"   awk '{print "<li><a href=\""$1"\">",$1,"&nbsp;</a></li>"}' $listing   echo ""   echo "</ul>"   echo "</body>"   echo "</html>" }
cmd $listing --sort=extension >>$html
sudo sed -i '/\.git/d' ./index.html
sudo sed -i '/images/d' ./index.html
sudo sed -i '/font/d' ./index.html
sudo sed -i '/fonts/d' ./index.html
sudo sed -i '/\.TTF/d' ./index.html
sudo sed -i '/\.git/d' ./index.html
sudo sed -i '/\.js/d' ./index.html
sudo sed -i '/\.php/d' ./index.html
sudo sed -i '/\.css/d' ./index.html
find . -empty -type f -print -delete
find . -empty -type d -print -delete
find . -name "*.zip" | while read filename; do unzip -o -d "`dirname "$filename"`" "$filename"; done;
git init
git add .
git config core.longpaths true
sudo git config core.longpaths true
git clone https://github.com/bgoonz/Directory-Structure-Browser.git
git clone https://github.com/bgoonz/Directory-Structure-Browser.git --force
httrack --ext-depth=3 https://docs.docker.com/storage/volumes/
find . -name "*.zip" | while read filename; do unzip -o -d "`dirname "$filename"`" "$filename"; done;
find . -name "*.zip" -type f -print -delete
git checkout master
git checkout master --force
httrack --ext-depth=3 https://www.html.am/
httrack --ext-depth=3 https://css-tricks.com/
git init
git add .
git commit -m "initial commt"
git remote add origin https://github.com/bgoonz/web-dev-resource-hub-site-crawl-httrack.git
git push -u origin master
httrack --ext-depth=3 https://divtable.com/
find . -name "*.zip" | while read filename; do unzip -o -d "`dirname "$filename"`" "$filename"; done;
cd ..
rm -f .git/index.lock
git add .
rm .git/index.lock
git init 
git add .
git add .
git add .
git add .
git clone https://bitbucket.org/bgoonz/web-dev-resource-hub.git
git add .
git commit -m "initial commit"
git add  0-assets/
git add .github/
git add   1-tools/
git  2-content/
git add  2-content/
git add   README.md
cd "c:/MY-WEB-DEV/08-my-website/Stable"
git branch master1 origin/master
git add .
git commit -m "not initial commit"
curl -s https://raw.githubusercontent.com/appacademy/aa-setup-checker/master/run.sh | bash
curl https://pyenv.run | bash
export PATH="/home/bryan/.pyenv/bin:$PATH"
eval "$(pyenv init -)"
eval "$(pyenv virtualenv-init -)"
node play-script.js
npm run start
npm install
npm run start
git add .
git submodule add https://github.com/bgoonz/WEB-DEV-NOTES
git submodule add https://github.com/bgoonz/WEB-DEV-NOTES -f
git add .
httrack --ext-depth=2 https://reactcheatsheet.com/
mkvirtualenv aws2
workon aws2
pip install -e git://github.com/boto/botocore.git@v2#egg=botocore
pip install -e git://github.com/aws/aws-cli.git@v2#egg=awscli
alias aws2='python -m awscli'
code .
curl   -X POST   -H "Accept: application/vnd.github.v3+json"   https://api.github.com/repos/octocat/hello-world/git/blobs   -d '{"content":"content"}'
npm install --global generate-github-markdown-css
code .
#!/bin/sh
# find ./ | grep -i "\.*$" >files
find ./ | sed -E -e 's/([^ ]+[ ]+){8}//' | grep -i "\.*$">files
git add .
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
cmd() {   echo '  <!DOCTYPE html>';   echo '<html>';   echo '<head>'   echo '  <meta http-equiv="Content-Type" content="text/html">'   echo '  <meta name="Author" content="Bryan Guner">';   echo '<link rel="stylesheet" href="./assets/prism.css">';   echo ' <link rel="stylesheet" href="./assets/style.css">';   echo ' <script async defer src="./assets/prism.js"></script>'   echo "  <title> directory </title>"   echo "";   echo '<style>'; echo '    a {'; echo '      color: black;'; echo '    }'; echo ''; echo '    li {'; echo '      border: 1px solid black !important;'; echo '      font-size: 20px;'; echo '      letter-spacing: 0px;'; echo '      font-weight: 700;'; echo '      line-height: 16px;'; echo '      text-decoration: none !important;'; echo '      text-transform: uppercase;'; echo '      background: #194ccdaf !important;'; echo '      color: black !important;'; echo '      border: none;'; echo '      cursor: pointer;'; echo '      justify-content: center;'; echo '      padding: 30px 60px;'; echo '      height: 48px;'; echo '      text-align: center;'; echo '      white-space: normal;'; echo '      border-radius: 10px;'; echo '      min-width: 45em;'; echo '      padding: 1.2em 1em 0;'; echo '      box-shadow: 0 0 5px;'; echo '      margin: 1em;'; echo '      display: grid;'; echo '      -webkit-border-radius: 10px;'; echo '      -moz-border-radius: 10px;'; echo '      -ms-border-radius: 10px;'; echo '      -o-border-radius: 10px;'; echo '    }'; echo '  </style>';   echo '</head>'   echo '<body>'   echo ""   echo ""   echo ""   echo "<ul>"   awk '{print "<li><a href=\""$1"\">",$1,"&nbsp;</a></li>"}' $listing   echo ""   echo "</ul>"   echo "</body>"   echo "</html>" }
cmd $listing --sort=extension >>$html
rm -f files
#!/bin/sh
# find ./ | grep -i "\.*$" >files
find ./ | sed -E -e 's/([^ ]+[ ]+){8}//' | grep -i "\.*$">files
listing="files"
out=""
html="index.html"
out="basename $out.html"
html="index.html"
cmd() { echo '<html>'; echo '<head>'; echo '  <meta http-equiv="Content-Type" content="text/html">'; echo '  <meta name="Author" content="Bryan Guner">'; echo '<script async defer src="https://raw.githubusercontent.com/bgoonz/excel2html-table/master/toc.js"></script>'; echo '<link rel="styesheet" href="https://github.com/bgoonz/excel2html-table/blob/master/toc.css">'; echo '  <title> directory </title>'; echo '  <style>'; echo '    @import url(fontawesome-all.min.css);'; echo '@import url("https://fonts.googleapis.com/css?family=Merriweather:300,700,300italic,700italic|Source+Sans+Pro:900");'; echo 'div.my_class {'; echo '  resize: both;'; echo '  overflow: auto;'; echo '  /* something other than visible */'; echo '}'; echo 'html, body, div, span, applet, object,'; echo 'iframe, h1, h2, h3, h4, h5, h6, p, blockquote,'; echo 'pre, a, abbr, acronym, address, big, cite,'; echo 'code, del, dfn, em, img, ins, kbd, q, s, samp,'; echo 'small, strike, strong, sub, sup, tt, var, b,'; echo 'u, i, center, dl, dt, dd, ol, ul, li, fieldset,'; echo 'form, label, legend, table, caption, tbody,'; echo 'tfoot, thead, tr, th, td, article, aside,'; echo 'canvas, details, embed, figure, figcaption,'; echo 'footer, header, hgroup, menu, nav, output, ruby,'; echo 'section, summary, time, mark, audio, video {'; echo '  margin: 0;'; echo '  padding: 0;'; echo '  border: 0;'; echo '  font-size: 100%;'; echo '  font: inherit;'; echo '  vertical-align: baseline;}'; echo 'article, aside, details, figcaption, figure,'; echo 'footer, header, hgroup, menu, nav, section {'; echo '  display: block;}'; echo 'body {'; echo '  line-height: 1;'; echo '  zoom: 60%;'; echo '}'; echo 'ol, ul {'; echo '  list-style: none;'; echo '}'; echo 'blockquote, q {'; echo '  quotes: none;'; echo '}'; echo '  blockquote:before, blockquote:after, q:before, q:after {'; echo '    content: '';'; echo '    content: none;'; echo '  }'; echo 'table {'; echo '  border-collapse: collapse;'; echo '  border-spacing: 0;'; echo '}'; echo 'body {'; echo '  -webkit-text-size-adjust: none;'; echo '}'; echo 'mark {'; echo '  background-color: transparent;'; echo '  color: inherit;'; echo '}'; echo 'input::-moz-focus-inner {'; echo '  border: 0;'; echo '  padding: 0;'; echo '}'; echo 'input, select, textarea {'; echo '  -moz-appearance: none;'; echo '  -webkit-appearance: none;'; echo '  -ms-appearance: none;'; echo '  appearance: none;'; echo '}'; echo '/* Basic */'; echo '  @-ms-viewport {'; echo '    width: device-width;'; echo '  }'; echo '  body {'; echo '    -ms-overflow-style: scrollbar;'; echo '  }'; echo '  @media screen and (max-width: 480px) {'; echo '    html, body {'; echo '      min-width: 320px;'; echo '    }'; echo '  }'; echo '  html {'; echo '    box-sizing: border-box;'; echo '  }'; echo '  *, *:before, *:after {'; echo '    box-sizing: inherit;'; echo '  }'; echo '  body {'; echo '    background-color: whitesmoke;'; echo '  }'; echo '    body.is-preload *, body.is-preload *:before, body.is-preload *:after {'; echo '      -moz-animation: none !important;'; echo '      -webkit-animation: none !important;'; echo '      -ms-animation: none !important;'; echo '      animation: none !important;'; echo '      -moz-transition: none !important;'; echo '      -webkit-transition: none !important;'; echo '      -ms-transition: none !important;'; echo '      transition: none !important;'; echo '    }'; echo '/* Type */'; echo '  html {'; echo '    font-size: 16pt;'; echo '  }'; echo '    @media screen and (max-width: 1680px) {'; echo '      html {'; echo '        font-size: 12pt;'; echo '      }'; echo '    }'; echo '    @media screen and (max-width: 1280px) {'; echo '      html {'; echo '        font-size: 11pt;'; echo '      }'; echo '    }'; echo '    @media screen and (max-width: 360px) {'; echo '      html {'; echo '        font-size: 10pt;'; echo '      }'; echo '    }'; echo '  body {'; echo '    color: #212931;'; echo '  }'; echo '  body, input, select, textarea {'; echo '    font-family: "Merriweather", Georgia, serif;'; echo '    font-weight: 300;'; echo '    font-size: 1rem;'; echo '    line-height: 2.375;'; echo '  }'; echo '  a {'; echo '    -moz-transition: color 0.2s ease-in-out, background-color 0.2s ease-in-out, border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out;'; echo '    -webkit-transition: color 0.2s ease-in-out, background-color 0.2s ease-in-out, border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out;'; echo '    -ms-transition: color 0.2s ease-in-out, background-color 0.2s ease-in-out, border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out;'; echo '    transition: color 0.2s ease-in-out, background-color 0.2s ease-in-out, border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out;'; echo '    border-bottom: dotted 1px;'; echo '    text-decoration: none;'; echo '  }'; echo '    a:hover {'; echo '      border-bottom-color: transparent;'; echo '    }'; echo '  strong, b {'; echo '    font-weight: 600;'; echo '  }'; echo '  em, i {'; echo '    font-style: italic;'; echo '  }'; echo '  p {'; echo '    text-align: justify;'; echo '    margin: 0 0 2rem 0;'; echo '  }'; echo '  h1, h2, h3, h4, h5, h6 {'; echo '    font-family: "Source Sans Pro", Helvetica, sans-serif;'; echo '    font-weight: 900;'; echo '    line-height: 1.5;'; echo '    letter-spacing: 0.075em;'; echo '    text-transform: uppercase;'; echo '    margin: 0 0 1rem 0;'; echo '  }'; echo '    h1 a, h2 a, h3 a, h4 a, h5 a, h6 a {'; echo '      border-bottom: 0;'; echo '      color: inherit;'; echo '      text-decoration: none;'; echo '    }'; echo '  h1 {'; echo '    font-size: 4rem;'; echo '    line-height: 1.1;'; echo '    margin: 0 0 2rem 0;'; echo '  }'; echo '  h2 {'; echo '    font-size: 1.75rem;'; echo '    line-height: 1.3;'; echo '    margin: 0 0 1.5rem 0;'; echo '  }'; echo '  h3 {'; echo '    font-size: 1.25rem;'; echo '    margin: 0 0 1.5rem 0;'; echo '  }'; echo '  h4 {'; echo '    font-size: 1rem;'; echo '  }'; echo '  h5 {'; echo '    font-size: 0.9rem;'; echo '  }'; echo '  h6 {'; echo '    font-size: 0.8rem;'; echo '  }'; echo '  sub {'; echo '    font-size: 0.8rem;'; echo '    position: relative;'; echo '    top: 0.5rem;'; echo '  }'; echo '  sup {'; echo '    font-size: 0.8rem;'; echo '    position: relative;'; echo '    top: -0.5rem;'; echo '  }'; echo '  blockquote {'; echo '    border-left: solid 4px;'; echo '    font-style: italic;'; echo '    margin: 0 0 2rem 0;'; echo '    padding: 0.5rem 0 0.5rem 2rem;'; echo '  }'; echo '  code {'; echo '    border: solid 2px;'; echo '    font-family: "Courier New", monospace;'; echo '    font-size: 0.9rem;'; echo '    margin: 0 0.25rem;'; echo '    padding: 0.25rem 0.65rem;'; echo '  }'; echo '  pre {'; echo '    -webkit-overflow-scrolling: touch;'; echo '    font-family: "Courier New", monospace;'; echo '    font-size: 0.9rem;'; echo '    margin: 0 0 2rem 0;'; echo '  }'; echo '    pre code {'; echo '      display: block;'; echo '      line-height: 1.75;'; echo '      padding: 1rem 1.5rem;'; echo '      overflow-x: auto;'; echo '    }'; echo '  hr {'; echo '    border: 0;'; echo '    border-bottom: solid 2px;'; echo '    margin: 3rem 0;'; echo '  }'; echo '    hr.major {'; echo '      margin: 5rem 0;'; echo '    }'; echo '  .align-left {'; echo '    text-align: left;'; echo '  }'; echo '  .align-center {'; echo '    text-align: center;'; echo '  }'; echo '  .align-right {'; echo '    text-align: right;'; echo '  }'; echo '  input, select, textarea {'; echo '    color: #212931;'; echo '  }'; echo '  a {'; echo '    color: #212931;'; echo '    border-bottom-color: rgba(33, 41, 49, 0.5);'; echo '  }'; echo '    a:hover {'; echo '      border-bottom-color: transparent;'; echo '      color: #18bfef !important;'; echo '    }'; echo '  strong, b {'; echo '    color: #212931;'; echo '  }'; echo '  h1, h2, h3, h4, h5, h6 {'; echo '    color: #212931;'; echo '  }'; echo '  blockquote {'; echo '    border-left-color: #eeeeee;'; echo '  }'; echo '  code {'; echo '    background: rgba(220, 220, 220, 0.25);'; echo '    border-color: #eeeeee;'; echo '  }'; echo '  hr {'; echo '    border-bottom-color: #eeeeee;'; echo '  }'; echo '    .button::-moz-focus-inner{'; echo '    border: 0;'; echo '    padding: 0;'; echo '    }'; echo '    .button{'; echo '    display: inline-block;'; echo '    *display: inline;'; echo '    zoom: 1;'; echo '    padding: 6px 20px;'; echo '    margin: 0;'; echo '    cursor: pointer;'; echo '    border: 1px solid #bbb;'; echo '    overflow: auto;'; echo '    text-decoration: none;'; echo '    white-space: nowrap;'; echo '    color: #555;'; echo '    background-color: #ddd;'; echo '    background-image: -webkit-gradient(linear, left top, left bottom, from(rgba(255,255,255,1)),'; echo '    to(rgba(255,255,255,0)));'; echo '    background-image: -webkit-linear-gradient(top, rgba(255,255,255,1), rgba(255,255,255,0));'; echo '    background-image: -moz-linear-gradient(top, rgba(255,255,255,1), rgba(255,255,255,0));'; echo '    background-image: -ms-linear-gradient(top, rgba(255,255,255,1), rgba(255,255,255,0));'; echo '    background-image: -o-linear-gradient(top, rgba(255,255,255,1), rgba(255,255,255,0));'; echo '    background-image: linear-gradient(top, rgba(255,255,255,1), rgba(255,255,255,0));'; echo '    -webkit-transition: background-color .2s ease-out;'; echo '    -moz-transition: background-color .2s ease-out;'; echo '    -ms-transition: background-color .2s ease-out;'; echo '    -o-transition: background-color .2s ease-out;'; echo '    transition: background-color .2s ease-out;'; echo '    background-clip: padding-box; /* Fix bleeding */'; echo '    -moz-border-radius: 3px;'; echo '    -webkit-border-radius: 3px;'; echo '    border-radius: 3px;'; echo '    -moz-box-shadow: 0 1px 0 rgba(0, 0, 0, .3), 0 2px 2px -1px rgba(0, 0, 0, .5), 0 1px 0 rgba(255, 255, 255, .3) inset;'; echo '    -webkit-box-shadow: 0 1px 0 rgba(0, 0, 0, .3), 0 2px 2px -1px rgba(0, 0, 0, .5), 0 1px 0 rgba(255, 255, 255, .3)'; echo '    inset;'; echo '    box-shadow: 0 1px 0 rgba(0, 0, 0, .3), 0 2px 2px -1px rgba(0, 0, 0, .5), 0 1px 0 rgba(255, 255, 255, .3) inset;'; echo '    text-shadow: 0 1px 0 rgba(255,255,255, .9);'; echo '    -webkit-touch-callout: none;'; echo '    -webkit-user-select: none;'; echo '    -khtml-user-select: none;'; echo '    -moz-user-select: none;'; echo '    -ms-user-select: none;'; echo '    user-select: none;'; echo '    }'; echo '    .button:hover{'; echo '    background-color: #eee;'; echo '    color: #555;'; echo '    }'; echo '    .button:active{'; echo '    background: #e9e9e9;'; echo '    position: relative;'; echo '    top: 1px;'; echo '    text-shadow: none;'; echo '    -moz-box-shadow: 0 1px 1px rgba(0, 0, 0, .3) inset;'; echo '    -webkit-box-shadow: 0 1px 1px rgba(0, 0, 0, .3) inset;'; echo '    box-shadow: 0 1px 1px rgba(0, 0, 0, .3) inset;'; echo '    }'; echo '    .button[disabled], .button[disabled]:hover, .button[disabled]:active{'; echo '    border-color: #eaeaea;'; echo '    background: #fafafa;'; echo '    cursor: default;'; echo '    position: static;'; echo '    color: #999;'; echo '    /* Usually, !important should be avoided but here it's really needed :) */'
echo '    -moz-box-shadow: none !important;'
echo '    -webkit-box-shadow: none !important;'
echo '    box-shadow: none !important;'
echo '    text-shadow: none !important;'
echo '    }'
echo '    /* Smaller buttons styles */'
echo '    .button.small{'
echo '    padding: 4px 12px;'
echo '    }'
echo '    /* Larger buttons styles */'
echo '    .button.large{'
echo '    padding: 12px 30px;'
echo '    text-transform: uppercase;'
echo '    }'
echo '    .button.large:active{'
echo '    top: 2px;'
echo '    }'
echo '    /* Colored buttons styles */'
echo '    .button.green, .button.red, .button.blue {'
echo '    color: #fff;'
echo '    text-shadow: 0 1px 0 rgba(0,0,0,.2);'
echo '    background-image: -webkit-gradient(linear, left top, left bottom, from(rgba(255,255,255,.3)),'
echo '    to(rgba(255,255,255,0)));'
echo '    background-image: -webkit-linear-gradient(top, rgba(255,255,255,.3), rgba(255,255,255,0));'
echo '    background-image: -moz-linear-gradient(top, rgba(255,255,255,.3), rgba(255,255,255,0));'
echo '    background-image: -ms-linear-gradient(top, rgba(255,255,255,.3), rgba(255,255,255,0));'
echo '    background-image: -o-linear-gradient(top, rgba(255,255,255,.3), rgba(255,255,255,0));'
echo '    background-image: linear-gradient(top, rgba(255,255,255,.3), rgba(255,255,255,0));'
echo '    }'
echo '    /* */'
echo '    .button.green{'
echo '    background-color: #57a957;'
echo '    border-color: #57a957;'
echo '    }'
echo '    .button.green:hover{'
echo '    background-color: #62c462;'
echo '    }'
echo '    .button.green:active{'
echo '    background: #57a957;'
echo '    }'
echo '    /* */'
echo '    .button.red{'
echo '    background-color: #ca3535;'
echo '    border-color: #c43c35;'
echo '    }'
echo '    .button.red:hover{'
echo '    background-color: #ee5f5b;'
echo '    }'
echo '    .button.red:active{'
echo '    background: #c43c35;'
echo '    }'
echo '    /* */'
echo '    .button.blue{'
echo '    background-color: #269CE9;'
echo '    border-color: #269CE9;'
echo '    }'
echo '    .button.blue:hover{'
echo '    background-color: #70B9E8;'
echo '    }'
echo '    .button.blue:active{'
echo '    background: #269CE9;'
echo '    }'
echo '    /* */'
echo '    .green[disabled], .green[disabled]:hover, .green[disabled]:active{'
echo '    border-color: #57A957;'
echo '    background: #57A957;'
echo '    color: #D2FFD2;'
echo '    }'
echo '    .red[disabled], .red[disabled]:hover, .red[disabled]:active{'
echo '    border-color: #C43C35;'
echo '    background: #C43C35;'
echo '    color: #FFD3D3;'
echo '    }'
echo '    .blue[disabled], .blue[disabled]:hover, .blue[disabled]:active{'
echo '    border-color: #269CE9;'
echo '    background: #269CE9;'
echo '    color: #93D5FF;'
echo '    }'
echo '    /* Group buttons */'
echo '    .button-group,'
echo '    .button-group li{'
echo '    display: inline-block;'
echo '    *display: inline;'
echo '    zoom: 1;'
echo '    }'
echo '    .button-group{'
echo '    font-size: 0; /* Inline block elements gap - fix */'
echo '    margin: 0;'
echo '    padding: 0;'
echo '    background: rgba(0, 0, 0, .1);'
echo '    border-bottom: 1px solid rgba(0, 0, 0, .1);'
echo '    padding: 7px;'
echo '    -moz-border-radius: 7px;'
echo '    -webkit-border-radius: 7px;'
echo '    border-radius: 7px;'
echo '    }'
echo '    .button-group li{'
echo '    margin-right: -1px; /* Overlap each right button border */'
echo '    }'
echo '    .button-group .button{'
echo '    font-size: 13px; /* Set the font size, different from inherited 0 */'
echo '    -moz-border-radius: 0;'
echo '    -webkit-border-radius: 0;'
echo '    border-radius: 0;'
echo '    }'
echo '    .button-group .button:active{'
echo '    -moz-box-shadow: 0 0 1px rgba(0, 0, 0, .2) inset, 5px 0 5px -3px rgba(0, 0, 0, .2) inset, -5px 0 5px -3px rgba(0, 0,'
echo '    0, .2) inset;'
echo '    -webkit-box-shadow: 0 0 1px rgba(0, 0, 0, .2) inset, 5px 0 5px -3px rgba(0, 0, 0, .2) inset, -5px 0 5px -3px rgba(0,'
echo '    0, 0, .2) inset;'
echo '    box-shadow: 0 0 1px rgba(0, 0, 0, .2) inset, 5px 0 5px -3px rgba(0, 0, 0, .2) inset, -5px 0 5px -3px rgba(0, 0, 0,'
echo '    .2) inset;'
echo '    }'
echo '    .button-group li:first-child .button{'
echo '    -moz-border-radius: 3px 0 0 3px;'
echo '    -webkit-border-radius: 3px 0 0 3px;'
echo '    border-radius: 3px 0 0 3px;'
echo '    }'
echo '    .button-group li:first-child .button:active{'
echo '    -moz-box-shadow: 0 0 1px rgba(0, 0, 0, .2) inset, -5px 0 5px -3px rgba(0, 0, 0, .2) inset;'
echo '    -webkit-box-shadow: 0 0 1px rgba(0, 0, 0, .2) inset, -5px 0 5px -3px rgba(0, 0, 0, .2) inset;'
echo '    box-shadow: 0 0 1px rgba(0, 0, 0, .2) inset, -5px 0 5px -3px rgba(0, 0, 0, .2) inset;'
echo '    }'
echo '    .button-group li:last-child .button{'
echo '    -moz-border-radius: 0 3px 3px 0;'
echo '    -webkit-border-radius: 0 3px 3px 0;'
echo '    border-radius: 0 3px 3px 0;'
echo '    }'
echo '    .button-group li:last-child .button:active{'
echo '    -moz-box-shadow: 0 0 1px rgba(0, 0, 0, .2) inset, 5px 0 5px -3px rgba(0, 0, 0, .2) inset;'
echo '    -webkit-box-shadow: 0 0 1px rgba(0, 0, 0, .2) inset, 5px 0 5px -3px rgba(0, 0, 0, .2) inset;'
echo '    box-shadow: 0 0 1px rgba(0, 0, 0, .2) inset, 5px 0 5px -3px rgba(0, 0, 0, .2) inset;'
echo '    }'
echo '    a {'
echo '      color: black;'
echo '    }'
echo '    li {'
echo '      border: 2px solid black !important;'
echo '      font-size: 16px;'
echo '      letter-spacing: 0px;'
echo '      font-weight: 700;'
echo '      line-height: 12px;'
echo '      text-decoration: none !important;'
echo '      text-transform: uppercase;'
echo '      background: #194ccdaf !important;'
echo '      color: black !important;'
echo '      border: none;'
echo '      cursor: pointer;'
echo '      justify-content: center;'
echo '      padding: 40px 60px;'
echo '      height: 55px;'
echo '      text-align: center;'
echo '      white-space: normal;'
echo '      border-radius: 8px;'
echo '      min-width: 50em;'
echo '      padding: 1.4em 1.4em 0;'
echo '      box-shadow: 0 0 5px;'
echo '      margin: 1em;'
echo '      display: grid;'
echo '      -webkit-border-radius: 10px;'
echo '      -moz-border-radius: 10px;'
echo '      -ms-border-radius: 10px;'
echo '      -o-border-radius: 10px;'
echo '    }'
echo '  </style>'
echo '  <link rel="stylesheet" href="./toc.css">'
echo '  <script async defer src="./toc.js"></script>'
echo '  <script async defer>'
echo '    function copyToClipboard( text ) {'
echo '      var input = document.body.appendChild( document.createElement( "input" ) );'
echo '      input.value = text;'
echo '      input.focus();'
echo '      input.select();'
echo '      document.execCommand( 'copy' );'
echo '      input.parentNode.removeChild( input );'
echo '    };'
echo '  </script>'
echo '</head>'
echo '<body language-js>'
echo '<!--------------------------------------------------BODY BELOW THIS LINE----------------------------------------->'
}
cmd $listing --sort=extension >>$html
rm -f files
sudo sed -i '/\.git/d' ./index.html
Summer2015
npm init -y
npm install codemirror
sudo sed -i '/\.git/d' ./index.html
sudo sed -i '/images/d' ./index.html
sudo sed -i '/font/d' ./index.html
sudo sed -i '/fonts/d' ./index.html
sudo sed -i '/\.TTF/d' ./index.html
sudo sed -i '/\.git/d' ./index.html
sudo sed -i '/\.js/d' ./index.html
sudo sed -i '/\.php/d' ./index.html
sudo sed -i '/\.css/d' ./index.html
unzipa
unzipa
ll
cd ll
ll
cd misc-folder/
git init
git add .
git add all
git add .
ll
cd extensions\ copy/
git init
git add ,
git add .
git rm .ms-kubernetes-tools.vscode-kubernetes-tools-1.2.1/node_modules/js-yaml/CHANGELOG.md
git rm .ms-kucobernetes-tools.vscode-kubernetes-tools-1.2.1/node_modules/js-yaml/CHANGELOG.md
commit
.dai-shi.vscode-es-beautifier-1.1.0/
git add        .leetcode.vscode-leetcode-0.17.0/
git add        .ms-ossdata.vscode-postgresql-0.3.0/
git add        .ms-vscode.powershell-2020.6.0/
git add        .randomfractalsinc.vscode-data-preview-2.2.0/
git add        .shd101wyy.markdown-preview-enhanced-0.5.15/
git add        .wallabyjs.quokka-vscode-1.0.335/
git add        .wscats.eno-2.3.53/
git add        .yzane.markdown-pdf-1.4.4/
git add        affenwiesel.matlab-formatter-2.8.5/
git add        ahadcove.js-quick-console-0.0.3/
git add        akamud.vscode-javascript-snippet-pack-0.1.6/
git add        alanwalk.markdown-toc-1.5.6/
git add        alexbabichev.formatter-pug-0.0.1/
git add        alexcvzz.vscode-sqlite-0.10.1/
git add        alexcvzz.vscode-sqlite-0.11.1/
git add        algor.monokaiplus-1.1.0/
git add        almenon.arepl-2.0.1/
git add        amandeepmittal.pug-1.0.1/
git add        anchovystudios.zip-extract-all-1.2.0/
git add        apommel.matlab-interactive-terminal-0.3.4/
git add        bajdzis.vscode-database-2.2.3/
git add        bat67.matlab-extension-pack-0.1.0/
git add        bengreenier.vscode-node-readme-3.0.2/
git add        benjpas.close-all-1.0.2/
git add        bierner.docs-view-0.0.8/
git add        bierner.emojisense-0.8.0/
git add        bierner.gif-player-0.0.2/
git add        bierner.lit-html-1.11.1/
git add        bierner.markdown-checkbox-0.1.3/
git add        bierner.markdown-emoji-0.0.9/
git add        bierner.speech-0.0.3/
git add        bramvanbilsen.matlab-code-run-1.0.2/
git add        brapifra.phpserver-3.0.1/
git add        brunnerh.insert-unicode-0.10.0/
git add        brunolm.export-index-0.0.3/
git add        burkeholland.simple-react-snippets-1.2.3/
git add        caolin.java-run-1.1.4/
git add        capaj.vscode-standardjs-snippets-0.8.15/
git add        chenxsan.vscode-standardjs-1.4.0/
git add        christian-kohler.npm-intellisense-1.3.1/
git add        christian-kohler.path-intellisense-2.3.0/
git add        codespaces-contrib.codeswing-0.0.7/
git add        codespaces-contrib.codeswing-0.0.8/
git add        codezombiech.gitignore-0.6.0/
git add        cweijan.vscode-office-1.9.1/
git add        dabai.react-template-0.1.1/
git add        darkriszty.markdown-table-prettify-3.2.0/
git add        daylerees.rainglow-1.5.2/
git add        dbaeumer.vscode-eslint-2.1.14/
git add        dcasella.monokai-plusplus-1.9.1/
git add        docsmsft.docs-markdown-0.2.82/
git add        donjayamanne.githistory-0.6.14/
git add        donjayamanne.javadebugger-0.1.5/
git add        donjayamanne.jquerysnippets-0.0.1/
git add        dsnake.java-debug-0.0.2/
git add        eamodio.gitlens-11.1.3/
git add        eamodio.gitlens-11.2.0/
git add        ecmel.vscode-html-css-1.9.1/
git add        eg2.vscode-npm-script-0.3.13/
git add        esbenp.prettier-vscode-5.8.0/
git add        eventyret.bootstrap-4-cdn-snippet-1.11.0/
git add        exodiusstudios.comment-anchors-1.9.1/
git add        fabiospampinato.vscode-open-in-application-1.0.5/
git add        fcrespo82.markdown-table-formatter-2.1.3/
git add        file-icons.file-icons-1.0.28/
git add        fireside21.cshtml-0.1.3/
git add        fknop.vscode-npm-3.3.0/
git add        fooxly.provision-bar-3.0.3/
git add        fooxly.workspace-1.1.1/
git add        formulahendry.auto-close-tag-0.5.10/
git add        formulahendry.code-runner-0.11.2/
git add        foxundermoon.shell-format-7.0.1/
git add        frhtylcn.pythonsnippets-1.0.2/
git add        gimly81.matlab-2.0.0/
git add        go2sh.cmake-integration-vscode-0.7.1/
git add        gogocrow.webpack-snippets-0.0.4/
git add        hancel.markdown-image-1.0.12/
git add        hancel.markdown-image-1.0.14/
git add        hars.cppsnippets-0.0.15/
git add        hediet.debug-visualizer-2.0.6/
git add        hediet.hediet-power-tools-0.4.0/
git add        hediet.tasks-statusbar-0.1.0/
git add        heflyaway.turbo-js-1.0.2/
git add        henry-li.vscode-import-formatter-0.1.8/
git add        heyimfuzz.banner-comments-0.3.0/
git add        hookyqr.beautify-1.5.0/
git add        howardzuo.vscode-favorites-1.8.3/
git add        humao.rest-client-0.24.4/
git add        huntertran.auto-markdown-toc-3.0.12/
git add        ibm.output-colorizer-0.1.2/
git add        iocave.customize-ui-0.1.50/
git add        iocave.monkey-patch-0.1.11/
git add        ionutvmi.path-autocomplete-1.17.0/
git add        jack89ita.copy-filename-2.3.2/
git add        jakewilson.vscode-cdnjs-0.19.0/
git add        jakob101.relativepath-1.4.0/
git add        jasonnutter.search-node-modules-1.3.0/
git add        jaszhix.theme-monokaimega-4.0.2/
git add        jebbs.markdown-extended-1.0.18/
git add        jeremyrajan.vscode-lebab-1.0.5/
git add        jerrygoyal.shortcut-menu-bar-2.2.0/
git add        jkjustjoshing.vscode-text-pastry-1.2.0/
git add        joffreykern.markdown-toc-1.4.0/
git add        joostlubach.js-index-0.2.2/
git add        jrebocho.vscode-random-1.9.0/
git add        jundat95.react-native-snippet-0.5.6/
git add        kaboyi.copyfilecontent-0.0.1/
git add        kevinrose.vsc-python-indent-1.12.0/
git add        kisstkondoros.vscode-gutter-preview-0.26.2/
git add        lacroixdavid1.vscode-format-context-menu-1.0.4/
git add        leizongmin.node-module-intellisense-1.5.0/
git add        leveluptutorials.react-apollo-snippets-0.0.3/
git add        lizebang.bash-extension-pack-0.0.4/
git add        logerfo.csharp-colors-0.1.8/
git add        lukaserat.npm-scripts-1.0.0/
git add        mads-hartmann.bash-ide-vscode-1.11.0/
git add        manuth.markdown-converter-3.1.2/
git add        mdickin.markdown-shortcuts-0.12.0/
git add        mervin.markdown-formatter-0.8.9/
git add        mgesbert.python-path-0.0.11/
git add        mgmcdermott.vscode-language-babel-0.0.30/
git add        mhutchie.git-graph-1.28.0/
git add        michelemelluso.code-beautifier-2.3.3/
git add        ms-azuretools.vscode-docker-1.9.1/
git add        ms-python.python-2021.1.502429796/
git add        ms-python.vscode-pylance-2021.1.2/
git add        ms-python.vscode-pylance-2021.1.3/
git add        ms-toolsai.jupyter-2020.12.414227025/
git add        ms-vscode.cpptools-1.2.0-insiders/
git add        msjsdiag.vscode-react-native-1.3.0/
git add        mutantdino.resourcemonitor-1.0.7/
git add        myax.short-js-doc-0.2.0/
git add        nanlei.save-all-1.0.0/
git add        naumovs.color-highlight-2.3.0/
git add        nemesv.copy-file-name-1.2.0/
git add        nicoespeon.abracadabra-4.13.1/
git add        njpwerner.autodocstring-0.5.4/
git add        nsfilho.tosnippet-0.1.3/
git add        nucllear.vscode-extension-auto-import-1.4.3/
git add        oderwat.indent-rainbow-7.5.0/
git add        pajoma.vscode-journal-0.11.2/
git add        paulmolluzzo.convert-css-in-js-1.1.3/
git add        pdconsec.vscode-print-0.8.3/
git add        perkovec.jsdoc-live-preview-2.0.0/
git add        pflannery.vscode-versionlens-1.0.9/
git add        pkief.material-icon-theme-4.5.0/
git add        prashaantt.node-tdd-0.2.4/
git add        rebornix.ruby-0.28.1/
git add        redhat.java-0.74.0/
git add        redhat.vscode-xml-0.14.0/
git add        redhat.vscode-yaml-0.14.0/
git add        redvanworkshop.explorer-exclude-vscode-extension-1.2.0/
git add        remisa.shellman-4.10.0/
git add        remisa.shellman-4.9.0/
git add        ria.elastic-0.13.3/
git add        riazxrazor.html-to-jsx-0.0.1/
git add        ritwickdey.liveserver-5.6.1/
git add        rocketseat.rocketseatreactjs-3.0.2/
git add        rogalmic.bash-debug-0.3.9/
git add        rpinski.shebang-snippets-0.1.4/
git add        runem.lit-plugin-1.2.1/
git add        runningcoder.js-snippets-0.2.6/
git add        sallar.json-to-js-object-0.0.4/
git add        shengchen.vscode-checkstyle-1.4.0/
git add        sibiraj-s.vscode-scss-formatter-2.1.0/
git add        skyran.js-jsx-snippets-10.1.0/
git add        slaier.matlab-complete-1.1.1/
git add        slevesque.vscode-multiclip-0.1.5/
git add        slysherz.comment-box-2.0.0/
git add        sporiley.css-auto-prefix-0.1.7/
git add        stackbreak.comment-divider-0.3.0/
git add        stuart.unique-window-colors-1.0.51/
git add        svsool.markdown-kit-1.2.0/
git add        tabnine.tabnine-vscode-3.2.3/
git add        tabnine.tabnine-vscode-3.2.6/
git add        telesoho.vscode-markdown-paste-image-0.12.3/
git add        tfarguts.template-web-page-1.1.2/
git add        tgreen7.vs-code-node-require-1.4.7/
git add        tgreen7.vs-code-node-require-1.8.0/
git add        thekalinga.bootstrap4-vscode-6.1.0/
git add        timonwong.shellcheck-0.12.3/
git add        twxs.cmake-0.0.17/
git add        tyriar.terminal-tabs-0.2.0/
git add        usernamehw.remove-empty-lines-0.0.6/
git add        visualstudioexptteam.vscodeintellicode-1.2.10/
git add        visualstudioexptteam.vscodeintellicode-1.2.11/
git add        vscjava.vscode-java-debug-0.30.0/
git add        vscjava.vscode-java-debug-0.31.0/
git add        vscjava.vscode-java-dependency-0.17.0/
git add        vscjava.vscode-java-pack-0.12.1/
git add        vscjava.vscode-java-test-0.27.0/
git add        vscjava.vscode-maven-0.27.1/
git add        vscode-icons-team.vscode-icons-11.1.0/
git add        vscode.docker-1.0.0/
git add        vscode.yaml-1.0.0/
git add        vsls-contrib.gistfs-0.2.1/
git add        vsls-contrib.gistfs-0.2.2/
git add        wallabyjs.wallaby-vscode-1.0.260/
git add        wallabyjs.wallaby-vscode-1.0.261/
git add        wangtao0101.vscode-js-import-0.15.5/
git add        whtouche.vscode-js-console-utils-0.7.0/
git add        wingrunr21.vscode-ruby-0.28.0/
git add        xabikos.javascriptsnippets-1.8.0/
git add        xabikos.reactsnippets-2.4.0/
git add        yasht.terminal-all-in-one-1.11.16/
git add        yatki.vscode-surround-1.0.2/
git add        yzhang.markdown-all-in-one-3.4.0/
git add
commit
commit -m "initial commit"
pip install dash==1.19.0
npm install --global expo-cli
git clone git://github.com/necolas/css3-social-signin-buttons.git
git add .
git init
git add .
git commit -m "update"
tar -xvzf react-notes-express-server.tgz
init
git init && git add .
git init 
git add .
git remote add origin https://github.com/bgoonz/react-notes-express-framework.git
git commit -m "initial commit"
git push -u origin master
ll
cd ..
cd 08-my-website
cd Stable/
git init
git add .
git commit -m "updated content"
git push 
echo "</body></html>" | tee -a *.html
find ./ -iname "*.md" -type f -exec sh -c 'pandoc "${0}" -o "${0%.md}.html"' {} \;
for f in *.html; do printf '%s\n' 0a '<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>;' . x | ex "$f"; done
find . -empty -type f -print -delete
find . -empty -type f -print -delete
find . \( -name "*SECURITY.txt" -o -name "*RELEASE.txt" -o  -name "*CHANGELOG.txt" -o -name "*LICENSE.txt" -o -name "*CONTRIBUTING.txt" -name "*HISTORY.md" -o -name "*LICENSE" -o -name "*SECURITY.md" -o -name "*RELEASE.md" -o  -name "*CHANGELOG.md" -o -name "*LICENSE.md" -o -name "*CODE_OF_CONDUCT.md" -o -name "*CONTRIBUTING.md" \) -exec rm -rf -- {} +
find . \( -name ".git" -o -name ".gitignore" -o -name ".gitmodules" -o -name ".gitattributes" \) -exec rm -rf -- {} +
find ./ -iname "*.md" -type f -exec sh -c 'pandoc "${0}" -o "${0%.md}.html"' {} \;
sudo sed -i '/\.html/!d' index.html
cd ..
cd MY-WEB-DEV
cd 08-my-website/
cd aux-folder/
ll
cd Directory-Structure-Browser/
git reset Public/2-content/file-browser/_0-my-files/live-examples/
cd ..
cd MY-WEB-DEV
cd 08-my-website/
cd aux-folder/
cd Directory-Structure-Browser/
code .
httrack --ext-depth=2 https://tender-bartik-074feb.netlify.app/
git add .
git commit -m "web-crawled my site"
git push
for file in `find *`; do        sudo tar -xvf "${file}" ; done
for file in `find *`; do        sudo tar -xvf "${file}" ; done
for file in `find *`; do        sudo tar -xvf "${file}" ; done
for file in `find *`; do        sudo tar -xvf "${file}" ; donefor file in `find *`; do
for file in `find *`; do        sudo tar -xvf "${file}" ; done
for file in `find *`; do        sudo tar -xvf "${file}" ; done
for file in `ls -1`; do        sudo tar -xvf "${file}" ; done
find . -empty -type f -print -delete
find . -empty -type d -print -delete
find . \( -name ".git" -o -name ".gitignore" -o -name ".gitmodules" -o -name ".gitattributes" \) -exec rm -rf -- {} +
find . \( -name "*SECURITY.txt" -o -name "*RELEASE.txt" -o  -name "*CHANGELOG.txt" -o -name "*LICENSE.txt" -o -name "*CONTRIBUTING.txt" -name "*HISTORY.md" -o -name "*LICENSE" -o -name "*SECURITY.md" -o -name "*RELEASE.md" -o  -name "*CHANGELOG.md" -o -name "*LICENSE.md" -o -name "*CODE_OF_CONDUCT.md" -o -name "*CONTRIBUTING.md" \) -exec rm -rf -- {} +find . -empty -type f -print -delete
find . -empty -type d -print -delete
find . \( -name ".git" -o -name ".gitignore" -o -name ".gitmodules" -o -name ".gitattributes" \) -exec rm -rf -- {} +
git init
git add .
python app.py
pip install pandas
python app.py
rename 's/\.js\.download$/.js/' *.js\.download  
find . -name "*.zip" | while read filename; do unzip -o -d "`dirname "$filename"`" "$filename"; done;
httrack --ext-depth=2 https://create-react-app.dev/
unzipa
find . \( -name ".git" -o -name ".gitignore" -o -name ".gitmodules" -o -name ".gitattributes" \) -exec rm -rf -- {} +
cd ..
cd MY-WEB-DEV
cd 02-cloned-repos/
find . -name 'node_modules' -type d -prune -exec rm -rf '{}' +
git init
git remote add origin https://github.com/bgoonz/TRASH.git
git commit -m "initial garbage commit"
git add .
git commit -m "initial garbage commit"
git add .
git commit -"frankenstien's blogsite"
git commit -m "frankenstien's blogsite"
git push -u origin master
sudo sed -i '/\.html/!d' index.html
npm run dll
npm run start
git init
git add .
git commit -m "initial commit"
git push -u origin master
git push -u origin master -f
git add .
git commit -m "second commit lol"
git push 
npm-recursive-install
git add .
git commit -m "update"
git push 
find ./ -iname "*.md" -type f -exec sh -c 'pandoc "${0}" -o "${0%.md}.html"' {} \;
#!/bin/sh
# find ./ | grep -i "\.*$" >files
find ./ | sed -E -e 's/([^ ]+[ ]+){8}//' | grep -i "\.*$">files
listing="files"
out=""
html="index.html"
out="basename $out.html"
html="index.html"
cmd() {   echo '  <!DOCTYPE html>';   echo '<html>';   echo '<head>'   echo '  <meta http-equiv="Content-Type" content="text/html">'   echo '  <meta name="Author" content="Bryan Guner">';   echo '<link rel="stylesheet" href="./assets/prism.css">';   echo ' <link rel="stylesheet" href="./assets/style.css">';   echo ' <script async defer src="./assets/prism.js"></script>'   echo "  <title> directory </title>"   echo "";   echo '<style>'; echo '    a {'; echo '      color: black;'; echo '    }'; echo ''; echo '    li {'; echo '      border: 1px solid black !important;'; echo '      font-size: 20px;'; echo '      letter-spacing: 0px;'; echo '      font-weight: 700;'; echo '      line-height: 16px;'; echo '      text-decoration: none !important;'; echo '      text-transform: uppercase;'; echo '      background: #194ccdaf !important;'; echo '      color: black !important;'; echo '      border: none;'; echo '      cursor: pointer;'; echo '      justify-content: center;'; echo '      padding: 30px 60px;'; echo '      height: 48px;'; echo '      text-align: center;'; echo '      white-space: normal;'; echo '      border-radius: 10px;'; echo '      min-width: 45em;'; echo '      padding: 1.2em 1em 0;'; echo '      box-shadow: 0 0 5px;'; echo '      margin: 1em;'; echo '      display: grid;'; echo '      -webkit-border-radius: 10px;'; echo '      -moz-border-radius: 10px;'; echo '      -ms-border-radius: 10px;'; echo '      -o-border-radius: 10px;'; echo '    }'; echo '  </style>';   echo '</head>'   echo '<body>'   echo ""   echo ""   echo ""   echo "<ul>"   awk '{print "<li><a href=\""$1"\">",$1,"&nbsp;</a></li>"}' $listing   echo ""   echo "</ul>"   echo "</body>"   echo "</html>" }
cmd $listing --sort=extension >>$html
sudo sed -i '/\.git/d' ./index.html
sudo sed -i '/images/d' ./index.html
sudo sed -i '/font/d' ./index.html
sudo sed -i '/fonts/d' ./index.html
sudo sed -i '/\.TTF/d' ./index.html
sudo sed -i '/\.c/d' ./index.html
sudo sed -i '/\.rb/d' ./index.html
sudo sed -i '/ruby/d' ./index.html
sudo sed -i '/rouge/d' ./index.html
git add .
git remote add origin https://bgoonz@bitbucket.org/bgoonz/frankenstien.git
npm install
npm audit fix
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
cmd() {   echo '  <!DOCTYPE html>';   echo '<html>';   echo '<head>'   echo '  <meta http-equiv="Content-Type" content="text/html">'   echo '  <meta name="Author" content="Bryan Guner">';   echo '<link rel="stylesheet" href="./assets/prism.css">';   echo ' <link rel="stylesheet" href="./assets/style.css">';   echo ' <script async defer src="./assets/prism.js"></script>'   echo "  <title> directory </title>"   echo "";   echo '<style>'; echo '    a {'; echo '      color: black;'; echo '    }'; echo ''; echo '    li {'; echo '      border: 1px solid black !important;'; echo '      font-size: 20px;'; echo '      letter-spacing: 0px;'; echo '      font-weight: 700;'; echo '      line-height: 16px;'; echo '      text-decoration: none !important;'; echo '      text-transform: uppercase;'; echo '      background: #194ccdaf !important;'; echo '      color: black !important;'; echo '      border: none;'; echo '      cursor: pointer;'; echo '      justify-content: center;'; echo '      padding: 30px 60px;'; echo '      height: 48px;'; echo '      text-align: center;'; echo '      white-space: normal;'; echo '      border-radius: 10px;'; echo '      min-width: 45em;'; echo '      padding: 1.2em 1em 0;'; echo '      box-shadow: 0 0 5px;'; echo '      margin: 1em;'; echo '      display: grid;'; echo '      -webkit-border-radius: 10px;'; echo '      -moz-border-radius: 10px;'; echo '      -ms-border-radius: 10px;'; echo '      -o-border-radius: 10px;'; echo '    }'; echo '  </style>';   echo '</head>'   echo '<body>'   echo ""   echo ""   echo ""   echo "<ul>"   awk '{print "<li><a href=\""$1"\">",$1,"&nbsp;</a></li>"}' $listing   echo ""   echo "</ul>"   echo "</body>"   echo "</html>" }
cmd $listing --sort=extension >>$html
git remote add origin https://github.com/bgoonz/Cumulative-Resource-List.git
git add .
git commit -m "2"
git push -u origin master
cd ..
ll
cd MY-WEB-DEV
ll
cd 02-cloned-repos/
unzipa
sudo apt install unzip
unzipa
find . -name "*.zip" | while read filename; do unzip -o -d "`dirname "$filename"`" "$filename"; done;
find . -name "*.zip" -type f -print -delete
find . -empty -type f -print -delete
ll
find . \( -name ".git" -o -name ".gitignore" -o -name ".gitmodules" -o -name ".gitattributes" \) -exec rm -rf -- {} +
find . \( -name "*SECURITY.txt" -o -name "*RELEASE.txt" -o  -name "*CHANGELOG.txt" -o -name "*LICENSE.txt" -o -name "*CONTRIBUTING.txt" -name "*HISTORY.md" -o -name "*LICENSE" -o -name "*SECURITY.md" -o -name "*RELEASE.md" -o  -name "*CHANGELOG.md" -o -name "*LICENSE.md" -o -name "*CODE_OF_CONDUCT.md" -o -name "*CONTRIBUTING.md" \) -exec rm -rf -- {} +
git init
git add .
git commit -m "cloned repos"
git push-u origin master
git push -u origin master
code .
git push -u origin master
unzip -R
git add.
git add .
unzip infinite-scroll.zip
find . -name "*.zip" | while read filename; do unzip -o -d "`dirname "$filename"`" "$filename"; done;
git push -u origin master
git remote add origin https://github.com/bgoonz/Cloned-Repos.git
git push -u origin master
cd ..
cd 08-my-website
cd aux-folder/
cd Directory-Structure-Browser/
git init
git add .
git commit -m "the biggest commitment I've ever made"
git push -u origin master
npm install
git init
git remote add origin https://github.com/bgoonz/file-system.git
npm init -y
npm install
tree > src-tree.md
npm install
npm audit fix -f
npm install
sudo npm install
npm run test
npm run test --force
npm install -g grunt-cli
grunt build
npm install mocha
npm install chai
npm install chai-as-promised
sudo npm install chai
sudo npm install
git add .
git commit -m "initial commit"
git push -u origin master
npm install
npm install --force
npm audit fix
npm install --force
npm run test
git add .
git commit -m "license"
git push -u origin master
npm install globjs
sudo npm install globjs
npm i glob -f
npm audit fix
npm install
rm -rf *License
rm -rf *LICENSE
rm -rf LICENSE
rm -rf ./LICENSE
rm -rf ./*/**LICENSE
git add .
find ./ -iname "*.md" -type f -exec sh -c 'pandoc "${0}" -o "${0%.md}.html"' {} \;
for f in *.html; do printf '%s\n' 0a '<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>;' . x | ex "$f"; done
echo "</body></html>" | tee -a *.html
find . \( -name "*SECURITY.txt" -o -name "*RELEASE.txt" -o  -name "*CHANGELOG.txt" -o -name "*LICENSE.txt" -o -name "*CONTRIBUTING.txt" -name "*HISTORY.md" -o -name "*LICENSE" -o -name "*SECURITY.md" -o -name "*RELEASE.md" -o  -name "*CHANGELOG.md" -o -name "*LICENSE.md" -o -name "*CODE_OF_CONDUCT.md" -o -name "*CONTRIBUTING.md" \) -exec rm -rf -- {} +
npm i chai
npm i
npm-recursive-install
#! /bin/bash
#
# Convert Cygwin path to Windows path. Written by davidhcefx, 2019.10.17.
# Description:
#     Under Cygwin, paths such as C:\Users would appear as /cygdrive/c/Users,
#     while paths that belong to Unix such as /var/log are actually C:\cygwin64\var\log.
# Usage:
#     You can use this script like this: explorer "$(toWinPath .)",
#     in order to open up explorer.exe under that folder.
if [ $# == 0 ]; then     echo "Syntax: toWinPath \"path-to-file\".";     exit; fi
#! /bin/bash
#
# Convert Cygwin path to Windows path. Written by davidhcefx, 2019.10.17.
# Description:
#     Under Cygwin, paths such as C:\Users would appear as /cygdrive/c/Users,
#     while paths that belong to Unix such as /var/log are actually C:\cygwin64\var\log.
# Usage:
#     You can use this script like this: explorer "$(toWinPath .)",
#     in order to open up explorer.exe under that folder.
if [ $# == 0 ]; then     echo "Syntax: toWinPath \"path-to-file\".";     exit; fi
chmod -x develop_server.sh
bash develop_server.sh
apt install xz-utils
su
tar -xf *
tar -xf './*'
sudo apt install xz-utils
tar -xf *.xz
cd ..
tar -xf *.xz
tar -xf file.xz
git add.
git add .
git commit -m "wub"
#!/bin/bash
if [ $# -lt 1 ]; then     echo "Usage: $(basename "$0") file";     exit 1; fi
wget -r http://cygwin.mirror.constant.com/
unzip ./
unzip './'
#!/bin/bash
if [ $# -lt 1 ]; then     echo "Usage: $(basename "$0") file";     exit 1; fi
npm install -g find-up
node 
node
npm install -g find-up
npm install  find-up
node
cd ..
cd  MY-WEB-DEV
cd 07-misc/
mkdir find-up
cd find-up
touch findupspec.js
code .
cd ..
python3
import subprocess
import logging
import shutil
import os
import stat
import errno
import platform
from sys import exit
class Backup:
cd ..
cd MY-WEB-DEV
cd 04-Personal-Projects/
cd Dir-tree-from-ul/
mkdir trash
cd trash
find . -name "*.zip" | while read filename; do unzip -o -d "`dirname "$filename"`" "$filename"; done;
find . -name "*.zip" -type f -print -delete
cd ..
find . -name "*.zip" | while read filename; do unzip -o -d "`dirname "$filename"`" "$filename"; done;
cd ..
cd Dir-tree-from-ul/
find . -name "*.zip" | while read filename; do unzip -o -d "`dirname "$filename"`" "$filename"; done;
#!/bin/sh
set -ex
bundle exec rake spec
find . -name "*.tgz" -type f -print -delete
git add .
find . \( -name ".git" -o -name ".gitignore" -o -name ".gitmodules" -o -name ".gitattributes" \) -exec rm -rf -- {} +
find . \( -name "*SECURITY.txt" -o -name "*RELEASE.txt" -o  -name "*CHANGELOG.txt" -o -name "*LICENSE.txt" -o -name "*CONTRIBUTING.txt" -name "*HISTORY.md" -o -name "*LICENSE" -o -name "*SECURITY.md" -o -name "*RELEASE.md" -o  -name "*CHANGELOG.md" -o -name "*LICENSE.md" -o -name "*CODE_OF_CONDUCT.md" -o -name "*CONTRIBUTING.md" \) -exec rm -rf -- {} +
#!/bin/sh
set -ex
bundle exec rake spec
#!/bin/sh
set -ex
bundle exec rake spec
npm install
npm audit fix -f
git add .
git commit -m "mid day grind"
git push
git pull
npm install
function extract () {    if [ -f $1 ] ; then      case $1 in        *.tar.bz2)   tar xvjf $1    ;;        *.tar.gz)    tar xvzf $1    ;;        *.tar.xz)    tar Jxvf $1    ;;        *.bz2)       bunzip2 $1     ;;        *.rar)       rar x $1       ;;        *.gz)        gunzip $1      ;;        *.tar)       tar xvf $1     ;;        *.tbz2)      tar xvjf $1    ;;        *.tgz)       tar xvzf $1    ;;        *.zip)       unzip -d `echo $1 | sed 's/\(.*\)\.zip/\1/'` $1;;        *.Z)         uncompress $1  ;;        *.7z)        7z x $1        ;;        *)           echo "don't know how to extract '$1'" ;;      esac ;   else      echo "'$1' is not a valid file!" ;   fi ; } 
function extract () {    if [ -f $1 ] ; then      case $1 in        *.tar.bz2)   tar xvjf $1    ;;        *.tar.gz)    tar xvzf $1    ;;        *.tar.xz)    tar Jxvf $1    ;;        *.bz2)       bunzip2 $1     ;;        *.rar)       rar x $1       ;;        *.gz)        gunzip $1      ;;        *.tar)       tar xvf $1     ;;        *.tbz2)      tar xvjf $1    ;;        *.tgz)       tar xvzf $1    ;;        *.zip)       unzip -d `echo $1 | sed 's/\(.*\)\.zip/\1/'` $1;;        *.Z)         uncompress $1  ;;        *.7z)        7z x $1        ;;        *)           echo "don't know how to extract '$1'" ;;      esac ;   else      echo "'$1' is not a valid file!" ;   fi ; } 
unzip -zst setup.szt
find . -name "*.zip" | while read filename; do unzip -o -d "`dirname "$filename"`" "$filename"; done;
function extract () {    if [ -f $1 ] ; then      case $1 in        *.tar.bz2)   tar xvjf $1    ;;        *.tar.gz)    tar xvzf $1    ;;        *.tar.xz)    tar Jxvf $1    ;;        *.bz2)       bunzip2 $1     ;;        *.rar)       rar x $1       ;;        *.gz)        gunzip $1      ;;        *.tar)       tar xvf $1     ;;        *.tbz2)      tar xvjf $1    ;;        *.tgz)       tar xvzf $1    ;;        *.zip)       unzip -d `echo $1 | sed 's/\(.*\)\.zip/\1/'` $1;;        *.Z)         uncompress $1  ;;        *.7z)        7z x $1        ;;        *)           echo "don't know how to extract '$1'" ;;      esac ;   else      echo "'$1' is not a valid file!" ;   fi ; } 
httrack --ext-depth=2 https://codepen.io/asraven/pens/public
httrack --ext-depth=2 http://alexraven.com/
function extract () {    if [ -f $1 ] ; then      case $1 in        *.tar.bz2)   tar xvjf $1    ;;        *.tar.gz)    tar xvzf $1    ;;        *.tar.xz)    tar Jxvf $1    ;;        *.bz2)       bunzip2 $1     ;;        *.rar)       rar x $1       ;;        *.gz)        gunzip $1      ;;        *.tar)       tar xvf $1     ;;        *.tbz2)      tar xvjf $1    ;;        *.tgz)       tar xvzf $1    ;;        *.zip)       unzip -d `echo $1 | sed 's/\(.*\)\.zip/\1/'` $1;;        *.Z)         uncompress $1  ;;        *.7z)        7z x $1        ;;        *)           echo "don't know how to extract '$1'" ;;      esac ;   else      echo "'$1' is not a valid file!" ;   fi ; } 
#!/usr/bin/env bash
echo
echo "* Running all the demos..."
echo
echo "* 01_simple"
node 01_simple/app.js
echo
echo "* 02_same_dir"
node 02_same_dir/app.js
echo
echo "* 03_array_dir"
node 03_array_dir/app.js
echo
echo "* 04_recursive"
node 04_recursive/app.js
echo
echo "* 05_map"
node 05_map/app.js
echo
echo "* 06_initializers"
node 06_initializers/app.js
echo
echo "* 10_config files"
node 10_config/app.js
echo
echo "* 20_gulp_simple"
gulp --cwd 20_gulp_simple
echo
echo "* 21_gulp_advanced"
gulp --cwd 21_gulp_advanced
echo
echo "* Finished."
npm i require-dir-all
npm i require-dir-all -f
node app.js
git add .
git commit -m "node modules"
npm install --save require-dir-all
sudo npm install --save require-dir-all
sudo npm install --save require-dir-all -f
npm audit fix
npm audit fix -f
node index.js
node index.js
npm install
node index.js 
rename 's/\.js\.download$/.js/' *.js\.download  
npm run bench
npm install
git commit -m "my computer is overheating and so am i"
find . -type f -a \( -name "*.html"  -o -name "*.md" \) -a -exec sed -i  '/[Source]/d' '{}' +
find . -name "*.zip" | while read filename; do unzip -o -d "`dirname "$filename"`" "$filename"; done;
find . -type f -a \( -name "*.html"  -o -name "*.md" \) -a -exec sed -i  '/[Source]/d' '{}' +
git init
git add .
git commit -m "initial commit"
git push -u origin master
function extract () {    if [ -f $1 ] ; then      case $1 in        *.tar.bz2)   tar xvjf $1    ;;        *.tar.gz)    tar xvzf $1    ;;        *.tar.xz)    tar Jxvf $1    ;;        *.bz2)       bunzip2 $1     ;;        *.rar)       rar x $1       ;;        *.gz)        gunzip $1      ;;        *.tar)       tar xvf $1     ;;        *.tbz2)      tar xvjf $1    ;;        *.tgz)       tar xvzf $1    ;;        *.zip)       unzip -d `echo $1 | sed 's/\(.*\)\.zip/\1/'` $1;;        *.Z)         uncompress $1  ;;        *.7z)        7z x $1        ;;        *)           echo "don't know how to extract '$1'" ;;      esac ;   else      echo "'$1' is not a valid file!" ;   fi ; } 
git push -u origin master
git remote add origin https://github.com/bgoonz/blog-templates.git
git push -u origin master
function extract () {    if [ -f $1 ] ; then      case $1 in        *.tar.bz2)   tar xvjf $1    ;;        *.tar.gz)    tar xvzf $1    ;;        *.tar.xz)    tar Jxvf $1    ;;        *.bz2)       bunzip2 $1     ;;        *.rar)       rar x $1       ;;        *.gz)        gunzip $1      ;;        *.tar)       tar xvf $1     ;;        *.tbz2)      tar xvjf $1    ;;        *.tgz)       tar xvzf $1    ;;        *.zip)       unzip -d `echo $1 | sed 's/\(.*\)\.zip/\1/'` $1;;        *.Z)         uncompress $1  ;;        *.7z)        7z x $1        ;;        *)           echo "don't know how to extract '$1'" ;;      esac ;   else      echo "'$1' is not a valid file!" ;   fi ; } 
git add .
chmod -x develop_server.sh
bash develop_server.sh
chmod -x develop_server.sh
bash develop_server.sh
python3 pelicanconf.py
find . -name "*.zip" | while read filename; do unzip -o -d "`dirname "$filename"`" "$filename"; done;
git add .
git commit -m "cleanup"
find . -name "*.zip" | while read filename; do unzip -o -d "`dirname "$filename"`" "$filename"; done;
find . -name "*.zip" -type f -print -delete
find . -empty -type f -print -delete
find . -empty -type d -print -delete
find . \( -name ".git" -o -name ".gitignore" -o -name ".gitmodules" -o -name ".gitattributes" \) -exec rm -rf -- {} +
find . \( -name "*SECURITY.txt" -o -name "*RELEASE.txt" -o  -name "*CHANGELOG.txt" -o -name "*LICENSE.txt" -o -name "*CONTRIBUTING.txt" -name "*HISTORY.md" -o -name "*LICENSE" -o -name "*SECURITY.md" -o -name "*RELEASE.md" -o  -name "*CHANGELOG.md" -o -name "*LICENSE.md" -o -name "*CODE_OF_CONDUCT.md" -o -name "*CONTRIBUTING.md" \) -exec rm -rf -- {} +
git remote add origin https://github.com/bgoonz/website-dev-assets.git
git add .
git commit -m "initial commit"
git push -u origin master
find . -empty -type f -print -delete
find . -empty -type d -print -delete
find . \( -name ".git" -o -name ".gitignore" -o -name ".gitmodules" -o -name ".gitattributes" \) -exec rm -rf -- {} +
find . \( -name "*SECURITY.txt" -o -name "*RELEASE.txt" -o  -name "*CHANGELOG.txt" -o -name "*LICENSE.txt" -o -name "*CONTRIBUTING.txt" -name "*HISTORY.md" -o -name "*LICENSE" -o -name "*SECURITY.md" -o -name "*RELEASE.md" -o  -name "*CHANGELOG.md" -o -name "*LICENSE.md" -o -name "*CODE_OF_CONDUCT.md" -o -name "*CONTRIBUTING.md" \) -exec rm -rf -- {} +
git remote add origin https://github.com/bgoonz/website-dev-assets.git
git init
git add .
git commit -m "wub"
find . -name "*.zip" | while read filename; do unzip -o -d "`dirname "$filename"`" "$filename"; done;
find . -name "*.zip" -type f -print -delete
node-sass src/style.scss dest/style.css -r
node-sass src/style.scss ./style.css -r
node-sass ./styles.scss -o ./styles.css
ll
cd ..
cd MY-WEB-DEV
cd 07-misc/
wget -r https://maggieappleton.com/
npm install -g sass
npm install-g  node-sass
npm install -g  node-sass
npm install -g marked
sudo apt update
sudo apt upgrade
npm install
npm audit fix -f
code .
virtualenv venv
sudo apt install python3-virtualenv
virtualenv venv
curl -H "x-api-key: <your api key>" "https://api.wappalyzer.com/lookup/v2/?urls=https://example.com&sets=locale,social,contact"
npm install -g @cloudflare/wrangler
npm install
npm run test
npm install
npm install
npm init -y
for f in * ; do    mv "$f" "$f.html"; done
for f in * ; do    mv "$f" "$f.html"; done
httrack --ext-depth=2 https://egghead.io/lessons/
find . -empty -type f -print -delete
find . -empty -type d -print -delete
for f in * ; do    mv "$f" "$f.html"; done
for f in * ; do    mv "$f" "$f.png"; done
find . -empty -type f -print -delete
find . -empty -type d -print -delete
sudo find . -empty -type f -print -delete
find . -empty -type f -print -delete
find . -empty -type d -print -delete
find . -empty -type f -print -delete
find . -empty -type d -print -delete
rename 's/$/.png/' *.  
for f in * ; do    mv "$f" "$f.html"; done
code .
wrangler generate myap https://github.com/bgoonz/web-dev-notes-resource-site.git
npm cache clean --force
ll
rm -d node_modulse/
rm -d node_modules/
sudo rm -d node_modules/
sudo rm -rd node_modules/
ll
npm install pushstate-server --save
npm start
for f in * ; do    mv "$f" "$f.html"; done
