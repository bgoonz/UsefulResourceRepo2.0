#!/bin/csh -f
#### usage: mkhtml [out]
########### create $out.html page, listing all files in ./

 ls > files

 set listing = "files"
 set out = $1
#set html = index.html

echo " ==== create .html page listing files in a list-file ==== "
echo ""

if( "$listing" == "" ) then
  echo " --- mkhtml out.html ---  ls > files failed, try again ..."
  echo "     ... after you create list_file with:  ls > files"
  echo ""
	exit
endif

if( "$out" == "" ) then
  echo " 	--> enter output (base)name  [ blank for index] :"
    set out = $<
  if( "$out" != "" ) then
	echo " 		out = $out	will strip off .html ..."
    set outt = `basename $out .html`
    set html = ${outt}.html
  else
    set html = "index.html"	##default
  endif
endif
	echo " will produce:  $html"

 echo ""
 echo -n "... 	enter title in quotes: "
 set title = $<

#################### now create the $html file ####################
	     PATH/html-body.csh  $listing $title >> $html

#------------------- clean up -------------------#

 sed '/href="files"/d' $html > tmp
 rm -f  $html 
 mv tmp $html 
	rm -f files

