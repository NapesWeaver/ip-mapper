import { initMap } from './utils/init-map.js';
import { handleSubmit } from './ip-mapper.js';
import { getPublicIP, getUserLocation, getPrivateIP } from './utils/get-local-info.js';

window.initMap = initMap;
handleSubmit();
getPrivateIP();
getUserLocation();