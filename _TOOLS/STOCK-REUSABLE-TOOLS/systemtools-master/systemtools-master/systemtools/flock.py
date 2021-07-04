"""
The FLock object provided by this module has and acquire() and release() method
that can be used as a context manager for a 'with' statement.  The acquire()
method is called when the block is entered, and release() is called when the
block is exited.

Flock objects may be used as 'with' statement context managers.  For example:

  import flock

  some_flock = flock.FLock('myfile.lock')
  with some_flock:
      print 'some_flock is locked while this executes'

  with flock.Flock('their.lock') as other_flock:
      print 'other_flock is locked now'

"""
import os
import errno
import time

__author__ = "Andrew Gillis"


class FLock(object):

    """
    Class to create a lock using a file.

    This is useful portable locking between separate processes.

    """

    def __init__(self, lock_path):
        assert(lock_path)
        self._lock_path = lock_path

    def __enter__(self):
        self.acquire()
        return self

    def __exit__(self, exc_type, exc_val, exc_tb):
        self.release()
        return False

    def acquire(self, blocking=True, timeout=None):
        """Acquire a file-based lock, blocking or non-blocking.

        When invoked with the blocking argument set to True (the default),
        block until the lock is unlocked, then set it to locked and return
        True.  If timeout is a positive number, it blocks at most timeout
        seconds and returns False if the lock was not released within that
        time.

        When invoked with the blocking argument set to False, do not block. If
        a call with blocking set to True would block, return False immediately;
        otherwise, set the lock to locked and return True.  The timeout is
        ignored in this case.

        """
        lockpath = self._lock_path
        if timeout and blocking:
            if timeout > 0:
                expiration = time.time() + timeout
            else:
                timeout = None
        while True:
            try:
                fd = os.open(lockpath, os.O_EXCL | os.O_WRONLY | os.O_CREAT)
                os.close(fd)
                return True
            except OSError as e:
                if e.errno != errno.EEXIST:
                    raise
                if not blocking:
                    return False
                if timeout and time.time() >= expiration:
                    return False
                time.sleep(.5)
                continue

    def release(self):
        """Release a file-based lock.

        When the lock is locked, reset it to unlocked, and return.  If any
        other processes are blocked waiting for the lock to become unlocked,
        allow exactly one of them to proceed.

        When invoked on an unlocked lock, a RuntimeError is raised.

        There is no return value.

        """
        try:
            os.unlink(self._lock_path)
        except Exception as e:
            if e.errno == errno.ENOENT:
                raise RuntimeError('release unlocked lock')
            raise
