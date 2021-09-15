/**
 * Optimize image assets
 */
const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const notify = require('gulp-notify');
const path = require('path');
const plumber = require('gulp-plumber');
const config = require('./config');

gulp.task('optimize_images', () =>
  gulp
    .src(path.join(__dirname, config.img.src, config.img.extensions), { base: './' })
    .pipe(plumber({ errorHandler: notify.onError('Error: <%= error.message %>') }))
    // .pipe(changed(path.join(paths.landingPath, "assets/images")))
    .pipe(
      imagemin([
        imagemin.gifsicle({ interlaced: true }),
        imagemin.jpegtran({ progressive: true }),
        imagemin.optipng({ optimizationLevel: 5 }),
        imagemin.svgo({
          plugins: [{ removeViewBox: true }, { cleanupIDs: false }],
        }),
      ],{
        verbose: true
      })
    )
    .pipe(gulp.dest('./'))
);
