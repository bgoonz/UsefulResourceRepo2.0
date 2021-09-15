#!/usr/bin/env bash

#****F* vsi/findin
# NAME
#   findin - Bash CLI version of findin
# INPUTS
#   $1 - Value to search for
#   [$2...] - Values of array to search over
# OUTPUT
#   stdout - -1 for not found, else the index of the first match
# SEE ALSO
#   findin/findin
#***

#****f* findin/findin
# NAME
#   findin - Finds the index of the first match in an array
# INPUTS
#   $1 - Value to search for
#   [$2...] - Values of array to search over
# OUTPUT
#   stdout - -1 for not found, else the index of the first match
# EXAMPLE
#   findin 33 11 22 33 44
#   # 2
#   findin 0 2 2 2
#   # -1

#***
function findin()
{
  local x
  local val=$1
  shift 1
  local args=(${@+"${@}"})
  for x in "${!args[@]}"; do
    if [ "${args[$x]}" == "${val}" ]; then
      echo "$x"
      return
    fi
  done
  echo -1
}

if [[ ${BASH_SOURCE[0]} == ${0} ]] || [[ $(basename ${BASH_SOURCE[0]}) == ${0} ]]; then
  findin "${@}"
  exit $?
fi
