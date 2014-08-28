var gulp = require('gulp');
var gutil = require('gulp-util');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var clean = require('gulp-clean');
var pathmap = require('gulp-pathmap');
var rjs = require('gulp-rjs');
var requirejs = require('requirejs');

var requirejs_config = {
	baseUrl: 'www/js',
	dir: 'dist/www/js',
	name: 'main',
	fileExclusionRegExp: /^(r|build)\.js$/,
	// uglify, none
	optimize: "none",
	optimizeCss: 'standard',
	removeCombined: true,
	paths: {
		'angular': '../lib/angular',
		'angular.resource': '../lib/angular-resource',
		'angular.route': '../lib/angular-route',
	},
	shim: {
		'angular': {
			'exports': 'angular'
		},
		'angular.resource': {
			'deps': ['angular'],
			'exports': 'angular.resource'
		},
		'angular.route': {
			'deps': ['angular'],
			'exports': 'angular.route'
		}
	}
};

// src config
var src_root = './www';
var src_dir_js = src_root + '/js';
var src_dir_lib = src_root + '/lib';
var src_dir_img = src_root + '/img';
var src_dir_css = src_root + '/css';
var src_dir_data = src_root + '/data';
var src_dir_pages = src_root + '/pages';
var src_dir_partials = src_root + '/partials';
var src_file_index = src_root + '/index_product.html';

// dest config
var des_root = './dist/www';
var des_dir_js = des_root + '/js';
var des_dir_lib = des_root + '/lib';
var des_dir_img = des_root + '/img';
var des_dir_css = des_root + '/css';
var des_dir_data = des_root + '/data';
var des_dir_pages = des_root + '/pages';
var des_dir_partials = des_root + '/partials';
var des_file_index = des_root + '/index.html';
var des_file_js_concat = 'main.js';
var des_file_deps_concat = 'deps.min.js';

try {
	gulp.task('clean', function() {
		gulp.src(des_root)
			.pipe(clean({
				force: true
			}));
	});

	gulp.task('concat_lib', function() {
		gulp.src([
			src_dir_lib + '/jquery-2.0.3.min.js',
			src_dir_lib + '/bootstrap.min.js',
			src_dir_lib + '/class.js',
			src_dir_lib + '/iscroll.js',
			src_dir_lib + '/namespace.js'
		])
			.pipe(uglify())
			.pipe(concat(des_file_deps_concat))
			.pipe(gulp.dest(des_dir_lib));
		gulp.src(src_dir_lib + '/require.js')
			.pipe(gulp.dest(des_dir_lib));
	});

	gulp.task('concat_js', function() {
		gulp.src([
			src_dir_js + '/main.js',
			src_dir_js + '/**/*.js',
			src_dir_data + '/**/*.js'
		])
		//.pipe(uglify())
		//.pipe(concat(des_file_js_concat))
		.pipe(gulp.dest(des_dir_js))
			.pipe(rjs(requirejs_config));
	});

	gulp.task('copy', function() {
		gulp.src(src_file_index).pipe(pathmap('www/index.html')).pipe(gulp.dest(des_root));
		gulp.src(src_dir_img + '/**/*.*').pipe(gulp.dest(des_dir_img));
		gulp.src(src_dir_data + '/**/*.*').pipe(gulp.dest(des_dir_data));
		gulp.src(src_dir_partials + '/**/*.*').pipe(gulp.dest(des_dir_partials));
		gulp.src(src_dir_css + '/**/*.*').pipe(gulp.dest(des_dir_css));
	});

	gulp.task('default', ['clean', 'concat_lib', 'copy']);

	requirejs.optimize(requirejs_config);
} catch (e) {
	console.log('error: ');
	console.log(e);
}