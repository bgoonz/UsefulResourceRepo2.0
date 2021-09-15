#!/bin/bash
     # renames.sh
     # basic file renamer
     criteria=$1
     re_match=$2
     replace=$3
     
     for i in $( ls *$criteria* ); 
     do
         src=$i
         tgt=$(echo $i | sed -e "s/$re_match/$replace/")
         mv $src $tgt
     done