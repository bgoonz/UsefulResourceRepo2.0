package BOA::Thermostat;
sub TIESCALAR {
   my $pkg = shift;
   my $self = { @_ }; # retrieve named options into $self hash-ref

   # check for required 'compartment' option
   croak("Missing compartment number!") unless exists $self->{compartment};

   # the vent is initially closed
   $self->{vent_state} = 0;

   # bless $self and return
   return bless($self, $pkg);
}

# method called when scalar is read
sub FETCH {
   my $self = shift;
   return get_temp($self->{compartment});
}

# method called when scalar is written to
sub STORE {
   my ($self, $val) = @_;

   # return if the vent is already in the requested state
   return $val if $val == $self->{vent_state};

   # open or close vent
   if ($val) {
     open_vent($self->{compartment});
   } else {
     close_vent($self->{compartment});
   }
   
   # store and return current vent state
   return $self->{vent_state} = $val;
}

1;
