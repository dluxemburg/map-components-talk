define('my-map', ['module', 'mapbox'], function(module){
  L.mapbox.accessToken = module.config().mapboxKey
  var myMapProto = Object.create(HTMLElement.prototype)

  myMapProto.createdCallback = function(){
    this.map = L.mapbox.map(this, this.getAttribute('map-id'))
    var mapContainer =
    this.map.setView([this.getAttribute('lat'), this.getAttribute('lon')],
                     this.getAttribute('zoom'))
  }

  myMapProto.attributeChangedCallback = function(name, oldVal, newVal){
    if (typeof this[name+'Changed'] == 'function') {
      this[name+'Changed'](oldVal, newVal)
    }
  }

  myMapProto.zoomChanged = function(oldVal, newVal){
    this.map.setZoom(newVal)
  }

  return document.registerElement('my-map', {prototype: myMapProto})
})
