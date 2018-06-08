import { data } from '../data/data.js';

function decoratePage() {
  
  const privateLatLng = data.privateLat !== 0.0 && data.privateLng !== 0.0 ? `<li class="lat-lon">lat: ${data.privateLat.toFixed(5)}, lon: ${data.privateLng.toFixed(5)}</li>` : '';
  const distance = data.distance !== 0.0 ? `<li>Distance: ${data.distance.toFixed(2)}mi</li>` : '';
  const downLink = data.downloadSpeed !== 0.0 ? `<li>Effective Download Speed: ${data.downloadSpeed}Mbps</li>` : '';
  const effectiveType = data.effectiveType !== 0 ? `<li>Effective Type: ${data.effectiveType}</li>` : '';
  const rtt = data.rtt !== 0 ? `<li>RTT: ${data.rtt}ms</li>` : '';
  const decorateSearchInfo = data.ipSearches.length > 0 ? data.ipSearches.map((e, i) => {
    return `
    <div class="result" data-index="${i}">
      <h3>IP: ${e.ip}</h3>
      <ul>
        <li>Country: ${e.country_name}</li>            
        <li>Organization: ${e.org}</li>
        <li>City: ${e.city}</li>
        <li>Region: ${e.region}</li>
        <li>Distance: ${e.distance.toFixed(1)}mi</li>
      </ul>
      <input type="button" class="delete-button" value="DELETE">
    </div>
    `;
  }).join('') : '';

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
      <li>${data.hostName}</li>  
    </ul>
    <input type="text" id="search-text" placeholder="Search IP">
    <input type="submit" value="SEARCH">
    <input type="reset" value="RESET">
  </form>
  <div class="search-results">
    <div class="results">
    ${decorateSearchInfo}
    </div>
  </div>
  `;
}

function decorateStart() {
  return `
  <form class="ip-start-form">
      <input type="submit" id="start" value="START">         
  </form>
  <div class="search-results">
    <div class="results">
    </div>
  </div>
  `;
}

export { decoratePage, decorateStart };
