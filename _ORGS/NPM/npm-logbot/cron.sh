#!/bin/bash
# usage:
#   /usr/bin/bash cron.sh /home/node/.ssh/id_rsa_whatever
# run once per day to upload the previous day's logs

# exit on any errors
set -e
set -x

dir=$(dirname $0)
cd $dir

# also do the previous day, just to be safe
for n in '.1' '.2.gz'; do
  for ip in $(dig +short isaacs.iriscouch.com | grep ^[0-9]); do
    id=$1
    scp -i $id isaacs@$ip:~ubuntu/hosting/servers/isaacs/db/log/'*'$n ./$ip.log$n

    NODE_TLS_REJECT_UNAUTHORIZED=0 node upload.js $ip.log$n

    d=$(date '+%Y-%m-%d')

    if [ $n == '.1' ]; then
      scp -i $id $ip.log npmlogs@nodesecurity.io:logs/$ip-$d.log || true
    fi
  done
done
