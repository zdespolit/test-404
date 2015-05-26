'use strict';

module.exports = {

  'serverport': 3000,

  'scripts': {
    'src' : 'app/js/**/*.js',
    'dest': '_build/js'
  },

  'browserify': {
    'entries'   : ['./app/app.js'],
    'bundle': 'main.js',
    'sourcemap' : true
  },

  'views': {
    'src': 'app/**/*.jade',
    'dest': '_build/html'
  },

  'styles': {
    'src' : 'app/**/*.scss',
    'dest': '_build/css',
    'bundle': 'app.css'
  },

  'fonts': {
    'src' : ['app/fonts/**/*'],
    'dest': '_build/fonts'
  },

  'dist': {
    'root'  : 'build'
  },

  'test': {
    'karma': 'test/karma.conf.js',
    'protractor': 'test/protractor.conf.js'
  }

};
