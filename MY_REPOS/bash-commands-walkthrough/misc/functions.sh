#!/usr/bin/env false
# Source this script to access just functionality

: ${VSI_COMMON_DIR="$(dirname "${BASH_SOURCE[0]}")/.."}

# A few functions are defines in a common. Sourced here for DRY
source "${VSI_COMMON_DIR}/linux/just_common.bsh"
# Preload some files
source "${VSI_COMMON_DIR}/linux/isin"
source "${VSI_COMMON_DIR}/linux/set_flags.bsh"
source "${VSI_COMMON_DIR}/linux/elements.bsh"

#****d* just/DRYRUN
# NAME
#   DRYRUN - Print out some commands instead of executing
# SYNOPSIS
#   ${DRYRUN} <command>
# PURPOSE
#   Display key commands as they would be executed. This is conveniently set by
#   using the -n/--dryrun argument. Default: <Null>

# EXAMPLE
#   function Docker()
#   {
#     ${DRYRUN} docker "${@}"
#   }
# NOTES
#   DRYRUN doesn't just echo out the command, it uses the print_command function
#   to print out a command that can be copied and pasted in. This handles spaces
#   correctly unlike echo.
# SEE ALSO
#   just/print_command
#***
: ${DRYRUN=}
#****d* just/JUST_SEPARATOR
# NAME
#   JUST_SEPARATOR - Separator used for get_args
# PURPOSE
#   When passing an unknown number of arguments, the JUST_SEPARATOR can be used
#   to begin and end a group of arguments . Default: --

# SEE ALSO
#   just/get_args, just/get_additional_args
#***
: ${JUST_SEPARATOR='--'}
#****d* just/JUST_SAFE_LOAD_DELIMITER
# NAME
#   JUST_SAFE_LOAD_DELIMITER - Separator used for safe_load
# PURPOSE
#   safe_load reads a key:value file, and this variable is used to separate the
#   keys and values. Default: =

# SEE ALSO
#   just/safe_load
#***
: ${JUST_SAFE_LOAD_DELIMITER='='}
#****id* just/JUST_HELP_SEPARATOR
# NAME
#   JUST_HELP_SEPARATOR - Separator used internally for processing help comments
# PURPOSE
#   When processing the help comments, the JUST_HELP_SEPARATOR is used to
#   separate the strings. As long as no help string contains this, everything
#   will work out. Default: @#@

# BUGS
#   * If a comment contains " ${JUST_HELP_SEPARATOR} ", then it will be truncated
#     at the first instance
#   * If JUST_HELP_SEPARATOR is not regex safe, it will not work either.
# SEE ALSO
#   just/safe_load
#***
: ${JUST_HELP_SEPARATOR='@#@'}

#****h* just/just_plugins
# NAME
#   just_plugins - Plugin system for just
# USAGE
#   Certain just targets can be used for many different projects, and rather
#   then repeating this code, just_plugins give a way to expose the common code
#   of these targets to many different projects.
#
#   To add a plugins to your project, simply add the plugin filenames to your
#   .justplugins file.
# DESCRIPTION
#   When writing a new plugin, you need to follow a few rules:
#
#   1. A case statement in a defaultify function should be written, but with a
#      unique name that should not be likely to be used anywhere else. All
#      plugin functions will have to exist in the same namespace.
#   2. Adds the case function names to the array JUST_DEFAULTIFY_FUNCTIONS to
#      allow commonly used functionality to be added to the targets for just
#   3. Add the plugin filename to the array JUST_HELP_FILES
#   4. Must return non-zero if the argument is not matched, and return 0 on
#      target match
# EXAMPLE
#   Source code of a just_example_functions.bsh, which looks something like:
#
# # JUST_DEFAULTIFY_FUNCTIONS+=(just_example_defaultify)
# # JUST_HELP_FILES+=("${BASH_SOURCE[0]}")
# # function just_example_defaultify()
# # {
# #   arg=$1
# #   shift 1
# #   case $arg in
# #     foo|bar) #Foobar test
# #       echo "Foo or bar: $1"
# #       extra_args+=1
# #       ;;
# #     *)
# #       return 1
# #       ;;
# #   esac
# #   return 0
# # }
#***

#****F* just_plugins/.justplugins
# NAME
#   .justplugins - Plugin file
# DESCRIPTION
#   The filename defaults to .justplugins, next to your Justfile, but can be
#   overridden by exporting the environment variable JUST_PLUGIN_FILE.
#
#   Lists the various plugin files. Blank lines and # comment lines are allowed
#***

#****d* just_plugins/JUST_PLUGIN_FILE
# NAME
#   JUST_PLUGIN_FILE - name of the just plugin file
# DESCRIPTION
#   Defaults to .justplugin in the same directory as the Justfile. Can be
#   override to another filename/path by exporting to this variable

#***

#****d* just_plugins/JUST_DEFAULTIFY_FUNCTIONS
# NAME
#   JUST_DEFAULTIFY_FUNCTIONS - List of defaultify functions
# DESCRIPTION
#   The values of this array are executed as a command. Each plugin should have
#   a unique name for the function, and is responsible for adding that function
#   name to JUST_DEFAULTIFY_FUNCTIONS

#***
if [ "${JUST_DEFAULTIFY_FUNCTIONS+set}" != "set" ]; then
  JUST_DEFAULTIFY_FUNCTIONS=()
fi

#****d* just_plugins/JUST_HELP_FILES
# NAME
#   JUST_HELP_FILES - Array of just plugin files used in just
# DESCRIPTION
#   This should include just_functions.bsh, which ever Justfile is used, and
#   any plugins. The plugin is responsible for adding itself to this array.
# USAGE
#   Every project should have a setup script, typically called setup.env. This
#   script filename is stored in JUST_SETUP_SCRIPT and is the location where
#   JUST_HELP_FILES should be set
# SEE ALSO
#   just/JUST_SETUP_SCRIPT

#***
if [ "${JUST_HELP_FILES+set}" != "set" ]; then
  JUST_HELP_FILES=("${BASH_SOURCE[0]}")
fi

#****d* just/JUST_PROJECT_PREFIX
# NAME
#   JUST_PROJECT_PREFIX - Variable prefix for project
# PURPOSE
#   Some just functions will need to know what all the project variables are
#   called (using compgen). This should be defined in your environment script,
#   and does not need to be overridable

#***

#****f* just/source_environment_files
# NAME
#   source_environment_files - Convenience function for sourcing environments
# DESCRIPTION
#   The just system works be sourcing environment files
#   1. First ${project_dir}/local.env. This file should never be added to version
#      control. It should contain customizations for that particular install
#   2. The project file. This file should ideally contain all the default values
#      necessary to run without any local.env settings.
#   3. Last, ${project_dir}/local_post.env. This file should never be added to
#      version control. It is rarely used, except in situations where the value
#      of a variable is based off of another variable. This is why it is loaded
#      last.
#   4. Any plugins that are identified, are also sourced
# INPUTS
#   $1 - The project environment filename
# PARAMETERS
#   [JUST_LOCAL_SETTINGS] - Path of local settings file. Default:
#                           ${same_dir}/local.env
#   [JUST_LOCAL_SETTINGS_POST] - Path of post local settings file, default is
#                                ${same_dir}/local_post.env
# USAGE
#   JUST_LOCAL_SETTINGS and JUST_LOCAL_SETTINGS_POST must not be set in the
#   project environment file or in the local.env file, as it will not have the
#   desired effect. Instead, they should either be manually set in the
#   environment or set in the setup or wrap script (see just/Just_wrap)
# NOTES
#   Certain exceptions make sense for not storing values in the project file,
#   such as credentials, encryption keys, etc... information that should not be
#   hardcoded.
#
#   Only require settings in local.env when it cannot be avoided. For example,
#   sometimes its better to add default behavior of create keys if possible.
#   Such as using openssl to create ssl certs in a default location (that is
#   ignored by version control)
# SEE ALSO
#   just/_just_get_plugins just/Just_wrap

#***
function source_environment_files()
{
  local project_dir="$(dirname $1)"
  local x

  set_flag a
  for x in "${JUST_LOCAL_SETTINGS:-${project_dir}/local.env}" \
           "$1" \
           "${JUST_LOCAL_SETTINGS_POST:-${project_dir}/local_post.env}"; do
    if [ -f "${x}" ]; then
      . "${x}"
    fi
  done
  reset_flag a

  # There is a feature of the set -a feature in bash that will actually export
  # functions. While we don't need this, it is normally harmless. However in the
  # macOS case sh somehow get invoked by python on start, and thus complains if
  # a function name with a hyphen in it has been exported. Again, this is
  # harmless but annoying
  for x in $(declare -Fx | awk '{print $3}'); do
    export -fn "${x}"
  done

  # Load plugins
  _just_get_plugins "${project_dir}"
  for just_plugin in ${JUST_PLUGINS+"${JUST_PLUGINS[@]}"}; do
    source "${just_plugin}"
  done
}

#****f* just/set_temp_array
# NAME
#   set_temp_array - set array to default values if not already set
# DESCRIPTION
#   In bash, when setting a variable to a default value if it has not already
#   been set, it is typical to follow the pattern:
#
#     : ${MY_VAR=default}
#
#   However, this syntax does not work for an array. Bash 3.2 does not give an
#   equivalent 1 line version of this. To cover this scenario, set_temp_array is
#   used to set a default value if an array is not already set. Using
#   set_temp_array, an array can be set to a default value if not already set in
#   two lines
#
#   It works by checking if an array is set. If it is set, it copies all the
#   values to the array JUST_TEMP_ARRAY. If it is not set, it will copy the rest
#   of the arguments (the default values) to JUST_TEMP_ARRAY. When using this
#   function with set -u turned on, it is best to reference JUST_TEMP_ARRAY by
#   (${JUST_TEMP_ARRAY+"${JUST_TEMP_ARRAY[@]}"}) in case the array is empty, as
#   this triggers Bash's unbound variable test.
# EXAMPLE
#   set_temp_array MY_ARRAY default1 default\ 2 "default 3"
#   MY_ARRAY=(${JUST_TEMP_ARRAY+"${JUST_TEMP_ARRAY[@]}"})
#
#   # And when done, clean up
#   unset JUST_TEMP_ARRAY
# INPUTS
#   $1 - Name of array to check if it is already set
#   $2... - Default values of the array
# OUTPUT
#   JUST_TEMP_ARRAY - Destination for all the values set

#***
function set_temp_array()
{
  local default="$1"
  shift
  if declare -p $default &> /dev/null; then
    default="${default}[@]"
    JUST_TEMP_ARRAY=(${!default+"${!default}"})
  else
    JUST_TEMP_ARRAY=(${@+"${@}"})
  fi
}


#****f* just/pretty_print_help
# NAME
#   pretty_print_help - Restructures text to indented properly on wrap around
# DESCRIPTION
#   Each line consists of a command that will be printed on the left, and the
#   indented description on the right. The description is wrapped around based
#   on tput cols.
# INPUTS
#   stdin - Each line is an entry in the pretty printout, separated by
#           " ${JUST_HELP_SEPARATOR} " (without the quotes, but with the spaces)
# PARAMETERS
#   indent - How much the right side should be indented to make a uniform output
# EXAMPLE
#   --dryrun             Dryrun flag. Used to echo instead of run
#                        commands
# SEE ALSO
#   JUST_HELP_SEPARATOR

#***
function pretty_print_help()
{
  # This patch is mainly for wine, where tput doesn't work for some reason
  local cols=$(tput cols)
  if [ "${cols}" = "" ]; then
    cols=80
  fi

  awk -F " ${JUST_HELP_SEPARATOR} " '
   function min(a, b)
   {
     if (a<b)
       return a
     return b
   }
   {
    indent='${indent}'
    printf "%-'$(($indent-1))'s", $1
    n = split($2,x," ")
    len = '${indent}'
    width = '"${cols}"'
    for(i=1;i<=n;i++)
    {
     if(len+length(x[i])>width)
     {
      long=x[i]
      for(j=1;j<length(long);j+=width-indent)
      {
       # If this is not the beginning of the right column, newline it. This
       # condition prevents blank lines being inserted for these long words
       if(len != indent)
       {
        printf("\n%'$((indent-1))'s", "")
        len = indent
       }
       # Print what is available
       printf(" "substr(long, j, width-len))
       # Calculate the amount added
       len += min(width-len+1, length(long)-j+1+1)
       # If len exceeds width, then make a new line
       if (len>=width)
       {
        printf("\n%'$((indent-1))'s", "")
        len = indent
       }
      }
     }
     else
     {
      printf " %s",x[i]
      len += 1+length(x[i])
     }
    }
    printf "\n"
  }' # c/o https://unix.stackexchange.com/a/280205/123413
}


#****f* just/print_help
# NAME
#   print_help - Prints the auto generated help info from Justfile

#***
function print_help()
{
  local cols=$(tput cols)
  local indent=4
  local parsed_help parsed_help_flags parsed_help_subcommands_commented
  local parsed_help_a
  local help_line

  echo "List of possible $(basename "$0") commands:"
  echo "-----------------------------------"

  # Get help data => parsed_help_a
  _just_parse_helps ${JUST_HELP_FILES+"${JUST_HELP_FILES[@]}"}

  # Determine the ideal indent width for commands
  while IFS='' read -r help_line || [[ -n "${help_line}" ]]; do
    if (( ${#help_line} > indent-2 )); then
      indent=$((${#help_line}+2))
    fi
  done < <(IFS=$'\n'; echo "${parsed_help_a[*]}" | \
                      sed -E 's| '"${JUST_HELP_SEPARATOR}"' .*||;
                              /^[?*a-zA-Z0-9\-]+_[?*a-zA-Z0-9_\-]+/d') #;
                              # Remove sub commands for this

  local OLD_IFS="${IFS}"
  IFS=$'\n'
  # Print non-flag first and non-subcommand_subtargets
  ( grep -E -v '^-|^[?*a-zA-Z0-9\-]+_[?*a-zA-Z0-9_\-]+' |
    sort |
    pretty_print_help ) <<< "${parsed_help_a[*]}"

  # Print flags second
  ( grep -E '^-[?*a-zA-Z0-9\|\-]+( |$)' | sort | pretty_print_help ) <<< "${parsed_help_a[*]}"
  IFS="${OLD_IFS}"

  echo
  echo "Subcommands"
  echo "-----------"

  local just_subcommands=()
  local just_subtargets
  local subcommand
  local subtarget
  local parsed_help_subcommands=""

  indent=5

  # Determine the ideal indent width for commands
  while IFS='' read -r help_line || [[ -n "${help_line}" ]]; do
    if (( ${#help_line} > indent-2 )); then
      indent=$((${#help_line}+2))
    fi
  done < <(IFS=$'\n'; echo "${parsed_help_a[*]}" | \
                      sed -E 's| '"${JUST_HELP_SEPARATOR}"' .*||;
                              /^[?*a-zA-Z0-9\-]+_[?*a-zA-Z0-9_\-]+/!d;
                           '$'s:\|:\\\n:g')

  IFS=$'\n'
  just_subcommands=($(_just_subcommands_from_array <<< "${parsed_help_a[*]}"))
  IFS="${OLD_IFS}"

  # Sort the subcommands
  if [ "${just_subcommands+set}" == "set" ]; then
    IFS=$'\n'
    just_subcommands=($(sort -u <<<"${just_subcommands[*]}"))
    IFS="${OLD_IFS}"
  fi

  for subcommand in ${just_subcommands+"${just_subcommands[@]}"}; do
    parsed_help_subcommands+="${subcommand}"$'\n'

    # Get list of subtargets
    just_subtargets=()
    # Get all the subtargets already parsed by the helpfile
    _just_subtargets_from_array "${subcommand}" ${parsed_help_a+"${parsed_help_a[@]}"}

    # Sort the subtargets
    if [ "${just_subtargets+set}" == "set" ]; then
      # Prevent expansion and allow for spaces, etc...
      local just_subtargets2=()
      while IFS= read -r -d '' help_line || [ -n "${help_line}" ]; do
        just_subtargets2+=("${help_line}")
      done < <(MIFS='\\x00' join_a_out "${just_subtargets[@]}" | sort -u -z)
      just_subtargets=("${just_subtargets2[@]}")
    fi

    for subtarget in ${just_subtargets+"${just_subtargets[@]}"}; do

      for help_line in "${parsed_help_a[@]}"; do
        if [[ ${help_line} =~ ^${subcommand}_${subtarget}.* ]]; then
          parsed_help_subcommands+="    ${help_line#*_}"$'\n'
          break
        fi
        help_line=
      done
      if [ "${help_line}" == "" ]; then
        parsed_help_subcommands+="    ${subtarget}"$'\n'
      fi
    done
  done

  pretty_print_help <<< "${parsed_help_subcommands%$'\n'}"
}


#****f* just/is_powershell
# NAME
#   is_powershell - Check if the current command windows is powershell
# SYNOPSIS
#   Using a Window title trick, determine if the shell is running in powershell,
#   or not, for example command prompt windows, cygwin or git bash

#***
function is_powershell()
{
  if [ "${VSI_COMMON_IS_POWERSHELL-0}" == "1" ]; then
    return 0
  fi

  local unique_title="$(basename "$(mktemp -u -t XXXXXXXXXXXXXXXX)")"

  echo -en "\033]0;${unique_title}\a"
  if [ $(tasklist //fi "windowtitle eq ${unique_title}" | tail -n 1 | awk '{print $1}') == "powershell.exe" ]; then
    return 0
  else
    return 1
  fi
}

#****f* just/setup_powershell
# NAME
#   setup_powershell - Pops up a new powershell window and runs just
# DESCRIPTION
#   Cygwin bash is pretty bad. The new git bash (MINGW64) does not have a tty.
#   This is a problem for docker. Powershell does have a tty, buy can not run
#   bash scrips natively. The solution is to run bash in powershell (which is
#   not as straight forward as it sounds). This function is designed to
#   re-execute in a new powershell on Windows if not in powershell
# USAGE
#   setup_powershell ${@+"${@}"}

#***
function setup_powershell()
{
  if [ "${OS-notwindows}" == "Windows_NT" ] && ! is_powershell; then
    if [ "${#@}" == "0" ]; then
      setup_powershell _null
    else
      exec env VSI_COMMON_IS_POWERSHELL=1 start powershell "cmd /c color 07; bash \"$0\" ${@}; bash --rcfile \"${VSI_COMMON_DIR}/.winbashrc\""
    fi
  fi
}

#****f* just/print_command
# NAME
#   print_command - Echo out a command
# SYNOPSIS
#   Accurately echoes out a properly escaped representation of the arguments.

#***
function print_command()
{
  while [ "$#" -gt 0 ]; do
    printf "'${1//\'/\'\"\'\"\'}'"
    shift 1
    [ "$#" -gt 0 ] && printf " "
  done
  printf "\n"

  # if command -v python &> /dev/null; then
  #   python -c "import pipes as p; import sys as s; print(' '.join([p.quote(x) for x in s.argv[1:]]))" "${@}"
  # else
  #   # FAR from perfect... Need to escape " and not always print ''
  #   while [ "$#" -gt 0 ]; do
  #     printf \'"$1"\'
  #     shift 1
  #     [ "$#" -gt 0 ] && printf " "
  #   done
  #   printf "\n"
  # fi
}

#****if* just/defaultify
# NAME
#   defaultify - Default commands for just
# DESCRIPTION
#   Handles a few default commands for just:
#   - Calls plugins specified in JUST_DEFAULTIFY_FUNCTIONS
#   - --dryrun|-n - Sets DRYRUN to print_command. This way ${DRYRUN} can be put
#                   in front of any command and be printed instead of executed
#                   when in dryrun mode
#   - --separator - Used to override the JUST_SEPARATOR (default --) to anything
#                   else. This only affect commands that use get_args
#   - -h|--help|help - Prints out help using print_help
#   - _null - A target that does nothing. This is seldom needed.
#   - * - For all other commands not captured yet, called unknownify (which can
#         be overridden for other behavior) to print an error message.

#***
function defaultify()
{
  local arg
  # Loop through the plugins, and call them
  for arg in ${JUST_DEFAULTIFY_FUNCTIONS+"${JUST_DEFAULTIFY_FUNCTIONS[@]}"}; do
    if ${arg} ${@+"${@}"};  then
      return
    fi
  done

  arg=$1
  shift 1
  case $arg in
    --dryrun|-n) #Dryrun flag. Used to echo instead of run commands
      export DRYRUN=print_command
      ;;
    --separator) # Commands that can take an undefined number of additional \
                 # arguments use the -- separator to start and end the extra \
                 # arguments. If -- is needed for other things, specify a custom \
                 # separator
      JUST_SEPARATOR=$1
      extra_args+=1
      ;;
    -h|--help|help) #Print help
      print_help
      ;;
    _null)
      ;;
    *)
      unknownify $arg ${@+"${@}"}
      ;;
  esac
}

#****f* just/unknownify
# NAME
#   unknownify - The function executed when an unknown target is specified
# SYNOPSIS
#   The default behavior is to print an error and exit 1. However, a custom
#   unknownify can be declared in Justfile to override this behavior

#***
function unknownify()
{
  echo "I don't understand: $1" >&2
  exit 1
}

#****d* just/extra_args
# NAME
#   extra_args - The number of additional arguments consumed in a caseify target
# DESCRIPTION
#   When writing a caseify target, by default one argument is consumed. This is
#   enough for any simple target. However some targets need additional arguments.
#
#   There are really three situation when extra arguments are needed
#   - 1. A fixed number of arguments. For example, if 3 arguments are needed,
#        just use $1, $2, $3, and set extra_args+=3
#   - 2. The rest of the arguments are going to be consumed. In this case, use
#        all the arguments (typically by $@) and set extra_args+=$#
#   - 3. An unknown number of arguments need to be used, and maybe multiple
#        groups of unknown arguments. This is the case where JUST_SEPARATOR is
#        used. (See EXAMPLE)
# EXAMPLE
#   # Lets say we call:
#
#     just test -- 11 22 33 -- aa bb cc dd -- _null
#
#   # And I have a target test that takes two sets of arguments of unknown length
#
#   test)
#     get_args ${@+"${@}"}
#     first=${args+"${args[@]}"}
#     get_additional_args ${@+"${@}"}
#     second=${args+"${args[@]}"}
#     ;;
#
#   In this case, there is no need to add extra_args, get_args does this already
#
# NOTES
#   extra_args should be added to, never set.
# BUGS
#   It is possible to call one just target from another by invoking justify.
#   However, due to the nature of extra_args, justify needs to be called in a
#   subshell:
#
#   (justify other-target arg1)
#
#   If, for some reason, this needs to be called in the current shell,
#   extra_args will have to be manually copied before the justify call, and
#   refreshed afterwards.

#***
declare -i extra_args

#****if* just/justify
# NAME
#   justify - The main loop of just
# DESCRIPTION
#   Handles determining what subcommands are, and calling commands and
#   subcommands.
#
#   When one target is called from another target, justify should be used to do
#   the calling in a subshell, for example:
#
#     (justify target2)
# INPUTS
#   $1... - list of targets

#***
function justify()
{ # caseify needs to be written by the main script, and set the number
  # of extra arguments it consumes to extra_args

  # Cache list of subcommands
  local just_subcommands=()
  local just_subtargets

  local parsed_help_a
  # Get help data => parsed_help_a
  _just_parse_helps ${JUST_HELP_FILES+"${JUST_HELP_FILES[@]}"}

  local OLD_IFS="${IFS}"
  IFS=$'\n'
  just_subcommands=($(_just_subcommands_from_array <<< "${parsed_help_a[*]}"))
  IFS="${OLD_IFS}"

  while (( $# > 0 )); do
    extra_args=0

    # If it's a subcommand
    if isin "${1}" ${just_subcommands+"${just_subcommands[@]}"}; then
      just_subtargets=()
      # Get all the subtargets already parsed by the helpfile
      _just_subtargets_from_array "${1}" ${parsed_help_a+"${parsed_help_a[@]}"}

      # If it's a valid target, call them, else use default caseify
      if (( $# >= 2 )) && isin "${2}" ${just_subtargets+"${just_subtargets[@]}"}; then
        local target="${1}_"
        shift 1

        # Execute all subtargets
        while (( $# > 0 )) && isin "${1}" ${just_subtargets+"${just_subtargets[@]}"}; do
          extra_args=0
          caseify "${target}${@}"
          shift $extra_args
          shift 1
        done
        continue
      else
        caseify "${@}"
      fi
    else
      caseify "${@}"
    fi
    shift $extra_args
    shift 1
  done
}

#****f* just/callify
# NAME
#   callify - Helper for consuming arguments and calling a function with them
# DESCRIPTION
#   Takes: cmd -- $1 $2 $3 ... $n -- $m $m+1 ...
#   and calls: cmd $1 $2 $3 ... $n and consumes n+2 args
#   Trailing -- is optional
# EXAMPLE
#   target)
#     callify python ${@+"${@}"}
#     ;;
#
#   just target -- -c "print 1+3"
# NOTES
#   Not sure this is worth keeping

#***
function callify()
{
  local cmd
  cmd=$1
  shift 1
  get_args ${@+"${@}"}
  $cmd ${args+"${args[@]}"}
}

#****f* just/get_args
# NAME
#   get_args - Get and consume an unknown collection of arguments
# DESCRIPTION
#   Gets an unknown number of arguments. The ending of the collection of
#   arguments is annotated with the JUST_SEPARATOR. The trailing annotation
#   is optional as long as there are no more just commands following
# INPUTS
#   $@ - All the unconsumed arguments
# OUTPUT
#   args - Array of unknown number of arguments consumed
#   get_args_args_used - Number of arguments used, including separator
# BUGS
#   This will conveniently update extra_args inside of the caseify function.
#   However, if you are calling from another function (i.e., not writing a
#   caseify section), this will produce incorrect behavior; therefore,
#   extra_args should be made a local variable in the calling function
# NOTES
#   get_args_args_used is a global variable. Unsetting it can cause unexpected
#   behavior

#***
declare -i get_args_args_used
function get_args()
{
  local next_break

  # Since this is not used often, only source in this function
  if ! decalre -f findin &> /dev/null; then
    source "${VSI_COMMON_DIR-"$(dirname "${BASH_SOURCE[0]}")/.."}/linux/findin"
  fi

  args=()
  : ${extra_args=0}
  get_args_args_used=${pre_args_used-0}
  if (( $# >= 1 )); then
      # Look to see if there is another --
      next_break=$(findin "${JUST_SEPARATOR}" ${@+"${@}"})
      if [ "${next_break}" == -1 ]; then
        args=("${@}")
        get_args_args_used+=$#
        extra_args+=$#
      else
        # When you slice @, the default ${@:1} (which is the same as ${@})
        # becomes ${@:0:x}, so you have to specify ${@:1:x}. @ is "special".
        # That's why I can't say ${@::$next_break}
        args=("${@:1:${next_break}}")
        # Plus one since the index count starts from 0, not 1
        get_args_args_used+=${next_break}+1
        extra_args+=${next_break}+1
      fi
  fi
}

#****f* just/get_additional_args
# NAME
#   get_additional_args - Get and consume additional collections of arguments
# DESCRIPTION
#   get_args can only be called once, but get_additional_args can be called
#   continuously after the first call of get_args
# EXAMPLE
#   Must be called after get_args with all arguments passed in. For example:
#
#   target)
#     get_args ${@+"${@}"}
#     args1=(${args+"${args[@]}"})
#     get_additional_args ${@+"${@}"}
#     args2=(${args+"${args[@]}"})
#     get_additional_args ${@+"${@}"}
#     args3=(${args+"${args[@]}"})
#     ;;
#
#  just target 11 22 33 -- aa bb cc -- '!!' '@@' '##'
#
#  #args1=(11 22 33)
#  #args2=(aa bb cc)
#  #args3=(!! @@ ##)

#***
function get_additional_args()
{
  local pre_args_used

  if [ "${get_args_args_used}" -gt "0" ]; then
    # Copy this var so get_args knows it's not being called for the first time
    pre_args_used=${get_args_args_used}
    # Skip the args already used last time get_args/get_additional_args was called
    shift ${get_args_args_used}
    get_args "${@}"
  fi
}

#****f* just/safe_load
# NAME
#   safe_load - A non-eval method for loading and exporting a text file of keys/values
# INPUTS
#   $1 - Filename of file to be loaded.
# PARAMETERS
#   [JUST_SAFE_LOAD_DELIMITER] - By default, = is use between key and value.
#                                If = is needed, then this environment variable
#                                can override the delimiter
# OUTPUT
#   All keys are set as environment variables, and exported
# EXAMPLE
#   key1=value_one
#   key2=this is another value
# NOTES
#   Does not support comments, blank lines, or anything else other than key=value
# BUGS
#   As with anything in a language like Bash, it's not guaranteed that an
#   arbitrary command won't be executed with this, but as far as is known, there
#   are no known issues with this function.
#***
function safe_load() # Loads a very simple safe config file, and sets environment variables accordingly
{ # File should contain lines: key=value
  local safe_load_tmp_key=foobar
  local safe_load_tmp_value
  local line
  while IFS='' read -r line || [[ -n "${line}" ]]; do
    IFS="${JUST_SAFE_LOAD_DELIMITER}" read -r safe_load_tmp_key safe_load_tmp_value <<< "$line"
    IFS="${JUST_SAFE_LOAD_DELIMITER}" read -r safe_load_tmp_key "$safe_load_tmp_key" <<< "$line"
    export "$safe_load_tmp_key"
  done < "$1"
}
