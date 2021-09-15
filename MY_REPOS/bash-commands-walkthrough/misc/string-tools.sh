#!/usr/bin/env false

#****f* string_tools.bsh/ltrim
# NAME
#   ltrim - Left trim a string
# INPUTS
#   $1 - String to trim
#   [$2] - Characters to trim. Default [:space:].
# OUTPUT
#   stdout - The trimmed string
# SEE ALSO
#   string_tools.bsh/trim

#***
function ltrim()
{
  echo "${1#"${1%%[!${2-[:space:]}]*}"}"
}

#****f* string_tools.bsh/rtrim
# NAME
#   rtrim - Right trim a string
# INPUTS
#   $1 - String to trim
#   [$2] - Characters to trim. Default [:space:].
# OUTPUT
#   stdout - The trimmed string
# SEE ALSO
#   string_tools.bsh/trim

#***
function rtrim()
{
  echo "${1%"${1##*[!${2-[:space:]}]}"}"
}

#****f* string_tools.bsh/trim
# NAME
#   trim - Trim a string
# INPUTS
#   $1 - String to trim
#   [$2] - Characters to trim. Default [:space:]. Can be an other character or
#          other classes, such as: alnum alpha ascii blank cntrl digit graph
#          lower print punct space upper word xdigit. For multiple
#          characters/classes, use standard pattern matching syntax, minus the []
# OUTPUT
#   stdout - The trimmed string
# EXAMPLE
#   trim ' abcAcba ' # Trim the spaces
#   Result: 'abcAbca'
#
#   trim 'abcAcba' a # Trims the letter a off
#   Result: 'bcAcb'
#
#   trim 'abcAcba' [:lower:] # Trims lowercase letters
#   Result: 'A'
#
#   trim 'abcdAdcba' a-c # Trims range a-c
#   Result: 'dAd'
#
#   trim 'aebcAcbea' aeiou # Trims vowels
#   Result: 'bcAcb'
#
#   See Bash man on "Pattern Matching" for more possibilities. $2 is essentially
#   placed inside a set of []
# SEE ALSO
#   string_tools.bsh/ltrim, string_tools.bsh/rtrim

#***
function trim()
{
  local x
  x="${1#"${1%%[!${2-[:space:]}]*}"}"
  echo "${x%"${x##*[!${2-[:space:]}]}"}"
}
