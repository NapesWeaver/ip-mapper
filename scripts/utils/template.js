import { data } from '../data/data.js';

function decorateHostInfo() {
  
  return `
  <form class="ip-search-form">
    <h2>Host Information</h2>
    <ul>
      <li>Private IP: ${data.privateIP}</li>
      <li class="lat-lon">lat: ${data.privateLat.toFixed(5)}, lon: ${data.privateLng.toFixed(5)}</li>
      <li>Public IP: ${data.publicIP}</li>
      <li class="lat-lon">lat: ${data.publicLat.toFixed(5)}, lon: ${data.publicLng.toFixed(5)}</li>
      <li>Distance: ${data.distance.toFixed(2)}mi</li>   
      <li>Effective Download Speed: ${data.downloadSpeed}Mbps</li>
      <li>Effective Type: ${data.effectiveType}</li>
      <li>RTT: ${data.rtt}ms</li>    
      <li>${data.dns}</li>  
    </ul>
    <input type="text" class="search-text" placeholder="Search IP">
    <input type="submit" value="SEARCH">
    <input type="reset" value="RESET">
  </form>
  `;
}

export { decorateHostInfo };