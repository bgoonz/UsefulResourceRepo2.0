# systemtools - Python system utility modules

The systemtools package is a collection of [Python](https://www.python.org/) system utility modules.  All modules can be imported into other code and most can also be used as stand-alone command utilities.

## Installation

The systemtools package can be installed from pypi using the following command:
```
sudo pip install systemtools
```

## Modules in Package

### checktcpconn

Check or poll to see if a TCP connection can be made to a host.  This is useful when waiting for a service to become available.

### commandpath

CommandPath is a dictionary-like object that maintains a mapping of file names to the absolute file paths.  When looking up a file's path, if the absolute path of the file is not yet known, then a set of directories is searched to find the file, and the file's path is cached.  This is useful when PATH cannot be relied on and commands or other files may not be in an expected location.

### escape

Escape and un-escape characters in string.

### flock

Mutex implemented as file-based lock.  This is useful for implementing a mutex shared across separate processes.

Usable as context handler, so using the with statement acquires the associated lock for the duration of the enclosed block.

### linkidentical

Replace identical files, in directory tree, with links to one real file.

Search recursively through the top level directory to find identical files.  For each set of identical files, keep only one file and replace all the others with hardlinks, or symlinks if specified.  When creating symlinks, keep the file with the longest name or deepest in the directory tree if names are the same, and replace all other copies with symlinks.  Symlinks are used when hardlinks
fail.

This is useful when there are multiple copies of files in different in different locations of a directory tree, and all copies of each file should remain identical.  Converting all the files into links to the same file ensures that the files remain the same as well as saves the space used by multiple copies.

Optionally returns information about number of files replaced and storage space saved.

### pidutil

Utility functions for working with PID files and processes on Linux/UNIX systems.

### primes

Utility to find prime numbers up to a given maximum.  Command line program
displays prime numbers, counts how many there are, and optionally displays
distance between them.

### progressbar

The ProgressBar object calculates the number of blocks to display as the amount of progress is updated.  By default, this prints a text-based progress bar.

### rglob

Recursive glob matcher to compare directory tree against expressions and filter matching items.

### shuffle

Fast in-place random shuffle of items in list.

### syslogger

Setup logging handler to write syslog-like messages to file or to syslog.  If writing to a file, then file rotation parameters are configurable.  Log entries can optionally by written to stderr as well.  This is useful as a simplified interface to log handler configuration.

### systemstats

Query system stats data on Linux and FreeBSD system.  The stats includes the following:

- Disk use
- Memory use
- CPU use
- Logical CPU count
- Uptime information (load average and uptime)

Information is available as numeric values or human-readable strings for display.

### toposort

Topologically sort a directed acyclic graph with cycle detection.  This is useful when sorting items into dependency order, for example, when determining what order to apply updates to many items with inter-dependencies.


### userinput

This module provides different methods to prompt for user input, including menus.  It is useful when writing interactive python programs.  All methods support an optional timeout value, to limit the time waiting for user input.
