'use strict'

module.exports = [function(){

  return function(data, filter){

    if (!filter || !data){
      return data
    }

    var result = []

    angular.forEach(data, function(row){
      if (row.name && row.name.indexOf(filter) >= 0){
        result.push(row)
      }
    })

    return result
  }

}]