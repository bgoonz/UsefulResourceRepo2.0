"""
CommandPath maintains a mapping of file names to the absolute file paths.

Use a CommandPath object like a dictionary to look up the absolute path to a
file.  When looking up a path, if the absolute path of the file is not yet
known, then a set of directories is searched to find the file.  Once the file
is found in one of the directories, the file's absolute path is saved.

The set of directories to search can be modified.  Specific file-to-path
mappings can be added separately, for paths that are not within the set of
search directories.

CommandPath is primarily useful for discovering and caching the location of
system commands when PATH cannot be relied, and when the the commands or other
files may not be in an expected location.

Example use:

>>> import commandpath
>>> cp = commandpath.CommandPath()
>>> cp['ls']
'/bin/ls'
>>> cp['ifconfig']
'/sbin/ifconfig'

"""
import os


class CommandPath(object):

    """
    Map file names to their absolute paths.

    """

    def __init__(self):
        """Initialize CommandPath instance with common search paths."""
        self._dirs = ['/sbin', '/usr/sbin', '/bin', '/usr/bin',
                      '/usr/local/bin', '/usr/local/sbin']
        self._path_map = {}

    def __len__(self):
        """Return the number of commands whos location is knows."""
        return len(self._path_map)

    def __getitem__(self, key):
        """Get the full path to the command.

        If the full path to the specified command is not known, then search for
        the command in the directories known to this CommandPath object.  If
        the command is found, save and return its full path.  If the command is
        not found, raise KeyError.

        """
        cmd_path = self._path_map.get(key)
        if cmd_path is None:
            cmd_path = self.find_path(key)
            if cmd_path is None:
                raise KeyError('command not found: ' + key)
            self._path_map[key] = cmd_path
        return cmd_path

    def __setitem__(self, cmd, cmd_path):
        """Set the full path to the specified command.

        This is useful for specifying the location of a command without adding
        the command's directory to the directories to search.

        """
        cmd_path = os.path.abspath(cmd_path)
        if not os.path.isfile(cmd_path):
            raise ValueError('command not found at: ' + cmd_path)
        self._path_map[cmd] = cmd_path

    def __delitem__(self, key):
        """Remove a command path."""
        del self._path_map[key]

    def __contains__(self, key):
        """Return True if the specified command's full path is known."""
        return key in self._path_map

    def __iter__(self):
        return self._path_map.__iter__()

    def find_path(self, command):
        """Search dirs for command and return full path to command."""
        for path in self._dirs:
            cmd_path = os.path.join(path, command)
            if os.path.isfile(cmd_path):
                return cmd_path
        return None

    def add_dir(self, dir_name, recursive=False, followlinks=False):
        """Add directories to the list of directories to search.

        If recursive is True, then recursively add the specified directory and
        all subdirectories.

        By default, add_dir() will not follow symbolic links that resolve to
        directories.  Set followlinks to True to add directories pointed to by
        symlinks, on systems that support them.

        Returns a list of directories added to the search list.

        """
        loc = os.path.abspath(dir_name)
        if not os.path.isdir(loc):
            raise ValueError('directory not found: ' + loc)
        have_set = set(self._dirs)
        if loc not in have_set:
            self._dirs.append(loc)
        if recursive:
            for dirpath, dirnames, filenames in os.walk(
                loc, followlinks=followlinks):
                for d in dirnames:
                    d_path = os.path.join(dirpath, d)
                    if d_path not in have_set:
                        self._dirs.append(d_path)

        # Return list of new locations.
        return self._dirs[len(have_set):]

    def remove_dir(self, dir_name, recursive=False):
        """Remove directories from the list of directories to search.

        If recursive is True, then also remove any directories that are
        subdirectories of the specified directory.

        Returns a list of directories removed from the search list.

        """
        loc = os.path.abspath(dir_name)
        removed = []
        if recursive:
            # Append path separator to paths before comparing.  This pevents
            # prefix matching of partial directory names.  For example:
            # "/bin" should not match "/binoculars"
            # "/bin" should match "/bin/xfiles" and "/bin"
            loc_dir = loc + os.path.sep
            for l in self._dirs:
                l_dir = l + os.path.sep
                if l_dir.startswith(loc_dir):
                    removed.append(l)
            for l in removed:
                self._dirs.remove(l)
        else:
            try:
                self._dirs.remove(loc)
                removed.append(loc)
            except ValueError:
                pass

        return removed

    def clear(self):
        """Remove all file to path mappings."""
        self._path_map.clear()

    def clear_dirs(self):
        """Remove all search directories."""
        self._dirs = []

    def dirs(self):
        """Return a list of directories to search for commands."""
        return list(self._dirs)
