var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var uglify = require('gulp-uglify');
var less = require('gulp-less');
var usemin = require('gulp-usemin');
var minifyHtml = require('gulp-minify-html');
var minifyCss = require('gulp-minify-css');
var rev = require('gulp-rev');
var path = require('path');
var browserSync = require('browser-sync');
var argv = require('minimist')(process.argv.slice(2));

// Force gulp to properly exit on error.
gulp.on('err', function (err) {
  throw err;
});

/**
 * Force gulp to properly exit at the end.
 */

function exitAtTheEnd() {
  gulp.on('stop', function () {
    process.exit(0);
  });
}


gulp.task('db:sync', function () {
  exitAtTheEnd();
  var models = require('./lib/models');
  return models.sequelize.sync();
});

gulp.task('db:drop', function () {
  exitAtTheEnd();
  var models = require('./lib/models');
  return models.sequelize.drop();
});

gulp.task('db:populate', ['db:sync'], function () {
  exitAtTheEnd();
  var Promise = require('bluebird');
  var models = require('./lib/models');

  return Promise.all([
    models.Customer.create({
      id: 1,
      email: 'berge.greg@gmail.com',
      password: models.Customer.generatePassword('password')
    }),
    models.Website.create({
      id: 1,
      name: 'Hipush',
      domain: 'http://hipush.net'
    })
  ])
  .spread(function (customer, website) {
    return website.setCustomer(customer);
  });
});

gulp.task('browsersync', ['server'], function() {
  var config = require('./lib/config');

  browserSync({
    proxy: 'localhost:' + config.httpServer.port,
    open: false
  });
});

gulp.task('server', function () {
  return nodemon({
    script: './bin/http',
    ext: 'html js'
  });
});

gulp.task('generatePushPackage', function () {
  var spnPushPackage = require('./lib/services/spn-push-package');

  var websiteId = argv['website-id'];

  if (!websiteId)
    throw new Error('--website-id required');

  return spnPushPackage.generateFromId(websiteId);
});

gulp.task('uglify', function() {
  return gulp.src('./client/hp.js')
    .pipe(uglify())
    .pipe(gulp.dest('./public'));
});

gulp.task('less', function () {
  return gulp.src('./client/less/main.less')
    .pipe(less({
      paths: [path.join(__dirname, 'node_modules')]
    }))
    .pipe(gulp.dest('./public'));
});

gulp.task('watch', function () {
  gulp.watch('./client/less/**/*.less', ['usemin']);
  gulp.watch('./client/**/*.html', ['usemin']);
});

gulp.task('usemin', ['less'], function () {
  return gulp.src('./client/*.html')
    .pipe(usemin({
      css: [minifyCss(), 'concat', browserSync.reload({stream: true})],
      html: [minifyHtml({empty: true}), browserSync.reload({stream: true})],
      js: [uglify(), rev()]
    }))
    .pipe(gulp.dest('public/'));
});

gulp.task('copy', function () {
  return gulp.src('./client/img/**/*')
    .pipe(gulp.dest('./public/img'));
});

gulp.task('db:migrate', function () {
  exitAtTheEnd();
  var sequelize = require('./lib/models').sequelize;
  var Umzug = require('umzug');
  var umzug = new Umzug({
    storage: 'sequelize',
    storageOptions: {
      sequelize: sequelize
    },
    migrations: {
      params: [sequelize.getQueryInterface(), sequelize.constructor],
      path: path.resolve(__dirname, 'migrations'),
      pattern: /\.js$/
    }
  });

  var method = argv.rollback ? 'down' : 'up';

  return umzug[method]();
});

gulp.task('build', ['uglify', 'copy', 'usemin']);

gulp.task('default', ['browsersync', 'build', 'watch']);
