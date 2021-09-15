var nodegit = require("nodegit");
Promise.promisifyAll(nodegit);
var fse = require("fs-extra");
Promise.promisifyAll(fse);
var path = "./../../../..";

exports.git = (function () {
  var parentFn = "git:";
  var log = require("debug")(parentFn);
  log("");

  var createNewRepo = function () {
    var nodegit = require("../");
    var path = require("path");
    var promisify = require("promisify-node");
    var fse = promisify(require("fs-extra"));
    var fileName = "newfile.txt";
    var fileContent = "hello world";
    var repoDir = "../newRepo";

    fse.ensureDir = promisify(fse.ensureDir);

    var repository;
    var index;

    fse
      .ensureDir(path.resolve(__dirname, repoDir))
      .then(function () {
        return nodegit.Repository.init(path.resolve(__dirname, repoDir), 0);
      })
      .then(function (repo) {
        repository = repo;
        return fse.writeFile(
          path.join(repository.workdir(), fileName),
          fileContent
        );
      })
      .then(function () {
        return repository.openIndex();
      })
      .then(function (idx) {
        index = idx;
        return index.read(1);
      })
      .then(function () {
        return index.addByPath(fileName);
      })
      .then(function () {
        return index.write();
      })
      .then(function () {
        return index.writeTree();
      })
      .then(function (oid) {
        var author = nodegit.Signature.create(
          "Scott Chacon",
          "schacon@gmail.com",
          123456789,
          60
        );
        var committer = nodegit.Signature.create(
          "Scott A Chacon",
          "scott@github.com",
          987654321,
          90
        );

        // Since we're creating an inital commit, it has no parents. Note that unlike
        // normal we don't get the head either, because there isn't one yet.
        return repository.createCommit(
          "HEAD",
          author,
          committer,
          "message",
          oid,
          []
        );
      })
      .done(function (commitId) {
        console.log("New Commit: ", commitId);
      });
  };

  /**
   * clone git repo into /repo folder
   */
  var cloneRepo = function (url, commit, entry) {
    var fn = "cloneRepo";
    var log = require("debug")(parentFn + fn);
    log("");
    log(arguments);

    var options = {
      // github will fail cert check on some OSX machines
      // this overrides that check
      remoteCallbacks: {
        certificateCheck: function () {
          return 1;
        },
      }, // remoteCallbacks
    }; // options

    // Promise.promisifyAll(nodegit.Clone)
    log("starting fse.removeAsync");
    // remove file path
    return (
      fse
        .removeAsync(path)
        // .tap(log)
        // clone respository
        .then(function () {
          return nodegit
            .Clone(url, path, options)
            .then(function (repo) {
              log("repo", repo);
            })
            .done();
          // .done(function() { log('done'); finished() })
        })
        .tap(log)
        .then(function () {
          return url, path;
        })
        .tap(log)
        .catch(function (err) {
          log("error", err);
        })
    );
  }; // clone

  var walkTree = function () {
    var fn = "walkTree:";
    var log = require("debug")(parentFn + fn);
    log("");

    // A `tree` in git is typically a representation of the filesystem at
    // a revision. A tree has a set of entries, each entry being either a
    // tree (directory), or a file.

    nodegit.Repository.open(path.resolve(__dirname, "../.git"))
      .then(function (repo) {
        return repo.getMasterCommit();
      })
      .then(function (firstCommitOnMaster) {
        return firstCommitOnMaster.getTree();
      })
      .then(function (tree) {
        // `walk()` returns an event.
        var walker = tree.walk();
        walker.on("entry", function (entry) {
          console.log(entry.path());
        });

        // Don't forget to call `start()`!
        walker.start();
      })
      .done();
  }; // walkTree

  var createBranch = function (url) {
    nodegit.Repository.open(path.resolve(__dirname, "../.git"))
      .then(function (repo) {
        // Create a new branch on head
        return repo.getHeadCommit().then(function (commit) {
          return repo.createBranch(
            "new-branch",
            commit,
            0,
            repo.defaultSignature(),
            "Created new-branch on HEAD"
          );
        });
      })
      .done(function () {
        console.log("All done!");
      });
  }; // createBranch

  var createNewRepo = function (url, path) {
    var fn = "cloneRepo";
    var log = require("debug")(parentFn + fn);
    log("");
    log(arguments);

    var path = require("path");
    var fileName = "newfile.txt";
    var fileContent = "hello world";
    var repoDir = "../tmp/newRepo";

    var repository;
    var index;

    return fse
      .ensureDirAsync(path.resolve(__dirname, repoDir))
      .tap(log)
      .then(function () {
        log("init");
        return nodegit.Repository.init(path.resolve(__dirname, repoDir), 0);
      })
      .tap(log)
      .then(function (repo) {
        log("writeFile");
        repository = repo;
        return fse.writeFile(
          path.join(repository.workdir(), fileName),
          fileContent
        );
      })
      .tap(log)
      .then(function () {
        return repository.openIndex();
      })
      .tap(log)
      .then(function (idx) {
        index = idx;
        return index.read(1);
      })
      .tap(log)
      .then(function () {
        return index.addByPath(fileName);
      })
      .tap(log)
      .then(function () {
        return index.write();
      })
      .tap(log)
      .then(function () {
        return index.writeTree();
      })
      .tap(log)
      .then(function (oid) {
        var author = nodegit.Signature.create(
          "Scott Chacon",
          "schacon@gmail.com",
          123456789,
          60
        );
        var committer = nodegit.Signature.create(
          "Scott A Chacon",
          "scott@github.com",
          987654321,
          90
        );

        // Since we're creating an inital commit, it has no parents. Note that unlike
        // normal we don't get the head either, because there isn't one yet.
        return repository.createCommit(
          "HEAD",
          author,
          committer,
          "message",
          oid,
          []
        );
      })
      .tap(log)
      .done(function (commitId) {
        console.log("New Commit: ", commitId);
      })
      .catch(function (err) {
        log("error", err);
      });
  }; // createNewRepo

  /**
   * fork
   */
  var fork = function (url, commit, entry) {
    var fn = "fork:";
    var log = require("debug")(parentFn + fn);
    log("");
    log(url);
    // first clone
    cloneRepo(url, commit, entry)
      .tap(log)
      // then create a repo
      .then(createNewRepo)
      .catch(function (err) {
        log("error", err);
      });
  };

  var pull = function (url) {
    var nodegit = require("../");
    var path = require("path");

    var repoDir = "../../test";

    var repository;

    // Open a repository that needs to be fetched and fast-forwarded
    nodegit.Repository.open(path.resolve(__dirname, repoDir))
      .then(function (repo) {
        repository = repo;

        return repository.fetchAll({
          credentials: function (url, userName) {
            return nodegit.Cred.sshKeyFromAgent(userName);
          },
          certificateCheck: function () {
            return 1;
          },
        });
      })
      // Now that we're finished fetching, go ahead and merge our local branch
      // with the new one
      .then(function () {
        return repository.mergeBranches("master", "origin/master");
      })
      .done(function () {
        console.log("Done!");
      });
  }; // pull

  var addAndCommit = function () {
    var nodegit = require("../");
    var path = require("path");
    var promisify = require("promisify-node");
    var fse = promisify(require("fs-extra"));
    var fileName = "newfile.txt";
    var fileContent = "hello world";
    var directoryName =
      "salad/toast/strangerinastrangeland/theresnowaythisexists";
    // ensureDir is an alias to mkdirp, which has the callback with a weird name
    // and in the 3rd position of 4 (the 4th being used for recursion). We have to
    // force promisify it, because promisify-node won't detect it on its
    // own and assumes sync
    fse.ensureDir = promisify(fse.ensureDir);

    /**
     * This example creates a certain file `newfile.txt`, adds it to the git
     * index and commits it to head. Similar to a `git add newfile.txt`
     * followed by a `git commit`
     **/

    var repo;
    var index;
    var oid;

    nodegit.Repository.open(path.resolve(__dirname, "../.git"))
      .then(function (repoResult) {
        repo = repoResult;
        return fse.ensureDir(path.join(repo.workdir(), directoryName));
      })
      .then(function () {
        return fse.writeFile(path.join(repo.workdir(), fileName), fileContent);
      })
      .then(function () {
        return fse.writeFile(
          path.join(repo.workdir(), directoryName, fileName),
          fileContent
        );
      })
      .then(function () {
        return repo.openIndex();
      })
      .then(function (indexResult) {
        index = indexResult;
        return index.read(1);
      })
      .then(function () {
        // this file is in the root of the directory and doesn't need a full path
        return index.addByPath(fileName);
      })
      .then(function () {
        // this file is in a subdirectory and can use a relative path
        return index.addByPath(path.join(directoryName, fileName));
      })
      .then(function () {
        // this will write both files to the index
        return index.write();
      })
      .then(function () {
        return index.writeTree();
      })
      .then(function (oidResult) {
        oid = oidResult;
        return nodegit.Reference.nameToId(repo, "HEAD");
      })
      .then(function (head) {
        return repo.getCommit(head);
      })
      .then(function (parent) {
        var author = nodegit.Signature.create(
          "Scott Chacon",
          "schacon@gmail.com",
          123456789,
          60
        );
        var committer = nodegit.Signature.create(
          "Scott A Chacon",
          "scott@github.com",
          987654321,
          90
        );

        return repo.createCommit("HEAD", author, committer, "message", oid, [
          parent,
        ]);
      })
      .done(function (commitId) {
        console.log("New Commit: ", commitId);
      });
  }; // addAndCommit

  var push = function (url) {
    var nodegit = require("../");
    var path = require("path");
    var promisify = require("promisify-node");
    var fse = promisify(require("fs-extra"));
    fse.ensureDir = promisify(fse.ensureDir);

    var fileName = "newFile.txt";
    var fileContent = "hello world";

    var repoDir = "../../newRepo";

    var repository;
    var remote;

    var signature = nodegit.Signature.create(
      "Foo bar",
      "foo@bar.com",
      123456789,
      60
    );

    // Create a new repository in a clean directory, and add our first file
    fse
      .remove(path.resolve(__dirname, repoDir))
      .then(function () {
        return fse.ensureDir(path.resolve(__dirname, repoDir));
      })
      .then(function () {
        return nodegit.Repository.init(path.resolve(__dirname, repoDir), 0);
      })
      .then(function (repo) {
        repository = repo;
        return fse.writeFile(
          path.join(repository.workdir(), fileName),
          fileContent
        );
      })

      // Load up the repository index and make our initial commit to HEAD
      .then(function () {
        return repository.openIndex();
      })
      .then(function (index) {
        index.read(1);
        index.addByPath(fileName);
        index.write();

        return index.writeTree();
      })
      .then(function (oid) {
        return repository.createCommit(
          "HEAD",
          signature,
          signature,
          "initial commit",
          oid,
          []
        );
      })

      // Add a new remote
      .then(function () {
        return nodegit.Remote.create(
          repository,
          "origin",
          "git@github.com:nodegit/push-example.git"
        ).then(function (remoteResult) {
          remote = remoteResult;

          remote.setCallbacks({
            credentials: function (url, userName) {
              return nodegit.Cred.sshKeyFromAgent(userName);
            },
          });

          // Create the push object for this remote
          return remote.push(
            ["refs/heads/master:refs/heads/master"],
            null,
            repository.defaultSignature(),
            "Push to master"
          );
        });
      })
      .done(function () {
        console.log("Done!");
      });
  }; // push

  var mergeCleanly = function () {
    var nodegit = require("../");
    var path = require("path");
    var promisify = require("promisify-node");
    var fse = promisify(require("fs-extra"));
    fse.ensureDir = promisify(fse.ensureDir);

    var ourFileName = "ourNewFile.txt";
    var ourFileContent = "I like Toll Roads. I have an EZ-Pass!";
    var ourBranchName = "ours";

    var theirFileName = "theirNewFile.txt";
    var theirFileContent = "I'm skeptical about Toll Roads";
    var theirBranchName = "theirs";

    var repoDir = "../../newRepo";

    var repository;
    var ourCommit;
    var theirCommit;
    var ourBranch;
    var theirBranch;

    var ourSignature = nodegit.Signature.create(
      "Ron Paul",
      "RonPaul@TollRoadsRBest.info",
      123456789,
      60
    );
    var theirSignature = nodegit.Signature.create(
      "Greg Abbott",
      "Gregggg@IllTollYourFace.us",
      123456789,
      60
    );

    // Create a new repository in a clean directory, and add our first file
    fse
      .remove(path.resolve(__dirname, repoDir))
      .then(function () {
        return fse.ensureDir(path.resolve(__dirname, repoDir));
      })
      .then(function () {
        return nodegit.Repository.init(path.resolve(__dirname, repoDir), 0);
      })
      .then(function (repo) {
        repository = repo;
        return fse.writeFile(
          path.join(repository.workdir(), ourFileName),
          ourFileContent
        );
      })

      // Load up the repository index and make our initial commit to HEAD
      .then(function () {
        return repository.openIndex();
      })
      .then(function (index) {
        index.read(1);
        index.addByPath(ourFileName);
        index.write();

        return index.writeTree();
      })
      .then(function (oid) {
        return repository.createCommit(
          "HEAD",
          ourSignature,
          ourSignature,
          "we made a commit",
          oid,
          []
        );
      })

      // Get commit object from the oid, and create our new branches at that position
      .then(function (commitOid) {
        return repository
          .getCommit(commitOid)
          .then(function (commit) {
            ourCommit = commit;
          })
          .then(function () {
            return repository
              .createBranch(ourBranchName, commitOid)
              .then(function (branch) {
                ourBranch = branch;
                return repository.createBranch(theirBranchName, commitOid);
              });
          });
      })

      // Create a new file, stage it and commit it to our second branch
      .then(function (branch) {
        theirBranch = branch;
        return fse.writeFile(
          path.join(repository.workdir(), theirFileName),
          theirFileContent
        );
      })
      .then(function () {
        return repository.openIndex();
      })
      .then(function (index) {
        index.read(1);
        index.addByPath(theirFileName);
        index.write();

        return index.writeTree();
      })
      .then(function (oid) {
        // You don"t have to change head to make a commit to a different branch.
        return repository.createCommit(
          theirBranch.name(),
          theirSignature,
          theirSignature,
          "they made a commit",
          oid,
          [ourCommit]
        );
      })
      .then(function (commitOid) {
        return repository.getCommit(commitOid).then(function (commit) {
          theirCommit = commit;
        });
      })

      // Merge the two commits
      .then(function () {
        return nodegit.Merge.commits(repository, ourCommit, theirCommit);
      })

      // Merging returns an index that isn't backed by the repository.
      // You have to manually check for merge conflicts. If there are none
      // you just have to write the index. You do have to write it to
      // the repository instead of just writing it.
      .then(function (index) {
        if (!index.hasConflicts()) {
          index.write();
          return index.writeTreeTo(repository);
        }
      })

      // Create our merge commit back on our branch
      .then(function (oid) {
        return repository.createCommit(
          ourBranch.name(),
          ourSignature,
          ourSignature,
          "we merged their commit",
          oid,
          [ourCommit, theirCommit]
        );
      })
      .done(function (commitId) {
        // We never changed the HEAD after the initial commit;
        // it should still be the same as master.
        console.log("New Commit: ", commitId);
      });
  }; // mergeCleanly

  return {
    cloneRepo: cloneRepo,
    createBranch: createBranch,
    createNewRepo: createNewRepo,
    fork: fork,
    pull: pull,
    addAndCommit: addAndCommit,
    push: push,
    mergeCleanly: mergeCleanly,
  };
})();

// // get commit
// .then(function(repo) {
//   // return repo.getCommit("59b20b8d5c6ff8d09518454d4dd8b7b30f095ab5");
//   return repo.getCommit(commit);
// })
// .then(function(commit) {
//   // return commit.getEntry("README.md");
//   return commit.getEntry(entry);
// })
// .then(function(entryResult) {
//   entry = entryResult;
//   return entry.getBlob();
// })
// .done(function(blob) {
//   log(entry.filename(), entry.sha(), blob.rawsize() + "b");
//   log("========================================================\n\n");
//   var firstTenLines = blob.toString().split("\n").slice(0, 10).join("\n");
//   log(firstTenLines);
//   log("...");
// });
