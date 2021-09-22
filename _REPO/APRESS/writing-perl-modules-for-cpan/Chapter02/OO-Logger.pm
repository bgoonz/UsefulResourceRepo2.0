package BOA::Logger;
use Carp qw(croak);
use IO::File;

# constructor - returns new BOA::Logger objects
sub new {
   my ($pkg, $filename) = @_;

   # initialize $self as a reference to an empty hash
   my $self = {};
 
   # open the log file and store IO::File object in $self->{fh}
   my $filehandle = IO::File->new(">>$filename");
   croak("Unable to open $filename : $!") unless $filehandle;

   # print startup line
   $filehandle->print("BOA log started: " . localtime(time) . "\n");

   # store the filehandle in $self
   $self->{fh} = $filehandle;

   # set default log_level of one 
   $self->{level} = 1;

   # bless $self as an object in $pkg and return it
   bless($self, $pkg);
   return $self;
}

# level method - changes log level for this log object
sub level {
   my ($self, $level) = @_;
   $self->{level} = $level;
}

# write method - writes a line to the log file if log-level is high enough
sub write {
   my ($self, $level, $message) = @_;
   $self->{fh}->print($message) if $level <= $self->{level};
}

1;
