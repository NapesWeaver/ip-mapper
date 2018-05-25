import { addMarker } from './utils/init-map.js';
import { decorateHostInfo } from './utils/template.js';
import { data } from './data/data.js';

// function getDistance(point_a, point_b) {
//   let meters = google.maps.geometry.spherical.computeDistanceBetween(point_a, point_b);
//   return meters * 0.000621371; // convert meters to miles
// }

function getDistance(p1, p2) {
  const rad = function(x) {
    return x * Math.PI / 180;
  };
  const R = 6378137; // Earth’s mean radius in meter
  let dLat = rad(p2.lat - p1.lat);
  let dLong = rad(p2.lng - p1.lng);
  let a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(rad(p1.lat)) * Math.cos(rad(p2.lat)) *
    Math.sin(dLong / 2) * Math.sin(dLong / 2);
  const C = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * C * 0.000621371;
};

function getDNS(ip) {
  $.getJSON(`https://api.shodan.io/dns/reverse?ips=${ip}&key=3ebsORr9MVlM1QSAQb4Xs0L1mh82xCKw`, function(response) {
    data.dns = response[Object.keys(response)[0]];
  });
}

function getIP(ip) {
  
  const QUERY = `https://ipapi.co/${ip}/json/`;
  $.getJSON(QUERY, ipCallBack);  
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

function handleSubmit() {
  $('.ip-search-form').submit(function(event) {
    event.preventDefault();

    addMarker({ lat: data.publicLat, lng: data.publicLng });
    data.distance = getDistance({ lat: data.privateLat, lng: data.privateLng }, 
      { lat: data.publicLat, lng: data.publicLng });
    let latLngs = [
      { lat: data.privateLat, lng: data.privateLng }, 
      { lat: data.publicLat, lng: data.publicLng }
    ];
    
    let ipPath = new google.maps.Polyline({
      path: latLngs,
      geodesic: true,
      strokeColor: '#FF0000',
      strokeOpacity: 1.0,
      strokeWeight: 1
    });
    
    ipPath.setMap(map);
      
    renderHostInfo();    
  });   
}

function renderHostInfo() {
  $('.host-results').html(decorateHostInfo);
}

export { getDistance, getIP, handleSubmit, renderHostInfo };