import { data } from '../data/data.js';

function decorateSearchInfoWindow(index) {
  const publicHost = data.ipSearches[index].public_host === null ? '' : `<h2>${data.ipSearches[index].public_host}</h2>`;
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
    const publicHost = e.public_host !== null ? `<li>Host Name: ${e.public_host}</li>` : '';
    const organization = e.org !== undefined ? `<li>Organization: ${e.org}</li>` : '';
    const hopTypeString = e.hopType === 'radial' ? 'Total Distance' : 'Hop Distance';
    const distance = e.distance !== 0.0 ? `<li>${hopTypeString}: ${e.distance.toFixed(1)}mi</li>` : '';
    return `
    <div class="col-6 result" data-index="${i}">
      <div class="result-controls">
        <input type="button" class="delete-button" value="DELETE">
        <input type="button" class="focus-button" value="FOCUS">
      </div>       
      <h2>IP: ${e.ip}</h2>
      <ul>
        ${publicHost}
        ${organization}
        <li>Country: ${e.country_name}</li>            
        <li>Region: ${e.region}</li>
        <li>City: ${e.city}</li>
        ${distance}
      </ul>      
    </div>
    `;
  }).join('') : '';

  // const decorateSearchInfo = data.ipSearches.length > 0 ? data.ipSearches.forEach((e) => {
  //   const publicHost = e.public_host !== null ? `<li>Host Name: ${e.public_host}</li>` : '';
  //   const organization = e.org !== undefined ? `<li>Organization: ${e.org}</li>` : '';
  //   const hopTypeString = e.hopType === 'radial' ? 'Total Distance' : 'Hop Distance';
  //   const dist
  //   console.log(e.dataIndex);
  //   if (e.dataIndex % 2 === 0) {
  //     console.log('even');
  //     return `
  //     <div class="col-6 result" data-index="${i}">
  //       <div class="result-controls">
  //         <input type="button" class="delete-button" value="DELETE">
  //         <input type="button" class="focus-button" value="FOCUS">
  //       </div>       
  //       <h2>IP: ${e.ip}</h2>
  //       <ul>
  //         ${publicHost}
  //         ${organization}
  //         <li>Country: ${e.country_name}</li>            
  //         <li>Region: ${e.region}</li>
  //         <li>City: ${e.city}</li>
  //         ${distance}
  //       </ul>      
  //     </div>
  //     `;
  //   } else {
  //     console.log('odd');
  //     return `
  //     <div class="col-6 result" data-index="${i}">
  //       <div class="result-controls">
  //         <input type="button" class="delete-button" value="DELETE">
  //         <input type="button" class="focus-button" value="FOCUS">
  //       </div>       
  //       <h2>IP: ${e.ip}</h2>
  //       <ul>
  //         ${publicHost}
  //         ${organization}
  //         <li>Country: ${e.country_name}</li>            
  //         <li>Region: ${e.region}</li>
  //         <li>City: ${e.city}</li>
  //         ${distance}
  //       </ul>      
  //     </div>
  //     `;
  //   }
  // }).join('') : '';

  return `
    <form class="ip-search-form">
    <div class="row host-results">
      <div class="col-6">
        <h2>Host Information</h2>
        <ul>
          <li>Private IP: ${data.privateIP}</li>
          <li>Public IP: ${data.publicIP}</li>
          <li>${data.hostName}</li>
        </ul>
      </div>
      <div class="col-6">
        <ul>
          ${downLink}
          ${effectiveType}
          ${rtt}
          ${distance}
        </ul>
      </div>
    </div>

    <div class="form-controls">
      <label for="#search-text">Enter IPv4 Address to Search
        <input type="text" id="search-text" placeholder="8.8.8.8" title="IPv4 dotted quad" pattern="^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$">
      </label>
      <input type="submit" value="SEARCH">
      <input type="reset" value="RESET">
      <fieldset>
        <legend>Search Type: </legend>
        <input type="radio" id="radial-view" name="hop-type" value="radial-view" ${radialChecked}>
        <label for="radial-view">Radial</label>  
        <input type="radio" id="traceroute" name="hop-type" value="traceroute" ${tracerouteChecked}>
        <label for="traceroute">Traceroute</label>
      </fieldset>
    </div>
  </form>
  <div class="row search-results">
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
    <h2>${data.hostName}</h2>
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
    <label>Get Local Network Information
      <input type="submit" id="start" value="CONNECT">
    </label>        
  </form>
  <div class="search-results">
  </div>
  `;
}

export { decoratePrivateInfoWindow, decoratePublicInfoWindow, decorateSearchInfoWindow, decoratePage, decorateStart };