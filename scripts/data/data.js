const initialData = {
  MAPS_KEY: 'AIzaSyCACNzsORCP0XW5NXCeigRB7DlB4sRlYq4',
  SHODAN_KEY: '3ebsORr9MVlM1QSAQb4Xs0L1mh82xCKw',
  SHODAN_END_POINT: 'https://api.shodan.io/dns/reverse?ips=',
  IP_API_END_POINT: 'https://ipapi.co/',
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
}

export { data, resetData };