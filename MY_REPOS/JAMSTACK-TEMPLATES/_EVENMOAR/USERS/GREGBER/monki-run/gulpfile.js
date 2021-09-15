const gulp = require('gulp');
const gutil = require('gulp-util');
const source = require('vinyl-source-stream');
const notifier = require('node-notifier');
const browserSync = require('browser-sync');
const argv = require('minimist')(process.argv.slice(2));

const jsBuild = {
  source: './src/main.js',
  destName: 'monki-run.js',
  dest: './build'
};

let lastBuildErrored = false;

gulp.task('browsersync', () =>
  browserSync.init({
    open: false,
    server: {
      baseDir: '.'
    }
  })
);

gulp.task('default', [
  'js:watch',
  'browsersync'
]);

gulp.task('js:watch', () => {
  const watchify = require('watchify');
  const bundler = watchify(createBundler(Object.assign(watchify.args, argv)));
  const watchBundle = () => bundle(bundler, {catchErrors: true});

  bundler.on('update', watchBundle);
  return watchBundle();
});

/**
 * Create a browserify bundler.
 *
 * @param {object} args
 * @returns {object}
 */
function createBundler(args) {
  const browserify = require('browserify');

  const bundler = browserify(jsBuild.source, args || argv);
  bundler.on('log', gutil.log.bind(gutil));

  return bundler;
}

/**
 * Bundler using a bundler.
 *
 * @param {object} bundler
 * @param {object} options
 * @param {boolean} [options.catchErrors]
 * @returns {Stream}
 */
function bundle(bundler, options) {
  options = options || {};
  gutil.log('Bundling...');

  const bundling = bundler.bundle();

  if (options.catchErrors) {
    bundling.on('end', () => {
      if (lastBuildErrored)
        notifier.notify({
          title: 'Browserify success',
          message: 'Build fixed'
        });

      lastBuildErrored = false;
    });

    bundling.on('error', error => {
      lastBuildErrored = true;
      notifier.notify({
        title: 'Browserify error',
        message: error.message
      });
      gutil.beep();
      gutil.log(gutil.colors.red('Browserify Error', error.message));
    });
  }

  return bundling
    .pipe(source(jsBuild.destName))
    .pipe(gulp.dest(jsBuild.dest))
    .pipe(browserSync.reload({stream: true}));
}
