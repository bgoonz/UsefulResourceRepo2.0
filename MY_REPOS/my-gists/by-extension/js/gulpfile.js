var gulp = require('gulp');

// Gulp plugins
var autoprefixer = require('gulp-autoprefixer');
var bower = require('gulp-bower-files');
var clean = require('gulp-clean');
var concat = require('gulp-concat-sourcemap');
var filter = require('gulp-filter');
var flatten = require('gulp-flatten');
var gutil = require('gulp-util');
var refresh = require('gulp-livereload');
var rubysass = require('gulp-ruby-sass');
var uglify = require('gulp-uglify');

// Other modules
var streamqueue = require('streamqueue');

// Server and livereload
var lrserver = require('tiny-lr')();
var express = require('express');
var livereload = require('connect-livereload');
var livereloadport = 35729;
var serverport = 9000;

// Create an express server for later use
var server = express();

server.use(livereload({
	port: livereloadport
}));

server.use(express.static('build'));

// Express erver with livereload
gulp.task('serve', function() {
	server.listen(serverport);
	lrserver.listen(livereloadport);
});

// Copy html
gulp.task('html', function() {
	return gulp.src('source/*.html')
		.pipe(gulp.dest('build'))
		.pipe(refresh(lrserver));
});

// Convert and Prefix scss
gulp.task('sass', function() {
	return gulp.src('source/css/**/*.scss')
		.pipe(rubysass({
			style: 'compact',
			sourcemap: true
		}))
		.pipe(autoprefixer.apply(null, [
			"ff >= 3.6",
			"ie > 8",
			"Chrome >= 10",
			"iOS >= 5",
			"Android >= 2.3",
			"Safari >= 5"
		]))
		.pipe(gulp.dest('build/assets'))
		.pipe(refresh(lrserver));
});

// JS
gulp.task('js', function() {
	streamqueue({ objectMode: true },
		bower(),
		gulp.src('source/js/*.js')
	)
		.pipe(flatten())
		.pipe(filter('*.js'))
		.pipe(gulp.dest('build/assets/source')) // store unchanged sources for debugging
		.pipe(concat('footer.js', {
			prefix: 2 // removed subfolders from map
		}))
		.pipe(gulp.dest('build/assets'))
		.pipe(refresh(lrserver));
});

// Clean build dir
gulp.task('clean', function() {
	return gulp.src('build/*', {read: false})
		.pipe(clean());
});

// Build everything
gulp.task('build', [
	'clean',
	'html',
	'sass',
	'js'
]);

// Watch for changes
gulp.task('watch', function() {
	gulp.watch('source/*.html', ['html']);
	gulp.watch('source/css/*.scss', ['sass']);
	gulp.watch('source/js/*.js', ['js']);
});

// The grand finale
gulp.task('default', [
	'build',
	'serve',
	'watch'
]);
