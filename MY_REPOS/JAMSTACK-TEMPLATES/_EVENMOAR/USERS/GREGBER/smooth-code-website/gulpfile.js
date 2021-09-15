var gulp = require('gulp');
var sass = require('gulp-ruby-sass');
var autoprefixer = require('gulp-autoprefixer');
var usemin = require('gulp-usemin');
var rev = require('gulp-rev');
var uglify = require('gulp-uglify');
var minifyHtml = require('gulp-minify-html');
var browserSync = require('browser-sync');
var nodemon = require('gulp-nodemon');
var config = require('./server/config');

gulp.task('browser-sync', ['server'], function() {
  browserSync.init(null, {
    open: false,
    proxy: 'http://localhost:' + config.server.port
  });
});

gulp.task('server', function() {
  nodemon({
    script: './server/index.js'
  });
});

gulp.task('sass', function () {
  return gulp.src('./scss/*.scss')
      .pipe(sass({
        style: 'compressed',
        loadPath: [
          './bower_components/bootstrap-sass-official/assets/stylesheets'
        ]
      }))
      .pipe(autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false
      }))
      .pipe(gulp.dest('./build/css'));
});

gulp.task('usemin', ['sass'], function () {
  return gulp.src('./index.html')
    .pipe(usemin({
      css: [rev()],
      js: [uglify(), rev()],
      html: [minifyHtml({empty: true})]
    }))
    .pipe(gulp.dest('./build'));
});

gulp.task('copy-fonts', function () {
  return gulp.src('./fonts/**/*')
  .pipe(gulp.dest('./build/fonts'));
});

gulp.task('copy-img', function () {
  return gulp.src('./img/**/*')
  .pipe(gulp.dest('./build/img'));
});

gulp.task('copy-favicon', function () {
  return gulp.src('./favicon.ico')
  .pipe(gulp.dest('./build'));
});

gulp.task('watch', function() {
  gulp.watch('./scss/*.scss', ['sass']);

  gulp.watch('./build/js/*.js', function () {
    gulp.src('./build/js/*.js')
    .pipe(browserSync.reload({stream: true}));
  });

  gulp.watch('./build/css/*.css', function () {
    gulp.src('./build/css/*.css')
    .pipe(browserSync.reload({stream: true}));
  });

  gulp.watch('./index.html', function () {
    gulp.src('./index.html')
    .pipe(browserSync.reload({stream: true}));
  });
});

gulp.task('copy', ['copy-fonts', 'copy-img', 'copy-favicon']);
gulp.task('build', ['usemin', 'sass', 'copy']);
gulp.task('default', ['browser-sync', 'watch', 'sass', 'copy']);
gulp.task('heroku', ['build']);
