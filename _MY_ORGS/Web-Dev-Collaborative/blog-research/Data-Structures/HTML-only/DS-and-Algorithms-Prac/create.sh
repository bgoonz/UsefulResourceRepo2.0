#!/bin/sh
find ./ | grep -i "\.html*$" >files
listing="files"
out=""
html="index.html"
cmd() {
  echo " ==== create .html page listing files in a list-file ==== "

  echo " 		out = $out	will strip off .html ..."
  out="basename $out.html"

  html="index.html" ##default;;

  echo'<DOCTYPE="html">'
  echo '<html><head>'
  echo '  <meta name="ROBOTS" content="NOINDEX, NOFOLLOW">'
  echo '  <meta http-equiv="Content-Type" content="text/html"; '
  echo '        char="iso-8859-1"> '
  echo '  <meta name="Author" content="Bryan Guner">'

  echo "  <TITLE> directory </TITLE> </head>"
  echo ""
  #
  echo '<body>'
  echo ""

  #################### continue with the HTML stuff:
  echo "<font face="arial, helvetica" size=3>"
  echo ""

  echo "</center>"
  echo ""
  echo "<ul>"

  awk '{print "<LI><a href=\""$1"\">",$1,"</A>&nbsp;"}' $listing
  # awk '{print "<LI>"};
  # 	{print " <a href=\""$1"\">",$1,"</A>&nbsp;"}' \ $listing

  echo ""
  echo "</ul>"

  echo "</body>"
  echo "</html>"

}
cmd $listing >>$html
