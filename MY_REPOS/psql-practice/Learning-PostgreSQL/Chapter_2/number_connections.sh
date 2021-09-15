#!/bin/bash
connection_number=`PGOPTIONS='--statement_timeout=0' psql -AqXt -c "SELECT count(*) FROM pg_stat_activity"`
case $connection_number in
[1-50]*)
	echo "OK - $connection_number are used"
	exit 0
	;;
[50-100]*)
	echo "WARNING - $connection_number are used"
	exit 1
;;
# rest of case conditions ...
esac
