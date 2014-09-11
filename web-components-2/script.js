var myMapProto = Object.create(HTMLElement.prototype)

myMapProto.createdCallback = function(){
  this.map = L.mapbox.map(this, this.getAttribute('map-id'))
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

var MyMap = document.registerElement('my-map', {prototype: myMapProto})