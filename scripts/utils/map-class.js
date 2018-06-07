class GoogleMap {
  constructor(zoom, center, target) {
    this.zoom = zoom;
    this.center = center;
    this.target = target;

    let options = {
      zoom: zoom || 0,
      center: center || { lat: 0, lng: 0 },
      styles: [
        {elementType: 'geometry', stylers: [{color: '#242f3e'}]},
        {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
        {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
        {
          featureType: 'administrative.locality',
          elementType: 'labels.text.fill',
          stylers: [{color: '#d59563'}]
        },
        {
          featureType: 'poi',
          elementType: 'labels.text.fill',
          stylers: [{color: '#d59563'}]
        },
        {
          featureType: 'poi.park',
          elementType: 'geometry',
          stylers: [{color: '#263c3f'}]
        },
        {
          featureType: 'poi.park',
          elementType: 'labels.text.fill',
          stylers: [{color: '#6b9a76'}]
        },
        {
          featureType: 'road',
          elementType: 'geometry',
          stylers: [{color: '#38414e'}]
        },
        {
          featureType: 'road',
          elementType: 'geometry.stroke',
          stylers: [{color: '#212a37'}]
        },
        {
          featureType: 'road',
          elementType: 'labels.text.fill',
          stylers: [{color: '#9ca5b3'}]
        },
        {
          featureType: 'road.highway',
          elementType: 'geometry',
          stylers: [{color: '#746855'}]
        },
        {
          featureType: 'road.highway',
          elementType: 'geometry.stroke',
          stylers: [{color: '#1f2835'}]
        },
        {
          featureType: 'road.highway',
          elementType: 'labels.text.fill',
          stylers: [{color: '#f3d19c'}]
        },
        {
          featureType: 'transit',
          elementType: 'geometry',
          stylers: [{color: '#2f3948'}]
        },
        {
          featureType: 'transit.station',
          elementType: 'labels.text.fill',
          stylers: [{color: '#d59563'}]
        },
        {
          featureType: 'water',
          elementType: 'geometry',
          stylers: [{color: '#17263c'}]
        },
        {
          featureType: 'water',
          elementType: 'labels.text.fill',
          stylers: [{color: '#515c6d'}]
        },
        {
          featureType: 'water',
          elementType: 'labels.text.stroke',
          stylers: [{color: '#17263c'}]
        }
      ]
    };
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

function toGoogleLatLng(latLng) {
  return new google.maps.LatLng(latLng.lat, latLng.lng);
}

let googleMap = new GoogleMap();

export default googleMap;

