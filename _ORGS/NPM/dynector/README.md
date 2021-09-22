# dynector

[![Greenkeeper badge](https://badges.greenkeeper.io/npm/dynector.svg)](https://greenkeeper.io/)

A command-line client for adding & removing single nodes to your DynECT zone.

[![on npm](http://img.shields.io/npm/v/dynector.svg?style=flat)](https://www.npmjs.org/package/dynector)  [![Tests](http://img.shields.io/travis/npm/dynector.svg?style=flat)](http://travis-ci.org/npm/dynector)
[![Coverage Status](https://coveralls.io/repos/github/npm/dynector/badge.svg?branch=master)](https://coveralls.io/github/npm/dynector?branch=master)

## Usage

To run the tool you must set the following environment variables to your DynECT account credentials:

```
DYN_CUSTOMER
DYN_USER
DYN_PASSWORD
```

The commands offered are:

`dynector arecord foo.example.com 10.0.0.11`: add the A record `10.0.0.11` to foo.example.com, so that foo.example.com will resolve to 10.0.0.11

`dynector cname foo.example.com bar.example.com`: add `bar.example.com` as a CNAME for foo.example.com, so that bar will resolve to foo, which is resolved elsewhere.

`dynector delete gone.example.com`: remove all records for gone.example.com

`dynector list example.com`: list all records dynect has for the given zone, with types

`dynector resolve example.com`: resolve all records for the given zone & return a sorted list of IPs in use

Usage:

```
dynector: conveniences for interacting with the dynect API

Commands:
  arecord <fqdn> <ip>   make the given fqdn resolve to the given IP
  cname <fqdn> <cname>  make the given fqdn resolve to the given cname
  delete <fqdn>         remove the named node entirely
  list <zone>           list all records for the given zone
  resolve <zone>        resolve all records for the given zone; list the IPs

Options:
  --zone, -z     specify a zone
  --replace, -r  remove, then add the record                           [boolean]
  --version      Show version number                                   [boolean]
  --help         Show help                                             [boolean]

Examples:
  dynector arecord example.com 10.0.0.1
  dynector cname www.example.com example.com
  dynector cname oops.example.com example.com
  dynector delete oops.example.com
  dynector list example.com
  dynector resolve example.com
```

## License

[ISC](http://opensource.org/licenses/ISC)
