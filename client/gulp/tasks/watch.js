'use strict';

var config        = require('../config');
var gulp          = require('gulp');

gulp.task('watch', function() {

  // Scripts are automatically watched and rebundled by Watchify inside Browserify task
  gulp.watch(config.styles.src, ['styles']);
  gulp.watch(config.views.src, ['views']);
  // gulp.watch(config.fonts.src,   ['fonts']);

});