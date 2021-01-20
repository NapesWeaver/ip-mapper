'use strict';

import { data } from '../data/data.js';

function decorateHostInfo() {
  let radialChecked = '';
  let tracerouteChecked = '';
  data.tracerouteChecked === true ? tracerouteChecked = 'checked' : radialChecked = 'checked';
  const distance = data.distance !== 0.0 ? `<li>Distance: ${data.distance.toFixed(2)}mi</li>` : '';
  const downLink = data.downloadSpeed !== 0.0 ? `<li>Effective Download Speed: ${data.downloadSpeed}Mbps</li>` : '';
  const effectiveType = data.effectiveType !== 0 ? `<li>Effective Type: ${data.effectiveType}</li>` : '';
  const rtt = data.rtt !== 0 ? `<li>RTT: ${data.rtt}ms</li>` : '';  
  return `
    <form action="#" class="ip-search-form">
    <div class="row host-results">
      <div class="col-6 col-host">        
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
          <input type="text" id="search-text" placeholder="1.2.3.4" required>
        </label>
        <div class="form-buttons">
          <input type="submit" value="SEARCH">
          <input type="reset" value="RESET">
        </div>
      </fieldset>
      <fieldset role="group" class="search-type">
        <legend>Search Type: </legend>
        <input type="radio" id="radial-view" name="hop-type" value="radial-view" ${radialChecked}>
        <label for="radial-view">Radial</label>  
        <input type="radio" id="traceroute" name="hop-type" value="traceroute" ${tracerouteChecked}>
        <label for="traceroute">Traceroute</label>
      </fieldset>
    </fieldset>
  </form>
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

function decorateSearchResults() {
  const searchResults = data.ipSearches.slice().reverse();
  return searchResults.map((e, i) => {
    const publicHost = e.public_host !== null ? `<li>${e.public_host}</li>` : '';
    const organization = e.org !== undefined ? `<li>Organization: ${e.org}</li>` : '';
    const hopTypeString = e.hopType === 'radial' ? 'Total Distance' : 'Hop Distance';
    const distance = e.distance !== 0.0 ? `<li>${hopTypeString}: ${e.distance.toFixed(1)}mi</li>` : '';
    const rowStart = i % 4 === 0 ? '<div class="row">' : '';
    const rowEnd = i % 4 === 3 || i === data.ipSearches.length -1 ? '</div>' : '';
    const rowNestedColStart = i % 2 === 0 ? '<div class="col-6 col-searches">' : '';
    const rowNestedColEnd = i % 2 === 1 || i === data.ipSearches.length -1 ? '</div>' : '';
    return `
    ${rowStart}
    ${rowNestedColStart}
    <div class="col-6 result" data-index="${e.dataIndex}">
      <fieldset role="group" class="result-controls">
        <input type="button" class="focus-button" value="FOCUS">
        <input type="button" class="delete-button" value="DELETE">
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
    ${rowNestedColEnd}
    ${rowEnd}
    `;
  }).join('');
}

function decorateStart() {
  return `
    <form action="#" class="ip-start-form">
      <div class="row host-results">
        <div class="start">
          <h2>Map Internet Protocol v4 Addresses</h2>
          <p>Map IPv4 addresses radially, from the user&apos;s location and also in traceroute mode.</p>
          <p>Press connect to get local user information and map remote public IPv4 Addresses.</p>
          <p>Allow Location Access to the browser for a more accurately mapped user location.</p>
        </div>
      </div>
      <fieldset role="group" class="form-controls">
        <input type="submit" id="start" value="CONNECT">
      </fieldset>
    </form>
  </div>     
  <div class="search-results" aria-live="polite">          
  </div>
  `;
}

export { decorateHostInfo, decoratePrivateInfoWindow, decoratePublicInfoWindow, decorateSearchInfoWindow, decorateSearchResults, decorateStart };