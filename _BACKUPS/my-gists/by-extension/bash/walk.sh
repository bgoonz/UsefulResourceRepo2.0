file_specification() {
        FILE_NAME="$(basename "${entry}")"
        DIR="$(dirname "${entry}")"
        NAME="${FILE_NAME%.*}"
        EXT="${FILE_NAME##*.}"
        SIZE="$(du -sh "${entry}" | cut -f1)"

        printf "%*s${GRE}%s${NCL}\n"                    $((indent+4)) '' "${entry}"
        printf "%*s\tFile name:\t${YEL}%s${NCL}\n"      $((indent+4)) '' "$FILE_NAME"
        printf "%*s\tDirectory:\t${YEL}%s${NCL}\n"      $((indent+4)) '' "$DIR"
        printf "%*s\tName only:\t${YEL}%s${NCL}\n"      $((indent+4)) '' "$NAME"
        printf "%*s\tExtension:\t${YEL}%s${NCL}\n"      $((indent+4)) '' "$EXT"
        printf "%*s\tFile size:\t${YEL}%s${NCL}\n"      $((indent+4)) '' "$SIZE"
}

walk() {
        local indent="${2:-0}"
        printf "\n%*s${RED}%s${NCL}\n\n" "$indent" '' "$1"
        # If the entry is a file do some operations
        for entry in "$1"/*; do [[ -f "$entry" ]] && file_specification; done
        # If the entry is a directory call walk() == create recursion
        for entry in "$1"/*; do [[ -d "$entry" ]] && walk "$entry" $((indent+4)); done
}

# If the path is empty use the current, otherwise convert relative to absolute; Exec walk()
[[ -z "${1}" ]] && ABS_PATH="${PWD}" || cd "${1}" && ABS_PATH="${PWD}"
walk "${ABS_PATH}"      
echo               