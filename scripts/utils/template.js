import { data } from '../data/data.js';

function decorateHostInfo() {
  
  const privateLatLng = data.privateLat !== 0.0 && data.privateLng !== 0.0 ? `<li class="lat-lon">lat: ${data.privateLat.toFixed(5)}, lon: ${data.privateLng.toFixed(5)}</li>` : '';
  const distance = data.distance !== 0.0 ? `<li>Distance: ${data.distance.toFixed(2)}mi</li>` : '';
  const downLink = data.downloadSpeed !== 0.0 ? `<li>Effective Download Speed: ${data.downloadSpeed}Mbps</li>` : '';
  const effectiveType = data.effectiveType !== 0 ? `<li>Effective Type: ${data.effectiveType}</li>` : '';
  const rtt = data.rtt !== 0 ? `<li>RTT: ${data.rtt}ms</li>` : '';

  return `
  <form class="ip-search-form">
    <h2>Host Information</h2>
    <ul>
      <li>Private IP: ${data.privateIP}</li>
      ${privateLatLng}
      <li>Public IP: ${data.publicIP}</li>
      <li class="lat-lon">lat: ${data.publicLat.toFixed(5)}, lon: ${data.publicLng.toFixed(5)}</li>
      ${distance}
      ${downLink}
      ${effectiveType}
      ${rtt}
      <li>${data.dns}</li>  
    </ul>
    <input type="text" id="search-text" placeholder="Search IP">
    <input type="submit" value="SEARCH">
    <input type="reset" value="RESET">
  </form>
  `;
}

export { decorateHostInfo };