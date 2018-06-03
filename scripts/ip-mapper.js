import GoogleMap from './utils/google-maps-wrapper.js';
import { decorateHostInfo } from './utils/template.js';
import { data } from './data/data.js';

function getDistance(latLngJSON_a, latLngJSON_b) {
  let meters = google.maps.geometry.spherical.computeDistanceBetween(toLatLng(latLngJSON_a), toLatLng(latLngJSON_b));
  return meters * 0.000621371; // convert meters to miles
}

function getDNS(ip) {
  $.getJSON(`https://api.shodan.io/dns/reverse?ips=${ip}&key=3ebsORr9MVlM1QSAQb4Xs0L1mh82xCKw`, function(response) {
    data.dns = response[Object.keys(response)[0]];
  });
}

function mapHostInfo() {
  GoogleMap.addMarker({ lat: data.publicLat, lng: data.publicLng });
    
  if (data.privateLat !== 0) {
    data.distance = getDistance({ lat: data.privateLat, lng: data.privateLng }, 
      { lat: data.publicLat, lng: data.publicLng });
  
    let latLngs = [
      { lat: data.privateLat, lng: data.privateLng }, 
      { lat: data.publicLat, lng: data.publicLng }
    ];    
    GoogleMap.drawLine(latLngs);
  } else {
    GoogleMap.map.setZoom(6);
    GoogleMap.map.setCenter({ lat: data.publicLat, lng: data.publicLng });
  }
}

function getIP(ip) {
  
  const QUERY = `https://ipapi.co/${ip}/json/`;
  $.getJSON(QUERY, ipCallBack);  
}

function handleSubmit() {
  $('.page').on('submit', '.ip-start-form', submitStart);
  $('.page').on('submit', '.ip-search-form', submitSearch);
}

function ipCallBack(response) {
  if (data.ipSearches.length < 1) {
    data.publicIP = response.ip;
    data.publicLat = response.latitude;
    data.publicLng = response.longitude;
    getDNS(data.publicIP);
  }
  data.ipSearches.push(response);
}

function submitStart(event) {
  event.preventDefault();
  
  // GoogleMap.addMarker({ lat: data.privateLat, lng: data.privateLng });
  // GoogleMap.map.setZoom(6);
  // GoogleMap.map.setCenter({ lat: data.privateLat, lng: data.privateLng });

  mapHostInfo();     
  renderHostInfo();
}

function submitSearch(event) {
  event.preventDefault();
  console.log('submitSearch');
}

function toLatLng (latLngJSON) {
  return new google.maps.LatLng(latLngJSON.lat, latLngJSON.lng);
}

function renderHostInfo() {
  $('.ip-start-form').replaceWith(decorateHostInfo);
}

export { getIP, handleSubmit, renderHostInfo };