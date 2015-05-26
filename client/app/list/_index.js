'use strict'

var module = angular.module('list', ['restangular'])

module.controller('ListCtrl', require('./controller'))

module.filter('filterByName', require('./filterByName'))

