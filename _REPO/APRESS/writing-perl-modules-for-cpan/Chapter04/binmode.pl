open(IMAGE, "image.jpg") or die $!; # open the image file
binmode(IMAGE);                     # the image file is binary data
my $image = join('',<IMAGE>);       # read the image data into $image
smooth($image);                     # smooth the image
binmode(STDOUT);                    # about to print binary data on STDOUT
print STDOUT $image;                # print out the image to the client
