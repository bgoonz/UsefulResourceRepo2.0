'use strict';

var argv = require('minimist')(process.argv.slice(2));
var browserify = require('browserify');
var browserSync = require('browser-sync');
var buffer = require('vinyl-buffer');
var frontmatter = require('front-matter');
var gulp = require('gulp');
// var path = require('path');
var source = require('vinyl-source-stream');
var watchify = require('watchify');

// Gulp plugins
var data = require('gulp-data');
var handlebars = require('gulp-hb');
var htmlmin = require('gulp-htmlmin');
var jshint = require('gulp-jshint');
var nav = require('gulp-nav');
var plumber = require('gulp-plumber');
var postcss = require('gulp-postcss');
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var spritesmith = require('gulp.spritesmith');
var uglify = require('gulp-uglify');
var util = require('gulp-util');

// PostCSS plugins
var autoprefixer = require('autoprefixer-core');
var mqpacker = require('css-mqpacker');
var csswring = require('csswring');

// Paths
var destAssets = './public/assets';
var destPublic = './public';
var destScripts = destAssets;
var destSpritesImages = destAssets;
var destSpritesStyles = './src/styles';
var srcContent = 'content/**/*.hbs';
var srcScript = './src/scripts/index.js';
var srcScripts = './src/scripts/**/*.js';
var srcStatic = './static/**/*';
var srcStyles = './src/styles/**/*.scss';

// Arguments
if (argv.length > 1) {
	// Use arguments for switching to production
	console.log(argv);
}

// Browserify Bundler
var bundler = watchify(browserify(srcScript, watchify.args));

// Add transforms
//bundler.transform('browserify-shim');
//bundler.transform('debowerify');

function bundle() {
	return bundler.bundle()
		.on('error', util.log.bind(util, 'Browserify Error'))
		.pipe(source('bundle.js'))
		.pipe(buffer())
		.pipe(sourcemaps.init({
			loadMaps: true
		}))
		.pipe(uglify())
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest(destScripts))
		.pipe(browserSync.reload({
			stream: true,
			once: true
		}));
}

bundler.on('update', bundle);
bundler.on('log', util.log);

// Gulp tasks
gulp.task('content', function() {
	return gulp.src(srcContent)
		.pipe(plumber())
		.pipe(data(function(file) {
			var content = frontmatter(String(file.contents));
			file.contents = new Buffer(content.body);

			return content.attributes;
		}))
		.pipe(nav({
			skips: 'ignore'
		}))
		.pipe(handlebars({
			helpers: [
				'./src/helpers/**/*.js'
			],
			partials: [
				'./src/partials/**/*.hbs'
			]
		}))
		.pipe(rename(function(p) {
			p.extname = '.html';
		}))
		.pipe(htmlmin({
			collapseWhitespace: true
		}))
		.pipe(gulp.dest(destPublic));
});

gulp.task('jshint', function() {
	return gulp.src([srcScripts, './gulpfile.js', './src/helpers/**.*.js'])
		.pipe(plumber())
		.pipe(jshint('.jshintrc'))
		.pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('scripts', ['jshint'], bundle);

gulp.task('sprites', function() {
	var sprites = gulp.src(['./src/images/sprites/*.png','!./src/images/sprites/*@2x.png'])
		.pipe(plumber())
		.pipe(spritesmith({
			imgName: 'sprite.png',
			cssName: '_sprites.generated.scss'
		}));

	var sprites2x = gulp.src(['./src/images/sprites/*@2x.png'])
		.pipe(plumber())
		.pipe(spritesmith({
			imgName: 'sprite@2x.png',
			cssName: '_sprites2x.generated.scss',
			cssVarMap: function(sprite) {
				sprite.name = sprite.name.replace('@2x','-2x');
			}
		}));

	sprites.img
		.pipe(plumber())
		.pipe(gulp.dest(destSpritesImages));

	sprites2x.img
		.pipe(plumber())
		.pipe(gulp.dest(destSpritesImages));

	sprites.css
		.pipe(plumber())
		.pipe(gulp.dest(destSpritesStyles));

	sprites2x.css
		.pipe(plumber())
		.pipe(gulp.dest(destSpritesStyles));
});

gulp.task('styles', function() {
	return gulp.src(srcStyles)
		.pipe(plumber())
		.pipe(sourcemaps.init({
			loadMaps: true
		}))
		.pipe(sass({
			errLogToConsole: true
		}))
		.pipe(postcss([
			autoprefixer({browsers: ['last 1 version']}),
			mqpacker,
			csswring
		]))
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest(destAssets))
		.pipe(browserSync.reload({
			stream: true
		}));
});

gulp.task('static', function() {
	gulp.src(srcStatic)
		.pipe(gulp.dest(destPublic));
});


gulp.task('build', [
	'content',
	'scripts',
	'styles',
	'static'
]);

gulp.task('watch', ['build'], function() {
	gulp.watch(srcStyles, ['styles']);
	gulp.watch(srcScripts, ['jshint']);
	gulp.watch(srcContent, ['content']).on('change', browserSync.reload);
	gulp.watch(srcStatic, ['static']).on('change', browserSync.reload);
});

gulp.task('serve', ['watch'], function() {
	browserSync({
		ghostMode: false,
        server: {
            baseDir: destPublic
        }
    });
});

gulp.task('default', [
	'serve'
]);
