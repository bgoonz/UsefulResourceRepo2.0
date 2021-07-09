#!/bin/bash
sudo apt install unzip

find . -name "*.zip" | while read filename; do unzip -o -d "`dirname "$filename"`" "$filename"; done;


# then delete the zip files
find . -name "*.zip" -type f -print -delete