'use strict';

var config       = require('../config');
var gulp         = require('gulp');
var sass         = require('gulp-sass');
var gulpif       = require('gulp-if');
var handleErrors = require('../util/handleErrors');
var autoprefixer = require('gulp-autoprefixer');
var concat  = require('gulp-concat');
var flatten = require('gulp-flatten');

gulp.task('styles', function () {

  return gulp.src(config.styles.src)
    .pipe(sass({
      //sourceComments: global.isProd ? 'none' : 'map',
      //sourceMap: 'sass',
      outputStyle: global.isProd ? 'compressed' : 'nested'
    }))
    .pipe(autoprefixer("last 2 versions", "> 1%", "ie 8"))
    .on('error', handleErrors)
    .pipe(concat(config.styles.bundle))
    .pipe(gulp.dest(config.styles.dest));    

});