# npm-logbot

A little node program that tallies up the download counts from npm
registry log files, and uploads them to a couch database.

Allows for viewing download counts [by
day](https://isaacs.iriscouch.com/downloads/_design/app/_view/day?group_level=1)
and [by
package](https://isaacs.iriscouch.com/downloads/_design/app/_view/pkg?group_level=1&start_key=[%22express%22]&end_key=[%22express%22,{}])
and [by
both](https://isaacs.iriscouch.com/downloads/_design/app/_view/pkg?group_level=2&start_key=[%22mkdirp%22,%222012-07-14%22]&end_key=[%22mkdirp%22,%222012-07-16%22]).
