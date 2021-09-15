//
//  Created by Ashish Patel on 06/01/17.
//  Copyright © 2017 https://ashish.me
//

"use strict";

const gulp = require("gulp");
const notify = require("gulp-notify");
const sass = require("gulp-sass");
const gpcss = require("gulp-postcss");
const ap = require("autoprefixer");
const clcss = require("gulp-clean-css");
const pug = require("gulp-pug");
const uglify = require("gulp-uglify");
const concat = require("gulp-concat");
const bSync = require("browser-sync").create();
const imagemin = require("gulp-imagemin");
const pngquant = require("imagemin-pngquant");
const runSequence = require("run-sequence");
const rimraf = require("rimraf");

//Directories
var paths = {
  sass: {
    src: "src/_sass/*.sass",
    dest: "build/styles/",
    watch: "src/_sass/**/**/*.*",
  },
  pug: {
    src: "src/_pug/*.pug",
    dest: "build/",
    watch: "src/_pug/**/**/*.pug",
  },
  js: {
    src: "src/_scripts/**/*.js",
    dest: "build/scripts/",
  },
  site: "./build/",
};

//SASS
gulp.task("sass", function () {
  return gulp
    .src(paths.sass.src)
    .pipe(sass().on("error", sass.logError))
    .pipe(
      gpcss([ap({ browsers: ["last 15 versions", "> 2%", "Firefox > 20"] })])
    )
    .pipe(clcss({ compatibility: "ie8" }))
    .pipe(gulp.dest(paths.sass.dest))
    .pipe(bSync.reload({ stream: true }));
});

//Scripts
gulp.task("script", function () {
  return gulp
    .src(paths.js.src)
    .pipe(concat("script.js"))
    .pipe(uglify())
    .on(
      "error",
      notify.onError(function (error) {
        return "Uglify error::Script.\n" + error;
      })
    )
    .pipe(gulp.dest(paths.js.dest))
    .pipe(bSync.reload({ stream: true }));
});

//PUG
gulp.task("pug", function () {
  return gulp
    .src(paths.pug.src)
    .pipe(pug({ pretty: true }))
    .on(
      "error",
      notify.onError(function (error) {
        return "Compile Error::Jade.\n" + error;
      })
    )
    .pipe(gulp.dest(paths.pug.dest))
    .pipe(bSync.reload({ stream: true }));
});

//Images
gulp.task("images", function () {
  return gulp
    .src("src/_img/**/*")
    .pipe(
      imagemin({
        progressive: true,
        svgoPlugins: [{ removeViewBox: false }],
        use: [pngquant()],
      })
    )
    .pipe(gulp.dest("build/img/"))
    .pipe(bSync.stream());
});

//Watch
gulp.task("watch", function () {
  gulp.watch(paths.sass.watch, ["sass"]);
  gulp.watch(paths.pug.watch, ["pug"]);
  gulp.watch(paths.js.src, ["script"]);
  gulp.watch(["src/_img/**/*"], ["images"]);
});

//Misc
gulp.task("clean", function (cb) {
  return rimraf("build/", cb);
});

gulp.task("build", function (cb) {
  return runSequence("clean", ["sass", "pug", "script", "images"], cb);
});

//Server
gulp.task("server", function () {
  bSync.init({
    server: { baseDir: paths.site },
  });
});

//Default
gulp.task("default", ["build", "watch", "server"]);
