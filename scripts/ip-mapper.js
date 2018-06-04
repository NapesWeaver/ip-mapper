import GoogleMap from './utils/google-maps-wrapper.js';
import { decorateHostInfo } from './utils/template.js';
import { getDistance } from './utils/get-info.js';
import { data } from './data/data.js';

function fitBounds() {
  let bounds = new google.maps.LatLngBounds();
  for (var i = 0; i < GoogleMap.markers.length; i++) {
    bounds.extend(GoogleMap.markers[i].getPosition());
  }
  GoogleMap.map.fitBounds(bounds);
}

function handleSubmit() {
  $('.page').on('submit', '.ip-start-form', submitStart);
  $('.page').on('submit', '.ip-search-form', submitSearch);
}

function mapHostInfo() {
    
  if (data.privateLat !== 0) {
    data.distance = getDistance({ lat: data.privateLat, lng: data.privateLng }, 
      { lat: data.publicLat, lng: data.publicLng });  
    GoogleMap.drawLine([
      { lat: data.privateLat, lng: data.privateLng }, 
      { lat: data.publicLat, lng: data.publicLng }
    ]);
  }
  mapLocation({ lat: data.publicLat, lng: data.publicLng });
}

function mapLocation(latLngJSON) {  
  GoogleMap.addMarker(latLngJSON);
  GoogleMap.map.setCenter(latLngJSON);
  if (GoogleMap.markers.length > 1) {
    fitBounds();
  } else {
    GoogleMap.map.setZoom(6);
  }
}

function renderHostInfo() {
  $('.ip-start-form').replaceWith(decorateHostInfo);
}

function submitSearch(event) {
  event.preventDefault();
  console.log('submitSearch');
}

function submitStart(event) {
  event.preventDefault();
  mapHostInfo();     
  renderHostInfo();
}



export { handleSubmit, renderHostInfo, mapLocation };