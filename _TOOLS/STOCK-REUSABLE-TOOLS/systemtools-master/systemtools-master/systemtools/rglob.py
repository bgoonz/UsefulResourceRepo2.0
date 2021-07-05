#!/usr/bin/env python
"""
Recursive glob matcher.

Compare directory tree against expressions and filter matching items.

Recursively find directories and files that match any of the specified filter
expressions.  A filter expression is a pattern to match against each file or
directory name.  The following special characters are recognized:

    ** recursive wildcard
    *  wildcard (doesn't expand across directory levels)
    !  prefix an expression to exclude matching items

If there is no matching rule for a file or directory, then it is not included.
If there are multiple matching rules, then the last rule matched determines if
the file or directory is included.  For example:

    /stuff/myfiles/**
    !/stuff/myfiles/.ssh/**

The above example means recursively include everything in /stuff/myfiles/ but
do not include anything in .ssh/.

Examples:

  List all files and directories, recursively, inside the current directory,
  excluding anything ending with *.py:
    > python rglob.py -p '**' -p '!*.py'

  Match the directory /tmp/stuff and its immediate files and subdirectories.
  Exclude any item that contains the substring 'backup', case insensitive.
    > python rglob.py /tmp -p 'stuff/*' --exclude backup --ignore-case

  Recursively search in /tmp for files having a name that starts with 'README'.
    > python rglob.py /tmp -p '**/README.*' --nodirs

"""
from __future__ import print_function
import os
import re
import itertools


class Filter(object):
    """
    Filter a string based on a series of expressions.

    ** recursive wildcard
    *  wildcard (doesn't expand across directory levels)
    !  prefix an expression to exclude matching items

    Arguments:
    patterns     -- List of pattern strings, or single pattern string.
    exclude_keys -- Exclude the item if it contains any of these specified
                    substrings.
    ignore_case  -- Ignore case of exclude_keys.

    """
    def __init__(self, patterns='**', exclude_keys=None, ignore_case=False):
        if not patterns:
            patterns = '**'

        if isinstance(patterns, str):
            patterns = [patterns]

        if exclude_keys:
            if isinstance(exclude_keys, str):
                exclude_keys = [exclude_keys]
            if ignore_case:
                exclude_keys = [k.lower() for k in exclude_keys]

        self._exclude_keys = exclude_keys
        self._ignore_case = ignore_case
        self._exprs = [Filter._pattern_to_regex(p) for p in patterns if p]

    @staticmethod
    def _pattern_to_regex(pattern):
        is_include = True
        if pattern.startswith('!'):
            pattern = pattern[1:]
            is_include = False

        if pattern.find('***') != -1:
            raise ValueError('invalid pattern: ' + pattern)

        pattern = pattern.replace('/', '[\\\\/]')
        pattern = pattern.replace('.', '\\.')
        pattern = pattern.replace('+', '\\+')
        pattern = pattern.replace('**', '$$$$')
        pattern = pattern.replace('*', '[^\\\\/]*')
        pattern = pattern.replace('[\\\\/]$$$$', '($|[\\\\/].*)')
        pattern = pattern.replace('$$$$', '.*')
        pattern = '^' + pattern + '$'
        pattern = re.compile(pattern)
        return (is_include, pattern)

    def __call__(self, s):
        # Allow Filter object to be called as function, returning True or False
        # telling whether or not the patterns allow given string.
        include = False
        for is_include_expr, expr in self._exprs:
            if include:
                if not is_include_expr and expr.match(s) is not None:
                    include = False
            else:
                if is_include_expr and expr.match(s) is not None:
                    include = True

        # If include then check for exclusion keys.
        if include and self._exclude_keys:
            sub = s.lower() if self._ignore_case else s
            for key in self._exclude_keys:
                if sub.find(key) != -1:
                    include = False
                    break
        return include


def rglob(path, patterns, relative=False, files_only=False, exclude_keys=None,
          ignore_case=False):
    """Yield each file and directory, within path, included by patterns.

    Arguments:
    path         -- Top-level directory to search for items to include.
    patterns     -- List of patterns to match items in path against.
    exclude_keys -- List of substrings.  Exclude the item if it contains any of
                    these specified substrings.
    ignore_case  -- Ignore case of exclude_keys.

    Return a file or directory name, or None if nothing else matches.

    """
    if not os.path.isdir(path):
        raise ValueError('not a directory: ' + path)
    match = Filter(patterns, exclude_keys, ignore_case)
    for root, dirs, files in os.walk(path):
        rel_root = root.replace(path, '', 1)[1:]
        if files_only:
            it = itertools.chain(files)
        else:
            it = itertools.chain(files, dirs)

        for f in it:
            rf = os.path.join(rel_root, f)
            if match(rf):
                yield os.path.join(rel_root if relative else root, f)


def frglob(path, patterns_path, relative=False, files_only=False,
           exclude_keys=None, ignore_case=False):
    """Same as rglob(), but reads patterns from patterns_file."""
    return rglob(path, read_patterns_file(patterns_path), relative, files_only,
                 exclude_keys, ignore_case)


def read_patterns_file(file_path):
    """Read patterns from a file.

    Each pattern is on a separate line.  Comment lines (starting with #) and
    blank lines are ignored.

    """
    patterns = []
    with open(file_path) as pat_file:
        for pat in pat_file:
            if not pat:
                continue
            pat = pat.strip()
            if not pat or pat[0] == '#':
                continue
            patterns.append(pat)
    return patterns


if __name__ == '__main__':
    import argparse
    import sys
    parser = parser = argparse.ArgumentParser(
        description='List items in path included by patterns.')
    parser.add_argument(
        'path', default='.', nargs='?',
        help='top-level directory to search for included items, defaults to '
        'current directory')
    parser.add_argument(
        '--pattern', '-p', action='append',
        help='glob pattern to match against, multiple allowed')
    parser.add_argument(
        '--file', '-f', action='store_true', dest='use_file',
        help='last --pattern value specifies a file to read patterns from, '
        'comment lines (starting with "#") and blank lines are ignored')
    parser.add_argument(
        '--relative', action='store_true',
        help='return relative paths for matching items')
    parser.add_argument(
        '--nodirs', '-n', action='store_true',
        help='only return paths to files, not directories')
    parser.add_argument(
        '--exclude', '-x', action='append',
        help='exclude matches containing this substring, multiple allowed')
    parser.add_argument(
        '--ignore-case', '-i', action='store_true',
        help='ignore case of excludes')

    args = parser.parse_args()
    if args.use_file:
        patterns = read_patterns_file(args.pattern.pop())
    else:
        patterns = []
    patterns.extend(args.pattern)

    try:
        for i in rglob(args.path, patterns, args.relative, args.nodirs,
                       args.exclude, args.ignore_case):
            print(i)
    except ValueError as e:
        print(e, file=sys.stderr)
    except Exception:
        print('error at pattern:', p, file=sys.stderr)
        raise
