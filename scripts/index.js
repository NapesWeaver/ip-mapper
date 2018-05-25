import { initMap } from './utils/init-map.js';
import { getIP, handleSubmit } from './ip-mapper.js';
import { getLocalInfo, getUserLocation, getPrivateIP } from './utils/get-local-info.js';

window.initMap = initMap;
getIP('');
handleSubmit();
getPrivateIP();
getUserLocation();
getLocalInfo();