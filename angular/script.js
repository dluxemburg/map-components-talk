angular.module('mapComponents', [])
.directive('myMap', function(){
  return {
    link: function(scope, elem, attrs){
      scope.map = L.mapbox.map(elem[0], attrs.mapId)
      scope.map.setView([attrs.lat, attrs.lon], attrs.zoom)
    }
  }
})
