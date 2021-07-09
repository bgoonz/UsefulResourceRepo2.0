#!/bin/bash 
TARGET_DIR=("$@") 
[ "x$1" == "x" ] && TARGET_DIR=(".") 
function confirmDeletion() { 
    local confirm="" 
    until [ "x$confirm" == 'xy' ] || [ "x$confirm" == 'xn' ] 
    do 
        read -ep "    Delete [y/n]: " confirm 
        confirm=$(echo "$confirm" | tr [:upper:] [:lower:]) 
    done 
    [ "x$confirm" == 'xy' ] 
} 
function deleteWithConfirmation() { 
    for file in "${@}" 
    do 
        if rm "$file"; then 
            echo "    OK: $file" 
        else 
            echo "    FAIL: $file" 
        fi 
    done 
} 
for i in {'*~','a.out','*.o','*.gch','*nppdf32Log*'} 
do 
    echo "Files matching: $i" 
    FILES=() 
    while read -rd '' file 
    do 
        FILES+=("$file") 
        echo "  $file" 
    done < <(find "${TARGET_DIR[@]}" -depth -iname "$i" -print0) 
    if [ "x${FILES[*]}" != "x" ]; then 
        if confirmDeletion; then 
            deleteWithConfirmation "${FILES[@]}" 
        else 
            echo "   Skipping" 
        fi 
    fi 
done 