# github-monitor [![Build Status](https://travis-ci.org/neoziro/github-monitor.png?branch=master)](https://travis-ci.org/neoziro/github-monitor)

Monitor GitHub repository statuses.

<img src="https://f.cloud.github.com/assets/266302/1478873/982b8102-4674-11e3-8af0-c226eeabb468.png" width="570" alt="GitHub monitor example">

## Example

```sh
github-monitor -t my-github-token -r neoziro/github-monitor
```
## Install

```sh
npm install -g github-monitor
```

## Usage

```
  Usage: github-monitor [options]

  Options:

    -h, --help                 output usage information
    -V, --version              output the version number
    -t, --token <token>        GitHub access token
    -r, --references <values>  Monitored references (ex: neoziro/github-monitor#master,neoziro/hulkster#master)
    -p, --port [port]          HTTP listening port
    -R, --refresh [time]       Refresh time in seconds
    -T, --template [template]  Template to use
```

## License

MIT
