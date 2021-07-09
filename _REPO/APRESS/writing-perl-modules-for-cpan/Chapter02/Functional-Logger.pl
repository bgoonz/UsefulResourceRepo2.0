# use the module
use BOA::Logger;

# open the log file
BOA::Logger::open_log("logs/boa.log");

# set the log level higher
BOA::Logger::log_level(10);

# write a log entry at level 5
BOA::Logger::write_log(5, "Hello log reader.");

# write a log entry at level 15 - this won't be printed to the log
BOA::Logger::write_log(15, "Debugging data here.");
