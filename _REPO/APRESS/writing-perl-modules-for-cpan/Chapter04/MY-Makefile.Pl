package MY;
sub test {
  my $pkg = shift;
  my $test = $pkg->SUPER::test(@_);  # call the real test() from MY parent
  $test =~ s/PERL_DL_NONLAZY=1//g;   # filter out PERL_DL_NONLAZY setting
  return $test;                      # return the modified test block
}
