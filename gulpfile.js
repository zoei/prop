var gulp = require('gulp');
var gutil = require('gulp-util');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var clean = require('gulp-clean');
var pathmap = require('gulp-pathmap');

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

gulp.task('clean', function() {
	gulp.src(des_root)
		.pipe(clean());
});

gulp.task('concat', function() {
	gulp.src(src_dir_lib + '/**/*.js')
		//.pipe(uglify())
		//.pipe(concat(des_file_deps_concat))
		.pipe(gulp.dest(des_dir_lib));
	gulp.src([
			src_dir_js + '/main.js',
			src_dir_js + '/app.js',
			src_dir_js + '/**/*.js',
			src_dir_data + '/**/*.js'
		])
		//.pipe(uglify())
		.pipe(concat(des_file_js_concat))
		.pipe(gulp.dest(des_dir_js));
});

gulp.task('copy', function() {
	gulp.src(src_file_index).pipe(pathmap('www/index.html')).pipe(gulp.dest(des_root));
	gulp.src(src_dir_css + '/**/*.*').pipe(gulp.dest(des_dir_css));
	gulp.src(src_dir_img + '/**/*.*').pipe(gulp.dest(des_dir_img));
	gulp.src(src_dir_data + '/**/*.*').pipe(gulp.dest(des_dir_data));
	gulp.src(src_dir_partials + '/**/*.*').pipe(gulp.dest(des_dir_partials));
});

gulp.task('default', ['clean', 'concat', 'copy']);