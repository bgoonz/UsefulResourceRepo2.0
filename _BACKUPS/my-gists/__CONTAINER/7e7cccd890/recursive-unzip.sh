# Recursively unzip zip files and then delete the archives when finished


sudo apt install unzip



find . -name "*.zip" | while read filename; do unzip -o -d "`dirname "$filename"`" "$filename"; done;




find . -name "*.zip" -type f -print -delete