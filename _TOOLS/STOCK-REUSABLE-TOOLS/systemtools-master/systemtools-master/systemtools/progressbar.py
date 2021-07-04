"""
Display progress bar.

The progress bar implementation calculates the number of blocks to display as
the amount of progress is updated.  By default, this prints a text-based
progress bar.

When used in quite mode (disable printing), the progress bar can be used to
determine how many blocks to display for any rendering of a block-based
progress bar.

"""
# PY2 support
from __future__ import print_function
import sys
import shutil

__author__ = "Andrew Gillis"


class ProgressBar(object):

    """
    Block-based progress bar to show amount of data that has been processed.

    """

    def __init__(self, total_size, blocks_in_bar=None, block_char='#',
                 fraction=True, quiet=False):
        """Initialize class instance.

        Arguments:
        total_size    -- Total amount of data that full bar represents.
        blocks_in_bar -- Number of block characters in full bar.  If None,
                         then calculate max for complete status on one line.
        block_char    -- Character to print as a data block in progress bar.
        fraction      -- True (default) to show progress fraction. If False,
                         only the percent of progress is shown next to the bar.
        quiet         -- True to suppress output to stdout.  This can be used
                         if the caller wants to use their own display update
                         and only wants to use the output from update() and
                         finish()
        """
        assert(total_size > 1)
        assert(blocks_in_bar is None or blocks_in_bar > 0)
        assert(isinstance(block_char, str))
        if blocks_in_bar is None:
            try:
                cols, lines = shutil.get_terminal_size()
            except:
                cols = 80
            if fraction:
                max_fract = len(' (%d/%d)' % (total_size, total_size))
            else:
                max_fract = 0
            blocks_in_bar = cols - (8 + max_fract)

        self._total_size = total_size
        self._total_blocks = blocks_in_bar
        self._total_done = 0
        self._blocks_printed = 0
        self._block_char = block_char
        self._quiet = quiet
        self._show_fraction = fraction

        if fraction:
            status = '[%s] 0%% (0/%d)' % (' '*blocks_in_bar, total_size)
        else:
            status = '[%s] 0%%' % (' '*blocks_in_bar,)

        if not self._quiet:
            sys.stdout.write(status)
            sys.stdout.flush()

        self._bksp = len(status) - 1

    def __bool__(self):
        return self._total_done > 0

    __nonzero__ = __bool__

    def __len__(self):
        """Return size of data represented by filled portion of bar.

        Note: This can raise an overflow exception if the progress size is
        greater than sys.maxint.  If this happens, it is necessary to call the
        progress_size() method.

        """
        return self._total_done

    def update(self, more_size):
        """Update the progress bar with additional size completed.

        Arguments:
        more_size -- Size of additional data to represent as done (progress).

        Return:
        Number of additional blocks that get printed.

        """
        assert(more_size >= 0)
        self._total_done += more_size
        if self._total_done > self._total_size:
            self._total_done = self._total_size

        total_done = self._total_done
        total_blocks = self._total_blocks
        total_size = self._total_size
        # To calculate blocks so far we do:
        #    blocks_so_far = total_sent / data_per_block
        # We know that:
        #    data_per_block = int(total_size / blocks_in_bar)
        # and that may fail when: total_size < blocks in bar, so we change
        #    blocks_so_far = total_sent / (total_size / blocks_in_bar)
        # to this:
        #    blocks_so_far = int(total_sent * blocks_in_bar / total_size)
        # which works for all cases.
        blocks_so_far = int((total_done * total_blocks) / total_size)
        blocks_to_print = blocks_so_far - self._blocks_printed
        if not self._quiet:
            sys.stdout.write(chr(8)*self._bksp)

            if total_done == total_size:
                percent = 100
            else:
                percent = int((float(total_done) / total_size) * 100)

            sys.stdout.write(self._block_char*blocks_to_print)
            self._blocks_printed += blocks_to_print
            if self._show_fraction:
                rest = '%s] %d%% (%d/%d)' % (
                    ' '*(total_blocks - self._blocks_printed), percent,
                    total_done, total_size)
            else:
                rest = '%s] %d%%' % (
                    ' '*(total_blocks - self._blocks_printed), percent)
            sys.stdout.write(rest)
            sys.stdout.flush()
            self._bksp = len(rest)

        return blocks_to_print

    def finish(self):
        """Show any remaining (unfinished) blocks as '.' and print end of bar.

        Arguments:
        show_fraction: If True, Print the total_done/total_size at end of bar.

        Return:
        Number of blocks less than total that were not printed.

        """
        remaining = self._total_blocks - self._blocks_printed
        if not self._quiet:
            if self._total_done == self._total_size:
                percent = 100
            else:
                percent = int((float(self._total_done)/self._total_size) * 100)

            sys.stdout.write(chr(8)*self._bksp)
            if remaining > 0:
                sys.stdout.write('.'*remaining)
            if self._show_fraction:
                print('] ', percent, '% (', self._total_done, '/',
                      self._total_size, ')', sep='')
            else:
                print('] ', percent, '%', sep='')
            sys.stdout.flush()

        return remaining

    def progress_size(self):
        """Return size of data represented by filled portion of bar.

        This is the same as calling len() on this object, except that calling
        len() will raise an exception if the progress size is greater than the
        maximum integer value for the platform.

        """
        return self._total_done

    def incomplete_size(self):
        """Return size of data represented by empty portion of bar."""
        return self._total_size - self._total_done

    def progress_percent(self):
        """Return percent of progress completion."""
        return float(self._total_done * 100 / self._total_size)

    def data_per_block(self):
        """Get amount of data that each block represents."""
        return self._total_size / self._total_blocks

    def blocks_in_bar(self):
        """Return the total number of blocks required to fill progress bar."""
        return self._total_blocks
