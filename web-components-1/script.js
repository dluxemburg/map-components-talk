var myMapProto = Object.create(HTMLElement.prototype)

myMapProto.createdCallback = function(){
  this.map = L.mapbox.map(this, this.getAttribute('map-id'))
  this.map.setView([this.getAttribute('lat'), this.getAttribute('lon')],
                   this.getAttribute('zoom'))
}

var MyMap = document.registerElement('my-map', {prototype: myMapProto})