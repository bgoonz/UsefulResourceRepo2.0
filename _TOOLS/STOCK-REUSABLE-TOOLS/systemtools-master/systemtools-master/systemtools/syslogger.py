"""
Setup logging handler to write syslog-like messages to file or to syslog.

Logging handlers can be set upto write to a file or to the system syslog
facility.  If writing to a file, then file rotation parameters are
configurable.

The logging handler is created and configured by calling one of the functions
in this module, and is then added to the logger specified by the base_name
argument.

All modules in a python program can use the logger and handler that is setup by
this module by doing the following:
    import logging
    logger = logging.getLogger(LOGGER_NAME)

In only one place, when the program first starts, does the logger need to be
configured with a handler by one of the functions in this module.

"""
__author__ = "Andrew Gillis"

import socket
import logging
import logging.handlers


def setup_file_logging(
    base_name, log_path=None, log_level=logging.INFO, show_name=False,
    log_perror=False, rotations=None, rotate_kb=None, rotate_time=None):
    """Configure and add file logging handler to logger with base_name.

    The log file written to is defined by the log_path parameter.
    If log_path is None, then log messages are sent to stdout.

    If rotations is set to a value other that None, the log rotation is
    enabled.  If rotate_size is specified, then the log file is rotated
    when it is near the specified size (in kB).  If rotate_time is
    specified (specified as a string 'when,interval'), then the log file is
    rotated on the given interval.  A log file may rotate by size or by
    time, but not both.  If both rotate_kb and rotate_time are specified,
    then rotate_time is ignored.  If both rotate_kb and rotate_time are
    None, then the log file will not be rotated.

    Arguments:
    base_name   -- Name of base logger (lowest in hierarchy).
    log_path    -- Path/name of file to write log entries to.
    log_level   -- Level value or name.  Write entries at or below this level.
    rotations   -- Number of rotated log files to keep.
    rotate_kb   -- Rotate when log file reaches this size.
    rotate_time -- Rotate log file on this interval.
    log_perror  -- Write log entries to stderr as well as file.
    show_name   -- Logger name is included in log message.  This is useful when
                   using a naming hierarchy to distinguish different sources of
                   of log message.  For example, base_name.moduel_name.

    Returns:
    logger object.  This logger object, or its descendents, can be retrieved by
    calling, logging.getLogger(logger_name), where logger_name is a
    hierarchical name beginning with the base_name, and having child name(s)
    separated by '.' (dot).

    """
    logger = logging.getLogger(base_name)
    logger.setLevel(_get_log_level_value(log_level))
    # Setup logging format
    if show_name:
        # Show logger name in log message.
        fmt='%(asctime)s %(name)s %(levelname)-8s %(message)s'
    else:
        fmt='%(asctime)s %(levelname)-8s %(message)s'
    log_formatter = logging.Formatter(fmt=fmt, datefmt='%c')

    # If logging to file.
    if log_path:
        file_handler = None
        if rotations is not None:
            assert(isinstance(rotations, int) and rotations >= 0)
            # If rotating at specified size.
            if rotate_kb:
                file_handler = logging.handlers.RotatingFileHandler(
                    log_path, 'a', int(rotate_kb) << 10, rotations)
            elif rotate_time:
                # If rotating at specified interval.
                when, interval = rotate_time.lower.split(',', 1)
                assert(when in ('s','m','h','d','w','midnight'))
                interval = int(interval)
                file_handler = logging.handlers.TimedRotatingFileHandler(
                    log_path, when, interval, rotations)

        if file_handler is None:
            file_handler = logging.FileHandler(log_path, 'a')

        file_handler.setFormatter(log_formatter)
        logger.addHandler(file_handler)
    else:
        # No log file specified, so log to stderr.
        log_perror = True

    # If logging to stderr enabled, then create additional stream handler.
    if log_perror:
        stream_handler = logging.StreamHandler()
        stream_handler.setFormatter(log_formatter)
        logger.addHandler(stream_handler)

    return logger


def setup_syslog_logging(
    base_name, log_level=logging.INFO, show_name=False, log_perror=False,
    address=None, port=None, facility=None, socktype=None):
    """Configure and add syslog logging handler to logger with base_name.

    Arguments:
    base_name   -- Name of base logger (lowest in hierarchy).
    log_level   -- Level value or name.  Write entries at or below this level.
    address     -- Syslog address, or path to unix domain socket.
    port        -- Port number if socktype is 'udp' or 'tcp'.
    facility    -- Syslog facility name.  Defaults to LOG_USER.
    socktype    -- One of: 'unix', 'udp', 'tcp'.  Defaults to 'unix'.
    log_perror  -- Write log entries to stderr as well as syslog.
    show_name   -- Logger name is included in log message.  This is useful when
                   using a naming hierarchy to distinguish different sources of
                   of log message.  For example, base_name.moduel_name.

    Returns:
    logger object.  This logger object, or its descendents, can be retrieved by
    calling, logging.getLogger(logger_name), where logger_name is a
    hierarchical name beginning with the base_name, and having child name(s)
    separated by '.' (dot).

    """
    logger = logging.getLogger(base_name)
    logger.setLevel(_get_log_level_value(log_level))
    if facility is not None:
        facility_num = logging.handlers.SysLogHandler.facility_names.get(
            facility)
        if facility_num is None:
            names = logging.handlers.SysLogHandler.facility_names.iterkeys()
            raise Exception('ERROR: unsupported syslog facility.  Must be '
                            'one of: %s' % ', '.join(names))
    else:
        facility_num = logging.handlers.SysLogHandler.LOG_USER

    if not socktype or socktype == 'unix':
        if not address:
            address = '/dev/log'
        else:
            address = str(address)
        syslog_handler = logging.handlers.SysLogHandler(
            address=address, facility=facility_num)
    else:
        if socktype == 'udp':
            if not port:
                port = logging.handlers.SysLogHandler.SYSLOG_UDP_PORT
            socktype = socket.SOCK_DGRAM
        elif socktype == 'tcp':
            if not port:
                port = logging.handlers.SysLogHandler.SYSLOG_TCP_PORT
            socktype = socket.SOCK_STREAM
        else:
            raise Exception('ERROR: unsupported socket type: %s'%socktype)

        if not address:
            address = 'localhost'

        syslog_handler = logging.handlers.SysLogHandler(
            address=(address, int(port)), facility=facility_num,
            socktype=socktype)

    # Setup logging format
    if show_name:
        # Show logger name in log message.
        fmt = base_name + ': %(name)s %(levelname)-8s %(message)s'
    else:
        fmt = base_name + ': %(levelname)-8s %(message)s'
    log_formatter = logging.Formatter(fmt=fmt, datefmt='%c')

    syslog_handler.setFormatter(log_formatter)
    logger.addHandler(syslog_handler)

    # If logging to stderr, then create additional stderr stream handler.
    if log_perror:
        stream_handler = logging.StreamHandler()
        stream_handler.setFormatter(log_formatter)
        logger.addHandler(stream_handler)

    return logger


def _get_log_level_value(log_level):
    if not isinstance(log_level, str):
        # Log level is not string, so make sure value is int.
        return int(log_level)

    # Convert level name to value.
    log_level = log_level.lower()
    if log_level == 'debug':
        return logging.DEBUG
    if log_level == 'info':
        return logging.INFO
    if log_level == 'warning':
        return logging.WARNING
    if log_level == 'error':
        return logging.ERROR
    if log_level == 'critical':
        return logging.CRITICAL

    raise Exception('ERROR: unsupported log level: %s' % log_level)



