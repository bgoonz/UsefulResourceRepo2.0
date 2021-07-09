#!/usr/bin/perl -w
use Inline C => <<END_OF_C;
  void japh() {
    PerlIO_stdoutf("Just Another Perl Hacker.\n");
  }
END_OF_C

japh();
