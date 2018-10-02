'use strict';

import { data, resetData } from './data/data.js';
import { decorateHostInfo, decoratePublicInfoWindow, decorateSearchInfoWindow, decorateSearchResults, decorateStart } from './utils/template.js';
import GoogleMap from './utils/map-class.js';
import { searchIP, callBackSearchIP, getLocalInfo, getUserLocation } from './utils/get-info.js';

function attachListeners() {
  $('.page').on('submit', '.ip-start-form', submitStart);
  $('.page').on('submit', '.ip-search-form', submitSearch);
  $('.page').on('change', '#search-text', validateInput);
  $('.page').on('reset', submitReset);
  $('.search-results').on('click', '.delete-button', function(event) {
    deleteSearch(event);
  });
  $('.search-results').on('click', '.focus-button', function(event) {
    focusMarker(event);
  });
  $('input[name="theme"]').on('change', () => {
    toggleTheme();
  });
  $('.page').on('change', 'input[name="hop-type"]', () => {
    data.tracerouteChecked === true ? data.tracerouteChecked = false : data.tracerouteChecked = true;
  });  
}

function createLocationObject(lat, lng, index, title, icon, formattedInfo) {
  let location = { 
    lat: lat,
    lng: lng,
    data: {
      dataIndex: index,
      title: title,
      icon: icon,
      formattedInfo: formattedInfo,
    }
  };
  return location;
}

function createPublicIPLocation() {
  const title = `Public IP: ${data.publicIP}`;
  const icon = './images/yellow-dot.png';
  const formattedInfo = decoratePublicInfoWindow();
  let location = createLocationObject(data.publicLat, data.publicLng, -1, title, icon, formattedInfo);
  return location;
}

function createSearchedLocation(index) {
  const title = data.ipSearches[index].ip;
  const icon = './images/green-dot.png';
  const formattedInfo = decorateSearchInfoWindow(index);
  let location = createLocationObject(data.ipSearches[index].latitude, data.ipSearches[index].longitude, index, title, icon, formattedInfo);  
  return Object.assign(location.data, location);
}

function deleteMapObject(index) {
  let polyLinesOffSet = 0;
  let markersOffSet = 1;

  if (data.privateLat !== 0 && data.privateLng !== 0) {
    // There is an extra marker & polyline if getUserLocation() was successful
    polyLinesOffSet++;
    markersOffSet++;
  }
  deletePolyLines(index + polyLinesOffSet);
  deleteMarkers(index + markersOffSet);  
}

function deleteMarker(index) {
  GoogleMap.markers[index].setMap(null); 
  GoogleMap.markers.splice(index, 1);
}

function deleteMarkers(index) {
  for (let i = index; i < GoogleMap.markers.length;) {
    deleteMarker(index);
  }
}

function deletePolyLine(index) {
  GoogleMap.polyLines[index].setMap(null);
  GoogleMap.polyLines.splice(index, 1);
}

function deletePolyLines(index) {
  for (let i = index; i < GoogleMap.polyLines.length;) {
    deletePolyLine(i);
  }
}

function deleteSearch(event) {
  const index = getSearchItemIndex(event.currentTarget);
  data.ipSearches.splice(index, 1);
  deleteMapObject(index);
  redrawMarkers(index);
  resizeMap();  
  renderSearchInfo();
  $('#search-text').focus();
}

function drawMarker(location) { 
  GoogleMap.addMarker(location);
  resizeMap();
}

function drawPolyLine(startingLatLng, newLatLng, strokeColor) {   
  GoogleMap.drawLine([startingLatLng, newLatLng], strokeColor);
}

function focusMarker(event) {
  let index = getSearchItemIndex(event.currentTarget) + 1;
  // If we have an extra marker for privateIP location
  if (data.privateLat !== 0 && data.privateLng !== 0) index++;
  GoogleMap.map.setZoom(12);
  GoogleMap.map.setCenter(GoogleMap.markers[index].position);
}

function getSearchDistance(index, startingLatLng) {   
  data.ipSearches[index].dataIndex = index;
  data.ipSearches[index].distance = GoogleMap.getDistance(startingLatLng, { lat: data.ipSearches[index].latitude, lng: data.ipSearches[index].longitude });
}

function getSearchItemIndex(item) {
  const itemIndexString = $(item)
    .closest('.result')
    .attr('data-index');
  return parseInt(itemIndexString, 10);
}

function getStartingLatLng(index) {
  let startingLatLng = {};
  
  if (data.tracerouteChecked === true) {
    data.ipSearches[index].hopType = 'traceRoute';

    if (index === 0) {
      startingLatLng = { lat: data.publicLat, lng: data.publicLng };
    } else {
      startingLatLng = { lat: data.ipSearches[index - 1].latitude, lng: data.ipSearches[index - 1].longitude };
    } 
  } else {
    data.ipSearches[index].hopType = 'radial';
    startingLatLng = { lat: data.publicLat, lng: data.publicLng };
  }          
  return startingLatLng;
}

function mapPublicIP() {
  drawMarker(createPublicIPLocation());
}

function mapSearchedIP(index) {
  GoogleMap.infoWindows.forEach((infoWindow) => infoWindow.close());
  
  if (data.ipSearches[index].latitude) {
    const startingLatLng = getStartingLatLng(index);
    getSearchDistance(index, startingLatLng);

    const location = createSearchedLocation(index);
    drawMarker(location);
    drawPolyLine(startingLatLng, location, '#009A30');    
  }   
}

function redrawMarkers(index) {
  for (let i = index; i < data.ipSearches.length; i++) {
    mapSearchedIP(i);
  }
  renderSearchInfo();
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

function renderHostInfo() {
  $('.page').html(decorateHostInfo);
}

function renderSearchInfo() {
  $('.search-results').html(decorateSearchResults);
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
    GoogleMap.map.setCenter(GoogleMap.markers[GoogleMap.markers.length - 1].position);
  }
}

function submitReset() {
  resetData();  
  resetMap();
  $('.page').html(decorateStart);
  $('.search-results').html(decorateSearchResults);
  getLocalInfo();
}

function submitSearch(event) {
  event.preventDefault();
  searchIP($('#search-text').val(), callBackSearchIP);
}

function submitStart(event) {
  event.preventDefault();     
  getUserLocation();
}

function toggleTheme() {
  let options = {};
  
  if(GoogleMap.map.styles.length > 0) {
    options = {
      zoom: GoogleMap.map.zoom,
      center: GoogleMap.map.center,
      styles: []
    };
  } else {
    options = {
      zoom: GoogleMap.zoom,
      center: GoogleMap.center,
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
  }
  GoogleMap.map.setOptions(options);
}

function validateInput() {
  const constraint = new RegExp('^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?))$');
  const dottedQuads = $('#search-text').val().split('.');
  let inputField = document.getElementById('search-text');
  let validated = false;

  if (dottedQuads.length === 4) {
    let goodData = true;
    dottedQuads.forEach((e) => {
      if (!constraint.test(e)) {
        goodData = false;
      }
    });
    if (goodData) validated = true;
  }
  if (validated) {
    inputField.setCustomValidity('');
  } else {  
    inputField.setCustomValidity('Please enter a valid IPv4 dotted quad.');
  }
}

export { attachListeners, drawMarker, mapSearchedIP, mapPublicIP, renderHostInfo, renderSearchInfo };