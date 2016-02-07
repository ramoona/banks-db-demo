var gulp = require('gulp');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var normalize = require('postcss-normalize');
var nested = require('postcss-nested');
var banksDB = require('postcss-banks-db');
var contrast = require('postcss-contrast');
var browserify = require('browserify');
var source = require('vinyl-source-stream');

var paths = {
  scripts: ['./src/*.js'],
  css: './src/*.css'
};

gulp.task('postcss', function () {
  var processors = [
    autoprefixer({ browsers: ['last 1 version'] }),
    normalize,
    nested,
    banksDB,
    contrast
  ];
  return gulp.src(paths.css)
    .pipe(postcss(processors))
    .pipe(gulp.dest('./assets'));
});

gulp.task('browserify', function () {
  return browserify({ entries: ['./src/index.js'] })
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('assets'));
});

gulp.task('watch', function () {
  gulp.watch(paths.scripts, ['browserify']);
  gulp.watch(paths.css, ['postcss']);
});
