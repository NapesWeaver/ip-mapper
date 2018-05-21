import { data } from '../data/data.js';

function initMap() {

  let options = {
    zoom: 0,
    center: {lat: data.privateLat, lng: data.privateLng},
  };

  window.map = new google.maps.Map(document.getElementById('map'), options);      

  let latLngs = [
    {lat: 37.772, lng: -122.214},
    {lat: 21.291, lng: -157.821},
    {lat: -18.142, lng: 178.431},
    {lat: -27.467, lng: 153.027},
    // {lat: data.privateLat, lng: data.privateLng},
    // {lat: data.publicLat, lng: data.publicLng},
  ];

  let ipPath = new google.maps.Polyline({
    path: latLngs,
    geodesic: true,
    strokeColor: '#FF0000',
    strokeOpacity: 1.0,
    strokeWeight: 1
  });
  ipPath.setMap(map);
};

// let latLngs = [
//   {lat: 37.772, lng: -122.214},
//   {lat: 21.291, lng: -157.821},
//   {lat: -18.142, lng: 178.431},
//   {lat: -27.467, lng: 153.027},
//   {lat: data.privateLat, lng: data.privateLng},
//   {lat: data.publicLat, lng: data.publicLng},
// ];

// function addLine(latLngs) {
//   let ipPath = new google.maps.Polyline({
//     path: latLngs,
//     geodesic: true,
//     strokeColor: '#FF0000',
//     strokeOpacity: 1.0,
//     strokeWeight: 1
//   });
//   ipPath.setMap(window.map);
// }
// addLine(latLngs);

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