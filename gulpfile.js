"use strict";

var gulp      = require('gulp');
var concat    = require('gulp-concat');
var gutil     = require('gulp-util');
var sourcemaps = require('gulp-sourcemaps');
var sass = require('gulp-sass');
var notify = require('gulp-notify');
var path = require('path');
var plumber = require('gulp-plumber');

var browserify= require('browserify');
var watchify  = require('watchify');
var reactify  = require('reactify');
var babelify  = require('babelify');
var source    = require('vinyl-source-stream');
var es        = require('event-stream');

function scripts () {
  var bundler = browserify({
    entries: ['./assets/javascripts/index.jsx'],
    transform: [reactify, babelify],
    debug: true,
    cache: {}, packageCache: {}, fullPaths: true
  });
  
  var watcher = watchify(bundler);

  var bundle = function () {
    var updateStart = Date.now();
    console.log('updating');
    watcher.bundle()
    .on('log', gutil.log)
    .on('error', gutil.log.bind(gutil, 'Browserify Error'))
    .pipe(source('application.js'))
    .pipe(gulp.dest('./public'));
    console.log('Done!', (Date.now() - updateStart) + 'ms');
  };

  return watcher
    .on('update', bundle)
    .bundle()
    .on('error', gutil.log.bind(gutil, 'Browserify Error'))
    .pipe(source('application.js'))
    .pipe(gulp.dest('./public')); 
}

gulp.task('sass', function () {
  return gulp.src('./assets/stylesheets/**/*.scss')
  .pipe(sourcemaps.init())
  .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
  .pipe(sass())
  .pipe(sourcemaps.write())
  .pipe(gulp.dest('./public/css'));
});

gulp.task('watch:scripts', function () {
  return scripts();
});

gulp.task('watch:sass', function () {
  return gulp.watch('./assets/stylesheets/**/*.scss', ['sass']);
});

gulp.task('default', ['watch:scripts', 'watch:sass']);
