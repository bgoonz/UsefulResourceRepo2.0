# check to make sure we have Gnome 1.2, 1.3 or 1.4 and can use gnome-config
my $version = 'gnome-config --version gnome';
unless ($version and $version =~ /1.[234]/) {
  print <<END;
#######################################################################
Gnome 1.[234].x not found.  Please make sure you have Gnome installed 
and that gnome-config is in your path.  Then re-run "perl Makefile.PL".
You can find more information about Gnome at http://gnome.org
#######################################################################
END
  exit 1;
}

use ExtUtils::MakeMaker;
WriteMakefile(
              NAME          => "Gnome::MIME",
              VERSION_FROM  => "MIME.pm",
              PREREQ_PM     => {},
              ABSTRACT_FROM => "MIME.pm",
              AUTHOR        => 'Sam Tregar <sam@tregar.com>',
              LIBS          => [`gnome-config --libs   gnome`],
              INC           =>  `gnome-config --cflags gnome`,
             );
