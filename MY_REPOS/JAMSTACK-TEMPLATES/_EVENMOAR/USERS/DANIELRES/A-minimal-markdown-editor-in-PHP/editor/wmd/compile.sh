#!/bin/bash
LIB_DIR="lib"
TARGETS=( "build" "docs" )
TARGET_COUNT=${#TARGETS[@]}
JS_SOURCE_DIR="src/js"
JS_SOURCE_FILES=( "wmd.js" "translator.js" "chunk.js" "inputstate.js" "command.js" "dialog.js" "form.js" "field.js" "linkhelper.js" )
JS_SOURCE_COUNT=${#JS_SOURCE_FILES[@]}
CSS_SOURCE_DIR="src/css"
CSS_SOURCE_FILES=( "wmd.css" )
CSS_SOURCE_COUNT=${#CSS_SOURCE_FILES[@]}
IMG_SOURCE_DIR="src/img"
IMG_SOURCE_SEARCH="*.png"

echo Compressing JavaScript to ${TARGETS[0]}/wmd.js:
mkdir ${TARGETS[0]}
touch ${TARGETS[0]}/wmd.js

if [ "$1" == "--showdown" ] || [ "$2" == "--showdown" ]
then
	echo $LIB_DIR/showdown.js
	
	if [ "$1" == "--nocompress" ] || [ "$2" == "--nocompress" ]
	then
		cat $LIB_DIR/showdown.js > ${TARGETS[0]}/showdown.js
	else
		java -jar $LIB_DIR/yuicompressor-2.4.2.jar --nomunge --preserve-semi $LIB_DIR/showdown.js > ${TARGETS[0]}/showdown.js
	fi
	
	echo >> ${TARGETS[0]}/wmd.js
	
	echo "(function() {" >> ${TARGETS[0]}/wmd.js
else
	echo "(function() {" > ${TARGETS[0]}/wmd.js
fi

for (( i=0;i<$JS_SOURCE_COUNT;i++ )); do
	echo $JS_SOURCE_DIR/${JS_SOURCE_FILES[${i}]}
	
	if [ "$1" == "--nocompress" ] || [ "$2" == "--nocompress" ]
	then
		cat $JS_SOURCE_DIR/${JS_SOURCE_FILES[${i}]} >> ${TARGETS[0]}/wmd.js
	else
		java -jar $LIB_DIR/yuicompressor-2.4.2.jar --nomunge --preserve-semi $JS_SOURCE_DIR/${JS_SOURCE_FILES[${i}]} >> ${TARGETS[0]}/wmd.js
	fi
	
	echo >> ${TARGETS[0]}/wmd.js
done

# Show off the public script APIs and then close the script.
echo "window.WMD = WMD;" >> ${TARGETS[0]}/wmd.js
echo "window.WMD.Command = Command;" >> ${TARGETS[0]}/wmd.js
echo "window.WMD.Form = Form;" >> ${TARGETS[0]}/wmd.js
echo "window.WMD.Field = Field;" >> ${TARGETS[0]}/wmd.js
echo "})();" >> ${TARGETS[0]}/wmd.js

echo

for (( i=1;i<$TARGET_COUNT;i++ )); do
	mkdir ${TARGETS[${i}]}
	echo Copying to target ${TARGETS[${i}]}/wmd.js
	cat ${TARGETS[0]}/wmd.js > ${TARGETS[${i}]}/wmd.js
done

echo
echo Compressing CSS to ${TARGETS[0]}/wmd.css:
touch ${TARGETS[0]}/wmd.css
echo > ${TARGETS[0]}/wmd.css

for (( i=0;i<$CSS_SOURCE_COUNT;i++ )); do
	echo $CSS_SOURCE_DIR/${CSS_SOURCE_FILES[${i}]}

	if [ "$1" == "--nocompress" ] || [ "$2" == "--nocompress" ]
	then
		cat $CSS_SOURCE_DIR/${CSS_SOURCE_FILES[${i}]} >> ${TARGETS[0]}/wmd.css
	else
		java -jar $LIB_DIR/yuicompressor-2.4.2.jar "--type" css $CSS_SOURCE_DIR/${CSS_SOURCE_FILES[${i}]} >> ${TARGETS[0]}/wmd.css
	fi
	
	echo >> ${TARGETS[0]}/wmd.css
done

echo

for (( i=1;i<$TARGET_COUNT;i++ )); do
	echo Copying to target ${TARGETS[${i}]}/wmd.css
	cat ${TARGETS[0]}/wmd.css > ${TARGETS[${i}]}/wmd.css
done

echo

for (( i=0;i<$TARGET_COUNT;i++ )); do
	echo Copying images to ${TARGETS[${i}]}/
	cp $IMG_SOURCE_DIR/$IMG_SOURCE_SEARCH ${TARGETS[${i}]}
done

echo