import { data } from '../data/data.js';

/*
 This is a basic demonstration of composition. GoogleMap 'has a' google.maps.Map.
  https://en.wikipedia.org/wiki/Object_composition
*/
function GoogleMap(zoom, center, target) {
  let options = {
    zoom: zoom || 0,
    center: center || { lat: 0, lng: 0 }
  };
  this.map = new google.maps.Map(document.getElementById(target || 'map'), options);
  this.markers = []; 
  // as an exercise, you can implement
  // setMapOnAll, clearMarkers, showMarkers, deleteMarkers
  // from here https://developers.google.com/maps/documentation/javascript/examples/marker-remove
}

GoogleMap.prototype.getMap = function() {
  return this.map;
};

GoogleMap.prototype.addMarker = function(location) {
  let marker = new google.maps.Marker({
    position: location,
    map: this.map,
    moveMarker: (location) => {
      this.map.setCenter(location);
      this.marker.setPosition(location);
    }
  });
  marker.addListener('click', () => {   // use a fat arrow to implicity bind this
    this.map.setZoom(8);
    this.map.setCenter(marker.getPosition());
  });
  this.markers.push(marker);
};

GoogleMap.prototype.drawLine = function(latLngs) {
  let ipPath = new google.maps.Polyline({
    path: latLngs,
    geodesic: true,
    strokeColor: '#FF0000',
    strokeOpacity: 1.0,
    strokeWeight: 1
  });
  ipPath.setMap(this.map);
};


    


let googleMap = new GoogleMap();

export default googleMap;