#!/bin/csh -f
############# called by S/mkhtml and S/mkpics  as: 
####		html3-body.csh $listing $title >> $html

########### listing all files in a list-file
########### 	 produced by `ls > files` (by S/mkhtml)

set listing = $1
set title   = $2
set year    = $3
set album   = $4

#################### 
 echo '<html><head>'
 echo '  <meta name="ROBOTS" content="NOINDEX, NOFOLLOW">'
 echo '  <meta http-equiv="Content-Type" content="text/html"; '
 echo '        charset="iso-8859-1"> '
 echo '  <meta name="Author" content="Bryan Guner">'

 echo "  <TITLE> $title </TITLE> </head>"
 echo ""
#
 echo '<body BGCOLOR="#ffffff" TEXT="#000000" LINK="#0000ff" VLINK="#ff0000" ALINK="#E500FF">'
 echo ""

#################### continue with the HTML stuff:
 echo "<font face="arial, helvetica" size=3>"
 echo ""

 echo "<center><font size=+2><b> $title "
 echo "</b></font><br><b> subtitle"
 echo "</b></center>"
 echo ""
#echo "<UL>"
 echo "<p>"

 awk '{print "<LI><a href=\""$1"\">",$1,"</A>&nbsp;"}' $listing
# awk '{print "<LI>"}; \
#	{print " <a href=\""$1"\">",$1,"</A>&nbsp;"}' $listing 

 echo ""
#echo "</UL>"
 echo "</font>"
 echo ""
 echo "<hr noshade>"

 echo "<FONT SIZE="-1">"
 echo "&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;"
 echo "Last Modified:"
 echo '    <?php require "$USER/www-home/lastmod.php"; ?>'
 echo "</FONT>"

 echo "</body>"
 echo "</html>"

#### also see htmltable.csh
