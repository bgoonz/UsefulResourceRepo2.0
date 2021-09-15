function RecurseDirs ()
{
    oldIFS=$IFS
    IFS=$'\n'
    for f in "$@"
    do

  # YOUR CODE HERE!
find ./ -iname "*.md" -type f -exec sh -c 'pandoc --standalone "${0}" -o "${0%.md}.html"' {} \;


        if [[ -d "${f}" ]]; then
            cd "${f}"
            RecurseDirs $(ls -1 ".")
            cd ..
        fi
    done
    IFS=$oldIFS
}
RecurseDirs "./"
