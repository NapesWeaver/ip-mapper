let initialData = {
  MAPS_KEY: 'AIzaSyCACNzsORCP0XW5NXCeigRB7DlB4sRlYq4',
  privateIP: '0.0.0.0',    
  privateLat: 0.0,
  privateLng: 0.0,
  publicIP: '0.0.0.0',
  publicLat: 0.0,
  publicLng: 0.0,
  downloadSpeed: 0.0,
  effectiveType: 0,
  rtt: 0,
  distance: 0.0,
  hostName: '0.0.0.0',
  ipSearches: [],
};

let data = Object.assign({}, initialData);

function resetData() {
  console.log(data);
  // data = Object.assign({}, initialData);
  // Object.keys(data).forEach(e => delete data[e]);
  data.ipSearches = [];
  console.log(data);
}

export { data, resetData };