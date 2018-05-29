import { getIP, handleSubmit } from './ip-mapper.js';
import { getLocalInfo, getUserLocation, getPrivateIP } from './utils/get-local-info.js';

getIP('');
handleSubmit();
getPrivateIP();
getUserLocation();
getLocalInfo();