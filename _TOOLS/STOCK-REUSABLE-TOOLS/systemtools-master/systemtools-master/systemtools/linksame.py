"""
Replace identical files with links to one real file.

Search recursively through the top level directory to find identical files.
For each set of identical files, keep only the file with the longest name and
replace all other copies with symlinks to the longest-named file.  The use of
hardlinks or symlinks can be specified.  Symlinks are created when hardlinks
fail.

This is useful when there are multiple copies of files in different in
different locations of a directory tree, and all copies of each file should
remain identical.  Converting all the files into links to the same file ensures
that the files remain the same as well as saves the space used by multiple
copies.

The linksame utility is also useful when different names for a shared lib
should be links, but were perhaps turned into files.  Each copy has a different
name.  For example:

    libexample.so.1.0
    libexample.so.1
    libexample.so

will be changed so that there is only one instance of the file:

    libexample.so.1.0
    libexample.so.1 --> libexample.so.1.0
    libexample.so --> libexample.so.1.0

"""
from __future__ import print_function

import fnmatch
import hashlib
import os
import shutil
import sys
import threading
try:
    import queue
except ImportError:
    import Queue as queue

def link_same_files(roots, pattern=None, link=False, symlink=False,
                    absolute=False, quiet=False, verbose=False):
    """Replace copies of files with links to a single file.

    If identical files are found, then the file with the longest path name is
    kept and the other files are replaced by links to that name.

    If a hardlink cannot be created, then a symlink is created.  If
    symlink it True, then only symlinks are created.

    Setting absolute=True creates absolute symlinks instead of relative
    symlinks.  Generally, relative (the default) symlinks are preferred as this
    permits links to maintain their validity regardless of the mount point used
    for the filesystem.

    Return: None if OK.  Otherwise, error string.

    """
    roots, err = _normalize_roots(roots, quiet)
    if err:
        return err

    if not quiet:
        print('Linking identical files in', ', '.join(roots))

    # Walk directory and create map, {size: filepath, ..}.  This allows files,
    # that do not match another file in size, to be eliminated without having
    # to calculate a hash of the file.
    size_file_map = {}
    for root_dir in roots:
        for dirpath, dirnames, filenames in os.walk(root_dir):
            for fname in filenames:
                fpath = os.path.join(dirpath, fname)
                if not os.path.isfile(fpath) or os.path.islink(fpath):
                    continue
                fsize = os.path.getsize(fpath)
                if fsize == 0:
                    continue
                if pattern and not fnmatch.fnmatch(fname, pattern):
                    continue
                size_file_map.setdefault(fsize, []).append(fpath)

    statsq = queue.Queue()

    #  Thread function to check and link files concurrently.
    def check_and_link(filepaths):
        links = 0
        saved = 0
        hash_map = _create_hash_map(filepaths)
        for files in hash_map.itervalues():
            if len(files) < 2:
                continue
            l, s = _link_files(files, link, symlink, absolute, verbose)
            links += l
            saved += s

        statsq.put((links, saved))

    wait_count = 0
    for same_size_files in size_file_map.itervalues():
        if len(same_size_files) < 2:
            # Skip unique files
            continue
        wait_count += 1
        t = threading.Thread(target=check_and_link, args=(same_size_files,))
        t.start()

    link_count = 0
    size_saved = 0
    while wait_count:
        l, s = statsq.get()
        wait_count -= 1
        link_count += l
        size_saved += s

    if not quiet:
        print()
        if not link:
            print('If writing links (-w), would have...')
        print('Replaced', link_count, 'files with links')
        print('Reduced storage by', size_str(size_saved))

    return None


def link_same_update(update_file, roots, pattern=None, link=False,
                     symlink=False, absolute=False, quiet=False,
                     verbose=False):
    """Replace copies of a specified file with links to a single file.

    Return: None if OK.  Otherwise, error string.

    """
    if not update_file:
        return "Update file not specified"
    roots, err = _normalize_roots(roots, quiet)
    if err:
        return err
    if not os.path.isfile(update_file):
        return '%s is not a file' % (update_file,)
    update_size = os.path.getsize(update_file)
    if update_size == 0:
        return '%s is empty' % (update_file,)
    update_hash = _hash_file(update_file)

    if not quiet:
        print('Linking', update_file, 'to identical files in',
              ', '.join(roots))

    # Walk directory and find files that are identical to the update file.
    same = [update_file]
    for root_dir in roots:
        for dirpath, dirnames, filenames in os.walk(root_dir):
            for fname in filenames:
                fpath = os.path.join(dirpath, fname)
                if not os.path.isfile(fpath) or os.path.islink(fpath):
                    continue
                if os.path.getsize(fpath) != update_size:
                    continue
                if pattern and not fnmatch.fnmatch(fname, pattern):
                    continue
                if _hash_file(fpath) != update_hash:
                    continue
                same.append(fpath)

    link_count = 0
    size_saved = 0
    if len(same) > 1:
        # Link files that are identical to the update file.
        link_count, size_saved = _link_files(same, link, symlink, absolute,
                                             verbose)

    if not quiet:
        print()
        if not link:
            print('If writing links (-w), would have...')
        print('Replaced', link_count, 'files with links')
        print('Reduced storage by', size_str(size_saved))

    return None


def _normalize_roots(roots, quiet):
    for i, root_dir in enumerate(roots):
        root_dir = os.path.normpath(os.path.expanduser(root_dir))
        if not os.path.isdir(root_dir):
            return None, root_dir + ' is not a directory'
        roots[i] = root_dir

    if not roots:
        return ['.'], None

    if len(roots) > 1:
        # Remove any root that is the same or a subdirectory of another.
        i = 0
        while i < len(roots):
            j = 0
            removed = False
            while j < len(roots):
                if j == i:
                    j += 1
                    continue

                if roots[i].startswith(roots[j]):
                    if not quiet:
                        print(roots[i], "already included in", roots[j],
                              file=sys.stderr)

                    # This root is a subdirectory of another, so remove it.
                    roots[i] = roots[-1]
                    roots = roots[:-1]
                    removed = True
                    break

                j += 1

            if not removed:
                i += 1

    return roots, None


def _hash_file(filename):
    """Calculate SHA1 hash of file."""
    BLOCKSIZE = 65536
    hasher = hashlib.sha1()
    with open(filename, 'rb') as afile:
        buf = afile.read(BLOCKSIZE)
        while len(buf) > 0:
            hasher.update(buf)
            buf = afile.read(BLOCKSIZE)

    return hasher.hexdigest()


def _create_hash_map(filepaths):
    # For list of same size files, create a map {hash: filepath, ..}
    same_as = []
    hash_file_map = {}
    for i, fpath in enumerate(filepaths):
        if not fpath:
            continue

        # Find hardlinks to current file, and reuse hash for these.
        for j in xrange(i + 1, len(filepaths)):
            if not filepaths[j]:
                continue

            if os.path.samefile(fpath, filepaths[j]):
                same_as.append(filepaths[j])
                filepaths[j] = None

        h = _hash_file(fpath)
        if same_as:
            # Reuse hash for additional hardlinked files.
            same_as.append(fpath)
            hash_file_map.setdefault(h, []).extend(same_as)
            same_as = same_as[:0]
        else:
            hash_file_map.setdefault(h, []).append(fpath)

    return hash_file_map


def _link_files(files, link, symlink, absolute, verbose):
    link_count = 0
    size_saved = 0

    def fkey(name):
        # Sort by shortest-basename, shortest-path
        return len(os.path.basename(name)), len(name)

    # Sort files and get file with longest name, or longest path if names are
    # the same.  This only matters for symlinks, but since a failed hardlink
    # can result in a symlink, do it anyway.
    files.sort(key=fkey)
    base_file = files.pop()
    base_size = os.path.getsize(base_file)

    # Iterate remaining files and replace with links.
    for f in files:
        if os.path.samefile(base_file, f):
            # If the files are already the same (hardlinked), then do not try
            # to link.
            continue

        if not link:
            size_saved += base_size
            link_count += 1
            if verbose:
                if symlink:
                    if absolute:
                        source = base_file
                    else:
                        rp = os.path.relpath(os.path.dirname(base_file),
                                             os.path.dirname(f))
                        if rp == '.':
                            source = os.path.basename(base_file)
                        else:
                            source = os.path.join(rp, os.path.basename(base_file))
                    print('symlink:', f, '--->', source)
                else:
                    print('link:', f, '<-->', base_file)
            continue

        try:
            os.unlink(f)
        except OSError:
            print('cannot remove file:', f, file=sys.stderr)
            continue

        create_symlink = symlink
        if not symlink:
            try:
                os.link(base_file, f)
                if verbose:
                    print('hardlink:', f, '<-->', base_file)
            except OSError:
                create_symlink=True
                if verbose:
                    print('could not create hardlink, symlink instead',
                          file=sys.stderr)

        if create_symlink:
            if absolute:
                source = base_file
            else:
                rp = os.path.relpath(os.path.dirname(base_file),
                                     os.path.dirname(f))
                if rp == '.':
                    source = os.path.basename(base_file)
                else:
                    source = os.path.join(rp, os.path.basename(base_file))

            try:
                os.symlink(source, f)
                if verbose:
                    print('symlink:', f, '--->', source)
            except OSError as e:
                print('failed to create symlink for %s: %s' % (base_file, e),
                      file=sys.stderr)
                # Restore file.
                shutil.copy2(base_file, f)
                continue # skip stats update

        size_saved += base_size
        link_count += 1

    return link_count, size_saved


def size_str(byte_size):
    """Truncate number to highest significant power of 2 and add suffix."""
    KB = 1024
    MB = KB*1024
    GB = MB*1024
    if byte_size > GB:
        return str(round(float(byte_size) / GB, 1)) + 'G'
    if byte_size > MB:
        return str(round(float(byte_size) / MB, 1)) + 'M'
    if byte_size > KB:
        return str(round(float(byte_size) / KB, 1)) + 'K'
    return str(byte_size) + ' bytes'


def main():
    import argparse
    ap = argparse.ArgumentParser(
        description='Convert identical files to links to one real file')
    ap.add_argument('roots', nargs='*', default=['.'],
                    help='Top-level directory to search for files to link. '
                    'Current directory if not specified.')
    ap.add_argument('--write', '-w', action='store_true',
                    help='Write links to filesystem')
    ap.add_argument('--symlink', action='store_true',
                    help='Link files using only symlinks')
    ap.add_argument('--absolute', '-a', action='store_true',
                    help='When creating symlink, use absolute instead of '
                    'relative link.')
    ap.add_argument('--pattern', '-p', help='Only link files matching pattern')
    ap.add_argument('--quiet', '-q', action='store_true',
                    help='Suppress output messages and warnings')
    ap.add_argument('--verbose', '-v', action='store_true',
                    help='Print individual link creation messages')
    ap.add_argument('--update', '-u',
                    help='Only link files identical to specified update file')
    args = ap.parse_args()

    if args.update:
        err = link_same_update(
            args.update, args.roots, args.pattern, args.write, args.symlink,
            args.absolute, args.quiet, args.verbose)
    else:
        err = link_same_files(
            args.roots, args.pattern, args.write, args.symlink, args.absolute,
            args.quiet, args.verbose)

    if err:
        print(err, file=sys.stderr)
        return 1

    return 0


if __name__ == '__main__':
    sys.exit(main())
