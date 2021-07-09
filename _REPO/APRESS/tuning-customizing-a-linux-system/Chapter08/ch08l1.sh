#!/bin/sh
# chkconfig: 345 25 25
# description: Manages the OpenSSH sshd server.

[ -x /usr/local/sbin/sshd ] || exit 0

RC=0

start () {
    echo $"Starting sshd."
    /usr/local/sbin/sshd
    return 0
}

stop () {
    echo $"Stopping sshd."
    [ -e /var/run/sshd.pid ] && kill -TERM `cat /var/run/sshd.pid`
    RC=$?
    return $RC
}

restart () {
    stop
    start
    RC=$?
    return $RC
}

# See how we were called.
case "$1" in
    start)
        start
        ;;
    stop)
        stop
        ;;
    restart)
        restart
        ;;
    *)
        echo $"Usage: $0 {start|stop|restart}"
        RETVAL=1
esac

exit $RETVAL