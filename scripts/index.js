// import { initMap } from './utils/init-map.js';
//import GoogleMap from './utils/google-maps-wrapper.js';
import { getIP, handleSubmit } from './ip-mapper.js';
import { getLocalInfo, getUserLocation, getPrivateIP } from './utils/get-local-info.js';

// instantiate a new object of type GoogleMap() through its constructor
// by using the new keyword
// let googleMap = new GoogleMap();

// window.initMap = initMap;

getIP('');
handleSubmit();
getPrivateIP();
getUserLocation();
getLocalInfo();