package CGI::MailForm;
use CGI;

# basic constructor
sub new {
  my $pkg = shift;
  my $self = { query => CGI->new() };
  bless($self, $pkg);
}

# the proxying param method
sub param {
  my $self = shift;
  return $self->{query}->param(@_);
}

1;
