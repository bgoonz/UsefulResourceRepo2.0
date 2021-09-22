# Unix-V6-File-System

A custom C implementation of the Unix Version 6 file system.

Interface is through the command line, and is designed to look as similar to linux file system commands as possible (mv, ls, cp, mkdir, rmdir,..)
On initialization, creates a partitioned file system that utilizes an index to lookup the data block components of each file. Each file and directory has a corresponding I-Node in the lookup-structure that points to indices of data nodes (for files) or indices of subdirectories or contained files (For directories)

## Compilation instructions:

gcc -o v6 v6.c -std=c99

## Run time:

./v6

## Documentation

This program allows user to do a few things:

1. initfs - Initilizes the file system and redesigning the Unix file system to accept large
   files of up to 4GB, expands the free array to 152 elements, expands the i-node array to
   200 elemnts, doubles the i-node size to 64 bytes and other new features as well.
2. cpin - copy a file into the filesystem
3. cpout - copy a file out of the filesystem
4. ls - list contents of directory
5. cat - list contents of a file
6. rm - remove a file/directory
7. q save all work and exit the program.

## User Input:

     - initfs (file path) (# of total system blocks) (# of System i-nodes)
     - cpin srcfile dstpath
     - cpout srcpath dstpath
     - ls [dirpath]
     - cat filepath
     - q

File name is limited to 14 characters.
