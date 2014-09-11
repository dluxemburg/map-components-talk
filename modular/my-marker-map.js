define('my-marker-map', ['my-map'], function(MyMap){
  return document.registerElement('my-marker-map', {
    prototype: Object.create(MyMap.prototype, {
      coords: {
        get: function(){
          return [Number(this.getAttribute('lat')),
                  Number(this.getAttribute('lon'))]
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
})
