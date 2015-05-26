'use strict';

var config        = require('../config');
var gulp          = require('gulp');

gulp.task('build', ['browserify', 'views', 'styles']);