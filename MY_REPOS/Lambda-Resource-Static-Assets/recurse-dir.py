import os

for current_dir, subdirs, files in os.walk( '.' ):
    # Current Iteration Directory
    print( current_dir )

    # Directories
    for dirname in subdirs:
        print( '\t' + dirname )

    # Files
    for filename in files:
        print( '\t' + filename )
