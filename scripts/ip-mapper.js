import { data, resetData } from './data/data.js';
import { decoratePage, decorateStart } from './utils/template.js';
import GoogleMap from './utils/map-class.js';
import { getIP, callBackSearchIP, getLocalInfo } from './utils/get-info.js';

function deleteSearch(event) {
  const index = getSearchItemIndex(event.currentTarget);
  data.ipSearches.splice(index, 1);
  deleteMapObject(index);
  resizeMap();  
  renderPage();
}

function deleteMapObject(index) {
  let polylinesOffSet = 0;
  let markersOffSet = 1;

  if (data.privateLat !== 0 && data.privateLng !== 0) {
    polylinesOffSet ++;
    markersOffSet ++;
  }
  GoogleMap.polyLines[index + polylinesOffSet].setMap(null);
  GoogleMap.markers[index + markersOffSet].setMap(null);  
  GoogleMap.polyLines.splice(index + polylinesOffSet, 1);
  GoogleMap.markers.splice(index + markersOffSet, 1);  
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
  $('main').on( 'change', '#radial', () => console.log('#radial'));
  $('main').on( 'change', '#theme', toggleTheme);
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

export { attachListeners, mapLocation, mapSearch, renderPage };