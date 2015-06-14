"use strict";

var gulp      = require('gulp');
var concat    = require('gulp-concat');
var gutil     = require('gulp-util');
var sourcemaps = require('gulp-sourcemaps');

var browserify= require('browserify');
var watchify  = require('watchify');
var reactify  = require('reactify');
var babelify  = require('babelify');
var source    = require('vinyl-source-stream');
var es        = require('event-stream');

function scripts () {
  var bundler = browserify({
    entries: ['./assets/javascripts/index.js'],
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

//gulp.task('sass', function () {
  //var appFiles = sass('assets/stylesheets/', {sourcemap: true})
    //.on('error', gutil.log.bind(gutil, 'Sass Error'))
    //.pipe(sourcemaps.write());

  //var vendorFiles = gulp.src('assets/stylesheets/vendor/*.css'); 
  
  //es.concat(appFiles, vendorFiles)
    //.pipe(concat('application.css'))
    //.pipe(gulp.dest('./public'));
//});

gulp.task('watch:scripts', function () {
  return scripts();
});

//gulp.task('watch:sass', function () {
  //gulp.watch('./assets/stylesheets/**/*.scss', ['sass']);
//});

gulp.task('default', ['watch:scripts']); //, 'watch:sass']);
