import { data, resetData } from './data/data.js';
import { decoratePage, decorateStart } from './utils/template.js';
import GoogleMap from './utils/map-class.js';
import { getIP, callBackSearchIP, getLocalInfo } from './utils/get-info.js';

function deleteSearch(event) {
  const index = getSearchItemIndex(event.currentTarget);
  data.ipSearches.splice(index, 1);

  GoogleMap.polyLines[index + 1].setMap(null);
  GoogleMap.markers[index + 2].setMap(null);
  
  GoogleMap.polyLines.splice(index + 1, 1);
  GoogleMap.markers.splice(index + 2, 1);

  resizeMap();  
  renderPage();
}

function getSearchItemIndex(item) {
  const itemIndexString = $(item)
    .closest('.result')
    .attr('data-index');
  return parseInt(itemIndexString, 10);
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
  resizeMap();
}

function mapHost() {
    
  if (data.privateLat !== 0) {
    data.distance = GoogleMap.getDistance({ lat: data.privateLat, lng: data.privateLng }, { lat: data.publicLat, lng: data.publicLng });
    GoogleMap.drawLine([{ lat: data.privateLat, lng: data.privateLng }, { lat: data.publicLat, lng: data.publicLng }]);
  }
  mapLocation({ lat: data.publicLat, lng: data.publicLng });
}

function mapSearch() {
  const index = data.ipSearches.length - 1;
  const startingLatLng = { lat: data.publicLat, lng: data.publicLng };
  const newLatLng = { lat: data.ipSearches[index].latitude, lng: data.ipSearches[index].longitude };
  
  data.ipSearches[index].distance = GoogleMap.getDistance(startingLatLng, newLatLng);  

  GoogleMap.drawLine([startingLatLng, newLatLng]);
  mapLocation(newLatLng);
}

function renderPage() {
  $('.page').html(decoratePage);
  $('#search-text').focus();
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

function resizeMap() {
  if (GoogleMap.markers.length > 1) {
    GoogleMap.fitBounds();
  } else {
    GoogleMap.map.setZoom(6);
    // GoogleMap.map.setCenter(latLng);
    console.log(GoogleMap.markers[GoogleMap.markers.length - 1].position);
    GoogleMap.map.setCenter(GoogleMap.markers[GoogleMap.markers.length - 1].position);
  }
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
  renderPage();
}

export { attachListeners, mapLocation, mapSearch, renderPage };