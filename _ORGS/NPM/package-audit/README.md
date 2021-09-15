# npm 2014 package audit

A security hole was open in npm for a long time.

There is no evidence that any packages were maliciously updated, but
absence of evidence is only evidence of absence if you try hard to
find some evidence.

This thing crawls over all packages in the npm Manta store whose last
published date was prior to 2014-03-01.  For each one, it unpacks the
latest tarball, and attempts to compare each of the files to what is
in the git repo (if listed) at the specific tag associated with that
version (if such a tag exists).

Any package published after March 1 is considered safe.  Because we
are only crawling packages that are *not* updated recently, this
results in a much higher rate of abandoned packages, packages that
don't have valid git repositories, etc.

Because `npm publish -f` was still a thing up until this time, there
are a lot of packages where what's on the registry is subtly different
than the tagged commit in git.  Incidentally, this gives us some
interesting insight into what package authors consider to be
"insignificant" change.

The numbers show mostly inconsistent user-created data, which we'll
continue to try to scrub as best as we can.  I think that the best
long-term solution is to build crawlers like this that nag authors to
correct their failing GitHub links.  In many cases, it looks like the
git repo links are to private GitHub repositories, which is of course
rather odd for packages published to npm, but that's what we have to
work with.

In cases where the release tag could not be found, we compare the
package to the git master HEAD.  This results in a lot of false
positives, unfortunately.

Results:

* Total packages analyzed: 66608
* Packages published since 2014-03-01 (and thus probably safe anyway): 10177
* Packages lacking a git repo: 12376
* Packages with an invalid git repo (failed to clone): 49335
* Packages with a valid git repo, but missing the release tag: 2582
* Packages confirmed matching their git repo: 2887
* Packages with some change between git and npm: 4663 (including those
  missing a release tag.  721 otherwise)

Files included in this repo:

* `results.txt` The analysis of all packages whose last published date
  is before 2014-03-01.
* `results-no-tag.txt` The analysis of all packages published before
  2014-03-01, who did not have a tagged release in their git repo.
* `results-with-new.txt` The analysis of all packages that exist now,
  regardless of their publish date.

## Changed Files

In packages where the release tag could be found, the overwhelming
majority of changed files are for tests and documentation.  The
instances of functional changes all appear to be a result of
well-intended bug-fixing.  (Again: `npm publish -f` was a *really* bad
idea.  So glad that antipattern is no more.)

Here are the top 20 filenames that were modified:

    $ egrep '^not ok' results.txt | grep ' package/' | awk -F'package/' '{print $2}' | sort | uniq -c | sort -rn | head -n20
      97 README.md
      14 LICENSE.txt
      11 .travis.yml
       9 index.js
       8 Readme.md
       7 .npmignore
       5 Makefile
       5 Gruntfile.js
       3 readme.md
       3 index.html
       3 bower.json
       3 CHANGELOG.md
       2 test/test.js
       2 test/index.html
       2 lib/client.js
       2 docs/index.html
       2 component.json
       2 README.markdown
       2 README
       2 LICENSE.md

In packages where a release tag could not be found, the modified files
are a bit more diverse, but still follow the same pattern of being
overwhelmingly about updating docs and tests.

    $ egrep '^not ok' results*.txt | grep ' package/' | awk -F'package/' '{print $2}' | sort | uniq -c | sort -rn | head -n40
     361 README.md
      48 index.js
      36 .travis.yml
      19 readme.md
      17 Readme.md
      15 LICENSE.txt
      15 .npmignore
      13 lib/index.js
      13 Makefile
      13 Gruntfile.js
       7 test.js
       7 bower.json
       7 CHANGELOG.md
       6 test/test.js
       6 test/index.js
       6 server.js
       6 lib/main.js
       6 index.html
       6 README.markdown
       6 LICENSE
       6 .gitignore
       5 lib/utils.js
       5 README
       5 Cakefile
       4 public/index.html
       4 lib/server.js
       4 lib/cli.js
       4 component.json
       4 LICENSE.md
       4 History.md
       3 test/integration.js
       3 test/index.html
       3 module.json
       3 lib/client.js
       3 grunt.js
       3 app.js
       2 wscript
       2 test/mocha.opts
       2 test/main.js
       2 static/index.html

## Todo

There's still a lot of gruntwork to be done evaluating all the
packages where the contents in git don't match what's on npm.  So far,
we have found no evidence of bad behavior, but it would be great to
have more eyeballs on this.

You can see all the result data in this repo.  The next step is to
create a backlog of packages to be manually checked by human beings.
