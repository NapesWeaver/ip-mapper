import { data } from '../data/data.js';

function decorateHostInfo() {
  
  return `
  <h2>Host Information</h2>
  <ul>
    <li class="lat-lon">lat: ${data.userLat.toFixed(5)}, lon: ${data.userLng.toFixed(5)}</li>
    <li>Private IP: ${data.privateIP}</li>
    <li>Public IP: ${data.publicIP}</li>      
    <li>Effective Download Speed: ${data.downloadSpeed}Mbps</li>
    <li>Effective Type: ${data.effectiveType}G</li>
    <li>RTT: ${data.rtt}ms</li>
    <li>Distance: ${data.distance}mi</li>
    <li>DNS: ${data.dns}</li>  
  </ul>
  `;
}

export { decorateHostInfo };