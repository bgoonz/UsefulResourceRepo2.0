# couch-read-replica

A CouchDB replicator that also replicates the pre-generated view data.

It does this by using rsync whenever it encounters a design doc in the
changes feed.  As a result, it is **very important** that the
destination database be truly read-only.  If you are putting records
into the database via any other means, then Bad Things may happen.

By default, it copies ALL databases on the server.  The intent is to
make the replica a full copy of everything that the origin.  You can
configure this with the `dbs` option.  If not set, then it'll read
`/_all_dbs` from the remote server.

If you are using this in production, make sure that you use [the copy
trick](http://wiki.apache.org/couchdb/How_to_deploy_view_changes_in_a_live_environment)
with your production design docs.  If you do, then the production
design doc will only be copied over once the view data is copied as
well.  Using the copy trick ensures that the production design doc
will not be copied until its view data is transferred as well.  So,
the read-only replicas will serve stale views for a brief time, but
they'll never be completely unavailable.

## USAGE

```js
// must be run directly on the machine where couch runs.
// otherwise rsyncing won't do much good!

var Replica = require('couch-read-replica')
var r = new Replica({
  // must provide a sequence file
  // Actual files will be suffixed with the name of each db
  seqFile: 'my-replica.seq',

  // private ssh key file to use with rsync
  // ~ is ok if $HOME is set, but `~otheruser/...` won't work
  sshKey: '~/.ssh/id_rsa',

  // The user that we'll log into the other machine as.
  // defaults to $USER environ
  remoteUser: process.env.USER,

  // The url to the couch *instance*, not a single db
  remoteCouch: 'https://couchuser:couchpass@otherbox.com/',

  // The url to the couch instance on this box
  // almost certainly will need some kind of admin creds
  localCouch: 'http://admin:secretpassword@localhost:15984'
})
```
