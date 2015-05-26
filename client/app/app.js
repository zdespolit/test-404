'use strict'

require('./list/_index')

var app = angular.module('app', ['ngRoute', 'list'])

var templateUrl = function(name){
      return '/_build/html/' + name  + '.html'
    }

app.config(["$routeProvider", function($routeProvider){

  $routeProvider.when('/', {
    templateUrl: templateUrl('list'),
    controller: 'ListCtrl'
  })

  $routeProvider.otherwise({redirectTo: '/'})

}])
