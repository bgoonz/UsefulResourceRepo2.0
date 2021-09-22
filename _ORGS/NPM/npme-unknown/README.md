# npmE Unknown OS Install Flow

This module does as much as it possibly can, to bootstrap an npmE installation on an unknown OS.

## Prerequisites

1. Your must have npm 2.x.x+ and Node 0.10.x installed on the server.
2. You must have Ansible 1.6+ installed on the server.
3. You must have Redis 2+ installed on the server.
4. You must have CouchDB 1.5+ installed on the server.
5. You must have nginx installed on the server.

## Production Notes

It's preferrable that you run on one of npm Enterprise's suppored platforms, which include:

* Ubuntu Trusty.
* Centos 6.5

## OSX

This installer can be used to bootstrap npmE on OSX for testing:

```bash
brew install couchdb
brew install nginx
brew install redis
sudo bash
git clone https://github.com/npm/npme.git
cd npme
node ./bin/npme.js install --user your-username --group staff
```

* once you've run the installer restart CouchDB and nginx.
* run the bin `/etc/npme/bin/install-couch-app.sh` top populate the CouchDB app.
