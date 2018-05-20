import { renderHostInfo } from '../ip-mapper.js';
import { addMarker } from '../utils/init-map.js';
import { data } from '../data/data.js';

/**
 * Get user IP through webkitRTCPeerConnection
 * @param onNewIP {Function} listener function to expose IP locally
 * @return undefined
 */
function findPrivateIP(onNewIP) {
  // Compatibility for Chrome & Firefox
  let myPeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection;
  let pc = new myPeerConnection({
      iceServers: []
    }),
    noop = function () { },
    localIPs = {},
    ipRegex = /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/g,
    key;
  
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

function getUserLocation() {
  if (navigator.geolocation) {
    /* Local network information used by Google Location Services to estimate location includes information about visible WiFi access points, including signal strength &information about your local router, computer's IP address */ 
    navigator.geolocation.getCurrentPosition(function (position) {
      data.userLat = position.coords.latitude;
      data.userLng = position.coords.longitude;
      // console.log(data.userLat, data.userLng);
      addMarker({ lat: data.userLat, lng: data.userLng });
      map.setZoom(3);
      map.setCenter({ lat: data.userLat, lng: data.userLng });
      renderHostInfo();
      
    }, geolocationError);
  }
  else {
    console.log('Geolocation not supported.');
  }
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
}

function getPrivateIP() {
  if (/*@cc_on!@*/false || !!document.documentMode || window.navigator.userAgent.indexOf('Edge') > -1) {
    // Edge & IE
    data.privateIP = 'Not supported by this browser';
    renderHostInfo();
  }
  else {
    findPrivateIP(function(ip) {
      data.privateIP = ip;
      renderHostInfo();
    });
  }
}

// navigator.connection.addEventListener('change', logNetworkInfo);

// function logNetworkInfo() {
//   // Network type that browser uses
//   console.log('         type: ' + navigator.connection.type);
//   // Effective bandwidth estimate
//   console.log('     downlink: ' + navigator.connection.downlink + 'Mb/s');
//   // Effective round-trip time estimate
//   console.log('          rtt: ' + navigator.connection.rtt + 'ms');
//   // Upper bound on the downlink speed of the first network hop
//   console.log('  downlinkMax: ' + navigator.connection.downlinkMax + 'Mb/s');
//   // Effective connection type determined using a combination of recently
//   // observed rtt and downlink values: ' +
//   console.log('effectiveType: ' + navigator.connection.effectiveType);  
//   // True if the user has requested a reduced data usage mode from the user
//   // agent.
//   console.log('     saveData: ' + navigator.connection.saveData);
// }
// logNetworkInfo();

export { getUserLocation, getPrivateIP };