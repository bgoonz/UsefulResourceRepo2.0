#!/bin/bash 

 
link="https://d19vezwu8eufl6.cloudfront.net/algs4partI/recoded_videos%2Falgs4partI-" 
#links were a set of strings with just the index of the video as the variable 
 
num=3  
#first video was numbered 3 - weird.  
 
ext=".mp4" 
 
while [ $num -le 66 ] 
do 
      wget $link$num$ext -P ~/Downloads/ 
      num=$(($num+1)) 
done 
