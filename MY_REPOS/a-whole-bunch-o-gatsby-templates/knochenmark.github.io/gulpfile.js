"use strict";

var fs = require('fs'),
  gulp = require('gulp'),
  pug = require('gulp-pug'),
  data = require('gulp-data'),
  clean = require('gulp-clean'),
  stylus = require('gulp-stylus'),
  jeet = require('jeet'),
  rupture = require('rupture'),
  koutoSwiss = require('kouto-swiss'),
  rucksack = require('gulp-rucksack'),
  prefixer = require('autoprefixer-stylus'),
  cssnano = require('gulp-cssnano'),
  uglify = require('gulp-uglify'),
  jshint = require("gulp-jshint"),
  concat = require('gulp-concat'),
  imagemin = require('gulp-imagemin'),
  browserSync = require('browser-sync'),
  reload = browserSync.reload,
  plumber = require('gulp-plumber'),
  watch = require('gulp-watch'),
  batch = require('gulp-batch'),
  runSequence = require('run-sequence');

var sourcemaps = require('gulp-sourcemaps');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var browserify = require('browserify');
var watchify = require('watchify');
var babel = require('babelify');

var inject = require('gulp-inject');

// Paths
var paths = {
  dev: "./src/",
  dest: "./assets/",
  bower: "./bower_components/"
},
srcPaths = {
  js: paths.dev + 'js/*.js',
  jsLibs: paths.dev + 'js/libs/*.js',
  jsPlugins: paths.dev + 'js/plugins/*.js',
  jsModules: paths.dev + 'js/modules/*.js',

  css: paths.dev + 'styl/**/*.styl',
  mainStyl: paths.dev + 'styl/main.styl',

  pug: paths.dev + 'views/**/*.pug',
  pugPages: paths.dev + 'views/pages/**/*.pug',

  img: paths.dev + 'img/**/*.{jpg,png,gif,svg}',

  fonts: paths.dev + 'fonts/*',
},
buildPaths = {
  build: paths.dest + '**/*',
  js: paths.dest + 'js/',
  css: paths.dest + 'css/',
  pug: './',
  img: paths.dest + 'img',
  fonts: paths.dest + 'css/fonts',
};


// Clean all 'dest' directory before generating the files
gulp.task('clean', function () {
  return gulp.src(paths.dest + '*')
    .pipe(clean());
});


// gulp.task('index',['pug'], function () {
//   var target = gulp.src('./index.html');
//   // It's not necessary to read the files (will speed up things), we're only after their paths:
//   var sources = gulp.src([srcPaths.jsLibs], {read: false});
//   return target.pipe(inject(sources))
//     .pipe(gulp.dest('./src'));
// });


// Pug Task
gulp.task('pug', function () {
  return gulp.src(srcPaths.pugPages)
    .pipe(plumber())
    .pipe(data(function (file) {
      // console.log("current path", process.cwd());
      return JSON.parse(fs.readFileSync('./src/views/json/data.json'))
    }))
    .pipe(pug({
      client: false,
      pretty: true
    }))
    .pipe(gulp.dest(buildPaths.pug))
    .pipe(reload({
      stream: true,
      open: false
    }));
});


// CSS task
gulp.task('css', function () {
  return gulp.src(srcPaths.mainStyl)
    .pipe(plumber())
    .pipe(stylus({
      use: [koutoSwiss(), prefixer(), jeet(), rupture()]
    }))
    .pipe(rucksack())
    .pipe(cssnano()) //--> minify css
    .pipe(browserSync.reload({
      stream: true
    }))
    .pipe(gulp.dest(buildPaths.css))
    .pipe(reload({
      stream: true
    }));
});


// Fonts task
gulp.task('fonts', function () {
  return gulp.src(srcPaths.fonts)
    .pipe(plumber())
    .pipe(gulp.dest(buildPaths.fonts))
    .pipe(reload({
      stream: true
    }));
});

gulp.task('concat', ['js'], function(){
  return gulp.src([srcPaths.jsLibs, srcPaths.jsPlugins, srcPaths.jsModules, srcPaths.js, buildPaths.js])
  .pipe(plumber())
  .pipe(concat('main.js'))
  .pipe(gulp.dest(buildPaths.js))
})

// Javascript Task
gulp.task('js', function () {
  return browserify('./src/js/main.js', {debug: true, extensions: ['es6']})
      .transform("babelify", {presets: ["es2015"]})
      .bundle()
      .pipe(source('bundle.js'))
      .pipe(buffer())
      .pipe(sourcemaps.init({loadMaps: true}))
      .pipe(sourcemaps.write())
      .pipe(gulp.dest(buildPaths.js))
      .pipe(browserSync.reload({stream: true}));
});

// Img Task
gulp.task('img', function () {
  return gulp.src(srcPaths.img)
    .pipe(plumber())
    .pipe(imagemin({
      optimizationLevel: 5,
      progressive: true,
      interlaced: true,
      cache: false
    }))
    .pipe(gulp.dest(buildPaths.img))
    .pipe(reload({
      stream: true
    }));
});


// Watch stylus files, js files, img files and pug files for changes and recompile
gulp.task('watch', function () {
  watch(srcPaths.css, batch(function (event, done) {
    gulp.start('css', done);
  }));

  watch([srcPaths.jsModules, srcPaths.js], batch(function (event, done) {
    gulp.start('js', done);
  }));

  watch(srcPaths.img, batch(function (event, done) {
    gulp.start('img', done);
  }));

  watch(srcPaths.pug, batch(function (event, done) {
    gulp.start('pug', done);
  }));
});


// Wait for pug, then launch the Server
gulp.task('browser-sync', ['pug'], function () {
  browserSync({
    server: {
      baseDir: './'
    },
    open: false,
    browser: 'google chrome'
  });
});


// Run Sequence allows you to perform the 'clean' task before others
// It also allows to ascertain the exact time of 'default' with callback
gulp.task('default', function (cb) {
  return runSequence('clean', ['pug', 'js','css', 'img', 'fonts', 'browser-sync', 'watch'], cb);
});

gulp.task('deploy', function (cb) {
  return runSequence('clean', ['pug', 'js', 'css', 'img', 'fonts'], cb);
});
