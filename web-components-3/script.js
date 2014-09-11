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

var MyMarkerMap = document.registerElement('my-marker-map', {
  prototype: Object.create(MyMap.prototype, {
    coords: {
      get: function(){
        return [
          Number(this.getAttribute('lat')),
          Number(this.getAttribute('lon'))
        ]
      }
    },
    createdCallback: {
      value: function(){
        MyMap.prototype.createdCallback.call(this)

        this.map.on('drag', function(e){
          this.setAttribute('lat', this.map.getCenter().lat)
          this.setAttribute('lon', this.map.getCenter().lng)
        }.bind(this))

        var marker = L.marker(this.coords).addTo(this.map)
        marker.on('click', function(){
          this.dispatchEvent(new Event('markerClick'))
        }.bind(this))
      }
    }
  }
)})