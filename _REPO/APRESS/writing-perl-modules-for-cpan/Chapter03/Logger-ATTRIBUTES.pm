package BOA::Logger;

# initialize array of attribute names
@ATTRIBUTES = qw(filename level format);

# create a subroutine for each attribute
foreach my $attribute (@ATTRIBUTES) {
   *$attribute = sub {
       my $self = shift;
       $self->{$attribute} = shift if @_;
       return $self->{$attribute};
    }
}

1;
