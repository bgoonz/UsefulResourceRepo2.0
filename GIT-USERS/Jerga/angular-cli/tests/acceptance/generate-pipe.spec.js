/*eslint-disable no-console */
"use strict";

var fs = require("fs-extra");
var ng = require("../helpers/ng");
var existsSync = require("exists-sync");
var expect = require("chai").expect;
var path = require("path");
var tmp = require("../helpers/tmp");
var root = process.cwd();
var Promise = require("angular-cli/ember-cli/lib/ext/promise");
var SilentError = require("silent-error");
const denodeify = require("denodeify");

const readFile = denodeify(fs.readFile);

describe("Acceptance: ng generate pipe", function () {
  beforeEach(function () {
    return tmp
      .setup("./tmp")
      .then(function () {
        process.chdir("./tmp");
      })
      .then(function () {
        return ng(["new", "foo", "--skip-npm"]);
      });
  });

  afterEach(function () {
    this.timeout(10000);

    return tmp.teardown("./tmp");
  });

  it("ng generate pipe my-pipe", function () {
    const appRoot = path.join(root, "tmp/foo");
    const testPath = path.join(appRoot, "src/app/my-pipe.pipe.ts");
    const testSpecPath = path.join(appRoot, "src/app/my-pipe.pipe.spec.ts");
    const appModulePath = path.join(appRoot, "src/app/app.module.ts");
    return ng(["generate", "pipe", "my-pipe"])
      .then(() => {
        expect(existsSync(testPath)).to.equal(true);
        expect(existsSync(testSpecPath)).to.equal(true);
      })
      .then(() => readFile(appModulePath, "utf-8"))
      .then((content) => {
        expect(content).matches(
          /import.*\bMyPipePipe\b.*from '.\/my-pipe.pipe';/
        );
        expect(content).matches(
          /declarations:\s*\[[^\]]+?,\r?\n\s+MyPipePipe\r?\n/m
        );
      });
  });

  it("ng generate pipe my-pipe --no-spec", function () {
    const appRoot = path.join(root, "tmp/foo");
    const testPath = path.join(appRoot, "src/app/my-pipe.pipe.ts");
    const testSpecPath = path.join(appRoot, "src/app/my-pipe.pipe.spec.ts");

    return ng(["generate", "pipe", "my-pipe", "--no-spec"]).then(() => {
      expect(existsSync(testPath)).to.equal(true);
      expect(existsSync(testSpecPath)).to.equal(false);
    });
  });

  it("ng generate pipe test" + path.sep + "my-pipe", function () {
    fs.mkdirsSync(path.join(root, "tmp", "foo", "src", "app", "test"));
    return ng(["generate", "pipe", "test" + path.sep + "my-pipe"]).then(() => {
      var testPath = path.join(
        root,
        "tmp",
        "foo",
        "src",
        "app",
        "test",
        "my-pipe.pipe.ts"
      );
      expect(existsSync(testPath)).to.equal(true);
    });
  });

  it(
    "ng generate pipe test" + path.sep + ".." + path.sep + "my-pipe",
    function () {
      return ng([
        "generate",
        "pipe",
        "test" + path.sep + ".." + path.sep + "my-pipe",
      ]).then(() => {
        var testPath = path.join(
          root,
          "tmp",
          "foo",
          "src",
          "app",
          "my-pipe.pipe.ts"
        );
        expect(existsSync(testPath)).to.equal(true);
      });
    }
  );

  it("ng generate pipe my-pipe from a child dir", () => {
    fs.mkdirsSync(path.join(root, "tmp", "foo", "src", "app", "1"));
    return new Promise(function (resolve) {
      process.chdir("./src");
      resolve();
    })
      .then(() => process.chdir("./app"))
      .then(() => process.chdir("./1"))
      .then(() => {
        process.env.CWD = process.cwd();
        return ng(["generate", "pipe", "my-pipe"]);
      })
      .then(
        () => {
          var testPath = path.join(
            root,
            "tmp",
            "foo",
            "src",
            "app",
            "1",
            "my-pipe.pipe.ts"
          );
          expect(existsSync(testPath)).to.equal(true);
        },
        (err) => console.log("ERR: ", err)
      );
  });

  it(
    "ng generate pipe child-dir" + path.sep + "my-pipe from a child dir",
    () => {
      fs.mkdirsSync(
        path.join(root, "tmp", "foo", "src", "app", "1", "child-dir")
      );
      return new Promise(function (resolve) {
        process.chdir("./src");
        resolve();
      })
        .then(() => process.chdir("./app"))
        .then(() => process.chdir("./1"))
        .then(() => {
          process.env.CWD = process.cwd();
          return ng(["generate", "pipe", "child-dir" + path.sep + "my-pipe"]);
        })
        .then(
          () => {
            var testPath = path.join(
              root,
              "tmp",
              "foo",
              "src",
              "app",
              "1",
              "child-dir",
              "my-pipe.pipe.ts"
            );
            expect(existsSync(testPath)).to.equal(true);
          },
          (err) => console.log("ERR: ", err)
        );
    }
  );

  it(
    "ng generate pipe child-dir" +
      path.sep +
      ".." +
      path.sep +
      "my-pipe from a child dir",
    () => {
      fs.mkdirsSync(path.join(root, "tmp", "foo", "src", "app", "1"));
      return new Promise(function (resolve) {
        process.chdir("./src");
        resolve();
      })
        .then(() => process.chdir("./app"))
        .then(() => process.chdir("./1"))
        .then(() => {
          process.env.CWD = process.cwd();
          return ng([
            "generate",
            "pipe",
            "child-dir" + path.sep + ".." + path.sep + "my-pipe",
          ]);
        })
        .then(
          () => {
            var testPath = path.join(
              root,
              "tmp",
              "foo",
              "src",
              "app",
              "1",
              "my-pipe.pipe.ts"
            );
            expect(existsSync(testPath)).to.equal(true);
          },
          (err) => console.log("ERR: ", err)
        );
    }
  );

  it(
    "ng generate pipe " +
      path.sep +
      "my-pipe from a child dir, gens under " +
      path.join("src", "app"),
    () => {
      fs.mkdirsSync(path.join(root, "tmp", "foo", "src", "app", "1"));
      return new Promise(function (resolve) {
        process.chdir("./src");
        resolve();
      })
        .then(() => process.chdir("./app"))
        .then(() => process.chdir("./1"))
        .then(() => {
          process.env.CWD = process.cwd();
          return ng(["generate", "pipe", path.sep + "my-pipe"]);
        })
        .then(
          () => {
            var testPath = path.join(
              root,
              "tmp",
              "foo",
              "src",
              "app",
              "my-pipe.pipe.ts"
            );
            expect(existsSync(testPath)).to.equal(true);
          },
          (err) => console.log("ERR: ", err)
        );
    }
  );

  it(
    "ng generate pipe .." + path.sep + "my-pipe from root dir will fail",
    () => {
      return ng(["generate", "pipe", ".." + path.sep + "my-pipe"]).then(
        () => {
          throw new SilentError(
            `ng generate pipe ..${path.sep}my-pipe from root dir should fail.`
          );
        },
        (err) => {
          expect(err).to.equal(
            `Invalid path: "..${path.sep}my-pipe" cannot be above the "src${path.sep}app" directory`
          );
        }
      );
    }
  );
});
