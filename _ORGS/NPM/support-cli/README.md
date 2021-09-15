support-cli
===========

Many common problems can be solved with one of these steps:

## Try the latest stable version of node

Node 0.4 and 0.6 are [no longer supported](https://github.com/npm/npm/issues/4379#issuecomment-31183058).

If you're experiencing issues while using a version of node which is unsupported (e.g 0.4.x or 0.6.x) or unstable (odd numbered versions e.g. 0.7.x, 0.9.x, 0.11.x), it's very possible your issue will be fixed by simply [using the latest stable version of node](https://gist.github.com/isaacs/579814)!

### See what version of node you're running:

```
node -v
```

### See what version of npm you're running:

```
npm -v
```

## Try the latest stable version of npm

You can upgrade to the latest version of npm using:

```
npm install -g npm@latest
```

Note: You may need to prefix this command with `sudo`

### Upgrading on Windows

By default, npm is installed alongside node in `C:\Program Files (x86)\nodejs`. npm's globally installed packages (including, potentially, npm itself) are stored separately in a user-specific directory (which is currently `C:\Users\<username>\AppData\Roaming\npm`). Because the installer puts `C:\Program Files (x86)\nodejs`  before `C:\Users\<username>\AppData\Roaming\npm` on your `PATH`, it will always use version of npm installed with node instead of the version of npm you installed using `npm -g install npm@<version>`. To get around this, you can do **one** of the following:

* Option 1: [edit your Windows installation's `PATH`](http://superuser.com/questions/284342/what-are-path-and-other-environment-variables-and-how-can-i-set-or-use-them) to put `C:\Users\<username>\AppData\Roaming\npm` before `C:\Program Files (x86)\nodejs`.
Remember that you'll need to restart `cmd.exe` (and potentially restart Windows) when you make changes to `PATH` or how npm is installed.

* Option 2: remove both of
	* `C:\Program Files (x86)\nodejs\npm`
	* `C:\Program Files (x86)\nodejs\npm.cmd`

* Option 3: navigate to `C:\Program Files (x86)\nodejs` with `cmd.exe` and then run the installation *without `-g`*:

```bash
npm install npm
```

*(See also the [point below](https://github.com/npm/npm/wiki/Troubleshooting#error-enoent-stat-cusersuserappdataroamingnpm-on-windows-7) if you're running Windows 7 and don't have the directory `C:\Users\<username>\AppData\Roaming\npm`.)*

#### A brief note on the built-in Windows configuration

The Node installer installs, directly into the npm folder, a special piece of Windows-specific configuration that tells npm where to install global packages. When npm is used to install itself, it is supposed to copy this special `builtin` configuration into the new install. There was a bug in some versions of npm that kept this from working, so you may need to go in and fix that up by hand. If `%APPDATA%\npm\node_modules\npm\npmrc` does not exist, you'll need to create it yourself. (`%APPDATA%` defaults to `<X>:\Users\<user>\AppData\Roaming`). All you need to put in that file is:

```ini
prefix=${APPDATA}/npm
```

Incidentally, if you would prefer that packages not be installed to your roaming profile (because you have a quota on your shared network, or it makes logging in or out from a domain sluggish), you can put it in your local app data instead:

```ini
prefix=${LOCALAPPDATA}/npm
```

...as well as copying `%APPDATA%\npm` to `%LOCALAPPDATA%\npm` (and updating your `%PATH%`, of course).

Everyone who works on npm knows that this process is complicated and fraught, and we're working on making it simpler. Stay tuned.

## If your npm is broken

Reinstall npm:

```
curl https://www.npmjs.org/install.sh | sh
```

If you're on Windows and you have a broken installation, the easiest thing to do is to reinstall node from the official installer (remember [this note](https://github.com/npm/npm/wiki/Troubleshooting#upgrading-on-windows)).

## Try clearing the npm cache

Sometimes npm's cache gets confused. You can reset it using:

```
npm cache clean
```

------

## Common Errors

### No compatible version found

You have an outdated npm. [Please update to the latest stable npm](https://github.com/npm/npm/wiki/Troubleshooting#try-the-latest-stable-version-of-npm).

### Permission Error

```
npm ERR! code EPERM
```

```
npm ERR! code EACCES
```

* Fix the permissions of your cache with `sudo chown -R $(whoami) "$HOME/.npm"`.
* Try again with `sudo`. e.g. `sudo npm install express -g`. (You'll probably need to fix cache permissions afterwards, as above).
* [Reinstall node so it doesn't require sudo](https://gist.github.com/isaacs/579814).

### Travis projects using 0.8 can't upgrade to npm 2

In your `.travis.yml` replace this: 

``` yaml
before_install:
- npm install -g npm@latest
```

with this: 

``` yaml
before_install:
- '[ "${TRAVIS_NODE_VERSION}" != "0.8" ] || npm install -g npm@1.4.28'
- npm install -g npm@latest
```

This suggestion is based on [this Travis issue](https://github.com/travis-ci/travis-ci/issues/1785#issuecomment-31253761) and comes courtesy [@simondean](https://github.com/simondean).

### `Error: ENOENT, stat 'C:\Users\<user>\AppData\Roaming\npm'` on Windows 7

This is a consequence of [joyent/node#8141](https://github.com/joyent/node/issues/8141), and is an issue with the Node installer for Windows. The workaround is to ensure that `C:\Users\<user>\AppData\Roaming\npm` exists and is writable with your normal user account.

### No space

```
npm ERR! Error: ENOSPC, write
```

You are trying to install on a drive that either has no space, or has no permission to write.

* Free some disk space or
* Set the tmp folder somewhere with more space: `npm config set tmp /path/to/big/drive/tmp` or
* Build Node yourself and install it somewhere writable with lots of space.

### No git

```
npm ERR! not found: git
ENOGIT
```

You need to [install git](http://git-scm.com/book/en/Getting-Started-Installing-Git).

### npm only uses `git:` and `ssh+git:` URLs for GitHub repos, breaking proxies

**[@LaurentGoderre](https://github.com/LaurentGoderre)** fixed this with [some Git trickery](https://github.com/npm/npm/issues/5257#issuecomment-60441477):

> I fixed this issue for several of my colleagues by running the following two commands:
> 
> ```
> git config --global url."https://github.com/".insteadOf git@github.com:
> git config --global url."https://".insteadOf git://
> ```
> 
> One thing we noticed is that the `.gitconfig` used is not always the one expected so if you are on a machine that modified the home path to a shared drive, you need to ensure that your `.gitconfig` is the same on both your shared drive and in `c:\users\[your user]\`

### SSL Error

```
npm ERR! Error: 7684:error:140770FC:SSL routines:SSL23_GET_SERVER_HELLO:unknown protocol:openssl\ssl\s23_clnt.c:787:
```

You are trying to talk SSL to an unencrypted endpoint. More often than not, this is due to a [proxy](https://www.npmjs.org/doc/misc/npm-config.html#proxy) [configuration](https://www.npmjs.org/doc/misc/npm-config.html#https-proxy) [error](https://www.npmjs.org/doc/misc/npm-config.html#cafile) (see also [this helpful, if dated, guide](http://jjasonclark.com/how-to-setup-node-behind-web-proxy)). In this case, you do **not** want to disable `strict-ssl` – you may need to set up a CA / CA file for use with your proxy, but it's much better to take the time to figure that out than disabling SSL protection.

```
npm ERR! Error: SSL Error: CERT_UNTRUSTED
```

```
npm ERR! Error: SSL Error: UNABLE_TO_VERIFY_LEAF_SIGNATURE
```

This problem will happen if you're running Node 0.6. Please upgrade to node 0.8 or above. [See this post for details](http://blog.npmjs.org/post/71267056460/fastly-manta-loggly-and-couchdb-attachments).

You could also try these workarounds: `npm config set ca ""` or `npm config set strict-ssl false`

```
npm ERR! Error: SSL Error: SELF_SIGNED_CERT_IN_CHAIN
```

[npm no longer supports its self-signed certificates](http://blog.npmjs.org/post/78085451721/npms-self-signed-certificate-is-no-more)

Either:

* upgrade your version of npm `npm install npm -g --ca=""`
* tell your current version of npm to use known registrars `npm config set ca=""`

### Not found / Server error

```
npm http 404 https://registry.npmjs.org/faye-websocket/-/faye-websocket-0.7.0.tgz
npm ERR! fetch failed https://registry.npmjs.org/faye-websocket/-/faye-websocket-0.7.0.tgz
npm ERR! Error: 404 Not Found
```

```
npm http 500 https://registry.npmjs.org/phonegap
```

* It's most likely a temporary npm registry glitch. Check [npm server status](http://status.npmjs.org/) and try again later.
* If the error persists, perhaps the published package is corrupt. Contact the package owner and have them publish a new version of the package.

### Invalid JSON

```
Error: Invalid JSON
```

```
npm ERR! SyntaxError: Unexpected token <
```

```
npm ERR! registry error parsing json
```

* Possible temporary npm registry glitch, or corrupted local server cache.
Run `npm cache clean` and/or try again later. 
* This can be caused by corporate proxies that give HTML
responses to `package.json` requests. Check npm's proxy [configuration](https://npmjs.org/doc/misc/npm-config.html).
* Check that it's not a problem with a package you're trying to install
(e.g. invalid `package.json`).

### Many `ENOENT` / `ENOTEMPTY` errors in output

npm is written to use resources efficiently on install, and part of this is that it tries to do as many things concurrently as is practical. Sometimes this results in race conditions and other synchronization issues. As of npm 2.0.0, a very large number of these issues were addressed. If you see `ENOENT lstat`, `ENOENT chmod`, `ENOTEMPTY unlink`, or something similar in your log output, try updating npm to the latest version. If the problem persists, look at [npm/npm#6043](https://github.com/npm/npm/issue/6043) and see if somebody has already discussed your issue.

### `cb() never called!` when using shrinkwrapped dependencies

Take a look at [issue #5920](https://github.com/npm/npm/issue/5920). We're working on fixing this one, but it's a fairly subtle race condition and it's taking us a little time. You might try moving your `npm-shrinkwrap.json` file out of the way until we have this fixed.

### Other

* Some strange issues can be resolved by simply running `npm cache
clean` and trying again.
* When you're setting configs, you're doing it for your OWN user. If you're using `sudo` you're running the command as the ROOT user. Try rerunning any `npm config` commands with `sudo`
