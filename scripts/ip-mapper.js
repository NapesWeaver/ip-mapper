import GoogleMap from './utils/google-maps-wrapper.js';
import { decorateHostInfo } from './utils/template.js';
import { data } from './data/data.js';

function handleSubmit() {
  $('.page').on('submit', '.ip-start-form', submitStart);
  $('.page').on('submit', '.ip-search-form', submitSearch);
}

function mapHostInfo() {
    
  if (data.privateLat !== 0) {
    data.distance = GoogleMap.getDistance({ lat: data.privateLat, lng: data.privateLng }, 
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
    
  if (GoogleMap.markers.length > 1) {
    GoogleMap.fitBounds();
  } else {
    GoogleMap.map.setZoom(6);
    GoogleMap.map.setCenter(latLngJSON);
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