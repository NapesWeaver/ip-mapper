import GoogleMap from './utils/google-maps-wrapper.js';
import { decorateHostInfo } from './utils/template.js';
import { data } from './data/data.js';

function getDistance(point_a, point_b) {
  console.log(point_a, point_b);
  const latLngA = new google.maps.LatLng(point_a.lat, point_a.lng);
  const latLngB = new google.maps.LatLng(point_b.lat, point_b.lng);
  //let meters = google.maps.geometry.spherical.computeDistanceBetween(point_a, point_b);
  let meters = google.maps.geometry.spherical.computeDistanceBetween(latLngA, latLngB);
  return meters * 0.000621371; // convert meters to miles
}

// Haversine formula
// function getDistance(p1, p2) {
//   const rad = function(x) {
//     return x * Math.PI / 180;
//   };
//   const R = 6378137; // Earth’s mean radius in meter
//   let dLat = rad(p2.lat - p1.lat);
//   let dLong = rad(p2.lng - p1.lng);
//   let a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
//     Math.cos(rad(p1.lat)) * Math.cos(rad(p2.lat)) *
//     Math.sin(dLong / 2) * Math.sin(dLong / 2);
//   const C = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
//   return R * C * 0.000621371;
// }

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

function renderHostInfo() {
  $('.ip-start-form').replaceWith(decorateHostInfo);
}

export { getIP, handleSubmit, renderHostInfo };