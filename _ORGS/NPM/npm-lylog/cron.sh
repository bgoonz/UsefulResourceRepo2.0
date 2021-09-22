#!/bin/bash

# Pull out download numbers, then rotate all logs into manta.

set -e

export MANTA_KEY_ID=55:5e:9a:bc:42:59:df:cb:ad:00:54:f6:59:53:20:83
export MANTA_USER=npm
export MANTA_URL=https://us-east.manta.joyent.com
export CDPATH=

cd $(dirname $0)
base="$(svcs -L npm-lylog)"
for log in $base $base.*; do
  if [ -f "$log" ]; then
    file="$(basename $log)"
    file="${file//:/_}"
    cp "$log" "$file"
    if ! [ "$log" == "$base" ]; then
      rm $log
    else
      echo -n "" > "$log"
    fi
    node upload.js "$file" || ( cp $file $log; rm $file; exit 1 )

    if [ "$(basename "$file" .gz)" == "${file}" ]; then
      gzfile="${file}.gz"
      gzip -9 <$file >$gzfile
    else
      gzfile="${file}"
    fi
    d=$(date '+%Y-%m-%d-%s')
    mput -f $gzfile /npm/stor/logs/$d.$gzfile
    rm -f $gzfile
    rm $file
  fi
done
