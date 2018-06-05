import { data } from './data/data.js';
import { decorateHostInfo, decorateSearchInfo } from './utils/template.js';
import GoogleMap from './utils/map-class.js';
import { getIP, callBackSearchIP } from './utils/get-info.js';

function deleteSearch(event) {
  console.log(event.currentTarget);
  console.log(event);
  console.log(data.ipSearches);
}

function handleButtons() {
  $('.page').on('submit', '.ip-start-form', submitStart);
  $('.page').on('submit', '.ip-search-form', submitSearch);
  $('.page').on('click', '.delete-button', function(event) {
    deleteSearch(event);
  });
}

function mapLocation(latLng) {  
  GoogleMap.addMarker(latLng);
    
  if (GoogleMap.markers.length > 1) {
    GoogleMap.fitBounds();
  } else {
    GoogleMap.map.setZoom(6);
    GoogleMap.map.setCenter(latLng);
  }
}

function mapHost() {
    
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

function mapSearch() {
  const startingLatLng = { lat: data.publicLat, lng: data.publicLng };
  const newLatLng = { lat: data.ipSearches[data.ipSearches.length-1].latitude, lng: data.ipSearches[data.ipSearches.length-1].longitude }
  
  //distance = GoogleMap.getDistance(startingLatLng, newLatLng);  
  GoogleMap.drawLine([startingLatLng, newLatLng]);
  mapLocation(newLatLng);
}

function renderHostInfo() {
  $('.page').html(decorateHostInfo);
}

function renderSearchInfo(response) {
  $('.results').append(decorateSearchInfo(response));
}

function submitSearch(event) {
  event.preventDefault();
  getIP($('#search-text').val(), callBackSearchIP);
  $('#search-text').val('');
}

function submitStart(event) {
  event.preventDefault();
  mapHost();     
  renderHostInfo();
  $('#search-text').focus();
}

export { handleButtons, mapLocation, mapSearch, renderSearchInfo };