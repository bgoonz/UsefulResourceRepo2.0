const gulp = require("gulp");
const through2 = require("through2");

const { testedLang } = require("./utils");
const lintMarkdown = require("../tools/scripts/lint");

/**
 * Tasks
 **/

function lint() {
  return gulp.src(globLang(testedLang()), { read: false }).pipe(
    through2.obj(function obj(file, enc, next) {
      lintMarkdown(file, next);
    })
  );
}

/**
 * Helper functions
 **/

function globLang(lang) {
  return `./challenges/${lang}/**/*.md`;
}

gulp.task("lint", lint);
