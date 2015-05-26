'use strict'

module.exports = ['$scope', 'Restangular', function($scope, Restangular){

  Restangular.setBaseUrl('/api')
  var rest = Restangular.all('time')

  $scope.getList = function(){
    rest.getList().then(function(items){
      $scope.data = items
    })  
  }

  $scope.add = function(){    
    var item = {
      name: $scope.name,
      time: new Date()
    }
    $scope.name = null
    rest.post(item).then(function(){
      $scope.getList()
    })
  }

  $scope.remove = function(item){
    item.remove().then($scope.getList)
  }

  $scope.canAdd = function(){
    return $scope.data != null && $scope.name != null
  }

  $scope.data = null
  $scope.getList()

}]