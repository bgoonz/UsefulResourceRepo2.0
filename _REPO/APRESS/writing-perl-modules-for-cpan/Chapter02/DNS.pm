package BOA::Network::DNS;
sub TIEHASH {
   my $pkg = shift;
   my $self = { @_ }; # retrieve named options into $self hash-ref

   # check for required 'nameserver' option
   croak("Missing nameserver address!") unless exists $self->{nameserver};

   # initialize cache to an empty hash
   $self->{cache} = {};

   # bless $self and return
   return bless($self, $pkg);
}

# method called when an entry is read from the hash
sub FETCH {
   my ($self, $key) = @_;
   
   # check cache and return if found
   return $self->{cache}{$key} if exists $self->{cache}{$key};
    
   # make lookup using nameserver provided to TIEHASH
   my $result = _do_dns_lookup($self->{nameserver}, $key);

   # cache result and reverse mapping
   $self->{cache}{$key} = $result;
   $self->{cache}{$result} = $key;
  
   # return result
   return $result;
}

# called when an entry is written to the hash
sub STORE {
   my ($self, $key, $value) = @_;
   
   # store the value in the cache, forward and reverse
   $self->{cache}{$key} = $value;
   $self->{cache}{$value} = $key;

   # return the value stored so that chained assignment works
   return $value;
}

# method called when exists() is called on the hash
sub EXISTS {
   my ($self, $key) = @_;
   return exists $self->{cache}{$key};
}

# method called when delete() is called on the hash
sub DELETE {
   my ($self, $key) = @_;
   
   # delete both forward and reverse lookups if the key exists
   my $value;
   if (exists $self->{cache}{$key}) {
      $value = $self->{cache}{$key};
      delete $self->{cache}{$value};
      delete $self->{cache}{$key};
   }

   # return deleted value, just like the normal delete()
   return $value;
}

sub CLEAR {
   my $self = shift;
   %{$self->{cache}} = ();
}

sub FIRSTKEY {
  my $self = shift;
  
  # reset iterator for the cache
  scalar keys %{$self->{cache}};

  # return the first key from the cache
  return scalar each %{$self->{cache}};
}

sub NEXTKEY {
   my ($self, $lastkey) = @_;
   return scalar each %{$self->{cache}};
}

1;
