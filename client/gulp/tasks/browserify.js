'use strict';

var config       = require('../config');
var gulp         = require('gulp');
var gulpif       = require('gulp-if');
var gutil        = require('gulp-util');
var source       = require('vinyl-source-stream');
var sourcemaps   = require('gulp-sourcemaps');
var buffer       = require('vinyl-buffer');
var streamify    = require('gulp-streamify');
var watchify     = require('watchify');
var browserify   = require('browserify');
var uglify       = require('gulp-uglify');
var handleErrors = require('../util/handleErrors');
var ngAnnotate   = require('browserify-ngannotate');

// Based on: http://blog.avisi.nl/2014/04/25/how-to-keep-a-fast-build-with-browserify-and-reactjs/
function buildScript(file) {

  var bundler = browserify({
    entries: config.browserify.entries,
    debug: true,
    cache: {},
    packageCache: {},
    fullPaths: true
  }, watchify.args);

  if (!global.isProd) {
    bundler = watchify(bundler);
    bundler.on('update', function() {
      rebundle();
    });
  }

  var transforms = [
    ngAnnotate,
    'brfs',
    'bulkify'
  ];

  transforms.forEach(function(transform) {
    bundler.transform(transform);
  });

  function rebundle() {
    var stream = bundler.bundle();
    var createSourcemap = global.isProd && config.browserify.sourcemap;

    gutil.log('Rebundling...');

    return stream.on('error', handleErrors)
        .pipe(source(file))
        .pipe(gulpif(createSourcemap, buffer()))
        .pipe(gulpif(createSourcemap, sourcemaps.init()))
        .pipe(gulpif(global.isProd, streamify(uglify({
          compress: { drop_console: true }
        }))))
        .pipe(gulpif(createSourcemap, sourcemaps.write('./')))
        .pipe(gulp.dest(config.scripts.dest))
        .on('end', function(){ gutil.log('Rebundled'); });        
  }

  return rebundle();

}

gulp.task('browserify', function() {

  return buildScript(config.browserify.bundle);

});
