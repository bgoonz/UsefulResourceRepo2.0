#!/bin/sh

find ./ | grep -i "\.js*$" >files

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

  echo ' <link rel="stylesheet" href="./toc.css">'
  echo ' <script async defer src="./toc.js"></script>'

  echo "  <TITLE> directory </TITLE> </head>"

  echo ""

  echo '</head>'

  echo '<body>'

  echo ""

  #################### continue with the HTML stuff:

  echo ""

  echo ""

  echo "<ul>"

  awk '{print "<li><a href=\""$1"\">",$1,"&nbsp;"}' $listing

  # awk '{print "<li>"};

  # 	{print " <a href=\""$1"\">",$1,"</a></li>&nbsp;"}' \ $listing

  echo ""

  echo "</ul>"

  echo "</body>"

  echo "</html>"

}

cmd $listing >>$html
