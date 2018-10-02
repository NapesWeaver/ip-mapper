'use strict';

class GoogleMap {
  constructor(zoom, center, target) {    
    let options = {
      zoom: zoom || 0,
      center: center || { lat: 0, lng: 0 },
      styles: [],
      backgroundColor: '#C5EFBA',
    };

    this.zoom = zoom;
    this.center = center;
    this.target = target;
    this.options = options;
    this.map = new google.maps.Map(document.getElementById(target || 'map'), options);
    this.markers = [];
    this.infoWindows = [];
    this.polyLines = [];
  }
  
  addMarker(location) {
    const info = location.data.formattedInfo;
    const marker = new google.maps.Marker({
      position: location,
      map: this.map,
      icon: location.data.icon || 'https://maps.google.com/mapfiles/ms/icons/red-dot.png',
      title: location.data.title,      
    });
    const infoWindow = new google.maps.InfoWindow({
      content: info,
    });
    infoWindow.addListener('click', () => {
      infoWindow.close();
    });
    marker.addListener('click', () => {
      if(this.map.zoom === 13) {
        this.map.setZoom(2);
      } else {
        this.map.setZoom(13);
      }
      infoWindow.open(this.map, marker);
      this.map.setCenter(marker.getPosition());
    });
    this.markers.push(marker);
    this.infoWindows.push(infoWindow);
  };
  
  drawLine(latLngs, strokeColor) {
    let ipPath = new google.maps.Polyline({
      path: latLngs,
      geodesic: true,
      strokeColor: strokeColor || '#FF0000',
      strokeOpacity: 1.0,
      strokeWeight: 1,
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