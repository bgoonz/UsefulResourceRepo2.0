package BOA::Logger;

$LOG_LEVEL = 1; # default log level is 1

# open log file
sub open_log {
   my $filename = shift;
   open(LOG_FILE, ">>$filename") or die "Unable to open $filename : $!";
   print LOG_FILE "BOA log started: " . localtime(time) . "\n";
}

# set logging level
sub log_level { $LOG_LEVEL = shift; }

# write a log message if level is set high enough
sub write_log {
   my ($level, $message) = @_;
   print LOG_FILE "$message\n" if $level <= $LOG_LEVEL;
}

1;
