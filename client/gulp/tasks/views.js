'use strict';

var gulp = require('gulp'),
    jade = require('gulp-jade'),
    flatten = require('gulp-flatten'),
    config = require('../config');

gulp.task('views', function(){

  gulp.src(config.views.src)
      .pipe(jade())
      .pipe(flatten())
      .pipe(gulp.dest(config.views.dest))

})
