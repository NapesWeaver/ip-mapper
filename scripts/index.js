import { initMap } from './utils/init-map.js';
import { getPublicIP, handleSubmit } from './ip-mapper.js';
import { getUserLocation, getPrivateIP } from './utils/get-local-info.js';

window.initMap = initMap;
handleSubmit();
getPrivateIP();
getUserLocation();
getPublicIP('');
