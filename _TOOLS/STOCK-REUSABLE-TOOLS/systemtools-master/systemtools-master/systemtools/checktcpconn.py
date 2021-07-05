"""
Check if a TCP connection can be made to a host.

"""
from __future__ import print_function

__author__ = "Andrew Gillis"

import sys
import socket
import time


class CheckTcpConn(object):

    """
    Try once or poll to see if a TCP connection can be made to a host.

    """

    def __init__(self, host, port):
        """Initialize CheckTcpConn instance.

        Arguments:
        host -- IP address or DNS name of host to connect to.
        port -- Port to connect to host on.

        """
        if not host:
            raise ValueError('host not specified')
        port = int(port)
        if port < 1 or port > 65535:
            raise ValueError('invalid port value')
        self._conn_info = (host, port)
        self._last_error = None

    def try_connect(self, timeout=None):
        """Make a single attempt to connect to the host.

        If a TCP connection is made, it is immediately closed.  The string for
        the error resulting from a failed TCP connection is saved, and can be
        retrieved using the last_error() method.

        Arguments:
        timeout -- Time in seconds to wait for connection.  If None, then use
                   the global default timeout setting.

        Return:
        True if TCP connection made, False if connection could not be made.

        """
        self._last_error = None
        s = None
        try:
            s = socket.create_connection(self._conn_info, timeout)
            return True
        except socket.error as e:
            self._last_error = str(e)
        finally:
            if s is not None:
                s.close()
        return False

    def poll(self, timeout, interval=5):
        """Try repeatedly to make a TCP connection until timeout.

        This method calls try_connect() to make a TCP connection.  If a
        connection can be made then this method returns immediately.
        Otherwise, it keeps retrying until the specified timeout.

        Arguments:
        timeout  -- Total time in secomds to keep trying to make connection.
        interval -- Time in secomds to wait between retires.

        Return:
        True if TCP connection made, False if connection could not be made.

        """
        if timeout <= 0:
            raise ValueError('timeout must be > 0')
        expire_time = time.time() + timeout
        remaining = timeout
        while remaining > 0:
            if self.try_connect(remaining):
                return True
            # Check time at end of loop to see if it is necessary to wait
            # another interval before trying again.
            if time.time() >= expire_time:
                break
            time.sleep(interval)
            remaining = expire_time - time.time()
        return False

    def last_error(self):
        """Return last error message resulting from a failed TCP connection."""
        return self._last_error

    def address(self):
        """Return tuple of host, port used to establish TCP connection."""
        return self._conn_info[0]


def main():
    import argparse
    ap = argparse.ArgumentParser(
        description='Check if a TCP connection can be made to a host.')
    ap.add_argument('host',
                    help='IP address or DNS name of host to connect to.')
    ap.add_argument('port', type=int, help='Port to connect to host on.')
    ap.add_argument('--poll', action='store_true',
                    help='Try repeatedly to make a TCP connection until '
                    'timeout.')
    ap.add_argument('--wait', metavar='seconds', type=float, dest='timeout',
                    default=60.0,
                    help='Time in seconds to wait for connection.')
    args = ap.parse_args()

    tcp_chk = CheckTcpConn(args.host, args.port)
    if args.poll:
        if not tcp_chk.poll(args.timeout):
            print('timed out waiting to connect:', tcp_chk.last_error(),
                  file=sys.stdout)
            return 1
    else:
        if not tcp_chk.try_connect(args.timeout):
            print('unable to connect:', tcp_chk.last_error(),
                  file=sys.stdout)
            return 1

    print('connected to %s:%s' % (args.host, args.port))
    return 0


if __name__ == '__main__':
    sys.exit(main())
