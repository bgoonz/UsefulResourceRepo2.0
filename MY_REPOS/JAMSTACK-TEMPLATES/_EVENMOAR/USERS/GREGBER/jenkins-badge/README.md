# jenkins-badge

# This plugin is no longer actively maintained, you can still use it but issues will not be resolved. If you want the npm name, you can contact me by email.

[![Build Status](https://travis-ci.org/neoziro/jenkins-badge.svg?branch=master)](https://travis-ci.org/neoziro/jenkins-badge)
[![Dependency Status](https://david-dm.org/neoziro/jenkins-badge.svg?theme=shields.io)](https://david-dm.org/neoziro/jenkins-badge)
[![devDependency Status](https://david-dm.org/neoziro/jenkins-badge/dev-status.svg?theme=shields.io)](https://david-dm.org/neoziro/jenkins-badge#info=devDependencies)

Generate status badges from Jenkins build.

## Install

```
npm install jenkins-badge
```

## Usage

```sh
  Usage: jenkins-badge [options]

  Options:

    -h, --help         output usage information
    -V, --version      output the version number
    -u, --url <url>    Jenkins url (http://user@password:url:port) <url>
    -p, --port [port]  Port (default 2323)
    --no-strict        Use non-strict SSL
```

Then you can include this type of markdown in your page:

```
[![Build status](http://yourjenkins.com/job/your-job)](http://yourjenkins.com:2323/your-job)
```

The result will be:

![Build status](http://img.shields.io/badge/job-passing-brightgreen.svg)
![Build status](http://img.shields.io/badge/job-failing-red.svg)
![Build status](http://img.shields.io/badge/job-unknown-lightgrey.svg)

## License

MIT
