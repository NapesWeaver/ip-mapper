import { addMarker } from './utils/init-map.js';
import { decorateHostInfo } from './utils/template.js';
import { data } from './data/data.js';

function getPublicIP(ip) {

  const QUERY = `https://ipapi.co/${ip}/json/`;
  $.getJSON(QUERY, callBack);
}

function callBack(response) {
  console.log(response.ip);
}

function handleSubmit() {
  $('.ip-search-form').submit(function(event) {
    event.preventDefault();
    addMarker({ lat: 0, lng: 0 });
  });
}

function renderHostInfo() {
  $('.host-results').html(decorateHostInfo);
}

export { getPublicIP, handleSubmit, renderHostInfo };