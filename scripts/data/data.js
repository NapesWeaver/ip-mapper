const initialData = {
  MAPS_KEY: 'AIzaSyCACNzsORCP0XW5NXCeigRB7DlB4sRlYq4',
  tracerouteChecked: false,
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

  data.tracerouteChecked = false;
  data.privateIP = '0.0.0.0';    
  data.privateLat = 0.0;
  data.privateLng = 0.0;
  data.publicIP = '0.0.0.0';
  data.publicLat = 0.0;
  data.publicLng = 0.0;
  data.downloadSpeed = 0.0;
  data.effectiveType = 0;
  data.rtt = 0;
  data.distance =  0.0;
  data.hostName = '0.0.0.0';
  data.ipSearches = [];

  
  console.log(data);
}

export { data, resetData };