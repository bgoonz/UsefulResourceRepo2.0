#!/usr/bin/env false

#****f* file_tools.bsh/find_open_fd
# NAME
#   find_open_fd - Find the first open file descriptor
# INPUTS
#   [name] - Variable name to return available file descriptor. Default: fd
#            Variable's name should not be _fd or _fd_var
#   {START_FD} - The first fd to start checking. Default: 3
# OUTPUT
#   {name} - Value of next unused file descriptor
# USAGE
#   This is for backwards compatibility. In bash 4.1 or newer, this isn't
#   necessary, as:
#
#     exec {fd}<>${some_buffer}
#     echo "hi" >&${fd}
#     read -u${fd} some_var
#     exec {fd}>&-
#
#   is better.
# EXAMPLE
#   mkfifo /tmp/test
#   find_open_fd
#   eval "exec ${fd}<>"/tmp/test"
#   echo hi >&${fd}
#   read -u ${fd} -t 1 line
#   eval "exec ${fd}>&-"
# BUGS
#   Probably not thread safe
# SEE ALSO
#   open_fd, close_fd

#***
function find_open_fd()
{
  local _fd
  local _fd_var="${1-fd}"

  for ((_fd=${START_FD-3}; _fd<$(ulimit -n); _fd++)); do
    if ! : 2>/dev/null >&${_fd}; then
      # declare and set won't work here, its better than eval and doesn't export
      read "${_fd_var}" <<< "${_fd}"
      return 0
    fi
  done
  return 1
}

#****f* file_tools.bsh/open_fd
# NAME
#   open_fd - Find available file descriptor and open a file/pipe for you
# INPUTS
#   All options are optional
#   -p - Pipe mode (use mkfifo)
#   -f - File mode (use touch)
#   -n {name} - Name of buffer used
#   -s - Use the same fd for read and write
#   -r {#} - Use this specific fd for reading
#   -w {#} - Use this specific fd for writing
#   -R {name} - Name of variable to store read fd in. Default: fd_r
#   -W {name} - Name of variable to store write fd in. Default: fd_w
#               Variables names starting with _ should be avoided as they may
#               clash with variables used in this function
# OUTPUT
#   Read and write variables will contain the corresponding file descriptors
#   filename - Name of file/pipe that was opened.
# EXAMPLE
#   # Make a pipe
#   pipe="$(mktemp -u)"
#
#   # Open the pipe
#   open_fd -p -s -n -W fd "${pipe}"
#
#   # Write to the pipe - does not block as long as buffer not filled
#   echo "hi" >&${fd}
#
#   # Blocking read from pipe. Use timeout command to add a timeout
#   timeout 1 cat - <&${fd}
#
#   # Read from the pipe and save to a variable without a subshell
#   IFS='' read -u "${fd}" -t 0.1 -r my_variable
#
#   # Close and cleanup
#   close_fd "${fd}"
#   rm "${pipe}"
#
#   Do NOT
#     output=$(open_fd)
#   Because open_fd will be executed in a subshell, and thus the opened fd will
#   be useless. This is the design decision behind storing the file descriptor
#   in the fd variable.
# NOTES
#   Opening a pipe without the same fd for read and write doesn't work very
#   well. It hangs on most tested systems. Workarounds are unpredictable at
#   best. So just don't do that.
# SEE ALSO
#   file_tools.bsh/close_fd time_tools.bsh/timeout

#***
function open_fd()
{
  local OPTIND
  local OPTARG
  local _opt

  local _mode
  local _same
  local _read_fd _write_fd
  local _read_var _write_var

  _mode=auto
  _same=0

  while getopts "pfsn:r:w:R:W:" _opt; do
    case "${_opt}" in
      p)
        _mode=pipe
        ;;
      f)
        _mode=file
        ;;
      n)
        filename="${OPTARG}"
        ;;
      s)
        _same=1
        ;;
      r)
        _read_fd="${OPTARG}"
        ;;
      w)
        _write_fd="${OPTARG}"
        ;;
      R)
        _read_var="${OPTARG}"
        ;;
      W)
        _write_var="${OPTARG}"
        ;;
    esac
  done

  if [ "${_same}" = "1" ]; then
    # If both fds are set
    if [ -n "${_read_fd:+set}" ] && [ -n "${_write_fd:+set}" ]; then
      # Make sure they are the same
      if [ "${_read_fd}" != "${_write_fd}" ]; then
        echo "The -r and -w file descriptors were specified differently with -s" 1>&2
        return 1
      fi
    else
      # Covers the cases where only one is specified
      if [ -n "${_read_fd:+set}" ]; then
        _write_fd="${_read_fd}"
      elif [ -n "${_write_fd:+set}" ]; then
        _read_fd="${_write_fd}"
      fi
    fi

    # Covers the cases where only one is specified
    if [ -z "${_read_var:+set}" ] && [ -n "${_write_var:+set}" ]; then
      _read_var="${_write_var}"
    elif [ -z "${_write_var:+set}" ] && [ -n "${_read_var:+set}" ]; then
      _write_var="${_read_var}"
    fi
  fi

  # Create a random temp name if none was specified
  if [ -z "${filename+set}" ]; then
    filename="$(mktemp -u)"
  fi

  # Evaluate what auto mode to use
  if [ "_mode" = "auto" ]; then
    if [ "${OS-}" = "Windows_NT" ]; then
      _mode=file
    else
      _mode=pipe
    fi
  fi

  # Create file/pipe if doesn't exist
  if [ "${_mode}" = "pipe" ]; then
    [ -p "${filename}" ] || mkfifo "${filename}"
  else
    [ -f "${filename}" ] || touch "${filename}"
  fi

  if [ -z "${_read_fd:+set}" ]; then
    find_open_fd _read_fd
  fi

  # Open the file
  if [ "${_same}" = "1" ]; then
    _write_fd="${_read_fd}"
    eval "exec ${_read_fd}<>'${filename}'"
  else
    if [ "${_mode}" = "pipe" ]; then
      echo "WARNING: Attempting to open a pipe with two different fds." 1>&2
      echo "This usually results in a hang, you should avoid this." 1>&2
    fi
    if [ -z "${_write_fd:+set}" ]; then
      START_FD=$((_read_fd+1)) find_open_fd _write_fd
    fi
    eval "exec ${_read_fd}<'${filename}' ${_write_fd}>'${filename}'"
  fi

  # Return values
  read "${_read_var:-fd_r}" <<< "${_read_fd}"
  read "${_write_var:-fd_w}" <<< "${_write_fd}"
}

#****f* file_tools.bsh/close_fd
# NAME
#   close_fd - Closes open bash fds
# INPUTS
#   1 - fd number
#   [2] - fd number
# USAGE
#   Uses eval for you, so you don't have to feel uncomfortable eval'ing

#***
function close_fd()
{
  eval "exec ${1}>&-"
  if [ $# -gt 1 ]; then
    eval "exec ${2}>&-"
  fi
}
