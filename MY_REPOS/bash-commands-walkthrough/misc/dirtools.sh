  
#!/usr/bin/env false

#****f* dir_tools.bsh/parent_find_files
# NAME
#   parent_find_files - Find files by searching up the parent tree
# DESCRIPTION
#   Searches for files to use. It starts by checking the current directory,
#   and goes up. Just like git searches for a .git directory
# INPUTS
#   $1... - The names of the files being searched for
# RETURN VALUE
#   file_matches - array containing matches
# SEE ALSO
#   just/_just_find_justfile

#***
parent_find_files()
{
  local name
  file_matches=()
  # Speed improvement: if it's right there, echo it out right away
  for name in "${@}"; do
    if [ -f "${name}" ]; then
      file_matches+=("${PWD}/${name}")
    fi
  done

  \pushd . > /dev/null
  # Search for the file until some match is found
  while [ "${#file_matches[@]}" -eq 0 ]; do
    for name in "${@}"; do
      if [ -f "${name}" ]; then
        file_matches+=("$(\cd "$(\dirname "${name}")"; \pwd)/$(\basename "${name}")")
      fi
    done

    if [ "${PWD}" == "/" ]; then
      break
    fi

    cd ..
  done
  \popd > /dev/null
}

#****v* make_temp_dir/_VSI_TEMP_DIRS
# NOTES
#   Do NOT mess with this variable. It is used to force recursive remove
#   directories, and any mishaps could result in serious injury to computer,
#   and you, depending on how upset you get by losing your computer.
#***
_VSI_TEMP_DIRS=()

#****f* dir_tools.bsh/make_temp_dir
# NAME
#   make_temp_dir - Create self cleaning temp directories
# INPUTS
#   [$1...] - Optionally add additional arguments to mktemp call. The most
#             useful thing to add would be -t, as this is in all the OSes
# OUTPUT
#   temp_dir - Name of temporary directory
# USAGE
#   Use this to create a self deleting temp file. If you do not want to have it
#   self delete, just use "mktemp -d".
#
#   Can be called multiple times
# EXAMPLE
#   make_temp_dir
#   touch "${temp_dir}"/file1
#
#   # Do NOT
#   t=$(make_temp_dir)
#   # or
#   (
#     make_temp_dir
#     touch "${temp_dir}"/file2
#   ) # The temp_dir is deleted here
#   cat "${temp_dir}"/file2 # Fails
#   # As these will create and delete the temp dir within the subcommand
#
# NOTES
#   This uses the EXIT, INT, and TERM traps. If you use these too, they will be
#   lost. Override make_temp_dir_cleanup_exit, make_temp_dir_cleanup_int, or
#   make_temp_dir_cleanup_term to customize with your trap and still call
#   __make_temp_dir_cleanup.

#***
make_temp_dir()
{
  temp_dir="$(mktemp -d ${@+"${@}"})"
  _VSI_TEMP_DIRS+=("${temp_dir}")
  trap make_temp_dir_cleanup_exit EXIT
  trap make_temp_dir_cleanup_int INT
  trap make_temp_dir_cleanup_term TERM
}

#****f* dir_tools.bsh/make_temp_dir_cleanup_*
# NAME
#   make_temp_dir_cleanup_exit - cleanup routine on atexit
#   make_temp_dir_cleanup_int - cleanup routine on interrupt
#   make_temp_dir_cleanup_term - cleanup routine on terminate
# DESCRIPTION
#   Since make_temp_dir sets the trap every time make_temp_dir is called, these
#   functions provide a way to override the behavior of the trap, allowing you
#   to write your own make_temp_dir_cleanup_* functions. Just don't forget to
#   add __make_temp_dir_cleanup to your function, or else it will not cleanup
#   properly.
#
#   This is only needed for exit, int, and term. No other traps are set up.

#***
make_temp_dir_cleanup_exit()
{
  __make_temp_dir_cleanup
}
make_temp_dir_cleanup_int()
{
  __make_temp_dir_cleanup
}
make_temp_dir_cleanup_term()
{
  __make_temp_dir_cleanup
}

#****if* make_temp_dir/__make_temp_dir_cleanup
# USED BY
#   make_temp_dir, make_temp_dir_cleanup_*
#***
__make_temp_dir_cleanup()
{
  local temp_dir
  for temp_dir in ${_VSI_TEMP_DIRS+"${_VSI_TEMP_DIRS[@]}"}; do
    if [ -d "${temp_dir}" ]; then
      rm -rf "${temp_dir}"
    fi
  done
}

#****f* dir_tools.bsh/basenames
# NAME
#   basenames - Multiple level version of basename
# INPUTS
#   1 - Number of levels to keep
#   2 - path
# OUTPUT
#   stdout - base name up to $1 levels deep

#***
basenames()
{
  local d="${2}"
  for ((x=0; x<"${1}"; x++)); do
    d="${d%/*}"
  done
  echo "${2#"${d}"/}"
}
