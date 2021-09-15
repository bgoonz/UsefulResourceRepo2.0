
#****f* time_tools.bsh/timeout
# NAME
#   get_time_seconds - Print the epoch time in seconds
# DESCRIPTION
#   Uses the date command to print nanosecond accurate epoch time, if your date
#   command supports that feature.
#
#   Else, uses python or ruby if available to get microsecond accurate answer.
#   If all else fails, use the date command which sometimes does not support
#   more than second accuracy.

#***
get_time_seconds()
{
  # If this date doesn't support nanoseconds
  if [ "$(date +%N)" == "N" ]; then
    if command -v python &>/dev/null; then
      python -c "import time; print('%0.9f' % time.time())"
    elif command -v ruby &>/dev/null; then
      ruby -e "print Time.now.to_f"
    # Add other elif commands here for other common languages. Perl needs a
    # plugin, so that's a no-go.
    else # Else just do seconds, best I can do
      date '+%s.0'
    fi
  else
    date '+%s.%N'
  fi
}


#****f* time_tools.bsh/timeout
# NAME
#   timeout - macOS function similar to linux timeout
# INPUTS
#   $1 - Timeout in integer seconds
#   $2... - Command to execute
# RETURN VALUE
#   142 on timedout
# SOURCE
if [[ ${OSTYPE-} = darwin* ]]; then
  function timeout()
  {
    perl -e '\
      eval {
        local $SIG{ALRM} = sub { die "alarm\n" }; # NB: \n required
        alarm shift;
        exec @ARGV;
        alarm 0;
      };
      if ($@) {
        die unless $@ eq "alarm\n";   # propagate unexpected errors
      };' "${@}"
  }
fi
