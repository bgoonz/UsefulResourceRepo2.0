# Heroku Buildpack: Ø

Use Ø if you need heroku to execute a binary.

## Usage

```bash
$ mkdir -p proj/bin

# make a run file that looks like this:
$ cat proj/bin/run
#!/usr/bin/env bash
echo hi from proj

# make a procfile that looks like this:
$ cat proj/Procfile
proj: bin/run

$ cd proj

$ heroku create -s cedar --buildpack http://github.com/ryandotsmith/null-buildpack.git

...

$ git push heroku master

...

$ heroku run proj
hi from proj
```

## Motivation

I wanted to run [wcld](https://github.com/ryandotsmith/wcld) without compiling it in the cloud.
So, I compiled wcld on my linux 64 machine, committed the binary to a git repo and pushed it to heroku.

## Issues

You will need to make sure that a 64bit linux machine can execute the binary.