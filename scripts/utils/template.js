import { data } from '../data/data.js';

function decorateSearchInfoWindow(index) {
  const publicHost = data.ipSearches[index].public_host === null ? '' : `<h2 class="ellipsis">${data.ipSearches[index].public_host}</h2>`;
  const hopTypeString = data.ipSearches[index].hopType === 'radial' ? 'Total Distance' : 'Hop Distance';
  const organization = data.ipSearches[index].org === undefined ? '' : `<li>Organization: ${data.ipSearches[index].org}</li>`;
  return `
  <div class="info-window">
    <h1>IP: ${data.ipSearches[index].ip}</h1>
    ${publicHost}
    <ul>
      ${organization}
      <li>Country: ${data.ipSearches[index].country_name}</li>            
      <li>Region: ${data.ipSearches[index].region}</li>
      <li>City: ${data.ipSearches[index].city}</li>
      <li>Latitude: ${data.ipSearches[index].latitude}</li>
      <li>Longitude: ${data.ipSearches[index].longitude}</li>
      <li>${hopTypeString}: ${data.ipSearches[index].distance.toFixed(1)}mi</li>
    </ul>
  </div>
  `;
}

function decoratePage() {
  let radialChecked = '';
  let tracerouteChecked = '';
  data.tracerouteChecked === true ? tracerouteChecked = 'checked' : radialChecked = 'checked';
  const distance = data.distance !== 0.0 ? `<li>Distance: ${data.distance.toFixed(2)}mi</li>` : '';
  const downLink = data.downloadSpeed !== 0.0 ? `<li>Effective Download Speed: ${data.downloadSpeed}Mbps</li>` : '';
  const effectiveType = data.effectiveType !== 0 ? `<li>Effective Type: ${data.effectiveType}</li>` : '';
  const rtt = data.rtt !== 0 ? `<li>RTT: ${data.rtt}ms</li>` : '';
  const decorateSearchInfo = data.ipSearches.length > 0 ? data.ipSearches.map((e, i) => {
    const publicHost = e.public_host !== null ? `<li>${e.public_host}</li>` : '';
    const organization = e.org !== undefined ? `<li>Organization: ${e.org}</li>` : '';
    const hopTypeString = e.hopType === 'radial' ? 'Total Distance' : 'Hop Distance';
    const distance = e.distance !== 0.0 ? `<li>${hopTypeString}: ${e.distance.toFixed(1)}mi</li>` : '';
    const rowStart = i % 2 === 0 ? '<div class="row">' : '';
    const rowEnd = i % 2 === 1 || i === data.ipSearches.length -1 ? '</div>' : '';  
    return `
    ${rowStart}
    <div class="col-6 result" data-index="${i}">
      <fieldset role="group" class="result-controls">
        <input type="button" class="focus-button" value="FOCUS" title="Focus map on this search item">
        <input type="button" class="delete-button" value="DELETE" title="Delete this search item">
      </fieldset>       
      <h4>IP: ${e.ip}</h4>      
      <ul>        
        <li>${publicHost}</li>
        ${organization}
        <li>Country: ${e.country_name}</li>            
        <li>Region: ${e.region}</li>
        <li>City: ${e.city}</li>
        ${distance}
      </ul>
    </div>
    ${rowEnd}
    `;
  }).join('') : '';

  return `
    <form class="ip-search-form">
    <div class="row host-results">
      <div class="col-6 col-custom">        
        <h2>Host Information</h2>      
        <h3>${data.hostName}</h3>
      </div>

      <div class="col-6">
        <div class="col-6">
          <ul>
            <li>Private IP: ${data.privateIP}</li>
            <li>Public IP: ${data.publicIP}</li>
            ${distance}
          </ul>
        </div>
      
        <div class="col-6">
          <ul>
            ${downLink}
            ${effectiveType}
            ${rtt}          
          </ul>
        </div>

      </div>
    </div>

    <fieldset role="group" class="form-controls">
      <fieldset role="group" class="search">
        <label for="#search-text">Enter IPv4 Address to Search
          <input type="text" id="search-text" placeholder="8.8.8.8" title="Enter an IPv4 dotted quad to search" required>
        </label>
        <div class="form-buttons">
          <input type="submit" value="SEARCH" title="Search a remote IPv4 address">
          <input type="reset" value="RESET" title="Reset host info and searches">
        </div>
      </fieldset>
      <fieldset role="group" class="search-type">
        <legend>Search Type: </legend>
        <input type="radio" id="radial-view" name="hop-type" value="radial-view" title="Map searches radially"${radialChecked}>
        <label for="radial-view" title="Map searches radially">Radial</label>  
        <input type="radio" id="traceroute" name="hop-type" value="traceroute" title="Map searches in hops"${tracerouteChecked}>
        <label for="traceroute" title="Map searches in hops">Traceroute</label>
      </fieldset>
    </fieldset>
  </form>
  <div class="search-results">
    ${decorateSearchInfo}
  </div>
  `;
}

function decoratePrivateInfoWindow() {
  return `
  <div class="info-window">
    <h1>Private IP: ${data.privateIP}</h1>
    <ul>    
      <li>Latitude: ${data.privateLat}</li>
      <li>Longitude: ${data.privateLng}</li>
    </ul>
  </div>
  `;
}

function decoratePublicInfoWindow() {
  const distance = data.distance !== 0.0 ? `<li>Distance: ${data.distance.toFixed(2)}mi</li>` : '';
  const downLink = data.downloadSpeed !== 0.0 ? `<li>Effective Download Speed: ${data.downloadSpeed}Mbps</li>` : '';
  const effectiveType = data.effectiveType !== 0 ? `<li>Effective Type: ${data.effectiveType}</li>` : '';
  const rtt = data.rtt !== 0 ? `<li>RTT: ${data.rtt}ms</li>` : '';

  return `
  <div class="info-window">
    <h1>Public IP: ${data.publicIP}</h1>
    <h2 class="ellipsis">${data.hostName}</h2>
    <ul>
      ${downLink}
      ${effectiveType}
      ${rtt}
      <li>Latitude: ${data.publicLat}</li>
      <li>Longitude: ${data.publicLng}</li>
      ${distance}
    </ul>
  </div>
  `;
}

function decorateStart() {
  return `
  <form class="ip-start-form">          
    <section role="region">
      <div class="row">
        <div class="col-12">                      
          <h2>Map Local and Remote IPv4 Addresses</h2>
          <p>Press connect to get local user information and search remote IPv4 Addresses.</p>                                  
        </div>
      </div>
    </section>
    <fieldset role="group" class="form-controls">
      <label>Get Local Network Information
        <input type="submit" id="start" value="CONNECT">
      </label>
    </fieldset>
  </form>
  <div class="search-results">
  </div>
  `;
}

export { decoratePrivateInfoWindow, decoratePublicInfoWindow, decorateSearchInfoWindow, decoratePage, decorateStart };