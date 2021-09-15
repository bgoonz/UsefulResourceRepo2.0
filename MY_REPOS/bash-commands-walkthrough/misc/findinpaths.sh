#!/usr/bin/env bash

#****F* vsi/findinpaths
# NAME
#   findinpaths - Bash CLI version of findinpaths
# INPUTS
#   $1 - filename to search for
#   [$2...] - Array of paths
# OUTPUT
#   stdout - Full path of files found in all the paths
# SEE ALSO
#   findinpaths/findinpaths
#***

#****f* findinpaths/findinpaths
# NAME
#   findinpaths - Searches an array of paths, looking for a file
# INPUTS
#   $1 - filename to search for
#   [$2...] - Array of paths
# OUTPUT
#   stdout - Full path of files found in all the paths
# EXAMPLE
#   findinpaths ls /bin /usr/bin /usr/local/bin
#   # /bin/ls

#***
function findinpaths()
{
  base_name="$1"
  shift 1
  for d in "${@}"; do
    if [ -e "${d}/${base_name}" ]; then
      echo "${d}/${base_name}"
    fi
  done
}

if [[ ${BASH_SOURCE[0]} == ${0} ]] || [[ $(basename ${BASH_SOURCE[0]}) == ${0} ]]; then
  findinpaths "${@}"
  exit $?
fi
