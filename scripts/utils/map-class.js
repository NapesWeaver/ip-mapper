class GoogleMap {
  constructor(zoom, center, target) {    
    let options = {
      zoom: zoom || 0,
      center: center || { lat: 0, lng: 0 },
      styles: []  
    };

    this.zoom = zoom;
    this.center = center;
    this.target = target;
    this.options = options;    
    this.map = new google.maps.Map(document.getElementById(target || 'map'), options);
    this.markers = [];
    this.polyLines = [];
  }
  
  addMarker(location) {
    let marker = new google.maps.Marker({
      position: location,
      map: this.map,
      moveMarker: (location) => {
        this.map.setCenter(location);
        this.marker.setPosition(location);
      }
    });
    marker.addListener('click', () => {
      this.map.setZoom(8);
      this.map.setCenter(marker.getPosition());
    });
    this.markers.push(marker);
  };
  
  drawLine(latLngs) {
    let ipPath = new google.maps.Polyline({
      path: latLngs,
      geodesic: true,
      strokeColor: '#FF0000',
      strokeOpacity: 1.0,
      strokeWeight: 1
    });
    ipPath.setMap(this.map);
    this.polyLines.push(ipPath);
  };
  
  fitBounds() {
    let bounds = new google.maps.LatLngBounds();
    for (var i = 0; i < this.markers.length; i++) {
      bounds.extend(this.markers[i].getPosition());
    }
    this.map.fitBounds(bounds);
  };
  
  getDistance(latLngA, latLngB) {
    let meters = google.maps.geometry.spherical.computeDistanceBetween(toGoogleLatLng(latLngA), toGoogleLatLng(latLngB));
    return meters * 0.000621371; // convert meters to miles
  };
  
  getMap() {
    return this.map;
  };
}

let googleMap = new GoogleMap();

function toGoogleLatLng(latLng) {
  return new google.maps.LatLng(latLng.lat, latLng.lng);
}

export default googleMap;

