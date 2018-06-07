import { data, resetData } from './data/data.js';
import { decorateHostInfo, decorateSearchInfo, decorateStart } from './utils/template.js';
import GoogleMap from './utils/map-class.js';
import { getIP, callBackSearchIP, getLocalInfo } from './utils/get-info.js';

function deleteSearch(event) {
  console.log(event.currentTarget);
  console.log(event);
  console.log(data.ipSearches);
}

function attachListeners() {
  $('.page').on('submit', '.ip-start-form', submitStart);
  $('.page').on('submit', '.ip-search-form', submitSearch);
  $('.page').on('reset', '', submitReset);
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
    data.distance = GoogleMap.getDistance({ lat: data.privateLat, lng: data.privateLng }, { lat: data.publicLat, lng: data.publicLng });
    GoogleMap.drawLine([{ lat: data.privateLat, lng: data.privateLng }, { lat: data.publicLat, lng: data.publicLng }]);
  }
  mapLocation({ lat: data.publicLat, lng: data.publicLng });
}

function mapSearch() {
  const startingLatLng = { lat: data.publicLat, lng: data.publicLng };
  const newLatLng = { lat: data.ipSearches[data.ipSearches.length-1].latitude, lng: data.ipSearches[data.ipSearches.length-1].longitude }
  
  // = GoogleMap.getDistance(startingLatLng, newLatLng);  
  GoogleMap.drawLine([startingLatLng, newLatLng]);
  mapLocation(newLatLng);
}

function renderHostInfo() {
  $('.page').html(decorateHostInfo);
  $('#search-text').focus();
}

function renderSearchInfo() {
  // $('.results').append(decorateSearchInfo(response));
  // console.log(data.ipSearches.map(e => e));
}

function removeMarkers() {
  for(let i = 0; i < GoogleMap.markers.length; i++){
    GoogleMap.markers[i].setMap(null);
  }
  GoogleMap.markers = [];
}

function removePolyLines() {
  for (let i = 0; i < GoogleMap.polyLines.length; i++) {
    GoogleMap.polyLines[i].setMap(null);
  }
  GoogleMap.polyLines = [];
}

function resetMap() {
  removePolyLines();
  removeMarkers();
  
  
  GoogleMap.map.setCenter({ lat: 0.0, lng: 0.0 });
  GoogleMap.map.setZoom(0);
}

function submitReset() {
  resetData();  
  resetMap();
  $('.page').html(decorateStart);
  getLocalInfo();
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
}

export { attachListeners, mapLocation, mapSearch, renderHostInfo, renderSearchInfo };