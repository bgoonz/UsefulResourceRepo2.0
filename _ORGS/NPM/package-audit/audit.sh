#!/bin/bash

set -e
set -x

limit=""
#limit="-l 500"

one=""
#one="cukecoffeebone"


# first, get a list of all latest versions published before 2014-03-01
#mfind $limit -t o -n 'doc.json' ~~/public/registry/$one > docs.txt

#cp docs.txt{,-$(date +%s)}

mput -f select.js ~~/stor/select.js

cat docs.txt | mjob create \
  -s '/npm/stor/select.js' \
  -m 'node /assets/npm/stor/select.js' \
  -r 'cat'
