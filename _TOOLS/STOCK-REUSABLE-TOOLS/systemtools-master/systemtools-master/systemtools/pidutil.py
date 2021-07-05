"""
Module with ulility functions for working with PID files and processes.

"""
from __future__ import print_function

import os
import atexit
import platform
import subprocess
import time
import signal
import errno


def read_pid_file(filename):
    if os.path.exists(filename):
        try:
            with open(filename) as f:
                data = f.read()
            return int(data.strip())
        except (ValueError, IOError):
            pass

    return None


def remove_pid_file(filename):
    """Remove the specified PID file if it exists.

    Return:
    True if file was removed.  False if no file or file not removed.

    """
    if os.path.isfile(filename):
        try:
            os.unlink(filename)
            return True
        except:
            pass

    return False


def write_pid_file(filename, remove_at_exit=False):
    """Write current PID to specified file.  Remove file at exit if indicated.

    """
    pid = os.getpid()
    with open(filename, 'w') as pid_file:
        pid_file.write(str(pid))

    if remove_at_exit:
        atexit.register(remove_pid_file, filename)


def wait_for_file(filename, timeout):
    """Wait for the specified file to exist, or timeout.

    Arguments:
    filename -- Name of file to wait for.
    timeout  -- Seconds to wait for file.  If None, wait forever.

    Return:
    True if file exists.  False is timeout waiting for file.

    """
    if timeout:
        timeout_at = time.time() + timeout
    while True:
        if os.path.isfile(filename):
            return True
        time.sleep(.5)
        if timeout and time.time() >= timeout_at:
            break

    return False


def is_process_alive(pid, command):
    """Read process info and see if process exists and has indicated command.

    It is not sufficient to just check if the process exists, because there may
    be another different process with the same pid.

    """
    is_windows = platform.system() == 'Windows'
    if not is_windows:
        # Check if there is a running process with the specified pid.
        try:
            os.kill(int(pid), 0)
        except OSError as e:
            if e.errno != errno.EPERM:
                return False

        if not command:
            return True

    pid_cmd_map = get_pid_command_map()
    cmd = pid_cmd_map.get(int(pid), None)
    if cmd is None:
        return False

    if command and cmd.find(command) == -1:
        return False

    return True


def wait_for_pid_to_die(pid, timeout):
    """Wait until the specified PID is not running, or timeout.

    Arguments:
    pid      -- Process ID to wait for.
    timeout  -- Seconds to wait for pid.  If None, wait forever.

    Return:
    True if file exists.  False is timeout waiting for file.

    """
    if timeout:
        expiration = time.time() + timeout
    while True:
        if platform.system() == 'Windows':
            if not is_process_alive(pid, None):
                return True
        else:
            try:
                os.kill(pid, 0)
            except OSError as e:
                if e.errno == errno.EPERM:
                    # No permission to kill file.
                    return False
                return True

        if timeout and time.time() >= expiration:
            return False
        time.sleep(1)


def get_status(pid_file, command=None):
    """Get process status.

    Arguments:
    pid_file -- Name of file that process ID is stored in.
    command  -- Optional command to verify with process id.

    Return:
    (status, message) -- Where status is True is process running, False if not.
    message is a atatus message string.

    """
    if not os.path.exists(pid_file):
        return False, 'no pid file: %s' % (pid_file,)
    pid = read_pid_file(pid_file)
    if not pid:
        return False, 'no pid in file %s' % (pid_file,)
    if is_process_alive(pid_file, command):
        return False, 'pid %s in %s is not running' % (pid, pid_file)

    return True, 'process running with pid %s' % (pid,)


def kill_process(pid):
    """Terminate the process that has the specified PID.

    Return:
    True if process was running and was killed.  Otherwise, False.

    """
    assert(isinstance(pid, int))
    if platform.system() == 'Windows':
        sigs = (signal.SIGINT, signal.SIGTERM)
    else:
        sigs = (signal.SIGINT, signal.SIGTERM, signal.SIGKILL)

    # Try progressively harsher signals until death of pid.
    for sig in sigs:
        try:
            os.kill(pid, sig)
        except:
            return False
        if wait_for_pid_to_die(pid, 5):
            return True

    return False


def get_pid_command_map():
    is_windows = platform.system() == 'Windows'

    # Look at processes to see if process with matching pid is running the
    # specified command.  This is necessary because, some other process may
    # have started and been assigned the pid that was saved in the pid file.
    if is_windows:
        args = ['wmic', 'process', 'get', 'processid,commandline']
    else:
        args = ['ps', 'ww', '-o', 'pid', '-o', 'command']

    try:
        psout = subprocess.check_output(args).decode('utf-8')
    except Exception:
        return {}

    lines = psout.split('\n')
    col_names = lines.pop(0)
    if is_windows:
        col_names = col_names.strip()

    # Get column two label
    col2 = col_names.split()[1]
    # Determine where column two starts and column 1 ends.
    col2_start = col_names.find(col2)
    col1_end = col2_start - 1
    # Create functions to get column one and two.
    get_col1 = lambda l: l[:col1_end].strip()
    get_col2 = lambda l: l[col2_start:].strip()

    # Determine if process ID is in column one or two.
    if is_windows:
        pid_last = col2.lower() == 'processid'
    else:
        pid_last = col2.lower() == 'pid'

    if pid_last:
        get_pid = get_col2
        get_cmd = get_col1
    else:
        get_pid = get_col1
        get_cmd = get_col2

    return {int(get_pid(line)): get_cmd(line) for line in lines if line}


if __name__ == '__main__':
    pid_cmd_map = get_pid_command_map()
    for pid in pid_cmd_map:
        print('%s:\t\t%s' % (pid, pid_cmd_map[pid]))
