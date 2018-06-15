import { data } from '../data/data.js';
import GoogleMap from '../utils/map-class.js';
import { decoratePrivateInfoWindow } from '../utils/template.js';
import { drawMarker, mapSearch, renderHTML } from '../ip-mapper.js';

function callBackPublicIP(response) {
  data.publicIP = response.ip;
  data.publicLat = response.latitude;
  data.publicLng = response.longitude;
  getHostName(data.publicIP, callBackUserHost);
}

function callBackSearchIP(response) {
  
  if(response.latitude) {
    data.ipSearches.push(response);
    getHostName(response.ip, callBackSearchHost);
  } else {
    console.log('No results.');
  }  
}

function callBackSearchHost(response) {
  const host = response[Object.keys(response)[0]];
  const index = data.ipSearches.length - 1;
  data.ipSearches[index].public_host = host;  
  mapSearch(index);
  renderHTML();
}

function callBackUserHost(response) {
  data.hostName = response[Object.keys(response)[0]];
}

function geolocationError(error) {  

  switch (error.code) {
  case error.PERMISSION_DENIED:
    console.log('Request for Geolocation denied.');
    break;
  case error.POSITION_UNAVAILABLE:
    console.log('Location information is unavailable.');
    break;
  case error.TIMEOUT:
    console.log('The request to get user location timed out.');
    break;
  case error.UNKNOWN_ERROR:
    console.log('An unknown error occurred.');
    break;
  }
  renderLocalInfo();
}

function getHostName(ip, callBack) {
  $.getJSON(`https://api.shodan.io/dns/reverse?ips=${ip}&key=3ebsORr9MVlM1QSAQb4Xs0L1mh82xCKw`, callBack);
}

function getLocalConnectionInfo() {
  
  if (navigator.connection) {
    navigator.connection.addEventListener('change', saveNetworkInfo);
    function saveNetworkInfo() {
      // Bandwidth estimate
      data.downloadSpeed = navigator.connection.downlink;
      // Round-trip time estimate
      data.rtt = navigator.connection.rtt;
      // Effective connection type determined using recently observed rtt and downlink values
      data.effectiveType = navigator.connection.effectiveType;
    }
    saveNetworkInfo();
  }
}

function getLocalDistance() {
  if (data.privateLat !== 0 && data.privateLng !== 0) {    
    data.distance = GoogleMap.getDistance({ lat: data.privateLat, lng: data.privateLng }, { lat: data.publicLat, lng: data.publicLng });
    GoogleMap.drawLine([{ lat: data.privateLat, lng: data.privateLng }, { lat: data.publicLat, lng: data.publicLng }]);
  }
}

function getLocalInfo() {
  getLocalConnectionInfo();
  testForPrivateIP();
  getPublicIP();
}

/**
 * Get user IP through webkitRTCPeerConnection
 * @param onNewIP {Function} listener function to expose IP locally
 * @return undefined
 */
function getPrivateIP(onNewIP) {
  // Compatibility for Chrome & Firefox
  let myPeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection;
  let pc = new myPeerConnection({
      iceServers: []
    }),
    noop = function () { },
    localIPs = {},
    ipRegex = /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/g;
  
  function iterateIP(ip) {
    
    if (!localIPs[ip]) onNewIP(ip);
    localIPs[ip] = true;
  }
  // Create bogus data channel
  pc.createDataChannel('');
  // Create offer and set local description
  pc.createOffer().then(function (sdp) {
    sdp.sdp.split('\n').forEach(function (line) {
      if (line.indexOf('candidate') < 0) return;
      line.match(ipRegex).forEach(iterateIP);
    });
    pc.setLocalDescription(sdp, noop, noop);
  }).catch(function (reason) {
    // Handle failure to connect
    $('txtInput').value = 'reason';
  });
  // Listen for candidate events
  pc.onicecandidate = function (ice) {
    if (!ice || !ice.candidate || !ice.candidate.candidate || !ice.candidate.candidate.match(ipRegex)) return;
    ice.candidate.candidate.match(ipRegex).forEach(iterateIP);
  };
}

function getPublicIP() {
  searchIP('', callBackPublicIP);
}

function getUserLocation() {

  if (navigator.geolocation) {
    // Local network information used by Google Location Services to estimate
    // location includes information about visible WiFi access points, including
    // signal strength &information about your local router, computer's IP address 
    navigator.geolocation.getCurrentPosition(function (position) {
      data.privateLat = position.coords.latitude;
      data.privateLng = position.coords.longitude;
      mapUserLocation();
      renderLocalInfo();
    }, geolocationError);
  } else {
    console.log('Geolocation not supported.');
    renderLocalInfo();    
  }
}

function mapUserLocation() {
  let location = { lat: data.privateLat, lng: data.privateLng, data: { } };
  location.data.title = `Private IP: ${data.privateIP}`;
  location.data.formattedInfo = decoratePrivateInfoWindow();      
  drawMarker(location);
}

function renderLocalInfo() {
  getLocalDistance();
  renderHTML();
}

function searchIP(ip, callBack) {  
  $.getJSON(`https://ipapi.co/${ip}/json/`, callBack);
}

function testForPrivateIP() {
  
  if (/*@cc_on!@*/false || !!document.documentMode || window.navigator.userAgent.indexOf('Edge') > -1) {
    // Edge & IE
    data.privateIP = 'Not supported by this browser';
  } else {
    getPrivateIP(function(ip) {
      data.privateIP = ip;
    });
  }
}

export { callBackSearchIP, getLocalInfo, searchIP, getUserLocation };