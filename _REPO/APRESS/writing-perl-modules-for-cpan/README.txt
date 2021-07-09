This archive contains most of the code from the book "Writing Perl
Modules for CPAN."  Included are all the numbered listings from the
book as well as a selection of the most useful code examples.

You can find listings by looking in the appropriate chapter directory
for files of the form "Listing-N.txt".  For example, Listing 2-1 is
located in Chapter02/Listing-1.txt.

I've tried to choose obvious names for the files containing
non-listing example code.  If the example is a complete module file
then it will end in .pm.  If the example is a script file then it will
end in .pl.  POD examples end in .pod.  C files end in .c.  XS files
end in .xs.

Note that many of the C example files will not compile as-is.  Most
will need some include lines added, and many have multiple conflicting
statements.  Instead of trying to use the .c example as-is you should
use them as a source to copy-and-paste into your own XS or Inline::C
projects.

If you have any problems with the code in this archive please consult
the errata section on the book page on the APress site at: 

  http://apress.com/book/bookDisplay.html?bID=14

-Sam Tregar <sam@tregar.com>
