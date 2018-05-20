import { data } from '../data/data.js';
  
function initMap() {

  let options = {
    zoom: 0,
    center: {lat: data.userLat, lng: data.userLng},
  };

  window.map = new google.maps.Map(document.getElementById('map'), options);      
};

function addMarker(location) {
  let marker = new google.maps.Marker({
    position: location,
    map: map,
    moveMarker: function(location) {
      map.setCenter(location);
      marker.setPosition(location);
    },
  });
  marker.addListener('click', function() {
    map.setZoom(8);
    map.setCenter(marker.getPosition());
  });
}

export { initMap, addMarker };