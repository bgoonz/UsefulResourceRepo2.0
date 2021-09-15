# function recursive_for_loop { 
#     for f in *;  do 
#         if [ -d $f  -a ! -h $f ];  
#         then  
#         for f in *.html; do printf '%s\n' 0a '<!DOCTYPE html>
# <html lang="en">
# <head>
#   <meta charset="UTF-8">
#   <meta name="viewport" content="width=device-width, initial-scale=1.0">
#   <title>Document</title>
# </head>
# <body>;' . x | ex "$f"; done
#         fi;  
#     done;  
# };
# recursive_for_loop



function recursive_for_loop { 
    for f in ./;  do 
        if [ -d $f  -a ! -h $f ];  
        then  
         cd -- "$f";  
   find ./ -type d -exec echo "</body></html>" | tee -a *.html {} \;
 recursive_for_loop;
            cd ..; 
        fi;  
    done;  
};
recursive_for_loop

find . -name '*.html'
find ./ -iname "*.html" -type f -exec  printf "</body></html>"  {} \;

for x in "./"/*/; do
  (cd "$x"
   files=(*)
   printf '%s\n' "${files[@]}" > deleteme.txt
  )
done



find ./ -type d -execdir echo "</body></html>" | tee -a *.html {} \;




find ./* -type d | xargs -I {} echo "</body></html>" | tee -a *.html 
