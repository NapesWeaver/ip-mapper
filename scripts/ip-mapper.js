import GoogleMap from './utils/google-maps-wrapper.js';
import { decorateHostInfo } from './utils/template.js';
import { data } from './data/data.js';

function getDistance(latLngJSON_a, latLngJSON_b) {
  let meters = google.maps.geometry.spherical.computeDistanceBetween(toLatLngObj(latLngJSON_a), toLatLngObj(latLngJSON_b));
  return meters * 0.000621371; // convert meters to miles
}

function toLatLngObj (latLngJSON) {
  return new google.maps.LatLng(latLngJSON.lat, latLngJSON.lng);
}

function markLocation(latLngJSON) {
  GoogleMap.addMarker(latLngJSON);
  GoogleMap.map.setZoom(6);
  GoogleMap.map.setCenter(latLngJSON);
}

function mapHostInfo() {
  GoogleMap.addMarker({ lat: data.publicLat, lng: data.publicLng });
    
  if (data.privateLat !== 0) {
    data.distance = getDistance({ lat: data.privateLat, lng: data.privateLng }, 
      { lat: data.publicLat, lng: data.publicLng });  
    GoogleMap.drawLine([
      { lat: data.privateLat, lng: data.privateLng }, 
      { lat: data.publicLat, lng: data.publicLng }
    ]);
  } else {
    GoogleMap.map.setZoom(6);
    GoogleMap.map.setCenter({ lat: data.publicLat, lng: data.publicLng });
  }
}

function handleSubmit() {
  $('.page').on('submit', '.ip-start-form', submitStart);
  $('.page').on('submit', '.ip-search-form', submitSearch);
}

function submitStart(event) {
  event.preventDefault();
  mapHostInfo();     
  renderHostInfo();
}

function submitSearch(event) {
  event.preventDefault();
  console.log('submitSearch');
}

function renderHostInfo() {
  $('.ip-start-form').replaceWith(decorateHostInfo);
}

export { handleSubmit, renderHostInfo };