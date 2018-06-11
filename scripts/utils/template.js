import { data } from '../data/data.js';

function decorateSearchInfoWindow(index) {
  const publicHost = data.ipSearches[index].public_host === undefined ? '' : `<li>Host Name: ${data.ipSearches[index].public_host}</li>`;
  const hopTypeString = data.ipSearches[index].hopType === 'radial' ? 'Total Distance' : 'Hop Distance';
  return `
  <h1>IP: ${data.ipSearches[index].ip}</h1>
  <ul>
    ${publicHost}
    <li>Organization: ${data.ipSearches[index].org}</li>
    <li>Country: ${data.ipSearches[index].country_name}</li>            
    <li>Region: ${data.ipSearches[index].region}</li>
    <li>City: ${data.ipSearches[index].city}</li>
    <li>${hopTypeString}: ${data.ipSearches[index].distance.toFixed(1)}mi</li>
    <li>Latitude: ${data.ipSearches[index].latitude}</li>
    <li>Longitude: ${data.ipSearches[index].longitude}</li>
  </ul>
  `;
}

function decoratePage() {  
  const distance = data.distance !== 0.0 ? `<li>Distance: ${data.distance.toFixed(2)}mi</li>` : '';
  const downLink = data.downloadSpeed !== 0.0 ? `<li>Effective Download Speed: ${data.downloadSpeed}Mbps</li>` : '';
  const effectiveType = data.effectiveType !== 0 ? `<li>Effective Type: ${data.effectiveType}</li>` : '';
  const rtt = data.rtt !== 0 ? `<li>RTT: ${data.rtt}ms</li>` : '';
  const decorateSearchInfo = data.ipSearches.length > 0 ? data.ipSearches.map((e, i) => {
    const publicHost = e.public_host === undefined ? '' : `<li>Host Name: ${e.public_host}</li>`;
    const hopTypeString = e.hopType === 'radial' ? 'Total Distance' : 'Hop Distance';
    return `
    <div class="result" data-index="${i}">
      <h3>IP: ${e.ip}</h3>
      <ul>
        ${publicHost}
        <li>Organization: ${e.org}</li>
        <li>Country: ${e.country_name}</li>            
        <li>Region: ${e.region}</li>
        <li>City: ${e.city}</li>
        <li>${hopTypeString}: ${e.distance.toFixed(1)}mi</li>
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
      <li>Public IP: ${data.publicIP}</li>
      <li>${data.hostName}</li>  
      ${downLink}
      ${effectiveType}
      ${rtt}
      ${distance}
    </ul>
    <input type="text" id="search-text" placeholder="Search IP" title="IPv4 dotted quad" pattern="[0-2]?[0-9]?[0-9][.][0-2]?[0-9]?[0-9][.][0-2]?[0-9]?[0-9][.][0-2]?[0-9]?[0-9]">
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

function decoratePrivateInfoWindow() {
  return `
  <h1>Private IP: ${data.privateIP}</h1>
  <ul>    
    <li>Latitude: ${data.privateLat}</li>
    <li>Longitude: ${data.privateLng}</li>
  </ul>
  `;
}

function decoratePublicInfoWindow() {
  const distance = data.distance !== 0.0 ? `<li>Distance: ${data.distance.toFixed(2)}mi</li>` : '';
  const downLink = data.downloadSpeed !== 0.0 ? `<li>Effective Download Speed: ${data.downloadSpeed}Mbps</li>` : '';
  const effectiveType = data.effectiveType !== 0 ? `<li>Effective Type: ${data.effectiveType}</li>` : '';
  const rtt = data.rtt !== 0 ? `<li>RTT: ${data.rtt}ms</li>` : '';

  return `
  <h1>Public IP: ${data.publicIP}</h1>
  <ul>
    <li>${data.hostName}</li>  
    ${downLink}
    ${effectiveType}
    ${rtt}
    <li>Latitude: ${data.publicLat}</li>
    <li>Longitude: ${data.publicLng}</li>
    ${distance}
  </ul>
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

export { decoratePrivateInfoWindow, decoratePublicInfoWindow, decorateSearchInfoWindow, decoratePage, decorateStart };
