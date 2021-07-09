package BOA::Logger;
use Carp;

# initialize hash of attribute names
%ATTRIBUTES = map { $_ => 1 } qw(filename level format);

sub AUTOLOAD {
  return if $AUTOLOAD =~ /DESTROY$/;    # skip calls to DESTROY()
  my ($name) = $AUTOLOAD =~ /([^:]+)$/; # extract method name

  # check that this is a valid accessor call
  croak("Unknown method '$AUTOLOAD' called ") unless $ATTRIBUTES{$name};

  # create the accessor-mutator and install it as &$name
  *$name = sub {
    my $self = shift;
    $self->{$name} = shift if @_;
    return $self->{$name};
  };

  goto &$name;  # jump to the new method with the magic goto(&) call
}

1;
